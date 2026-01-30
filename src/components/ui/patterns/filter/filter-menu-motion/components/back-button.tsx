/**
 * BackButton - Animated back button for submenu navigation
 *
 * Displays a back button with the submenu title.
 * Uses state-based animation pattern.
 *
 * @module prod/base/filter/filter-menu-motion/components/back-button
 */

'use client'

import * as React from 'react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowLeft01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowLeft01Icon'

import type { MotionAnimationConfig } from '../types'
import { getTimedTransition } from '../animation-config'

// ============================================================================
// PROPS
// ============================================================================

export interface BackButtonProps {
  /** Title to display (typically the submenu name) */
  title: string
  /** Callback when back is clicked */
  onBack: () => void
  /** Whether this button is visible (for animation) */
  isVisible: boolean
  /** Animation configuration */
  animationConfig: MotionAnimationConfig
  /** Whether reduced motion is preferred */
  shouldReduceMotion: boolean | null
}

// ============================================================================
// COMPONENT
// ============================================================================

export function BackButton({
  title,
  onBack,
  isVisible,
  animationConfig,
  shouldReduceMotion,
}: BackButtonProps) {
  const animateProps = shouldReduceMotion
    ? { opacity: isVisible ? 1 : 0 }
    : { opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -15 }

  return (
    <>
      <motion.div
        initial={false}
        animate={animateProps}
        transition={getTimedTransition(animationConfig.opacityDuration)}
      >
        <button
          type="button"
          onClick={onBack}
          className={cn(
            'flex items-center gap-2 px-2.5 min-h-9 w-full rounded-xl',
            'text-sm font-medium text-tertiary',
            'transition-colors hover:bg-quaternary',
            'focus-visible:outline-none focus-visible:bg-quaternary',
            'motion-reduce:transition-none'
          )}
        >
          <HugeIcon
            icon={ArrowLeft01Icon}
            size={16}
            strokeWidth={2}
            className="text-fg-tertiary opacity-60 shrink-0"
          />
          <span className="flex-1 truncate text-left">{title}</span>
        </button>
      </motion.div>
      <div
        role="separator"
        className="border-primary -mx-1 my-1 border-t opacity-50"
      />
    </>
  )
}

BackButton.displayName = 'BackButton'
