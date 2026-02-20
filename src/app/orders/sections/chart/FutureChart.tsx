/**
 * Future Chart Component
 *
 * Background chart showing projected future data.
 * Displays dashed lines with reduced opacity to indicate uncertainty.
 */

'use client'

import { useId } from 'react'
import {
  AreaChart,
  Area,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import type { ChartConfig } from '../../types'
import type { FutureDataPoint } from './data/chart-data'
import { resolveChartColor } from './config/chart-colors'

interface FutureChartProps {
  data: FutureDataPoint[]
  yDomain: [number, number]
  config: ChartConfig
}

export function FutureChart({ data, yDomain, config }: FutureChartProps) {
  const gradientId = useId()

  // Resolve color from config
  const primaryColor = resolveChartColor(
    config.colorMode,
    config.primaryColor,
    config.semanticColor
  )

  // Margins to match the main chart
  const margins = {
    top: 16,
    right: 16,
    bottom: config.showXAxis ? 8 : 16,
    left: config.showYAxis ? 8 : 16,
  }

  return (
    <ResponsiveContainer width="100%" height={config.chartHeight}>
      <AreaChart data={data} margin={margins}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={primaryColor} stopOpacity={0.15} />
            <stop offset="100%" stopColor={primaryColor} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Hidden Y-axis to enforce shared domain */}
        <YAxis domain={yDomain} hide />

        <Area
          type={config.lineCurved ? 'monotone' : 'linear'}
          dataKey="projected"
          stroke={primaryColor}
          strokeWidth={config.lineStrokeWidth}
          strokeDasharray="4 4"
          strokeOpacity={0.5}
          fill={config.lineShowFill ? `url(#${gradientId})` : 'transparent'}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
