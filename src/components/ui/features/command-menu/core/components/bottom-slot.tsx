/**
 * Biaxial Expand V4 - Bottom Slot Component
 *
 * Container for content that expands DOWNWARD from the trigger.
 * Can contain menu items, cards, forms, or any custom content.
 *
 * Supports optional clip-path animation for "grow from origin" effect.
 */

'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useBiaxialExpand } from '../context'
import { getBackgroundClass, getBorderColorVar } from '../utils'
import { getSlotContainerClipPath } from '../utils'
import { EASING_EXPO_OUT } from '../constants'
import type { SlotProps } from '../types'

export const BottomSlot: React.FC<SlotProps> = ({
  children,
  className,
  config: slotConfigOverride,
}) => {
  const {
    expanded,
    config,
    setSlotHeight,
    timing,
  } = useBiaxialExpand()

  const slotConfig = { ...config.bottomSlot, ...slotConfigOverride }

  // Set height from config (removing children dependency prevents shrinking cascade)
  // The height is capped at maxBottomHeight - actual content scrolling is handled internally
  // IMPORTANT: Set height to 0 when disabled so ContentWrapper collapses properly
  useEffect(() => {
    setSlotHeight('bottom', slotConfig.enabled ? config.layout.maxBottomHeight : 0)
  }, [config.layout.maxBottomHeight, slotConfig.enabled, setSlotHeight])

  // If slot is disabled, don't render
  if (!slotConfig.enabled) {
    return null
  }

  const duration = timing.slotDuration('bottom')
  const delay = timing.slotDelay('bottom')

  // Optional clip-path animation for "grow from origin" effect
  const clipPath = config.animation.animateSlotContainers
    ? getSlotContainerClipPath(expanded, config.animation.expandOrigin)
    : 'inset(0 0 0 0)'

  const inset = slotConfig.inset ?? 4

  return (
    <div
      className={cn(
        'absolute overflow-hidden',
        config.appearance.squircle && 'corner-squircle',
        getBackgroundClass(slotConfig.background ?? 'secondary'),
        className
      )}
      style={{
        top: inset,
        bottom: inset,
        left: inset,
        right: inset,
        borderRadius: slotConfig.borderRadius ?? 14,
        clipPath,
        transition: `clip-path ${duration}ms ${EASING_EXPO_OUT} ${delay}ms`,
        ...(slotConfig.borderWidth && slotConfig.borderWidth > 0 && {
          borderWidth: slotConfig.borderWidth,
          borderStyle: 'solid',
          borderColor: getBorderColorVar(slotConfig.borderColor ?? 'primary'),
        }),
        ...(config.debug && {
          outline: '2px solid red',
          outlineOffset: '-2px',
        }),
      }}
    >
      {children}
    </div>
  )
}

BottomSlot.displayName = 'BiaxialExpandV4.BottomSlot'
