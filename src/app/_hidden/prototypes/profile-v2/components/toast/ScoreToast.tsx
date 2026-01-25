/**
 * ScoreToast Component
 *
 * Extended success toast for score improvements.
 * Shows "+3 to your confidence score" with improved areas.
 *
 * @module b/profile-v2/components/toast
 */

'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import CheckmarkCircle02Icon from '@hugeicons-pro/core-solid-rounded/CheckmarkCircle02Icon'
import { ANIMATION_DURATIONS, Z_INDEX } from '../../config'
import type { ScoreToastProps } from '../../types'

// =============================================================================
// CATEGORY LABELS
// =============================================================================

const categoryLabels: Record<string, string> = {
  career: 'Career',
  growth: 'Growth',
  skills: 'Skills',
  business: 'Business',
  tone: 'Tone',
  style: 'Style',
  personality: 'Personality',
  responses: 'Responses',
  visual: 'Visual',
  branding: 'Branding',
  presentation: 'Presentation',
  media: 'Media',
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ScoreToast({
  title,
  improvements,
  onClose,
  className,
}: ScoreToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  // Auto-dismiss
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose()
    }, ANIMATION_DURATIONS.toastDismiss)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose()
    }, ANIMATION_DURATIONS.base)
  }

  // Calculate total improvement
  const totalDelta = improvements.reduce((sum, imp) => sum + imp.delta, 0)

  // Get improved area names
  const improvedAreas = improvements
    .map((imp) => categoryLabels[imp.categoryId] || imp.categoryId)
    .slice(0, 3) // Max 3 areas to show

  return (
    <div
      className={cn(
        'fixed top-6 right-6',
        'flex items-start gap-3',
        'bg-primary border border-primary rounded-2xl',
        'p-4 pr-10',
        'shadow-lg',
        'max-w-sm w-full mx-4',
        // Animation - slide in from right
        isVisible && !isExiting
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-8',
        'motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]',
        'motion-reduce:transition-none',
        className
      )}
      style={{ zIndex: Z_INDEX.toast }}
      role="alert"
    >
      {/* Success icon */}
      <div className="shrink-0">
        <HugeIcon
          icon={CheckmarkCircle02Icon}
          size={24}
          className="text-success-primary"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-primary">
          {title || `Congratulations! +${totalDelta} to your confidence score`}
        </p>
        {improvedAreas.length > 0 && (
          <p className="text-xs text-tertiary mt-1">
            Improved: {improvedAreas.join(', ')}
            {improvements.length > 3 && ` +${improvements.length - 3} more`}
          </p>
        )}
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={handleClose}
        className={cn(
          'absolute top-3 right-3',
          'flex items-center justify-center',
          'size-6 rounded-full',
          'text-tertiary hover:text-primary',
          'hover:bg-secondary',
          'motion-safe:transition-colors motion-safe:duration-150',
          'motion-reduce:transition-none'
        )}
        aria-label="Close notification"
      >
        <HugeIcon icon={Cancel01Icon} size={16} />
      </button>
    </div>
  )
}
