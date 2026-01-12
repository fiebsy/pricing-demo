/**
 * Chip Animation Hook
 *
 * Manages the expand/collapse animation state and timing for filter chips.
 * Handles reveal modes, opacity transitions, and animation completion tracking.
 *
 * @module base-ui/filter/components/expanding-filter-chip/use-chip-animation
 */

import { useState, useEffect, useCallback } from 'react'
import {
  EASING_EXPO_OUT,
  DURATION_EXPAND,
  DURATION_COLLAPSE,
  OPACITY_FADE_RATIO,
} from '../../constants'

// ============================================================================
// Types
// ============================================================================

export type RevealMode = 'fade' | 'delay' | 'sync' | 'instant' | 'none'

export interface ChipAnimationOptions {
  /** Whether to start expanded */
  defaultExpanded?: boolean
  /** Controlled expanded state */
  expanded?: boolean
  /** Called when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Animation duration in ms */
  duration?: number
  /** How the value text is revealed */
  revealMode?: RevealMode
  /** Opacity fade ratio (only used with 'fade' mode) */
  opacityFadeRatio?: number
}

export interface ChipAnimationResult {
  /** Current expanded state */
  isExpanded: boolean
  /** Whether width animation has completed (for 'sync' mode) */
  widthAnimationComplete: boolean
  /** Toggle expanded state */
  handleToggle: () => void
  /** Handler for transitionend events */
  handleTransitionEnd: (e: React.TransitionEvent) => void
  /** Get current content opacity */
  getContentOpacity: () => number
  /** Get content transition CSS string */
  getContentTransition: () => string
  /** Get container transition CSS string */
  getContainerTransition: () => string
}

// ============================================================================
// Hook
// ============================================================================

/**
 * useChipAnimation - Manages chip expand/collapse animation
 *
 * @param options - Animation configuration options
 * @returns Animation state and handlers
 */
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

  // For 'sync' mode: track when width animation completes
  const [widthAnimationComplete, setWidthAnimationComplete] = useState(defaultExpanded)

  // Reset widthAnimationComplete when collapsing
  useEffect(() => {
    if (!isExpanded) {
      setWidthAnimationComplete(false)
    }
  }, [isExpanded])

  // Auto-expand on mount after a frame
  useEffect(() => {
    if (defaultExpanded) return

    const frame = requestAnimationFrame(() => {
      setInternalExpanded(true)
      onExpandedChange?.(true)
    })

    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggle = useCallback(() => {
    const newValue = !isExpanded
    setInternalExpanded(newValue)
    onExpandedChange?.(newValue)
  }, [isExpanded, onExpandedChange])

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.propertyName === 'width') {
        if (isExpanded) {
          setWidthAnimationComplete(true)
        }
      }
    },
    [isExpanded]
  )

  const getContentOpacity = useCallback(() => {
    if (revealMode === 'none') return 1
    if (!isExpanded) return 0
    if (revealMode === 'sync') return widthAnimationComplete ? 1 : 0
    return 1
  }, [revealMode, isExpanded, widthAnimationComplete])

  const getContentTransition = useCallback(() => {
    if (revealMode === 'none') return 'none'

    if (!isExpanded) {
      return `opacity ${DURATION_COLLAPSE}ms ease-out`
    }

    switch (revealMode) {
      case 'fade': {
        const fadeDelay = duration * (1 - opacityFadeRatio)
        const fadeDuration = duration * opacityFadeRatio
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
    widthAnimationComplete,
    handleToggle,
    handleTransitionEnd,
    getContentOpacity,
    getContentTransition,
    getContainerTransition,
  }
}
