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
import type { TextSegmentConfig } from '../types'

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

  return (
    <span
      className={cn(baseClasses, TEXT_COLOR_CLASSES[config.textColor])}
      style={{ opacity: OPACITY_VALUES[config.opacity] }}
    >
      {text}
    </span>
  )
}

TextSegment.displayName = 'PricingSelectMenu.TextSegment'
