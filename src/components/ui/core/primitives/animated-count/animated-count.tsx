/**
 * AnimatedCount - Lightweight count-up animation
 *
 * Animates a number from 0 (or a start value) to the target value.
 * Uses requestAnimationFrame for smooth 60fps updates.
 * No layout shifts - only the text content changes.
 */

'use client'

import { useEffect, useRef, useState } from 'react'

export interface AnimatedCountProps {
  /** Target number to count to */
  value: number
  /** Starting number (default: 0) */
  from?: number
  /** Animation duration in ms (default: 400) */
  duration?: number
  /** Easing function (default: easeOutQuart for snappy feel) */
  easing?: (t: number) => number
  /** Format the displayed number (default: Math.round) */
  formatValue?: (value: number) => string
  /** Optional className for the span */
  className?: string
  /** Optional style for the span */
  style?: React.CSSProperties
}

// Easing functions
const easings = {
  // Fast start, gradual slow at end - feels snappy
  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  // Even snappier
  easeOutExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  // Linear
  linear: (t: number) => t,
}

export function AnimatedCount({
  value,
  from = 0,
  duration = 400,
  easing = easings.easeOutQuart,
  formatValue = (v) => Math.round(v).toString(),
  className,
  style,
}: AnimatedCountProps) {
  const [displayValue, setDisplayValue] = useState(from)
  const rafRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const startValueRef = useRef(from)

  useEffect(() => {
    // Cancel any existing animation
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
    }

    const startValue = startValueRef.current
    const delta = value - startValue

    // If no change needed, skip animation
    if (delta === 0) {
      setDisplayValue(value)
      return
    }

    startTimeRef.current = null

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easing(progress)

      const currentValue = startValue + delta * easedProgress
      setDisplayValue(currentValue)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        // Ensure we land exactly on the target value
        setDisplayValue(value)
        startValueRef.current = value
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [value, duration, easing])

  // Update the start value ref when animation completes
  useEffect(() => {
    startValueRef.current = displayValue
  }, [displayValue])

  return (
    <span className={className} style={style}>
      {formatValue(displayValue)}
    </span>
  )
}

// Export easings for customization
export { easings as countEasings }
