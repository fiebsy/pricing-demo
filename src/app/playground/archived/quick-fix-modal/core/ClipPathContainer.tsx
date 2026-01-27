/**
 * ClipPathContainer - Animated height reveal via clip-path
 *
 * Uses clip-path transitions for S-tier animation performance.
 * Content is measured via ResizeObserver and revealed smoothly.
 *
 * @module playground/quick-fix-modal/core
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useContentMeasurement } from '../hooks/useContentMeasurement'
import { EASING_EXPO_OUT } from '../config/defaults'

export interface ClipPathContainerProps {
  /** Whether the content is revealed */
  isRevealed: boolean
  /** Border radius for the clip-path (matches container) */
  borderRadius?: number
  /** Transition duration in ms */
  duration?: number
  /** Transition delay in ms */
  delay?: number
  /** Custom easing function */
  easing?: string
  /** Content to render */
  children: React.ReactNode
  /** Additional className */
  className?: string
  /** Callback when transition ends */
  onTransitionEnd?: () => void
}

/**
 * ClipPathContainer
 *
 * Animates content reveal using clip-path for compositor-only performance.
 * Falls back to opacity for reduced-motion users.
 *
 * Animation approach (S-Tier):
 * - Collapsed: `clip-path: inset(0 0 ${height}px 0 round ${radius}px)`
 * - Revealed: `clip-path: inset(0 0 0 0 round ${radius}px)`
 */
export function ClipPathContainer({
  isRevealed,
  borderRadius = 0,
  duration = 300,
  delay = 0,
  easing = EASING_EXPO_OUT,
  children,
  className,
  onTransitionEnd,
}: ClipPathContainerProps) {
  const { ref, measurement, hasMeasured } = useContentMeasurement()

  // Calculate clip-path based on reveal state
  const clipPath = isRevealed
    ? `inset(0 0 0 0 round ${borderRadius}px)`
    : `inset(0 0 ${measurement.height}px 0 round ${borderRadius}px)`

  // Only animate after first measurement
  const shouldAnimate = hasMeasured

  return (
    <div
      className={cn(
        'overflow-hidden',
        'motion-reduce:transition-opacity motion-reduce:duration-150',
        className
      )}
      style={{
        clipPath,
        transition: shouldAnimate
          ? `clip-path ${duration}ms ${easing} ${delay}ms`
          : 'none',
      }}
      onTransitionEnd={(e) => {
        // Only fire for clip-path transitions
        if (e.propertyName === 'clip-path') {
          onTransitionEnd?.()
        }
      }}
    >
      <div ref={ref}>
        {children}
      </div>
    </div>
  )
}

// =============================================================================
// CLIP PATH VARIANTS
// =============================================================================

export interface ClipPathRevealProps extends Omit<ClipPathContainerProps, 'borderRadius'> {
  /** Direction to reveal from */
  direction?: 'top' | 'bottom' | 'left' | 'right'
  /** Border radius for corners */
  borderRadius?: number
}

/**
 * ClipPathReveal - Directional clip-path reveal animation
 *
 * Supports revealing from any edge.
 */
export function ClipPathReveal({
  isRevealed,
  direction = 'bottom',
  borderRadius = 0,
  duration = 300,
  delay = 0,
  easing = EASING_EXPO_OUT,
  children,
  className,
  onTransitionEnd,
}: ClipPathRevealProps) {
  const { ref, measurement, hasMeasured } = useContentMeasurement()

  // Calculate clip-path based on direction
  const getClipPath = () => {
    if (isRevealed) {
      return `inset(0 0 0 0 round ${borderRadius}px)`
    }

    switch (direction) {
      case 'top':
        return `inset(${measurement.height}px 0 0 0 round ${borderRadius}px)`
      case 'bottom':
        return `inset(0 0 ${measurement.height}px 0 round ${borderRadius}px)`
      case 'left':
        return `inset(0 0 0 ${measurement.width}px round ${borderRadius}px)`
      case 'right':
        return `inset(0 ${measurement.width}px 0 0 round ${borderRadius}px)`
      default:
        return `inset(0 0 ${measurement.height}px 0 round ${borderRadius}px)`
    }
  }

  const shouldAnimate = hasMeasured

  return (
    <div
      className={cn(
        'overflow-hidden',
        'motion-reduce:transition-opacity motion-reduce:duration-150',
        className
      )}
      style={{
        clipPath: getClipPath(),
        transition: shouldAnimate
          ? `clip-path ${duration}ms ${easing} ${delay}ms`
          : 'none',
      }}
      onTransitionEnd={(e) => {
        if (e.propertyName === 'clip-path') {
          onTransitionEnd?.()
        }
      }}
    >
      <div ref={ref}>
        {children}
      </div>
    </div>
  )
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Calculate clip-path inset string for partial reveal.
 * Used for sheet stack depth effects.
 */
export function getPartialClipPath(
  progress: number,
  height: number,
  borderRadius: number
): string {
  const hiddenHeight = height * (1 - progress)
  return `inset(0 0 ${hiddenHeight}px 0 round ${borderRadius}px)`
}

/**
 * Calculate clip-path for bi-directional reveal (center outward).
 */
export function getCenterClipPath(
  progress: number,
  width: number,
  height: number,
  borderRadius: number
): string {
  const hiddenWidth = (width * (1 - progress)) / 2
  const hiddenHeight = (height * (1 - progress)) / 2
  return `inset(${hiddenHeight}px ${hiddenWidth}px ${hiddenHeight}px ${hiddenWidth}px round ${borderRadius}px)`
}
