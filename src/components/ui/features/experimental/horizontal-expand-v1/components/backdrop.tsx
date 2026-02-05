/**
 * Horizontal Expand V1 - Backdrop Component
 *
 * Visual backdrop layer that animates width to encompass all slots.
 * This is the visual "card" that expands - background and shadow live here.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useHorizontalExpand } from '../context'
import { getBackgroundClass } from '../utils'
import { EASING_EXPO_OUT } from '../constants'
import type { BackdropProps } from '../types'

// Debug flag - set to true to visualize backdrop layer
const DEBUG_LAYOUT = false

export const Backdrop: React.FC<BackdropProps> = ({ className }) => {
  const { expanded, hovered, config, dimensions, timing } = useHorizontalExpand()

  const { appearance, animation, layout, collapsedBackground } = config

  // Calculate widths
  const leftWidth = config.leftSlot.enabled ? dimensions.leftWidth : 0
  const rightWidth = config.rightSlot.enabled ? dimensions.rightWidth : 0
  const leftGap = config.leftSlot.enabled ? layout.leftGap : 0
  const rightGap = config.rightSlot.enabled ? layout.rightGap : 0

  // Total expanded width
  const expandedWidth = leftWidth + leftGap + dimensions.triggerWidth + rightGap + rightWidth

  // Collapsed width is just the trigger
  const collapsedWidth = dimensions.triggerWidth

  // Current backdrop dimensions
  const backdropWidth = expanded ? expandedWidth : collapsedWidth
  const backdropHeight = layout.triggerHeight

  // Calculate left offset to center backdrop on trigger when collapsed
  // When expanded, left offset is 0. When collapsed, offset by leftWidth + leftGap
  const leftOffset = expanded ? 0 : leftWidth + leftGap

  const duration = timing.duration

  // Background class based on state
  const getEffectiveBackground = () => {
    if (!expanded) {
      if (hovered) return 'quaternary'
      if (collapsedBackground && collapsedBackground !== 'none') return collapsedBackground
    }
    return appearance.background
  }

  // Shadow based on state
  const getShadow = () => {
    if (!expanded) return 'none'
    switch (appearance.shadow) {
      case 'sm':
        return '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      case 'md':
        return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
      case 'lg':
        return '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
      case 'xl':
        return '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
      case '2xl':
        return '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 12px 24px -8px rgba(0, 0, 0, 0.3)'
      default:
        return 'none'
    }
  }

  return (
    <div
      className={cn(
        'absolute motion-reduce:transition-none',
        'transition-colors duration-150',
        !DEBUG_LAYOUT && getBackgroundClass(getEffectiveBackground()),
        !DEBUG_LAYOUT && appearance.squircle && 'corner-squircle',
        className
      )}
      style={{
        zIndex: 0,
        top: 0,
        left: leftOffset,
        width: backdropWidth,
        height: backdropHeight,
        borderRadius: appearance.borderRadius,
        boxShadow: getShadow(),
        // DEBUG: Orange = backdrop (should cover entire expanded area)
        ...(DEBUG_LAYOUT ? { background: 'rgba(255,165,0,0.4)', outline: '3px dashed orange' } : {}),
        transition: `
          left ${duration}ms ${EASING_EXPO_OUT},
          width ${duration}ms ${EASING_EXPO_OUT},
          box-shadow ${duration}ms ${EASING_EXPO_OUT},
          background-color 150ms ease-out
        `,
        pointerEvents: 'none',
      }}
    />
  )
}

Backdrop.displayName = 'HorizontalExpandV1.Backdrop'
