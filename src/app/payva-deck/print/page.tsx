/**
 * Print Page - Dedicated route for PDF export
 *
 * Uses the SAME approach as PrintView component:
 * - Viewport-relative sizing (100vw × 100vh per slide)
 * - Puppeteer sets viewport, content scales naturally
 *
 * Route: /payva-deck/print
 * Debug: /payva-deck/print?debug=true (shows 16:9 frame boundary)
 */

'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SLIDES } from '../data'
import { SlideContent } from '../components/slides'
import '../styles/pdf-typography.css'

function PrintPageContent() {
  const searchParams = useSearchParams()
  const debug = searchParams.get('debug') === 'true'

  return (
    <div className="print-export-container pdf-export-mode">
      {/* Match PrintView's approach exactly */}
      <style>{`
        /* PDF page settings */
        @media print {
          @page {
            size: landscape;
            margin: 0;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Hide debug elements in print */
          .debug-border,
          .debug-safe-zone,
          .debug-label {
            display: none !important;
          }
        }

        /* Debug mode styles */
        .debug-border {
          position: absolute;
          inset: 0;
          border: 3px solid #ff0000;
          pointer-events: none;
          z-index: 1000;
        }

        .debug-safe-zone {
          position: absolute;
          inset: 5%;
          border: 2px dashed #00ff00;
          pointer-events: none;
          z-index: 1000;
        }

        .debug-label {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #ff0000;
          color: white;
          font-size: 10px;
          font-family: monospace;
          padding: 2px 6px;
          z-index: 1001;
        }

        .debug-safe-label {
          position: absolute;
          top: calc(5% + 4px);
          left: calc(5% + 4px);
          background: #00ff00;
          color: black;
          font-size: 10px;
          font-family: monospace;
          padding: 2px 6px;
          z-index: 1001;
        }

        .debug-dimensions {
          position: absolute;
          bottom: 8px;
          left: 8px;
          background: rgba(0,0,0,0.8);
          color: white;
          font-size: 10px;
          font-family: monospace;
          padding: 4px 8px;
          z-index: 1001;
        }
      `}</style>

      {SLIDES.map((slide, index) => {
        const isLastSlide = index === SLIDES.length - 1

        return (
          <section
            key={slide.id}
            className="slide-page"
            style={{
              // Page dimensions - viewport relative
              width: '100vw',
              height: '100vh',
              minHeight: '100vh',
              maxHeight: '100vh',

              // Positioning - center content
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              // Page breaks
              pageBreakAfter: isLastSlide ? 'auto' : 'always',
              breakAfter: isLastSlide ? 'auto' : 'page',
              pageBreakInside: 'avoid',
              breakInside: 'avoid',

              // Appearance
              background: 'white',
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            {/* 16:9 Aspect Ratio Container - fills viewport exactly */}
            <div
              className="slide-frame"
              style={{
                // Fill the entire viewport (already 16:9 from Puppeteer)
                width: '100%',
                height: '100%',

                // Positioning - center content both ways
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                // Padding for content (matches 5% safe zone approximately)
                padding: '5% 5%',
                boxSizing: 'border-box',
              }}
            >
              {/* Debug: 16:9 Frame Boundary (red border) */}
              {debug && (
                <>
                  <div className="debug-border" />
                  <div className="debug-label">16:9 FRAME</div>
                  <div className="debug-safe-zone" />
                  <div className="debug-safe-label">SAFE ZONE (5%)</div>
                  <div className="debug-dimensions">
                    Frame: calc(100vh × 16/9) × calc(100vw × 9/16)
                    <br />
                    Padding: 48px × 64px | Content max: 896px
                  </div>
                </>
              )}

              {/* Top Left Subtitle - absolute position matching page number pattern */}
              {/* Skip for title and closing slides - they handle subtitle differently */}
              {slide.subtitle && slide.type !== 'title' && slide.type !== 'closing' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '5%',
                    left: '5%',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    letterSpacing: '0.025em',
                    color: 'rgba(83, 88, 98, 0.5)',
                  }}
                >
                  {slide.subtitle}
                </div>
              )}

              {/* Slide Content - SAME max-width as PrintView (56rem) */}
              <div style={{ width: '100%', maxWidth: '56rem' }}>
                <SlideContent
                  slide={slide}
                  variant="light"
                  slideNumber={index + 1}
                  totalSlides={SLIDES.length}
                  isLightMode={true}
                />
              </div>

              {/* Page Number - Bottom Right - inside safe zone (5% from edges) */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '5%',
                  right: '5%',
                  fontSize: '0.6875rem',
                  fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                  color: '#9ca3af',
                  letterSpacing: '0.025em',
                }}
              >
                {index + 1} / {SLIDES.length}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}

export default function PrintPage() {
  return (
    <Suspense fallback={<div style={{ background: 'white', minHeight: '100vh' }} />}>
      <PrintPageContent />
    </Suspense>
  )
}
