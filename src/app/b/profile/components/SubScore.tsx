/**
 * SubScore Component
 *
 * Individual sub-score item within a category.
 * Animates with stagger on accordion expansion.
 *
 * @module b/profile/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ScoreProgressBar } from './ScoreProgressBar'
import { getScoreColorClass } from '../constants'
import type { SubScoreProps } from '../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function SubScore({ item, index, className }: SubScoreProps) {
  const colorClass = getScoreColorClass(item.score.current)

  return (
    <div
      className={cn(
        'flex items-center gap-3 py-2',
        // Stagger animation on appear
        'opacity-0 translate-y-[-8px]',
        'motion-safe:animate-[fadeSlideIn_150ms_ease-out_forwards]',
        'motion-reduce:opacity-100 motion-reduce:translate-y-0',
        className
      )}
      style={{
        // Stagger delay based on index
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Label */}
      <span className="text-sm text-secondary w-24 shrink-0">{item.label}</span>

      {/* Progress bar */}
      <div className="flex-1">
        <ScoreProgressBar
          value={item.score.current}
          networkAverage={item.score.networkAverage}
          size="sm"
        />
      </div>

      {/* Score value */}
      <span className={cn('text-sm font-medium tabular-nums w-8 text-right', colorClass)}>
        {item.score.current}
      </span>
    </div>
  )
}
