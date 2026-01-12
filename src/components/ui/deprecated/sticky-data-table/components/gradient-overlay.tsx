'use client'

/**
 * StickyDataTable V2 - GradientOverlay Component
 *
 * Visual indicator for horizontal scroll availability.
 * Shows a gradient fade on the right edge.
 *
 * @module components/gradient-overlay
 */

import { memo } from 'react'

type OverlayPosition = 'header' | 'body' | 'full'

interface GradientOverlayProps {
  /** Whether to show the overlay */
  visible: boolean
  /** Position (affects border radius) */
  position: OverlayPosition
  /** Background color for gradient (CSS var or color) */
  backgroundColor?: string
  /** Border radius in pixels */
  borderRadius?: number
  /** Top offset in pixels (used when toolbar is integrated above the table) */
  topOffset?: number
}

/**
 * Gradient overlay for scroll indication
 *
 * Shows a subtle gradient on the right edge of the table
 * to indicate more content is available to scroll.
 */
const GradientOverlayBase = ({
  visible,
  position,
  backgroundColor = 'var(--background-color-primary)',
  borderRadius = 12,
  topOffset = 0,
}: GradientOverlayProps) => {
  if (!visible) return null

  // Determine border radius based on position
  const borderRadiusStyle =
    position === 'header'
      ? { borderTopRightRadius: `${borderRadius}px` }
      : position === 'body'
        ? { borderBottomRightRadius: `${borderRadius}px` }
        : { borderTopRightRadius: `${borderRadius}px`, borderBottomRightRadius: `${borderRadius}px` }

  return (
    <div
      className="absolute w-[20px] pointer-events-none z-[20]"
      style={{
        top: topOffset,
        bottom: position === 'full' || position === 'header' ? 0 : undefined,
        right: '1px',
        background: `linear-gradient(to left, ${backgroundColor} 0%, transparent 100%)`,
        ...borderRadiusStyle,
      }}
    />
  )
}

export const GradientOverlay = memo(GradientOverlayBase)
GradientOverlay.displayName = 'GradientOverlay'


