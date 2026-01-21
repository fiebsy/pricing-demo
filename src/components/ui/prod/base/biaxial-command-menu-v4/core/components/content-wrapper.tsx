/**
 * Biaxial Expand V4 - Content Wrapper Component
 *
 * Positions the bottom content area relative to the trigger.
 * Handles fade animation and content offset.
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
  const { config, dimensions } = useBiaxialExpand()

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: dimensions.bottomHeight,
      }}
    >
      {children}
    </div>
  )
}

ContentWrapper.displayName = 'BiaxialExpandV4.ContentWrapper'
