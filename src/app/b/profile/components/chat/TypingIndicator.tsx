/**
 * TypingIndicator Component
 *
 * Three-dot animation showing AI is "thinking".
 * Uses staggered bounce animation with Motion.
 *
 * @module b/profile/components/chat
 */

'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

// =============================================================================
// TYPES
// =============================================================================

export interface TypingIndicatorProps {
  className?: string
}

// =============================================================================
// ANIMATION CONFIG
// =============================================================================

const dotVariants = {
  animate: {
    y: [-2, 2, -2],
    transition: {
      repeat: Infinity,
      duration: 0.6,
      ease: 'easeInOut' as const,
    },
  },
}

// =============================================================================
// COMPONENT
// =============================================================================

export function TypingIndicator({ className }: TypingIndicatorProps) {
  return (
    <div className={cn('flex items-center gap-1 px-4 py-3', className)}>
      <div
        className={cn(
          'flex items-center gap-1 px-3 py-2 rounded-2xl rounded-tl-md',
          'bg-brand-primary/5 border border-brand-primary/20'
        )}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate="animate"
            variants={dotVariants}
            style={{ animationDelay: `${i * 0.15}s` }}
            transition={{ delay: i * 0.15 }}
            className="size-2 rounded-full bg-tertiary motion-reduce:animate-none"
          />
        ))}
      </div>
    </div>
  )
}
