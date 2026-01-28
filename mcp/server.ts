#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import * as puppeteerBridge from './puppeteer-bridge.js'

const APP_URL = process.env.APP_URL || 'http://localhost:3002'
const PROJECT_ROOT = process.env.PROJECT_ROOT || process.cwd()
const STATE_DIR = path.join(os.homedir(), '.app-mcp-bridge')
const SELECTED_FILE = path.join(STATE_DIR, 'selected-component.json')

// Ensure state directory exists
function ensureStateDir() {
  if (!fs.existsSync(STATE_DIR)) {
    fs.mkdirSync(STATE_DIR, { recursive: true })
  }
}

// Read selected component from file
function readSelectedComponent(): unknown {
  try {
    const data = fs.readFileSync(SELECTED_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return null
  }
}

// Make HTTP request to app
async function fetchFromApp(endpoint: string, options: RequestInit = {}): Promise<unknown> {
  const url = `${APP_URL}/api/mcp/${endpoint}`
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`)
  }

  return response.json()
}

// Validate file path is within project
function isValidFilePath(filePath: string): boolean {
  const resolved = path.resolve(PROJECT_ROOT, filePath)
  const normalizedRoot = path.resolve(PROJECT_ROOT)
  return resolved.startsWith(normalizedRoot)
}

// Context level for controlling response verbosity
let contextLevel: 'minimal' | 'standard' | 'detailed' = 'minimal'

// Format component info for concise output
function formatComponentInfo(component: any, verbose = false): string {
  if (!component) return 'No component selected'
  
  if (verbose || contextLevel === 'detailed') {
    return JSON.stringify(component, null, 2)
  }
  
  // Concise format for minimal/standard mode
  const parts = [`📦 ${component.name}`]
  
  if (component.filePath) {
    const shortPath = component.filePath.replace(/^.*\/src\//, 'src/')
    parts.push(`📁 ${shortPath}${component.lineNumber ? `:${component.lineNumber}` : ''}`)
  }
  
  if (component.selector && contextLevel === 'standard') {
    parts.push(`🎯 ${component.selector}`)
  }
  
  // Only show essential props in minimal mode
  if (component.props && Object.keys(component.props).length > 0) {
    const propKeys = Object.keys(component.props)
      .filter(k => k !== '[...]' && k !== '[fn]' && k !== '{...}')
      .slice(0, 3)
    if (propKeys.length > 0) {
      parts.push(`⚙️ Props: ${propKeys.join(', ')}${propKeys.length < Object.keys(component.props).length ? '...' : ''}`)
    }
  }
  
  return parts.join('\n')
}

// Create MCP server
const server = new McpServer({
  name: 'app-bridge',
  version: '1.0.0',
})

// Tool: Get selected component from browser
server.tool(
  'get_selected_component',
  'Get the currently selected component from the browser dev inspector',
  {
    verbose: z.boolean().optional().describe('Return full JSON instead of concise format'),
  },
  async ({ verbose }) => {
    ensureStateDir()

    // Try to sync from browser first
    try {
      const state = await fetchFromApp('state') as {
        selectedComponent: unknown
      }
      if (state?.selectedComponent) {
        fs.writeFileSync(SELECTED_FILE, JSON.stringify(state.selectedComponent, null, 2))
      }
    } catch {
      // Fallback to cached file
    }

    const component = readSelectedComponent()

    if (!component) {
      return {
        content: [
          {
            type: 'text' as const,
            text: 'No component selected. Enable Dev Mode (Cmd+Shift+I) and click a component.',
          },
        ],
      }
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: formatComponentInfo(component, verbose),
        },
      ],
    }
  }
)

// Tool: Get component source code
server.tool(
  'get_component_source',
  'Read the source code file for the currently selected component',
  {
    filePath: z.string().optional().describe('Optional: specific file path. If not provided, uses selected component path'),
  },
  async ({ filePath }) => {
    let targetPath = filePath

    if (!targetPath) {
      const component = readSelectedComponent() as { filePath?: string } | null
      if (!component?.filePath) {
        return {
          content: [
            {
              type: 'text' as const,
              text: 'No component selected or component has no file path. Select a component first or provide a file path.',
            },
          ],
        }
      }
      targetPath = component.filePath
    }

    // Handle paths that might be absolute or relative
    let resolvedPath = targetPath
    if (!path.isAbsolute(targetPath)) {
      resolvedPath = path.resolve(PROJECT_ROOT, targetPath)
    }

    // Security check
    if (!isValidFilePath(resolvedPath)) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Security error: File path "${targetPath}" is outside the project root.`,
          },
        ],
      }
    }

    try {
      const source = fs.readFileSync(resolvedPath, 'utf-8')
      return {
        content: [
          {
            type: 'text' as const,
            text: `// File: ${resolvedPath}\n\n${source}`,
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Error reading file: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  }
)

// Tool: Send action to browser
server.tool(
  'send_to_browser',
  'Send an action to the browser (refresh, navigate, highlight component)',
  {
    actionType: z.enum(['refresh', 'navigate', 'highlight', 'scroll_to', 'custom']).describe('Type of action'),
    payload: z.record(z.unknown()).optional().describe('Action payload (e.g., { url: "/path" } for navigate)'),
  },
  async ({ actionType, payload }) => {
    try {
      const result = await fetchFromApp('actions', {
        method: 'POST',
        body: JSON.stringify({
          type: actionType,
          payload: payload || {},
        }),
      }) as { actionId: string }

      return {
        content: [
          {
            type: 'text' as const,
            text: `Action "${actionType}" queued successfully. Action ID: ${result.actionId}`,
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Failed to send action: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  }
)

// Tool: Sync from browser
server.tool(
  'sync_from_browser',
  'Pull the latest state from the browser',
  {
    verbose: z.boolean().optional().describe('Return full state instead of summary'),
  },
  async ({ verbose }) => {
    try {
      const state = await fetchFromApp('state') as {
        selectedComponent: unknown
        pendingActions: unknown[]
        timestamp: number
      }

      ensureStateDir()
      if (state.selectedComponent) {
        fs.writeFileSync(SELECTED_FILE, JSON.stringify(state.selectedComponent, null, 2))
      }

      // Concise response in minimal mode
      if (!verbose && contextLevel !== 'detailed') {
        const summary = []
        if (state.selectedComponent) {
          summary.push(`✅ Component: ${formatComponentInfo(state.selectedComponent).split('\n')[0]}`)
        }
        if (state.pendingActions && (state.pendingActions as unknown[]).length > 0) {
          summary.push(`📋 Pending actions: ${(state.pendingActions as unknown[]).length}`)
        }
        summary.push(`🕐 Last sync: ${new Date(state.timestamp).toLocaleTimeString()}`)
        
        return {
          content: [
            {
              type: 'text' as const,
              text: summary.join('\n'),
            },
          ],
        }
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(state, null, 2),
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `❌ Sync failed. Check dev server at ${APP_URL}`,
          },
        ],
      }
    }
  }
)

// Tool: Trigger hot reload
server.tool(
  'trigger_hot_reload',
  'Trigger a hot reload in the browser',
  {},
  async () => {
    try {
      const result = await fetchFromApp('actions', {
        method: 'POST',
        body: JSON.stringify({
          type: 'refresh',
          payload: {},
        }),
      }) as { actionId: string }

      return {
        content: [
          {
            type: 'text' as const,
            text: `Hot reload triggered. Action ID: ${result.actionId}`,
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Failed to trigger hot reload: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  }
)

// Tool: Take screenshot
server.tool(
  'take_screenshot',
  'Capture browser screenshot. STRICT POLICY: Only use when user explicitly requests a screenshot with phrases like "take a screenshot", "show me how this looks", or "capture the screen". Never use proactively. Returns file path for Read tool.',
  {
    scope: z.enum(['selected', 'element', 'viewport', 'fullpage']).default('selected')
      .describe("What to capture"),
    selector: z.string().optional()
      .describe("CSS selector (for element scope)"),
    padding: z.number().optional().default(8)
      .describe('Padding in pixels'),
    filename: z.string().optional()
      .describe('Custom filename'),
    format: z.enum(['jpeg', 'png']).optional()
      .describe("Image format"),
    quality: z.number().min(0).max(100).optional()
      .describe('JPEG quality'),
    deleteAfterRead: z.boolean().optional().default(true)
      .describe('Auto-delete screenshot after reading (default: true)'),
  },
  async ({ scope, selector, padding, filename, format, quality, deleteAfterRead }) => {
    try {
      const result = await puppeteerBridge.takeScreenshot({
        scope,
        selector,
        padding,
        filename,
        format,
        quality,
      })

      // Concise response with just the path for the Read tool
      const shortPath = result.path.replace(os.homedir(), '~')
      
      // Note about auto-deletion
      const deleteNote = deleteAfterRead ? ' (auto-deletes after read)' : ''
      
      return {
        content: [
          {
            type: 'text' as const,
            text: `📸 ${shortPath} (${result.width}×${result.height})${deleteNote}`,
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Screenshot failed: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  }
)

// Tool: Mark screenshot as read (for auto-deletion)
server.tool(
  'mark_screenshot_read',
  'Mark a screenshot as read for automatic deletion',
  {
    filepath: z.string().describe('Path to the screenshot file'),
  },
  async ({ filepath }) => {
    try {
      // Resolve ~ to home directory
      const resolvedPath = filepath.replace('~', os.homedir())
      puppeteerBridge.markScreenshotAccessed(resolvedPath)
      
      return {
        content: [
          {
            type: 'text' as const,
            text: '✅ Screenshot marked for deletion',
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Failed to mark screenshot: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      }
    }
  }
)

// Tool: Set context level
server.tool(
  'set_context_level',
  'Set the verbosity level for MCP responses (minimal, standard, or detailed)',
  {
    level: z.enum(['minimal', 'standard', 'detailed']).describe('Context verbosity level'),
  },
  async ({ level }) => {
    const previousLevel = contextLevel
    contextLevel = level
    
    return {
      content: [
        {
          type: 'text' as const,
          text: `Context level changed: ${previousLevel} → ${level}`,
        },
      ],
    }
  }
)

// Tool: Get browser connection status
server.tool(
  'get_browser_connection',
  'Check if Chrome is connected via CDP (Chrome DevTools Protocol)',
  {},
  async () => {
    const status = await puppeteerBridge.getConnectionStatus()

    if (status.connected) {
      return {
        content: [
          {
            type: 'text' as const,
            text: '✅ Chrome connected (CDP ready)',
          },
        ],
      }
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: `❌ Chrome not connected`,
        },
      ],
    }
  }
)

// Start the server
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('MCP App Bridge server running')
}

main().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
