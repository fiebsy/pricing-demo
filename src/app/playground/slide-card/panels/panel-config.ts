import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import type { SlideCardConfig, SlideCardPresetMeta } from '../config/types'
import {
  BACKGROUND_OPTIONS,
  SHINE_TYPE_OPTIONS,
  SHINE_INTENSITY_OPTIONS,
  SHADOW_OPTIONS,
  DEPTH_OPTIONS,
  CORNER_OPTIONS,
  BORDER_COLOR_OPTIONS,
  ANIMATION_TYPE_OPTIONS,
  ANIMATION_EASING_OPTIONS,
  CONTENT_TYPE_OPTIONS,
  WIDTH_OPTIONS,
  HEIGHT_OPTIONS,
  BAR_COLOR_OPTIONS,
  BAR_SHINE_OPTIONS,
  BAR_CORNER_OPTIONS,
} from '../config/options'

export function buildSlideCardPanelConfig(
  config: SlideCardConfig,
  presets: SlideCardPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildCardSection(config),
      buildAnimationSection(config),
      buildContentSection(config),
      buildLayoutSection(config),
    ],
    presetConfig: {
      presets: presets.map((p) => ({
        id: p.id,
        name: p.name,
        data: p.data,
      })),
      activePresetId,
      showCopyButton: true, // REQUIRED
    },
    showReset: true,
  }
}

