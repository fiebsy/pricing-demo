/**
 * Biaxial Expand - Content Layer Component
 *
 * UNIFIED container for trigger + bottom content with clip-path animation.
 * This matches the architecture where everything expands from a single origin.
 *
 * The clip-path reveals:
 * - Collapsed: Only the trigger area (centered)
 * - Expanded: Full panel including bottom content
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useBiaxialExpand } from '../context'
import { EASING_EXPO_OUT } from '../constants'

export interface ContentLayerProps {
  /** Child content (TriggerSlot + BottomSlot) */
  children: React.ReactNode
  /** Additional className */
  className?: string
}

/**
 * Calculate clip-path for unified biaxial animation.
 */
function getUnifiedClipPath(
  expanded: boolean,
  panelWidth: number,
  panelHeight: number,
  triggerWidth: number,
  triggerHeight: number,
  borderRadius: number
): string {
  if (expanded) {
    return `inset(0 0 0 0 round ${borderRadius}px)`
  }

  // Collapsed: show only trigger area centered
  const sideInset = (panelWidth - triggerWidth) / 2
  const bottomInset = panelHeight - triggerHeight

  return `inset(0 ${sideInset}px ${bottomInset}px ${sideInset}px round ${borderRadius}px)`
}

export const ContentLayer: React.FC<ContentLayerProps> = ({
  children,
  className,
}) => {
  const {
    expanded,
    config,
    timing,
    dimensions,
    totalExpandedHeight,
  } = useBiaxialExpand()

  const { layout } = config
  const duration = timing.duration

  // Total height = trigger + bottomGap + bottomContent
  const panelHeight = layout.triggerHeight + layout.bottomGap + dimensions.bottomHeight

  // Calculate clip-path
  const clipPath = getUnifiedClipPath(
    expanded,
    layout.panelWidth,
    panelHeight,
    layout.triggerWidth,
    layout.triggerHeight,
    layout.borderRadius
  )

  return (
    <div
      className={cn('absolute motion-reduce:transition-none', className)}
      style={{
        zIndex: 11,
        top: 0,
        left: '50%',
        marginLeft: -(layout.panelWidth / 2),
        width: layout.panelWidth,
        height: panelHeight,
        clipPath,
        transition: `clip-path ${duration}ms ${EASING_EXPO_OUT}, height ${duration}ms ${EASING_EXPO_OUT}`,
        pointerEvents: expanded ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  )
}

ContentLayer.displayName = 'BiaxialExpand.Content'
