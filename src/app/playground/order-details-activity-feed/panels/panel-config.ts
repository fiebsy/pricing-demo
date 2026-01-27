import type { PanelConfig, Section } from '@/components/ui/prod/base/control-panel'
import type { OrderDetailsFeedConfig, OrderDetailsFeedPresetMeta } from '../config/types'
import {
  BACKGROUND_OPTIONS,
  SHINE_TYPE_OPTIONS,
  SHINE_INTENSITY_OPTIONS,
  SHADOW_OPTIONS,
  DEPTH_OPTIONS,
  CORNER_OPTIONS,
  BORDER_COLOR_OPTIONS,
  VARIANT_OPTIONS,
  TAB_OPTIONS,
  HEADER_SIZE_OPTIONS,
  TEXT_SIZE_OPTIONS,
  MESSAGE_SIZE_OPTIONS,
  SPACING_OPTIONS,
  MAX_WIDTH_OPTIONS,
} from '../config/options'

export function buildOrderDetailsPanelConfig(
  config: OrderDetailsFeedConfig,
  presets: OrderDetailsFeedPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildVariantSection(config),
      buildOuterSection(config),
      buildSummaryCardSection(config),
      buildTabsSection(config),
      buildHeaderSection(config),
      buildTypographySection(config),
      buildLayoutSection(config),
    ],
    presetConfig: {
      presets: presets.map((p) => ({
        id: p.id,
        name: p.name,
        data: p.data,
      })),
      activePresetId,
      showCopyButton: true,
    },
    showReset: true,
  }
}

