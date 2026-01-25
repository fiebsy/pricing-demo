/**
 * Biaxial Command Menu V3 - Content Layer Component
 *
 * Wrapper for all content with clip-path animation.
 */

'use client'

import * as React from 'react'
import { EASING_EXPO_OUT } from '@/components/ui/prod/base/menu/config'

export interface ContentLayerProps {
  /** Whether the menu is expanded */
  expanded: boolean
  /** Panel width */
  panelWidth: number
  /** Panel height */
  panelHeight: number
  /** Animation duration in ms */
  duration: number
  /** Clip-path value */
  clipPath: string
  /** Item radius CSS variable value */
  itemRadius: number
  /** Child content */
  children: React.ReactNode
}

export const ContentLayer: React.FC<ContentLayerProps> = ({
  expanded,
  panelWidth,
  panelHeight,
  duration,
  clipPath,
  itemRadius,
  children,
}) => {
  return (
    <div
      className="absolute motion-reduce:transition-none"
      style={{
        zIndex: 11,
        top: 0,
        left: '50%',
        marginLeft: -(panelWidth / 2),
        width: panelWidth,
        height: panelHeight,
        clipPath,
        transition: `clip-path ${duration}ms ${EASING_EXPO_OUT}, height ${duration}ms ${EASING_EXPO_OUT}`,
        pointerEvents: expanded ? 'auto' : 'none',
        '--menu-item-radius': `${itemRadius}px`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

ContentLayer.displayName = 'ContentLayer'
