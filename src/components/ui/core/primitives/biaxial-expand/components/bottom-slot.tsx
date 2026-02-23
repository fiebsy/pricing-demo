/**
 * Biaxial Expand - Bottom Slot Component
 *
 * Container for content that expands DOWNWARD from the trigger.
 * Can contain menu items, cards, forms, or any custom content.
 *
 * Supports optional clip-path animation for "grow from origin" effect.
 */

'use client'

import * as React from 'react'
import { useEffect, useRef } from 'react'
import { ScrollArea } from '@base-ui/react/scroll-area'
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

  const contentRef = useRef<HTMLDivElement>(null)
  const slotConfig = { ...config.bottomSlot, ...slotConfigOverride }

  // Get heightMode from slot config (defaults to 'dynamic' for backward compatibility)
  const heightMode = slotConfig.heightMode ?? 'dynamic'
  const isAutoHeight = heightMode === 'auto'

  // Scrollable only applies when height is constrained (not auto)
  const shouldScroll = slotConfig.scrollable && !isAutoHeight

  // Determine effective height based on mode:
  // - 'fixed': Use bottomSlot.height, fallback to layout.maxBottomHeight
  // - 'dynamic': Use layout.maxBottomHeight (scrollable with max constraint)
  // - 'auto': Measured by ResizeObserver (undefined here)
  const effectiveHeight = isAutoHeight
    ? undefined
    : heightMode === 'dynamic'
      ? config.layout.maxBottomHeight
      : (slotConfig.height ?? config.layout.maxBottomHeight)

  // For fixed/dynamic: set height from config
  useEffect(() => {
    if (!isAutoHeight && effectiveHeight !== undefined) {
      setSlotHeight('bottom', slotConfig.enabled ? effectiveHeight : 0)
    }
  }, [effectiveHeight, slotConfig.enabled, setSlotHeight, isAutoHeight])

  // For auto mode: measure actual content height with ResizeObserver
  useEffect(() => {
    if (!isAutoHeight || !slotConfig.enabled || !contentRef.current) return

    const measureHeight = () => {
      const height = contentRef.current?.offsetHeight ?? 0
      setSlotHeight('bottom', height)
    }

    measureHeight()

    const observer = new ResizeObserver(measureHeight)
    observer.observe(contentRef.current)

    return () => observer.disconnect()
  }, [isAutoHeight, slotConfig.enabled, setSlotHeight])

  // Debug logging
  if (config.debug) {
    console.log('[BottomSlot] Height Debug:', {
      heightMode,
      slotConfigHeight: slotConfig.height,
      maxBottomHeight: config.layout.maxBottomHeight,
      effectiveHeight,
    })
  }

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

  // Use config.debug for debug visualization
  const showDebug = config.debug

  // For auto height mode, use static positioning so content flows naturally
  // For fixed/dynamic modes, use absolute positioning with insets
  const positioningStyles = isAutoHeight
    ? {
        // Relative positioning - content flows naturally
        // Use margin (not padding) to create the visual inset from parent,
        // matching the appearance of absolute positioning with insets
        position: 'relative' as const,
        margin: inset,
      }
    : {
        // Absolute - stretch to fill parent with insets
        position: 'absolute' as const,
        top: inset,
        bottom: inset,
        left: inset,
        right: inset,
      }

  return (
    <div
      className={cn(
        'overflow-hidden',
        !isAutoHeight && 'absolute',
        config.appearance.squircle && 'corner-squircle',
        !showDebug && getBackgroundClass(slotConfig.background ?? 'secondary'),
        slotConfig.shine && slotConfig.shine !== 'none' && slotConfig.shine,
        className
      )}
      style={{
        ...positioningStyles,
        borderRadius: slotConfig.borderRadius ?? 14,
        clipPath,
        transition: `clip-path ${duration}ms ${EASING_EXPO_OUT} ${delay}ms`,
        ...(slotConfig.borderWidth && slotConfig.borderWidth > 0 && {
          borderWidth: slotConfig.borderWidth,
          borderStyle: 'solid',
          borderColor: getBorderColorVar(slotConfig.borderColor ?? 'primary'),
        }),
        ...(showDebug && {
          background: 'rgba(0,255,0,0.3)',
          outline: '2px dashed green',
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
      {/* Debug overlay: shows slot boundaries and height info */}
      {showDebug && (
        <>
          {/* Top edge marker */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 2,
              background: 'magenta',
              pointerEvents: 'none',
              zIndex: 100,
            }}
          />
          {/* Bottom edge marker */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 2,
              background: 'yellow',
              pointerEvents: 'none',
              zIndex: 100,
            }}
          >
            <span
              style={{
                position: 'absolute',
                bottom: 4,
                left: 4,
                fontSize: 10,
                color: 'yellow',
                fontFamily: 'monospace',
                whiteSpace: 'nowrap',
                background: 'rgba(0,0,0,0.7)',
                padding: '1px 4px',
              }}
            >
              BOTTOM SLOT h={effectiveHeight ?? 'auto'} mode={heightMode}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

BottomSlot.displayName = 'BiaxialExpand.BottomSlot'
