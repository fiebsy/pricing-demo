'use client'

import { DECK_CONFIG } from '../config/slides-config'
import { UniversalSlide } from './universal-slide'

/**
 * Print-only view that renders ALL slides at once.
 * Hidden on screen, visible only during print/PDF export.
 * Each slide gets its own page via CSS page breaks.
 *
 * Uses 16:9 aspect ratio for proper slide proportions.
 */
export function PrintView() {
  const slides = DECK_CONFIG.slides
  
  return (
    <div className="print-view">
      {slides.map((slide, index) => {
        const effectiveVariant = 'light'
        const isLastSlide = index === slides.length - 1

        return (
          <section
            key={slide.id}
            className="slide-page"
            style={{
              // Page dimensions
              width: '100vw',
              height: '100vh',
              minHeight: '100vh',
              maxHeight: '100vh',

              // Positioning
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
                // 16:9 aspect ratio that fits within page
                width: '100%',
                height: '100%',
                maxWidth: 'calc(100vh * 16 / 9)',
                maxHeight: 'calc(100vw * 9 / 16)',

                // Positioning
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                // Padding for content
                padding: '3rem 4rem',
                boxSizing: 'border-box',
              }}
            >
              {/* Slide Content */}
              <div style={{ width: '100%', maxWidth: '56rem' }}>
                <UniversalSlide
                  slide={slide}
                  slideNumber={index + 1}
                  totalSlides={slides.length}
                  isLightMode={true}
                />
              </div>

              {/* Page Number - Bottom Right */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  right: '2rem',
                  fontSize: '0.6875rem',
                  fontFamily: 'ui-monospace, SFMono-Regular, monospace',
                  color: '#9ca3af',
                  letterSpacing: '0.025em',
                }}
              >
                {index + 1} / {slides.length}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
