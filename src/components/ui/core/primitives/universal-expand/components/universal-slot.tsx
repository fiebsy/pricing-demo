/**
 * Universal Expand - Universal Slot Component
 *
 * Position-agnostic slot that works for all 4 directions.
 * Uses the slot position to determine:
 * - Whether to track height (vertical) or width (horizontal)
 * - CSS positioning relative to trigger
 * - Clip-path animation direction
 */

'use client'

import * as React from 'react'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useUniversalExpand } from '../context'
import {
  getBackgroundClass,
  getBorderColorVar,
  getSlotClipPath,
  getSectionClipPath,
} from '../utils'
import { EASING_EXPO_OUT } from '../constants'
import {
  isVerticalSlot,
  isHorizontalSlot,
  type ExtendedSlotPosition,
  type UnifiedSlotConfig,
  type UniversalSlotProps,
} from '../types'

// Debug flag - set to true to visualize spacing layers
const DEBUG_LAYOUT = false

export const UniversalSlot: React.FC<UniversalSlotProps> = ({
  position,
  children,
  className,
  config: slotConfigOverride,
}) => {
  const {
    expanded,
    config,
    setSlotDimension,
    timing,
    refs,
    dimensions,
  } = useUniversalExpand()

  const contentRef = useRef<HTMLDivElement>(null)

  // Merge slot config with overrides
  const slotConfig: UnifiedSlotConfig = {
    ...config.slots[position],
    ...slotConfigOverride,
  }

  // Determine if we're measuring height or width
  const isVertical = isVerticalSlot(position)
  const isHorizontal = isHorizontalSlot(position)

  // Get dimension mode
  const dimensionMode = slotConfig.dimensionMode ?? 'fixed'
  const isAutoDimension = dimensionMode === 'auto'

  // Determine effective dimension (height for vertical, width for horizontal)
  const effectiveDimension = isAutoDimension
    ? undefined
    : dimensionMode === 'dynamic'
      ? slotConfig.maxDimension
      : slotConfig.fixedDimension ?? 48

  // Set dimension for tracking (non-auto modes)
  useEffect(() => {
    if (!isAutoDimension && effectiveDimension !== undefined) {
      setSlotDimension(position, slotConfig.enabled ? effectiveDimension : 0)
    }
  }, [effectiveDimension, slotConfig.enabled, setSlotDimension, position, isAutoDimension])

  // For auto mode: measure actual content dimension and report
  useEffect(() => {
    if (!isAutoDimension || !slotConfig.enabled || !contentRef.current) return

    const measureDimension = () => {
      if (!contentRef.current) return
      const dimension = isVertical
        ? contentRef.current.offsetHeight
        : contentRef.current.offsetWidth
      setSlotDimension(position, dimension)
    }

    measureDimension()

    const observer = new ResizeObserver(measureDimension)
    observer.observe(contentRef.current)

    return () => observer.disconnect()
  }, [isAutoDimension, slotConfig.enabled, setSlotDimension, position, isVertical])

  // If slot is disabled, don't render
  if (!slotConfig.enabled) {
    return null
  }

  // Get the appropriate ref for this position
  const getSlotRef = () => {
    switch (position) {
      case 'top': return refs.top
      case 'bottom': return refs.bottom
      case 'left': return refs.left
      case 'right': return refs.right
    }
  }

  const duration = timing.slotDuration(position)
  const delay = timing.slotDelay(position)
  const innerDuration = duration + (config.animation.slotContainerDurationOffset ?? 100)

  // Get clip-paths
  const outerClipPath = getSectionClipPath(expanded, position)
  const innerClipPath = config.animation.animateSlotContainers
    ? getSlotClipPath(expanded, position, slotConfig.animation.expandOrigin)
    : 'inset(0 0 0 0)'

  // Inset from container edges
  const inset = slotConfig.appearance.inset

  // Get current dimension value from dimensions state
  const getDimensionValue = (): number => {
    switch (position) {
      case 'top': return dimensions.topHeight
      case 'bottom': return dimensions.bottomHeight
      case 'left': return dimensions.leftWidth
      case 'right': return dimensions.rightWidth
    }
  }

  const currentDimension = getDimensionValue()

  // Calculate positioning styles based on slot position
  const getPositionStyles = (): React.CSSProperties => {
    const { layout } = config
    const { triggerWidth, triggerHeight, panelWidth, gaps } = layout

    const baseStyles: React.CSSProperties = {
      position: 'absolute',
      zIndex: 20,
      clipPath: outerClipPath,
      transition: `clip-path ${duration}ms ${EASING_EXPO_OUT} ${delay}ms`,
    }

    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          bottom: '100%',
          left: '50%',
          width: panelWidth,
          marginLeft: -(panelWidth / 2),
          marginBottom: gaps.top,
          ...(isAutoDimension
            ? { paddingTop: inset, paddingLeft: inset, paddingRight: inset }
            : { height: currentDimension + inset }),
        }

      case 'bottom':
        return {
          ...baseStyles,
          top: triggerHeight + gaps.bottom,
          left: '50%',
          width: panelWidth,
          marginLeft: -(panelWidth / 2),
          ...(isAutoDimension
            ? { paddingBottom: inset, paddingLeft: inset, paddingRight: inset }
            : { height: currentDimension + inset }),
        }

      case 'left':
        return {
          ...baseStyles,
          right: '100%',
          top: '50%',
          height: triggerHeight,
          marginTop: -(triggerHeight / 2),
          marginRight: gaps.left,
          ...(isAutoDimension
            ? { paddingLeft: inset, paddingTop: inset, paddingBottom: inset }
            : { width: currentDimension + inset }),
        }

      case 'right':
        return {
          ...baseStyles,
          left: '100%',
          top: '50%',
          height: triggerHeight,
          marginTop: -(triggerHeight / 2),
          marginLeft: gaps.right,
          ...(isAutoDimension
            ? { paddingRight: inset, paddingTop: inset, paddingBottom: inset }
            : { width: currentDimension + inset }),
        }
    }
  }

  // Get inner container positioning (inset on all sides except edge closest to trigger)
  const getInnerPositionStyles = (): React.CSSProperties => {
    if (isAutoDimension) {
      return { height: 'fit-content', width: isHorizontal ? 'fit-content' : undefined }
    }

    const base: React.CSSProperties = {
      position: 'absolute',
    }

    switch (position) {
      case 'top':
        return { ...base, top: inset, left: inset, right: inset, bottom: 0 }
      case 'bottom':
        return { ...base, top: 0, left: inset, right: inset, bottom: inset }
      case 'left':
        return { ...base, top: inset, left: inset, right: 0, bottom: inset }
      case 'right':
        return { ...base, top: inset, left: 0, right: inset, bottom: inset }
    }
  }

  // Get border styles - no border on edge closest to trigger
  const getBorderStyles = (): React.CSSProperties => {
    if (!slotConfig.appearance.borderWidth || slotConfig.appearance.borderWidth === 0) {
      return {}
    }

    const borderColor = getBorderColorVar(slotConfig.appearance.borderColor)
    const borderWidth = slotConfig.appearance.borderWidth

    switch (position) {
      case 'top':
        return {
          borderTopWidth: borderWidth,
          borderLeftWidth: borderWidth,
          borderRightWidth: borderWidth,
          borderBottomWidth: 0,
          borderStyle: 'solid',
          borderColor,
        }
      case 'bottom':
        return {
          borderTopWidth: 0,
          borderLeftWidth: borderWidth,
          borderRightWidth: borderWidth,
          borderBottomWidth: borderWidth,
          borderStyle: 'solid',
          borderColor,
        }
      case 'left':
        return {
          borderTopWidth: borderWidth,
          borderLeftWidth: borderWidth,
          borderRightWidth: 0,
          borderBottomWidth: borderWidth,
          borderStyle: 'solid',
          borderColor,
        }
      case 'right':
        return {
          borderTopWidth: borderWidth,
          borderLeftWidth: 0,
          borderRightWidth: borderWidth,
          borderBottomWidth: borderWidth,
          borderStyle: 'solid',
          borderColor,
        }
    }
  }

  return (
    <div
      ref={getSlotRef()}
      style={{
        ...getPositionStyles(),
        ...(DEBUG_LAYOUT ? { background: 'rgba(255,0,0,0.3)', outline: '2px dashed red' } : {}),
      }}
    >
      {/* Inner container with compound animation */}
      <div
        ref={contentRef}
        className={cn(
          !isAutoDimension && 'absolute',
          'overflow-hidden',
          config.appearance.squircle && 'corner-squircle',
          !DEBUG_LAYOUT && getBackgroundClass(slotConfig.appearance.background),
          slotConfig.appearance.shine !== 'none' && slotConfig.appearance.shine,
          className
        )}
        style={{
          ...getInnerPositionStyles(),
          borderRadius: slotConfig.appearance.borderRadius,
          clipPath: innerClipPath,
          transition: `clip-path ${innerDuration}ms ${EASING_EXPO_OUT} ${delay}ms`,
          ...getBorderStyles(),
          ...(DEBUG_LAYOUT ? { background: 'rgba(0,255,0,0.3)', outline: '2px dashed green' } : {}),
        }}
      >
        {children}
      </div>
    </div>
  )
}

UniversalSlot.displayName = 'UniversalExpand.Slot'
