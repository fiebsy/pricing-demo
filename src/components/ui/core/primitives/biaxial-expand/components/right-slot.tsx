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
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useBiaxialExpand } from '../context'
import {
  getBackgroundClass,
  getBorderColorVar,
  getBiaxialSlotContainerClipPath,
} from '../utils'
import { EASING_EXPO_OUT } from '../constants'
import type { SlotProps } from '../types'

// Debug flag - set to true to visualize spacing layers
const DEBUG_LAYOUT = false

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
    timing,
    refs,
  } = useBiaxialExpand()

  const contentRef = useRef<HTMLDivElement>(null)
  const slotConfig = { ...config.rightSlot, ...slotConfigOverride }

  // Determine effective width
  const effectiveWidth = config.layout.maxRightWidth ?? 200

  // Set width for dimension tracking
  useEffect(() => {
    setSlotWidth('right', slotConfig.enabled ? effectiveWidth : 0)
  }, [effectiveWidth, slotConfig.enabled, setSlotWidth])

  // If slot is disabled, don't render
  if (!slotConfig.enabled) {
    return null
  }

  const duration = timing.slotDuration('right')
  const delay = timing.slotDelay('right')
  const innerDuration = duration + (config.animation.slotContainerDurationOffset ?? 100)

  // Inner container uses biaxial clip-path for compound diagonal "offset" effect
  // For right slot, the inner content grows from top-left (toward bottom-right)
  const innerClipPath = config.animation.animateSlotContainers
    ? getBiaxialSlotContainerClipPath(expanded, 'left', 'top')
    : 'inset(0 0 0 0)'

  // Inset from container edges
  const inset = slotConfig.appearance?.inset ?? slotConfig.inset ?? 4

  // Total width: slot width + inset on BOTH sides
  const totalWidth = effectiveWidth + (inset * 2)

  // Gap between panel and right slot
  const rightGap = config.layout.rightGap ?? 0

  // Calculate full panel height (trigger + gap + bottom) - matches backdrop calculation
  const effectiveBottomGap = config.bottomSlot.enabled ? config.layout.bottomGap : 0
  const fullPanelHeight = config.layout.triggerHeight + effectiveBottomGap + dimensions.bottomHeight

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
        top: 0,
        height: fullPanelHeight,
        width: totalWidth,
        ...(DEBUG_LAYOUT ? { background: 'rgba(255,0,0,0.3)', outline: '2px dashed red' } : {}),
      }}
    >
      {/* Inner container with compound animation */}
      <div
        ref={contentRef}
        className={cn(
          'absolute overflow-hidden',
          config.appearance.squircle && 'corner-squircle',
          !DEBUG_LAYOUT && getBackgroundClass(slotConfig.background ?? 'secondary'),
          slotConfig.shine && slotConfig.shine !== 'none' && slotConfig.shine,
          className
        )}
        style={{
          top: inset,
          left: inset,
          bottom: inset,
          width: effectiveWidth,
          borderRadius: slotConfig.borderRadius ?? 14,
          clipPath: innerClipPath,
          transition: `clip-path ${innerDuration}ms ${EASING_EXPO_OUT} ${delay}ms`,
          ...(DEBUG_LAYOUT ? { background: 'rgba(0,255,0,0.3)', outline: '2px dashed green' } : {}),
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
    </div>
  )
}

RightSlot.displayName = 'BiaxialExpand.RightSlot'
