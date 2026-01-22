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
  /** How soft the fade edge is (0-100, higher = softer/more gradual fade) */
  fadeEdge?: number
}

const DEFAULT_BLUR_HEIGHT: BlurHeightConfig = {
  default: 45,
  expanded: 100,
  fadeEdge: 40,
}

/**
 * Generates a radial gradient mask with soft multi-stop fade.
 * Creates a natural feathered edge that fades smoothly on all sides.
 *
 * @param heightPercent - How high the blur extends (0-100)
 * @param fadeEdge - How soft the fade is (0-100, higher = more gradual)
 */
function generateMask(heightPercent: number, fadeEdge: number = 40): string {
  if (heightPercent <= 0) {
    return 'none'
  }

  // Use very wide ellipse to avoid hard edges on left/right
  // Height controls how far up the blur extends
  const ellipseWidth = 300 // Extra wide to fade smoothly at horizontal edges
  const ellipseHeight = heightPercent * 2 // Double for smooth vertical fade

  if (heightPercent >= 100) {
    // Full coverage - still use radial for soft edges at top corners
    return `radial-gradient(
      ellipse ${ellipseWidth}% 200% at 50% 100%,
      black 0%,
      black 40%,
      rgba(0,0,0,0.9) 50%,
      rgba(0,0,0,0.7) 60%,
      rgba(0,0,0,0.4) 75%,
      rgba(0,0,0,0.1) 90%,
      transparent 100%
    )`
  }

  // Calculate fade stops based on fadeEdge
  // Higher fadeEdge = earlier fade start = more gradual transition
  const solidEnd = Math.max(0, 50 - fadeEdge) // Where solid black ends
  const fadeStart = solidEnd + 10
  const fadeMid = fadeStart + 15
  const fadeEnd = Math.min(100, fadeMid + 20)

  // Multi-stop gradient for smooth, natural fade on all edges
  return `radial-gradient(
    ellipse ${ellipseWidth}% ${ellipseHeight}% at 50% 100%,
    black 0%,
    black ${solidEnd}%,
    rgba(0,0,0,0.8) ${fadeStart}%,
    rgba(0,0,0,0.5) ${fadeMid}%,
    rgba(0,0,0,0.2) ${fadeEnd}%,
    transparent 100%
  )`
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
