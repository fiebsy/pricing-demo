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
import { getHorizontalPosition, getClipPathInsets } from '../utils/positioning'
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
  backdropTopOffset: number,
  leftInset: number,
  rightInset: number
): string {
  if (expanded) {
    return `inset(0 0 0 0 round ${borderRadius}px)`
  }

  // Collapsed: show only trigger area, accounting for top offset and asymmetric insets
  const topInset = backdropTopOffset
  const bottomInset = panelHeight + backdropTopOffset - triggerHeight

  return `inset(${topInset}px ${rightInset}px ${bottomInset}px ${leftInset}px round ${borderRadius}px)`
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

  // Get horizontal positioning based on expandOriginX
  const expandOriginX = layout.expandOriginX ?? 'center'
  const { leftInset, rightInset } = getClipPathInsets(expandOriginX, layout.panelWidth, layout.triggerWidth)

  // Calculate horizontal slot contributions
  // Each slot contributes: width + inset*2 (for padding on both sides) + gap
  const leftSlotInset = config.leftSlot.appearance?.inset ?? config.leftSlot.inset ?? 4
  const rightSlotInset = config.rightSlot.appearance?.inset ?? config.rightSlot.inset ?? 4
  const leftGap = layout.leftGap ?? 0
  const rightGap = layout.rightGap ?? 0

  const backdropLeftOffset = config.leftSlot.enabled
    ? dimensions.leftWidth + (leftSlotInset * 2) + leftGap
    : 0

  const backdropRightExtension = config.rightSlot.enabled
    ? dimensions.rightWidth + (rightSlotInset * 2) + rightGap
    : 0

  // Total backdrop width including horizontal slots
  const totalBackdropWidth = layout.panelWidth + backdropLeftOffset + backdropRightExtension

  if (animation.backdropMode === 'clip-path') {
    // Clip-path mode: backdrop is always full size, revealed via clip-path
    // For horizontal slots, we need to account for their width in the clip-path
    const clipPathLeftInset = expanded ? 0 : leftInset + backdropLeftOffset
    const clipPathRightInset = expanded ? 0 : rightInset + backdropRightExtension

    const clipPath = getBackdropClipPath(
      expanded,
      totalBackdropWidth,
      panelHeight,
      layout.triggerWidth,
      layout.triggerHeight,
      layout.borderRadius,
      backdropTopOffset,
      clipPathLeftInset,
      clipPathRightInset
    )

    // Get horizontal position for the backdrop
    const horizontalPos = getHorizontalPosition(expandOriginX, layout.panelWidth, layout.panelWidth)

    // When horizontal slots are enabled, keep the same base positioning but adjust margin and width
    // This keeps the panel area aligned with content, extending left/right as needed
    const expandedMarginLeft = horizontalPos.marginLeft - backdropLeftOffset
    const expandedWidth = totalBackdropWidth

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
          left: horizontalPos.left,
          right: horizontalPos.right,
          marginLeft: expanded ? expandedMarginLeft : horizontalPos.marginLeft,
          width: expanded ? expandedWidth : layout.panelWidth,
          height: panelHeight + backdropTopOffset,
          borderRadius: layout.borderRadius,
          clipPath,
          boxShadow: expanded ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 12px 24px -8px rgba(0, 0, 0, 0.3)' : 'none',
          transition: `clip-path ${duration}ms ${EASING_EXPO_OUT} ${delay}ms, background-color 150ms ease-out, box-shadow ${duration}ms ${EASING_EXPO_OUT} ${delay}ms, left ${duration}ms ${EASING_EXPO_OUT} ${delay}ms, width ${duration}ms ${EASING_EXPO_OUT} ${delay}ms, margin-left ${duration}ms ${EASING_EXPO_OUT} ${delay}ms`,
          pointerEvents: 'none',
        }}
      />
    )
  }

  // Size mode (default): backdrop animates dimensions
  const backdropWidth = expanded ? totalBackdropWidth : layout.triggerWidth
  const backdropHeight = expanded
    ? panelHeight + backdropTopOffset
    : layout.triggerHeight

  // Get horizontal position for the current width (when collapsed, use trigger width positioning)
  const horizontalPos = getHorizontalPosition(expandOriginX, layout.panelWidth, expanded ? layout.panelWidth : layout.triggerWidth)

  // When expanded, keep same base positioning but shift margin left to accommodate left slot
  // This keeps the panel area aligned with content layer
  const expandedMarginLeft = horizontalPos.marginLeft - backdropLeftOffset

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
        left: horizontalPos.left,
        right: horizontalPos.right,
        marginLeft: expanded ? expandedMarginLeft : horizontalPos.marginLeft,
        width: backdropWidth,
        height: backdropHeight,
        borderRadius: layout.borderRadius,
        boxShadow: expanded ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 12px 24px -8px rgba(0, 0, 0, 0.3)' : 'none',
        ...(DEBUG_LAYOUT ? { background: 'rgba(255,165,0,0.4)', outline: '3px dashed orange' } : {}),
        transition: `
          top ${duration}ms ${EASING_EXPO_OUT} ${delay}ms,
          left ${duration}ms ${EASING_EXPO_OUT} ${delay}ms,
          right ${duration}ms ${EASING_EXPO_OUT} ${delay}ms,
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
