/**
 * Shared Resize Observer
 *
 * A singleton ResizeObserver that efficiently observes multiple elements.
 * Instead of creating one observer per component, this shares a single
 * observer instance and dispatches callbacks to registered listeners.
 *
 * Usage:
 *   const { ref, height } = useElementSize()
 *   // ref is assigned to the element you want to observe
 *   // height updates when the element resizes
 */

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// -----------------------------------------------------------------------------
// Shared Observer Singleton
// -----------------------------------------------------------------------------

type ResizeCallback = (entry: ResizeObserverEntry) => void

class SharedResizeObserver {
  private observer: ResizeObserver | null = null
  private callbacks = new Map<Element, Set<ResizeCallback>>()

  constructor() {
    // Lazy init observer only when needed
    if (typeof window !== 'undefined') {
      this.observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const elementCallbacks = this.callbacks.get(entry.target)
          if (elementCallbacks) {
            elementCallbacks.forEach((callback) => callback(entry))
          }
        }
      })
    }
  }

  observe(element: Element, callback: ResizeCallback): () => void {
    if (!this.observer) return () => {}

    // Add callback to the set for this element
    let callbacks = this.callbacks.get(element)
    if (!callbacks) {
      callbacks = new Set()
      this.callbacks.set(element, callbacks)
      this.observer.observe(element)
    }
    callbacks.add(callback)

    // Return cleanup function
    return () => {
      const elementCallbacks = this.callbacks.get(element)
      if (elementCallbacks) {
        elementCallbacks.delete(callback)
        if (elementCallbacks.size === 0) {
          this.callbacks.delete(element)
          this.observer?.unobserve(element)
        }
      }
    }
  }

  disconnect(): void {
    this.observer?.disconnect()
    this.callbacks.clear()
  }
}

// Singleton instance
let sharedObserver: SharedResizeObserver | null = null

function getSharedObserver(): SharedResizeObserver {
  if (!sharedObserver) {
    sharedObserver = new SharedResizeObserver()
  }
  return sharedObserver
}

// -----------------------------------------------------------------------------
// Hooks
// -----------------------------------------------------------------------------

interface UseElementSizeOptions {
  /** Debounce updates in ms (default: 0 = no debounce) */
  debounce?: number
}

interface ElementSize {
  width: number
  height: number
}

/**
 * Hook to observe an element's size using the shared ResizeObserver
 */
export function useElementSize(options: UseElementSizeOptions = {}): {
  ref: React.RefCallback<HTMLElement>
  size: ElementSize | null
  width: number | null
  height: number | null
} {
  const { debounce = 0 } = options
  const [size, setSize] = useState<ElementSize | null>(null)
  const elementRef = useRef<HTMLElement | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const ref = useCallback(
    (element: HTMLElement | null) => {
      // Cleanup previous observer
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }

      elementRef.current = element

      if (element) {
        const observer = getSharedObserver()

        const handleResize = (entry: ResizeObserverEntry) => {
          const { width, height } = entry.contentRect

          if (debounce > 0) {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = setTimeout(() => {
              setSize({ width, height })
            }, debounce)
          } else {
            setSize({ width, height })
          }
        }

        cleanupRef.current = observer.observe(element, handleResize)

        // Get initial size
        const rect = element.getBoundingClientRect()
        setSize({ width: rect.width, height: rect.height })
      } else {
        setSize(null)
      }
    },
    [debounce]
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    ref,
    size,
    width: size?.width ?? null,
    height: size?.height ?? null,
  }
}

/**
 * Hook to observe content height only (common use case for collapse animations)
 */
export function useContentHeight(): {
  ref: React.RefCallback<HTMLElement>
  height: number | null
} {
  const { ref, height } = useElementSize()
  return { ref, height }
}

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export { getSharedObserver, SharedResizeObserver }
