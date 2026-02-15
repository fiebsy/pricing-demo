/**
 * Orders Chart - Color Resolution
 *
 * Maps CSS variables to hex values for Recharts.
 * Recharts requires actual color values, not CSS custom properties.
 */

import type { SemanticColorId, ChartColorId, ChartColorMode } from '../../../types'

// =============================================================================
// COLOR PALETTES
// =============================================================================

export const SEMANTIC_COLORS: Record<SemanticColorId, string> = {
  success: '#17b26a', // --color-success-500
  warning: '#f79009', // --color-warning-500
  error: '#f04438',   // --color-error-500
  info: '#0090ff',    // --color-info-500
}

export const CHART_PALETTE: Record<ChartColorId, string> = {
  '1': '#23b26c', // --color-chart-1
  '2': '#b48ce6', // --color-chart-2
  '3': '#e61496', // --color-chart-3
  '4': '#2ac8c8', // --color-chart-4
}

export const NEUTRAL_COLOR = '#737373' // --color-text-tertiary

// =============================================================================
// COLOR RESOLUTION
// =============================================================================

/**
 * Resolve the chart color based on color mode and selected color IDs.
 */
export function resolveChartColor(
  colorMode: ChartColorMode,
  primaryColor: ChartColorId,
  semanticColor: SemanticColorId
): string {
  if (colorMode === 'neutral') {
    return NEUTRAL_COLOR
  }
  if (colorMode === 'semantic') {
    return SEMANTIC_COLORS[semanticColor]
  }
  return CHART_PALETTE[primaryColor]
}

/**
 * Get a color with reduced opacity for gradient fills.
 * Returns rgba() format.
 */
export function getColorWithOpacity(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}
