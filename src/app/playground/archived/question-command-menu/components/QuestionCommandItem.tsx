/**
 * QuestionCommandItem - Individual question rendered as a command menu trigger
 *
 * Renders each question as a standalone styled container that matches
 * the BiaxialExpandV4 backdrop appearance. Clicking navigates to detail view.
 *
 * @module playground/question-command-menu/components
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle02Icon'
import AlertCircleIcon from '@hugeicons-pro/core-stroke-rounded/AlertCircleIcon'
import Time02Icon from '@hugeicons-pro/core-stroke-rounded/Time02Icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'

import type { Question, QuestionStatus } from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface QuestionCommandItemProps {
  /** The question to display */
  question: Question
  /** Called when the item is clicked */
  onClick?: () => void
  /** Additional className */
  className?: string
}

// =============================================================================
// STATUS ICON CONFIG
// =============================================================================

const STATUS_CONFIG: Record<
  QuestionStatus,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  answered: { icon: CheckmarkCircle02Icon, color: 'text-success-primary' },
  orphaned: { icon: AlertCircleIcon, color: 'text-warning-primary' },
  pending: { icon: Time02Icon, color: 'text-quaternary' },
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function QuestionCommandItem({
  question,
  onClick,
  className,
}: QuestionCommandItemProps) {
  const statusConfig = STATUS_CONFIG[question.status]

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        // Layout
        'w-full flex items-center gap-3 px-4 h-12',
        // Background & border - matches BiaxialExpandV4 backdrop
        'bg-tertiary',
        'border border-primary',
        'rounded-2xl',
        // Shadow & depth
        'shadow-lg shadow-black/5',
        // Interaction states
        'hover:bg-secondary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-primary',
        // Transition
        'motion-safe:transition-all motion-safe:duration-200',
        className
      )}
    >
      {/* Status icon */}
      <div className="shrink-0">
        <HugeIcon icon={statusConfig.icon} size="sm" className={statusConfig.color} />
      </div>

      {/* Question text */}
      <span className="flex-1 text-sm text-secondary truncate text-left">
        {question.text}
      </span>

      {/* Arrow indicator */}
      <HugeIcon
        icon={ArrowRight01Icon}
        size="sm"
        className="shrink-0 text-quaternary"
      />
    </button>
  )
}
