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
 * @param ellipseWidth - Width of the ellipse (100-500)
 */
function generateMask(
  heightPercent: number,
  fadeEdge: number = 40,
  ellipseWidth: number = 500
): string {
  if (heightPercent <= 0) {
    return 'none'
  }

  // Height controls how far up the blur extends
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

export interface BlurStyleConfig {
  /** Blur intensity in pixels */
  blurAmount?: number
  /** Background overlay opacity (0-100) */
  overlayOpacity?: number
  /** Ellipse width multiplier (100-500) */
  ellipseWidth?: number
}

export interface ChatBackdropExtendedProps extends ChatBackdropProps {
  /** Configure blur height per state */
  blurHeight?: Partial<BlurHeightConfig>
  /** Configure blur style */
  blurStyle?: BlurStyleConfig
}

const DEFAULT_BLUR_STYLE: Required<BlurStyleConfig> = {
  blurAmount: 20,
  overlayOpacity: 50,
  ellipseWidth: 500,
}

export function ChatBackdrop({
  state,
  onClose,
  className,
  blurHeight,
  blurStyle,
}: ChatBackdropExtendedProps) {
  const isVisible = state !== 'collapsed'
  const isClickable = state !== 'collapsed' // Allow click to close in both default and expanded states

  // Merge with defaults
  const heightConfig = useMemo(
    () => ({
      ...DEFAULT_BLUR_HEIGHT,
      ...blurHeight,
    }),
    [blurHeight]
  )

  const styleConfig = useMemo(
    () => ({
      ...DEFAULT_BLUR_STYLE,
      ...blurStyle,
    }),
    [blurStyle]
  )

  // Generate masks based on config
  const maskPatterns = useMemo(
    () => ({
      collapsed: generateMask(heightConfig.default, heightConfig.fadeEdge, styleConfig.ellipseWidth),
      default: generateMask(heightConfig.default, heightConfig.fadeEdge, styleConfig.ellipseWidth),
      expanded: generateMask(heightConfig.expanded, heightConfig.fadeEdge, styleConfig.ellipseWidth),
    }),
    [heightConfig, styleConfig.ellipseWidth]
  )

  return (
    <motion.div
      initial="collapsed"
      animate={state}
      variants={backdropVariants}
      transition={backdropTransition}
      className={cn(
        'fixed inset-0 z-40',
        isClickable ? 'cursor-pointer' : 'pointer-events-none',
        'motion-reduce:transition-none',
        className
      )}
      style={{
        backdropFilter: `blur(${styleConfig.blurAmount}px)`,
        WebkitBackdropFilter: `blur(${styleConfig.blurAmount}px)`,
        backgroundColor: `rgba(0, 0, 0, ${styleConfig.overlayOpacity / 100})`,
        WebkitMaskImage: maskPatterns[state],
        maskImage: maskPatterns[state],
        visibility: isVisible ? 'visible' : 'hidden',
      }}
      onClick={isClickable ? onClose : undefined}
      aria-hidden="true"
    />
  )
}
