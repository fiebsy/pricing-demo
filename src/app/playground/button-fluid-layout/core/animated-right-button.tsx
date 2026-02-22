/**
 * Animated Right Button
 *
 * A multi-state button with animated text transitions,
 * loading spinner, and checkmark animations.
 */

'use client'

import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ButtonStateConfig, StateTransitionConfig, CheckmarkEntranceStyle } from '../config/types'

// ============================================================================
// Loading Spinner
// ============================================================================

interface LoadingSpinnerProps {
  className?: string
  slowMo?: boolean
}

function LoadingSpinner({ className, slowMo }: LoadingSpinnerProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={cn('size-5 shrink-0', className)}
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        className="opacity-30"
      />
      {/* Spinning arc */}
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="12.5 50"
        strokeLinecap="round"
        className={cn(
          'origin-center',
          slowMo ? 'animate-[spin_5s_linear_infinite]' : 'animate-spin'
        )}
        style={{ transformOrigin: '10px 10px' }}
      />
    </svg>
  )
}

// ============================================================================
// Animated Checkmark
// ============================================================================

interface AnimatedCheckmarkProps {
  duration: number
  slowMo?: boolean
  entranceStyle?: CheckmarkEntranceStyle
  className?: string
}

function AnimatedCheckmark({ duration, slowMo, className }: AnimatedCheckmarkProps) {
  const durationSeconds = (slowMo ? duration * 5 : duration) / 1000

  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={cn('size-5 shrink-0', className)}
      aria-hidden="true"
    >
      {/* Circle background */}
      <motion.circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: durationSeconds * 0.6, ease: 'easeOut' },
          opacity: { duration: 0.1 },
        }}
        className="motion-reduce:animate-none"
        style={{
          strokeLinecap: 'round',
          rotate: '-90deg',
          transformOrigin: '10px 10px',
        }}
      />
      {/* Checkmark path */}
      <motion.path
        d="M6 10l3 3 5-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: { duration: durationSeconds * 0.4, ease: 'easeOut', delay: durationSeconds * 0.5 },
          opacity: { duration: 0.1, delay: durationSeconds * 0.5 },
        }}
        className="motion-reduce:animate-none"
      />
    </svg>
  )
}

// ============================================================================
// Static Checkmark (for flip animation)
// ============================================================================

function StaticCheckmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={cn('size-5 shrink-0', className)}
      aria-hidden="true"
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        style={{ strokeLinecap: 'round' }}
      />
      <path
        d="M6 10l3 3 5-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

// ============================================================================
// Animated Right Button
// ============================================================================

interface AnimatedRightButtonProps {
  state: ButtonStateConfig
  transition: StateTransitionConfig
  variant?: 'primary' | 'secondary' | 'tertiary'
  slowMo?: boolean
  className?: string
}

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

  // Variant styles matching the Button component
  const variantStyles: Record<string, string> = {
    primary: [
      'bg-brand-solid text-white shadow-xs-skeumorphic ring-1 ring-transparent ring-inset',
      'before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0% before:corner-squircle before:rounded-[calc(0.75rem-1px)]',
    ].join(' '),
    secondary: [
      'bg-primary text-secondary shadow-xs-skeumorphic ring-1 ring-primary ring-inset',
    ].join(' '),
    tertiary: 'text-tertiary',
  }

  return (
    <button
      type="button"
      className={cn(
        // Base styles
        'group relative inline-flex h-max w-full items-center justify-center',
        'whitespace-nowrap cursor-pointer',
        'gap-1 px-3.5 py-2.5 text-sm font-semibold',
        'rounded-xl corner-squircle',
        'before:absolute',
        'outline-brand focus-visible:outline-2 focus-visible:outline-offset-2',
        'transition duration-100 ease-linear motion-reduce:transition-none',
        variantStyles[variant],
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
    </button>
  )
}
