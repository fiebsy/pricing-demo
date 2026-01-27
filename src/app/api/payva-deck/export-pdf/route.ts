/**
 * PDF Export API Route
 *
 * Generates a perfectly-formatted PDF of the pitch deck using Puppeteer.
 * Renders the /payva-deck/print page and exports with exact PowerPoint dimensions.
 *
 * PowerPoint Widescreen: 13.333" × 7.5" (16:9 aspect ratio)
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import puppeteer from 'puppeteer-core'

// PowerPoint Widescreen dimensions in inches
const SLIDE_WIDTH_INCHES = 13.333
const SLIDE_HEIGHT_INCHES = 7.5

// Use a larger viewport for proper typography rendering
// The content is designed for full-screen viewing (~1080p)
// Puppeteer will scale this to the PDF page size
const VIEWPORT_WIDTH = 1920
const VIEWPORT_HEIGHT = 1080

// Common Chrome paths by OS
const CHROME_PATHS = {
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  linux: '/usr/bin/google-chrome',
  win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
}

async function findChromePath(): Promise<string> {
  const platform = process.platform as keyof typeof CHROME_PATHS
  return CHROME_PATHS[platform] || CHROME_PATHS.darwin
}

export async function GET(request: NextRequest) {
  let browser = null

  try {
    const origin = request.nextUrl.origin
    const debug = request.nextUrl.searchParams.get('debug') === 'true'
    const printUrl = `${origin}/payva-deck/print${debug ? '?debug=true' : ''}`

    const executablePath = await findChromePath()

    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    })

    const page = await browser.newPage()

    // Set viewport to standard screen size for proper typography rendering
    // Content is designed for full-screen viewing, Puppeteer will scale to PDF
    await page.setViewport({
      width: VIEWPORT_WIDTH,
      height: VIEWPORT_HEIGHT,
      deviceScaleFactor: 3, // 3x for extra crisp rendering, especially for SVGs
    })

    // Navigate to the print page - wait for all network resources
    await page.goto(printUrl, {
      waitUntil: ['networkidle0', 'domcontentloaded', 'load'],
      timeout: 60000,
    })

    // In debug mode, use screen media type so debug borders are visible in PDF
    if (debug) {
      await page.emulateMediaType('screen')
    }

    // Wait for content to fully render
    await page.waitForSelector('.slide-page', { timeout: 10000 })
    
    // Wait for all images and SVGs to load
    await page.evaluate(() => {
      return Promise.all([
        // Wait for all img elements to load
        ...Array.from(document.querySelectorAll('img')).map(img => {
          if (img.complete && img.naturalWidth > 0) return Promise.resolve()
          return new Promise((resolve) => {
            img.addEventListener('load', resolve)
            img.addEventListener('error', resolve) // Resolve even on error to not block PDF
            // Add a timeout fallback
            setTimeout(resolve, 5000)
          })
        }),
        // Ensure SVG images are also loaded
        ...Array.from(document.querySelectorAll('img[src*=".svg"]')).map(img => {
          return new Promise((resolve) => {
            // Force reload SVGs to ensure they're cached
            const src = img.getAttribute('src')
            if (src) {
              fetch(src)
                .then(() => resolve(undefined))
                .catch(() => resolve(undefined))
            } else {
              resolve(undefined)
            }
          })
        })
      ])
    })

    // Force light mode and inject PDF-specific styles
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark-mode')
      document.documentElement.style.colorScheme = 'light'
      document.body.style.background = 'white'
      
      // Add PDF export mode class to enable viewport-based typography
      document.querySelector('.print-export-container')?.classList.add('pdf-export-mode')
      
      // Inject additional PDF typography overrides
      const style = document.createElement('style')
      style.textContent = `
        /* Force viewport-based text sizing for PDF export */
        .pdf-export-mode {
          --pdf-text-scale: 1vw;
        }
        
        /* Ensure stat value text scales properly */
        .pdf-export-mode [class*="text-display-2xl"] {
          font-size: 3.75vw !important;
          line-height: 1.25 !important;
        }
        
        .pdf-export-mode [class*="text-display-lg"] {
          font-size: 2.5vw !important;
          line-height: 1.25 !important;
        }
        
        /* Fix inline spans to inherit parent font size */
        .pdf-export-mode [class*="text-display"] span {
          font-size: inherit !important;
        }
        
        /* Scale arrow icons proportionally - smaller relative to text */
        .pdf-export-mode .stat-arrow-icon {
          width: 2.5vw !important;
          height: 2.5vw !important;
        }
        
        .pdf-export-mode .stat-arrow-icon-md {
          width: 1.67vw !important;
          height: 1.67vw !important;
        }
        
        /* Ensure flex containers don't affect text sizing */
        .pdf-export-mode .inline-flex {
          font-size: inherit !important;
        }
        
        /* Optimize SVG and image rendering */
        .pdf-export-mode img {
          image-rendering: -webkit-optimize-contrast !important;
          image-rendering: crisp-edges !important;
          -webkit-font-smoothing: antialiased !important;
        }
        
        .pdf-export-mode svg {
          shape-rendering: crispEdges !important;
        }
        
        /* Force higher quality rendering for logos */
        .pdf-export-mode img[src*="copecart"] {
          image-rendering: high-quality !important;
          transform: translateZ(0) !important;
          backface-visibility: hidden !important;
        }
      `
      document.head.appendChild(style)
    })

    // Wait for fonts and images to load - increase wait time for better image loading
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate PDF with exact PowerPoint dimensions
    const pdfBuffer = await page.pdf({
      width: `${SLIDE_WIDTH_INCHES}in`,
      height: `${SLIDE_HEIGHT_INCHES}in`,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: false,
    })

    await browser.close()

    // Convert Buffer to Uint8Array for NextResponse
    const pdfArray = new Uint8Array(pdfBuffer)

    // Return PDF with download headers
    const filename = `PAYVA-Pitch-Deck-${new Date().toISOString().split('T')[0]}${debug ? '-DEBUG' : ''}.pdf`

    return new NextResponse(pdfArray, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(pdfArray.length),
      },
    })
  } catch (error) {
    if (browser) {
      await browser.close()
    }

    console.error('PDF export error:', error)

    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
