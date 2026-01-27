/**
 * Payva Pitch Deck
 *
 * Full-page investor presentation with PDF export capability.
 * Uses Base UI Tabs and Motion for smooth slide navigation.
 *
 * Features:
 * - Light mode default (independent of site-wide theme)
 * - Theme toggle for dark mode visual rhythm preview
 * - Header labels following Supercard slide anatomy
 * - PDF export always in light mode
 *
 * File structure:
 * - data/              → Slide content (types.ts, constants.ts, slides/*.ts)
 * - lib/animations.ts  → Modify animation behavior
 * - components/        → UI components
 * - components/slides/ → Individual slide type variants
 * - styles/print.css   → PDF export styles
 *
 * @module app/payva-deck
 */

'use client'

import * as React from 'react'
import { useState, useCallback } from 'react'
import { Tabs } from '@base-ui/react/tabs'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

// Local modules  
import { DECK_CONFIG, STORAGE_KEY, getSlideVariant } from './config/slides-config'
import { SLIDE_STYLES } from './config/slide-styles'
import {
  ArrowButton,
  PillIndicator,
  ExportButton,
  DeckThemeProvider,
  useDeckTheme,
  ThemeToggle,
  PrintView,
} from './components'
import { UniversalSlide } from './components/universal-slide'

// Print styles
import './styles/print.css'

export default function PitchDeckPage() {
  return (
    <DeckThemeProvider>
      <PitchDeckContent />
    </DeckThemeProvider>
  )
}

function PitchDeckContent() {
  const { deckTheme } = useDeckTheme()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)
  
  const slides = DECK_CONFIG.slides
  const slideVariants = SLIDE_STYLES.animations.variants
  const slideTransition = SLIDE_STYLES.animations.transitions.slide

  // Restore slide index from localStorage after hydration
  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const index = parseInt(saved, 10)
      if (index >= 0 && index < slides.length) {
        setCurrentIndex(index)
      }
    }
    setIsHydrated(true)
  }, [])

  // Persist slide index to localStorage
  React.useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, String(currentIndex))
    }
  }, [currentIndex, isHydrated])

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)
    },
    [currentIndex]
  )

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((prev) => prev - 1)
    }
  }, [currentIndex])

  const goToNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setDirection(1)
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex, slides.length])

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToPrevious, goToNext])

  const currentSlide = slides[currentIndex]
  const isLightMode = deckTheme === 'light'

  // Get visual variant based on position and rhythm pattern
  const effectiveVariant = isLightMode 
    ? 'light' 
    : getSlideVariant(currentIndex, DECK_CONFIG.settings.visualRhythm)

  return (
    <>
      {/* Screen View - Interactive navigation (hidden during print) */}
      <Tabs.Root
        value={currentSlide.id}
        onValueChange={(value) => {
          const index = slides.findIndex((s) => s.id === value)
          if (index !== -1) goToSlide(index)
        }}
        className="screen-view"
      >
        <div className="min-h-screen bg-secondary flex flex-col relative overflow-hidden">
          {/* Top Controls - Theme Toggle & Export Button */}
          <div className="print-hidden absolute top-6 right-6 z-10 flex items-center gap-3">
            <ThemeToggle />
            <ExportButton />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex items-center justify-center px-20">
            <AnimatePresence mode="wait" custom={direction}>
              <Tabs.Panel
                key={currentSlide.id}
                value={currentSlide.id}
                render={
                  <motion.div
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={slideTransition}
                    className={cn('w-full max-w-5xl mx-auto')}
                  />
                }
              >
                <UniversalSlide
                  slide={currentSlide}
                  slideNumber={currentIndex + 1}
                  totalSlides={slides.length}
                  isLightMode={isLightMode}
                />
              </Tabs.Panel>
            </AnimatePresence>
          </div>

          {/* Left Arrow */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2">
            <ArrowButton
              direction="left"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
            />
          </div>

          {/* Right Arrow */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <ArrowButton
              direction="right"
              onClick={goToNext}
              disabled={currentIndex === slides.length - 1}
            />
          </div>

          {/* Bottom Pill Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <Tabs.List className="flex items-center gap-2">
              <PillIndicator
                total={slides.length}
                current={currentIndex}
                onSelect={goToSlide}
              />
            </Tabs.List>
          </div>

          {/* Slide Counter - Screen only */}
          <div className="print-hidden absolute bottom-12 left-8 text-xs text-quaternary font-mono">
            {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(slides.length).padStart(2, '0')}
          </div>
        </div>
      </Tabs.Root>

      {/* Print View - All slides rendered at once (hidden on screen, visible during print) */}
      <PrintView />
    </>
  )
}
