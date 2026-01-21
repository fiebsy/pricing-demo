/**
 * Biaxial Command Menu V3 - Backdrop Component
 *
 * Visual backdrop layer with support for size and clip-path animation modes.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  EASING_EXPO_OUT,
  getPopupClasses,
  getGradientStyles,
} from '@/components/ui/prod/base/menu/config'
import type { MenuAppearance } from '@/components/ui/prod/base/menu/types'
import type { BackdropAnimationMode } from '../types'

export interface BackdropProps {
  /** Whether the menu is expanded */
  expanded: boolean
  /** Whether the menu is hovered (for collapsed state styling) */
  hovered?: boolean
  /** Animation mode ('size' or 'clip-path') */
  mode: BackdropAnimationMode
  /** Appearance configuration */
  appearance: MenuAppearance
  /** Total panel width */
  panelWidth: number
  /** Total panel height (including offsets) */
  panelHeight: number
  /** Input trigger width */
  inputWidth: number
  /** Input trigger height */
  inputHeight: number
  /** Top offset for backdrop */
  backdropTopOffset: number
  /** Border radius string */
  borderRadius: string
  /** Clip-path value for clip-path mode */
  clipPath: string
  /** Animation duration in ms */
  duration: number
  /** Animation delay in ms */
  delay: number
}

export const Backdrop: React.FC<BackdropProps> = ({
  expanded,
  hovered = false,
  mode,
  appearance,
  panelWidth,
  panelHeight,
  inputWidth,
  inputHeight,
  backdropTopOffset,
  borderRadius,
  clipPath,
  duration,
  delay,
}) => {
  const popupClasses = getPopupClasses(appearance)
  const gradientStyles = getGradientStyles(appearance)

  // Hover state for collapsed backdrop
  const showHoverState = !expanded && hovered

  if (mode === 'clip-path') {
    // Clip-path mode: backdrop is always full size, revealed via clip-path
    return (
      <div
        className={cn(
          'absolute',
          'motion-reduce:transition-none',
          popupClasses,
          showHoverState && 'bg-quaternary'
        )}
        style={{
          ...(showHoverState ? {} : gradientStyles),
          zIndex: 10,
          top: -backdropTopOffset,
          left: '50%',
          marginLeft: -(panelWidth / 2),
          width: panelWidth,
          height: panelHeight + backdropTopOffset,
          borderRadius,
          clipPath,
          transition: `clip-path ${duration}ms ${EASING_EXPO_OUT} ${delay}ms, background 150ms ease`,
          pointerEvents: 'none',
        }}
      />
    )
  }

  // Size mode (original): backdrop animates dimensions
  const backdropWidth = expanded ? panelWidth : inputWidth
  const backdropMarginLeft = -(backdropWidth / 2)

  return (
    <div
      className={cn(
        'absolute',
        'motion-reduce:transition-none',
        popupClasses,
        showHoverState && 'bg-quaternary'
      )}
      style={{
        ...(showHoverState ? {} : gradientStyles),
        zIndex: 10,
        top: expanded ? -backdropTopOffset : 0,
        left: '50%',
        marginLeft: backdropMarginLeft,
        width: backdropWidth,
        height: expanded
          ? panelHeight + backdropTopOffset
          : inputHeight,
        borderRadius,
        transition: `top ${duration}ms ${EASING_EXPO_OUT} ${delay}ms, width ${duration}ms ${EASING_EXPO_OUT} ${delay}ms, height ${duration}ms ${EASING_EXPO_OUT} ${delay}ms, margin-left ${duration}ms ${EASING_EXPO_OUT} ${delay}ms, background 150ms ease`,
        pointerEvents: 'none',
      }}
    />
  )
}

Backdrop.displayName = 'Backdrop'
