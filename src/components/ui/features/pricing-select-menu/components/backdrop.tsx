/**
 * Pricing Select Menu - Backdrop Component
 *
 * Visual backdrop layer with size-based animation.
 * This is the visual "card" that expands - all styling lives here.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { usePricingSelectMenu } from '../context'
import { EASING_EXPO_OUT } from '../constants'
import { getPopupClasses, getGradientStyles } from '../utils'
import type { BackdropProps } from '../types'

export const Backdrop: React.FC<BackdropProps> = ({ className }) => {
  const { expanded, config, dimensions, timing } = usePricingSelectMenu()

  const { appearance, layout } = config
  const popupClasses = getPopupClasses(appearance)
  const gradientStyles = getGradientStyles(appearance)

  const duration = timing.backdropDuration

  // Calculate panel height
  const panelHeight = config.bottomSlot.enabled
    ? layout.triggerHeight + layout.bottomGap + dimensions.bottomHeight
    : layout.triggerHeight

  // Size mode: backdrop animates dimensions
  const backdropWidth = expanded ? layout.panelWidth : layout.triggerWidth
  const backdropHeight = expanded ? panelHeight : layout.triggerHeight

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
        top: 0,
        left: '50%',
        marginLeft: -backdropWidth / 2,
        width: backdropWidth,
        height: backdropHeight,
        borderRadius: layout.borderRadius,
        transition: `
          width ${duration}ms ${EASING_EXPO_OUT},
          height ${duration}ms ${EASING_EXPO_OUT},
          margin-left ${duration}ms ${EASING_EXPO_OUT},
          background-color 150ms ease-out
        `,
        pointerEvents: 'none',
      }}
    />
  )
}

Backdrop.displayName = 'PricingSelectMenu.Backdrop'
