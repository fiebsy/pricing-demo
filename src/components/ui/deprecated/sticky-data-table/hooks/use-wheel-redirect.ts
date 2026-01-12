'use client'

/**
 * StickyDataTable V2 - Wheel Redirect Hook
 *
 * Redirects vertical scroll events on the table body to the window.
 * Prevents scroll trapping when table has horizontal overflow.
 *
 * @module hooks/use-wheel-redirect
 */

import { useEffect } from 'react'

interface UseWheelRedirectProps {
  /** Reference to the scrollable body element */
  bodyRef: React.RefObject<HTMLDivElement | null>
  /** Enable/disable the redirect */
  enabled?: boolean
}

/**
 * Hook for redirecting vertical scroll to window
 *
 * When a user scrolls vertically over the table body (which only
 * scrolls horizontally), this hook captures the wheel event and
 * redirects it to the window for page scrolling.
 *
 * Features:
 * - Only redirects vertical scroll (deltaY > deltaX)
 * - Prevents default to avoid conflicts
 * - Can be disabled for special use cases
 */
export function useWheelRedirect({
  bodyRef,
  enabled = true,
}: UseWheelRedirectProps): void {
  useEffect(() => {
    if (!enabled) return

    const body = bodyRef.current
    if (!body) return

    const handleWheel = (e: WheelEvent) => {
      // Only redirect if scrolling more vertically than horizontally
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // CRITICAL: preventDefault FIRST to stop browser's default scroll handling
        // This must happen before window.scrollBy() to prevent conflicts with
        // horizontally-scrollable containers that try to capture wheel events
        e.preventDefault()
        e.stopPropagation()

        // Now redirect vertical scroll to the window
        window.scrollBy({
          top: e.deltaY,
          behavior: 'instant',
        })
      }
    }

    // Use passive: false because we need to call preventDefault
    body.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      body.removeEventListener('wheel', handleWheel)
    }
  }, [bodyRef, enabled])
}


