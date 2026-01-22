/**
 * ChatBackdrop Component
 *
 * Translucent blur overlay that appears when chat is expanded.
 * Uses Motion for enter/exit animations.
 *
 * @module b/profile/components/chat
 */

'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { ChatBackdropProps } from '../../types'

// =============================================================================
// ANIMATION CONFIG
// =============================================================================

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const backdropTransition = {
  duration: 0.3,
  ease: [0.2, 0.8, 0.2, 1] as const,
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ChatBackdrop({ visible, onClose }: ChatBackdropProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={backdropTransition}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm motion-reduce:transition-none"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  )
}
