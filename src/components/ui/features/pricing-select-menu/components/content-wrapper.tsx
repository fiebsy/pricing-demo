/**
 * Pricing Select Menu - Content Wrapper Component
 *
 * Positions the bottom content area below the trigger.
 * Handles opacity fade animation for menu content.
 */

'use client'

import * as React from 'react'
import { usePricingSelectMenu } from '../context'
import { EASING_MAP } from '../constants'
import type { ContentWrapperProps } from '../types'

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  className,
}) => {
  const { expanded, config, timing } = usePricingSelectMenu()

  const { layout, animation } = config
  const { triggerHeight, bottomGap, panelWidth } = layout
  const easing = EASING_MAP[animation.easing] || EASING_MAP['expo-out']

  // Position below trigger + gap
  const effectiveBottomGap = config.bottomSlot.enabled ? bottomGap : 0
  const topOffset = triggerHeight + effectiveBottomGap

  // Calculate bottom height from config directly (avoids stale dimensions state during flow transitions)
  const effectiveBottomHeight = config.bottomSlot.enabled
    ? (config.bottomSlot.heightMode === 'fixed'
        ? (config.bottomSlot.height ?? layout.maxBottomHeight)
        : layout.maxBottomHeight)
    : 0

  // Fade timing - use 30% of main duration for content fade
  const fadeDuration = timing.duration * 0.3
  const fadeDelay = 0

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: topOffset,
        left: 0,
        width: panelWidth,
        height: effectiveBottomHeight,
        opacity: expanded ? 1 : 0,
        transition: `opacity ${fadeDuration}ms ${easing} ${fadeDelay}ms`,
      }}
    >
      {children}
    </div>
  )
}

ContentWrapper.displayName = 'PricingSelectMenu.ContentWrapper'
