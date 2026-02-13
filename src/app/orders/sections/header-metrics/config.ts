/**
 * Orders Page - Header Metrics Config
 *
 * Default configuration for summary cards.
 */

import type { SummaryCardConfig } from '../../types'

// =============================================================================
// DEFAULT SUMMARY CARD CONFIG
// =============================================================================

export const DEFAULT_SUMMARY_CARD_CONFIG: SummaryCardConfig = {
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
}
