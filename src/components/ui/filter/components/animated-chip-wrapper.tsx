/**
 * Animated Chip Wrapper
 *
 * Wraps filter chips to provide a smooth fade-in (and optional scale) animation
 * when the chip appears. Uses requestAnimationFrame for optimal performance.
 *
 * @module base-ui/filter/components/animated-chip-wrapper
 */

'use client'

import { useState, useEffect } from 'react'

import { EASING_EXPO_OUT, DURATION_FADE_IN } from '../constants'

export interface AnimatedChipWrapperProps {
  /** Animation duration in ms */
  duration?: number
  /** If true, only animate opacity (no scale) */
  noScale?: boolean
  /** Children to wrap */
  children: React.ReactNode
}

/**
 * AnimatedChipWrapper - Provides fade-in animation for filter chips
 *
 * Wraps any content and animates it in with opacity (and optionally scale).
 * The animation triggers on mount using requestAnimationFrame for a
 * smooth one-frame delay that ensures the transition plays.
 */
export const AnimatedChipWrapper: React.FC<AnimatedChipWrapperProps> = ({
  duration = DURATION_FADE_IN,
  noScale = true,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsVisible(true)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      style={{
        transition: noScale
          ? `opacity ${duration}ms ${EASING_EXPO_OUT}`
          : `opacity ${duration}ms ${EASING_EXPO_OUT}, transform ${duration}ms ${EASING_EXPO_OUT}`,
        transformOrigin: 'center center',
        opacity: isVisible ? 1 : 0,
        transform: noScale ? 'none' : (isVisible ? 'scale(1)' : 'scale(0.85)'),
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  )
}
