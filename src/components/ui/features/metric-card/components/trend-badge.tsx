'use client'

/**
 * TrendBadge Component
 *
 * Displays a trend indicator with optional directional icon and percentage.
 *
 * @module metric-card/components/trend-badge
 */

import * as React from 'react'
import ArrowUp01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon'
import ArrowDown01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'

import {
  FONT_SIZE_CLASSES,
  FONT_WEIGHT_CLASSES,
  TEXT_COLOR_CLASSES,
  TREND_COLORS,
} from '../config'
import type { TrendIndicator, TrendStyle } from '../types'

// =============================================================================
// TYPES
// =============================================================================

export interface TrendBadgeProps {
  trend: TrendIndicator
  style: TrendStyle
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

export const TrendBadge: React.FC<TrendBadgeProps> = ({ trend, style, className }) => {
  // Use directional colors (success/error) or custom color
  const colorClass = style.useDirectionalColors
    ? TREND_COLORS[trend.direction]
    : TEXT_COLOR_CLASSES[style.color]

  const fontSizeClass = FONT_SIZE_CLASSES[style.fontSize]
  const fontWeightClass = FONT_WEIGHT_CLASSES[style.fontWeight]

  return (
    <span className={cn('inline-flex items-center gap-0.5', colorClass, fontSizeClass, fontWeightClass, className)}>
      {trend.showIcon !== false && trend.direction === 'up' && (
        <HugeIcon icon={ArrowUp01Icon} size={style.iconSize} />
      )}
      {trend.showIcon !== false && trend.direction === 'down' && (
        <HugeIcon icon={ArrowDown01Icon} size={style.iconSize} />
      )}
      <span>{trend.value}%</span>
    </span>
  )
}

TrendBadge.displayName = 'TrendBadge'
