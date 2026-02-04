import type { UnifiedControlPanelProps } from '@/components/ui/patterns/control-panel'
import type { PlaygroundConfig } from '../config/types'
import {
  CSS_EASING_OPTIONS,
  SQUARE_A_COLOR_OPTIONS,
  SQUARE_B_COLOR_OPTIONS,
  PAGE_BACKGROUND_OPTIONS,
} from '../config/options'

type UnifiedControlPanelConfig = UnifiedControlPanelProps['config']

export function createPanelConfig(config: PlaygroundConfig): UnifiedControlPanelConfig {
  return {
    sections: [
      {
        id: 'animation',
        title: 'Animation',
        tabLabel: 'Animation',
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
                  { value: 'smooth', label: 'Smooth (Gentle)' },
                  { value: 'custom', label: 'Custom' },
                ],
              },
            ],
          },
          {
            title: 'Timing',
            controls: [
              {
                id: 'animationDuration',
                type: 'slider',
                label: 'Duration',
                value: config.animationDuration,
                min: 100,
                max: 800,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
          {
            title: 'Easing',
            controls: [
              {
                id: 'animationEasing',
                type: 'select',
                label: 'Easing Curve',
                value: config.animationEasing,
                options: CSS_EASING_OPTIONS,
              },
            ],
          },
        ],
      },
      {
        id: 'squareB',
        title: 'Square B Animation',
        tabLabel: 'Square B',
        groups: [
          {
            title: 'Reveal Mode',
            controls: [
              {
                id: 'squareBRevealMode',
                type: 'select',
                label: 'Mode',
                value: config.squareBRevealMode,
                options: [
                  { value: 'clip', label: 'Clip (Wipe)' },
                  { value: 'clip-circle', label: 'Clip (Circle)' },
                  { value: 'fade', label: 'Fade + Scale' },
                ],
              },
            ],
          },
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
          // Only show scale/opacity controls for fade mode
          ...(config.squareBRevealMode === 'fade'
            ? [
                {
                  title: 'Fade Appearance',
                  controls: [
                    {
                      id: 'squareBEntryScale',
                      type: 'slider' as const,
                      label: 'Initial Scale',
                      value: config.squareBEntryScale,
                      min: 0.5,
                      max: 1,
                      step: 0.05,
                      formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
                    },
                    {
                      id: 'squareBEntryOpacity',
                      type: 'slider' as const,
                      label: 'Initial Opacity',
                      value: config.squareBEntryOpacity,
                      min: 0,
                      max: 1,
                      step: 0.1,
                      formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
                    },
                  ],
                },
              ]
            : []),
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
            title: 'Square A',
            controls: [
              {
                id: 'squareAWidth',
                type: 'slider',
                label: 'Width',
                value: config.squareAWidth,
                min: 40,
                max: 120,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'squareAHeight',
                type: 'slider',
                label: 'Height',
                value: config.squareAHeight,
                min: 40,
                max: 120,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Square B',
            controls: [
              {
                id: 'squareBWidthMode',
                type: 'select',
                label: 'Width Mode',
                value: config.squareBWidthMode,
                options: [
                  { value: 'fixed', label: 'Fixed (px)' },
                  { value: 'flex', label: 'Flex (fill)' },
                ],
              },
              // Only show width slider when mode is fixed
              ...(config.squareBWidthMode === 'fixed'
                ? [
                    {
                      id: 'squareBWidth',
                      type: 'slider' as const,
                      label: 'Width',
                      value: config.squareBWidth,
                      min: 40,
                      max: 120,
                      step: 4,
                      formatLabel: (v: number) => `${v}px`,
                    },
                  ]
                : []),
              {
                id: 'squareBHeight',
                type: 'slider',
                label: 'Height',
                value: config.squareBHeight,
                min: 40,
                max: 120,
                step: 4,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Spacing',
            controls: [
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
                label: 'Slow-Mo (10x)',
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
