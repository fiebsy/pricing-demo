/**
 * Universal Expand - Content Layer Component
 *
 * UNIFIED container for trigger + bottom content with clip-path animation.
 * This matches the biaxial architecture where trigger and bottom content
 * share a single expanding container.
 *
 * The clip-path reveals:
 * - Collapsed: Only the trigger area (centered)
 * - Expanded: Full panel including bottom content
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useUniversalExpand } from '../context'
import { EASING_EXPO_OUT } from '../constants'
import { getContentClipPath } from '../utils'
import type { ContentLayerProps } from '../types'

export const ContentLayer: React.FC<ContentLayerProps> = ({
  children,
  className,
}) => {
  const {
    expanded,
    config,
    timing,
    dimensions,
  } = useUniversalExpand()

  const { layout, slots } = config
  const duration = timing.duration

  // Total height = trigger + bottomGap + bottomContent (when bottom slot is enabled)
  const bottomSlotInset = slots.bottom.enabled ? slots.bottom.appearance.inset : 0
  const effectiveBottomGap = slots.bottom.enabled ? layout.gaps.bottom : 0
  const panelHeight = layout.triggerHeight +
    effectiveBottomGap +
    (slots.bottom.enabled ? dimensions.bottomHeight + bottomSlotInset : 0)

  // Calculate clip-path
  const clipPath = getContentClipPath(
    expanded,
    dimensions,
    layout,
    layout.borderRadius
  )

  return (
    <div
      className={cn('absolute motion-reduce:transition-none', className)}
      style={{
        zIndex: 11,
        top: 0,
        left: '50%',
        marginLeft: -(layout.panelWidth / 2),
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

ContentLayer.displayName = 'UniversalExpand.ContentLayer'
