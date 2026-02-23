/**
 * Pricing Select Menu - Content Layer Component
 *
 * Container for trigger + bottom content with clip-path animation.
 * The clip-path reveals:
 * - Collapsed: Only the trigger area
 * - Expanded: Full panel including bottom content
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { usePricingSelectMenu } from '../context'
import { EASING_EXPO_OUT } from '../constants'
import { getContentClipPath } from '../utils'
import type { ContentLayerProps } from '../types'

export const ContentLayer: React.FC<ContentLayerProps> = ({
  children,
  className,
}) => {
  const { expanded, config, timing, dimensions } = usePricingSelectMenu()

  const { layout } = config
  const duration = timing.duration

  // Calculate panel height
  const panelHeight = config.bottomSlot.enabled
    ? layout.triggerHeight + layout.bottomGap + dimensions.bottomHeight
    : layout.triggerHeight

  // Calculate clip-path
  const clipPath = getContentClipPath(
    expanded,
    panelHeight,
    layout.triggerHeight,
    layout.borderRadius
  )

  return (
    <div
      className={cn('absolute motion-reduce:transition-none', className)}
      style={{
        zIndex: 11,
        top: 0,
        left: '50%',
        marginLeft: -layout.panelWidth / 2,
        width: layout.panelWidth,
        height: panelHeight,
        clipPath,
        transition: `clip-path ${duration}ms ${EASING_EXPO_OUT}, height ${duration}ms ${EASING_EXPO_OUT}`,
        pointerEvents: expanded ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  )
}

ContentLayer.displayName = 'PricingSelectMenu.Content'
