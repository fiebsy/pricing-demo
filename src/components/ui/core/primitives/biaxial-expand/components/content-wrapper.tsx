/**
 * Biaxial Expand - Content Wrapper Component
 *
 * Positions the bottom content area below the trigger.
 * Handles opacity fade animation for menu content.
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
  const { triggerHeight, bottomGap } = layout
  const { contentFadeDuration, contentFadeDelay } = animation

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
        left: 0,
        right: 0,
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
