/**
 * Horizontal Expand V1 - Trigger Slot Component
 *
 * The always-visible anchor element at the center.
 * This is the element users interact with to expand/collapse.
 */

'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useHorizontalExpand } from '../context'
import { getBackgroundClass } from '../utils'
import type { SlotProps } from '../types'

export const TriggerSlot: React.FC<SlotProps> = ({
  children,
  className,
  config: slotConfigOverride,
}) => {
  const { config, setSlotWidth } = useHorizontalExpand()

  const slotConfig = { ...config.triggerSlot, ...slotConfigOverride }

  // Set width from config
  useEffect(() => {
    setSlotWidth('trigger', config.layout.triggerWidth)
  }, [config.layout.triggerWidth, setSlotWidth])

  const inset = slotConfig.inset ?? 0

  return (
    <div
      className={cn(
        'relative shrink-0',
        getBackgroundClass(slotConfig.background ?? 'none'),
        className
      )}
      style={{
        width: config.layout.triggerWidth,
        height: config.layout.triggerHeight,
        padding: inset,
        ...(config.debug && {
          outline: '2px solid blue',
          outlineOffset: '-2px',
        }),
      }}
    >
      {children}
    </div>
  )
}

TriggerSlot.displayName = 'HorizontalExpandV1.TriggerSlot'
