/**
 * TabIndicator Component
 *
 * Animated sliding pill/underline for tab selection.
 * Uses transform for S-tier animation performance.
 *
 * @module b/profile-v2/components/edit-panel
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

// =============================================================================
// TYPES
// =============================================================================

interface TabIndicatorProps {
  /** Active tab index (0 or 1) */
  activeIndex: number
  /** Total number of tabs */
  tabCount: number
  /** Container width (will divide equally) */
  containerWidth?: number
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function TabIndicator({
  activeIndex,
  tabCount,
  containerWidth,
  className,
}: TabIndicatorProps) {
  // Calculate translateX based on active index
  const translateX = `${activeIndex * 100}%`

  return (
    <div
      className={cn(
        'absolute inset-0',
        'pointer-events-none',
        className
      )}
    >
      <div
        className={cn(
          'absolute top-1 bottom-1',
          'bg-brand-primary/10 rounded-lg',
          'motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]',
          'motion-reduce:transition-none'
        )}
        style={{
          width: `${100 / tabCount}%`,
          transform: `translateX(${translateX})`,
        }}
      />
    </div>
  )
}
