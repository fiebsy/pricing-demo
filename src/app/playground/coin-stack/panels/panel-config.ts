/**
 * Coin Stack Control Panel Configuration
 *
 * Builds the panel config for UnifiedControlPanel
 */

import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import type { CoinStackConfig, CoinStackPreset } from '../config/types'
import {
  SEMANTIC_COLOR_OPTIONS,
  GRADIENT_TYPE_OPTIONS,
  GRADIENT_DIRECTION_OPTIONS,
  DROP_SHADOW_OPTIONS,
  INNER_GLOW_OPTIONS,
  SHINE_OVERLAY_OPTIONS,
  PAGE_BACKGROUND_OPTIONS,
  SLIDER_CONFIGS,
} from '../config/options'

// ============================================================================
// Panel Builder
// ============================================================================

export function buildCoinStackPanelConfig(
  config: CoinStackConfig,
  presets: CoinStackPreset[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildSizeSection(config),
      buildBottomTierSection(config),
      buildTopTierSection(config),
      buildEffectsSection(config),
      buildDemoSection(config),
    ],
    presetConfig: {
      presets: presets.map((p) => ({
        id: p.id,
        name: p.name,
        data: p.config,
      })),
      activePresetId,
      showCopyButton: true,
    },
    showReset: true,
  }
}

// ============================================================================
// Section Builders
// ============================================================================

