import type { UnifiedControlPanelProps } from '@/components/ui/patterns/control-panel'
import type { PlaygroundConfig } from '../config/types'
import {
  EASING_OPTIONS,
  SQUARE_A_COLOR_OPTIONS,
  SQUARE_B_COLOR_OPTIONS,
  PAGE_BACKGROUND_OPTIONS,
} from '../config/options'

type UnifiedControlPanelConfig = UnifiedControlPanelProps['config']

export function createPanelConfig(config: PlaygroundConfig): UnifiedControlPanelConfig {
  // Build spring or tween groups based on animation type
  const animationGroups =
    config.animationType === 'spring'
      ? [
          {
            title: 'Spring Preset',
            controls: [
              {
                id: 'springPreset',
                type: 'select' as const,
                label: 'Preset',
                value: config.springPreset,
                options: [
                  { value: 'smooth', label: 'Smooth' },
                  { value: 'snappy', label: 'Snappy' },
                  { value: 'soft', label: 'Soft' },
                  { value: 'bouncy', label: 'Bouncy' },
                  { value: 'custom', label: 'Custom' },
                ],
              },
            ],
          },
          {
            title: 'Spring Settings',
            controls: [
              {
                id: 'springStiffness',
                type: 'slider' as const,
                label: 'Stiffness',
                value: config.springStiffness,
                min: 100,
                max: 800,
                step: 25,
                formatLabel: (v: number) => `${v}`,
              },
              {
                id: 'springDamping',
                type: 'slider' as const,
                label: 'Damping',
                value: config.springDamping,
                min: 5,
                max: 60,
                step: 1,
                formatLabel: (v: number) => `${v}`,
              },
              {
                id: 'springMass',
                type: 'slider' as const,
                label: 'Mass',
                value: config.springMass,
                min: 0.5,
                max: 3,
                step: 0.1,
                formatLabel: (v: number) => `${v.toFixed(1)}`,
              },
            ],
          },
        ]
      : [
          {
            title: 'Easing',
            controls: [
              {
                id: 'tweenEase',
                type: 'select' as const,
                label: 'Easing',
                value: config.tweenEase,
                options: EASING_OPTIONS,
              },
            ],
          },
          {
            title: 'Timing',
            controls: [
              {
                id: 'tweenDuration',
                type: 'slider' as const,
                label: 'Duration',
                value: config.tweenDuration,
                min: 100,
                max: 800,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
        ]

  return {
    sections: [
      {
        id: 'animation',
        title: 'Animation',
        tabLabel: config.animationType === 'spring' ? 'Spring' : 'Tween',
        groups: [
          {
            title: 'Config Preset',
            controls: [
              {
                id: 'configPreset',
                type: 'select',
                label: 'Preset',
                value: config.configPreset,
                options: [
                  { value: 'default', label: 'Default (Balanced)' },
                  { value: 'snappy', label: 'Snappy (Quick)' },
                  { value: 'bouncy', label: 'Bouncy (Playful)' },
                  { value: 'smooth', label: 'Smooth (Tween)' },
                  { value: 'custom', label: 'Custom' },
                ],
              },
            ],
          },
          {
            title: 'Animation Type',
            controls: [
              {
                id: 'animationType',
                type: 'select',
                label: 'Type',
                value: config.animationType,
                options: [
                  { value: 'spring', label: 'Spring (Physics)' },
                  { value: 'tween', label: 'Tween (Duration)' },
                ],
              },
            ],
          },
          ...animationGroups,
        ],
      },
      {
        id: 'squareB',
        title: 'Square B Animation',
        tabLabel: 'Square B',
        groups: [
          {
            title: 'Timing',
            controls: [
              {
                id: 'squareBEntryDelay',
                type: 'slider',
                label: 'Entry Delay',
                value: config.squareBEntryDelay,
                min: 0,
                max: 300,
                step: 10,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'squareBEntryDuration',
                type: 'slider',
                label: 'Entry Duration',
                value: config.squareBEntryDuration,
                min: 50,
                max: 500,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'squareBExitDuration',
                type: 'slider',
                label: 'Exit Duration',
                value: config.squareBExitDuration,
                min: 50,
                max: 400,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
          {
            title: 'Entry Appearance',
            controls: [
              {
                id: 'squareBEntryScale',
                type: 'slider',
                label: 'Initial Scale',
                value: config.squareBEntryScale,
                min: 0.5,
                max: 1,
                step: 0.05,
                formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
              },
              {
                id: 'squareBEntryOpacity',
                type: 'slider',
                label: 'Initial Opacity',
                value: config.squareBEntryOpacity,
                min: 0,
                max: 1,
                step: 0.1,
                formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
              },
            ],
          },
        ],
      },
      {
        id: 'layout',
        title: 'Layout',
        tabLabel: 'Layout',
        groups: [
          {
            title: 'Containers',
            controls: [
              {
                id: 'containerCount',
                type: 'slider',
                label: 'Count',
                value: config.containerCount,
                min: 2,
                max: 6,
                step: 1,
                formatLabel: (v: number) => `${v}`,
              },
              {
                id: 'containerGap',
                type: 'slider',
                label: 'Gap Between',
                value: config.containerGap,
                min: 4,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'maxContainerWidth',
                type: 'slider',
                label: 'Max Width',
                value: config.maxContainerWidth,
                min: 400,
                max: 1200,
                step: 50,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Squares',
            controls: [
              {
                id: 'squareASize',
                type: 'slider',
                label: 'Square A Size',
                value: config.squareASize,
                min: 40,
                max: 120,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'squareBSize',
                type: 'slider',
                label: 'Square B Size',
                value: config.squareBSize,
                min: 40,
                max: 120,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'gap',
                type: 'slider',
                label: 'A-B Gap',
                value: config.gap,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
        ],
      },
      {
        id: 'appearance',
        title: 'Appearance',
        tabLabel: 'Style',
        groups: [
          {
            title: 'Colors',
            controls: [
              {
                id: 'squareAColor',
                type: 'select',
                label: 'Square A',
                value: config.squareAColor,
                options: [...SQUARE_A_COLOR_OPTIONS],
              },
              {
                id: 'squareBColor',
                type: 'select',
                label: 'Square B',
                value: config.squareBColor,
                options: [...SQUARE_B_COLOR_OPTIONS],
              },
              {
                id: 'pageBackground',
                type: 'select',
                label: 'Background',
                value: config.pageBackground,
                options: [...PAGE_BACKGROUND_OPTIONS],
              },
            ],
          },
          {
            title: 'Border Radius',
            controls: [
              {
                id: 'squareBorderRadius',
                type: 'slider',
                label: 'Squares',
                value: config.squareBorderRadius,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'containerBorderRadius',
                type: 'slider',
                label: 'Container',
                value: config.containerBorderRadius,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Display',
            controls: [
              {
                id: 'showContainerBorder',
                type: 'toggle',
                label: 'Container Border',
                value: config.showContainerBorder,
              },
              {
                id: 'showSquareLabels',
                type: 'toggle',
                label: 'Square Labels',
                value: config.showSquareLabels,
              },
            ],
          },
        ],
      },
      {
        id: 'debug',
        title: 'Debug',
        tabLabel: 'Debug',
        groups: [
          {
            title: 'Inspection',
            controls: [
              {
                id: 'showDebug',
                type: 'toggle',
                label: 'Debug Info',
                value: config.showDebug,
              },
              {
                id: 'slowMoEnabled',
                type: 'toggle',
                label: 'Slow-Mo (0.1x)',
                value: config.slowMoEnabled,
              },
              {
                id: 'reduceMotion',
                type: 'toggle',
                label: 'Reduce Motion',
                value: config.reduceMotion,
              },
            ],
          },
        ],
      },
    ],
    defaultActiveTab: 'animation',
    position: {
      top: '16px',
      bottom: '16px',
      right: '16px',
      width: '320px',
    },
    showReset: true,
    resetLabel: 'Reset All',
  }
}
