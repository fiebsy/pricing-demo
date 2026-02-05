/**
 * Horizontal Expand V1 - Left Slot Component
 *
 * Container for content that expands LEFTWARD from the trigger.
 * Clip-path reveals from the right edge, expanding toward the left.
 */

'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useHorizontalExpand } from '../context'
import { getBackgroundClass, getBorderColorVar, getSlotContainerClipPath } from '../utils'
import { EASING_EXPO_OUT } from '../constants'
import type { SlotProps } from '../types'

export const LeftSlot: React.FC<SlotProps> = ({
  children,
  className,
  config: slotConfigOverride,
}) => {
  const { expanded, config, setSlotWidth, timing } = useHorizontalExpand()

  const slotConfig = { ...config.leftSlot, ...slotConfigOverride }

  // Set width from config
  // IMPORTANT: Set width to 0 when disabled so container collapses properly
  useEffect(() => {
    setSlotWidth('left', slotConfig.enabled ? (slotConfig.width ?? config.layout.maxLeftWidth) : 0)
  }, [slotConfig.enabled, slotConfig.width, config.layout.maxLeftWidth, setSlotWidth])

  // If slot is disabled, don't render
  if (!slotConfig.enabled) {
    return null
  }

  const duration = timing.slotDuration('left')
  const delay = timing.slotDelay('left')

  // Clip-path animation: left slot expands from right edge (leftward)
  // The origin is 'right' because content reveals FROM the right edge going left
  const clipPath = config.animation.animateSlotContainers
    ? getSlotContainerClipPath(expanded, config.animation.leftExpandOrigin)
    : 'inset(0 0 0 0)'

  const inset = slotConfig.inset ?? 4
  const width = slotConfig.width ?? config.layout.maxLeftWidth

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
          outline: '2px dashed green',
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

LeftSlot.displayName = 'HorizontalExpandV1.LeftSlot'
