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
        'rounded-2xl corner-squircle',
        'px-5 py-4',
        // Shine border
        'shine-1-subtle',
        // Hover and active states
        'motion-safe:transition-all motion-safe:duration-200',
        'motion-reduce:transition-none',
        'hover:-translate-y-0.5',
        'active:scale-[0.99] active:translate-y-0',
        // Remove focus ring
        'focus:outline-none',
        // Dimming state
        isDimmed && 'opacity-30',
        // Highlighting state
        isHighlighted && 'ring-2 ring-brand-primary ring-offset-2',
        className
      )}
    >

      {/* Question text - wraps naturally */}
      <p className="text-sm font-medium text-primary whitespace-nowrap">
        {question.text}
      </p>
    </button>
  )
}
