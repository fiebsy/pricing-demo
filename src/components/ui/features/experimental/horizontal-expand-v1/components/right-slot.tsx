/**
 * Horizontal Expand V1 - Right Slot Component
 *
 * Container for content that expands RIGHTWARD from the trigger.
 * Clip-path reveals from the left edge, expanding toward the right.
 */

'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useHorizontalExpand } from '../context'
import { getBackgroundClass, getBorderColorVar, getSlotContainerClipPath } from '../utils'
import { EASING_EXPO_OUT } from '../constants'
import type { SlotProps } from '../types'

export const RightSlot: React.FC<SlotProps> = ({
  children,
  className,
  config: slotConfigOverride,
}) => {
  const { expanded, config, setSlotWidth, timing } = useHorizontalExpand()

  const slotConfig = { ...config.rightSlot, ...slotConfigOverride }

  // Set width from config
  // IMPORTANT: Set width to 0 when disabled so container collapses properly
  useEffect(() => {
    setSlotWidth('right', slotConfig.enabled ? (slotConfig.width ?? config.layout.maxRightWidth) : 0)
  }, [slotConfig.enabled, slotConfig.width, config.layout.maxRightWidth, setSlotWidth])

  // If slot is disabled, don't render
  if (!slotConfig.enabled) {
    return null
  }

  const duration = timing.slotDuration('right')
  const delay = timing.slotDelay('right')

  // Clip-path animation: right slot expands from left edge (rightward)
  // The origin is 'left' because content reveals FROM the left edge going right
  const clipPath = config.animation.animateSlotContainers
    ? getSlotContainerClipPath(expanded, config.animation.rightExpandOrigin)
    : 'inset(0 0 0 0)'

  const inset = slotConfig.inset ?? 4
  const width = slotConfig.width ?? config.layout.maxRightWidth

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden',
        className
      )}
      style={{
        width,
        height: config.layout.triggerHeight,
        ...(config.debug && {
          outline: '2px dashed purple',
          outlineOffset: '-2px',
        }),
      }}
    >
      {/* Inner content with clip-path animation */}
      <div
        className={cn(
          'absolute overflow-hidden',
          config.appearance.squircle && 'corner-squircle',
          getBackgroundClass(slotConfig.background ?? 'secondary')
        )}
        style={{
          top: inset,
          bottom: inset,
          left: inset,
          right: inset,
          borderRadius: slotConfig.borderRadius ?? 12,
          clipPath,
          transition: `clip-path ${duration}ms ${EASING_EXPO_OUT} ${delay}ms`,
          ...(slotConfig.borderWidth && slotConfig.borderWidth > 0 && {
            borderWidth: slotConfig.borderWidth,
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

RightSlot.displayName = 'HorizontalExpandV1.RightSlot'
