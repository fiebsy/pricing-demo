/**
 * QuestionCard Component
 *
 * Clean card with subtle border, generous padding, and large corner radius.
 * Emulates bento.me widget styling with professional polish.
 *
 * @module b/profile-v2/components/bento-grid
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import type { QuestionCardProps } from '../../types'

// =============================================================================
// COMPONENT
// =============================================================================

export function QuestionCard({
  question,
  onClick,
  isHighlighted = false,
  isDimmed = false,
  className,
}: QuestionCardProps) {
  const handleClick = () => {
    onClick?.(question)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'group relative text-left w-auto',
        // Card styling - compact bento style with proper padding
        'bg-primary',
        'rounded-2xl',
        'px-5 py-4',
        // Subtle border like reference
        'border border-secondary',
        // Shadow styling - elevated on hover
        'shadow-sm',
        // Hover and active states
        'motion-safe:transition-all motion-safe:duration-200',
        'motion-reduce:transition-none',
        'hover:shadow-md',
        'hover:-translate-y-0.5',
        'active:scale-[0.99] active:translate-y-0',
        // Focus state
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
        // Dimming state
        isDimmed && 'opacity-30',
        // Highlighting state
        isHighlighted && 'ring-2 ring-brand-primary ring-offset-2 border-transparent',
        className
      )}
    >
      {/* Inner border highlight (like reference phantom-border) */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-primary" />

      {/* Question text - wraps naturally */}
      <p className="text-sm font-medium text-primary whitespace-nowrap">
        {question.text}
      </p>
    </button>
  )
}
