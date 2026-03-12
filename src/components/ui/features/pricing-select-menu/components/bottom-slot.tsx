/**
 * Pricing Select Menu - Bottom Slot Component
 *
 * Container for content that expands downward from the trigger.
 * Supports scrollable content with dynamic height mode.
 */

'use client'

import * as React from 'react'
import { useEffect, useRef } from 'react'
import { ScrollArea } from '@base-ui/react/scroll-area'
import { cn } from '@/lib/utils'
import { usePricingSelectMenu } from '../context'
import { EASING_MAP } from '../constants'
import { getBackgroundClass, getBorderColorVar, getSlotContainerClipPath } from '../utils'
import type { BottomSlotProps } from '../types'

export const BottomSlot: React.FC<BottomSlotProps> = ({
  children,
  className,
}) => {
  const { expanded, config, timing } = usePricingSelectMenu()

  const contentRef = useRef<HTMLDivElement>(null)
  const slotConfig = config.bottomSlot

  // Get heightMode from slot config
  const heightMode = slotConfig.heightMode ?? 'dynamic'
  const isAutoHeight = heightMode === 'auto'

  // Scrollable only applies when height is constrained
  const shouldScroll = slotConfig.scrollable && !isAutoHeight

  // Determine effective height based on mode
  const effectiveHeight = isAutoHeight
    ? undefined
    : heightMode === 'dynamic'
      ? config.layout.maxBottomHeight
      : (slotConfig.height ?? config.layout.maxBottomHeight)

  // If slot is disabled, don't render
  if (!slotConfig.enabled) {
    return null
  }

  const duration = timing.slotDuration()
  const delay = timing.slotDelay()
  const easing = EASING_MAP[config.animation.easing] || EASING_MAP['expo-out']

  // Optional clip-path animation for "grow from origin" effect
  const clipPath = config.animation.animateSlotContainers
    ? getSlotContainerClipPath(expanded, config.animation.expandOrigin)
    : 'inset(0 0 0 0)'

  const inset = slotConfig.inset ?? 4

  return (
    <div
      className={cn(
        'absolute overflow-hidden',
        getBackgroundClass(slotConfig.background ?? 'secondary'),
        slotConfig.shine && slotConfig.shine !== 'none' && slotConfig.shine,
        className
      )}
      style={{
        top: inset,
        bottom: inset,
        left: inset,
        right: inset,
        borderRadius: slotConfig.borderRadius ?? 14,
        clipPath,
        transition: `clip-path ${duration}ms ${easing} ${delay}ms`,
        ...(slotConfig.borderWidth && slotConfig.borderWidth > 0 && {
          borderWidth: slotConfig.borderWidth,
          borderStyle: 'solid',
          borderColor: getBorderColorVar(slotConfig.borderColor ?? 'primary'),
        }),
      }}
    >
      {shouldScroll ? (
        <ScrollArea.Root className="h-full w-full">
          <ScrollArea.Viewport className="h-full w-full">
            <ScrollArea.Content>
              <div ref={contentRef}>{children}</div>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            orientation="vertical"
            className="absolute top-1 right-1 bottom-1 flex w-1.5 touch-none select-none p-0.5 opacity-0 transition-opacity duration-150 data-[hovering]:opacity-100 data-[scrolling]:opacity-100"
          >
            <ScrollArea.Thumb className="bg-fg-quaternary hover:bg-fg-quaternary_hover relative flex-1 rounded-full" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      ) : (
        <div ref={contentRef}>{children}</div>
      )}
    </div>
  )
}

BottomSlot.displayName = 'PricingSelectMenu.BottomSlot'
