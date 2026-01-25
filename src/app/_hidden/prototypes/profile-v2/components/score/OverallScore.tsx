/**
 * OverallScore Component
 *
 * Displays the aggregate confidence score with health bar visualization.
 * Extracted from EditPanel for independent positioning.
 *
 * @module b/profile-v2/components/score
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// =============================================================================
// TYPES
// =============================================================================

export interface OverallScoreProps {
  score: number
  rank?: string
  networkAverage?: number
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function OverallScore({
  score,
  rank = '#142 in Design',
  networkAverage = 65,
  className,
}: OverallScoreProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-display font-bold text-primary">{score}</span>
        <span className="text-sm text-secondary">{rank}</span>
      </div>
      {/* Health bar with gradient */}
      <div className="relative h-2 w-full">
        <div className="h-full w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-white/20 via-white/40 to-white/60"
            style={{ width: `${score}%` }}
          />
        </div>
        {/* Network average hash mark */}
        <div
          className="absolute -top-0.5 h-[calc(100%+4px)] border-l border-dashed border-white/50"
          style={{ left: `${networkAverage}%` }}
        />
      </div>
    </div>
  )
}
