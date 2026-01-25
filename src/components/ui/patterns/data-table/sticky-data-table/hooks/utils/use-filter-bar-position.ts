'use client'

/**
 * StickyDataTable - Filter Bar Position Hook
 *
 * Positions the filter bar with two modes:
 * 1. FIXED to viewport bottom (80px up) when table is tall
 * 2. ABSOLUTE below table (80px down) when table is short
 *
 * The bar is rendered OUTSIDE the sticky wrapper to avoid coordinate
 * system issues caused by the sticky header's shifting position.
 *
 * @module hooks/use-filter-bar-position
 */

import { useState, useEffect, useCallback } from 'react'

export interface FilterBarPosition {
  /** Style object to apply to the filter bar container */
  style: React.CSSProperties
  /** Current positioning mode */
  mode: 'fixed' | 'absolute'
  /** Whether position has been calculated (hide bar until ready) */
  isReady: boolean
}

interface UseFilterBarPositionProps {
  /** Reference to the table container element (parent of both header and body) */
  tableContainerRef: React.RefObject<HTMLDivElement | null>
  /** Reference to table body element (for measuring table height) */
  bodyRef: React.RefObject<HTMLDivElement | null>
  /** Distance from viewport bottom when in fixed mode (default: 80px) */
  bottomOffset?: number
  /** Height of the filter bar for calculations (default: 40px) */
  barHeight?: number
}

interface PositionState {
  mode: 'fixed' | 'absolute'
  /** For absolute: distance from container top. For fixed: not used */
  top?: number
  /** For fixed: distance from viewport bottom. For absolute: not used */
  bottom?: number
  /** For fixed: calculated left position to center on table */
  left?: number
  /** Width of the table container (for centering reference) */
  containerWidth?: number
  /** Whether position has been calculated */
  isReady: boolean
}

/**
 * Hook for filter bar positioning
 *
 * Renders the bar outside the sticky wrapper and toggles between:
 * - position: fixed (when table extends past viewport)
 * - position: absolute (when table is short)
 *
 * Horizontal centering:
 * - Absolute mode: left: 50% naturally centers on table container
 * - Fixed mode: calculates table center in viewport coordinates
 */
export function useFilterBarPosition({
  tableContainerRef,
  bodyRef,
  bottomOffset = 80,
  barHeight = 40,
}: UseFilterBarPositionProps): FilterBarPosition {
  const [position, setPosition] = useState<PositionState>({
    mode: 'fixed',
    bottom: bottomOffset,
    left: 0,
    isReady: false,
  })

  const calculatePosition = useCallback(() => {
    const container = tableContainerRef.current
    const body = bodyRef.current
    if (!container || !body) return

    const containerRect = container.getBoundingClientRect()
    const bodyRect = body.getBoundingClientRect()
    const viewportHeight = window.innerHeight

    // The Y position where the bar would be if fixed to viewport bottom
    const fixedBarY = viewportHeight - bottomOffset - barHeight

    // The Y position of the table's bottom edge
    const tableBottomY = bodyRect.bottom

    // Calculate table center X in viewport coordinates (for fixed positioning)
    // Use bodyRect for horizontal centering since it's the actual visible table area
    const tableCenterX = bodyRect.left + bodyRect.width / 2

    // Decision: If table bottom is above where fixed bar would be,
    // use absolute positioning to keep bar near table
    if (tableBottomY < fixedBarY) {
      // Table is short - position bar below table using absolute
      // Calculate top relative to the container
      const absoluteTop = bodyRect.bottom - containerRect.top + bottomOffset

      setPosition({
        mode: 'absolute',
        top: absoluteTop,
        containerWidth: containerRect.width,
        isReady: true,
      })
    } else {
      // Table is tall - use fixed positioning at viewport bottom
      setPosition({
        mode: 'fixed',
        bottom: bottomOffset,
        left: tableCenterX,
        containerWidth: containerRect.width,
        isReady: true,
      })
    }
  }, [tableContainerRef, bodyRef, bottomOffset, barHeight])

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null
    let retryFrame: number | null = null

    const setup = () => {
      const container = tableContainerRef.current
      const body = bodyRef.current

      if (!container || !body) {
        // Refs not ready, retry on next frame
        retryFrame = requestAnimationFrame(setup)
        return
      }

      // Initial calculation
      calculatePosition()

      // Set up ResizeObserver
      resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(calculatePosition)
      })
      resizeObserver.observe(body)
      resizeObserver.observe(container)
    }

    // Start setup (will retry if refs not ready)
    setup()

    // Set up scroll/resize listeners immediately
    const handleScroll = () => requestAnimationFrame(calculatePosition)
    const handleResize = () => requestAnimationFrame(calculatePosition)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      if (retryFrame) cancelAnimationFrame(retryFrame)
      resizeObserver?.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [calculatePosition, tableContainerRef, bodyRef])

  // Build style object based on positioning mode
  if (position.mode === 'fixed') {
    return {
      mode: 'fixed',
      isReady: position.isReady,
      style: {
        position: 'fixed',
        bottom: `${position.bottom}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)',
        zIndex: 50,
      },
    }
  }

  // Absolute mode - centers naturally on table container
  return {
    mode: 'absolute',
    isReady: position.isReady,
    style: {
      position: 'absolute',
      top: `${position.top}px`,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 50,
    },
  }
}
