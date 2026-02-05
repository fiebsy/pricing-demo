/**
 * Biaxial Expand - Left Slot Component
 *
 * Container for content that expands LEFTWARD from the trigger.
 * Now positioned INSIDE ContentLayer, so it is clipped by the parent's
 * unified clip-path instead of needing its own outer clip-path.
 *
 * Uses the same height mode system as vertical slots:
 * - Fixed: Use a specific width
 * - Auto: Measures content width
 * - Dynamic: Use maxLeftWidth for scrollable content
 */

'use client'

import * as React from 'react'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useBiaxialExpand } from '../context'
import { getBackgroundClass, getBorderColorVar } from '../utils'
import { getHorizontalSlotContainerClipPath } from '../utils'
import { EASING_EXPO_OUT } from '../constants'
import type { SlotProps } from '../types'

// Debug flag - set to true to visualize spacing layers
const DEBUG_LAYOUT = false

export const LeftSlot: React.FC<SlotProps> = ({
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
  const slotConfig = { ...config.leftSlot, ...slotConfigOverride }

  // Determine effective width
  const effectiveWidth = config.layout.maxLeftWidth ?? 200

  // Set width for dimension tracking
  useEffect(() => {
    setSlotWidth('left', slotConfig.enabled ? effectiveWidth : 0)
  }, [effectiveWidth, slotConfig.enabled, setSlotWidth])

  // If slot is disabled, don't render
  if (!slotConfig.enabled) {
    return null
  }

  const duration = timing.slotDuration('left')
  const delay = timing.slotDelay('left')
  const innerDuration = duration + (config.animation.slotContainerDurationOffset ?? 100)

  // Inner container uses clip-path for compound "offset" effect
  // For left slot, the inner content grows from right (toward left)
  const innerClipPath = config.animation.animateSlotContainers
    ? getHorizontalSlotContainerClipPath(expanded, 'right')
    : 'inset(0 0 0 0)'

  // Inset from container edges
  const inset = slotConfig.appearance?.inset ?? slotConfig.inset ?? 4

  // Total width: slot width + inset on BOTH sides
  const totalWidth = effectiveWidth + (inset * 2)

  // Calculate full panel height (trigger + gap + bottom) - matches backdrop calculation
  const effectiveBottomGap = config.bottomSlot.enabled ? config.layout.bottomGap : 0
  const fullPanelHeight = config.layout.triggerHeight + effectiveBottomGap + dimensions.bottomHeight

  // Position at the left edge of ContentLayer (left: 0)
  // ContentLayer already accounts for left contribution in its width and positioning

  return (
    <div
      ref={refs.left}
      className="absolute"
      style={{
        zIndex: 13, // Above backdrop (11), below trigger (14)
        left: 0,
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
          right: inset,
          bottom: inset,
          borderRadius: slotConfig.borderRadius ?? 14,
          clipPath: innerClipPath,
          transition: `clip-path ${innerDuration}ms ${EASING_EXPO_OUT} ${delay}ms`,
          ...(DEBUG_LAYOUT ? { background: 'rgba(0,255,0,0.3)', outline: '2px dashed green' } : {}),
          ...(slotConfig.borderWidth && slotConfig.borderWidth > 0 && {
            borderTopWidth: slotConfig.borderWidth,
            borderLeftWidth: slotConfig.borderWidth,
            borderRightWidth: 0,
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

LeftSlot.displayName = 'BiaxialExpand.LeftSlot'
