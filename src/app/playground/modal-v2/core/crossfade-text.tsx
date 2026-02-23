/**
 * CrossfadeText Component
 *
 * Crossfades or flips text content within a persistent element.
 *
 * Modes:
 * - crossfade: Uses AnimatePresence mode="popLayout" so exit animations don't block layout flow
 * - flip: Uses AnimatePresence mode="wait" for sequential exit-then-enter animation
 */

'use client'

import { motion, AnimatePresence, type Transition } from 'motion/react'

/** Text transition mode */
export type TextTransitionMode = 'crossfade' | 'flip'

/** Easing preset for text transitions */
export type TextTransitionEasing = 'spring' | 'elastic' | 'expo-out' | 'ease-out'

// Easing curves
const EASING_CURVES = {
  elastic: [0.25, 1, 0.5, 1] as const,
  'expo-out': [0.16, 1, 0.3, 1] as const,
  'ease-out': [0, 0, 0.58, 1] as const,
} as const

interface CrossfadeTextProps {
  text: string
  className?: string
  /** Duration of the transition in seconds */
  duration?: number
  /** Spring bounce (0-1) for spring-based transitions */
  bounce?: number
  /** Vertical offset for enter/exit animation */
  yOffset?: number
  /** Use spring physics instead of duration-based timing */
  useSpring?: boolean
  /** Animation mode: crossfade (overlapping) or flip (sequential) */
  mode?: TextTransitionMode
  /** Easing preset for non-spring transitions */
  easing?: TextTransitionEasing
  /** Whether animation is enabled (false = instant text change) */
  enabled?: boolean
}

export function CrossfadeText({
  text,
  className,
  duration = 0.2,
  bounce = 0.1,
  yOffset = 8,
  useSpring = true,
  mode = 'crossfade',
  easing = 'spring',
  enabled = true,
}: CrossfadeTextProps) {
  // When disabled, render static text without animation
  if (!enabled) {
    return <span className={className}>{text}</span>
  }

  // Build transition based on easing type
  const getTransition = (): Transition => {
    if (easing === 'spring' || useSpring) {
      return { type: 'spring', duration, bounce }
    }

    const easingCurve = EASING_CURVES[easing as keyof typeof EASING_CURVES]
    return { duration, ease: easingCurve ?? 'easeOut' }
  }

  const transition = getTransition()

  // AnimatePresence mode based on text transition mode
  const animatePresenceMode = mode === 'flip' ? 'wait' : 'popLayout'

  return (
    <span className="relative inline-block">
      <AnimatePresence mode={animatePresenceMode} initial={false}>
        <motion.span
          key={text}
          initial={{ opacity: 0, y: yOffset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -yOffset }}
          transition={transition}
          className={className}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
