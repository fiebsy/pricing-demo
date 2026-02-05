/**
 * Universal Expand - Backdrop Component
 *
 * Visual backdrop layer with support for 4-directional expansion.
 * Supports size and clip-path animation modes.
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
import { useUniversalExpand } from '../context'
import { EASING_EXPO_OUT } from '../constants'
import { getBackdropClipPath } from '../utils'
import type { BackdropProps } from '../types'

// Debug flag - set to true to visualize backdrop layer
const DEBUG_LAYOUT = false

export const Backdrop: React.FC<BackdropProps> = ({ className }) => {
  const {
    expanded,
    hovered,
    config,
    dimensions,
    timing,
    totalExpandedWidth,
    totalExpandedHeight,
  } = useUniversalExpand()

  const { appearance, animation, layout, slots, confidenceLevel, collapsedBackground } = config

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

  // Calculate offsets for top and left slots
  const topSlotInset = slots.top.appearance.inset
  const leftSlotInset = slots.left.appearance.inset

  const topOffset = slots.top.enabled
    ? dimensions.topHeight + topSlotInset + layout.gaps.top
    : 0

  const leftOffset = slots.left.enabled
    ? dimensions.leftWidth + leftSlotInset + layout.gaps.left
    : 0

  // Calculate total dimensions including all enabled slots
  const hasHorizontalSlots = slots.left.enabled || slots.right.enabled

  // Panel height (trigger + vertical slots)
  const effectiveBottomGap = slots.bottom.enabled ? layout.gaps.bottom : 0
  const bottomSlotInset = slots.bottom.enabled ? slots.bottom.appearance.inset : 0
  const panelHeight =
    topOffset +
    layout.triggerHeight +
    effectiveBottomGap +
    (slots.bottom.enabled ? dimensions.bottomHeight + bottomSlotInset : 0)

  // Panel width (trigger + horizontal slots)
  const rightSlotInset = slots.right.enabled ? slots.right.appearance.inset : 0
  const panelWidth = hasHorizontalSlots
    ? leftOffset +
      layout.triggerWidth +
      (slots.right.enabled ? layout.gaps.right + dimensions.rightWidth + rightSlotInset : 0)
    : layout.panelWidth

  if (animation.backdropMode === 'clip-path') {
    // Clip-path mode: backdrop is always full size, revealed via clip-path
    const clipPath = getBackdropClipPath(expanded, dimensions, layout, slots)

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
          top: -topOffset,
          left: hasHorizontalSlots ? -leftOffset : '50%',
          marginLeft: hasHorizontalSlots ? 0 : -(layout.panelWidth / 2),
          width: panelWidth,
          height: panelHeight,
          borderRadius: layout.borderRadius,
          clipPath,
          boxShadow: expanded
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 12px 24px -8px rgba(0, 0, 0, 0.3)'
            : 'none',
          transition: `clip-path ${duration}ms ${EASING_EXPO_OUT} ${delay}ms, background-color 150ms ease-out, box-shadow ${duration}ms ${EASING_EXPO_OUT} ${delay}ms`,
          pointerEvents: 'none',
        }}
      />
    )
  }

  // Size mode (default): backdrop animates dimensions
  const backdropWidth = expanded
    ? panelWidth
    : layout.triggerWidth

  const backdropHeight = expanded
    ? panelHeight
    : layout.triggerHeight

  const backdropMarginLeft = expanded
    ? (hasHorizontalSlots ? 0 : -(layout.panelWidth / 2))
    : -(layout.triggerWidth / 2)

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
        top: expanded ? -topOffset : 0,
        left: expanded && hasHorizontalSlots ? -leftOffset : '50%',
        marginLeft: backdropMarginLeft,
        width: backdropWidth,
        height: backdropHeight,
        borderRadius: layout.borderRadius,
        boxShadow: expanded
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 12px 24px -8px rgba(0, 0, 0, 0.3)'
          : 'none',
        ...(DEBUG_LAYOUT ? { background: 'rgba(255,165,0,0.4)', outline: '3px dashed orange' } : {}),
        transition: `
          top ${duration}ms ${EASING_EXPO_OUT} ${delay}ms,
          left ${duration}ms ${EASING_EXPO_OUT} ${delay}ms,
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

Backdrop.displayName = 'UniversalExpand.Backdrop'
