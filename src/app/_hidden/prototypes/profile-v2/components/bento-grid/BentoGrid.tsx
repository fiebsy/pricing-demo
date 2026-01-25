/**
 * BentoGrid Component
 *
 * Grid container for question cards with generous spacing.
 * Emulates bento.me style with 40px gaps and clean aesthetics.
 *
 * @module b/profile-v2/components/bento-grid
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { BentoGridProps } from '../../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        // Inline wrap layout - cards wrap to text
        'flex flex-wrap gap-3',
        // Padding around the grid
        'p-4',
        className
      )}
    >
      {children}
    </div>
  )
}
