/**
 * ChatRadialBackdrop Component
 *
 * State-driven radial blur backdrop for the chat interface.
 * Uses mask-image with radial gradients to create soft-edged blur zones.
 *
 * Visual States:
 * - collapsed: No visible blur (opacity 0)
 * - default: ~30% coverage from bottom with soft fade
 * - expanded: Full coverage with soft top edge, clickable to close
 *
 * Performance: S-Tier - only opacity animates, blur value stays static.
 *
 * @module b/profile/components/chat
 */

'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ChatBackdropProps, ChatOverlayState } from '../../types'

// =============================================================================
// ANIMATION CONFIG
// =============================================================================

const backdropVariants = {
  collapsed: { opacity: 0 },
  default: { opacity: 1 },
  expanded: { opacity: 1 },
}

const backdropTransition = {
  duration: 0.3,
  ease: [0.2, 0.8, 0.2, 1] as const, // ease-standard
}

// =============================================================================
// MASK PATTERNS
// =============================================================================

/**
 * Radial gradient masks per state.
 * Creates soft-edged blur zones without animating the blur itself.
 */
const maskPatterns: Record<ChatOverlayState, string> = {
  // No mask needed when hidden
  collapsed: 'radial-gradient(ellipse 80% 40% at 50% 100%, black 0%, transparent 70%)',
  // Partial coverage from bottom-center (~30%)
  default: 'radial-gradient(ellipse 80% 40% at 50% 100%, black 0%, transparent 70%)',
  // Full coverage with soft top edge
  expanded: 'radial-gradient(ellipse 120% 100% at 50% 100%, black 0%, black 60%, transparent 100%)',
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ChatBackdrop({ state, onClose, className }: ChatBackdropProps) {
  const isVisible = state !== 'collapsed'
  const isClickable = state === 'expanded'

  return (
    <motion.div
      initial="collapsed"
      animate={state}
      variants={backdropVariants}
      transition={backdropTransition}
      className={cn(
        'fixed inset-0 z-40',
        'backdrop-blur-md bg-black/20',
        isClickable ? 'cursor-pointer' : 'pointer-events-none',
        'motion-reduce:transition-none',
        className
      )}
      style={{
        WebkitMaskImage: maskPatterns[state],
        maskImage: maskPatterns[state],
        visibility: isVisible ? 'visible' : 'hidden',
      }}
      onClick={isClickable ? onClose : undefined}
      aria-hidden="true"
    />
  )
}
