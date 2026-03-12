/**
 * Animated Credits Badge Component
 *
 * Displays credit count with spring animation and color flash
 * when credits change (e.g., after upgrade).
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'
import { CommandIcon } from './icons'

interface AnimatedCreditsBadgeProps {
  value: number
  previousValue: number
  isAnimating: boolean
  onAnimationComplete?: () => void
  /** Pause animation at a specific progress (0-1). Used for capture mode. */
  pauseAtProgress?: number
}

export function AnimatedCreditsBadge({
  value,
  previousValue,
  isAnimating,
  onAnimationComplete,
  pauseAtProgress,
}: AnimatedCreditsBadgeProps) {
  const displayValue = useSpring(previousValue, {
    stiffness: 100,
    damping: 20,
  })

  const scale = useSpring(1, { stiffness: 300, damping: 20 })
  const [displayNumber, setDisplayNumber] = useState(previousValue)

  // Color interpolation: neutral -> success green
  const colorProgress = useSpring(0, { stiffness: 80, damping: 15 })
  const backgroundColor = useTransform(
    colorProgress,
    [0, 1],
    ['rgb(255, 255, 255)', 'rgb(220, 252, 231)'] // white -> green-100
  )
  const borderColor = useTransform(
    colorProgress,
    [0, 1],
    ['rgb(229, 231, 235)', 'rgb(134, 239, 172)'] // gray-200 -> green-300
  )
  const textColor = useTransform(
    colorProgress,
    [0, 1],
    ['rgb(17, 24, 39)', 'rgb(22, 101, 52)'] // gray-900 -> green-800
  )

  useEffect(() => {
    if (isAnimating) {
      // Check if we should pause at a specific progress
      const isPaused = pauseAtProgress !== undefined

      if (isPaused) {
        // Set values to specific progress point for capture
        const targetValue = previousValue + (value - previousValue) * pauseAtProgress
        displayValue.set(targetValue)
        scale.set(1 + 0.15 * (1 - Math.abs(pauseAtProgress - 0.2) * 2)) // Peak at ~0.2
        colorProgress.set(pauseAtProgress < 0.75 ? 1 : 1 - (pauseAtProgress - 0.75) * 4)
        // Don't trigger completion when paused
        return
      }

      // Trigger scale bounce
      scale.set(1.15)
      setTimeout(() => scale.set(1), 150)

      // Trigger color flash
      colorProgress.set(1)
      setTimeout(() => colorProgress.set(0), 600)

      // Animate the number
      displayValue.set(value)

      // Track completion
      const timeout = setTimeout(() => {
        onAnimationComplete?.()
      }, 800)

      return () => clearTimeout(timeout)
    }
  }, [isAnimating, value, previousValue, displayValue, scale, colorProgress, onAnimationComplete, pauseAtProgress])

  useEffect(() => {
    const unsubscribe = displayValue.on('change', (latest) => {
      setDisplayNumber(Math.round(latest))
    })
    return unsubscribe
  }, [displayValue])

  return (
    <motion.span
      style={{
        scale,
        backgroundColor,
        borderColor,
        borderWidth: 1,
        borderStyle: 'solid',
      }}
      className="px-[5px] py-0.5 rounded-lg inline-flex justify-start items-center gap-0.5 overflow-hidden ml-1"
    >
      <motion.span style={{ color: textColor }}>
        <CommandIcon />
      </motion.span>
      <motion.span style={{ color: textColor }} className="text-xs font-semibold">
        {displayNumber}
      </motion.span>
    </motion.span>
  )
}
