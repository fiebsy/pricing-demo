/**
 * Biaxial Expand V4 - Content Layer Component
 *
 * Wrapper for the trigger and bottom content with clip-path animation.
 * This layer handles the main biaxial reveal animation.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { useBiaxialExpand } from '../context'
import { EASING_EXPO_OUT } from '../constants'

export interface ContentLayerProps {
  /** Child content (TriggerSlot and BottomSlot) */
  children: React.ReactNode
  /** Additional className */
  className?: string
}

export const ContentLayer: React.FC<ContentLayerProps> = ({
  children,
  className,
}) => {
  const {
    expanded,
    config,
    timing,
    dimensions,
  } = useBiaxialExpand()

  const { layout } = config
  const duration = timing.duration

  // Position below the trigger
  const topOffset = layout.triggerHeight + (layout.bottomGap ?? 12)
  const contentHeight = dimensions.bottomHeight

  return (
    <div
      className={cn('motion-reduce:transition-none', className)}
      style={{
        position: 'absolute',
        zIndex: 11,
        top: topOffset,
        left: '50%',
        marginLeft: -(layout.panelWidth / 2),
        width: layout.panelWidth,
        height: expanded ? contentHeight : 0,
        overflow: 'hidden',
        opacity: expanded ? 1 : 0,
        transition: `height ${duration}ms ${EASING_EXPO_OUT}, opacity ${duration * 0.5}ms ${expanded ? 'ease-out' : 'ease-in'}`,
        pointerEvents: expanded ? 'auto' : 'none',
      }}
    >
      {children}
    </div>
  )
}

ContentLayer.displayName = 'BiaxialExpandV4.ContentLayer'
