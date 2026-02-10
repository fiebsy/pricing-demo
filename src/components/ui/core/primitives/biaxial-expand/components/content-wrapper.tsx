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

  // Calculate top slot contribution (when horizontal slots extend ContentLayer upward)
  // Use maxTopHeight as fallback when dimensions.topHeight hasn't been measured yet
  const hasHorizontalSlots = config.leftSlot.enabled || config.rightSlot.enabled
  const topGap = layout.topGap ?? 0
  const topSlotContribution = hasHorizontalSlots && config.topSlot.enabled
    ? (dimensions.topHeight || layout.maxTopHeight || 0) + topGap
    : 0

  // Account for alignment padding from horizontal slots
  const maxAlignmentPadding = Math.max(
    dimensions.leftAlignmentPadding,
    dimensions.rightAlignmentPadding
  )
  const totalTopExtension = topSlotContribution + maxAlignmentPadding

  // Position below trigger + gap (only apply gap when bottom slot is enabled)
  // Account for extended ContentLayer by adding totalTopExtension
  const effectiveBottomGap = config.bottomSlot.enabled ? bottomGap : 0
  const topOffset = totalTopExtension + triggerHeight + effectiveBottomGap

  // Fade timing
  const fadeDuration = contentFadeDuration || timing.duration * 0.3
  const fadeDelay = expanded ? contentFadeDelay : 0

  // Use config.debug for debug visualization
  const showDebug = config.debug

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
        ...(showDebug && {
          outline: '2px dashed orange',
          outlineOffset: '-2px',
        }),
      }}
    >
      {children}
      {/* Debug overlay: shows content wrapper boundaries */}
      {showDebug && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 2,
            background: 'orange',
            pointerEvents: 'none',
            zIndex: 100,
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: 4,
              right: 4,
              fontSize: 10,
              color: 'orange',
              fontFamily: 'monospace',
              whiteSpace: 'nowrap',
              background: 'rgba(0,0,0,0.7)',
              padding: '1px 4px',
            }}
          >
            WRAPPER top={topOffset} h={dimensions.bottomHeight}
          </span>
        </div>
      )}
    </div>
  )
}

ContentWrapper.displayName = 'BiaxialExpand.ContentWrapper'
