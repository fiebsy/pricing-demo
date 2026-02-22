/**
 * ContentSlot Component
 *
 * Unified content renderer that handles both content types:
 * - wireframe: Renders AnimatedWireframeLines placeholder bars
 * - text: Renders animated text paragraph with crossfade transitions
 *
 * Both types animate height changes using Motion's layout prop.
 */

'use client'

import { motion, AnimatePresence } from 'motion/react'
import type { ContentSlotConfig, TextTransitionEasing, TextTransitionMode } from '../config/types'
import { AnimatedWireframeLines } from './animated-wireframe-lines'

// Easing curves for text animations
const EASING_CURVES = {
  elastic: [0.25, 1, 0.5, 1] as const,
  'expo-out': [0.16, 1, 0.3, 1] as const,
  'ease-out': [0, 0, 0.58, 1] as const,
} as const

interface ContentSlotProps {
  config: ContentSlotConfig
  /** Gap between wireframe lines in pixels */
  lineGap: number
  /** Duration of layout/content animations in seconds */
  duration?: number
  /** Spring bounce (0-1) */
  bounce?: number
  /** Text transition mode */
  textMode?: TextTransitionMode
  /** Text easing preset */
  textEasing?: TextTransitionEasing
  /** Vertical offset for text enter/exit animation */
  textYOffset?: number
}

export function ContentSlot({
  config,
  lineGap,
  duration = 0.4,
  bounce = 0.1,
  textMode = 'crossfade',
  textEasing = 'spring',
  textYOffset = 8,
}: ContentSlotProps) {
  const { type, height, lineCount, text } = config

  // Wireframe content type
  if (type === 'wireframe') {
    return (
      <AnimatedWireframeLines
        lineCount={lineCount ?? 3}
        lineGap={lineGap}
        height={height}
        duration={duration}
        bounce={bounce}
      />
    )
  }

  // Text content type
  // Build transition based on easing type
  const getTransition = () => {
    if (textEasing === 'spring') {
      return { type: 'spring' as const, duration, bounce }
    }
    const easingCurve = EASING_CURVES[textEasing as keyof typeof EASING_CURVES]
    return { duration, ease: easingCurve ?? 'easeOut' }
  }

  const transition = getTransition()
  const animatePresenceMode = textMode === 'flip' ? 'wait' : 'popLayout'

  return (
    <motion.div
      layout
      className="flex w-full flex-col justify-center overflow-hidden"
      style={{ height }}
      transition={{
        layout: {
          type: 'spring',
          duration,
          bounce,
        },
      }}
    >
      <AnimatePresence mode={animatePresenceMode} initial={false}>
        <motion.p
          key={text ?? ''}
          initial={{ opacity: 0, y: textYOffset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -textYOffset }}
          transition={transition}
          className="text-sm text-secondary leading-relaxed"
        >
          {text || 'Enter content text...'}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}
