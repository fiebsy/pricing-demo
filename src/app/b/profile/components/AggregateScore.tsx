/**
 * AggregateScore Component
 *
 * Minimalist horizontal bar with network average indicator.
 *
 * @module b/profile/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { getScoreColorClass, getScoreColor } from '../constants'
import type { AggregateScoreProps } from '../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function AggregateScore({ score, className }: AggregateScoreProps) {
  const clampedValue = Math.max(0, Math.min(100, score.current))
  const networkAvg = Math.max(0, Math.min(100, score.networkAverage))

  const colorClass = getScoreColorClass(clampedValue)
  const scoreColor = getScoreColor(clampedValue)

  const bgColorMap = {
    success: 'var(--color-success-500)',
    warning: 'var(--color-warning-500)',
    error: 'var(--color-error-500)',
  }

  return (
    <div className={cn('w-full', className)}>
      {/* Label row */}
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-medium text-secondary">Confidence Score</span>
        <span className={cn('text-lg font-bold tabular-nums leading-none', colorClass)}>
          {clampedValue}
        </span>
      </div>

      {/* Progress bar with network average marker */}
      <div className="relative h-2 w-full">
        {/* Background track */}
        <div className="absolute inset-0 rounded-full bg-quaternary" />

        {/* Progress fill */}
        <div
          className={cn(
            'absolute inset-y-0 left-0 rounded-full',
            'motion-safe:transition-[width] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]',
            'motion-reduce:transition-none'
          )}
          style={{
            width: `${clampedValue}%`,
            backgroundColor: bgColorMap[scoreColor],
          }}
        />

        {/* Network average marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-full"
          style={{ left: `${networkAvg}%` }}
          title={`Network avg: ${networkAvg}`}
        />
      </div>

      {/* Network average label */}
      <div className="flex justify-end mt-1">
        <span className="text-[10px] text-tertiary">
          Network avg: {networkAvg}
        </span>
      </div>
    </div>
  )
}
