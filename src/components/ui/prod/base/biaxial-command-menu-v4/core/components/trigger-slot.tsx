/**
 * Biaxial Expand V4 - Trigger Slot Component
 *
 * Container for the trigger element (search input, button, etc.).
 * This is the "anchor" that stays visible in both collapsed and expanded states.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useBiaxialExpand } from '../context'
import { EASING_EXPO_OUT } from '../constants'
import type { SlotProps } from '../types'

export const TriggerSlot: React.FC<SlotProps> = ({
  children,
  className,
  config: slotConfigOverride,
}) => {
  const {
    expanded,
    config,
    timing,
    refs,
  } = useBiaxialExpand()

  const slotConfig = { ...config.triggerSlot, ...slotConfigOverride }
  const duration = timing.duration

  const {
    panelWidth,
    triggerWidth,
    triggerHeight,
  } = config.layout

  return (
    <div
      ref={refs.trigger}
      className={cn(
        'absolute flex items-center group/trigger',
        'motion-reduce:transition-none',
        className
      )}
      style={{
        zIndex: 12,
        top: 0,
        left: '50%',
        marginLeft: expanded ? -(panelWidth / 2) : -(triggerWidth / 2),
        width: expanded ? panelWidth : triggerWidth,
        height: triggerHeight,
        pointerEvents: 'auto',
        transition: `margin-left ${duration}ms ${EASING_EXPO_OUT}, width ${duration}ms ${EASING_EXPO_OUT}`,
      }}
    >
      {children}
    </div>
  )
}

TriggerSlot.displayName = 'BiaxialExpandV4.TriggerSlot'
