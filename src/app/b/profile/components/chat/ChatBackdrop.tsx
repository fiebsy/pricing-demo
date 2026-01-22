/**
 * ChatRadialBackdrop Component
 *
 * State-driven radial blur backdrop for the chat interface.
 * Uses mask-image with radial gradients to create soft-edged blur zones.
 *
 * Visual States:
 * - collapsed: No visible blur (opacity 0)
 * - default: Configurable coverage from bottom (default 45%)
 * - expanded: Full coverage with soft top edge, clickable to close
 *
 * Performance: S-Tier - only opacity animates, blur value stays static.
 *
 * @module b/profile/components/chat
 */

'use client'

import * as React from 'react'
import { useMemo } from 'react'
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
// MASK GENERATION
// =============================================================================

interface BlurHeightConfig {
  /** Height coverage for default state (0-100, percentage of viewport) */
  default: number
  /** Height coverage for expanded state (0-100, percentage of viewport) */
  expanded: number
  /** How soft the fade edge is (0-100, higher = softer fade) */
  fadeEdge?: number
}

const DEFAULT_BLUR_HEIGHT: BlurHeightConfig = {
  default: 45,
  expanded: 100,
  fadeEdge: 30,
}

/**
 * Generates a radial gradient mask for the given height percentage.
 * The blur fades from solid at the bottom to transparent at the specified height.
 *
 * @param heightPercent - How high the blur extends (0-100)
 * @param fadeEdge - How soft the fade is (0-100)
 */
function generateMask(heightPercent: number, fadeEdge: number = 30): string {
  if (heightPercent <= 0) {
    return 'none'
  }

  // For partial coverage, use an ellipse positioned at bottom center
  // The ellipse height controls how far up the blur extends
  // fadeEdge controls how gradual the transition is

  if (heightPercent >= 100) {
    // Full coverage with soft top edge
    return `radial-gradient(ellipse 150% 120% at 50% 100%, black 0%, black 70%, transparent 100%)`
  }

  // Calculate ellipse dimensions based on desired height
  // Using a wide ellipse (150% width) for natural spread
  const ellipseHeight = heightPercent * 1.2 // Slight overshoot for better coverage
  const fadeStart = 100 - fadeEdge // Where the fade begins (as % of gradient)

  return `radial-gradient(ellipse 150% ${ellipseHeight}% at 50% 100%, black 0%, black ${fadeStart}%, transparent 100%)`
}

// =============================================================================
// COMPONENT
// =============================================================================

export interface ChatBackdropExtendedProps extends ChatBackdropProps {
  /** Configure blur height per state */
  blurHeight?: Partial<BlurHeightConfig>
}

export function ChatBackdrop({
  state,
  onClose,
  className,
  blurHeight,
}: ChatBackdropExtendedProps) {
  const isVisible = state !== 'collapsed'
  const isClickable = state === 'expanded'

  // Merge with defaults
  const config = useMemo(
    () => ({
      ...DEFAULT_BLUR_HEIGHT,
      ...blurHeight,
    }),
    [blurHeight]
  )

  // Generate masks based on config
  const maskPatterns = useMemo(
    () => ({
      collapsed: generateMask(config.default, config.fadeEdge), // Same as default for smooth transition
      default: generateMask(config.default, config.fadeEdge),
      expanded: generateMask(config.expanded, config.fadeEdge),
    }),
    [config]
  )

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
