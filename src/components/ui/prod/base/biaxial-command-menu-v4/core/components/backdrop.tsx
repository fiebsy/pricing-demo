/**
 * Biaxial Expand V4 - Backdrop Component
 *
 * Visual backdrop layer with support for size and clip-path animation modes.
 * Automatically positions and sizes based on slot dimensions from context.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  getPopupClasses,
  getGradientStyles,
} from '@/components/ui/prod/base/menu/config'
import { useBiaxialExpand } from '../context'
import { EASING_EXPO_OUT } from '../constants'
import type { BackdropProps } from '../types'

export const Backdrop: React.FC<BackdropProps> = ({ className }) => {
  const {
    expanded,
    config,
    dimensions,
    timing,
    totalExpandedHeight,
    clipPaths,
  } = useBiaxialExpand()

  const { appearance, animation, layout } = config
  const popupClasses = getPopupClasses(appearance)
  const gradientStyles = getGradientStyles(appearance)

  const duration = timing.backdropDuration
  const delay = animation.backdropDelay

  // Calculate total height including top section offset
  const backdropTopOffset = layout.backdropTopOffset + (
    config.topSlot.enabled ? dimensions.topHeight + (layout.topGap ?? 0) : 0
  )

  if (animation.backdropMode === 'clip-path') {
    // Clip-path mode: backdrop is always full size, revealed via clip-path
    return (
      <div
        className={cn(
          'absolute motion-reduce:transition-none',
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
          height: totalExpandedHeight + backdropTopOffset,
          borderRadius: layout.borderRadius,
          clipPath: clipPaths.backdrop,
          transition: `clip-path ${duration}ms ${EASING_EXPO_OUT} ${delay}ms`,
          pointerEvents: 'none',
        }}
      />
    )
  }

  // Size mode (default): backdrop animates dimensions
  const backdropWidth = expanded ? layout.panelWidth : layout.triggerWidth
  const backdropMarginLeft = -(backdropWidth / 2)

  return (
    <div
      className={cn(
        'absolute motion-reduce:transition-none',
        popupClasses,
        className
      )}
      style={{
        ...gradientStyles,
        zIndex: 10,
        top: expanded ? -backdropTopOffset : 0,
        left: '50%',
        marginLeft: backdropMarginLeft,
        width: backdropWidth,
        height: expanded
          ? totalExpandedHeight + backdropTopOffset
          : layout.triggerHeight,
        borderRadius: layout.borderRadius,
        transition: `
          top ${duration}ms ${EASING_EXPO_OUT} ${delay}ms,
          width ${duration}ms ${EASING_EXPO_OUT} ${delay}ms,
          height ${duration}ms ${EASING_EXPO_OUT} ${delay}ms,
          margin-left ${duration}ms ${EASING_EXPO_OUT} ${delay}ms
        `,
        pointerEvents: 'none',
      }}
    />
  )
}

Backdrop.displayName = 'BiaxialExpandV4.Backdrop'
