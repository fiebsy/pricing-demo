'use client'

/**
 * StickyDataTable V2 - Scroll Sync Hook
 *
 * Synchronizes horizontal scroll between header and body containers.
 * Uses requestAnimationFrame for smooth performance.
 *
 * @module hooks/use-scroll-sync
 */

import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react'
import { TABLE_CONFIG, ANIMATION_CONFIG } from '../../config'
import type { ScrollState } from '../../types'

interface UseScrollSyncProps {
  headerRef: React.RefObject<HTMLDivElement | null>
  bodyRef: React.RefObject<HTMLDivElement | null>
}

interface UseScrollSyncReturn extends ScrollState {
  handleScrollLeft: () => void
  handleScrollRight: () => void
}

/**
 * Calculate scroll state from a scroll container
 */
function calculateScrollState(element: HTMLDivElement): ScrollState {
  const { scrollLeft, scrollWidth, clientWidth } = element
  const hasOverflow = scrollWidth > clientWidth
  const canScrollRight = scrollLeft + clientWidth < scrollWidth - TABLE_CONFIG.SCROLL_THRESHOLD
  const canScrollLeft = scrollLeft > 0

  return {
    canScrollLeft,
    canScrollRight,
    showScrollIndicator: hasOverflow && canScrollRight,
  }
}

/**
 * Hook for synchronized scrolling between header and body
 *
 * Features:
 * - Bidirectional scroll sync
 * - RAF-throttled state updates
 * - ResizeObserver for dimension changes
 * - Sub-pixel scroll handling
 */
export function useScrollSync({
  headerRef,
  bodyRef,
}: UseScrollSyncProps): UseScrollSyncReturn {
  const [scrollState, setScrollState] = useState<ScrollState>({
    canScrollLeft: false,
    canScrollRight: false,
    showScrollIndicator: false,
  })

  // Refs for RAF throttling
  const rafIdRef = useRef<number | undefined>(undefined)
  const tickingRef = useRef(false)

  // Track when body element changes (e.g., when unmounted/remounted due to empty state)
  // This forces the scroll sync effect to re-run when the DOM element changes
  const [bodyElementVersion, setBodyElementVersion] = useState(0)
  const lastBodyElementRef = useRef<HTMLDivElement | null>(null)
  const hasMountedRef = useRef(false)

  // Check if body element has changed after initial mount
  useLayoutEffect(() => {
    const currentBody = bodyRef.current
    const lastBody = lastBodyElementRef.current

    // Always update the ref to track the current element
    lastBodyElementRef.current = currentBody

    // Skip the initial mount - main effect handles this correctly
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }

    // Detect when body element is replaced (e.g., after empty state -> data)
    // Only increment if we had a body before (lastBody was valid)
    // OR if body was null and now exists (remount after empty state)
    if (currentBody && currentBody !== lastBody) {
      setBodyElementVersion((v) => v + 1)
    }
  })

  // Update scroll state with RAF throttling
  const updateScrollState = useCallback(() => {
    const header = headerRef.current
    if (!header) return

    if (!tickingRef.current) {
      rafIdRef.current = requestAnimationFrame(() => {
        const newState = calculateScrollState(header)

        // Only update state if values changed
        setScrollState((prev) => {
          if (
            prev.canScrollLeft === newState.canScrollLeft &&
            prev.canScrollRight === newState.canScrollRight &&
            prev.showScrollIndicator === newState.showScrollIndicator
          ) {
            return prev
          }
          return newState
        })

        tickingRef.current = false
      })
      tickingRef.current = true
    }
  }, [headerRef])

  // Set up scroll synchronization
  useEffect(() => {
    const header = headerRef.current
    const body = bodyRef.current

    if (!header || !body) return

    // Sync body scroll when header scrolls
    const handleHeaderScroll = () => {
      // Skip sub-pixel differences
      if (Math.abs(body.scrollLeft - header.scrollLeft) < ANIMATION_CONFIG.SCROLL_SYNC_THRESHOLD) {
        return
      }
      body.scrollLeft = header.scrollLeft
      updateScrollState()
    }

    // Sync header scroll when body scrolls
    const handleBodyScroll = () => {
      // Skip sub-pixel differences
      if (Math.abs(header.scrollLeft - body.scrollLeft) < ANIMATION_CONFIG.SCROLL_SYNC_THRESHOLD) {
        return
      }
      header.scrollLeft = body.scrollLeft
      updateScrollState()
    }

    // Sync scroll positions (used on resize and when detecting drift)
    const syncScrollPositions = () => {
      if (!header || !body) return

      // Always sync body to header's position to maintain consistency
      // This handles cases where scrollWidth differs between containers
      // (can happen due to CSS Grid fr unit calculations in different contexts)
      if (Math.abs(body.scrollLeft - header.scrollLeft) >= ANIMATION_CONFIG.SCROLL_SYNC_THRESHOLD) {
        body.scrollLeft = header.scrollLeft
      }
    }

    // Watch for size changes - sync positions AND update state
    const resizeObserver = new ResizeObserver(() => {
      // First sync scroll positions to prevent drift after re-renders
      syncScrollPositions()
      // Then update the scroll state
      updateScrollState()
    })

    resizeObserver.observe(header)
    resizeObserver.observe(body)

    // Add scroll listeners with passive for better performance
    header.addEventListener('scroll', handleHeaderScroll, { passive: true })
    body.addEventListener('scroll', handleBodyScroll, { passive: true })

    // Initial sync and calculation
    syncScrollPositions()
    updateScrollState()

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      // Reset ticking flag so it doesn't block subsequent effect runs
      tickingRef.current = false
      header.removeEventListener('scroll', handleHeaderScroll)
      body.removeEventListener('scroll', handleBodyScroll)
      resizeObserver.disconnect()
    }
    // bodyElementVersion forces re-run when body element is replaced (e.g., after empty state)
  }, [headerRef, bodyRef, updateScrollState, bodyElementVersion])

  // Arrow click handlers
  const handleScrollLeft = useCallback(() => {
    headerRef.current?.scrollBy({
      left: -TABLE_CONFIG.SCROLL_AMOUNT,
      behavior: 'smooth',
    })
  }, [headerRef])

  const handleScrollRight = useCallback(() => {
    headerRef.current?.scrollBy({
      left: TABLE_CONFIG.SCROLL_AMOUNT,
      behavior: 'smooth',
    })
  }, [headerRef])

  return {
    ...scrollState,
    handleScrollLeft,
    handleScrollRight,
  }
}


