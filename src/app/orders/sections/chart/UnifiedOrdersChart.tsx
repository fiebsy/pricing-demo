/**
 * Unified Orders Chart Component
 *
 * Single ComposedChart showing both historical and projected future data.
 * Solves the broken dual-chart approach by merging data into one chart
 * with a unified tooltip across both historical and future portions.
 *
 * Features:
 * - Historical data: solid line with optional fill
 * - Future data: dashed line with reduced opacity
 * - Connected transition at "Today" boundary
 * - Single continuous tooltip
 */

'use client'

import { useMemo, useId } from 'react'
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { ChartConfig } from '../../types'
import type { UnifiedDataPoint } from './data/chart-data'
import { resolveChartColor } from './config/chart-colors'
import { UnifiedTooltip } from './components/UnifiedTooltip'
import { PulsatingDot } from './components/PulsatingDot'

// =============================================================================
// CHART MARGINS
// =============================================================================

function getChartMargins(config: ChartConfig) {
  return {
    top: 16,
    right: 16,
    bottom: config.showXAxis ? 8 : 16,
    left: config.showYAxis ? 8 : 16,
  }
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

interface UnifiedOrdersChartProps {
  data: UnifiedDataPoint[]
  config: ChartConfig
  yDomain?: [number, number]
}

export function UnifiedOrdersChart({ data, config, yDomain }: UnifiedOrdersChartProps) {
  const historicalGradientId = useId()
  const projectedGradientId = useId()

  // Resolve primary color
  const primaryColor = resolveChartColor(
    config.colorMode,
    config.primaryColor,
    config.semanticColor
  )

  // Chart margins adapt to axis visibility
  const margins = useMemo(
    () => getChartMargins(config),
    [config.showXAxis, config.showYAxis]
  )

  // Calculate tick interval for X axis
  const tickInterval = useMemo(
    () => Math.ceil(data.length / 8) - 1,
    [data.length]
  )

  // Common axis props
  const xAxisProps = {
    dataKey: 'label',
    axisLine: { stroke: 'var(--color-border-secondary)' },
    tickLine: false,
    tick: { fontSize: 11, fill: 'var(--color-text-tertiary)' },
    interval: tickInterval,
  }

  const yAxisProps = {
    axisLine: { stroke: 'var(--color-border-secondary)' },
    tickLine: false,
    tick: { fontSize: 11, fill: 'var(--color-text-tertiary)' },
    width: 40,
  }

  const gridProps = {
    strokeDasharray: '4 4',
    stroke: 'var(--color-border-secondary)',
    opacity: 0.5,
    horizontal: true,
    vertical: false,
  }

  return (
    <div className="w-full outline-none focus:outline-none [&_*]:outline-none">
      <ResponsiveContainer width="100%" height={config.chartHeight}>
        <ComposedChart data={data} margin={margins}>
          <defs>
            {/* Historical gradient (more opaque) */}
            <linearGradient id={historicalGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={primaryColor} stopOpacity={0.4} />
              <stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
            </linearGradient>

            {/* Projected gradient (more transparent) */}
            <linearGradient id={projectedGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={primaryColor} stopOpacity={0.15} />
              <stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          {config.showGridLines && <CartesianGrid {...gridProps} />}
          {config.showXAxis && <XAxis {...xAxisProps} />}
          {config.showYAxis && <YAxis {...yAxisProps} domain={yDomain} />}
          {/* Hidden Y-axis to enforce shared domain when axes are hidden */}
          {!config.showYAxis && yDomain && <YAxis domain={yDomain} hide />}

          {config.showTooltip && (
            <Tooltip
              content={<UnifiedTooltip color={primaryColor} />}
              cursor={{ stroke: 'var(--color-border-secondary)', strokeDasharray: '4 4' }}
              isAnimationActive={false}
              position={{ y: 0 }}
            />
          )}

          {/* Historical data - solid line */}
          <Area
            type={config.lineCurved ? 'monotone' : 'linear'}
            dataKey="active"
            stroke={primaryColor}
            strokeWidth={config.lineStrokeWidth}
            fill={config.lineShowFill ? `url(#${historicalGradientId})` : 'transparent'}
            dot={(props) => {
              const { cx, cy, payload, key } = props as { cx?: number; cy?: number; payload?: UnifiedDataPoint; key?: string }
              if (cx === undefined || cy === undefined) return null

              // Check if this is the "Today" point (last historical with both values)
              const isToday = payload && !payload.isFuture &&
                              payload.active !== null && payload.projected !== null

              // Render pulsating dot at "Today" point
              if (isToday && config.showFutureProjection) {
                return (
                  <PulsatingDot
                    key={key}
                    cx={cx}
                    cy={cy}
                    payload={payload}
                    color={primaryColor}
                    showPulse={config.showCurrentDotPulse}
                  />
                )
              }

              // Regular dots for other historical points (when enabled)
              if (config.lineShowDots) {
                return (
                  <circle
                    key={key}
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill="var(--color-bg-primary)"
                    stroke={primaryColor}
                    strokeWidth={2}
                  />
                )
              }

              return null
            }}
            activeDot={config.lineShowDots ? {
              fill: primaryColor,
              stroke: 'var(--color-bg-primary)',
              strokeWidth: 2,
              r: 5,
            } : false}
            connectNulls={false}
            isAnimationActive={false}
          />

          {/* Projected data - dashed line */}
          <Area
            type={config.lineCurved ? 'monotone' : 'linear'}
            dataKey="projected"
            stroke={primaryColor}
            strokeWidth={config.lineStrokeWidth}
            strokeDasharray="4 4"
            strokeOpacity={0.5}
            fill={config.lineShowFill ? `url(#${projectedGradientId})` : 'transparent'}
            dot={false}
            activeDot={{
              fill: primaryColor,
              stroke: 'var(--color-bg-primary)',
              strokeWidth: 2,
              r: 5,
              opacity: 0.7,
            }}
            connectNulls={false}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
