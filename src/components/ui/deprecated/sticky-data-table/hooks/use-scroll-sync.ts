'use client'

/**
 * StickyDataTable V2 - Scroll Sync Hook
 *
 * Synchronizes horizontal scroll between header and body containers.
 * Uses requestAnimationFrame for smooth performance.
 *
 * @module hooks/use-scroll-sync
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { TABLE_CONFIG, ANIMATION_CONFIG } from '../config'
import type { ScrollState } from '../types'

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
  const rafIdRef = useRef<number | null>(null)
  const tickingRef = useRef(false)

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

    // Watch for size changes
    const resizeObserver = new ResizeObserver(() => {
      updateScrollState()
    })

    resizeObserver.observe(header)
    resizeObserver.observe(body)

    // Add scroll listeners with passive for better performance
    header.addEventListener('scroll', handleHeaderScroll, { passive: true })
    body.addEventListener('scroll', handleBodyScroll, { passive: true })

    // Initial calculation
    updateScrollState()

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      header.removeEventListener('scroll', handleHeaderScroll)
      body.removeEventListener('scroll', handleBodyScroll)
      resizeObserver.disconnect()
    }
  }, [headerRef, bodyRef, updateScrollState])

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


