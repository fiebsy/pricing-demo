/**
 * Orders Page - Presets
 *
 * Preset configurations for common page styles.
 */

import type { OrdersPageConfig, PresetId, ColumnVisibility, TableBorderConfig, ChartConfig, FilterConfig } from '../types'

// =============================================================================
// DEFAULT COLUMN VISIBILITY
// =============================================================================

const ALL_COLUMNS_VISIBLE: ColumnVisibility = {
  customer: true,
  order: true,
  route: true,
  plan: true,
  type: true,
  status: true,
}

const DEFAULT_TABLE_BORDER: TableBorderConfig = {
  showOuterBorder: true,
  showHeaderRowBorder: true,
  showRowBorders: false,
  showCellBorders: false,
  outerBorderColor: 'secondary',
  headerRowBorderColor: 'secondary',
  rowBorderColor: 'secondary',
  cellBorderColor: 'secondary',
  tableBorderRadius: 8,
}

const DEFAULT_CHART_CONFIG: ChartConfig = {
  showChart: true,
  chartType: 'line',
  stackMode: 'none',
  chartHeight: 200,
  chartToTableGap: 24,
  chartWidthMode: 'container',
  chartCustomWidth: 1200,
  chartAlignment: 'center',
  lineStrokeWidth: 1.5,
  lineShowFill: true,
  lineShowDots: false,
  lineCurved: true,
  barGap: 2,
  barRadius: 2,
  barOpacity: 80,
  colorMode: 'neutral',
  primaryColor: '4',
  semanticColor: 'success',
  showTooltip: true,
  showXAxis: false,
  showYAxis: false,
  showGridLines: false,
  showLegend: false,
  legendPosition: 'top',
}

const DEFAULT_FILTER_CONFIG: FilterConfig = {
  showToolbarFilter: true,
  showTopFilter: false,
}

// =============================================================================
// DEFAULT PRESET
// =============================================================================

export const PRESET_DEFAULT: OrdersPageConfig = {
  // Page
  pageBackground: 'secondary_alt',

  // Layout Gaps
  layoutTopGap: 96,
  metricsToTableGap: 48,

  // Container Sizing
  containerWidth: 176,
  containerHeight: 0,

  // Padding
  paddingTop: 16,
  paddingRight: 0,
  paddingBottom: 16,
  paddingLeft: 0,

  // Stack Order
  stackOrder: 'subtext1-first',

  // Value Text
  valueFontWeight: '400',
  valueFontSize: 'sm',
  valueColor: 'primary',
  valueOpacity: 100,

  // Subtext 1
  subtext1FontWeight: '400',
  subtext1FontSize: 'sm',
  subtext1Color: 'quaternary',
  subtext1Opacity: 100,

  // Subtext 2
  subtext2FontWeight: '400',
  subtext2FontSize: 'xs',
  subtext2Color: 'quaternary',
  subtext2Opacity: 55,

  // Subtext 2 Badge
  subtext2ShowBadge: true,
  subtext2BadgeColor: 'success',
  subtext2BadgeSize: 'xs',
  subtext2BadgeShape: 'rounded',
  subtext2BadgeStyle: 'default',
  subtext2BadgeBorder: false,

  // Text Gaps
  valueToSubtext1Gap: 0,
  subtext1ToSubtext2Gap: 0,

  // Background
  backgroundColor: 'transparent',
  backgroundOpacity: 100,

  // Border
  showBorder: false,
  borderColor: 'secondary',
  borderWidth: 1,
  borderOpacity: 100,

  // Corner Shape
  borderRadius: 12,
  cornerSquircle: true,

  // Shine Effect
  shineType: 'none',
  shineIntensity: 'subtle',
  shineShadow: 'none',

  // Shady Container
  showShadyContainer: false,
  shadyPadding: 12,
  shadyBackground: 'tertiary',
  shadyOpacity: 50,
  shadyRadius: 8,
  shadyShine: 'none',
  shadyShineIntensity: 'subtle',

  // Column Visibility
  columnVisibility: ALL_COLUMNS_VISIBLE,

  // Column Reorder
  enableColumnReorder: true,

  // Table Borders
  tableBorder: DEFAULT_TABLE_BORDER,

  // Chart
  chart: DEFAULT_CHART_CONFIG,

  // Filter
  filter: DEFAULT_FILTER_CONFIG,
}

// =============================================================================
// MINIMAL PRESET
// =============================================================================

