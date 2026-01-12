/**
 * StickyDataTable V2 - Column FLIP Animation Hook
 *
 * Implements the FLIP technique (First, Last, Invert, Play) for smooth
 * column add/remove animations. Uses Web Animations API (WAAPI) for
 * S-Tier performance (transform-only animations).
 *
 * @see https://aerotwist.com/blog/flip-your-animations/
 * @see /docs/frontend/ANIMATION-PREFERENCES.md (B-Tier FLIP pattern)
 *
 * @module hooks/use-column-flip
 */

import { useCallback, useRef } from 'react'

import { ANIMATION_CONFIG } from '../config'

// ============================================================================
// TYPES
// ============================================================================

interface ColumnPosition {
  key: string
  left: number
  width: number
}

interface UseColumnFlipOptions {
  /** Minimum delta (px) to trigger animation - avoids micro-animations */
  threshold?: number
  /** Animation duration in ms */
  duration?: number
  /** CSS easing function */
  easing?: string
}

interface UseColumnFlipReturn {
  /** Call before DOM changes to capture current positions */
  capturePositions: () => void
  /** Call after DOM changes to animate neighbors into place */
  animateShifts: () => void
  /** Check if FLIP animation is currently running */
  isAnimating: boolean
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_OPTIONS: Required<UseColumnFlipOptions> = {
  threshold: 2, // Minimum 2px movement to animate
  duration: ANIMATION_CONFIG.COLUMN_ANIMATION_DURATION,
  easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', // --ease-standard from ANIMATION-PREFERENCES.md
}

// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================

/**
 * Hook for FLIP-based column animations
 *
 * Usage:
 * ```tsx
 * const { capturePositions, animateShifts } = useColumnFlip(containerRef)
 *
 * const toggleColumn = (key: string) => {
 *   capturePositions()           // FIRST: Record positions
 *   setVisibleColumns(...)       // DOM update
 *   requestAnimationFrame(() => {
 *     animateShifts()            // LAST + INVERT + PLAY
 *   })
 * }
 * ```
 */
export function useColumnFlip(
  containerRef: React.RefObject<HTMLElement>,
  options: UseColumnFlipOptions = {}
): UseColumnFlipReturn {
  const { threshold, duration, easing } = { ...DEFAULT_OPTIONS, ...options }

  // Store column positions from FIRST phase
  const positionsRef = useRef<Map<string, ColumnPosition>>(new Map())
  const isAnimatingRef = useRef(false)

  /**
   * FIRST: Capture current positions of all columns
   * Call this BEFORE making DOM changes
   */
  const capturePositions = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const columns = container.querySelectorAll('[data-column-key]')
    const positions = new Map<string, ColumnPosition>()

    columns.forEach((el) => {
      const key = el.getAttribute('data-column-key')
      if (!key) return

      const rect = el.getBoundingClientRect()
      positions.set(key, {
        key,
        left: rect.left,
        width: rect.width,
      })
    })

    positionsRef.current = positions
  }, [containerRef])

  /**
   * LAST + INVERT + PLAY: Calculate deltas and animate
   * Call this AFTER DOM changes have been applied
   */
  const animateShifts = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const oldPositions = positionsRef.current
    if (oldPositions.size === 0) return

    isAnimatingRef.current = true

    // Use RAF to ensure DOM has updated
    requestAnimationFrame(() => {
      const columns = container.querySelectorAll('[data-column-key]')
      const animations: Animation[] = []

      columns.forEach((el) => {
        const key = el.getAttribute('data-column-key')
        if (!key) return

        const oldPos = oldPositions.get(key)
        if (!oldPos) return // New column, handled by enter animation

        const newRect = el.getBoundingClientRect()
        const deltaX = oldPos.left - newRect.left

        // Only animate if movement exceeds threshold
        if (Math.abs(deltaX) <= threshold) return

        // Skip columns that are entering or leaving (they have their own animations)
        if (el.hasAttribute('data-column-entering') || el.hasAttribute('data-column-leaving')) {
          return
        }

        // INVERT + PLAY: Animate from old position to new position
        const animation = el.animate(
          [
            { transform: `translateX(${deltaX}px)` },
            { transform: 'translateX(0)' },
          ],
          {
            duration,
            easing,
            fill: 'none',
          }
        )

        animations.push(animation)
      })

      // Clear positions and animating state when all animations complete
      if (animations.length > 0) {
        Promise.all(animations.map((a) => a.finished))
          .then(() => {
            isAnimatingRef.current = false
            positionsRef.current.clear()
          })
          .catch(() => {
            // Animation was cancelled, that's fine
            isAnimatingRef.current = false
          })
      } else {
        isAnimatingRef.current = false
        positionsRef.current.clear()
      }
    })
  }, [containerRef, threshold, duration, easing])

  return {
    capturePositions,
    animateShifts,
    get isAnimating() {
      return isAnimatingRef.current
    },
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if the browser supports Web Animations API
 * All modern browsers support it, but good to have a fallback check
 */
export function supportsWAAPI(): boolean {
  return typeof Element.prototype.animate === 'function'
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