function buildVariantSection(config: OrderDetailsFeedConfig): Section {
  return {
    id: 'variant',
    label: 'Mode',
    title: 'View Mode',
    groups: [
      {
        title: 'Variant',
        controls: [
          {
            id: 'variant.mode',
            type: 'select',
            label: 'Mode',
            value: config.variant.mode,
            options: [...VARIANT_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildOuterSection(config: OrderDetailsFeedConfig): Section {
  return {
    id: 'outer',
    label: 'Outer',
    title: 'Outer Container',
    groups: [
      {
        title: 'Background',
        controls: [
          {
            id: 'outer.background',
            type: 'select',
            label: 'Color',
            value: config.outer.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'outer.depth',
            type: 'select',
            label: 'Depth',
            value: config.outer.depth,
            options: [...DEPTH_OPTIONS],
          },
        ],
      },
      {
        title: 'Shine Effect',
        controls: [
          {
            id: 'outer.shine',
            type: 'select',
            label: 'Type',
            value: config.outer.shine,
            options: [...SHINE_TYPE_OPTIONS],
          },
          {
            id: 'outer.shineIntensity',
            type: 'select',
            label: 'Intensity',
            value: config.outer.shineIntensity,
            options: [...SHINE_INTENSITY_OPTIONS],
          },
          {
            id: 'outer.shadow',
            type: 'select',
            label: 'Shadow',
            value: config.outer.shadow,
            options: [...SHADOW_OPTIONS],
          },
        ],
      },
      {
        title: 'Shape',
        controls: [
          {
            id: 'outer.corner',
            type: 'select',
            label: 'Corner',
            value: config.outer.corner,
            options: [...CORNER_OPTIONS],
          },
          {
            id: 'outer.borderRadius',
            type: 'slider',
            label: 'Radius',
            value: config.outer.borderRadius,
            min: 0,
            max: 48,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'outer.border',
            type: 'toggle',
            label: 'Show',
            value: config.outer.border,
          },
          {
            id: 'outer.borderColor',
            type: 'select',
            label: 'Color',
            value: config.outer.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Spacing',
        controls: [
          {
            id: 'outer.padding',
            type: 'slider',
            label: 'Padding',
            value: config.outer.padding,
            min: 0,
            max: 64,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildSummaryCardSection(config: OrderDetailsFeedConfig): Section {
  return {
    id: 'summaryCard',
    label: 'Summary',
    title: 'Summary Card',
    groups: [
      {
        title: 'Visibility',
        controls: [
          {
            id: 'summaryCard.visible',
            type: 'toggle',
            label: 'Show Summary',
            value: config.summaryCard.visible,
          },
          {
            id: 'summaryCard.gradientEffect',
            type: 'toggle',
            label: 'Gradient Text',
            value: config.summaryCard.gradientEffect,
          },
        ],
      },
      {
        title: 'Style',
        controls: [
          {
            id: 'summaryCard.background',
            type: 'select',
            label: 'Background',
            value: config.summaryCard.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'summaryCard.shine',
            type: 'select',
            label: 'Shine',
            value: config.summaryCard.shine,
            options: [...SHINE_TYPE_OPTIONS],
          },
          {
            id: 'summaryCard.shineIntensity',
            type: 'select',
            label: 'Intensity',
            value: config.summaryCard.shineIntensity,
            options: [...SHINE_INTENSITY_OPTIONS],
          },
        ],
      },
      {
        title: 'Dimensions',
        controls: [
          {
            id: 'summaryCard.height',
            type: 'slider',
            label: 'Height',
            value: config.summaryCard.height,
            min: 200,
            max: 480,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'summaryCard.cornerRadius',
            type: 'slider',
            label: 'Corner Radius',
            value: config.summaryCard.cornerRadius,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildTabsSection(config: OrderDetailsFeedConfig): Section {
  return {
    id: 'tabs',
    label: 'Tabs',
    title: 'Tab Configuration',
    groups: [
      {
        title: 'Visible Tabs',
        controls: [
          {
            id: 'tabs.showActivity',
            type: 'toggle',
            label: 'Show Activity',
            value: config.tabs.visibleTabs.includes('activity'),
          },
          {
            id: 'tabs.showPayouts',
            type: 'toggle',
            label: 'Show Payouts',
            value: config.tabs.visibleTabs.includes('payouts'),
          },
          {
            id: 'tabs.showInfo',
            type: 'toggle',
            label: 'Show Info',
            value: config.tabs.visibleTabs.includes('info'),
          },
          {
            id: 'tabs.defaultTab',
            type: 'select',
            label: 'Default Tab',
            value: config.tabs.defaultTab,
            options: TAB_OPTIONS.filter(opt => 
              config.tabs.visibleTabs.includes(opt.value as any)
            ),
          },
          {
            id: 'tabs.showBorder',
            type: 'toggle',
            label: 'Show Border',
            value: config.tabs.showBorder,
          },
        ],
      },
    ],
  }
}

function buildHeaderSection(config: OrderDetailsFeedConfig): Section {
  return {
    id: 'header',
    label: 'Header',
    title: 'Header Display',
    groups: [
      {
        title: 'Elements',
        controls: [
          {
            id: 'header.showOrderId',
            type: 'toggle',
            label: 'Order ID',
            value: config.header.showOrderId,
          },
          {
            id: 'header.showHealthBadge',
            type: 'toggle',
            label: 'Health Badge',
            value: config.header.showHealthBadge,
          },
          {
            id: 'header.showMetadata',
            type: 'toggle',
            label: 'Metadata Tags',
            value: config.header.showMetadata,
          },
          {
            id: 'header.showMetrics',
            type: 'toggle',
            label: 'Metrics Section',
            value: config.header.showMetrics,
          },
        ],
      },
    ],
  }
}

function buildTypographySection(config: OrderDetailsFeedConfig): Section {
  return {
    id: 'typography',
    label: 'Typography',
    title: 'Text Sizes',
    groups: [
      {
        title: 'Sizes',
        controls: [
          {
            id: 'typography.headerSize',
            type: 'select',
            label: 'Header',
            value: config.typography.headerSize,
            options: [...HEADER_SIZE_OPTIONS],
          },
          {
            id: 'typography.productSize',
            type: 'select',
            label: 'Product',
            value: config.typography.productSize,
            options: [...TEXT_SIZE_OPTIONS],
          },
          {
            id: 'typography.metricsSize',
            type: 'select',
            label: 'Metrics',
            value: config.typography.metricsSize,
            options: TEXT_SIZE_OPTIONS.filter(opt => opt.value !== 'lg'),
          },
          {
            id: 'typography.messageSize',
            type: 'select',
            label: 'Message',
            value: config.typography.messageSize,
            options: [...MESSAGE_SIZE_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildLayoutSection(config: OrderDetailsFeedConfig): Section {
  return {
    id: 'layout',
    label: 'Layout',
    title: 'Layout Settings',
    groups: [
      {
        title: 'Dimensions',
        controls: [
          {
            id: 'layout.maxWidth',
            type: 'select',
            label: 'Max Width',
            value: config.layout.maxWidth,
            options: [...MAX_WIDTH_OPTIONS],
          },
          {
            id: 'layout.spacing',
            type: 'select',
            label: 'Spacing',
            value: config.layout.spacing,
            options: [...SPACING_OPTIONS],
          },
        ],
      },
    ],
  }
}