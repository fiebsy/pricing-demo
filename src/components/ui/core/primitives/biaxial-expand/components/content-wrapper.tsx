/**
 * Biaxial Expand - Content Wrapper Component
 *
 * Positions the bottom content area below the trigger.
 * Handles opacity fade animation for menu content.
 *
 * When horizontal slots are inside ContentLayer, the wrapper is positioned
 * within the panel area (accounting for left/right slot contributions).
 */

'use client'

import * as React from 'react'
import { useBiaxialExpand } from '../context'
import { EASING_EXPO_OUT } from '../constants'

export interface ContentWrapperProps {
  /** Child content (BottomSlot) */
  children: React.ReactNode
  /** Additional className */
  className?: string
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  className,
}) => {
  const { expanded, config, dimensions, timing } = useBiaxialExpand()

  const { layout, animation } = config
  const { triggerHeight, bottomGap, panelWidth } = layout
  const { contentFadeDuration, contentFadeDelay } = animation

  // Calculate left slot contribution to offset content wrapper
  const leftInset = config.leftSlot.appearance?.inset ?? config.leftSlot.inset ?? 4
  const leftGap = layout.leftGap ?? 0
  const leftContribution = config.leftSlot.enabled
    ? dimensions.leftWidth + (leftInset * 2) + leftGap
    : 0

  // Position below trigger + gap (only apply gap when bottom slot is enabled)
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
        left: leftContribution,
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

ContentWrapper.displayName = 'BiaxialExpand.ContentWrapper'
