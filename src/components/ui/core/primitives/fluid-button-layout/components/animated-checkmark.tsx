/**
 * Animated Checkmark
 *
 * SVG-based checkmark with draw animation using Motion.
 * Supports both animated (draw) and static rendering.
 *
 * @status stable
 */

'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

// ============================================================================
// Animated Checkmark (with draw animation)
// ============================================================================

export interface AnimatedCheckmarkProps {
  /** Draw animation duration in milliseconds */
  duration: number
  /** Slow motion mode (5x slower) */
  slowMo?: boolean
  className?: string
}

export function AnimatedCheckmark({ duration, slowMo, className }: AnimatedCheckmarkProps) {
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
// Static Checkmark (for flip animation style)
// ============================================================================

export interface StaticCheckmarkProps {
  className?: string
}

export function StaticCheckmark({ className }: StaticCheckmarkProps) {
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
