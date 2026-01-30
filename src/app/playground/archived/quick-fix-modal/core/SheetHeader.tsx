/**
 * SheetHeader - Header with back/close buttons
 *
 * Provides navigation controls for the sheet stack.
 *
 * @module playground/quick-fix-modal/core
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'

export interface SheetHeaderProps {
  /** Header title */
  title: string
  /** Whether back button is shown */
  canPop: boolean
  /** Whether close button is shown */
  showCloseButton?: boolean
  /** Callback for back button click */
  onBack: () => void
  /** Callback for close button click */
  onClose: () => void
  /** Whether the stack is animating (disables buttons) */
  isAnimating?: boolean
  /** Additional className */
  className?: string
}

/**
 * SheetHeader Component
 *
 * Renders the header with title and navigation buttons.
 * Back button appears when canPop is true.
 * Close button is always visible when showCloseButton is true.
 */
export function SheetHeader({
  title,
  canPop,
  showCloseButton = true,
  onBack,
  onClose,
  isAnimating = false,
  className,
}: SheetHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-6 py-4',
        'border-b border-primary',
        className
      )}
    >
      {/* Left: Back button or spacer */}
      <div className="w-10 flex justify-start">
        {canPop && (
          <button
            type="button"
            onClick={onBack}
            disabled={isAnimating}
            className={cn(
              'p-2 -ml-2 rounded-lg',
              'text-secondary hover:text-primary',
              'hover:bg-tertiary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
              'motion-safe:transition-colors motion-safe:duration-150',
              'disabled:opacity-50 disabled:pointer-events-none'
            )}
            aria-label="Go back"
          >
            <HugeIcon icon={ArrowLeft01Icon} size={20} className="text-current" />
          </button>
        )}
      </div>

      {/* Center: Title */}
      <h2 className="text-lg font-semibold text-primary flex-1 text-center truncate px-4">
        {title}
      </h2>

      {/* Right: Close button or spacer */}
      <div className="w-10 flex justify-end">
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            disabled={isAnimating}
            className={cn(
              'p-2 -mr-2 rounded-lg',
              'text-secondary hover:text-primary',
              'hover:bg-tertiary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
              'motion-safe:transition-colors motion-safe:duration-150',
              'disabled:opacity-50 disabled:pointer-events-none'
            )}
            aria-label="Close"
          >
            <HugeIcon icon={Cancel01Icon} size={20} className="text-current" />
          </button>
        )}
      </div>
    </div>
  )
}

// =============================================================================
// ANIMATED TITLE
// =============================================================================

export interface AnimatedTitleProps {
  /** Current title */
  title: string
  /** Previous title (for crossfade) */
  previousTitle?: string
  /** Whether transitioning */
  isTransitioning: boolean
  /** Transition direction */
  direction: 'push' | 'pop' | null
  /** Animation duration */
  duration?: number
  /** Additional className */
  className?: string
}

/**
 * AnimatedTitle - Title with crossfade animation
 *
 * Use when you want animated title transitions during navigation.
 */
export function AnimatedTitle({
  title,
  previousTitle,
  isTransitioning,
  direction,
  duration = 200,
  className,
}: AnimatedTitleProps) {
  // Calculate transform direction
  const getTransform = (isEntering: boolean) => {
    const offset = 20
    if (!isTransitioning) return 'translateX(0)'

    if (direction === 'push') {
      return isEntering ? `translateX(${offset}px)` : `translateX(-${offset}px)`
    }
    return isEntering ? `translateX(-${offset}px)` : `translateX(${offset}px)`
  }

  return (
    <div className={cn('relative flex-1 text-center overflow-hidden', className)}>
      {/* Previous title (exiting) */}
      {isTransitioning && previousTitle && (
        <h2
          className={cn(
            'absolute inset-0 text-lg font-semibold text-primary truncate px-4',
            'motion-safe:transition-all'
          )}
          style={{
            transform: getTransform(false),
            opacity: 0,
            transitionDuration: `${duration}ms`,
          }}
        >
          {previousTitle}
        </h2>
      )}

      {/* Current title (entering or static) */}
      <h2
        className={cn(
          'text-lg font-semibold text-primary truncate px-4',
          isTransitioning && 'motion-safe:transition-all'
        )}
        style={{
          transform: isTransitioning ? 'translateX(0)' : undefined,
          opacity: 1,
          transitionDuration: isTransitioning ? `${duration}ms` : undefined,
        }}
      >
        {title}
      </h2>
    </div>
  )
}
