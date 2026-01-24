/**
 * useContentMeasurement - ResizeObserver hook for measuring content height
 *
 * Used by ClipPathContainer to track content dimensions for clip-path transitions.
 *
 * @module playground/quick-fix-modal/hooks
 */

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export interface ContentMeasurement {
  width: number
  height: number
}

export interface UseContentMeasurementOptions {
  /** Initial height before measurement */
  initialHeight?: number
  /** Debounce delay for resize updates (ms) */
  debounceMs?: number
  /** Whether to observe the element */
  enabled?: boolean
}

export interface UseContentMeasurementReturn {
  /** Ref to attach to the measured element */
  ref: React.RefObject<HTMLDivElement | null>
  /** Current measured dimensions */
  measurement: ContentMeasurement
  /** Whether the element has been measured at least once */
  hasMeasured: boolean
  /** Force a re-measurement */
  remeasure: () => void
}

/**
 * Hook for measuring content dimensions via ResizeObserver.
 * Returns a ref to attach to the measured element and the current dimensions.
 */
export function useContentMeasurement(
  options: UseContentMeasurementOptions = {}
): UseContentMeasurementReturn {
  const { initialHeight = 0, debounceMs = 0, enabled = true } = options

  const ref = useRef<HTMLDivElement>(null)
  const [measurement, setMeasurement] = useState<ContentMeasurement>({
    width: 0,
    height: initialHeight,
  })
  const [hasMeasured, setHasMeasured] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Update measurement
  const updateMeasurement = useCallback((entry: ResizeObserverEntry) => {
    const { width, height } = entry.contentRect
    setMeasurement({ width, height })
    setHasMeasured(true)
  }, [])

  // Force remeasure
  const remeasure = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setMeasurement({ width: rect.width, height: rect.height })
      setHasMeasured(true)
    }
  }, [])

  // Setup ResizeObserver
  useEffect(() => {
    if (!enabled || !ref.current) return

    const element = ref.current

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return

      if (debounceMs > 0) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
          updateMeasurement(entry)
        }, debounceMs)
      } else {
        updateMeasurement(entry)
      }
    })

    observer.observe(element)

    // Initial measurement
    const rect = element.getBoundingClientRect()
    setMeasurement({ width: rect.width, height: rect.height })
    setHasMeasured(true)

    return () => {
      observer.disconnect()
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [enabled, debounceMs, updateMeasurement])

  return {
    ref,
    measurement,
    hasMeasured,
    remeasure,
  }
}

/**
 * Hook for measuring multiple elements and getting the max height.
 * Useful for ensuring consistent height across sheet transitions.
 */
export function useMaxContentHeight(
  refs: React.RefObject<HTMLDivElement>[],
  enabled = true
): number {
  const [maxHeight, setMaxHeight] = useState(0)

  useEffect(() => {
    if (!enabled) return

    const updateMaxHeight = () => {
      let max = 0
      for (const ref of refs) {
        if (ref.current) {
          const height = ref.current.getBoundingClientRect().height
          if (height > max) max = height
        }
      }
      setMaxHeight(max)
    }

    // Initial measurement
    updateMaxHeight()

    // Setup observers
    const observer = new ResizeObserver(updateMaxHeight)
    for (const ref of refs) {
      if (ref.current) {
        observer.observe(ref.current)
      }
    }

    return () => observer.disconnect()
  }, [refs, enabled])

  return maxHeight
}
