/**
 * RadialBlurDemo Component
 *
 * Standalone demo component for the radial blur effect.
 * Mirrors ChatBackdrop logic with configurable parameters.
 *
 * @status incubating
 * @migration-target src/app/b/profile/components/chat/ChatBackdrop.tsx
 */

'use client'

import * as React from 'react'
import { useMemo } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { ChatOverlayState } from '@/app/b/profile/types'
import type { RadialBlurConfig } from '../config/types'

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
  ease: [0.2, 0.8, 0.2, 1] as const,
}

// =============================================================================
// MASK GENERATION
// =============================================================================

function generateMask(
  heightPercent: number,
  fadeEdge: number,
  ellipseWidth: number
): string {
  if (heightPercent <= 0) {
    return 'none'
  }

  const ellipseHeight = heightPercent * 2

  if (heightPercent >= 100) {
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

  const solidEnd = Math.max(0, 50 - fadeEdge)
  const fadeStart = solidEnd + 10
  const fadeMid = fadeStart + 15
  const fadeEnd = Math.min(100, fadeMid + 20)

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

export interface RadialBlurDemoProps {
  config: RadialBlurConfig
  className?: string
}

export function RadialBlurDemo({ config, className }: RadialBlurDemoProps) {
  const state = config.demoState
  const isVisible = state !== 'collapsed'

  // Generate masks based on config
  const maskPatterns = useMemo(() => {
    const { height, style } = config
    return {
      collapsed: generateMask(height.default, height.fadeEdge, style.ellipseWidth),
      default: generateMask(height.default, height.fadeEdge, style.ellipseWidth),
      expanded: generateMask(height.expanded, height.fadeEdge, style.ellipseWidth),
    }
  }, [config])

  // Build dynamic blur class
  const blurStyle = useMemo(() => {
    const blurValue = `blur(${config.style.blurAmount}px)`
    const overlayColor = `rgba(0, 0, 0, ${config.style.overlayOpacity / 100})`
    return {
      backdropFilter: blurValue,
      WebkitBackdropFilter: blurValue,
      backgroundColor: overlayColor,
    }
  }, [config.style.blurAmount, config.style.overlayOpacity])

  return (
    <motion.div
      initial="collapsed"
      animate={state}
      variants={backdropVariants}
      transition={backdropTransition}
      className={cn(
        'absolute inset-0',
        'motion-reduce:transition-none',
        className
      )}
      style={{
        ...blurStyle,
        WebkitMaskImage: maskPatterns[state],
        maskImage: maskPatterns[state],
        visibility: isVisible ? 'visible' : 'hidden',
      }}
      aria-hidden="true"
    />
  )
}
