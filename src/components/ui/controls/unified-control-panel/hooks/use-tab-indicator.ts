/**
 * Use Tab Indicator
 *
 * Manages tab indicator position using CSS custom properties
 */

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { TabIndicatorState } from '../types'

interface UseTabIndicatorOptions {
  activeIndex: number
  skipInitialAnimation?: boolean
  onInitialized?: () => void
}

interface UseTabIndicatorReturn {
  state: TabIndicatorState
  setTabRef: (index: number) => (el: HTMLButtonElement | null) => void
  indicatorRef: React.RefObject<HTMLDivElement | null>
  containerRef: React.RefObject<HTMLDivElement | null>
  recalculate: () => void
}

export const useTabIndicator = ({
  activeIndex,
  skipInitialAnimation = true,
  onInitialized,
}: UseTabIndicatorOptions): UseTabIndicatorReturn => {
  const [state, setState] = useState<TabIndicatorState>({
    left: 0,
    width: 0,
    isInitialized: false,
  })

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const indicatorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInitializedRef = useRef(false)

  const setTabRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      tabRefs.current[index] = el
    },
    []
  )

  const updateIndicatorPosition = useCallback(() => {
    const activeTab = tabRefs.current[activeIndex]
    const container = containerRef.current
    const indicator = indicatorRef.current

    if (!activeTab || !container || !indicator) return

    const left = activeTab.offsetLeft
    const width = activeTab.offsetWidth

    if (!isInitializedRef.current && skipInitialAnimation) {
      indicator.style.transition = 'none'
      indicator.style.setProperty('--indicator-left', `${left}px`)
      indicator.style.setProperty('--indicator-width', `${width}px`)

      indicator.offsetHeight

      indicator.style.transition = ''

      isInitializedRef.current = true
      onInitialized?.()
    } else {
      indicator.style.setProperty('--indicator-left', `${left}px`)
      indicator.style.setProperty('--indicator-width', `${width}px`)
    }

    setState({
      left,
      width,
      isInitialized: true,
    })
  }, [activeIndex, skipInitialAnimation, onInitialized])

  useEffect(() => {
    updateIndicatorPosition()
  }, [updateIndicatorPosition])

  useEffect(() => {
    const handleResize = () => {
      updateIndicatorPosition()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateIndicatorPosition])

  return {
    state,
    setTabRef,
    indicatorRef,
    containerRef,
    recalculate: updateIndicatorPosition,
  }
}
