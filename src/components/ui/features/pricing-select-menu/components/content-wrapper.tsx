/**
 * Pricing Select Menu - Content Wrapper Component
 *
 * Positions the bottom content area below the trigger.
 * Handles opacity fade animation for menu content.
 */

'use client'

import * as React from 'react'
import { usePricingSelectMenu } from '../context'
import { EASING_EXPO_OUT } from '../constants'
import type { ContentWrapperProps } from '../types'

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  className,
}) => {
  const { expanded, config, dimensions, timing } = usePricingSelectMenu()

  const { layout, animation } = config
  const { triggerHeight, bottomGap, panelWidth } = layout
  const { contentFadeDuration, contentFadeDelay } = animation

  // Position below trigger + gap
  const effectiveBottomGap = config.bottomSlot.enabled ? bottomGap : 0
  const topOffset = triggerHeight + effectiveBottomGap

  // Fade timing
  const fadeDuration = contentFadeDuration || timing.duration * 0.3
  const fadeDelay = expanded ? contentFadeDelay : 0

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: topOffset,
        left: 0,
        width: panelWidth,
        height: dimensions.bottomHeight,
        opacity: expanded ? 1 : 0,
        transition: `opacity ${fadeDuration}ms ${EASING_EXPO_OUT} ${fadeDelay}ms`,
      }}
    >
      {children}
    </div>
  )
}

ContentWrapper.displayName = 'PricingSelectMenu.ContentWrapper'
