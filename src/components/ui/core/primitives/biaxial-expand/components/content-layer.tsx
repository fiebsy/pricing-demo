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
import { getHorizontalPosition, getClipPathInsets, getHorizontalSlotBottomPosition } from '../utils/positioning'
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
  const topGap = layout.topGap ?? 0

  // Calculate contributions from horizontal slots
  // Each slot contributes: width + inset*2 (for padding on both sides) + gap
  const leftContribution = config.leftSlot.enabled
    ? dimensions.leftWidth + (leftInset * 2) + leftGap
    : 0
  const rightContribution = config.rightSlot.enabled
    ? dimensions.rightWidth + (rightInset * 2) + rightGap
    : 0

  // Check if horizontal slots are enabled (need to extend ContentLayer for top slot)
  const hasHorizontalSlots = config.leftSlot.enabled || config.rightSlot.enabled

  // Calculate top slot contribution for extending ContentLayer upward
  // Extend when horizontal slots need to span full visual height OR when top slot drives panel height
  // Use maxTopHeight as fallback when dimensions.topHeight hasn't been measured yet
  const topSlotContribution = (hasHorizontalSlots || config.topSlot.drivesPanelHeight) && config.topSlot.enabled
    ? (dimensions.topHeight || layout.maxTopHeight || 0) + topGap
    : 0

  // Calculate alignment padding from horizontal slots
  // When slots use center/bottom alignment and are taller than the trigger,
  // they need extra space above the trigger
  const maxAlignmentPadding = Math.max(
    dimensions.leftAlignmentPadding,
    dimensions.rightAlignmentPadding
  )

  // Total top extension includes both top slot and alignment padding
  const totalTopExtension = topSlotContribution + maxAlignmentPadding

  // Total width = left contribution + panel + right contribution
  const totalWidth = leftContribution + layout.panelWidth + rightContribution

  // Calculate base panel height considering all slots that can drive height
  // Use Math.max to let the tallest driving slot win
  const calculateBasePanelHeight = () => {
    const contributions: number[] = [layout.triggerHeight]

    // Bottom slot contribution (default driver - drivesPanelHeight defaults to true)
    if (config.bottomSlot.enabled && config.bottomSlot.drivesPanelHeight !== false) {
      const effectiveBottomExtension = dimensions.bottomHeight || layout.maxBottomHeight
      const effectiveBottomGap = layout.bottomGap
      contributions.push(layout.triggerHeight + effectiveBottomGap + effectiveBottomExtension)
    }

    // Left slot contribution (when explicitly driving)
    // Account for vertical alignment - only the portion below trigger top counts
    if (config.leftSlot.enabled && config.leftSlot.drivesPanelHeight) {
      const leftHeight = dimensions.leftHeight || config.leftSlot.drivingHeight || 0
      const leftAlign = config.leftSlot.verticalAlign ?? 'top'
      const leftBottom = getHorizontalSlotBottomPosition(leftAlign, layout.triggerHeight, leftHeight)
      contributions.push(leftBottom)
    }

    // Right slot contribution (when explicitly driving)
    // Account for vertical alignment - only the portion below trigger top counts
    if (config.rightSlot.enabled && config.rightSlot.drivesPanelHeight) {
      const rightHeight = dimensions.rightHeight || config.rightSlot.drivingHeight || 0
      const rightAlign = config.rightSlot.verticalAlign ?? 'top'
      const rightBottom = getHorizontalSlotBottomPosition(rightAlign, layout.triggerHeight, rightHeight)
      contributions.push(rightBottom)
    }

    return Math.max(...contributions)
  }

  const basePanelHeight = calculateBasePanelHeight()

  // Extended height includes top slot area AND alignment padding from horizontal slots
  const extendedPanelHeight = totalTopExtension + basePanelHeight

  // Debug logging
  if (config.debug && (topSlotContribution > 0 || maxAlignmentPadding > 0)) {
    console.log('[ContentLayer] Height Extension Debug:', {
      topSlotContribution,
      maxAlignmentPadding,
      totalTopExtension,
      basePanelHeight,
      extendedPanelHeight,
      leftAlignmentPadding: dimensions.leftAlignmentPadding,
      rightAlignmentPadding: dimensions.rightAlignmentPadding,
    })
  }

  // Get horizontal positioning based on expandOriginX
  const expandOriginX = layout.expandOriginX ?? 'center'
  const { leftInset: clipLeftInset, rightInset: clipRightInset } = getClipPathInsets(
    expandOriginX,
    layout.panelWidth,
    layout.triggerWidth
  )
  const horizontalPos = getHorizontalPosition(expandOriginX, layout.panelWidth, layout.panelWidth)

  // Calculate clip-path with extended dimensions for horizontal slots
  // Pass totalTopExtension to clip the top area when collapsed (includes alignment padding)
  const clipPath = getExtendedContentClipPath(
    expanded,
    extendedPanelHeight,
    layout.triggerHeight,
    layout.borderRadius,
    clipLeftInset,
    clipRightInset,
    leftContribution,
    rightContribution,
    totalTopExtension
  )

  // Adjust horizontal position to account for left contribution
  // This keeps the trigger visually anchored at its original position
  const adjustedMarginLeft = (horizontalPos.marginLeft ?? 0) - leftContribution

  return (
    <div
      className={cn('absolute motion-reduce:transition-none', className)}
      style={{
        zIndex: 11,
        // Move ContentLayer up by totalTopExtension (top slot + alignment padding)
        top: -totalTopExtension,
        left: horizontalPos.left,
        right: horizontalPos.right,
        marginLeft: adjustedMarginLeft,
        width: totalWidth,
        height: extendedPanelHeight,
        clipPath,
        transition: `clip-path ${duration}ms ${EASING_EXPO_OUT}, height ${duration}ms ${EASING_EXPO_OUT}`,
        pointerEvents: expanded ? 'auto' : 'none',
      }}
    >
      {children}
      {/* Debug overlay: shows panel bottom boundary */}
      {config.debug && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 2,
            background: 'cyan',
            pointerEvents: 'none',
            zIndex: 100,
          }}
        >
          <span
            style={{
              position: 'absolute',
              bottom: 4,
              left: 4,
              fontSize: 10,
              color: 'cyan',
              fontFamily: 'monospace',
              whiteSpace: 'nowrap',
            }}
          >
            PANEL BOTTOM: {extendedPanelHeight}px
          </span>
        </div>
      )}
    </div>
  )
}

ContentLayer.displayName = 'BiaxialExpand.Content'
