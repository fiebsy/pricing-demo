/**
 * Landing Hero Control Panel Configuration
 *
 * Builds the panel config for UnifiedControlPanel
 */

import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import type { LandingHeroConfig, LandingHeroPresetMeta } from '../config/types'
import {
  PATTERN_TYPE_OPTIONS,
  GLOW_COLOR_OPTIONS,
  GLOW_POSITION_OPTIONS,
  GLOW_SHAPE_OPTIONS,
  SHINE_TYPE_OPTIONS,
  SHINE_INTENSITY_OPTIONS,
  SHADOW_SIZE_OPTIONS,
  CORNER_STYLE_OPTIONS,
  BACKDROP_BLUR_OPTIONS,
} from '../config/options'

// ============================================================================
// Panel Builder
// ============================================================================

export function buildLandingHeroPanelConfig(
  config: LandingHeroConfig,
  presets: LandingHeroPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildBackgroundSection(config),
      buildImageSection(config),
      buildInteractionSection(config),
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

// ============================================================================
// Section Builders
// ============================================================================

function buildBackgroundSection(config: LandingHeroConfig): Section {
  const showPatternControls = config.background.showPattern
  const showGlowControls = config.background.showGlow

  return {
    id: 'background',
    label: 'Background',
    title: 'Background Effects',
    groups: [
      // Pattern Group
      {
        title: 'Pattern',
        controls: [
          {
            id: 'background.showPattern',
            type: 'toggle',
            label: 'Show Pattern',
            value: config.background.showPattern,
          },
          // Conditional pattern controls
          ...(showPatternControls
            ? [
                {
                  id: 'background.patternType',
                  type: 'select' as const,
                  label: 'Pattern Type',
                  value: config.background.patternType,
                  options: [...PATTERN_TYPE_OPTIONS],
                },
                {
                  id: 'background.patternOpacity',
                  type: 'slider' as const,
                  label: 'Opacity',
                  value: config.background.patternOpacity,
                  min: 0,
                  max: 0.2,
                  step: 0.01,
                  formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
                },
              ]
            : []),
        ],
      },
      // Glow Group
      {
        title: 'Glow',
        controls: [
          {
            id: 'background.showGlow',
            type: 'toggle',
            label: 'Show Glow',
            value: config.background.showGlow,
          },
          // Conditional glow controls
          ...(showGlowControls
            ? [
                {
                  id: 'background.glowPosition',
                  type: 'select' as const,
                  label: 'Position',
                  value: config.background.glowPosition,
                  options: [...GLOW_POSITION_OPTIONS],
                },
                {
                  id: 'background.glowShape',
                  type: 'select' as const,
                  label: 'Shape',
                  value: config.background.glowShape,
                  options: [...GLOW_SHAPE_OPTIONS],
                },
                {
                  id: 'background.glowColor',
                  type: 'select' as const,
                  label: 'Color',
                  value: config.background.glowColor,
                  options: [...GLOW_COLOR_OPTIONS],
                },
                {
                  id: 'background.glowSize',
                  type: 'slider' as const,
                  label: 'Size',
                  value: config.background.glowSize,
                  min: 100,
                  max: 400,
                  step: 20,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'background.glowOpacity',
                  type: 'slider' as const,
                  label: 'Opacity',
                  value: config.background.glowOpacity,
                  min: 0,
                  max: 0.5,
                  step: 0.05,
                  formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
                },
              ]
            : []),
        ],
      },
    ],
  }
}

function buildImageSection(config: LandingHeroConfig): Section {
  return {
    id: 'image',
    label: 'Image',
    title: 'Image Container',
    groups: [
      // Shine Group
      {
        title: 'Shine Effect',
        controls: [
          {
            id: 'image.shine',
            type: 'select',
            label: 'Shine Type',
            value: config.image.shine,
            options: [...SHINE_TYPE_OPTIONS],
          },
          {
            id: 'image.shineIntensity',
            type: 'select',
            label: 'Intensity',
            value: config.image.shineIntensity,
            options: [...SHINE_INTENSITY_OPTIONS],
          },
        ],
      },
      // Shadow Group
      {
        title: 'Shadow',
        controls: [
          {
            id: 'image.shadow',
            type: 'select',
            label: 'Shadow Size',
            value: config.image.shadow,
            options: [...SHADOW_SIZE_OPTIONS],
          },
        ],
      },
      // Shape Group
      {
        title: 'Shape',
        controls: [
          {
            id: 'image.outerCorner',
            type: 'select',
            label: 'Corner Style',
            value: config.image.outerCorner,
            options: [...CORNER_STYLE_OPTIONS],
          },
          {
            id: 'image.outerBorderRadius',
            type: 'slider',
            label: 'Outer Radius',
            value: config.image.outerBorderRadius,
            min: 0,
            max: 48,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'image.innerBorderRadius',
            type: 'slider',
            label: 'Inner Radius',
            value: config.image.innerBorderRadius,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'image.padding',
            type: 'slider',
            label: 'Padding',
            value: config.image.padding,
            min: 0,
            max: 8,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      // Blur Group
      {
        title: 'Backdrop',
        controls: [
          {
            id: 'image.backdropBlur',
            type: 'select',
            label: 'Backdrop Blur',
            value: config.image.backdropBlur,
            options: [...BACKDROP_BLUR_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildInteractionSection(config: LandingHeroConfig): Section {
  return {
    id: 'interaction',
    label: 'Interaction',
    title: 'Interactive States',
    groups: [
      // Click Group
      {
        title: 'Click Effect',
        controls: [
          {
            id: 'interaction.scaleOnClick',
            type: 'slider',
            label: 'Scale on Click',
            value: config.interaction.scaleOnClick,
            min: 0.8,
            max: 1,
            step: 0.05,
            formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
          },
        ],
      },
      // Hover Group
      {
        title: 'Hover Effect',
        controls: [
          {
            id: 'interaction.hoverShineIntense',
            type: 'toggle',
            label: 'Intense Shine on Hover',
            value: config.interaction.hoverShineIntense,
          },
        ],
      },
    ],
  }
}
