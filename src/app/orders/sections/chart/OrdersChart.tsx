/**
 * Orders Chart Component
 *
 * Interactive chart showing active orders over time.
 * Built with Recharts for better tooltip/interaction support.
 */

'use client'

import { useMemo, useId } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { OrderRecord, ChartConfig } from '../../types'
import {
  generateChartData,
  getStackedData,
  type StackedSeries,
} from './data/chart-data'
import { resolveChartColor, getColorWithOpacity } from './config/chart-colors'
import { CustomTooltip } from './components/CustomTooltip'

// =============================================================================
// LEGEND COMPONENT
// =============================================================================

interface ChartLegendProps {
  series: StackedSeries[]
  position: 'top' | 'bottom'
}

function ChartLegend({ series, position }: ChartLegendProps) {
  const positionClasses = position === 'top' ? 'mb-3' : 'mt-3'

  return (
    <div className={`flex items-center justify-center gap-6 ${positionClasses}`}>
      {series.map((s, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="size-3 rounded-sm"
            style={{ backgroundColor: s.color }}
          />
          <span className="text-xs text-tertiary">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

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
// MAIN CHART COMPONENT
// =============================================================================

interface OrdersChartProps {
  data: OrderRecord[]
  config: ChartConfig
}

export function OrdersChart({ data, config }: OrdersChartProps) {
  const gradientId = useId()

  // Generate chart data
  const chartData = useMemo(() => generateChartData(data), [data])
  const stackedSeries = useMemo(
    () => getStackedData(chartData, config.stackMode),
    [chartData, config.stackMode]
  )

  // Resolve primary color
  const primaryColor = resolveChartColor(
    config.colorMode,
    config.primaryColor,
    config.semanticColor
  )

  // Chart margins adapt to axis visibility
  const margins = useMemo(() => getChartMargins(config), [config.showXAxis, config.showYAxis])

  // Show legend only when stacking
  const showLegend = config.showLegend && config.stackMode !== 'none'

  // Common axis props
  const xAxisProps = {
    dataKey: 'label',
    axisLine: { stroke: 'var(--color-border-secondary)' },
    tickLine: false,
    tick: { fontSize: 11, fill: 'var(--color-text-tertiary)' },
    interval: Math.ceil(chartData.length / 6) - 1,
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
      {/* Legend (top) */}
      {showLegend && config.legendPosition === 'top' && (
        <ChartLegend series={stackedSeries} position="top" />
      )}

      {/* Chart */}
      <ResponsiveContainer width="100%" height={config.chartHeight}>
        {config.chartType === 'line' ? (
          <AreaChart data={chartData} margin={margins}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={primaryColor} stopOpacity={0.4} />
                <stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
              </linearGradient>
            </defs>

            {config.showGridLines && <CartesianGrid {...gridProps} />}
            {config.showXAxis && <XAxis {...xAxisProps} />}
            {config.showYAxis && <YAxis {...yAxisProps} />}
            {config.showTooltip && (
              <Tooltip
                content={<CustomTooltip color={primaryColor} />}
                cursor={{ stroke: 'var(--color-border-secondary)', strokeDasharray: '4 4' }}
                isAnimationActive={false}
                position={{ y: 0 }}
              />
            )}

            <Area
              type={config.lineCurved ? 'monotone' : 'linear'}
              dataKey="active"
              stroke={primaryColor}
              strokeWidth={config.lineStrokeWidth}
              fill={config.lineShowFill ? `url(#${gradientId})` : 'transparent'}
              dot={config.lineShowDots ? {
                fill: 'var(--color-bg-primary)',
                stroke: primaryColor,
                strokeWidth: 2,
                r: 4,
              } : false}
              activeDot={config.lineShowDots ? {
                fill: primaryColor,
                stroke: 'var(--color-bg-primary)',
                strokeWidth: 2,
                r: 5,
              } : false}
              isAnimationActive={false}
            />
          </AreaChart>
        ) : (
          <BarChart data={chartData} margin={margins} barGap={config.barGap}>
            {config.showGridLines && <CartesianGrid {...gridProps} />}
            {config.showXAxis && <XAxis {...xAxisProps} />}
            {config.showYAxis && <YAxis {...yAxisProps} />}
            {config.showTooltip && (
              <Tooltip
                content={<CustomTooltip color={primaryColor} />}
                cursor={{ fill: 'var(--color-bg-tertiary)', opacity: 0.3 }}
                isAnimationActive={false}
                position={{ y: 0 }}
              />
            )}

            <Bar
              dataKey="active"
              fill={primaryColor}
              opacity={config.barOpacity / 100}
              radius={[config.barRadius, config.barRadius, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        )}
      </ResponsiveContainer>

      {/* Legend (bottom) */}
      {showLegend && config.legendPosition === 'bottom' && (
        <ChartLegend series={stackedSeries} position="bottom" />
      )}
    </div>
  )
}
