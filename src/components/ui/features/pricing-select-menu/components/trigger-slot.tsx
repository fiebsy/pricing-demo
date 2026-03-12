/**
 * Pricing Select Menu - Trigger Slot Component
 *
 * Container for the trigger element.
 * Positioned at top of ContentLayer, animates width.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { usePricingSelectMenu } from '../context'
import { EASING_EXPO_OUT } from '../constants'
import type { TriggerSlotProps } from '../types'

export const TriggerSlot: React.FC<TriggerSlotProps> = ({
  children,
  className,
}) => {
  const { expanded, config, timing } = usePricingSelectMenu()

  const duration = timing.duration
  const { panelWidth, triggerWidth, triggerHeight } = config.layout

  // Width animates from triggerWidth to panelWidth
  const currentWidth = expanded ? panelWidth : triggerWidth

  // Center the trigger within the panel
  const leftOffset = (panelWidth - currentWidth) / 2

  return (
    <div
      className={cn(
        'absolute flex items-center group/trigger',
        'motion-reduce:transition-none',
        className
      )}
      style={{
        zIndex: 14,
        top: 0,
        left: leftOffset,
        width: currentWidth,
        height: triggerHeight,
        pointerEvents: 'auto',
        transition: `left ${duration}ms ${EASING_EXPO_OUT}, width ${duration}ms ${EASING_EXPO_OUT}`,
      }}
    >
      {children}
    </div>
  )
}

TriggerSlot.displayName = 'PricingSelectMenu.Trigger'
