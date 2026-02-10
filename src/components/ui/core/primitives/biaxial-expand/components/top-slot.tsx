/**
 * Biaxial Expand - Top Slot Component
 *
 * Container for content that expands UPWARD from the trigger.
 * Can contain filter buttons, breadcrumbs, tabs, scrollable menus, or any custom content.
 *
 * Now positioned INSIDE ContentLayer, so it is clipped by the parent's
 * unified clip-path instead of needing its own outer clip-path.
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
import { getSlotContainerClipPath } from '../utils'
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
    dimensions,
    setSlotHeight,
    timing,
    refs,
  } = useBiaxialExpand()

  const contentRef = useRef<HTMLDivElement>(null)
  const slotConfig = { ...config.topSlot, ...slotConfigOverride }

  // Get heightMode from slot config (defaults to 'fixed')
  const heightMode = slotConfig.heightMode ?? 'fixed'
  const isAutoHeight = heightMode === 'auto'
  const isDynamicHeight = heightMode === 'dynamic'

  // Determine effective height based on mode:
  // - 'fixed': Use slotConfig.height, fallback to 48
  // - 'dynamic': Use layout.maxTopHeight (scrollable with max constraint)
  //              If maxTopHeight is 0 or undefined, fallback to slotConfig.height or 200
  // - 'auto': Measured by ResizeObserver (undefined here)
  const effectiveHeight = isAutoHeight
    ? undefined
    : isDynamicHeight
      ? (config.layout.maxTopHeight || slotConfig.height || 200)
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

  // Inner container uses clip-path for compound "offset" effect
  // No outer clip-path needed - ContentLayer handles clipping
  const innerOrigin = config.animation.topExpandOrigin ?? 'bottom'
  const innerClipPath = config.animation.animateSlotContainers
    ? getSlotContainerClipPath(expanded, innerOrigin)
    : 'inset(0 0 0 0)'

  // Inset from container edges
  const inset = slotConfig.appearance?.inset ?? slotConfig.inset ?? 4

  // Total height: slot height + inset (only for non-auto modes)
  const totalHeight = isAutoHeight ? undefined : (effectiveHeight! + inset)

  // Use config.debug instead of static flag
  const showDebug = config.debug

  // Calculate left slot contribution to know where the panel starts
  const leftInset = config.leftSlot.appearance?.inset ?? config.leftSlot.inset ?? 4
  const leftGap = config.layout.leftGap ?? 0
  const leftContribution = config.leftSlot.enabled
    ? dimensions.leftWidth + (leftInset * 2) + leftGap
    : 0

  // Calculate right slot contribution
  const rightInset = config.rightSlot.appearance?.inset ?? config.rightSlot.inset ?? 4
  const rightGap = config.layout.rightGap ?? 0
  const rightContribution = config.rightSlot.enabled
    ? dimensions.rightWidth + (rightInset * 2) + rightGap
    : 0

  // Calculate alignment padding (same as ContentLayer uses)
  const maxAlignmentPadding = Math.max(
    dimensions.leftAlignmentPadding,
    dimensions.rightAlignmentPadding
  )

  // Debug logging
  if (config.debug) {
    console.log('[TopSlot] Position Debug:', {
      heightMode,
      effectiveHeight,
      totalHeight,
      leftContribution,
      rightContribution,
      maxAlignmentPadding,
      topGap: config.layout.topGap ?? 0,
    })
  }

  return (
    <div
      ref={refs.top}
      className="absolute"
      style={{
        zIndex: 12, // Above backdrop (11), below slots (13) and trigger (14)
        // Position at top of ContentLayer, accounting for alignment padding
        top: maxAlignmentPadding,
        // Left position accounts for left slot contribution
        left: leftContribution,
        // Right position accounts for right slot contribution
        right: rightContribution,
        width: config.layout.panelWidth,
        ...(totalHeight !== undefined && { height: totalHeight }),
        // No outer clipPath - ContentLayer clips this
        ...(isAutoHeight && { paddingTop: inset, paddingLeft: inset, paddingRight: inset }),
        ...(showDebug && { background: 'rgba(255,0,0,0.3)', outline: '2px dashed red' }),
      }}
    >
      {/* Inner container with compound animation */}
      <div
        ref={contentRef}
        className={cn(
          !isAutoHeight && 'absolute',
          'overflow-hidden',
          config.appearance.squircle && 'corner-squircle',
          !showDebug && getBackgroundClass(slotConfig.background ?? 'secondary'),
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
          ...(showDebug && { background: 'rgba(0,255,0,0.3)', outline: '2px dashed green' }),
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
                top: 4,
                left: 4,
                fontSize: 10,
                color: 'yellow',
                fontFamily: 'monospace',
                whiteSpace: 'nowrap',
                background: 'rgba(0,0,0,0.7)',
                padding: '1px 4px',
              }}
            >
              TOP SLOT h={effectiveHeight ?? 'auto'} mode={heightMode}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

TopSlot.displayName = 'BiaxialExpand.TopSlot'
