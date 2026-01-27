/**
 * Biaxial Expand - Top Slot Component
 *
 * Container for content that expands UPWARD from the trigger.
 * Can contain filter buttons, breadcrumbs, tabs, scrollable menus, or any custom content.
 *
 * Supports two height modes:
 * - Fixed: Use `topSlot.height` for simple content (filters, tabs)
 * - Dynamic: Use `layout.maxTopHeight` for scrollable content (menus, lists)
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

// Debug flag - set to true to visualize spacing layers
const DEBUG_LAYOUT = false

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

  // Get heightMode from slot config (defaults to 'fixed')
  const heightMode = slotConfig.heightMode ?? 'fixed'
  const isAutoHeight = heightMode === 'auto'

  // Determine height mode
  const useMaxHeight = config.layout.maxTopHeight !== undefined && !isAutoHeight
  const effectiveHeight = isAutoHeight
    ? undefined
    : useMaxHeight
      ? config.layout.maxTopHeight!
      : (slotConfig.height ?? 48)

  // Set height for dimension tracking
  useEffect(() => {
    if (!isAutoHeight && effectiveHeight !== undefined) {
      setSlotHeight('top', slotConfig.enabled ? effectiveHeight : 0)
    }
  }, [effectiveHeight, slotConfig.enabled, setSlotHeight, isAutoHeight])

  // For auto mode: measure actual content height and report to backdrop
  useEffect(() => {
    if (!isAutoHeight || !slotConfig.enabled || !contentRef.current) return

    const measureHeight = () => {
      const height = contentRef.current?.offsetHeight ?? 0
      setSlotHeight('top', height)
    }

    measureHeight()

    const observer = new ResizeObserver(measureHeight)
    observer.observe(contentRef.current)

    return () => observer.disconnect()
  }, [isAutoHeight, slotConfig.enabled, setSlotHeight])

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
  const innerOrigin = config.animation.topExpandOrigin ?? 'bottom'
  const innerClipPath = config.animation.animateSlotContainers
    ? getSlotContainerClipPath(expanded, innerOrigin)
    : 'inset(0 0 0 0)'

  // Inset from container edges
  const inset = slotConfig.appearance?.inset ?? slotConfig.inset ?? 4

  // Total height: slot height + inset (only for non-auto modes)
  const totalHeight = isAutoHeight ? undefined : (effectiveHeight! + inset)

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
        marginBottom: config.layout.topGap ?? 0,
        ...(totalHeight !== undefined && { height: totalHeight }),
        clipPath: outerClipPath,
        transition: `clip-path ${duration}ms ${EASING_EXPO_OUT} ${delay}ms`,
        ...(isAutoHeight && { paddingTop: inset, paddingLeft: inset, paddingRight: inset }),
        ...(DEBUG_LAYOUT ? { background: 'rgba(255,0,0,0.3)', outline: '2px dashed red' } : {}),
      }}
    >
      {/* Inner container with compound animation */}
      <div
        ref={contentRef}
        className={cn(
          !isAutoHeight && 'absolute',
          'overflow-hidden',
          config.appearance.squircle && 'corner-squircle',
          !DEBUG_LAYOUT && getBackgroundClass(slotConfig.background ?? 'secondary'),
          slotConfig.shine && slotConfig.shine !== 'none' && slotConfig.shine,
          className
        )}
        style={{
          ...(!isAutoHeight && {
            top: inset,
            left: inset,
            right: inset,
            bottom: inset,
          }),
          ...(isAutoHeight && { height: 'fit-content' }),
          borderRadius: slotConfig.borderRadius ?? 14,
          clipPath: innerClipPath,
          transition: `clip-path ${innerDuration}ms ${EASING_EXPO_OUT} ${delay}ms`,
          ...(DEBUG_LAYOUT ? { background: 'rgba(0,255,0,0.3)', outline: '2px dashed green' } : {}),
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

TopSlot.displayName = 'BiaxialExpand.TopSlot'
