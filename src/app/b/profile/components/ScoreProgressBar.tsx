/**
 * ScoreProgressBar Component
 *
 * Horizontal progress bar with network average benchmark line.
 * Uses S-tier animation (scaleX transform, not width).
 *
 * @module b/profile/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { getScoreBgClass } from '../constants'
import type { ScoreProgressBarProps } from '../types'

// =============================================================================
// SIZE PRESETS
// =============================================================================

const sizeConfig = {
  sm: { height: 'h-1', labelSize: 'text-xs' },
  md: { height: 'h-1.5', labelSize: 'text-sm' },
  lg: { height: 'h-2', labelSize: 'text-base' },
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ScoreProgressBar({
  value,
  networkAverage,
  showBenchmark = true,
  size = 'md',
  className,
}: ScoreProgressBarProps) {
  const config = sizeConfig[size]
  const clampedValue = Math.max(0, Math.min(100, value))
  const fillColorClass = getScoreBgClass(clampedValue)

  return (
    <div className={cn('relative w-full', className)}>
      {/* Track */}
      <div
        className={cn(
          'w-full rounded-full overflow-hidden',
          'bg-quaternary',
          config.height
        )}
      >
        {/* Fill - uses scaleX for S-tier animation */}
        <div
          className={cn(
            'h-full rounded-full origin-left',
            'motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]',
            'motion-reduce:transition-none',
            fillColorClass
          )}
          style={{ transform: `scaleX(${clampedValue / 100})` }}
        />
      </div>

      {/* Network average benchmark line */}
      {showBenchmark && networkAverage !== undefined && (
        <div
          className={cn(
            'absolute top-0 h-full w-0.5',
            'border-l-2 border-dashed border-tertiary/50',
            'motion-safe:transition-[left] motion-safe:duration-300',
            'motion-reduce:transition-none'
          )}
          style={{ left: `${networkAverage}%` }}
          aria-label={`Network average: ${networkAverage}%`}
        />
      )}
    </div>
  )
}
