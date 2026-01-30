/**
 * MetricCard
 *
 * A composable metric display card with configurable layout, animations, and styling.
 *
 * @module metric-card
 *
 * @example
 * ```tsx
 * import {
 *   MetricCard,
 *   DEFAULT_METRIC_CARD_CONFIG,
 *   METRIC_CARD_PRESETS,
 * } from '@/components/ui/features/metric-card'
 *
 * <MetricCard
 *   label="Total Revenue"
 *   value="$125,000"
 *   count="24 orders"
 *   trend={{ value: 12, direction: 'up', showIcon: true }}
 *   config={METRIC_CARD_PRESETS.flat}
 * />
 * ```
 */

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export { MetricCard } from './metric-card'

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

export { TrendBadge, type TrendBadgeProps } from './components'

// =============================================================================
// CONFIGURATION
// =============================================================================

export {
  // Constants
  BORDER_RADIUS_DEFAULT,
  ICON_SIZE_OPTIONS,
  // Style mappings
  BACKGROUND_CLASSES,
  TEXT_COLOR_CLASSES,
  FONT_FAMILY_CLASSES,
  FONT_SIZE_CLASSES,
  FONT_WEIGHT_CLASSES,
  TREND_COLORS,
  // Default styles
  DEFAULT_LAYER_STYLE,
  DEFAULT_INNER_LAYER_STYLE,
  DEFAULT_TREND_STYLE,
  DEFAULT_VALUE_FORMAT,
  DEFAULT_METRIC_CARD_CONFIG,
  // Presets
  METRIC_CARD_PRESET_FLAT,
  METRIC_CARD_PRESETS,
  type MetricCardPresetId,
} from './config'

// =============================================================================
// UTILITIES
// =============================================================================

export {
  buildShineClass,
  buildDepthClass,
  buildLayerClasses,
  buildSectionClasses,
  getHoverAnimationClasses,
  mergeLayerStyles,
  mergeSectionStyles,
  formatCompactValue,
} from './utils'

// =============================================================================
// TYPES
// =============================================================================

export type {
  // Primitive types
  ShineType,
  ShineIntensity,
  ShineShadow,
  DepthIntensity,
  DepthColor,
  DepthDirection,
  BackgroundColor,
  TextColor,
  FontFamily,
  FontWeight,
  FontSize,
  IconSize,
  HoverAnimation,
  TrendAlignment,
  SectionType,
  TrendDirection,
  // Style interfaces
  LayerStyle,
  SectionStyle,
  TrendStyle,
  TrendIndicator,
  ValueFormatConfig,
  // Configuration
  MetricCardConfig,
  MetricCardProps,
  // Utility types
  FormattedValueParts,
} from './types'
