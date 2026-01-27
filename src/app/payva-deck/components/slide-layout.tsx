'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { SlideVariant } from '../data'
import { SlideSubtitle } from './slide-subtitle'

interface SlideLayoutProps {
  /** Visual variant for dark mode rhythm */
  variant: SlideVariant
  /** Header label (e.g., "THE PROBLEM") - renders as badge */
  label?: string
  /** Subtitle text for top-left (replaces label badge with plain text) */
  topLeftSubtitle?: string
  /** Current slide number (1-indexed) */
  slideNumber: number
  /** Total number of slides */
  totalSlides: number
  /** Slide content */
  children: React.ReactNode
  /** Additional classes for the container */
  className?: string
  /** Whether the deck is in light mode (overrides variant to light) */
  isLightMode?: boolean
}

/**
 * Layout wrapper implementing Supercard's slide anatomy.
 * Provides header zone with label and slide counter.
 * Applies variant-based background styling in dark mode.
 */
export function SlideLayout({
  variant,
  label,
  topLeftSubtitle,
  slideNumber,
  totalSlides,
  children,
  className,
  isLightMode = false,
}: SlideLayoutProps) {
  // In light mode, all variants render as light (white backgrounds)
  // In dark mode, variants provide visual rhythm
  const effectiveVariant = isLightMode ? 'light' : variant

  return (
    <div
      className={cn(
        'relative w-full h-full min-h-[60vh] flex flex-col',
        className
      )}
      data-variant={effectiveVariant}
    >
      {/* Top left - either subtitle (plain text) or label (badge) */}
      {topLeftSubtitle ? (
        <SlideSubtitle>{topLeftSubtitle}</SlideSubtitle>
      ) : label ? (
        <div className="w-full pt-4 px-4">
          <span className="text-xs font-bold tracking-wide text-tertiary bg-secondary px-2 py-1 rounded">
            {label}
          </span>
        </div>
      ) : null}

      {/* Content Zone */}
      <div className="flex-1 flex items-center justify-center w-full">
        {children}
      </div>
    </div>
  )
}
