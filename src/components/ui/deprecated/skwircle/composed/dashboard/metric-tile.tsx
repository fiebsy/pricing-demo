/**
 * Metric Tile Component
 *
 * A composed component for displaying dashboard metrics.
 * Wraps Skwircle.Card with semantic props for metric display.
 *
 * @example Basic usage
 * ```tsx
 * <MetricTile
 *   label="Total Revenue"
 *   value="$45,231"
 *   change="+12.5%"
 *   changeType="positive"
 * />
 * ```
 *
 * @example With period and custom size
 * ```tsx
 * <MetricTile
 *   label="Active Orders"
 *   value="1,284"
 *   change="+8.2%"
 *   changeType="positive"
 *   period="vs last week"
 *   size="lg"
 * />
 * ```
 *
 * @example Override Skwircle props
 * ```tsx
 * <MetricTile
 *   label="Conversion"
 *   value="24.8%"
 *   elevation="sm"
 *   backgroundGradient="depth-10-bottom-right"
 * />
 * ```
 */

'use client'

import * as React from 'react'
import {
  Skwircle,
  type SkwircleCardProps,
  type SkwircleBackgroundGradient,
} from '@/components/ui/deprecated/skwircle'
import {
  METRIC_TILE_DEFAULTS,
  METRIC_TILE_SIZE_CONFIGS,
  CHANGE_TYPE_COLORS,
  type MetricTileSize,
  type ChangeType,
} from './metric-tile-config'

// =============================================================================
// TYPES
// =============================================================================

export interface MetricTileProps extends Omit<SkwircleCardProps, 'children'> {
  /** Metric label (e.g., "Total Revenue") */
  label: string
  /** Metric value (e.g., "$45,231") */
  value: string
  /** Change indicator (e.g., "+12.5%") */
  change?: string
  /** Type of change for color coding */
  changeType?: ChangeType
  /** Period description (e.g., "vs last month") */
  period?: string
  /** Size variant */
  size?: MetricTileSize
  /** Custom label className */
  labelClassName?: string
  /** Custom value className */
  valueClassName?: string
  /** Optional icon to display */
  icon?: React.ReactNode
  /** Additional content below the metric */
  children?: React.ReactNode
}

// =============================================================================
// COMPONENT
// =============================================================================

export const MetricTile: React.FC<MetricTileProps> = ({
  // Semantic props
  label,
  value,
  change,
  changeType = 'neutral',
  period,
  size = 'md',
  labelClassName,
  valueClassName,
  icon,
  children,

  // Skwircle.Card overrides (with dashboard defaults)
  elevation = METRIC_TILE_DEFAULTS.elevation,
  roundness = METRIC_TILE_DEFAULTS.roundness,
  borderWidth = METRIC_TILE_DEFAULTS.borderWidth,
  backgroundGradient = METRIC_TILE_DEFAULTS.backgroundGradient as SkwircleBackgroundGradient,
  fillMode = true,

  // Pass through remaining Skwircle props
  ...skwircleProps
}) => {
  const sizeConfig = METRIC_TILE_SIZE_CONFIGS[size]
  const changeColor = CHANGE_TYPE_COLORS[changeType]

  return (
    <Skwircle.Card
      elevation={elevation}
      roundness={roundness}
      borderWidth={borderWidth}
      backgroundGradient={backgroundGradient}
      fillMode={fillMode}
      {...skwircleProps}
    >
      <div className={sizeConfig.padding}>
        {/* Header row with label and optional icon */}
        <div className="flex items-start justify-between">
          <p className={`${sizeConfig.labelClass} text-tertiary ${labelClassName ?? ''}`}>
            {label}
          </p>
          {icon && (
            <span className="text-tertiary">
              {icon}
            </span>
          )}
        </div>

        {/* Value */}
        <p className={`${sizeConfig.valueGap} ${sizeConfig.valueClass} text-primary ${valueClassName ?? ''}`}>
          {value}
        </p>

        {/* Change indicator */}
        {change && (
          <div className={`${sizeConfig.valueGap} flex items-center ${sizeConfig.changeGap}`}>
            <span className={`${sizeConfig.changeClass} ${changeColor}`}>
              {change}
            </span>
            {period && (
              <span className={`${sizeConfig.periodClass} text-quaternary`}>
                {period}
              </span>
            )}
          </div>
        )}

        {/* Additional content */}
        {children}
      </div>
    </Skwircle.Card>
  )
}

MetricTile.displayName = 'MetricTile'
