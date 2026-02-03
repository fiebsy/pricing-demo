/**
 * Character Avatars - Panel Configuration
 */

import type { PanelConfig } from '@/components/ui/patterns/control-panel'
import type { CharacterAvatarsConfig, CharacterAvatarsPresetMeta } from '../config/types'

export function buildPanelConfig(
  config: CharacterAvatarsConfig,
  presets: CharacterAvatarsPresetMeta[],
  activePresetId: string | null,
): PanelConfig {
  return {
    title: 'Character Avatars',
    showReset: true,
    resetLabel: 'Reset',
    presetConfig: {
      presets: presets.map((p) => ({ id: p.id, name: p.name, data: p.data })),
      activePresetId,
      showCopyButton: true,
    },
    sections: [
      {
        id: 'display',
        label: 'Display',
        title: 'Display Options',
        groups: [
          {
            title: 'Filter',
            controls: [
              {
                id: 'realmFilter',
                type: 'select',
                label: 'Realm',
                value: config.realmFilter,
                options: [
                  { label: 'All', value: 'all' },
                  { label: 'Marvel', value: 'marvel' },
                  { label: 'Anime', value: 'anime' },
                  { label: 'Westeros', value: 'westeros' },
                ],
              },
            ],
          },
          {
            title: 'Shape',
            controls: [
              {
                id: 'shape',
                type: 'select',
                label: 'Shape',
                value: config.shape,
                options: [
                  { label: 'Rounded Rect', value: 'rounded' },
                  { label: 'Circle', value: 'circle' },
                ],
              },
            ],
          },
          {
            title: 'Labels',
            controls: [
              {
                id: 'showLabel',
                type: 'toggle' as const,
                label: 'Show name',
                value: config.showLabel,
              },
              ...(config.showLabel
                ? [
                    {
                      id: 'labelGap',
                      type: 'inline-slider' as const,
                      label: 'Label gap',
                      value: config.labelGap,
                      min: 0,
                      max: 24,
                      step: 1,
                      formatLabel: (v: number) => `${v}px`,
                    },
                  ]
                : []),
              {
                id: 'showBadge',
                type: 'toggle' as const,
                label: 'Faction badge',
                value: config.showBadge,
              },
            ],
          },
        ],
      },
      {
        id: 'sizing',
        label: 'Size',
        title: 'Avatar Size',
        groups: [
          {
            title: 'Dimensions',
            controls: [
              {
                id: 'width',
                type: 'inline-slider',
                label: 'Width',
                value: config.width,
                min: 12,
                max: 120,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'height',
                type: 'inline-slider',
                label: 'Height',
                value: config.height,
                min: 12,
                max: 120,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              ...(config.shape === 'rounded'
                ? [
                    {
                      id: 'borderRadius',
                      type: 'inline-slider' as const,
                      label: 'Radius',
                      value: config.borderRadius,
                      min: 0,
                      max: 32,
                      step: 1,
                      formatLabel: (v: number) => `${v}px`,
                    },
                  ]
                : []),
            ],
          },
        ],
      },
      {
        id: 'layout',
        label: 'Layout',
        title: 'Grid Layout',
        groups: [
          {
            title: 'Grid',
            controls: [
              {
                id: 'columns',
                type: 'inline-slider',
                label: 'Columns',
                value: config.columns,
                min: 1,
                max: 16,
                step: 1,
              },
              {
                id: 'gap',
                type: 'inline-slider',
                label: 'Gap',
                value: config.gap,
                min: 4,
                max: 48,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'paddingX',
                type: 'inline-slider',
                label: 'Padding X',
                value: config.paddingX,
                min: 0,
                max: 64,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'paddingY',
                type: 'inline-slider',
                label: 'Padding Y',
                value: config.paddingY,
                min: 0,
                max: 64,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
        ],
      },
    ],
  }
}
