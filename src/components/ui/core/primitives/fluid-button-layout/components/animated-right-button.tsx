/**
 * Animated Right Button
 *
 * A multi-state button with animated text transitions,
 * loading spinner, and checkmark animations.
 *
 * Built on Base UI Button with Motion for animations.
 * Imports styles from shared button config for design system sync.
 *
 * @status stable
 */

'use client'

import { Button } from '@base-ui/react/button'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import {
  commonStyles,
  sizeStyles,
  roundnessStyles,
  variantStyles,
} from '@/components/ui/core/primitives/button/config'
import type { ButtonState, ButtonStateConfig, StateTransitionConfig } from '../types'
import { LoadingSpinner } from './loading-spinner'
import { AnimatedCheckmark, StaticCheckmark } from './animated-checkmark'

// ============================================================================
// Types
// ============================================================================

export interface AnimatedRightButtonProps {
  /** Button state configuration (can be ButtonState or ButtonStateConfig) */
  state: ButtonState | ButtonStateConfig
  /** Animation timing configuration */
  transition: StateTransitionConfig
  /** Button visual variant */
  variant?: 'primary' | 'secondary' | 'tertiary'
  /** Slow motion mode (5x slower animations) */
  slowMo?: boolean
  className?: string
}

// ============================================================================
// Component
// ============================================================================

export function AnimatedRightButton({
  state,
  transition,
  variant = 'secondary',
  slowMo = false,
  className,
}: AnimatedRightButtonProps) {
  const { textSlideDuration, checkmarkDrawDuration, checkmarkEntranceStyle } = transition
  const durationMultiplier = slowMo ? 5 : 1
  const textDurationSeconds = (textSlideDuration * durationMultiplier) / 1000

  return (
    <Button
      render={
        <motion.button
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
        />
      }
      className={cn(
        commonStyles,
        sizeStyles.md,
        roundnessStyles.default,
        variantStyles[variant],
        'w-full',
        className
      )}
    >
      {/* Unified content container */}
      <AnimatePresence mode="wait">
        {(() => {
          // Determine state key for AnimatePresence
          const stateKey = state.showSpinner
            ? 'spinner'
            : state.showCheckmark
              ? `checkmark-${state.text || 'no-text'}`
              : `text-${state.text || 'empty'}`

          // For flip style, unify icon + text in single sliding container
          if (checkmarkEntranceStyle === 'flip') {
            return (
              <motion.div
                key={stateKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: textDurationSeconds,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="flex items-center gap-1 motion-reduce:transition-none"
              >
                {state.showSpinner && <LoadingSpinner slowMo={slowMo} />}
                {state.showCheckmark && !state.showSpinner && <StaticCheckmark />}
                {state.showText && state.text && (
                  <span className="px-0.5">{state.text}</span>
                )}
              </motion.div>
            )
          }

          // For non-flip (draw) style, keep separate animations for icon and text
          return (
            <motion.div
              key={stateKey}
              className="flex items-center gap-1"
            >
              {/* Icon with scale animation */}
              {state.showSpinner && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: textDurationSeconds * 0.5 }}
                  className="motion-reduce:transition-none"
                >
                  <LoadingSpinner slowMo={slowMo} />
                </motion.span>
              )}
              {state.showCheckmark && !state.showSpinner && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: textDurationSeconds * 0.5 }}
                  className="motion-reduce:transition-none"
                >
                  <AnimatedCheckmark duration={checkmarkDrawDuration} slowMo={slowMo} />
                </motion.span>
              )}
              {/* Text with slide animation */}
              {state.showText && state.text && (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: textDurationSeconds,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="px-0.5 motion-reduce:transition-none"
                >
                  {state.text}
                </motion.span>
              )}
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </Button>
  )
}
