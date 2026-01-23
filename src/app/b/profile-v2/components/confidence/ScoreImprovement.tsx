/**
 * ScoreImprovement Component
 *
 * Floating "+2", "+1" indicators next to category scores.
 * Animates with scale and opacity.
 *
 * @module b/profile-v2/components/confidence
 */

'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { ScoreImprovementProps } from '../../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function ScoreImprovement({
  delta,
  className,
}: ScoreImprovementProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Trigger animation on mount
  useEffect(() => {
    // Small delay for animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  if (delta <= 0) return null

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        'px-1.5 py-0.5 rounded-md',
        'text-xs font-bold',
        'bg-success-primary/10 text-success-primary',
        // Animation states
        isVisible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-50',
        'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]',
        'motion-reduce:transition-none',
        className
      )}
    >
      +{delta}
    </span>
  )
}