export const PRESET_MINIMAL: OrdersPageConfig = {
  // Page
  pageBackground: 'primary',

  // Layout Gaps
  layoutTopGap: 48,
  metricsToTableGap: 24,

  // Container Sizing
  containerWidth: 160,
  containerHeight: 0,

  // Padding
  paddingTop: 8,
  paddingRight: 8,
  paddingBottom: 8,
  paddingLeft: 8,

  // Stack Order
  stackOrder: 'value-first',

  // Value Text
  valueFontWeight: '500',
  valueFontSize: 'xl',
  valueColor: 'primary',
  valueOpacity: 100,

  // Subtext 1
  subtext1FontWeight: '400',
  subtext1FontSize: 'sm',
  subtext1Color: 'secondary',
  subtext1Opacity: 100,

  // Subtext 2
  subtext2FontWeight: '400',
  subtext2FontSize: 'xs',
  subtext2Color: 'tertiary',
  subtext2Opacity: 80,

  // Subtext 2 Badge
  subtext2ShowBadge: false,
  subtext2BadgeColor: 'gray',
  subtext2BadgeSize: 'xs',
  subtext2BadgeShape: 'pill',
  subtext2BadgeStyle: 'default',
  subtext2BadgeBorder: true,

  // Text Gaps
  valueToSubtext1Gap: 2,
  subtext1ToSubtext2Gap: 2,

  // Background
  backgroundColor: 'transparent',
  backgroundOpacity: 0,

  // Border
  showBorder: false,
  borderColor: 'secondary',
  borderWidth: 1,
  borderOpacity: 50,

  // Corner Shape
  borderRadius: 0,
  cornerSquircle: false,

  // Shine Effect
  shineType: 'none',
  shineIntensity: 'subtle',
  shineShadow: 'none',

  // Shady Container
  showShadyContainer: false,
  shadyPadding: 8,
  shadyBackground: 'secondary',
  shadyOpacity: 30,
  shadyRadius: 4,
  shadyShine: 'none',
  shadyShineIntensity: 'subtle',

  // Column Visibility
  columnVisibility: ALL_COLUMNS_VISIBLE,

  // Column Reorder
  enableColumnReorder: true,

  // Table Borders
  tableBorder: {
    showOuterBorder: false,
    showHeaderRowBorder: true,
    showRowBorders: true,
    showCellBorders: false,
    outerBorderColor: 'secondary',
    headerRowBorderColor: 'secondary',
    rowBorderColor: 'secondary',
    cellBorderColor: 'secondary',
    tableBorderRadius: 0,
  },

  // Chart - minimal style
  chart: {
    ...DEFAULT_CHART_CONFIG,
    showChart: true,
    chartType: 'line',
    lineShowFill: false,
    lineShowDots: true,
    showGridLines: false,
    showYAxis: false,
  },

  // Filter
  filter: DEFAULT_FILTER_CONFIG,
}

// =============================================================================
// ELEVATED PRESET
// =============================================================================

export const PRESET_ELEVATED: OrdersPageConfig = {
  // Page
  pageBackground: 'secondary',

  // Layout Gaps
  layoutTopGap: 48,
  metricsToTableGap: 24,

  // Container Sizing
  containerWidth: 200,
  containerHeight: 0,

  // Padding
  paddingTop: 20,
  paddingRight: 20,
  paddingBottom: 20,
  paddingLeft: 20,

  // Stack Order
  stackOrder: 'value-first',

  // Value Text
  valueFontWeight: '700',
  valueFontSize: '3xl',
  valueColor: 'primary',
  valueOpacity: 100,

  // Subtext 1
  subtext1FontWeight: '500',
  subtext1FontSize: 'md',
  subtext1Color: 'secondary',
  subtext1Opacity: 100,

  // Subtext 2
  subtext2FontWeight: '400',
  subtext2FontSize: 'sm',
  subtext2Color: 'tertiary',
  subtext2Opacity: 90,

  // Subtext 2 Badge
  subtext2ShowBadge: false,
  subtext2BadgeColor: 'gray',
  subtext2BadgeSize: 'xs',
  subtext2BadgeShape: 'pill',
  subtext2BadgeStyle: 'default',
  subtext2BadgeBorder: true,

  // Text Gaps
  valueToSubtext1Gap: 6,
  subtext1ToSubtext2Gap: 4,

  // Background
  backgroundColor: 'secondary',
  backgroundOpacity: 100,

  // Border
  showBorder: false,
  borderColor: 'secondary',
  borderWidth: 1,
  borderOpacity: 100,

  // Corner Shape
  borderRadius: 16,
  cornerSquircle: true,

  // Shine Effect
  shineType: '2',
  shineIntensity: 'normal',
  shineShadow: 'sm',

  // Shady Container
  showShadyContainer: true,
  shadyPadding: 12,
  shadyBackground: 'tertiary',
  shadyOpacity: 40,
  shadyRadius: 8,
  shadyShine: '1',
  shadyShineIntensity: 'subtle',

  // Column Visibility
  columnVisibility: ALL_COLUMNS_VISIBLE,

  // Column Reorder
  enableColumnReorder: true,

  // Table Borders
  tableBorder: {
    showOuterBorder: true,
    showHeaderRowBorder: true,
    showRowBorders: false,
    showCellBorders: false,
    outerBorderColor: 'secondary',
    headerRowBorderColor: 'secondary',
    rowBorderColor: 'secondary',
    cellBorderColor: 'secondary',
    tableBorderRadius: 16,
  },

  // Chart - elevated style with bars
  chart: {
    ...DEFAULT_CHART_CONFIG,
    showChart: true,
    chartType: 'bar',
    barRadius: 4,
    barOpacity: 90,
    chartHeight: 240,
  },

  // Filter
  filter: DEFAULT_FILTER_CONFIG,
}

