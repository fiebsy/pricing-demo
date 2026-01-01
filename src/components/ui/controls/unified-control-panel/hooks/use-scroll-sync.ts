/**
 * Use Scroll Sync
 *
 * IntersectionObserver-based scroll sync for tab navigation
 */

'use client'

import { useEffect, useRef } from 'react'

interface UseScrollSyncOptions {
  sectionIds: string[]
  onSectionInView: (sectionId: string) => void
  isDisabled?: boolean
  containerRef: React.RefObject<HTMLElement | null>
  rootMargin?: string
}

export const useScrollSync = ({
  sectionIds,
  onSectionInView,
  isDisabled = false,
  containerRef,
  rootMargin = '-20% 0px -70% 0px',
}: UseScrollSyncOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastActiveSectionRef = useRef<string | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || sectionIds.length === 0) return

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isDisabled) return

        let topmostEntry: IntersectionObserverEntry | null = null
        let topmostTop = Infinity

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const rect = entry.boundingClientRect
            if (rect.top < topmostTop) {
              topmostTop = rect.top
              topmostEntry = entry
            }
          }
        }

        if (topmostEntry) {
          const targetElement = topmostEntry.target as HTMLElement
          if (targetElement.id) {
            const newSection = targetElement.id
            if (newSection !== lastActiveSectionRef.current) {
              lastActiveSectionRef.current = newSection
              onSectionInView(newSection)
            }
          }
        }
      },
      {
        root: container,
        rootMargin,
        threshold: [0, 0.1, 0.5],
      }
    )

    sectionIds.forEach((id) => {
      const element = container.querySelector(`[data-section-id="${id}"]`)
      if (element) {
        observerRef.current?.observe(element)
      }
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [sectionIds, onSectionInView, isDisabled, containerRef, rootMargin])

  return {
    resetSync: () => {
      lastActiveSectionRef.current = null
    },
  }
}
