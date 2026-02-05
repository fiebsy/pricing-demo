/**
 * Biaxial Expand - Trigger Slot Component
 *
 * Container for the trigger element (search input, button, etc.).
 * Lives INSIDE the ContentLayer - positioned at top, animates width.
 *
 * When horizontal slots are present, the trigger's position is offset
 * by the left slot contribution so it remains visually anchored.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useBiaxialExpand } from '../context'
import { EASING_EXPO_OUT } from '../constants'
import { getTriggerOffset } from '../utils/positioning'
import type { SlotProps } from '../types'

export const TriggerSlot: React.FC<SlotProps> = ({
  children,
  className,
  config: slotConfigOverride,
}) => {
  const {
    expanded,
    setHovered,
    config,
    timing,
    dimensions,
    refs,
  } = useBiaxialExpand()

  const duration = timing.duration

  const {
    panelWidth,
    triggerWidth,
    triggerHeight,
    expandOriginX = 'center',
  } = config.layout

  // Calculate left slot contribution to offset trigger position
  const leftInset = config.leftSlot.appearance?.inset ?? config.leftSlot.inset ?? 4
  const leftGap = config.layout.leftGap ?? 0
  const leftContribution = config.leftSlot.enabled
    ? dimensions.leftWidth + (leftInset * 2) + leftGap
    : 0

  // When collapsed, trigger position depends on expandOriginX. When expanded, full width.
  const currentWidth = expanded ? panelWidth : triggerWidth

  // Base offset within the panel area, then add left contribution
  const baseOffset = getTriggerOffset(expandOriginX, panelWidth, triggerWidth, expanded)
  const leftOffset = leftContribution + baseOffset

  return (
    <div
      ref={refs.trigger}
      className={cn(
        'absolute flex items-center group/trigger',
        'motion-reduce:transition-none',
        className
      )}
      style={{
        zIndex: 14, // Above horizontal slots (13)
        top: 0,
        left: leftOffset,
        width: currentWidth,
        height: triggerHeight,
        pointerEvents: 'auto',
        transition: `left ${duration}ms ${EASING_EXPO_OUT}, width ${duration}ms ${EASING_EXPO_OUT}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  )
}

TriggerSlot.displayName = 'BiaxialExpand.Trigger'
