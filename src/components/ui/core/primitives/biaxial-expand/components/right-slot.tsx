/**
 * Biaxial Expand - Right Slot Component
 *
 * Container for content that expands RIGHTWARD from the trigger.
 * Now positioned INSIDE ContentLayer, so it is clipped by the parent's
 * unified clip-path instead of needing its own outer clip-path.
 *
 * Uses the same height mode system as vertical slots:
 * - Fixed: Use a specific width
 * - Auto: Measures content width
 * - Dynamic: Use maxRightWidth for scrollable content
 */

'use client'

import * as React from 'react'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useBiaxialExpand } from '../context'
import {
  getBackgroundClass,
  getBorderColorVar,
  getBiaxialSlotContainerClipPath,
} from '../utils'
import { getHorizontalSlotVerticalPosition, getHorizontalSlotBottomPosition } from '../utils/positioning'
import { EASING_EXPO_OUT } from '../constants'
import type { SlotProps } from '../types'

export const RightSlot: React.FC<SlotProps> = ({
  children,
  className,
  config: slotConfigOverride,
}) => {
  const {
    expanded,
    config,
    dimensions,
    setSlotWidth,
    setSlotHeight,
    setSlotAlignmentPadding,
    timing,
    refs,
  } = useBiaxialExpand()

  const contentRef = useRef<HTMLDivElement>(null)
  const slotConfig = { ...config.rightSlot, ...slotConfigOverride }

  // Determine effective width
  const effectiveWidth = config.layout.maxRightWidth ?? 200

  // Check if this slot drives panel height
  const drivesPanelHeight = slotConfig.drivesPanelHeight ?? false

  // Set width for dimension tracking
  useEffect(() => {
    setSlotWidth('right', slotConfig.enabled ? effectiveWidth : 0)
  }, [effectiveWidth, slotConfig.enabled, setSlotWidth])

  // Report height when driving panel height
  useEffect(() => {
    if (drivesPanelHeight && slotConfig.enabled) {
      // When driving panel, use drivingHeight as the slot's height contribution
      const heightValue = slotConfig.drivingHeight ?? 200
      setSlotHeight('right', heightValue)
    } else {
      setSlotHeight('right', 0)
    }
  }, [drivesPanelHeight, slotConfig.enabled, slotConfig.drivingHeight, setSlotHeight])

  // If slot is disabled, don't render
  if (!slotConfig.enabled) {
    return null
  }

  const duration = timing.slotDuration('right')
  const delay = timing.slotDelay('right')
  const innerDuration = duration + (config.animation.slotContainerDurationOffset ?? 100)

  // Inner container uses biaxial clip-path for compound diagonal "offset" effect
  // Use configured expand origin (default: 'left' - content grows from left toward right)
  const expandOrigin = config.animation.rightExpandOrigin ?? 'left'
  const innerClipPath = config.animation.animateSlotContainers
    ? getBiaxialSlotContainerClipPath(expanded, expandOrigin, 'top')
    : 'inset(0 0 0 0)'

  // Inset from container edges
  const inset = slotConfig.appearance?.inset ?? slotConfig.inset ?? 4

  // Total width: slot width + inset on BOTH sides
  const totalWidth = effectiveWidth + (inset * 2)

  // Gap between panel and right slot
  const rightGap = config.layout.rightGap ?? 0

  // Calculate base panel height considering all slots that can drive height
  // Must match ContentLayer's calculation for correct vertical positioning
  const calculateBasePanelHeight = () => {
    const contributions: number[] = [config.layout.triggerHeight]

    // Bottom slot contribution (drivesPanelHeight defaults to true)
    if (config.bottomSlot.enabled && config.bottomSlot.drivesPanelHeight !== false) {
      const effectiveBottomExtension = dimensions.bottomHeight || config.layout.maxBottomHeight
      const effectiveBottomGap = config.layout.bottomGap
      contributions.push(config.layout.triggerHeight + effectiveBottomGap + effectiveBottomExtension)
    }

    // Left slot contribution (when explicitly driving)
    // Account for vertical alignment - only the portion below trigger top counts
    if (config.leftSlot.enabled && config.leftSlot.drivesPanelHeight) {
      const leftHeight = dimensions.leftHeight || config.leftSlot.drivingHeight || 0
      const leftAlign = config.leftSlot.verticalAlign ?? 'top'
      const leftBottom = getHorizontalSlotBottomPosition(leftAlign, config.layout.triggerHeight, leftHeight)
      contributions.push(leftBottom)
    }

    // Right slot contribution (when explicitly driving)
    // Account for vertical alignment - only the portion below trigger top counts
    if (config.rightSlot.enabled && config.rightSlot.drivesPanelHeight) {
      const rightHeight = dimensions.rightHeight || config.rightSlot.drivingHeight || 0
      const rightAlign = config.rightSlot.verticalAlign ?? 'top'
      const rightBottom = getHorizontalSlotBottomPosition(rightAlign, config.layout.triggerHeight, rightHeight)
      contributions.push(rightBottom)
    }

    return Math.max(...contributions)
  }

  const basePanelHeight = calculateBasePanelHeight()

  // Calculate top slot contribution for full visual height
  // Use maxTopHeight as fallback when dimensions.topHeight hasn't been measured yet
  const effectiveTopGap = config.topSlot.enabled ? (config.layout.topGap ?? 0) : 0
  const topSlotContribution = config.topSlot.enabled
    ? (dimensions.topHeight || config.layout.maxTopHeight || 0) + effectiveTopGap
    : 0

  // Full visual height includes top slot area (matches extended ContentLayer)
  const fullVisualHeight = topSlotContribution + basePanelHeight

  // For 'full' mode, we need the TRUE visual height including alignment padding from the OTHER slot
  // When left slot has center/bottom alignment with a tall slot, it extends ContentLayer upward
  // The right slot with 'full' must span this entire extended height
  const actualFullVisualHeight = dimensions.leftAlignmentPadding + topSlotContribution + basePanelHeight

  // Calculate effective slot height based on maxHeight constraint OR drivesPanelHeight
  // When driving panel height, use drivingHeight as the slot's height
  // When 'full', use actualFullVisualHeight which includes other slot's alignment padding
  const slotMaxHeight = slotConfig.maxHeight
  const configuredDrivingHeight = slotConfig.drivingHeight ?? 200
  const verticalAlign = slotConfig.verticalAlign ?? 'top'
  // When maxHeight is specified, use it as an absolute constraint (not clamped by panel height)
  // This allows slots to be taller than the panel when not driving panel height
  const effectiveSlotHeight = drivesPanelHeight
    ? configuredDrivingHeight
    : verticalAlign === 'full'
      ? actualFullVisualHeight
      : slotMaxHeight ?? fullVisualHeight

  // Calculate vertical position based on alignment RELATIVE TO TRIGGER
  // This ensures verticalAlign aligns the slot with the trigger, not the full panel
  // For 'full' mode, the slot spans from ContentLayer top to bottom
  const { topOffset, alignmentPadding } = getHorizontalSlotVerticalPosition(
    verticalAlign,
    topSlotContribution,
    config.layout.triggerHeight,
    effectiveSlotHeight
  )

  // Report alignment padding to root so ContentLayer can extend upward
  // Use useLayoutEffect to ensure dimensions are updated before paint
  useLayoutEffect(() => {
    setSlotAlignmentPadding('right', alignmentPadding)
  }, [alignmentPadding, setSlotAlignmentPadding])

  // Account for the maximum alignment padding from either slot
  // ContentLayer extends by max(leftAlignmentPadding, rightAlignmentPadding)
  // Use the locally calculated alignmentPadding for this slot (not from dimensions)
  // to avoid timing issues on first render
  const maxAlignmentPadding = Math.max(
    dimensions.leftAlignmentPadding,
    alignmentPadding // Use local value for this slot
  )
  // Adjust topOffset to account for extra extension from the other slot
  // For 'full' mode, position at 0 (ContentLayer coordinate 0 = visual top)
  // ContentLayer already extends upward to accommodate alignment padding
  const adjustedTopOffset = verticalAlign === 'full'
    ? 0
    : topOffset + (maxAlignmentPadding - alignmentPadding)

  // Debug logging
  if (config.debug) {
    console.log('[RightSlot] Vertical Alignment Debug:', {
      verticalAlign,
      triggerTop: topSlotContribution,
      triggerHeight: config.layout.triggerHeight,
      slotHeight: effectiveSlotHeight,
      slotTopRelativeToTrigger: topOffset - topSlotContribution - alignmentPadding,
      alignmentPadding,
      maxAlignmentPadding,
      topOffset,
      adjustedTopOffset,
      fullVisualHeight,
    })
  }

  // Use config.debug instead of static flag
  const showDebug = config.debug

  // Calculate left slot contribution to know where the panel starts
  const leftInset = config.leftSlot.appearance?.inset ?? config.leftSlot.inset ?? 4
  const leftGap = config.layout.leftGap ?? 0
  const leftContribution = config.leftSlot.enabled
    ? dimensions.leftWidth + (leftInset * 2) + leftGap
    : 0

  // Position at the right edge of ContentLayer
  // ContentLayer width = leftContribution + panelWidth + rightContribution
  // RightSlot starts at: leftContribution + panelWidth + rightGap
  const leftPosition = leftContribution + config.layout.panelWidth + rightGap

  return (
    <div
      ref={refs.right}
      className="absolute"
      style={{
        zIndex: 13, // Above backdrop (11), below trigger (14)
        left: leftPosition,
        top: adjustedTopOffset,
        height: effectiveSlotHeight,
        width: totalWidth,
        ...(showDebug && { background: 'rgba(255,0,0,0.3)', outline: '2px dashed red' }),
      }}
    >
      {/* Inner container with compound animation */}
      <div
        ref={contentRef}
        className={cn(
          'absolute overflow-hidden',
          config.appearance.squircle && 'corner-squircle',
          !showDebug && getBackgroundClass(slotConfig.background ?? 'secondary'),
          slotConfig.shine && slotConfig.shine !== 'none' && slotConfig.shine,
          className
        )}
        style={{
          top: inset,
          left: inset,
          bottom: inset,
          right: inset,
          borderRadius: slotConfig.borderRadius ?? 14,
          clipPath: innerClipPath,
          transition: `clip-path ${innerDuration}ms ${EASING_EXPO_OUT} ${delay}ms`,
          ...(showDebug && { background: 'rgba(0,255,0,0.3)', outline: '2px dashed green' }),
          ...(slotConfig.borderWidth && slotConfig.borderWidth > 0 && {
            borderTopWidth: slotConfig.borderWidth,
            borderLeftWidth: 0,
            borderRightWidth: slotConfig.borderWidth,
            borderBottomWidth: slotConfig.borderWidth,
            borderStyle: 'solid',
            borderColor: getBorderColorVar(slotConfig.borderColor ?? 'primary'),
          }),
        }}
      >
        {children}
      </div>
      {/* Debug overlay: shows slot bottom boundary */}
      {showDebug && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 2,
            background: 'yellow',
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
              color: 'yellow',
              fontFamily: 'monospace',
              whiteSpace: 'nowrap',
            }}
          >
            SLOT BOTTOM: {adjustedTopOffset + effectiveSlotHeight}px
          </span>
        </div>
      )}
    </div>
  )
}

RightSlot.displayName = 'BiaxialExpand.RightSlot'
