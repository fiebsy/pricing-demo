/**
 * Orders Page - Header Metrics Panel Configuration
 *
 * Control panel sections for Layout, Typography, Padding, Style, and Shady Container tabs.
 */

import type { Section } from '@/components/ui/patterns/control-panel'
import { COMMON_FONT_WEIGHTS } from '@/components/ui/patterns/control-panel/tokens/typography'
import { SEMANTIC_TEXT_COLORS, SEMANTIC_BG_COLORS, SEMANTIC_BORDER_COLORS } from '@/components/ui/patterns/control-panel/tokens/colors'
import type { OrdersPageConfig } from '../../types'
import {
  FONT_SIZE_OPTIONS,
  STACK_ORDER_OPTIONS,
  SHINE_TYPE_OPTIONS,
  SHINE_INTENSITY_OPTIONS,
  SHADOW_SIZE_OPTIONS,
  BADGE_COLOR_OPTIONS,
  BADGE_SIZE_OPTIONS,
  BADGE_SHAPE_OPTIONS,
  BADGE_STYLE_OPTIONS,
} from './options'

// =============================================================================
// LAYOUT SECTION
// =============================================================================

export function createLayoutSection(config: OrdersPageConfig): Section {
  return {
    id: 'layout',
    title: 'Layout',
    tabLabel: 'Layout',
    groups: [
      {
        title: 'Container Size',
        controls: [
          {
            id: 'containerWidth',
            type: 'slider',
            label: 'Width',
            value: config.containerWidth,
            min: 120,
            max: 320,
            step: 8,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'containerHeight',
            type: 'slider',
            label: 'Height',
            value: config.containerHeight,
            min: 0,
            max: 200,
            step: 8,
            formatLabel: (v: number) => (v === 0 ? 'Auto' : `${v}px`),
          },
        ],
      },
      {
        title: 'Stack Order',
        controls: [
          {
            id: 'stackOrder',
            type: 'select',
            label: 'Order',
            value: config.stackOrder,
            options: STACK_ORDER_OPTIONS,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// TYPOGRAPHY SECTION
// =============================================================================

export function createTypographySection(config: OrdersPageConfig): Section {
  return {
    id: 'typography',
    title: 'Typography',
    tabLabel: 'Type',
    groups: [
      {
        title: 'Value Text',
        controls: [
          {
            id: 'valueFontWeight',
            type: 'font-weight-select',
            label: 'Weight',
            value: config.valueFontWeight,
            options: COMMON_FONT_WEIGHTS,
          },
          {
            id: 'valueFontSize',
            type: 'select',
            label: 'Size',
            value: config.valueFontSize,
            options: FONT_SIZE_OPTIONS,
          },
          {
            id: 'valueColor',
            type: 'color-enhanced-select',
            label: 'Color',
            value: config.valueColor,
            options: SEMANTIC_TEXT_COLORS,
            swatchSize: 'sm',
            showGroups: true,
          },
          {
            id: 'valueOpacity',
            type: 'slider',
            label: 'Opacity',
            value: config.valueOpacity,
            min: 0,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
      {
        title: 'Subtext 1',
        controls: [
          {
            id: 'subtext1FontWeight',
            type: 'font-weight-select',
            label: 'Weight',
            value: config.subtext1FontWeight,
            options: COMMON_FONT_WEIGHTS,
          },
          {
            id: 'subtext1FontSize',
            type: 'select',
            label: 'Size',
            value: config.subtext1FontSize,
            options: FONT_SIZE_OPTIONS,
          },
          {
            id: 'subtext1Color',
            type: 'color-enhanced-select',
            label: 'Color',
            value: config.subtext1Color,
            options: SEMANTIC_TEXT_COLORS,
            swatchSize: 'sm',
            showGroups: true,
          },
          {
            id: 'subtext1Opacity',
            type: 'slider',
            label: 'Opacity',
            value: config.subtext1Opacity,
            min: 0,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
      {
        title: 'Subtext 2',
        controls: [
          {
            id: 'subtext2FontWeight',
            type: 'font-weight-select',
            label: 'Weight',
            value: config.subtext2FontWeight,
            options: COMMON_FONT_WEIGHTS,
          },
          {
            id: 'subtext2FontSize',
            type: 'select',
            label: 'Size',
            value: config.subtext2FontSize,
            options: FONT_SIZE_OPTIONS,
          },
          {
            id: 'subtext2Color',
            type: 'color-enhanced-select',
            label: 'Color',
            value: config.subtext2Color,
            options: SEMANTIC_TEXT_COLORS,
            swatchSize: 'sm',
            showGroups: true,
          },
          {
            id: 'subtext2Opacity',
            type: 'slider',
            label: 'Opacity',
            value: config.subtext2Opacity,
            min: 0,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
          {
            id: 'subtext2ShowBadge',
            type: 'toggle',
            label: 'Show as Badge',
            value: config.subtext2ShowBadge,
          },
          ...(config.subtext2ShowBadge
            ? [
                {
                  id: 'subtext2BadgeColor',
                  type: 'select' as const,
                  label: 'Badge Color',
                  value: config.subtext2BadgeColor,
                  options: BADGE_COLOR_OPTIONS,
                },
                {
                  id: 'subtext2BadgeSize',
                  type: 'select' as const,
                  label: 'Badge Size',
                  value: config.subtext2BadgeSize,
                  options: BADGE_SIZE_OPTIONS,
                },
                {
                  id: 'subtext2BadgeShape',
                  type: 'select' as const,
                  label: 'Badge Shape',
                  value: config.subtext2BadgeShape,
                  options: BADGE_SHAPE_OPTIONS,
                },
                {
                  id: 'subtext2BadgeStyle',
                  type: 'select' as const,
                  label: 'Badge Style',
                  value: config.subtext2BadgeStyle,
                  options: BADGE_STYLE_OPTIONS,
                },
                {
                  id: 'subtext2BadgeBorder',
                  type: 'toggle' as const,
                  label: 'Badge Border',
                  value: config.subtext2BadgeBorder,
                },
              ]
            : []),
        ],
      },
      {
        title: 'Text Gaps',
        controls: [
          {
            id: 'valueToSubtext1Gap',
            type: 'slider',
            label: 'Value → Subtext 1',
            value: config.valueToSubtext1Gap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'subtext1ToSubtext2Gap',
            type: 'slider',
            label: 'Subtext 1 → Subtext 2',
            value: config.subtext1ToSubtext2Gap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// PADDING SECTION
// =============================================================================

export function createPaddingSection(config: OrdersPageConfig): Section {
  return {
    id: 'padding',
    title: 'Padding',
    tabLabel: 'Pad',
    groups: [
      {
        title: 'Container Padding',
        columns: 2,
        controls: [
          {
            id: 'paddingTop',
            type: 'slider',
            label: 'Top',
            value: config.paddingTop,
            min: 0,
            max: 48,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'paddingRight',
            type: 'slider',
            label: 'Right',
            value: config.paddingRight,
            min: 0,
            max: 48,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'paddingBottom',
            type: 'slider',
            label: 'Bottom',
            value: config.paddingBottom,
            min: 0,
            max: 48,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'paddingLeft',
            type: 'slider',
            label: 'Left',
            value: config.paddingLeft,
            min: 0,
            max: 48,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

// =============================================================================
// STYLE SECTION
// =============================================================================

export function createStyleSection(config: OrdersPageConfig): Section {
  return {
    id: 'style',
    title: 'Style',
    tabLabel: 'Style',
    groups: [
      {
        title: 'Background',
        controls: [
          {
            id: 'backgroundColor',
            type: 'color-enhanced-select',
            label: 'Color',
            value: config.backgroundColor,
            options: [
              { label: 'Transparent', value: 'transparent', cssVar: 'transparent', category: 'neutral' as const },
              ...SEMANTIC_BG_COLORS,
            ],
            swatchSize: 'sm',
            showGroups: true,
          },
          {
            id: 'backgroundOpacity',
            type: 'slider',
            label: 'Opacity',
            value: config.backgroundOpacity,
            min: 0,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'showBorder',
            type: 'toggle',
            label: 'Show Border',
            value: config.showBorder,
          },
          ...(config.showBorder
            ? [
                {
                  id: 'borderColor',
                  type: 'color-enhanced-select' as const,
                  label: 'Color',
                  value: config.borderColor,
                  options: SEMANTIC_BORDER_COLORS,
                  swatchSize: 'sm' as const,
                  showGroups: true,
                },
                {
                  id: 'borderWidth',
                  type: 'slider' as const,
                  label: 'Width',
                  value: config.borderWidth,
                  min: 1,
                  max: 4,
                  step: 1,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'borderOpacity',
                  type: 'slider' as const,
                  label: 'Opacity',
                  value: config.borderOpacity,
                  min: 0,
                  max: 100,
                  step: 5,
                  formatLabel: (v: number) => `${v}%`,
                },
              ]
            : []),
        ],
      },
      {
        title: 'Corner Shape',
        controls: [
          {
            id: 'borderRadius',
            type: 'slider',
            label: 'Radius',
            value: config.borderRadius,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'cornerSquircle',
            type: 'toggle',
            label: 'Squircle',
            value: config.cornerSquircle,
          },
        ],
      },
      {
        title: 'Shine Effect',
        controls: [
          {
            id: 'shineType',
            type: 'select',
            label: 'Type',
            value: config.shineType,
            options: SHINE_TYPE_OPTIONS,
          },
          ...(config.shineType !== 'none'
            ? [
                {
                  id: 'shineIntensity',
                  type: 'select' as const,
                  label: 'Intensity',
                  value: config.shineIntensity,
                  options: SHINE_INTENSITY_OPTIONS,
                },
                {
                  id: 'shineShadow',
                  type: 'select' as const,
                  label: 'Shadow',
                  value: config.shineShadow,
                  options: SHADOW_SIZE_OPTIONS,
                },
              ]
            : []),
        ],
      },
    ],
  }
}

// =============================================================================
// SHADY CONTAINER SECTION
// =============================================================================

export function createShadySection(config: OrdersPageConfig): Section {
  return {
    id: 'shady',
    title: 'Shady Container',
    tabLabel: 'Shady',
    groups: [
      {
        title: 'Inner Layer',
        controls: [
          {
            id: 'showShadyContainer',
            type: 'toggle',
            label: 'Enable Shady Container',
            value: config.showShadyContainer,
          },
          ...(config.showShadyContainer
            ? [
                {
                  id: 'shadyPadding',
                  type: 'slider' as const,
                  label: 'Padding',
                  value: config.shadyPadding,
                  min: 0,
                  max: 32,
                  step: 2,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'shadyBackground',
                  type: 'color-enhanced-select' as const,
                  label: 'Background',
                  value: config.shadyBackground,
                  options: [
                    { label: 'Transparent', value: 'transparent', cssVar: 'transparent', category: 'neutral' as const },
                    ...SEMANTIC_BG_COLORS,
                  ],
                  swatchSize: 'sm' as const,
                  showGroups: true,
                },
                {
                  id: 'shadyOpacity',
                  type: 'slider' as const,
                  label: 'Opacity',
                  value: config.shadyOpacity,
                  min: 0,
                  max: 100,
                  step: 5,
                  formatLabel: (v: number) => `${v}%`,
                },
                {
                  id: 'shadyRadius',
                  type: 'slider' as const,
                  label: 'Radius',
                  value: config.shadyRadius,
                  min: 0,
                  max: 24,
                  step: 2,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'shadyShine',
                  type: 'select' as const,
                  label: 'Shine',
                  value: config.shadyShine,
                  options: SHINE_TYPE_OPTIONS,
                },
                ...(config.shadyShine !== 'none'
                  ? [
                      {
                        id: 'shadyShineIntensity',
                        type: 'select' as const,
                        label: 'Shine Intensity',
                        value: config.shadyShineIntensity,
                        options: SHINE_INTENSITY_OPTIONS,
                      },
                    ]
                  : []),
              ]
            : []),
        ],
      },
    ],
  }
}
