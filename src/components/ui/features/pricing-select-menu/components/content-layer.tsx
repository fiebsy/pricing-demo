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
import { EASING_MAP } from '../constants'
import { getContentClipPath } from '../utils'
import type { ContentLayerProps } from '../types'

export const ContentLayer: React.FC<ContentLayerProps> = ({
  children,
  className,
}) => {
  const { expanded, config, timing } = usePricingSelectMenu()

  const { layout, animation } = config
  const duration = timing.duration
  const easing = EASING_MAP[animation.easing] || EASING_MAP['expo-out']

  // Calculate panel height using config values directly for consistency
  // Note: dimensions.bottomHeight can be stale during flow transitions (updated via useEffect)
  // Using layout.maxBottomHeight ensures panelHeight is always in sync with other layout values
  const effectiveBottomHeight = config.bottomSlot.enabled
    ? (config.bottomSlot.heightMode === 'fixed'
        ? (config.bottomSlot.height ?? layout.maxBottomHeight)
        : layout.maxBottomHeight)
    : 0
  const panelHeight = layout.triggerHeight + layout.bottomGap + effectiveBottomHeight

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
        transition: `clip-path ${duration}ms ${easing}, height ${duration}ms ${easing}`,
        pointerEvents: expanded ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  )
}

ContentLayer.displayName = 'PricingSelectMenu.Content'
