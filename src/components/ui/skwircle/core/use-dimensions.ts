/**
 * useDimensions Hook
 *
 * Tracks element dimensions using ResizeObserver.
 * Safari-optimized with debouncing.
 */

'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

interface UseDimensionsOptions {
  /** Callback when dimensions change */
  onDimensionsChange?: (width: number, height: number) => void
  /** Whether to fade in after measurement */
  fadeIn?: boolean
  /** Initial dimensions for SSR */
  initialDimensions?: { width: number; height: number }
}

interface UseDimensionsResult {
  /** Current dimensions */
  dimensions: { width: number; height: number }
  /** Whether first measurement has completed */
  hasMeasured: boolean
}

/**
 * Hook to track element dimensions using ResizeObserver.
 *
 * @param contentRef - Ref to the element to measure
 * @param options - Configuration options
 */
export function useDimensions(
  contentRef: React.RefObject<HTMLDivElement | null>,
  options: UseDimensionsOptions = {}
): UseDimensionsResult {
  const { onDimensionsChange, fadeIn = true, initialDimensions } = options

  const resizeTimeoutRef = useRef<number | null>(null)
  const [dimensions, setDimensions] = useState(() => initialDimensions ?? { width: 0, height: 0 })
  const [hasMeasured, setHasMeasured] = useState(() => (!fadeIn ? true : !!initialDimensions))

  // Use refs to avoid re-running effects
  const dimensionsRef = useRef(dimensions)
  const hasMeasuredRef = useRef(hasMeasured)
  const onDimensionsChangeRef = useRef(onDimensionsChange)

  useEffect(() => {
    dimensionsRef.current = dimensions
  }, [dimensions])

  useEffect(() => {
    hasMeasuredRef.current = hasMeasured
  }, [hasMeasured])

  useEffect(() => {
    onDimensionsChangeRef.current = onDimensionsChange
  }, [onDimensionsChange])

  // Measure synchronously before first paint to prevent flash
  useLayoutEffect(() => {
    const el = contentRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const nextWidth = Math.ceil(rect.width)
    const nextHeight = Math.ceil(rect.height)

    if (nextWidth > 0 && nextHeight > 0) {
      const prev = dimensionsRef.current
      const widthDiff = Math.abs(nextWidth - prev.width)
      const heightDiff = Math.abs(nextHeight - prev.height)

      if (prev.width === 0 || prev.height === 0 || widthDiff > 1 || heightDiff > 1) {
        dimensionsRef.current = { width: nextWidth, height: nextHeight }
        setDimensions({ width: nextWidth, height: nextHeight })
        onDimensionsChangeRef.current?.(nextWidth, nextHeight)
      }

      if (fadeIn && !hasMeasuredRef.current) {
        hasMeasuredRef.current = true
        setHasMeasured(true)
      }
    }
  }, [contentRef, fadeIn])

  // Set up ResizeObserver for ongoing dimension tracking
  useEffect(() => {
    if (!contentRef.current) return

    const resizeObserver = new ResizeObserver((entries) => {
      // Cancel any pending update
      if (resizeTimeoutRef.current !== null) {
        cancelAnimationFrame(resizeTimeoutRef.current)
      }

      // Schedule update for next frame (Safari optimization)
      resizeTimeoutRef.current = requestAnimationFrame(() => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect
          const newWidth = Math.ceil(width)
          const newHeight = Math.ceil(height)

          // Only update if change is significant (> 1px)
          const prev = dimensionsRef.current
          const widthDiff = Math.abs(newWidth - prev.width)
          const heightDiff = Math.abs(newHeight - prev.height)

          if (widthDiff > 1 || heightDiff > 1 || (newWidth > 0 && prev.width === 0)) {
            dimensionsRef.current = { width: newWidth, height: newHeight }
            setDimensions({ width: newWidth, height: newHeight })
            onDimensionsChangeRef.current?.(newWidth, newHeight)

            // Trigger fade-in after first measurement
            if (fadeIn && !hasMeasuredRef.current) {
              requestAnimationFrame(() => {
                hasMeasuredRef.current = true
                setHasMeasured(true)
              })
            }
          }
        }
        resizeTimeoutRef.current = null
      })
    })

    resizeObserver.observe(contentRef.current)
    return () => {
      resizeObserver.disconnect()
      if (resizeTimeoutRef.current !== null) {
        cancelAnimationFrame(resizeTimeoutRef.current)
      }
    }
  }, [contentRef, fadeIn])

  return { dimensions, hasMeasured }
}
