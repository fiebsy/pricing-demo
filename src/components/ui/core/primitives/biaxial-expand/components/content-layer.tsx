/**
 * Biaxial Expand - Content Layer Component
 *
 * UNIFIED container for trigger + bottom content + horizontal slots with clip-path animation.
 * This matches the architecture where everything expands from a single origin.
 *
 * The clip-path reveals:
 * - Collapsed: Only the trigger area (centered based on expandOriginX)
 * - Expanded: Full panel including bottom content AND horizontal slots
 *
 * By including horizontal slots INSIDE this layer, they are clipped by the same
 * unified clip-path, preventing the "floating" content effect during animation.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useBiaxialExpand } from '../context'
import { EASING_EXPO_OUT } from '../constants'
import { getHorizontalPosition, getClipPathInsets } from '../utils/positioning'
import { getExtendedContentClipPath } from '../utils/clip-path'

export interface ContentLayerProps {
  /** Child content (TriggerSlot + BottomSlot + LeftSlot + RightSlot) */
  children: React.ReactNode
  /** Additional className */
  className?: string
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
  } = useBiaxialExpand()

  const { layout } = config
  const duration = timing.duration

  // Get slot insets for calculations
  const leftInset = config.leftSlot.appearance?.inset ?? config.leftSlot.inset ?? 4
  const rightInset = config.rightSlot.appearance?.inset ?? config.rightSlot.inset ?? 4

  // Get gaps
  const leftGap = layout.leftGap ?? 0
  const rightGap = layout.rightGap ?? 0

  // Calculate contributions from horizontal slots
  // Each slot contributes: width + inset*2 (for padding on both sides) + gap
  const leftContribution = config.leftSlot.enabled
    ? dimensions.leftWidth + (leftInset * 2) + leftGap
    : 0
  const rightContribution = config.rightSlot.enabled
    ? dimensions.rightWidth + (rightInset * 2) + rightGap
    : 0

  // Total width = left contribution + panel + right contribution
  const totalWidth = leftContribution + layout.panelWidth + rightContribution

  // Total height = trigger + bottomGap + bottomContent
  const panelHeight = layout.triggerHeight + layout.bottomGap + dimensions.bottomHeight

  // Get horizontal positioning based on expandOriginX
  const expandOriginX = layout.expandOriginX ?? 'center'
  const { leftInset: clipLeftInset, rightInset: clipRightInset } = getClipPathInsets(
    expandOriginX,
    layout.panelWidth,
    layout.triggerWidth
  )
  const horizontalPos = getHorizontalPosition(expandOriginX, layout.panelWidth, layout.panelWidth)

  // Calculate clip-path with extended dimensions for horizontal slots
  const clipPath = getExtendedContentClipPath(
    expanded,
    panelHeight,
    layout.triggerHeight,
    layout.borderRadius,
    clipLeftInset,
    clipRightInset,
    leftContribution,
    rightContribution
  )

  // Adjust horizontal position to account for left contribution
  // This keeps the trigger visually anchored at its original position
  const adjustedMarginLeft = (horizontalPos.marginLeft ?? 0) - leftContribution

  return (
    <div
      className={cn('absolute motion-reduce:transition-none', className)}
      style={{
        zIndex: 11,
        top: 0,
        left: horizontalPos.left,
        right: horizontalPos.right,
        marginLeft: adjustedMarginLeft,
        width: totalWidth,
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
