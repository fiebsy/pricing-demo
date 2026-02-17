/**
 * Filter Menu Control Panel Configuration
 *
 * Builds the panel config for UnifiedControlPanel
 */

import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import type { FilterMenuConfig, FilterMenuPresetMeta } from '../config/types'
import {
  TRIGGER_MODE_OPTIONS,
  TRIGGER_VARIANT_OPTIONS,
  TRIGGER_SIZE_OPTIONS,
  TRIGGER_ROUNDED_OPTIONS,
  TRIGGER_ICON_OPTIONS,
  MENU_SIDE_OPTIONS,
  MENU_ALIGN_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  SHADOW_OPTIONS,
  SHINE_OPTIONS,
  BACKGROUND_OPTIONS,
  GRADIENT_OPTIONS,
  SPRING_PRESET_OPTIONS,
} from '../config/options'

// ============================================================================
// Panel Builder
// ============================================================================

export function buildFilterMenuPanelConfig(
  config: FilterMenuConfig,
  presets: FilterMenuPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildTriggerSection(config),
      buildMenuSection(config),
      buildAppearanceSection(config),
      buildAnimationSection(config),
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

function buildTriggerSection(config: FilterMenuConfig): Section {
  return {
    id: 'trigger',
    label: 'Trigger',
    title: 'Trigger Button',
    groups: [
      {
        title: 'Display Mode',
        controls: [
          {
            id: 'trigger.mode',
            type: 'select',
            label: 'Mode',
            value: config.trigger.mode,
            options: [...TRIGGER_MODE_OPTIONS],
          },
          {
            id: 'trigger.label',
            type: 'text',
            label: 'Label',
            value: config.trigger.label,
            placeholder: 'Button text...',
          },
        ],
      },
      {
        title: 'Appearance',
        controls: [
          {
            id: 'trigger.icon',
            type: 'select',
            label: 'Icon',
            value: config.trigger.icon,
            options: [...TRIGGER_ICON_OPTIONS],
          },
          {
            id: 'trigger.variant',
            type: 'select',
            label: 'Variant',
            value: config.trigger.variant,
            options: [...TRIGGER_VARIANT_OPTIONS],
          },
          {
            id: 'trigger.size',
            type: 'select',
            label: 'Size',
            value: config.trigger.size,
            options: [...TRIGGER_SIZE_OPTIONS],
          },
          {
            id: 'trigger.rounded',
            type: 'select',
            label: 'Rounded',
            value: config.trigger.rounded,
            options: [...TRIGGER_ROUNDED_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildMenuSection(config: FilterMenuConfig): Section {
  return {
    id: 'menu',
    label: 'Menu',
    title: 'Menu Layout',
    groups: [
      {
        title: 'Position',
        controls: [
          {
            id: 'menu.side',
            type: 'select',
            label: 'Side',
            value: config.menu.side,
            options: [...MENU_SIDE_OPTIONS],
          },
          {
            id: 'menu.align',
            type: 'select',
            label: 'Align',
            value: config.menu.align,
            options: [...MENU_ALIGN_OPTIONS],
          },
        ],
      },
      {
        title: 'Offset',
        controls: [
          {
            id: 'menu.sideOffset',
            type: 'slider',
            label: 'Side Offset',
            value: config.menu.sideOffset,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'menu.alignOffset',
            type: 'slider',
            label: 'Align Offset',
            value: config.menu.alignOffset,
            min: -24,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'menu.width',
            type: 'slider',
            label: 'Width',
            value: config.menu.width,
            min: 180,
            max: 360,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Options',
        controls: [
          {
            id: 'menu.showHeader',
            type: 'toggle',
            label: 'Show Header',
            value: config.menu.showHeader,
          },
        ],
      },
    ],
  }
}

function buildAppearanceSection(config: FilterMenuConfig): Section {
  return {
    id: 'appearance',
    label: 'Style',
    title: 'Menu Appearance',
    groups: [
      {
        title: 'Background',
        controls: [
          {
            id: 'menu.appearance.background',
            type: 'select',
            label: 'Background',
            value: config.menu.appearance.background ?? 'secondary',
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'menu.appearance.gradient',
            type: 'select',
            label: 'Gradient',
            value: config.menu.appearance.gradient ?? 'none',
            options: [...GRADIENT_OPTIONS],
          },
        ],
      },
      {
        title: 'Effects',
        controls: [
          {
            id: 'menu.appearance.shine',
            type: 'select',
            label: 'Shine',
            value: config.menu.appearance.shine ?? 'none',
            options: [...SHINE_OPTIONS],
          },
          {
            id: 'menu.appearance.shadow',
            type: 'select',
            label: 'Shadow',
            value: config.menu.appearance.shadow ?? 'lg',
            options: [...SHADOW_OPTIONS],
          },
        ],
      },
      {
        title: 'Shape',
        controls: [
          {
            id: 'menu.appearance.borderRadius',
            type: 'select',
            label: 'Border Radius',
            value: config.menu.appearance.borderRadius ?? 'xl',
            options: [...BORDER_RADIUS_OPTIONS],
          },
          {
            id: 'menu.appearance.squircle',
            type: 'toggle',
            label: 'Squircle Corners',
            value: config.menu.appearance.squircle ?? false,
          },
        ],
      },
    ],
  }
}

function buildAnimationSection(config: FilterMenuConfig): Section {
  const springPreset = config.animation.springPreset ?? 'default'
  const isCustomSpring = springPreset === 'custom'

  return {
    id: 'animation',
    label: 'Animation',
    title: 'Spring Animation',
    groups: [
      // Spring Preset
      {
        title: 'Spring Preset',
        controls: [
          {
            id: 'animation.springPreset',
            type: 'select',
            label: 'Preset',
            value: springPreset,
            options: [...SPRING_PRESET_OPTIONS],
          },
        ],
      },
      // Custom Spring Parameters (shown when preset === 'custom')
      ...(isCustomSpring ? [{
        title: 'Spring Parameters',
        controls: [
          {
            id: 'animation.springStiffness',
            type: 'slider' as const,
            label: 'Stiffness',
            value: config.animation.springStiffness ?? 650,
            min: 100,
            max: 1000,
            step: 25,
            formatLabel: (v: number) => `${v}`,
          },
          {
            id: 'animation.springDamping',
            type: 'slider' as const,
            label: 'Damping',
            value: config.animation.springDamping ?? 38,
            min: 5,
            max: 60,
            step: 1,
            formatLabel: (v: number) => `${v}`,
          },
          {
            id: 'animation.springMass',
            type: 'slider' as const,
            label: 'Mass',
            value: config.animation.springMass ?? 0.9,
            min: 0.5,
            max: 3,
            step: 0.1,
            formatLabel: (v: number) => `${v.toFixed(1)}`,
          },
        ],
      }] : []),
      // Opacity Settings
      {
        title: 'Crossfade',
        controls: [
          {
            id: 'animation.syncOpacityToSpring',
            type: 'toggle',
            label: 'Sync to Spring',
            value: config.animation.syncOpacityToSpring ?? false,
          },
          ...(!(config.animation.syncOpacityToSpring ?? false) ? [
            {
              id: 'animation.opacityDuration',
              type: 'slider' as const,
              label: 'Fade In Duration',
              value: config.animation.opacityDuration ?? 220,
              min: 100,
              max: 400,
              step: 10,
              formatLabel: (v: number) => `${v}ms`,
            },
            {
              id: 'animation.quickOutDuration',
              type: 'slider' as const,
              label: 'Fade Out Duration',
              value: config.animation.quickOutDuration ?? 80,
              min: 0,
              max: 150,
              step: 10,
              formatLabel: (v: number) => `${v}ms`,
            },
          ] : []),
          {
            id: 'animation.blurOnFade',
            type: 'toggle',
            label: 'Blur on Fade',
            value: config.animation.blurOnFade ?? false,
          },
          ...((config.animation.blurOnFade ?? false) ? [
            {
              id: 'animation.blurAmount',
              type: 'slider' as const,
              label: 'Blur Amount',
              value: config.animation.blurAmount ?? 4,
              min: 1,
              max: 8,
              step: 1,
              formatLabel: (v: number) => `${v}px`,
            },
          ] : []),
        ],
      },
      // Reveal Animation
      {
        title: 'Reveal Animation',
        controls: [
          {
            id: 'animation.animateOnClose',
            type: 'toggle',
            label: 'Animate on Close',
            value: config.animation.animateOnClose ?? true,
          },
          {
            id: 'animation.revealDuration',
            type: 'slider',
            label: 'Duration',
            value: config.animation.revealDuration ?? 200,
            min: 50,
            max: 500,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'animation.revealScale',
            type: 'slider',
            label: 'Scale',
            value: config.animation.revealScale ?? 0.4,
            min: 0.1,
            max: 1.0,
            step: 0.1,
            formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
          },
          {
            id: 'animation.revealSlideRatio',
            type: 'slider',
            label: 'Slide Ratio',
            value: config.animation.revealSlideRatio ?? 0.5,
            min: 0,
            max: 1.0,
            step: 0.1,
            formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
          },
        ],
      },
      // Options
      {
        title: 'Options',
        controls: [
          {
            id: 'animation.animateHeight',
            type: 'toggle',
            label: 'Animate Height',
            value: config.animation.animateHeight ?? true,
          },
        ],
      },
    ],
  }
}
