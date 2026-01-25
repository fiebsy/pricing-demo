'use client'

/**
 * StickyDataTable V2 - Auto Column FLIP Animation Hook
 *
 * Automatically detects column changes and applies FLIP animations.
 * No manual capture/animate calls needed - just pass the container ref
 * and column keys, and it handles the rest.
 *
 * @module hooks/use-auto-column-flip
 */

import { useLayoutEffect, useRef } from 'react'
import { ANIMATION_CONFIG } from '../../config'

// ============================================================================
// TYPES
// ============================================================================

interface ColumnRect {
  left: number
  width: number
}

interface UseAutoColumnFlipOptions {
  /** Enable/disable animations */
  enabled?: boolean
  /** Animation duration in ms */
  duration?: number
  /** Minimum movement (px) to trigger animation */
  threshold?: number
  /** CSS easing function */
  easing?: string
  /** Key of the column being dragged (excluded from animation) */
  draggedKey?: string | null
  /** Ref containing the dragged key (read at effect time for correct timing) */
  draggedKeyRef?: React.RefObject<string | null>
  /** Whether the component is still hydrating from localStorage (suppresses animation) */
  isHydrating?: boolean
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * Auto-FLIP hook for column animations
 *
 * Usage:
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null)
 * useAutoColumnFlip(containerRef, visibleColumnKeys)
 *
 * return <div ref={containerRef}>...</div>
 * ```
 */
export function useAutoColumnFlip(
  containerRef: React.RefObject<HTMLElement | null>,
  columnKeys: Set<string> | string[],
  options: UseAutoColumnFlipOptions = {}
) {
  const {
    enabled = true,
    duration = ANIMATION_CONFIG.COLUMN_ANIMATION_DURATION,
    threshold = 2,
    easing = 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    draggedKey = null,
    draggedKeyRef,
    isHydrating = false,
  } = options

  // Store previous positions
  const prevPositionsRef = useRef<Map<string, ColumnRect>>(new Map())
  const prevKeysRef = useRef<string[]>([])
  const isFirstRenderRef = useRef(true)

  // Convert to array for comparison
  const keysArray = Array.isArray(columnKeys) ? columnKeys : [...columnKeys]
  const keysString = keysArray.join(',')

  useLayoutEffect(() => {
    if (!enabled) return

    const container = containerRef.current
    if (!container) return

    // Check for reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    // Skip animation during hydration (localStorage loading)
    // This prevents the flash when saved column order differs from defaults
    if (isHydrating) {
      // Still capture positions so we're ready for user-initiated changes
      capturePositions(container, prevPositionsRef.current)
      prevKeysRef.current = keysArray
      return
    }

    // Skip animation on first render
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      // Capture initial positions for next change
      capturePositions(container, prevPositionsRef.current)
      prevKeysRef.current = keysArray
      return
    }

    // Check if columns actually changed
    const prevKeys = prevKeysRef.current
    const keysChanged = keysString !== prevKeys.join(',')

    if (!keysChanged) {
      // No change, just update positions for next time
      capturePositions(container, prevPositionsRef.current)
      return
    }

    // Determine which columns actually changed INDEX (not just position)
    // Only these columns should animate
    const changedIndexKeys = new Set<string>()
    keysArray.forEach((key, newIndex) => {
      const oldIndex = prevKeys.indexOf(key)
      if (oldIndex !== -1 && oldIndex !== newIndex) {
        changedIndexKeys.add(key)
      }
    })

    // Read dragged key from ref at effect time (more reliable than render-time value)
    const effectDraggedKey = draggedKeyRef?.current ?? draggedKey

    // FLIP: Animate only columns that changed index
    const oldPositions = prevPositionsRef.current
    const columns = container.querySelectorAll('[data-column-key]')
    const containerRect = container.getBoundingClientRect()
    const animations: Animation[] = []

    columns.forEach((el) => {
      const key = el.getAttribute('data-column-key')
      if (!key) return

      // Skip columns that didn't change index
      if (!changedIndexKeys.has(key)) {
        return
      }

      // Skip the dragged column (it snaps, others animate)
      if (effectDraggedKey && key === effectDraggedKey) {
        return
      }

      const oldPos = oldPositions.get(key)
      if (!oldPos) {
        // New column - skip, it has its own enter animation
        return
      }

      // Skip columns with enter/leave animations
      if (el.hasAttribute('data-column-entering') || el.hasAttribute('data-column-leaving')) {
        return
      }

      // Calculate new position relative to container (same as captured positions)
      const newRect = el.getBoundingClientRect()
      const newLeft = newRect.left - containerRect.left
      const deltaX = oldPos.left - newLeft

      if (Math.abs(deltaX) <= threshold) {
        return // Movement too small
      }

      // FLIP animation using WAAPI
      try {
        const animation = (el as HTMLElement).animate(
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
      } catch (e) {
        console.warn('[AutoFLIP] Animation failed:', e)
      }
    })

    // Update stored state for next change
    prevKeysRef.current = keysArray
    // Capture new positions after a tick (after animations start)
    requestAnimationFrame(() => {
      capturePositions(container, prevPositionsRef.current)
    })

  }, [keysString, enabled, duration, threshold, easing, containerRef, keysArray, draggedKey, isHydrating])
}

/**
 * Capture current positions of all columns in a container
 * Uses container-relative positions to avoid scroll/viewport offset issues
 */
function capturePositions(container: HTMLElement, storage: Map<string, ColumnRect>) {
  storage.clear()
  const columns = container.querySelectorAll('[data-column-key]')
  const containerRect = container.getBoundingClientRect()

  columns.forEach((el) => {
    const key = el.getAttribute('data-column-key')
    if (!key) return

    const rect = el.getBoundingClientRect()
    // Store position relative to container, not viewport
    storage.set(key, {
      left: rect.left - containerRect.left,
      width: rect.width,
    })
  })
}