function buildSizeSection(config: CoinStackConfig): Section {
  return {
    id: 'size',
    label: 'Size',
    title: 'Dimensions',
    groups: [
      {
        title: 'Size',
        controls: [
          {
            id: 'size.width',
            type: 'slider',
            label: 'Width',
            value: config.size.width,
            ...SLIDER_CONFIGS.width,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildTierSection(
  id: string,
  label: string,
  title: string,
  tier: CoinStackConfig['bottomTier']
): Section {
  return {
    id,
    label,
    title,
    groups: [
      {
        title: 'Face Color',
        controls: [
          {
            id: `${id}.faceColor`,
            type: 'color-select',
            label: 'Color',
            value: tier.faceColor,
            options: [...SEMANTIC_COLOR_OPTIONS],
          },
          {
            id: `${id}.useGradient`,
            type: 'toggle',
            label: 'Use Gradient',
            value: tier.useGradient,
          },
        ],
      },
      ...(tier.useGradient
        ? [
            {
              title: 'Gradient',
              controls: [
                {
                  id: `${id}.gradient.type`,
                  type: 'select' as const,
                  label: 'Type',
                  value: tier.gradient.type,
                  options: [...GRADIENT_TYPE_OPTIONS],
                },
                {
                  id: `${id}.gradient.direction`,
                  type: 'select' as const,
                  label: 'Direction',
                  value: tier.gradient.direction,
                  options: [...GRADIENT_DIRECTION_OPTIONS],
                },
              ],
            },
            {
              title: 'Gradient Colors',
              controls: [
                {
                  id: `${id}.gradient.startColor`,
                  type: 'color-select' as const,
                  label: 'Start Color',
                  value: tier.gradient.startColor,
                  options: [...SEMANTIC_COLOR_OPTIONS],
                },
                {
                  id: `${id}.gradient.endColor`,
                  type: 'color-select' as const,
                  label: 'End Color',
                  value: tier.gradient.endColor,
                  options: [...SEMANTIC_COLOR_OPTIONS],
                },
              ],
            },
            {
              title: 'Gradient Opacity',
              controls: [
                {
                  id: `${id}.gradient.startOpacity`,
                  type: 'slider' as const,
                  label: 'Start Opacity',
                  value: tier.gradient.startOpacity,
                  ...SLIDER_CONFIGS.opacity,
                  formatLabel: (v: number) => `${v}%`,
                },
                {
                  id: `${id}.gradient.endOpacity`,
                  type: 'slider' as const,
                  label: 'End Opacity',
                  value: tier.gradient.endOpacity,
                  ...SLIDER_CONFIGS.opacity,
                  formatLabel: (v: number) => `${v}%`,
                },
              ],
            },
          ]
        : []),
      {
        title: 'Stroke',
        controls: [
          {
            id: `${id}.strokeColor`,
            type: 'color-select',
            label: 'Color',
            value: tier.strokeColor,
            options: [...SEMANTIC_COLOR_OPTIONS],
          },
          {
            id: `${id}.strokeWidth`,
            type: 'slider',
            label: 'Width',
            value: tier.strokeWidth,
            ...SLIDER_CONFIGS.strokeWidth,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Shadow (Body)',
        controls: [
          {
            id: `${id}.shadowColor`,
            type: 'color-select',
            label: 'Color',
            value: tier.shadowColor,
            options: [...SEMANTIC_COLOR_OPTIONS],
          },
          {
            id: `${id}.shadowOpacity`,
            type: 'slider',
            label: 'Opacity',
            value: tier.shadowOpacity,
            ...SLIDER_CONFIGS.opacity,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
    ],
  }
}

function buildBottomTierSection(config: CoinStackConfig): Section {
  return buildTierSection('bottomTier', 'Bottom', 'Bottom Tier', config.bottomTier)
}

function buildTopTierSection(config: CoinStackConfig): Section {
  return buildTierSection('topTier', 'Top', 'Top Tier', config.topTier)
}

function buildEffectsSection(config: CoinStackConfig): Section {
  return {
    id: 'effects',
    label: 'Effects',
    title: 'Visual Effects',
    groups: [
      {
        title: 'Drop Shadow',
        controls: [
          {
            id: 'effects.dropShadow',
            type: 'select',
            label: 'Size',
            value: config.effects.dropShadow,
            options: [...DROP_SHADOW_OPTIONS],
          },
          ...(config.effects.dropShadow !== 'none'
            ? [
                {
                  id: 'effects.dropShadowColor',
                  type: 'color-select' as const,
                  label: 'Color',
                  value: config.effects.dropShadowColor,
                  options: [...SEMANTIC_COLOR_OPTIONS],
                },
                {
                  id: 'effects.dropShadowOpacity',
                  type: 'slider' as const,
                  label: 'Opacity',
                  value: config.effects.dropShadowOpacity,
                  ...SLIDER_CONFIGS.opacity,
                  formatLabel: (v: number) => `${v}%`,
                },
              ]
            : []),
        ],
      },
      {
        title: 'Inner Glow',
        controls: [
          {
            id: 'effects.innerGlow',
            type: 'select',
            label: 'Intensity',
            value: config.effects.innerGlow,
            options: [...INNER_GLOW_OPTIONS],
          },
          ...(config.effects.innerGlow !== 'none'
            ? [
                {
                  id: 'effects.innerGlowColor',
                  type: 'color-select' as const,
                  label: 'Color',
                  value: config.effects.innerGlowColor,
                  options: [...SEMANTIC_COLOR_OPTIONS],
                },
              ]
            : []),
        ],
      },
      {
        title: 'Shine Overlay',
        controls: [
          {
            id: 'effects.shineOverlay',
            type: 'select',
            label: 'Intensity',
            value: config.effects.shineOverlay,
            options: [...SHINE_OVERLAY_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildDemoSection(config: CoinStackConfig): Section {
  return {
    id: 'demo',
    label: 'Demo',
    title: 'Demo Settings',
    groups: [
      {
        title: 'Display',
        controls: [
          {
            id: 'demo.pageBackground',
            type: 'select',
            label: 'Background',
            value: config.demo.pageBackground,
            options: [...PAGE_BACKGROUND_OPTIONS],
          },
        ],
      },
      {
        title: 'Debug',
        controls: [
          {
            id: 'demo.showDebug',
            type: 'toggle',
            label: 'Show Debug',
            value: config.demo.showDebug,
          },
        ],
      },
    ],
  }
}
