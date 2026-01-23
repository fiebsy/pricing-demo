/**
 * SuccessToast - Auto-dismissing toast with progress bar
 *
 * Features:
 * - Vertically centered icon
 * - Progress bar showing time until dismissal
 * - Simple content props for easy updates
 */

'use client'

import * as React from 'react'
import { useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import CheckmarkCircle01Icon from '@hugeicons-pro/core-stroke-rounded/CheckmarkCircle01Icon'

// =============================================================================
// TYPES
// =============================================================================

export interface SuccessToastProps {
  /** Main title text */
  title: string
  /** Optional subtitle/description */
  subtitle?: string
  /** Custom icon component (defaults to checkmark) */
  icon?: React.ComponentType
  /** Whether the toast is visible */
  visible: boolean
  /** Callback when toast should be dismissed */
  onDismiss?: () => void
  /** Duration in ms before auto-dismiss (default: 3000) */
  duration?: number
  /** Padding in pixels (default: 16) */
  padding?: number
  /** Additional class names */
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export function SuccessToast({
  title,
  subtitle,
  icon: IconComponent,
  visible,
  onDismiss,
  duration = 3000,
  padding = 16,
  className,
}: SuccessToastProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(visible)
  const [progress, setProgress] = useState(0)

  const Icon = IconComponent || CheckmarkCircle01Icon

  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      setShouldRender(true)
      setProgress(0)
      // Small delay to trigger animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
    } else {
      setIsAnimating(false)
      setProgress(0)
      // Wait for exit animation before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 250)
      return () => clearTimeout(timer)
    }
  }, [visible])

  // Progress bar animation and auto-dismiss
  useEffect(() => {
    if (!visible || !isAnimating) return

    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(interval)
        onDismiss?.()
      }
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [visible, isAnimating, duration, onDismiss])

  if (!shouldRender) return null

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'bg-secondary',
        'shine-1-subtle corner-squircle',
        'motion-safe:transition-all',
        className
      )}
      style={{
        padding,
        borderRadius: 16,
        transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
        opacity: isAnimating ? 1 : 0,
        transitionDuration: '250ms',
        transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
    >
      {/* Content */}
      <div className="flex items-center gap-3">
        {/* Icon container - vertically centered */}
        <div
          className="flex items-center justify-center flex-shrink-0 rounded-lg bg-success-primary/10"
          style={{
            width: 32,
            height: 32,
          }}
        >
          <HugeIcon
            icon={Icon}
            size={20}
            className="text-success-primary"
          />
        </div>

        {/* Text content */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-primary">
            {title}
          </span>
          {subtitle && (
            <span className="text-xs font-normal text-tertiary mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-tertiary/20"
        style={{ height: 3 }}
      >
        <div
          className="h-full bg-brand-primary motion-safe:transition-none"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  )
}
