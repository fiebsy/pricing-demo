'use client'

/**
 * StickyDataTable V2 - Wheel Scroll Containment Hook
 *
 * Manages scroll behavior for horizontal-scroll containers to prevent
 * scroll trapping while maintaining natural UX.
 *
 * DESIGN PRINCIPLES:
 * 1. Vertical scroll ALWAYS passes through to the page (never trapped)
 * 2. Horizontal scroll is contained ONLY when the table can scroll in that direction
 * 3. At horizontal boundaries, scroll escapes to parent (no trapping)
 * 4. Momentum scrolling and trackpad gestures work naturally
 *
 * @module hooks/use-wheel-redirect
 */

import { useEffect, useRef, useCallback } from 'react'

interface UseWheelRedirectProps {
  /** Reference to the scrollable body element */
  bodyRef: React.RefObject<HTMLDivElement | null>
  /** Enable/disable scroll management */
  enabled?: boolean
}

/** Threshold in pixels to consider "at boundary" (accounts for sub-pixel rounding) */
const BOUNDARY_THRESHOLD = 1

/** Minimum delta to consider intentional scroll vs noise */
const MIN_SCROLL_DELTA = 1

/**
 * Determines if the container can scroll in the given horizontal direction
 */
function canScrollInDirection(
  element: HTMLElement,
  deltaX: number
): boolean {
  const { scrollLeft, scrollWidth, clientWidth } = element
  const hasOverflow = scrollWidth > clientWidth

  if (!hasOverflow) return false

  // Scrolling left (deltaX < 0): can scroll if not at left edge
  if (deltaX < 0) {
    return scrollLeft > BOUNDARY_THRESHOLD
  }

  // Scrolling right (deltaX > 0): can scroll if not at right edge
  if (deltaX > 0) {
    return scrollLeft + clientWidth < scrollWidth - BOUNDARY_THRESHOLD
  }

  return false
}

/**
 * Hook for intelligent scroll containment
 *
 * This hook implements a "pass-through by default" strategy:
 * - Vertical scroll: NEVER intercepted, always propagates to page
 * - Horizontal scroll: Only contained when table has room to scroll
 * - Boundary behavior: Events escape at scroll edges
 *
 * This approach is more robust than redirect-based solutions because:
 * - Uses native browser scrolling (respects momentum, accessibility)
 * - No manual window.scrollBy() calls that can fail
 * - Works in nested scroll contexts (modals, iframes)
 * - Supports trackpad gestures naturally
 *
 * @example
 * ```tsx
 * useWheelRedirect({ bodyRef: scrollContainerRef })
 * ```
 */
export function useWheelRedirect({
  bodyRef,
  enabled = true,
}: UseWheelRedirectProps): void {
  // Track if we're in the middle of a horizontal scroll gesture
  // This helps with diagonal scrolling where we want consistency
  const isHorizontalGestureRef = useRef(false)
  const gestureTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const resetGesture = useCallback(() => {
    isHorizontalGestureRef.current = false
  }, [])

  useEffect(() => {
    if (!enabled) return

    const body = bodyRef.current
    if (!body) return

    const handleWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX)
      const absY = Math.abs(e.deltaY)

      // Ignore negligible scroll events (noise)
      if (absX < MIN_SCROLL_DELTA && absY < MIN_SCROLL_DELTA) {
        return
      }

      // Determine scroll intent
      const isVerticalDominant = absY > absX
      const isHorizontalDominant = absX > absY
      const isDiagonal = absX > MIN_SCROLL_DELTA && absY > MIN_SCROLL_DELTA

      // VERTICAL SCROLL: Always pass through
      // The body has overflow-y: hidden, so it can't scroll vertically.
      // We do NOTHING here - let the event propagate naturally to the page.
      if (isVerticalDominant && !isDiagonal) {
        // Clear any horizontal gesture tracking
        isHorizontalGestureRef.current = false
        return // Let event propagate naturally
      }

      // HORIZONTAL SCROLL: Contain only when table can scroll
      if (isHorizontalDominant || (isDiagonal && isHorizontalGestureRef.current)) {
        const canScroll = canScrollInDirection(body, e.deltaX)

        if (canScroll) {
          // Table can scroll in this direction - contain the scroll
          // Don't preventDefault - let the natural scroll happen on the element
          // Just stop propagation to prevent parent horizontal scroll
          e.stopPropagation()

          // Track that we're in a horizontal gesture
          isHorizontalGestureRef.current = true

          // Reset gesture tracking after inactivity
          if (gestureTimeoutRef.current) {
            clearTimeout(gestureTimeoutRef.current)
          }
          gestureTimeoutRef.current = setTimeout(resetGesture, 150)
        }
        // If can't scroll (at boundary), do nothing - event propagates to parent
        return
      }

      // DIAGONAL SCROLL (not in horizontal gesture): Favor vertical
      // Let vertical component pass through, horizontal will be handled by element
      if (isDiagonal) {
        // Don't intercept - browser handles both components appropriately
        return
      }
    }

    // Use passive: true for better performance
    // We're not calling preventDefault(), so passive is safe
    body.addEventListener('wheel', handleWheel, { passive: true })

    return () => {
      body.removeEventListener('wheel', handleWheel)
      if (gestureTimeoutRef.current) {
        clearTimeout(gestureTimeoutRef.current)
      }
    }
  }, [bodyRef, enabled, resetGesture])
}


