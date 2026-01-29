/**
 * Print Page V2 - Mobile-compatible PDF export
 *
 * Enhanced version with fallbacks for mobile rendering:
 * - Detects mobile export mode via query params
 * - Uses simplified styles for better mobile compatibility
 * - Maintains full visual effects for desktop exports
 *
 * Route: /payva-deck/print-v2
 * Mobile: /payva-deck/print-v2?mobile=true
 * Debug: /payva-deck/print-v2?debug=true
 */

'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SLIDES } from '../data'
import { SlideContent } from '../components/slides'
import '../styles/pdf-typography-v2.css'
import '../styles/print-v2.css'

function PrintPageV2Content() {
  const searchParams = useSearchParams()
  const debug = searchParams.get('debug') === 'true'
  const isMobile = searchParams.get('mobile') === 'true'
  
  // Add export mode classes for conditional styling
  const exportModeClass = isMobile ? 'mobile-export' : 'desktop-export'

  return (
    <div className={`print-export-container pdf-export-mode-v2 ${exportModeClass}`}>
      {/* Enhanced styles with mobile fallbacks */}
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

        /* Mobile Export Fallbacks */
        .mobile-export {
          /* Disable corner-shape for mobile */
          --corner-shape-fallback: none;
          
          /* Simplified gradients for mobile */
          --gradient-fallback-mode: solid;
          
          /* Simple borders instead of complex shadows */
          --shine-fallback: inset 0 0 0 1px rgba(100, 100, 110, 0.15);
        }

        /* Desktop Export - Full effects */
        .desktop-export {
          --corner-shape-fallback: squircle;
          --gradient-fallback-mode: gradient;
          --shine-fallback: var(--shine-1);
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

        .debug-mode-indicator {
          position: absolute;
          top: 8px;
          right: 8px;
          background: ${isMobile ? '#ff9800' : '#4caf50'};
          color: white;
          font-size: 10px;
          font-family: monospace;
          padding: 4px 8px;
          z-index: 1001;
          font-weight: bold;
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
            {/* 16:9 Aspect Ratio Container */}
            <div
              className="slide-frame"
              style={{
                // Fill the entire viewport
                width: '100%',
                height: '100%',

                // Positioning - center content
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                // Padding for content
                padding: '5% 5%',
                boxSizing: 'border-box',
              }}
            >
              {/* Debug overlays */}
              {debug && (
                <>
                  <div className="debug-border" />
                  <div className="debug-label">16:9 FRAME</div>
                  <div className="debug-safe-zone" />
                  <div className="debug-safe-label">SAFE ZONE (5%)</div>
                  <div className="debug-dimensions">
                    Frame: 100vw × 100vh
                    <br />
                    Mode: {isMobile ? 'MOBILE' : 'DESKTOP'}
                  </div>
                  <div className="debug-mode-indicator">
                    {isMobile ? 'MOBILE EXPORT' : 'DESKTOP EXPORT'}
                  </div>
                </>
              )}

              {/* Top Left Subtitle */}
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

              {/* Slide Content with V2 mode indicator */}
              <div style={{ width: '100%', maxWidth: '56rem' }} data-export-v2={isMobile ? 'mobile' : 'desktop'}>
                <SlideContent
                  slide={slide}
                  variant="light"
                  slideNumber={index + 1}
                  totalSlides={SLIDES.length}
                  isLightMode={true}
                />
              </div>

              {/* Page Number */}
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

export default function PrintPageV2() {
  return (
    <Suspense fallback={<div style={{ background: 'white', minHeight: '100vh' }} />}>
      <PrintPageV2Content />
    </Suspense>
  )
}