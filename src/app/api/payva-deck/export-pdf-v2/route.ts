/**
 * PDF Export API Route V2 - Mobile-Compatible
 *
 * Enhanced version with mobile detection and fallbacks:
 * - Detects mobile user agents and adjusts rendering
 * - Uses print-v2 page with appropriate mode
 * - Better error handling and logging
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

/**
 * Detect if the request is coming from a mobile device
 */
function detectMobileDevice(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || ''
  const mobilePatterns = [
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /Android/i,
    /webOS/i,
    /BlackBerry/i,
    /Windows Phone/i,
    /IEMobile/i,
    /Opera Mini/i,
    /Mobile/i,
    /Tablet/i,
  ]
  
  return mobilePatterns.some(pattern => pattern.test(userAgent))
}

export async function GET(request: NextRequest) {
  let browser = null
  
  // Detect if this is a mobile request
  const isMobile = detectMobileDevice(request)
  console.log(`PDF Export V2: ${isMobile ? 'Mobile' : 'Desktop'} mode`)

  try {
    const origin = request.nextUrl.origin
    const debug = request.nextUrl.searchParams.get('debug') === 'true'
    
    // Use print-v2 page with mobile flag
    const printUrl = `${origin}/payva-deck/print-v2?mobile=${isMobile}${debug ? '&debug=true' : ''}`
    
    console.log(`PDF Export V2: Rendering ${printUrl}`)

    const executablePath = await findChromePath()

    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        // Additional args for better rendering
        '--font-render-hinting=none',
        '--disable-font-subpixel-positioning',
        '--force-color-profile=srgb',
      ],
    })

    const page = await browser.newPage()

    // Set viewport with appropriate device scale factor
    await page.setViewport({
      width: VIEWPORT_WIDTH,
      height: VIEWPORT_HEIGHT,
      deviceScaleFactor: isMobile ? 2 : 3, // Lower DPI for mobile to reduce complexity
    })

    // Set a mobile user agent if mobile export
    if (isMobile) {
      await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1')
    }

    // Navigate to the print page
    await page.goto(printUrl, {
      waitUntil: ['networkidle0', 'domcontentloaded', 'load'],
      timeout: 60000,
    })

    // In debug mode, use screen media type
    if (debug) {
      await page.emulateMediaType('screen')
    }

    // Wait for content to fully render
    await page.waitForSelector('.slide-page', { timeout: 10000 })
    
    // Enhanced image loading for mobile
    await page.evaluate((isMobileExport) => {
      return Promise.all([
        // Wait for all img elements to load
        ...Array.from(document.querySelectorAll('img')).map(img => {
          if (img.complete && img.naturalWidth > 0) return Promise.resolve()
          return new Promise((resolve) => {
            img.addEventListener('load', resolve)
            img.addEventListener('error', resolve)
            setTimeout(resolve, isMobileExport ? 3000 : 5000) // Shorter timeout for mobile
          })
        }),
        // Ensure SVG images are loaded
        ...Array.from(document.querySelectorAll('img[src*=".svg"]')).map(img => {
          return new Promise((resolve) => {
            const src = img.getAttribute('src')
            if (src) {
              fetch(src)
                .then(() => resolve(undefined))
                .catch(() => resolve(undefined))
                .finally(() => setTimeout(() => resolve(undefined), 100))
            } else {
              resolve(undefined)
            }
          })
        })
      ])
    }, isMobile)

    // Inject V2 specific styles and optimizations
    await page.evaluate((isMobileExport) => {
      document.documentElement.classList.remove('dark-mode')
      document.documentElement.style.colorScheme = 'light'
      document.body.style.background = 'white'
      
      // Add V2 PDF export mode class
      const container = document.querySelector('.print-export-container')
      if (container) {
        container.classList.add('pdf-export-mode-v2')
        if (isMobileExport) {
          container.classList.add('mobile-export')
        } else {
          container.classList.add('desktop-export')
        }
      }
      
      // Inject V2 PDF styles with mobile optimizations
      const style = document.createElement('style')
      style.textContent = `
        /* V2 PDF Export Styles */
        .pdf-export-mode-v2 {
          --pdf-text-scale: 1vw;
        }
        
        /* Mobile-specific optimizations */
        .pdf-export-mode-v2.mobile-export {
          /* Disable complex CSS features */
          * {
            corner-shape: unset !important;
          }
          
          /* Simplify gradients to solid colors */
          .bg-gradient-to-br {
            background: var(--color-tertiary, #f5f5f7) !important;
          }
          
          /* Replace complex shadows with simple borders */
          .shine-1,
          .shine-2,
          .shine-3 {
            box-shadow: inset 0 0 0 1px rgba(100, 100, 110, 0.15) !important;
          }
          
          /* Ensure rounded corners work */
          .corner-squircle {
            border-radius: 1rem !important;
          }
        }
        
        /* Desktop optimizations */
        .pdf-export-mode-v2.desktop-export {
          /* Ensure all effects render properly */
          * {
            image-rendering: -webkit-optimize-contrast !important;
            -webkit-font-smoothing: antialiased !important;
          }
        }
        
        /* Common V2 optimizations */
        .pdf-export-mode-v2 [class*="text-display-2xl"] {
          font-size: 3.75vw !important;
          line-height: 1.25 !important;
        }
        
        .pdf-export-mode-v2 [class*="text-display-lg"] {
          font-size: 2.5vw !important;
          line-height: 1.25 !important;
        }
        
        .pdf-export-mode-v2 [class*="text-display"] span {
          font-size: inherit !important;
        }
        
        .pdf-export-mode-v2 .stat-arrow-icon {
          width: 2.5vw !important;
          height: 2.5vw !important;
        }
        
        .pdf-export-mode-v2 .stat-arrow-icon-md {
          width: 1.67vw !important;
          height: 1.67vw !important;
        }
        
        .pdf-export-mode-v2 .inline-flex {
          font-size: inherit !important;
        }
        
        /* High quality image rendering */
        .pdf-export-mode-v2 img {
          image-rendering: high-quality !important;
          transform: translateZ(0) !important;
          backface-visibility: hidden !important;
        }
        
        .pdf-export-mode-v2 svg {
          shape-rendering: geometricPrecision !important;
        }
      `
      document.head.appendChild(style)
    }, isMobile)

    // Wait for fonts and images to settle
    await new Promise((resolve) => setTimeout(resolve, isMobile ? 2000 : 3000))

    // Generate PDF with exact PowerPoint dimensions
    const pdfBuffer = await page.pdf({
      width: `${SLIDE_WIDTH_INCHES}in`,
      height: `${SLIDE_HEIGHT_INCHES}in`,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: false,
      // Add display header/footer option for debugging
      displayHeaderFooter: false,
    })

    await browser.close()

    // Convert Buffer to Uint8Array for NextResponse
    const pdfArray = new Uint8Array(pdfBuffer)

    // Generate filename with mode indicator
    const modeIndicator = isMobile ? 'Mobile' : 'Desktop'
    const filename = `PAYVA-Pitch-Deck-V2-${modeIndicator}-${new Date().toISOString().split('T')[0]}${debug ? '-DEBUG' : ''}.pdf`

    console.log(`PDF Export V2: Successfully generated ${filename} (${pdfArray.length} bytes)`)

    return new NextResponse(pdfArray, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(pdfArray.length),
        'X-Export-Mode': isMobile ? 'mobile' : 'desktop',
        'X-Export-Version': 'v2',
      },
    })
  } catch (error) {
    if (browser) {
      await browser.close()
    }

    console.error('PDF Export V2 Error:', error)

    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        message: error instanceof Error ? error.message : 'Unknown error',
        version: 'v2',
        mode: isMobile ? 'mobile' : 'desktop',
      },
      { status: 500 }
    )
  }
}