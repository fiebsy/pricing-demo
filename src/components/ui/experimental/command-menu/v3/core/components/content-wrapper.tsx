/**
 * Biaxial Command Menu V3 - Content Wrapper Component
 *
 * Wrapper for menu content area with opacity transitions.
 */

'use client'

import * as React from 'react'
import { EASING_EXPO_OUT } from '@/components/ui/prod/base/menu/config'

export interface ContentWrapperProps {
  /** Whether the menu is expanded */
  expanded: boolean
  /** Input height */
  inputHeight: number
  /** Input top padding when expanded */
  inputTopPaddingExpanded: number
  /** Content top offset */
  contentTopOffset: number
  /** Content bottom offset */
  contentBottomOffset: number
  /** Content fade duration */
  contentFadeDuration: number
  /** Content fade delay */
  contentFadeDelay: number
  /** Main animation duration */
  duration: number
  /** Child content */
  children: React.ReactNode
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  expanded,
  inputHeight,
  inputTopPaddingExpanded,
  contentTopOffset,
  contentBottomOffset,
  contentFadeDuration,
  contentFadeDelay,
  duration,
  children,
}) => {
  return (
    <div
      className="absolute left-0 right-0"
      style={{
        top: inputHeight + inputTopPaddingExpanded + contentTopOffset,
        bottom: contentBottomOffset,
        opacity: expanded ? 1 : 0,
        transition: expanded
          ? `opacity ${contentFadeDuration}ms ${EASING_EXPO_OUT} ${contentFadeDelay}ms, top ${duration}ms ${EASING_EXPO_OUT}`
          : 'opacity 0ms',
      }}
    >
      {children}
    </div>
  )
}

ContentWrapper.displayName = 'ContentWrapper'
