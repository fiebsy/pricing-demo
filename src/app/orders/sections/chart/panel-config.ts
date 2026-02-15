/**
 * Orders Chart - Panel Configuration
 *
 * Control panel section for chart settings.
 * Includes conditional color dropdowns based on colorMode.
 */

import type { Section, Control } from '@/components/ui/patterns/control-panel'
import type {
  OrdersPageConfig,
  ChartType,
  StackMode,
  ChartColorMode,
  ChartColorId,
  SemanticColorId,
  ChartWidthMode,
  ChartAlignment,
} from '../../types'

// =============================================================================
// OPTIONS
// =============================================================================

const CHART_TYPE_OPTIONS: { label: string; value: ChartType }[] = [
  { label: 'Line', value: 'line' },
  { label: 'Bar', value: 'bar' },
]

const STACK_MODE_OPTIONS: { label: string; value: StackMode }[] = [
  { label: 'None', value: 'none' },
  { label: 'Status', value: 'status' },
  { label: 'Plan', value: 'plan' },
  { label: 'Route', value: 'route' },
]

const COLOR_MODE_OPTIONS: { label: string; value: ChartColorMode }[] = [
  { label: 'Neutral', value: 'neutral' },
  { label: 'Semantic', value: 'semantic' },
  { label: 'Chart', value: 'chart' },
]

const CHART_COLOR_OPTIONS: { label: string; value: ChartColorId }[] = [
  { label: 'Chart 1', value: '1' },
  { label: 'Chart 2', value: '2' },
  { label: 'Chart 3', value: '3' },
  { label: 'Chart 4', value: '4' },
]

const SEMANTIC_COLOR_OPTIONS: { label: string; value: SemanticColorId }[] = [
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
  { label: 'Info', value: 'info' },
]

const LEGEND_POSITION_OPTIONS: { label: string; value: 'top' | 'bottom' }[] = [
  { label: 'Top', value: 'top' },
  { label: 'Bottom', value: 'bottom' },
]

const CHART_WIDTH_MODE_OPTIONS: { label: string; value: ChartWidthMode }[] = [
  { label: 'Container', value: 'container' },
  { label: 'Full Width', value: 'viewport' },
  { label: 'Custom', value: 'custom' },
  { label: 'Left → Center', value: 'left-to-center' },
  { label: 'Left → Container', value: 'left-to-container' },
]

const CHART_ALIGNMENT_OPTIONS: { label: string; value: ChartAlignment }[] = [
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
]

// =============================================================================
// SECTION CREATOR
// =============================================================================

