import type { OrderDetailsFeedPresetMeta, OrderDetailsFeedConfig } from './types'

/**
 * Order Details Activity Feed Presets
 *
 * Preset categories:
 * - minimal: Info tab only, no summary card, simplified header
 * - default: Standard with all tabs and summary card
 * - large: Enhanced version with bigger typography
 * - custom: User-defined variations
 */

export const DEFAULT_ORDER_DETAILS_CONFIG: OrderDetailsFeedConfig = {
  variant: {
    mode: 'default',
  },
  outer: {
    background: 'primary',
    shine: 'none',
    shineIntensity: '',
    shadow: 'none',
    depth: 'none',
    corner: 'round',
    borderRadius: 32,
    padding: 6,
    border: false,
    borderColor: 'primary',
  },
  summaryCard: {
    visible: true,
    background: 'tertiary',
    shine: 'shine-1',
    shineIntensity: '-subtle',
    gradientEffect: true,
    height: 380,
    cornerRadius: 24,
  },
  tabs: {
    visibleTabs: ['activity', 'payouts', 'info'],
    defaultTab: 'activity',
    showBorder: true,
  },
  header: {
    showOrderId: true,
    showHealthBadge: true,
    showMetadata: true,
    showMetrics: true,
  },
  typography: {
    headerSize: '2xl',
    productSize: 'base',
    metricsSize: 'base',
    messageSize: 'xl',
  },
  layout: {
    maxWidth: '1024px',
    spacing: 'spacious',
  },
}

export const ORDER_DETAILS_PRESETS: OrderDetailsFeedPresetMeta[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'minimal',
    description: 'Info tab only, no summary card, simplified display',
    data: {
      variant: {
        mode: 'minimal',
      },
      outer: {
        background: 'primary',
        shine: 'none',
        shineIntensity: '',
        shadow: 'none',
        depth: 'none',
        corner: 'round',
        borderRadius: 16,
        padding: 0,
        border: true,
        borderColor: 'secondary',
      },
      summaryCard: {
        visible: false,
        background: 'tertiary',
        shine: 'none',
        shineIntensity: '',
        gradientEffect: false,
        height: 0,
        cornerRadius: 0,
      },
      tabs: {
        visibleTabs: ['info'],
        defaultTab: 'info',
        showBorder: false,
      },
      header: {
        showOrderId: true,
        showHealthBadge: true,
        showMetadata: true,
        showMetrics: true,
      },
      typography: {
        headerSize: 'lg',
        productSize: 'sm',
        metricsSize: 'xs',
        messageSize: 'base',
      },
      layout: {
        maxWidth: '640px',
        spacing: 'compact',
      },
    },
  },
  {
    id: 'default',
    name: 'Default',
    category: 'default',
    description: 'Standard configuration with all features',
    data: DEFAULT_ORDER_DETAILS_CONFIG,
  },
]

export const getPresetById = (id: string): OrderDetailsFeedPresetMeta | undefined =>
  ORDER_DETAILS_PRESETS.find((p) => p.id === id)

export const getPresetsByCategory = (category: string): OrderDetailsFeedPresetMeta[] =>
  ORDER_DETAILS_PRESETS.filter((p) => p.category === category)