// =============================================================================
// BRAND PRESET
// =============================================================================

export const PRESET_BRAND: OrdersPageConfig = {
  // Page
  pageBackground: 'primary',

  // Layout Gaps
  layoutTopGap: 48,
  metricsToTableGap: 24,

  // Container Sizing
  containerWidth: 180,
  containerHeight: 0,

  // Padding
  paddingTop: 16,
  paddingRight: 16,
  paddingBottom: 16,
  paddingLeft: 16,

  // Stack Order
  stackOrder: 'value-first',

  // Value Text
  valueFontWeight: '600',
  valueFontSize: '2xl',
  valueColor: 'brand-primary',
  valueOpacity: 100,

  // Subtext 1
  subtext1FontWeight: '500',
  subtext1FontSize: 'sm',
  subtext1Color: 'primary',
  subtext1Opacity: 100,

  // Subtext 2
  subtext2FontWeight: '400',
  subtext2FontSize: 'xs',
  subtext2Color: 'brand-secondary',
  subtext2Opacity: 100,

  // Subtext 2 Badge
  subtext2ShowBadge: false,
  subtext2BadgeColor: 'brand',
  subtext2BadgeSize: 'xs',
  subtext2BadgeShape: 'pill',
  subtext2BadgeStyle: 'default',
  subtext2BadgeBorder: true,

  // Text Gaps
  valueToSubtext1Gap: 4,
  subtext1ToSubtext2Gap: 2,

  // Background
  backgroundColor: 'brand-primary',
  backgroundOpacity: 8,

  // Border
  showBorder: true,
  borderColor: 'brand',
  borderWidth: 1,
  borderOpacity: 30,

  // Corner Shape
  borderRadius: 12,
  cornerSquircle: true,

  // Shine Effect
  shineType: 'brand',
  shineIntensity: 'subtle',
  shineShadow: 'none',

  // Shady Container
  showShadyContainer: false,
  shadyPadding: 12,
  shadyBackground: 'brand-primary',
  shadyOpacity: 20,
  shadyRadius: 8,
  shadyShine: 'brand',
  shadyShineIntensity: 'subtle',

  // Column Visibility
  columnVisibility: ALL_COLUMNS_VISIBLE,

  // Column Reorder
  enableColumnReorder: true,

  // Table Borders
  tableBorder: {
    showOuterBorder: true,
    showHeaderRowBorder: true,
    showRowBorders: false,
    showCellBorders: false,
    outerBorderColor: 'brand',
    headerRowBorderColor: 'brand',
    rowBorderColor: 'brand',
    cellBorderColor: 'brand',
    tableBorderRadius: 12,
  },

  // Chart - brand style
  chart: {
    ...DEFAULT_CHART_CONFIG,
    showChart: true,
    chartType: 'line',
    lineShowFill: true,
    lineCurved: true,
    colorMode: 'chart',
    primaryColor: '1',
  },

  // Filter
  filter: DEFAULT_FILTER_CONFIG,
}

// =============================================================================
// PRESETS MAP
// =============================================================================

export const PRESETS: Record<PresetId, OrdersPageConfig> = {
  default: PRESET_DEFAULT,
  minimal: PRESET_MINIMAL,
  elevated: PRESET_ELEVATED,
  brand: PRESET_BRAND,
}
