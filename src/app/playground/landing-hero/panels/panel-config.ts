/**
 * Landing Hero Control Panel Configuration
 *
 * Builds the panel config for UnifiedControlPanel
 */

import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import type { LandingHeroConfig, LandingHeroPresetMeta } from '../config/types'
import {
  MEDIA_TYPE_OPTIONS,
  HERO_SIZE_OPTIONS,
  PATTERN_TYPE_OPTIONS,
  GLOW_COLOR_OPTIONS,
  GLOW_POSITION_OPTIONS,
  GLOW_SHAPE_OPTIONS,
  SHINE_TYPE_OPTIONS,
  SHINE_INTENSITY_OPTIONS,
  SHADOW_SIZE_OPTIONS,
  CORNER_STYLE_OPTIONS,
  BACKDROP_BLUR_OPTIONS,
  SQUIRCLE_LEVEL_OPTIONS,
  TEXT_SIZE_OPTIONS,
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
      buildTextSection(config),
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
                  max: 600,
                  step: 20,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'background.glowOpacity',
                  type: 'slider' as const,
                  label: 'Opacity',
                  value: config.background.glowOpacity,
                  min: 0,
                  max: 1,
                  step: 0.05,
                  formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
                },
                {
                  id: 'background.glowSpread',
                  type: 'slider' as const,
                  label: 'Spread',
                  value: config.background.glowSpread,
                  min: 20,
                  max: 100,
                  step: 5,
                  formatLabel: (v: number) => `${v}%`,
                },
                {
                  id: 'background.glowBlur',
                  type: 'slider' as const,
                  label: 'Blur',
                  value: config.background.glowBlur,
                  min: 0,
                  max: 50,
                  step: 2,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
        ],
      },
      // Secondary Blob Group
      {
        title: 'Secondary Blob',
        controls: [
          {
            id: 'background.showSecondaryBlob',
            type: 'toggle',
            label: 'Show Secondary Blob',
            value: config.background.showSecondaryBlob,
          },
          ...(config.background.showSecondaryBlob
            ? [
                {
                  id: 'background.secondaryBlobColor',
                  type: 'select' as const,
                  label: 'Color',
                  value: config.background.secondaryBlobColor,
                  options: [...GLOW_COLOR_OPTIONS],
                },
                {
                  id: 'background.secondaryBlobSize',
                  type: 'slider' as const,
                  label: 'Size',
                  value: config.background.secondaryBlobSize,
                  min: 50,
                  max: 400,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'background.secondaryBlobOpacity',
                  type: 'slider' as const,
                  label: 'Opacity',
                  value: config.background.secondaryBlobOpacity,
                  min: 0,
                  max: 1,
                  step: 0.05,
                  formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
                },
                {
                  id: 'background.secondaryBlobSpread',
                  type: 'slider' as const,
                  label: 'Spread',
                  value: config.background.secondaryBlobSpread,
                  min: 20,
                  max: 100,
                  step: 5,
                  formatLabel: (v: number) => `${v}%`,
                },
                {
                  id: 'background.secondaryBlobBlur',
                  type: 'slider' as const,
                  label: 'Blur',
                  value: config.background.secondaryBlobBlur,
                  min: 0,
                  max: 50,
                  step: 2,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'background.secondaryBlobOffsetX',
                  type: 'slider' as const,
                  label: 'Offset X',
                  value: config.background.secondaryBlobOffsetX,
                  min: -200,
                  max: 200,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'background.secondaryBlobOffsetY',
                  type: 'slider' as const,
                  label: 'Offset Y',
                  value: config.background.secondaryBlobOffsetY,
                  min: -200,
                  max: 200,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
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
    label: 'Media',
    title: 'Media Container',
    groups: [
      // Media Type Group
      {
        title: 'Media Type',
        controls: [
          {
            id: 'image.mediaType',
            type: 'select',
            label: 'Type',
            value: config.image.mediaType,
            options: [...MEDIA_TYPE_OPTIONS],
          },
          {
            id: 'image.size',
            type: 'select',
            label: 'Size',
            value: config.image.size,
            options: [...HERO_SIZE_OPTIONS],
          },
        ],
      },
      // Shine Layers Group
      {
        title: 'Shine Layers',
        controls: [
          // Layer 1
          {
            id: 'image.shines.0.type',
            type: 'select',
            label: 'Layer 1 Type',
            value: config.image.shines[0]?.type ?? 'none',
            options: [...SHINE_TYPE_OPTIONS],
          },
          ...(config.image.shines[0]?.type && config.image.shines[0].type !== 'none'
            ? [
                {
                  id: 'image.shines.0.intensity',
                  type: 'select' as const,
                  label: 'Layer 1 Intensity',
                  value: config.image.shines[0]?.intensity ?? '',
                  options: [...SHINE_INTENSITY_OPTIONS],
                },
              ]
            : []),
          // Layer 2
          {
            id: 'image.shines.1.type',
            type: 'select',
            label: 'Layer 2 Type',
            value: config.image.shines[1]?.type ?? 'none',
            options: [...SHINE_TYPE_OPTIONS],
          },
          ...(config.image.shines[1]?.type && config.image.shines[1].type !== 'none'
            ? [
                {
                  id: 'image.shines.1.intensity',
                  type: 'select' as const,
                  label: 'Layer 2 Intensity',
                  value: config.image.shines[1]?.intensity ?? '',
                  options: [...SHINE_INTENSITY_OPTIONS],
                },
              ]
            : []),
          // Layer 3
          {
            id: 'image.shines.2.type',
            type: 'select',
            label: 'Layer 3 Type',
            value: config.image.shines[2]?.type ?? 'none',
            options: [...SHINE_TYPE_OPTIONS],
          },
          ...(config.image.shines[2]?.type && config.image.shines[2].type !== 'none'
            ? [
                {
                  id: 'image.shines.2.intensity',
                  type: 'select' as const,
                  label: 'Layer 3 Intensity',
                  value: config.image.shines[2]?.intensity ?? '',
                  options: [...SHINE_INTENSITY_OPTIONS],
                },
              ]
            : []),
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
            max: 200,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'image.innerBorderRadius',
            type: 'slider',
            label: 'Inner Radius',
            value: config.image.innerBorderRadius,
            min: 0,
            max: 200,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'image.squircleLevel',
            type: 'select',
            label: 'Squircle Level',
            value: config.image.squircleLevel,
            options: [...SQUIRCLE_LEVEL_OPTIONS],
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

function buildTextSection(config: LandingHeroConfig): Section {
  const showPressControls = config.text.animateOnPress

  return {
    id: 'text',
    label: 'Text',
    title: 'Text Styling',
    groups: [
      // Text Style Group
      {
        title: 'Text Style',
        controls: [
          {
            id: 'text.size',
            type: 'select',
            label: 'Size',
            value: config.text.size,
            options: [...TEXT_SIZE_OPTIONS],
          },
        ],
      },
      // Press Animation Group
      {
        title: 'Press Animation',
        controls: [
          {
            id: 'text.animateOnPress',
            type: 'toggle',
            label: 'Animate on Press',
            value: config.text.animateOnPress,
          },
          // Conditional animation controls
          ...(showPressControls
            ? [
                {
                  id: 'text.pressScaleX',
                  type: 'slider' as const,
                  label: 'Scale X',
                  value: config.text.pressScaleX,
                  min: 0.8,
                  max: 1.2,
                  step: 0.01,
                  formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
                },
                {
                  id: 'text.pressScaleY',
                  type: 'slider' as const,
                  label: 'Scale Y',
                  value: config.text.pressScaleY,
                  min: 0.8,
                  max: 1.2,
                  step: 0.01,
                  formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
                },
                {
                  id: 'text.pressOffsetY',
                  type: 'slider' as const,
                  label: 'Offset Y (Pull)',
                  value: config.text.pressOffsetY,
                  min: 0,
                  max: 10,
                  step: 1,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
        ],
      },
    ],
  }
}