export function createChartSection(config: OrdersPageConfig): Section {
  const chartConfig = config.chart
  const isLineChart = chartConfig.chartType === 'line'

  // Build conditional color controls based on colorMode
  const colorControls: Control[] = [
    {
      id: 'chart.colorMode',
      type: 'select' as const,
      label: 'Color Mode',
      value: chartConfig.colorMode,
      options: COLOR_MODE_OPTIONS,
    },
  ]

  // Add semantic color dropdown when colorMode is 'semantic'
  if (chartConfig.colorMode === 'semantic') {
    colorControls.push({
      id: 'chart.semanticColor',
      type: 'select' as const,
      label: 'Semantic Color',
      value: chartConfig.semanticColor,
      options: SEMANTIC_COLOR_OPTIONS,
    })
  }

  // Add chart color dropdown when colorMode is 'chart'
  if (chartConfig.colorMode === 'chart') {
    colorControls.push({
      id: 'chart.primaryColor',
      type: 'select' as const,
      label: 'Chart Color',
      value: chartConfig.primaryColor,
      options: CHART_COLOR_OPTIONS,
    })
  }

  // Note: When colorMode is 'neutral', no additional dropdown is shown

  return {
    id: 'chart',
    title: 'Chart',
    tabLabel: 'Chart',
    groups: [
      // Display
      {
        title: 'Display',
        controls: [
          {
            id: 'chart.showChart',
            type: 'toggle' as const,
            label: 'Show Chart',
            value: chartConfig.showChart,
          },
          {
            id: 'chart.showTooltip',
            type: 'toggle' as const,
            label: 'Show Tooltip',
            value: chartConfig.showTooltip,
          },
        ],
      },
      // Type & Stacking
      {
        title: 'Type',
        controls: [
          {
            id: 'chart.chartType',
            type: 'select' as const,
            label: 'Chart Type',
            value: chartConfig.chartType,
            options: CHART_TYPE_OPTIONS,
          },
          {
            id: 'chart.stackMode',
            type: 'select' as const,
            label: 'Stack By',
            value: chartConfig.stackMode,
            options: STACK_MODE_OPTIONS,
          },
        ],
      },
      // Dimensions
      {
        title: 'Dimensions',
        controls: [
          {
            id: 'chart.chartWidthMode',
            type: 'select' as const,
            label: 'Width',
            value: chartConfig.chartWidthMode,
            options: CHART_WIDTH_MODE_OPTIONS,
          },
          ...(chartConfig.chartWidthMode === 'custom' ? [
            {
              id: 'chart.chartCustomWidth',
              type: 'slider' as const,
              label: 'Custom Width',
              value: chartConfig.chartCustomWidth,
              min: 600,
              max: 1600,
              step: 50,
              formatLabel: (v: number) => `${v}px`,
            },
            {
              id: 'chart.chartAlignment',
              type: 'select' as const,
              label: 'Alignment',
              value: chartConfig.chartAlignment,
              options: CHART_ALIGNMENT_OPTIONS,
            },
          ] : []),
          {
            id: 'chart.chartHeight',
            type: 'slider' as const,
            label: 'Height',
            value: chartConfig.chartHeight,
            min: 120,
            max: 320,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'chart.chartToTableGap',
            type: 'slider' as const,
            label: 'Chart → Table Gap',
            value: chartConfig.chartToTableGap,
            min: 0,
            max: 48,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      // Line Options (conditional)
      ...(isLineChart ? [{
        title: 'Line Options',
        controls: [
          {
            id: 'chart.lineStrokeWidth',
            type: 'slider' as const,
            label: 'Stroke Width',
            value: chartConfig.lineStrokeWidth,
            min: 1,
            max: 4,
            step: 0.5,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'chart.lineShowFill',
            type: 'toggle' as const,
            label: 'Show Fill',
            value: chartConfig.lineShowFill,
          },
          {
            id: 'chart.lineShowDots',
            type: 'toggle' as const,
            label: 'Show Dots',
            value: chartConfig.lineShowDots,
          },
          {
            id: 'chart.lineCurved',
            type: 'toggle' as const,
            label: 'Curved Line',
            value: chartConfig.lineCurved,
          },
        ],
      }] : []),
      // Bar Options (conditional)
      ...(!isLineChart ? [{
        title: 'Bar Options',
        controls: [
          {
            id: 'chart.barGap',
            type: 'slider' as const,
            label: 'Gap',
            value: chartConfig.barGap,
            min: 0,
            max: 8,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'chart.barRadius',
            type: 'slider' as const,
            label: 'Corner Radius',
            value: chartConfig.barRadius,
            min: 0,
            max: 8,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'chart.barOpacity',
            type: 'slider' as const,
            label: 'Opacity',
            value: chartConfig.barOpacity,
            min: 20,
            max: 100,
            step: 10,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      }] : []),
      // Colors (with conditional dropdowns)
      {
        title: 'Colors',
        controls: colorControls,
      },
      // Axes & Grid
      {
        title: 'Axes & Grid',
        controls: [
          {
            id: 'chart.showXAxis',
            type: 'toggle' as const,
            label: 'Show X Axis',
            value: chartConfig.showXAxis,
          },
          {
            id: 'chart.showYAxis',
            type: 'toggle' as const,
            label: 'Show Y Axis',
            value: chartConfig.showYAxis,
          },
          {
            id: 'chart.showGridLines',
            type: 'toggle' as const,
            label: 'Show Grid Lines',
            value: chartConfig.showGridLines,
          },
        ],
      },
      // Legend
      {
        title: 'Legend',
        controls: [
          {
            id: 'chart.showLegend',
            type: 'toggle' as const,
            label: 'Show Legend',
            value: chartConfig.showLegend,
          },
          {
            id: 'chart.legendPosition',
            type: 'select' as const,
            label: 'Position',
            value: chartConfig.legendPosition,
            options: LEGEND_POSITION_OPTIONS,
          },
        ],
      },
    ],
  }
}
