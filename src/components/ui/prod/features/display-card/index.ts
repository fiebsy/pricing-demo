/**
 * DisplayCard Component
 *
 * A double-layer card with shine effects and subtle depth gradients.
 * Perfect for dashboard metrics, stats, and feature displays.
 *
 * @example
 * import { DisplayCard } from '@/components/ui/prod/features/display-card'
 *
 * <DisplayCard>
 *   <DisplayCard.Content>
 *     <p className="text-primary font-medium">Title</p>
 *     <p className="text-tertiary">Description</p>
 *   </DisplayCard.Content>
 * </DisplayCard>
 *
 * @example
 * // With header and metric
 * <DisplayCard variant="metric" width={300}>
 *   <DisplayCard.Header>Daily Revenue</DisplayCard.Header>
 *   <DisplayCard.Content>
 *     <DisplayCard.Metric
 *       value={12450}
 *       format="currency"
 *       trend={{ value: 12, direction: 'up' }}
 *     />
 *   </DisplayCard.Content>
 * </DisplayCard>
 */

import { DisplayCard as DisplayCardBase } from './display-card'
import { DisplayCardMetric, DisplayCardStat } from './display-card-metric'

// Attach metric components to DisplayCard
export const DisplayCard = Object.assign(DisplayCardBase, {
  Metric: DisplayCardMetric,
  Stat: DisplayCardStat,
})

// Re-export types
export type {
  DisplayCardProps,
  DisplayCardHeaderProps,
  DisplayCardContentProps,
  DisplayCardMetricProps,
  DisplayCardStatProps,
  DisplayCardVariant,
  LayerStyle,
  ShineType,
  ShineIntensity,
  ShineShadow,
  DepthIntensity,
  DepthColor,
  DepthDirection,
  BackgroundColor,
  TrendIndicator,
  MetricSize,
  MetricFormat,
  LabelPosition,
} from './types'

// Re-export config for customization
export {
  DISPLAY_CARD_VARIANTS,
  getVariant,
  VARIANT_IDS,
  BORDER_RADIUS_OUTER,
  getInnerBorderRadius,
  INNER_CONTENT_PADDING,
  backgroundStyles,
  metricSizeStyles,
  trendStyles,
} from './config'
