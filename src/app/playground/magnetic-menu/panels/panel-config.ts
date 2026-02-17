/**
 * Magnetic Menu Control Panel Configuration
 *
 * Builds the panel config for UnifiedControlPanel
 */

import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import { SEMANTIC_BG_COLORS } from '@/components/ui/patterns/control-panel'
import type { MagneticMenuConfig, MagneticMenuPresetMeta, ShadowIntensity } from '../config/types'
import { PULL_MODE_OPTIONS, PULL_DIRECTION_OPTIONS } from '../config/options'
import { SPRING_PRESETS, UNIFIED_HOVER_PRESETS } from '../config/presets'

// ============================================================================
// Hover Indicator Mode Options
// ============================================================================

const HOVER_INDICATOR_MODE_OPTIONS = [
  { label: 'Per-Item', value: 'per-item' },
  { label: 'Unified', value: 'unified' },
]

// ============================================================================
// Shadow Intensity Options
// ============================================================================

const SHADOW_OPTIONS: { label: string; value: ShadowIntensity }[] = [
  { label: 'None', value: 'none' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'X-Large', value: 'xl' },
  { label: '2X-Large', value: '2xl' },
]

// ============================================================================
// Pattern Type Options
// ============================================================================

const PATTERN_OPTIONS = [
  { label: 'Dots', value: 'dots' },
  { label: 'Grid', value: 'grid' },
  { label: 'Diagonal', value: 'diagonal' },
]

// ============================================================================
// Panel Builder
// ============================================================================

