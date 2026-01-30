'use client'

/**
 * StickyDataTable V2 - Arrow Position Hook
 *
 * Calculates dynamic positioning for navigation arrows.
 * Adapts to table height for optimal placement.
 *
 * @module hooks/use-arrow-position
 */

import { useState, useEffect } from 'react'
import { TABLE_CONFIG, ARROW_CONFIG } from '../../config'

interface ArrowPosition {
  top?: string
  bottom?: string
}

interface UseArrowPositionProps {
  /** Reference to table body element */
  bodyRef: React.RefObject<HTMLDivElement | null>
  /** Header gap offset */
  headerGap?: number
  /** Preferred top offset for normal tables */
  preferredTopOffset?: number
  /** Minimum offset from bottom */
  bottomOffset?: number
  /** Height of arrow button */
  arrowHeight?: number
}

/**
 * Hook for calculating arrow positioning
 *
 * Strategy:
 * 1. Short tables (< 200px): Use percentage (40%) positioning
 * 2. Normal tables: Use fixed offset (default 300px)
 * 3. Clamp to ensure arrows stay within bounds
 *
 * Features:
 * - Responsive to table height changes
 * - ResizeObserver for dynamic updates
 * - Scroll-aware positioning
 */
export function useArrowPosition({
  bodyRef,
  headerGap = TABLE_CONFIG.HEADER_GAP,
  preferredTopOffset = ARROW_CONFIG.PREFERRED_TOP_OFFSET,
  bottomOffset = ARROW_CONFIG.BOTTOM_OFFSET,
  arrowHeight = ARROW_CONFIG.ARROW_HEIGHT,
}: UseArrowPositionProps): ArrowPosition {
  const [position, setPosition] = useState<ArrowPosition>({
    top: `${preferredTopOffset}px`,
  })

  useEffect(() => {
    const body = bodyRef.current
    if (!body) return

    const calculatePosition = () => {
      const bodyHeight = body.scrollHeight
      const headerHeight = TABLE_CONFIG.HEADER_HEIGHT

      // Strategy based on table height
      const isShortTable = bodyHeight < ARROW_CONFIG.SHORT_TABLE_THRESHOLD
      const offsetFromTop = isShortTable
        ? Math.round(bodyHeight * ARROW_CONFIG.SHORT_TABLE_POSITION_PERCENT)
        : preferredTopOffset

      // Clamp to valid range
      const minOffset = 60
      const maxOffset = Math.max(minOffset, bodyHeight - arrowHeight - bottomOffset)
      const clampedOffset = Math.max(minOffset, Math.min(offsetFromTop, maxOffset))

      // Final position relative to sticky header wrapper
      const arrowTop = headerHeight + clampedOffset

      setPosition({ top: `${arrowTop}px` })
    }

    // Initial calculation
    calculatePosition()

    // Watch for size changes
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(calculatePosition)
    })
    resizeObserver.observe(body)

    // Watch for scroll changes
    const handleScroll = () => requestAnimationFrame(calculatePosition)
    const handleResize = () => requestAnimationFrame(calculatePosition)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [bodyRef, headerGap, preferredTopOffset, bottomOffset, arrowHeight])

  return position
}


