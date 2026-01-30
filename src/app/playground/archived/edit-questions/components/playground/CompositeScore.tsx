/**
 * CompositeScore - AI brain icon with formatted score
 *
 * Shows cumulative knowledge score (e.g., "12.1K") with AiBrain01Icon.
 * Subtle pulse animation when score increases.
 *
 * @module playground/edit-questions/components/playground
 */

'use client'

import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import AiBrain01Icon from '@hugeicons-pro/core-stroke-rounded/AiBrain01Icon'
import { formatScore } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface CompositeScoreProps {
  /** Raw score value */
  score: number
  /** Additional CSS classes */
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function CompositeScore({ score, className }: CompositeScoreProps) {
  const [isPulsing, setIsPulsing] = useState(false)
  const prevScoreRef = useRef(score)

  // Trigger pulse animation when score increases
  useEffect(() => {
    if (score > prevScoreRef.current) {
      setIsPulsing(true)
      const timer = setTimeout(() => setIsPulsing(false), 300)
      return () => clearTimeout(timer)
    }
    prevScoreRef.current = score
  }, [score])

  const formattedScore = formatScore(score)

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full',
        'bg-brand-primary/20',
        className
      )}
      role="status"
      aria-label={`Composite score: ${score.toLocaleString()}`}
    >
      {/* AI Brain icon */}
      <div
        className={cn(
          'flex items-center justify-center',
          'motion-safe:transition-transform motion-safe:duration-300',
          isPulsing && 'motion-safe:scale-110'
        )}
      >
        <HugeIcon
          icon={AiBrain01Icon}
          size={18}
          className="text-brand-primary"
        />
      </div>

      {/* Formatted score */}
      <span
        className={cn(
          'text-sm font-semibold text-white',
          'motion-safe:transition-transform motion-safe:duration-300',
          isPulsing && 'motion-safe:scale-105'
        )}
      >
        {formattedScore}
      </span>
    </div>
  )
}
