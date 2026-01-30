/**
 * Biaxial Expand - Backdrop Component
 *
 * Visual backdrop layer with support for size and clip-path animation modes.
 * This is the visual "card" that expands - all styling (background, shadow,
 * shine) lives here.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  getPopupClasses,
  getGradientStyles,
} from '@/components/ui/core/primitives/menu/config'
import { useBiaxialExpand } from '../context'
import { EASING_EXPO_OUT } from '../constants'
import type { BackdropProps } from '../types'

// Debug flag - set to true to visualize backdrop layer
const DEBUG_LAYOUT = false

/**
 * Calculate backdrop clip-path for unified model.
 */
function getBackdropClipPath(
  expanded: boolean,
  panelWidth: number,
  panelHeight: number,
  triggerWidth: number,
  triggerHeight: number,
  borderRadius: number,
  backdropTopOffset: number
): string {
  if (expanded) {
    return `inset(0 0 0 0 round ${borderRadius}px)`
  }

  // Collapsed: show only trigger area, accounting for top offset
  const sideInset = (panelWidth - triggerWidth) / 2
  const topInset = backdropTopOffset
  const bottomInset = panelHeight + backdropTopOffset - triggerHeight

  return `inset(${topInset}px ${sideInset}px ${bottomInset}px ${sideInset}px round ${borderRadius}px)`
}

export const Backdrop: React.FC<BackdropProps> = ({ className }) => {
  const {
    expanded,
    hovered,
    config,
    dimensions,
    timing,
  } = useBiaxialExpand()

  const { appearance, animation, layout, confidenceLevel, collapsedBackground } = config

  // When collapsed, use collapsedBackground if set, or quaternary on hover
  const effectiveAppearance = !expanded
    ? hovered
      ? { ...appearance, background: 'quaternary' as const }
      : collapsedBackground && collapsedBackground !== 'none'
        ? { ...appearance, background: collapsedBackground as 'primary' | 'secondary' | 'tertiary' | 'quaternary' }
        : appearance
    : appearance

  const popupClasses = getPopupClasses(effectiveAppearance)
  const gradientStyles = getGradientStyles(effectiveAppearance, { confidenceLevel })

  const duration = timing.backdropDuration
  const delay = animation.backdropDelay

  // Calculate total height including top section offset
  const topSlotInset = config.topSlot.appearance?.inset ?? config.topSlot.inset ?? 4
  const topGap = layout.topGap ?? 0
  const backdropTopOffset = layout.backdropTopOffset + (
    config.topSlot.enabled ? dimensions.topHeight + topSlotInset + topGap : 0
  )

  // Total panel height (trigger + gap + bottom) - only apply gap when bottom slot is enabled
  const effectiveBottomGap = config.bottomSlot.enabled ? layout.bottomGap : 0
  const panelHeight = layout.triggerHeight + effectiveBottomGap + dimensions.bottomHeight

  if (animation.backdropMode === 'clip-path') {
    // Clip-path mode: backdrop is always full size, revealed via clip-path
    const clipPath = getBackdropClipPath(
      expanded,
      layout.panelWidth,
      panelHeight,
      layout.triggerWidth,
      layout.triggerHeight,
      layout.borderRadius,
      backdropTopOffset
    )

    return (
      <div
        className={cn(
          'absolute motion-reduce:transition-none',
          'transition-colors duration-150',
          popupClasses,
          className
        )}
        style={{
          ...gradientStyles,
          zIndex: 10,
          top: -backdropTopOffset,
          left: '50%',
          marginLeft: -(layout.panelWidth / 2),
          width: layout.panelWidth,
          height: panelHeight + backdropTopOffset,
          borderRadius: layout.borderRadius,
          clipPath,
          boxShadow: expanded ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 12px 24px -8px rgba(0, 0, 0, 0.3)' : 'none',
          transition: `clip-path ${duration}ms ${EASING_EXPO_OUT} ${delay}ms, background-color 150ms ease-out, box-shadow ${duration}ms ${EASING_EXPO_OUT} ${delay}ms`,
          pointerEvents: 'none',
        }}
      />
    )
  }

  // Size mode (default): backdrop animates dimensions
  const backdropWidth = expanded ? layout.panelWidth : layout.triggerWidth
  const backdropMarginLeft = -(backdropWidth / 2)
  const backdropHeight = expanded
    ? panelHeight + backdropTopOffset
    : layout.triggerHeight

  return (
    <div
      className={cn(
        'absolute motion-reduce:transition-none',
        !DEBUG_LAYOUT && popupClasses,
        className
      )}
      style={{
        ...(DEBUG_LAYOUT ? {} : gradientStyles),
        zIndex: 10,
        top: expanded ? -backdropTopOffset : 0,
        left: '50%',
        marginLeft: backdropMarginLeft,
        width: backdropWidth,
        height: backdropHeight,
        borderRadius: layout.borderRadius,
        boxShadow: expanded ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 12px 24px -8px rgba(0, 0, 0, 0.3)' : 'none',
        ...(DEBUG_LAYOUT ? { background: 'rgba(255,165,0,0.4)', outline: '3px dashed orange' } : {}),
        transition: `
          top ${duration}ms ${EASING_EXPO_OUT} ${delay}ms,
          width ${duration}ms ${EASING_EXPO_OUT} ${delay}ms,
          height ${duration}ms ${EASING_EXPO_OUT} ${delay}ms,
          margin-left ${duration}ms ${EASING_EXPO_OUT} ${delay}ms,
          box-shadow ${duration}ms ${EASING_EXPO_OUT} ${delay}ms,
          background-color 150ms ease-out
        `,
        pointerEvents: 'none',
      }}
    />
  )
}

Backdrop.displayName = 'BiaxialExpand.Backdrop'
