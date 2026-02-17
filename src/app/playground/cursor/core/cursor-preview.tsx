/**
 * Cursor Preview Component
 *
 * Renders the Motion+ Cursor component with configuration
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/cursor
 * @package motion-plus
 */

'use client'

import { Cursor } from 'motion-plus/react'
import { useReducedMotion } from 'motion/react'
import type { CursorConfig } from '../config/types'

// ============================================================================
// Props
// ============================================================================

interface CursorPreviewProps {
  config: CursorConfig
}

// ============================================================================
// Component
// ============================================================================

export function CursorPreview({ config }: CursorPreviewProps) {
  const shouldReduceMotion = useReducedMotion()

  // Respect user's motion preferences
  if (shouldReduceMotion) {
    return null
  }

  // If custom cursor is disabled, use native browser cursor
  if (!config.showCursor) {
    return null
  }

  // Build variants from config
  const variants = {
    default: {
      scale: 1,
      filter: 'blur(0px)',
    },
    pointer: {
      scale: config.variants.pointerScale,
      ...(config.variants.pointerBackground && {
        backgroundColor: config.variants.pointerBackground,
      }),
    },
    pressed: {
      scale: config.variants.pressedScale,
      ...(config.variants.pressedBlur && {
        filter: 'blur(5px)',
      }),
    },
    text: {
      width: 2,
      height: '1em',
    },
  }

  // Build spring config
  const springConfig = config.spring.enabled
    ? {
        stiffness: config.spring.stiffness,
        damping: config.spring.damping,
        mass: config.spring.mass,
      }
    : undefined

  // Build magnetic config
  const magneticConfig = config.magnetic.enabled
    ? {
        snap: config.magnetic.snap,
        morph: config.magnetic.morph,
        padding: config.magnetic.padding,
      }
    : false

  return (
    <Cursor
      follow={config.mode === 'follow'}
      center={config.center}
      offset={config.offset}
      spring={springConfig}
      magnetic={magneticConfig}
      matchTextSize={config.matchTextSize}
      variants={variants}
      style={{
        backgroundColor: config.style.background,
        borderRadius: config.style.borderRadius,
        width: config.style.width ?? undefined,
        height: config.style.height ?? undefined,
        mixBlendMode: config.style.mixBlendMode,
      }}
    />
  )
}
