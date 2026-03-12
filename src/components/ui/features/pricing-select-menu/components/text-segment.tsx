/**
 * Pricing Select Menu - Text Segment Component
 *
 * Renders a styled text segment with support for text and badge display modes.
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  FONT_SIZE_CLASSES,
  FONT_WEIGHT_CLASSES,
  TEXT_COLOR_CLASSES,
  BADGE_COLOR_CLASSES,
  OPACITY_VALUES,
} from '../constants'
import type { TextSegmentConfig, TextColorOption } from '../types'

/** Maps text color options to CSS variable names for shimmer animation */
const TEXT_COLOR_VARS: Record<TextColorOption, string> = {
  primary: 'var(--text-color-primary)',
  secondary: 'var(--text-color-secondary)',
  tertiary: 'var(--text-color-tertiary)',
  brand: 'var(--text-color-brand-primary)',
}

export interface TextSegmentProps {
  text: string
  config: TextSegmentConfig
}

export const TextSegment: React.FC<TextSegmentProps> = ({ text, config }) => {
  if (!config.show || !text) return null

  const baseClasses = cn(
    FONT_SIZE_CLASSES[config.fontSize],
    FONT_WEIGHT_CLASSES[config.fontWeight]
  )

  if (config.displayMode === 'badge') {
    return (
      <span
        className={cn(
          baseClasses,
          BADGE_COLOR_CLASSES[config.badgeColor],
          'px-1.5 py-0.5 rounded'
        )}
        style={{ opacity: OPACITY_VALUES[config.opacity] }}
      >
        {text}
      </span>
    )
  }

  // Build style object - include shimmer base color if shimmer is enabled
  const style: React.CSSProperties = {
    opacity: OPACITY_VALUES[config.opacity],
    ...(config.shimmer && {
      '--shimmer-base-color': TEXT_COLOR_VARS[config.textColor],
    } as React.CSSProperties),
  }

  return (
    <span
      className={cn(
        baseClasses,
        // Only apply text color class when shimmer is disabled (shimmer handles color via gradient)
        !config.shimmer && TEXT_COLOR_CLASSES[config.textColor],
        config.shimmer && 'animate-text-shimmer-subtle'
      )}
      style={style}
    >
      {text}
    </span>
  )
}

TextSegment.displayName = 'PricingSelectMenu.TextSegment'
