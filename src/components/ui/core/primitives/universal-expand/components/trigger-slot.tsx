/**
 * Universal Expand - Trigger Slot Component
 *
 * Container for the trigger element (search input, button, etc.).
 * Positioned at center, animates width when expanded.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useUniversalExpand } from '../context'
import { EASING_EXPO_OUT } from '../constants'
import type { TriggerSlotProps } from '../types'

export const TriggerSlot: React.FC<TriggerSlotProps> = ({
  children,
  className,
}) => {
  const {
    expanded,
    setHovered,
    config,
    timing,
    refs,
  } = useUniversalExpand()

  const duration = timing.duration

  const {
    panelWidth,
    triggerWidth,
    triggerHeight,
  } = config.layout

  // When collapsed, trigger is centered. When expanded, full width.
  const currentWidth = expanded ? panelWidth : triggerWidth
  const leftOffset = expanded ? 0 : (panelWidth - triggerWidth) / 2

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

TriggerSlot.displayName = 'UniversalExpand.Trigger'
