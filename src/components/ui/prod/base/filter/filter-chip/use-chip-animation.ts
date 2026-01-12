/**
 * Filter Chip - Animation Hook
 *
 * Manages expand/collapse animation state and timing.
 *
 * @module prod/base/filter/filter-chip/use-chip-animation
 */

import { useState, useEffect, useCallback } from 'react'
import type { ChipAnimationOptions, ChipAnimationResult } from './types'
import { EASING_EXPO_OUT, DURATION_EXPAND, DURATION_COLLAPSE, OPACITY_FADE_RATIO } from './config'

export function useChipAnimation(options: ChipAnimationOptions): ChipAnimationResult {
  const {
    defaultExpanded = false,
    expanded: controlledExpanded,
    onExpandedChange,
    duration = DURATION_EXPAND,
    revealMode = 'instant',
    opacityFadeRatio = OPACITY_FADE_RATIO,
  } = options

  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded)
  const isExpanded = controlledExpanded ?? internalExpanded

  // Track when width animation completes (for 'sync' mode)
  const [widthComplete, setWidthComplete] = useState(defaultExpanded)

  // Reset when collapsing
  useEffect(() => {
    if (!isExpanded) {
      setWidthComplete(false)
    }
  }, [isExpanded])

  // Auto-expand on mount
  useEffect(() => {
    if (defaultExpanded) return

    const frame = requestAnimationFrame(() => {
      setInternalExpanded(true)
      onExpandedChange?.(true)
    })

    return () => cancelAnimationFrame(frame)
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggle = useCallback(() => {
    const next = !isExpanded
    setInternalExpanded(next)
    onExpandedChange?.(next)
  }, [isExpanded, onExpandedChange])

  const onTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.propertyName === 'width' && isExpanded) {
        setWidthComplete(true)
      }
    },
    [isExpanded]
  )

  const getContentOpacity = useCallback(() => {
    if (revealMode === 'none') return 1
    if (!isExpanded) return 0
    if (revealMode === 'sync') return widthComplete ? 1 : 0
    return 1
  }, [revealMode, isExpanded, widthComplete])

  const getContentTransition = useCallback(() => {
    if (revealMode === 'none') return 'none'

    if (!isExpanded) {
      return `opacity ${DURATION_COLLAPSE}ms ease-out`
    }

    switch (revealMode) {
      case 'fade': {
        // Fade starts early, runs most of the duration
        const fadeDelay = duration * opacityFadeRatio
        const fadeDuration = duration * (1 - opacityFadeRatio)
        return `opacity ${fadeDuration}ms ${EASING_EXPO_OUT} ${fadeDelay}ms`
      }
      case 'delay':
        return `opacity 1ms linear ${duration}ms`
      case 'sync':
        return 'opacity 50ms linear'
      case 'instant':
        return `opacity ${duration}ms ${EASING_EXPO_OUT}`
      default:
        return `opacity ${duration * opacityFadeRatio}ms ${EASING_EXPO_OUT}`
    }
  }, [revealMode, isExpanded, duration, opacityFadeRatio])

  const getContainerTransition = useCallback(() => {
    if (isExpanded) {
      return `width ${duration}ms ${EASING_EXPO_OUT}`
    }
    return `width ${DURATION_COLLAPSE}ms ease-out`
  }, [isExpanded, duration])

  return {
    isExpanded,
    widthComplete,
    toggle,
    onTransitionEnd,
    getContentOpacity,
    getContentTransition,
    getContainerTransition,
  }
}
