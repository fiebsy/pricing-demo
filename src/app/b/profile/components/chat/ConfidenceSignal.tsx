/**
 * ConfidenceSignal Component
 *
 * Wi-Fi signal strength indicator for message confidence.
 * 4 bars (80%+), 3 bars (60-79%), 2 bars (40-59%), 1 bar (<40%)
 *
 * @module b/profile/components/chat
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// =============================================================================
// TYPES
// =============================================================================

type ConfidenceLevel = 1 | 2 | 3 | 4

interface ConfidenceSignalProps {
  /** Confidence value 0-1 */
  confidence: number
  /** Size of the signal */
  size?: 'sm' | 'md'
  /** Variant for different contexts */
  variant?: 'default' | 'inverted'
  className?: string
}

// =============================================================================
// HELPERS
// =============================================================================

function getConfidenceLevel(confidence: number): ConfidenceLevel {
  if (confidence >= 0.8) return 4
  if (confidence >= 0.6) return 3
  if (confidence >= 0.4) return 2
  return 1
}

function getConfidenceColor(level: ConfidenceLevel): string {
  switch (level) {
    case 4:
      return 'bg-emerald-400'
    case 3:
      return 'bg-emerald-400'
    case 2:
      return 'bg-amber-400'
    case 1:
      return 'bg-red-400'
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ConfidenceSignal({
  confidence,
  size = 'sm',
  variant = 'default',
  className,
}: ConfidenceSignalProps) {
  const level = getConfidenceLevel(confidence)
  const color = variant === 'inverted' ? 'bg-white' : getConfidenceColor(level)
  const inactiveColor = variant === 'inverted' ? 'bg-white/30' : 'bg-white/20'

  const barSizes = size === 'sm'
    ? { width: 2, gap: 1, heights: [4, 6, 8, 10] }
    : { width: 3, gap: 1.5, heights: [6, 9, 12, 15] }

  return (
    <div
      className={cn(
        'flex items-end',
        className
      )}
      style={{ gap: `${barSizes.gap}px` }}
      role="img"
      aria-label={`Confidence: ${Math.round(confidence * 100)}%`}
    >
      {barSizes.heights.map((height, index) => {
        const barLevel = index + 1
        const isActive = barLevel <= level

        return (
          <div
            key={index}
            className={cn(
              'rounded-full',
              'motion-safe:transition-colors motion-safe:duration-150',
              'motion-reduce:transition-none',
              isActive ? color : inactiveColor
            )}
            style={{
              width: `${barSizes.width}px`,
              height: `${height}px`,
            }}
          />
        )
      })}
    </div>
  )
}
