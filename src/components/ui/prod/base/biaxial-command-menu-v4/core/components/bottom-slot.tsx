/**
 * Biaxial Expand V4 - Bottom Slot Component
 *
 * Container for content that expands DOWNWARD from the trigger.
 * Can contain menu items, cards, forms, or any custom content.
 */

'use client'

import * as React from 'react'
import { useEffect, useRef } from 'react'
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
    dimensions,
  } = useBiaxialExpand()

  const contentRef = useRef<HTMLDivElement>(null)
  const slotConfig = { ...config.bottomSlot, ...slotConfigOverride }

  // Measure content height
  useEffect(() => {
    if (contentRef.current) {
      const height = Math.min(
        contentRef.current.scrollHeight,
        config.layout.maxBottomHeight
      )
      setSlotHeight('bottom', height)
    }
  }, [config.layout.maxBottomHeight, setSlotHeight, children])

  // If slot is disabled, don't render
  if (!slotConfig.enabled) {
    return null
  }

  const duration = timing.slotDuration('bottom')
  const delay = timing.slotDelay('bottom')

  const clipPath = config.animation.animateSlotContainers
    ? getSlotContainerClipPath(expanded, config.animation.expandOrigin)
    : 'inset(0 0 0 0)'

  const inset = slotConfig.inset ?? 4

  return (
    <div
      ref={contentRef}
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
