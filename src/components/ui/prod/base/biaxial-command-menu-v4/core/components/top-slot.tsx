/**
 * Biaxial Expand V4 - Top Slot Component
 *
 * Container for content that expands UPWARD from the trigger.
 * Can contain filter buttons, breadcrumbs, tabs, or any custom content.
 */

'use client'

import * as React from 'react'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useBiaxialExpand } from '../context'
import { getBackgroundClass, getBorderColorVar } from '../utils'
import { getTopSectionClipPath, getSlotContainerClipPath } from '../utils'
import { EASING_EXPO_OUT } from '../constants'
import type { SlotProps } from '../types'

export const TopSlot: React.FC<SlotProps> = ({
  children,
  className,
  config: slotConfigOverride,
}) => {
  const {
    expanded,
    config,
    setSlotHeight,
    timing,
    refs,
  } = useBiaxialExpand()

  const contentRef = useRef<HTMLDivElement>(null)
  const slotConfig = { ...config.topSlot, ...slotConfigOverride }

  // Measure content height
  useEffect(() => {
    if (slotConfig.height) {
      setSlotHeight('top', slotConfig.height)
    } else if (contentRef.current) {
      const height = contentRef.current.offsetHeight
      setSlotHeight('top', height)
    }
  }, [slotConfig.height, setSlotHeight, children])

  // If slot is disabled, don't render
  if (!slotConfig.enabled) {
    return null
  }

  const duration = timing.slotDuration('top')
  const delay = timing.slotDelay('top')
  const innerDuration = duration + (config.animation.slotContainerDurationOffset ?? 100)

  // Outer wrapper uses clip-path for reveal from bottom
  const outerClipPath = getTopSectionClipPath(expanded)

  // Inner container uses clip-path for compound "offset" effect
  const innerClipPath = config.animation.animateSlotContainers
    ? getSlotContainerClipPath(expanded, 'bottom') // Bottom origin = expands downward (toward trigger)
    : 'inset(0 0 0 0)'

  const totalHeight = (slotConfig.height ?? 48) + (config.layout.topGap ?? 0)

  return (
    <div
      ref={refs.top}
      className="absolute"
      style={{
        zIndex: 20,
        bottom: '100%',
        left: '50%',
        width: config.layout.panelWidth,
        marginLeft: -(config.layout.panelWidth / 2),
        height: totalHeight,
        clipPath: outerClipPath,
        transition: `clip-path ${duration}ms ${EASING_EXPO_OUT} ${delay}ms`,
      }}
    >
      {/* Inner container with compound animation */}
      <div
        ref={contentRef}
        className={cn(
          'absolute overflow-hidden',
          config.appearance.squircle && 'corner-squircle',
          getBackgroundClass(slotConfig.background ?? 'secondary'),
          className
        )}
        style={{
          top: slotConfig.inset ?? 4,
          left: slotConfig.inset ?? 4,
          right: slotConfig.inset ?? 4,
          bottom: config.layout.topGap ?? 0,
          borderRadius: slotConfig.borderRadius ?? 14,
          clipPath: innerClipPath,
          transition: `clip-path ${innerDuration}ms ${EASING_EXPO_OUT} ${delay}ms`,
          ...(slotConfig.borderWidth && slotConfig.borderWidth > 0 && {
            borderTopWidth: slotConfig.borderWidth,
            borderLeftWidth: slotConfig.borderWidth,
            borderRightWidth: slotConfig.borderWidth,
            borderBottomWidth: 0,
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

TopSlot.displayName = 'BiaxialExpandV4.TopSlot'
