import puppeteer, { Browser, Page } from 'puppeteer-core'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

const CDP_URL = process.env.CDP_URL || 'http://localhost:9222'
const STATE_DIR = path.join(os.homedir(), '.app-mcp-bridge')
const SCREENSHOTS_DIR = path.join(STATE_DIR, 'screenshots')

// Screenshot cleanup settings
const MAX_SCREENSHOT_AGE_MS = 24 * 60 * 60 * 1000 // 24 hours
const MAX_SCREENSHOTS = 50

export interface ScreenshotOptions {
  scope: 'selected' | 'element' | 'viewport' | 'fullpage'
  selector?: string
  padding?: number
  filename?: string
  /** Image format: 'jpeg' for smaller files (default for viewport/fullpage), 'png' for lossless */
  format?: 'jpeg' | 'png'
  /** JPEG quality 0-100 (default: 80). Lower = smaller file */
  quality?: number
}

export interface ScreenshotResult {
  path: string
  width: number
  height: number
}

export interface BrowserConnection {
  connected: boolean
  url?: string
  error?: string
}

export interface ElementBounds {
  x: number
  y: number
  width: number
  height: number
}

let browser: Browser | null = null
let connectionAttempted = false

/**
 * Ensure screenshots directory exists
 */
function ensureScreenshotsDir(): void {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true })
  }
}

/**
 * Clean up old screenshots (older than 24h or if more than 50 files)
 */
function cleanupOldScreenshots(): void {
  try {
    if (!fs.existsSync(SCREENSHOTS_DIR)) return

    const files = fs.readdirSync(SCREENSHOTS_DIR)
      .filter(f => f.endsWith('.png') || f.endsWith('.jpg'))
      .map(f => ({
        name: f,
        path: path.join(SCREENSHOTS_DIR, f),
        mtime: fs.statSync(path.join(SCREENSHOTS_DIR, f)).mtime.getTime()
      }))
      .sort((a, b) => b.mtime - a.mtime) // Newest first

    const now = Date.now()

    files.forEach((file, index) => {
      const isOld = now - file.mtime > MAX_SCREENSHOT_AGE_MS
      const isBeyondLimit = index >= MAX_SCREENSHOTS

      if (isOld || isBeyondLimit) {
        try {
          fs.unlinkSync(file.path)
        } catch {
          // Ignore deletion errors
        }
      }
    })
  } catch {
    // Ignore cleanup errors
  }
}

/**
 * Get the WebSocket debugger URL from Chrome's CDP endpoint
 */
async function getWebSocketUrl(): Promise<string> {
  const response = await fetch(`${CDP_URL}/json/version`)
  if (!response.ok) {
    throw new Error(`Failed to fetch CDP version info: ${response.status}`)
  }
  const data = await response.json() as { webSocketDebuggerUrl?: string }
  if (!data.webSocketDebuggerUrl) {
    throw new Error('Chrome CDP endpoint did not return webSocketDebuggerUrl')
  }
  return data.webSocketDebuggerUrl
}

/**
 * Connect to Chrome via CDP
 */