export function buildMagneticMenuPanelConfig(
  config: MagneticMenuConfig,
  presets: MagneticMenuPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildPullSection(config),
      ...(config.pullMode !== 'none' ? [buildAnimationSection(config)] : []),
      buildHoverSection(config),
      buildDisplaySection(config),
      buildBackgroundSection(config),
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

function buildPullSection(config: MagneticMenuConfig): Section {
  return {
    id: 'pull',
    label: 'Pull',
    title: 'Magnetic Pull',
    groups: [
      {
        title: 'Pull Mode',
        description: 'Which elements pull toward the cursor',
        controls: [
          {
            id: 'pullMode',
            type: 'select',
            label: 'Mode',
            value: config.pullMode,
            options: [...PULL_MODE_OPTIONS],
          },
        ],
      },
      ...(config.pullMode !== 'none'
        ? [
            {
              title: 'Pull Strength',
              controls: [
                {
                  id: 'pullStrength',
                  type: 'slider' as const,
                  label: 'Strength',
                  value: config.pullStrength,
                  min: 0.005,
                  max: 0.3,
                  step: 0.005,
                  formatLabel: (v: number) => {
                    const pct = v * 100
                    return pct < 1 ? `${pct.toFixed(1)}%` : `${pct.toFixed(0)}%`
                  },
                },
              ],
            },
            {
              title: 'Direction & Bounds',
              controls: [
                {
                  id: 'pullDirection',
                  type: 'select' as const,
                  label: 'Direction',
                  value: config.pullDirection,
                  options: [...PULL_DIRECTION_OPTIONS],
                },
                {
                  id: 'clampToParent',
                  type: 'toggle' as const,
                  label: 'Clamp to Container',
                  value: config.clampToParent,
                },
              ],
            },
          ]
        : []),
    ],
  }
}

function buildAnimationSection(config: MagneticMenuConfig): Section {
  // Find matching spring preset (if any)
  const matchingPreset = SPRING_PRESETS.find(
    (p) =>
      p.data.stiffness === config.animation.stiffness &&
      p.data.damping === config.animation.damping &&
      p.data.mass === config.animation.mass &&
      p.data.delay === config.animation.delay
  )

  return {
    id: 'animation',
    label: 'Animation',
    title: 'Spring Animation',
    groups: [
      {
        title: 'Preset',
        controls: [
          {
            id: 'springPreset',
            type: 'select' as const,
            label: 'Spring Preset',
            value: matchingPreset?.id ?? 'custom',
            options: [
              ...SPRING_PRESETS.map((p) => ({ label: p.name, value: p.id })),
              { label: 'Custom', value: 'custom' },
            ],
          },
        ],
      },
      {
        title: 'Spring Physics',
        description: 'Fine-tune the spring parameters',
        controls: [
          {
            id: 'animation.stiffness',
            type: 'slider' as const,
            label: 'Stiffness',
            value: config.animation.stiffness,
            min: 50,
            max: 500,
            step: 10,
            formatLabel: (v: number) => `${v}`,
          },
          {
            id: 'animation.damping',
            type: 'slider' as const,
            label: 'Damping',
            value: config.animation.damping,
            min: 5,
            max: 50,
            step: 1,
            formatLabel: (v: number) => `${v}`,
          },
          {
            id: 'animation.mass',
            type: 'slider' as const,
            label: 'Mass',
            value: config.animation.mass,
            min: 0.5,
            max: 3,
            step: 0.1,
            formatLabel: (v: number) => `${v.toFixed(1)}`,
          },
        ],
      },
      {
        title: 'Timing',
        controls: [
          {
            id: 'animation.delay',
            type: 'slider' as const,
            label: 'Response Delay',
            value: config.animation.delay,
            min: 0,
            max: 200,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
    ],
  }
}

function buildHoverSection(config: MagneticMenuConfig): Section {
  // Find matching unified hover preset
  const matchingUnifiedPreset = UNIFIED_HOVER_PRESETS.find(
    (p) =>
      p.data.stiffness === config.hoverIndicator.unified.stiffness &&
      p.data.damping === config.hoverIndicator.unified.damping &&
      p.data.mass === config.hoverIndicator.unified.mass
  )

  return {
    id: 'hover',
    label: 'Hover',
    title: 'Hover Appearance',
    groups: [
      {
        title: 'Indicator Mode',
        description: 'How the hover background transitions between items',
        controls: [
          {
            id: 'hoverIndicator.mode',
            type: 'select' as const,
            label: 'Mode',
            value: config.hoverIndicator.mode,
            options: HOVER_INDICATOR_MODE_OPTIONS,
          },
        ],
      },
      // Show unified spring controls only when in unified mode
      ...(config.hoverIndicator.mode === 'unified'
        ? [
            {
              title: 'Unified Animation',
              description: 'Spring physics for the gliding indicator',
              controls: [
                {
                  id: 'unifiedHoverPreset',
                  type: 'select' as const,
                  label: 'Preset',
                  value: matchingUnifiedPreset?.id ?? 'custom',
                  options: [
                    ...UNIFIED_HOVER_PRESETS.map((p) => ({ label: p.name, value: p.id })),
                    { label: 'Custom', value: 'custom' },
                  ],
                },
                {
                  id: 'hoverIndicator.unified.stiffness',
                  type: 'slider' as const,
                  label: 'Stiffness',
                  value: config.hoverIndicator.unified.stiffness,
                  min: 100,
                  max: 600,
                  step: 25,
                  formatLabel: (v: number) => `${v}`,
                },
                {
                  id: 'hoverIndicator.unified.damping',
                  type: 'slider' as const,
                  label: 'Damping',
                  value: config.hoverIndicator.unified.damping,
                  min: 10,
                  max: 50,
                  step: 1,
                  formatLabel: (v: number) => `${v}`,
                },
                {
                  id: 'hoverIndicator.unified.mass',
                  type: 'slider' as const,
                  label: 'Mass',
                  value: config.hoverIndicator.unified.mass,
                  min: 0.5,
                  max: 2,
                  step: 0.1,
                  formatLabel: (v: number) => `${v.toFixed(1)}`,
                },
              ],
            },
          ]
        : []),
      {
        title: 'Background',
        controls: [
          {
            id: 'hover.background',
            type: 'color-enhanced-select',
            label: 'Color',
            value: config.hover.background,
            options: SEMANTIC_BG_COLORS,
            swatchSize: 'md',
            showGroups: true,
          },
          {
            id: 'hover.backgroundOpacity',
            type: 'slider',
            label: 'Opacity',
            value: config.hover.backgroundOpacity,
            min: 0.5,
            max: 1,
            step: 0.05,
            formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
          },
        ],
      },
      {
        title: 'Shape',
        controls: [
          {
            id: 'hover.borderRadius',
            type: 'slider',
            label: 'Border Radius',
            value: config.hover.borderRadius,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

function buildDisplaySection(config: MagneticMenuConfig): Section {
  return {
    id: 'display',
    label: 'Display',
    title: 'Display Options',
    groups: [
      {
        title: 'Icons',
        controls: [
          {
            id: 'icons.show',
            type: 'toggle',
            label: 'Show Icons',
            value: config.icons.show,
          },
          ...(config.icons.show
            ? [
                {
                  id: 'icons.size',
                  type: 'slider' as const,
                  label: 'Size',
                  value: config.icons.size,
                  min: 14,
                  max: 24,
                  step: 1,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'icons.opacity',
                  type: 'slider' as const,
                  label: 'Opacity',
                  value: config.icons.opacity,
                  min: 0.3,
                  max: 1,
                  step: 0.05,
                  formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
                },
              ]
            : []),
        ],
      },
      {
        title: 'Shadow',
        controls: [
          {
            id: 'shadow.intensity',
            type: 'select',
            label: 'Intensity',
            value: config.shadow.intensity,
            options: SHADOW_OPTIONS,
          },
        ],
      },
    ],
  }
}

function buildBackgroundSection(config: MagneticMenuConfig): Section {
  return {
    id: 'background',
    label: 'Background',
    title: 'Background Decoration',
    groups: [
      {
        title: 'Blur Circle',
        controls: [
          {
            id: 'background.showBlurCircle',
            type: 'toggle',
            label: 'Show Blur Circle',
            value: config.background.showBlurCircle,
          },
          ...(config.background.showBlurCircle
            ? [
                {
                  id: 'background.blurCircleColor',
                  type: 'color-enhanced-select' as const,
                  label: 'Color',
                  value: config.background.blurCircleColor,
                  options: SEMANTIC_BG_COLORS,
                  swatchSize: 'md' as const,
                  showGroups: true,
                },
                {
                  id: 'background.blurCircleOpacity',
                  type: 'slider' as const,
                  label: 'Opacity',
                  value: config.background.blurCircleOpacity,
                  min: 0.1,
                  max: 1,
                  step: 0.05,
                  formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
                },
                {
                  id: 'background.blurCircleSize',
                  type: 'slider' as const,
                  label: 'Size',
                  value: config.background.blurCircleSize,
                  min: 100,
                  max: 600,
                  step: 25,
                  formatLabel: (v: number) => `${v}px`,
                },
                {
                  id: 'background.blurAmount',
                  type: 'slider' as const,
                  label: 'Blur',
                  value: config.background.blurAmount,
                  min: 20,
                  max: 150,
                  step: 10,
                  formatLabel: (v: number) => `${v}px`,
                },
              ]
            : []),
        ],
      },
      {
        title: 'Pattern',
        controls: [
          {
            id: 'background.showPattern',
            type: 'toggle',
            label: 'Show Pattern',
            value: config.background.showPattern,
          },
          ...(config.background.showPattern
            ? [
                {
                  id: 'background.patternType',
                  type: 'select' as const,
                  label: 'Type',
                  value: config.background.patternType,
                  options: PATTERN_OPTIONS,
                },
                {
                  id: 'background.patternOpacity',
                  type: 'slider' as const,
                  label: 'Opacity',
                  value: config.background.patternOpacity,
                  min: 0.01,
                  max: 0.2,
                  step: 0.01,
                  formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
                },
              ]
            : []),
        ],
      },
    ],
  }
}
