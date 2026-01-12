import { useCallback, useEffect, useRef, useState } from 'react'

import { TABLE_CONFIG } from '../config'

interface UseTableScrollStateProps {
  headerScrollRef: React.RefObject<HTMLDivElement | null>
  bodyScrollRef: React.RefObject<HTMLDivElement | null>
}

interface ScrollState {
  scrollLeft: number
  scrollWidth: number
  clientWidth: number
  canScrollLeft: boolean
  canScrollRight: boolean
  hasOverflow: boolean
  showScrollIndicator: boolean
}

export function useTableScrollState({ headerScrollRef, bodyScrollRef }: UseTableScrollStateProps) {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollLeft: 0,
    scrollWidth: 0,
    clientWidth: 0,
    canScrollLeft: false,
    canScrollRight: false,
    hasOverflow: false,
    showScrollIndicator: false,
  })

  const rafIdRef = useRef<number | null>(null)
  const tickingRef = useRef(false)

  const calculateScrollState = useCallback((element: HTMLDivElement): ScrollState => {
    const scrollLeft = element.scrollLeft
    const scrollWidth = element.scrollWidth
    const clientWidth = element.clientWidth
    const hasOverflow = scrollWidth > clientWidth
    const canScrollRight = scrollLeft + clientWidth < scrollWidth - TABLE_CONFIG.SCROLL_THRESHOLD
    const canScrollLeft = scrollLeft > 0

    return {
      scrollLeft,
      scrollWidth,
      clientWidth,
      canScrollLeft,
      canScrollRight,
      hasOverflow,
      showScrollIndicator: hasOverflow && canScrollRight,
    }
  }, [])

  const updateScrollState = useCallback(() => {
    const headerScroll = headerScrollRef.current
    if (!headerScroll) return

    if (!tickingRef.current) {
      rafIdRef.current = requestAnimationFrame(() => {
        const newState = calculateScrollState(headerScroll)

        setScrollState((prev) => {
          if (
            prev.scrollLeft === newState.scrollLeft &&
            prev.canScrollLeft === newState.canScrollLeft &&
            prev.canScrollRight === newState.canScrollRight &&
            prev.hasOverflow === newState.hasOverflow &&
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
  }, [headerScrollRef, calculateScrollState])

  useEffect(() => {
    const headerScroll = headerScrollRef.current
    const bodyScroll = bodyScrollRef.current

    if (!headerScroll || !bodyScroll) return

    const handleHeaderScroll = () => {
      if (bodyScroll.scrollLeft !== headerScroll.scrollLeft) {
        bodyScroll.scrollLeft = headerScroll.scrollLeft
      }
      updateScrollState()
    }

    const handleBodyScroll = () => {
      if (headerScroll.scrollLeft !== bodyScroll.scrollLeft) {
        headerScroll.scrollLeft = bodyScroll.scrollLeft
      }
      updateScrollState()
    }

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState()
    })

    resizeObserver.observe(headerScroll)
    resizeObserver.observe(bodyScroll)

    headerScroll.addEventListener('scroll', handleHeaderScroll, { passive: true })
    bodyScroll.addEventListener('scroll', handleBodyScroll, { passive: true })

    updateScrollState()

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
      headerScroll.removeEventListener('scroll', handleHeaderScroll)
      bodyScroll.removeEventListener('scroll', handleBodyScroll)
      resizeObserver.disconnect()
    }
  }, [headerScrollRef, bodyScrollRef, updateScrollState])

  const handleScrollLeft = useCallback(() => {
    if (headerScrollRef.current) {
      headerScrollRef.current.scrollBy({ left: -TABLE_CONFIG.SCROLL_AMOUNT, behavior: 'smooth' })
    }
  }, [headerScrollRef])

  const handleScrollRight = useCallback(() => {
    if (headerScrollRef.current) {
      headerScrollRef.current.scrollBy({ left: TABLE_CONFIG.SCROLL_AMOUNT, behavior: 'smooth' })
    }
  }, [headerScrollRef])

  return {
    ...scrollState,
    handleScrollLeft,
    handleScrollRight,
  }
}