function buildCardSection(config: SlideCardConfig): Section {
  return {
    id: 'card',
    label: 'Card',
    title: 'Card Styling',
    groups: [
      {
        title: 'Background',
        controls: [
          {
            id: 'card.background',
            type: 'select',
            label: 'Color',
            value: config.card.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'card.backgroundGradient',
            type: 'toggle',
            label: 'Use Gradient',
            value: config.card.backgroundGradient,
          },
          {
            id: 'card.gradientFrom',
            type: 'select',
            label: 'Gradient From',
            value: config.card.gradientFrom,
            options: [...BACKGROUND_OPTIONS],
            disabled: !config.card.backgroundGradient,
          },
          {
            id: 'card.gradientTo',
            type: 'select',
            label: 'Gradient To',
            value: config.card.gradientTo,
            options: [...BACKGROUND_OPTIONS],
            disabled: !config.card.backgroundGradient,
          },
        ],
      },
      {
        title: 'Effects',
        controls: [
          {
            id: 'card.shine',
            type: 'select',
            label: 'Shine Type',
            value: config.card.shine,
            options: [...SHINE_TYPE_OPTIONS],
          },
          {
            id: 'card.shineIntensity',
            type: 'select',
            label: 'Shine Intensity',
            value: config.card.shineIntensity,
            options: [...SHINE_INTENSITY_OPTIONS],
            disabled: config.card.shine === 'none',
          },
          {
            id: 'card.shadow',
            type: 'select',
            label: 'Shadow',
            value: config.card.shadow,
            options: [...SHADOW_OPTIONS],
          },
          {
            id: 'card.depth',
            type: 'select',
            label: 'Depth Gradient',
            value: config.card.depth,
            options: [...DEPTH_OPTIONS],
          },
        ],
      },
      {
        title: 'Shape',
        controls: [
          {
            id: 'card.corner',
            type: 'select',
            label: 'Corner Style',
            value: config.card.corner,
            options: [...CORNER_OPTIONS],
          },
          {
            id: 'card.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.card.borderRadius,
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
            id: 'card.border',
            type: 'toggle',
            label: 'Show Border',
            value: config.card.border,
          },
          {
            id: 'card.borderColor',
            type: 'select',
            label: 'Border Color',
            value: config.card.borderColor,
            options: [...BORDER_COLOR_OPTIONS],
            disabled: !config.card.border,
          },
          {
            id: 'card.borderWidth',
            type: 'slider',
            label: 'Border Width',
            value: config.card.borderWidth,
            min: 1,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
            disabled: !config.card.border,
          },
        ],
      },
      {
        title: 'Spacing',
        controls: [
          {
            id: 'card.padding',
            type: 'slider',
            label: 'Padding',
            value: config.card.padding,
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

function buildAnimationSection(config: SlideCardConfig): Section {
  return {
    id: 'animation',
    label: 'Animation',
    title: 'Animation Settings',
    groups: [
      {
        title: 'Animation',
        controls: [
          {
            id: 'animation.enabled',
            type: 'toggle',
            label: 'Enable Animation',
            value: config.animation.enabled,
          },
          {
            id: 'animation.type',
            type: 'select',
            label: 'Animation Type',
            value: config.animation.type,
            options: [...ANIMATION_TYPE_OPTIONS],
            disabled: !config.animation.enabled,
          },
          {
            id: 'animation.easing',
            type: 'select',
            label: 'Easing',
            value: config.animation.easing,
            options: [...ANIMATION_EASING_OPTIONS],
            disabled: !config.animation.enabled,
          },
        ],
      },
      {
        title: 'Timing',
        controls: [
          {
            id: 'animation.duration',
            type: 'slider',
            label: 'Duration',
            value: config.animation.duration,
            min: 100,
            max: 1500,
            step: 100,
            formatLabel: (v: number) => `${v}ms`,
            disabled: !config.animation.enabled,
          },
          {
            id: 'animation.delay',
            type: 'slider',
            label: 'Delay',
            value: config.animation.delay,
            min: 0,
            max: 1000,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
            disabled: !config.animation.enabled,
          },
        ],
      },
    ],
  }
}

function buildContentSection(config: SlideCardConfig): Section {
  return {
    id: 'content',
    label: 'Content',
    title: 'Content Demo',
    groups: [
      {
        title: 'Demo Content',
        controls: [
          {
            id: 'content.showPlaceholder',
            type: 'toggle',
            label: 'Show Demo Content',
            value: config.content.showPlaceholder,
          },
          {
            id: 'content.type',
            type: 'select',
            label: 'Content Type',
            value: config.content.type,
            options: [...CONTENT_TYPE_OPTIONS],
            disabled: !config.content.showPlaceholder,
          },
        ],
      },
      {
        title: 'Chart Settings',
        controls: [
          {
            id: 'content.chartTopPadding',
            type: 'slider',
            label: 'Chart Top Padding',
            value: config.content.chartTopPadding || 40,
            min: 0,
            max: 80,
            step: 5,
            formatLabel: (v: number) => `${v}px`,
            disabled: config.content.type !== 'chart' || !config.content.showPlaceholder,
          },
          {
            id: 'content.barColor',
            type: 'select',
            label: 'Bar Color',
            value: config.content.barColor || 'secondary',
            options: [...BAR_COLOR_OPTIONS],
            disabled: config.content.type !== 'chart' || !config.content.showPlaceholder,
          },
          {
            id: 'content.barShine',
            type: 'select',
            label: 'Bar Shine',
            value: config.content.barShine || 'shine-1',
            options: [...BAR_SHINE_OPTIONS],
            disabled: config.content.type !== 'chart' || !config.content.showPlaceholder,
          },
          {
            id: 'content.barCorner',
            type: 'select',
            label: 'Bar Corner Style',
            value: config.content.barCorner || 'squircle',
            options: [...BAR_CORNER_OPTIONS],
            disabled: config.content.type !== 'chart' || !config.content.showPlaceholder,
          },
        ],
      },
    ],
  }
}

function buildLayoutSection(config: SlideCardConfig): Section {
  return {
    id: 'layout',
    label: 'Layout',
    title: 'Layout Settings',
    groups: [
      {
        title: 'Width',
        controls: [
          {
            id: 'layout.width',
            type: 'select',
            label: 'Width Mode',
            value: config.layout.width,
            options: [...WIDTH_OPTIONS],
          },
          {
            id: 'layout.minWidth',
            type: 'slider',
            label: 'Min Width',
            value: config.layout.minWidth,
            min: 100,
            max: 800,
            step: 50,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.maxWidth',
            type: 'slider',
            label: 'Max Width',
            value: config.layout.maxWidth,
            min: 200,
            max: 1200,
            step: 50,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Height',
        controls: [
          {
            id: 'layout.height',
            type: 'select',
            label: 'Height Mode',
            value: config.layout.height,
            options: [...HEIGHT_OPTIONS],
          },
          {
            id: 'layout.minHeight',
            type: 'slider',
            label: 'Min Height',
            value: config.layout.minHeight,
            min: 50,
            max: 500,
            step: 50,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}