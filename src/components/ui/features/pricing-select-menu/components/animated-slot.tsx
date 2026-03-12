/**
 * Pricing Select Menu - Animated Slot Component
 *
 * Wrapper that crossfades between A and B content.
 * Uses AnimatePresence with popLayout mode for smooth overlapping transitions.
 */

'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import type { VariantTransitionConfig } from '../types'

export interface AnimatedSlotContentProps {
  variantKey: string
  children: React.ReactNode
  transition?: VariantTransitionConfig
}

export const AnimatedSlotContent: React.FC<AnimatedSlotContentProps> = ({
  variantKey,
  children,
  transition,
}) => {
  // Default transition values if not provided
  const {
    enabled = true,
    type = 'spring',
    duration = 0.35,
    bounce = 0.1,
    yOffset = 6,
  } = transition || {}

  // If animation is disabled, render children directly without wrapper
  if (!enabled) {
    return <div className="w-full">{children}</div>
  }

  // Build motion transition config
  const motionTransition =
    type === 'spring'
      ? { type: 'spring' as const, duration, bounce }
      : { type: 'tween' as const, duration, ease: 'easeInOut' as const }

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={variantKey}
        initial={{ opacity: 0, y: yOffset }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -yOffset }}
        transition={motionTransition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

AnimatedSlotContent.displayName = 'PricingSelectMenu.AnimatedSlotContent'
