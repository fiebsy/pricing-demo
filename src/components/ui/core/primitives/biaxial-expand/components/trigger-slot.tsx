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

  // Calculate top slot contribution (when horizontal slots extend ContentLayer upward)
  // Use maxTopHeight as fallback when dimensions.topHeight hasn't been measured yet
  const hasHorizontalSlots = config.leftSlot.enabled || config.rightSlot.enabled
  const topGap = config.layout.topGap ?? 0
  const topSlotContribution = hasHorizontalSlots && config.topSlot.enabled
    ? (dimensions.topHeight || config.layout.maxTopHeight || 0) + topGap
    : 0

  // Account for alignment padding from horizontal slots
  // When slots use center/bottom alignment and are taller than trigger,
  // ContentLayer extends upward, so we need to offset the trigger down
  const maxAlignmentPadding = Math.max(
    dimensions.leftAlignmentPadding,
    dimensions.rightAlignmentPadding
  )
  const totalTopExtension = topSlotContribution + maxAlignmentPadding

  // When collapsed, trigger position depends on expandOriginX. When expanded, full width.
  const currentWidth = expanded ? panelWidth : triggerWidth

  // Base offset within the panel area, then add left contribution
  const baseOffset = getTriggerOffset(expandOriginX, panelWidth, triggerWidth, expanded)
  const leftOffset = leftContribution + baseOffset

  // Use config.debug for outline visualization
  const showDebug = config.debug

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
        // Offset down by totalTopExtension when ContentLayer extends upward
        top: totalTopExtension,
        left: leftOffset,
        width: currentWidth,
        height: triggerHeight,
        pointerEvents: 'auto',
        transition: `left ${duration}ms ${EASING_EXPO_OUT}, width ${duration}ms ${EASING_EXPO_OUT}`,
        ...(showDebug && {
          background: 'rgba(0,0,255,0.2)',
          outline: '2px dashed blue',
          outlineOffset: '-2px',
        }),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {/* Debug overlay: shows trigger boundaries */}
      {showDebug && (
        <>
          {/* Top edge marker */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 2,
              background: 'blue',
              pointerEvents: 'none',
              zIndex: 100,
            }}
          >
            <span
              style={{
                position: 'absolute',
                top: 4,
                left: 4,
                fontSize: 10,
                color: 'blue',
                fontFamily: 'monospace',
                whiteSpace: 'nowrap',
                background: 'rgba(255,255,255,0.9)',
                padding: '1px 4px',
              }}
            >
              TRIGGER top={totalTopExtension} h={triggerHeight}
            </span>
          </div>
          {/* Bottom edge marker */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 2,
              background: 'blue',
              pointerEvents: 'none',
              zIndex: 100,
            }}
          />
        </>
      )}
    </div>
  )
}

TriggerSlot.displayName = 'BiaxialExpand.Trigger'
