/**
 * Modal V2 Control Panel Configuration
 *
 * Simplified panel config with flat structure.
 */

import type { PanelConfig, Control, Section } from '@/components/ui/patterns/control-panel'
import type { ModalV2Config, ModalV2PresetMeta } from '../config/types'

// ============================================================================
// Build Panel Config
// ============================================================================

export function buildModalV2PanelConfig(
  config: ModalV2Config,
  presets: ModalV2PresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    title: 'Modal V2',
    presetConfig: {
      presets: presets.map((p) => ({
        id: p.id,
        name: p.name,
        data: p.data,
      })),
      activePresetId,
      showCopyButton: true,
      copyLabel: 'Copy Config',
    },
    sections: [
      // Appearance Section
      {
        id: 'appearance',
        label: 'Appearance',
        title: 'Appearance',
        groups: [
          {
            controls: [
              {
                id: 'appearance.width',
                type: 'slider',
                label: 'Width',
                value: config.appearance.width,
                min: 320,
                max: 500,
                step: 8,
              },
              {
                id: 'appearance.padding',
                type: 'slider',
                label: 'Padding',
                value: config.appearance.padding,
                min: 12,
                max: 40,
                step: 4,
              },
              {
                id: 'appearance.gap',
                type: 'slider',
                label: 'Gap',
                value: config.appearance.gap,
                min: 8,
                max: 32,
                step: 4,
              },
              {
                id: 'appearance.borderRadius',
                type: 'slider',
                label: 'Border Radius',
                value: config.appearance.borderRadius,
                min: 0,
                max: 32,
                step: 4,
              },
              {
                id: 'appearance.background',
                type: 'select',
                label: 'Background',
                value: config.appearance.background,
                options: [
                  { value: 'primary', label: 'Primary' },
                  { value: 'secondary', label: 'Secondary' },
                  { value: 'tertiary', label: 'Tertiary' },
                ],
              },
              {
                id: 'appearance.shine',
                type: 'select',
                label: 'Shine',
                value: config.appearance.shine,
                options: [
                  { value: 'none', label: 'None' },
                  { value: 'shine-0', label: 'Shine 0' },
                  { value: 'shine-0-subtle', label: 'Shine 0 Subtle' },
                  { value: 'shine-1', label: 'Shine 1' },
                  { value: 'shine-1-subtle', label: 'Shine 1 Subtle' },
                  { value: 'shine-2', label: 'Shine 2' },
                  { value: 'shine-3', label: 'Shine 3' },
                ],
              },
              {
                id: 'appearance.depth',
                type: 'select',
                label: 'Depth',
                value: config.appearance.depth,
                options: [
                  { value: 'none', label: 'None' },
                  { value: 'depth-gradient-1', label: 'Depth 1' },
                  { value: 'depth-gradient-2', label: 'Depth 2' },
                  { value: 'depth-gradient-3', label: 'Depth 3' },
                ],
              },
              {
                id: 'appearance.shadow',
                type: 'select',
                label: 'Shadow',
                value: config.appearance.shadow,
                options: [
                  { value: 'none', label: 'None' },
                  { value: 'sm', label: 'Small' },
                  { value: 'md', label: 'Medium' },
                  { value: 'lg', label: 'Large' },
                  { value: 'xl', label: 'X-Large' },
                ],
              },
            ] as Control[],
          },
        ],
      },

      // Animation Section
      {
        id: 'animation',
        label: 'Animation',
        title: 'Animation',
        groups: [
          {
            controls: [
              {
                id: 'animation.duration',
                type: 'slider',
                label: 'Duration',
                value: config.animation.duration,
                min: 0.1,
                max: 0.8,
                step: 0.05,
              },
              {
                id: 'animation.bounce',
                type: 'slider',
                label: 'Bounce',
                value: config.animation.bounce,
                min: 0,
                max: 0.5,
                step: 0.02,
              },
              {
                id: 'animation.stagger',
                type: 'slider',
                label: 'Stagger',
                value: config.animation.stagger,
                min: 0,
                max: 0.1,
                step: 0.005,
              },
            ] as Control[],
          },
        ],
      },

      // Buttons Section
      {
        id: 'buttons',
        label: 'Buttons',
        title: 'Buttons',
        groups: [
          {
            controls: [
              {
                id: 'buttons.fluid.enabled',
                type: 'toggle',
                label: 'Fluid Layout',
                value: config.buttons.fluid.enabled,
              },
              {
                id: 'buttons.fluid.timing',
                type: 'select',
                label: 'Timing',
                value: config.buttons.fluid.timing,
                options: [
                  { value: 'default', label: 'Default' },
                  { value: 'snappy', label: 'Snappy' },
                  { value: 'smooth', label: 'Smooth' },
                  { value: 'synced', label: 'Synced' },
                ],
              },
              {
                id: 'buttons.fluid.checkmarkStyle',
                type: 'select',
                label: 'Checkmark Style',
                value: config.buttons.fluid.checkmarkStyle,
                options: [
                  { value: 'draw', label: 'Draw' },
                  { value: 'flip', label: 'Flip' },
                ],
              },
              {
                id: 'buttons.cornerSquircle',
                type: 'toggle',
                label: 'Squircle Corners',
                value: config.buttons.cornerSquircle,
              },
            ] as Control[],
          },
        ],
      },

      // Pro Card Section
      {
        id: 'proCard',
        label: 'Pro Card',
        title: 'Pro Card',
        groups: [
          {
            controls: [
              {
                id: 'proCard.height',
                type: 'slider',
                label: 'Height',
                value: config.proCard.height,
                min: 40,
                max: 160,
                step: 8,
              },
              {
                id: 'proCard.titleGradient',
                type: 'select',
                label: 'Title Style',
                value: config.proCard.titleGradient,
                options: [
                  { value: 'text-primary', label: 'Primary' },
                  { value: 'text-secondary', label: 'Secondary' },
                  { value: 'arcade-blue', label: 'Arcade Blue' },
                  { value: 'ocean-depth', label: 'Ocean Depth' },
                  { value: 'frost', label: 'Frost' },
                  { value: 'electric', label: 'Electric' },
                ],
              },
              {
                id: 'proCard.multiplierGradient',
                type: 'select',
                label: 'Multiplier Style',
                value: config.proCard.multiplierGradient,
                options: [
                  { value: 'text-primary', label: 'Primary' },
                  { value: 'text-secondary', label: 'Secondary' },
                  { value: 'arcade-blue', label: 'Arcade Blue' },
                  { value: 'ocean-depth', label: 'Ocean Depth' },
                  { value: 'frost', label: 'Frost' },
                  { value: 'electric', label: 'Electric' },
                ],
              },
              {
                id: 'proCard.glowEnabled',
                type: 'toggle',
                label: 'Glow Effect',
                value: config.proCard.glowEnabled,
              },
            ] as Control[],
          },
        ],
      },

      // Demo Section
      {
        id: 'demo',
        label: 'Demo',
        title: 'Demo',
        groups: [
          {
            controls: [
              {
                id: 'demo.slowMo',
                type: 'toggle',
                label: 'Slow Motion',
                value: config.demo.slowMo,
              },
              {
                id: 'demo.autoOpen',
                type: 'toggle',
                label: 'Auto Open',
                value: config.demo.autoOpen,
              },
              {
                id: 'demo.pageBackground',
                type: 'select',
                label: 'Page Background',
                value: config.demo.pageBackground,
                options: [
                  { value: 'primary', label: 'Primary' },
                  { value: 'secondary', label: 'Secondary' },
                  { value: 'tertiary', label: 'Tertiary' },
                ],
              },
            ] as Control[],
          },
        ],
      },
    ] as Section[],
  }
}