export async function connect(): Promise<Browser> {
  if (browser) {
    try {
      // Check if browser is still connected
      await browser.pages()
      return browser
    } catch {
      // Browser disconnected, reconnect
      browser = null
    }
  }

  connectionAttempted = true

  try {
    const wsUrl = await getWebSocketUrl()
    browser = await puppeteer.connect({
      browserWSEndpoint: wsUrl,
      defaultViewport: null // Use actual viewport
    })
    return browser
  } catch (error) {
    throw new Error(
      `Failed to connect to Chrome via CDP at ${CDP_URL}. ` +
      `Make sure Chrome is running with --remote-debugging-port=9222.\n\n` +
      `Start Chrome with:\n` +
      `/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port=9222\n\n` +
      `Error: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

/**
 * Check browser connection status
 */
export async function getConnectionStatus(): Promise<BrowserConnection> {
  try {
    const wsUrl = await getWebSocketUrl()

    // Try to connect if not already connected
    if (!browser) {
      try {
        await connect()
      } catch {
        return {
          connected: false,
          url: CDP_URL,
          error: 'CDP endpoint found but could not connect to browser'
        }
      }
    }

    return {
      connected: true,
      url: wsUrl
    }
  } catch (error) {
    return {
      connected: false,
      url: CDP_URL,
      error: connectionAttempted
        ? `Chrome not running with CDP. Start with: /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --remote-debugging-port=9222`
        : `Failed to reach CDP endpoint at ${CDP_URL}: ${error instanceof Error ? error.message : String(error)}`
    }
  }
}

/**
 * Get the active page in Chrome
 */
async function getActivePage(connectedBrowser: Browser): Promise<Page | null> {
  const pages = await connectedBrowser.pages()

  // Find the page matching our app URL or the first visible page
  const appUrl = process.env.APP_URL || 'http://localhost:3002'

  for (const page of pages) {
    const url = page.url()
    if (url.startsWith(appUrl)) {
      return page
    }
  }

  // Fallback to first non-blank page
  for (const page of pages) {
    const url = page.url()
    if (url && url !== 'about:blank' && !url.startsWith('chrome://')) {
      return page
    }
  }

  return pages[0] || null
}

/**
 * Generate a unique filename for screenshot
 */
function generateFilename(prefix: string = 'screenshot', format: 'jpeg' | 'png' = 'jpeg'): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const ext = format === 'jpeg' ? 'jpg' : 'png'
  return `${prefix}-${timestamp}.${ext}`
}

/**
 * Take a screenshot based on options
 */
export async function takeScreenshot(options: ScreenshotOptions): Promise<ScreenshotResult> {
  const connectedBrowser = await connect()
  const page = await getActivePage(connectedBrowser)

  if (!page) {
    throw new Error('No active page found in browser')
  }

  ensureScreenshotsDir()
  cleanupOldScreenshots()

  // Default to JPEG for viewport/fullpage (smaller files), PNG for element screenshots (precision)
  const defaultFormat = (options.scope === 'viewport' || options.scope === 'fullpage') ? 'jpeg' : 'png'
  const format = options.format ?? defaultFormat
  const quality = options.quality ?? 80

  const filename = options.filename
    ? (options.filename.match(/\.(jpg|jpeg|png)$/i) ? options.filename : `${options.filename}.${format === 'jpeg' ? 'jpg' : 'png'}`)
    : generateFilename(options.scope, format)
  const filepath = path.join(SCREENSHOTS_DIR, filename)
  const padding = options.padding ?? 8

  let clipRegion: { x: number; y: number; width: number; height: number } | undefined

  if (options.scope === 'selected' || options.scope === 'element') {
    let selector = options.selector

    // For 'selected' scope, read the selector from the selected component file
    if (options.scope === 'selected') {
      const selectedFile = path.join(STATE_DIR, 'selected-component.json')
      try {
        const data = fs.readFileSync(selectedFile, 'utf-8')
        const component = JSON.parse(data) as { selector?: string; bounds?: ElementBounds }

        if (component.selector) {
          selector = component.selector
        } else if (component.bounds) {
          // Use stored bounds directly if no selector
          clipRegion = {
            x: Math.max(0, component.bounds.x - padding),
            y: Math.max(0, component.bounds.y - padding),
            width: component.bounds.width + padding * 2,
            height: component.bounds.height + padding * 2
          }
        } else {
          throw new Error('Selected component has no selector or bounds. Re-select a component in Dev Mode.')
        }
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          throw new Error('No component selected. Open the browser, enable Dev Mode (Cmd+Shift+I), and click on a component.')
        }
        throw error
      }
    }

    // If we have a selector, get bounds from the page
    if (selector && !clipRegion) {
      const element = await page.$(selector)
      if (!element) {
        throw new Error(`Element not found with selector: ${selector}`)
      }

      const box = await element.boundingBox()
      if (!box) {
        throw new Error(`Could not get bounding box for element: ${selector}`)
      }

      clipRegion = {
        x: Math.max(0, box.x - padding),
        y: Math.max(0, box.y - padding),
        width: box.width + padding * 2,
        height: box.height + padding * 2
      }
    }
  }

  // Take the screenshot with format and quality options
  const screenshotOptions = {
    path: filepath,
    type: format as 'jpeg' | 'png',
    ...(format === 'jpeg' && { quality })
  }

  if (options.scope === 'fullpage') {
    await page.screenshot({
      ...screenshotOptions,
      fullPage: true
    })
  } else if (clipRegion) {
    await page.screenshot({
      ...screenshotOptions,
      clip: clipRegion
    })
  } else {
    // viewport
    await page.screenshot(screenshotOptions)
  }

  // Get dimensions from the saved file
  let width = 0
  let height = 0

  try {
    if (format === 'png') {
      // PNG: dimensions at bytes 16-23
      const fd = fs.openSync(filepath, 'r')
      const buffer = Buffer.alloc(24)
      fs.readSync(fd, buffer, 0, 24, 0)
      fs.closeSync(fd)
      width = buffer.readUInt32BE(16)
      height = buffer.readUInt32BE(20)
    } else {
      // JPEG: use clip region or viewport dimensions
      if (clipRegion) {
        width = Math.round(clipRegion.width)
        height = Math.round(clipRegion.height)
      } else {
        const viewport = page.viewport()
        width = viewport?.width ?? 0
        height = viewport?.height ?? 0
      }
    }
  } catch {
    // Fall back to 0 if dimension reading fails
  }

  return {
    path: filepath,
    width,
    height
  }
}

/**
 * Disconnect from browser
 */
export async function disconnect(): Promise<void> {
  if (browser) {
    await browser.disconnect()
    browser = null
  }
}
