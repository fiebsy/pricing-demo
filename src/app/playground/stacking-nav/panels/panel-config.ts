import type { UnifiedControlPanelProps } from '@/components/ui/patterns/control-panel'
import type { PlaygroundConfig } from '../config/types'
import {
  EASING_OPTIONS,
  ENTRY_DIRECTION_OPTIONS,
  BUTTON_VARIANT_OPTIONS,
} from '../config/options'

type UnifiedControlPanelConfig = UnifiedControlPanelProps['config']

export function createPanelConfig(config: PlaygroundConfig): UnifiedControlPanelConfig {
  // Build spring or tween groups based on animation type
  const animationGroups = config.animationType === 'spring'
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
              max: 1000,
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
        tabLabel: config.animationType === 'spring' ? 'Spring' : 'Easing',
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
                  { value: 'default', label: 'Default (Easing)' },
                  { value: 'spring', label: 'Spring (Physics)' },
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
                  { value: 'tween', label: 'Easing (Duration)' },
                ],
              },
            ],
          },
          ...animationGroups,
          {
            title: 'Promotion Effect',
            controls: [
              {
                id: 'promotionScale',
                type: 'slider',
                label: 'Scale',
                value: config.promotionScale,
                min: 1.0,
                max: 1.2,
                step: 0.01,
                formatLabel: (v: number) => v === 1 ? 'Off' : `${v.toFixed(2)}`,
              },
              {
                id: 'promotionDuration',
                type: 'slider',
                label: 'Duration',
                value: config.promotionDuration,
                min: 100,
                max: 800,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
        ],
      },
      {
        id: 'entry',
        title: 'Child Entry',
        tabLabel: 'Entry',
        groups: [
          {
            title: 'Direction',
            controls: [
              {
                id: 'entryDirection',
                type: 'select',
                label: 'Preset',
                value: config.entryDirection,
                options: ENTRY_DIRECTION_OPTIONS,
              },
            ],
          },
          {
            title: 'Offset',
            controls: [
              {
                id: 'entryOffsetX',
                type: 'slider',
                label: 'X Offset',
                value: config.entryOffsetX,
                min: -40,
                max: 40,
                step: 2,
                formatLabel: (v: number) => v === 0 ? '0' : `${v}px`,
              },
              {
                id: 'entryOffsetY',
                type: 'slider',
                label: 'Y Offset',
                value: config.entryOffsetY,
                min: -40,
                max: 40,
                step: 2,
                formatLabel: (v: number) => v === 0 ? '0' : `${v}px`,
              },
            ],
          },
          {
            title: 'Timing',
            controls: [
              {
                id: 'childEntryDelay',
                type: 'slider',
                label: 'Delay',
                value: config.childEntryDelay,
                min: 0,
                max: 300,
                step: 10,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'childStagger',
                type: 'slider',
                label: 'Stagger',
                value: config.childStagger,
                min: 0,
                max: 150,
                step: 5,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'childEntryScale',
                type: 'slider',
                label: 'Scale',
                value: config.childEntryScale,
                min: 0.8,
                max: 1.0,
                step: 0.01,
                formatLabel: (v: number) => `${v.toFixed(2)}`,
              },
            ],
          },
          {
            title: 'Leaf Nodes',
            controls: [
              {
                id: 'skipLeafAnimation',
                type: 'toggle',
                label: 'Skip Animation',
                value: config.skipLeafAnimation,
              },
            ],
          },
          {
            title: 'Interaction',
            controls: [
              {
                id: 'hoverDelay',
                type: 'slider',
                label: 'Hover Delay',
                value: config.hoverDelay,
                min: 0,
                max: 500,
                step: 25,
                formatLabel: (v: number) => v === 0 ? 'None' : `${v}ms`,
              },
            ],
          },
        ],
      },
      {
        id: 'exit',
        title: 'Exit & Collapse',
        tabLabel: 'Exit',
        groups: [
          {
            title: 'Child Exit — items leaving the DOM',
            controls: [
              {
                id: 'exitScale',
                type: 'slider',
                label: 'Scale',
                value: config.exitScale,
                min: 0.8,
                max: 1.0,
                step: 0.01,
                formatLabel: (v: number) => `${v.toFixed(2)}`,
              },
              {
                id: 'exitUseCustomTiming',
                type: 'toggle',
                label: 'Custom Timing',
                value: config.exitUseCustomTiming,
              },
              ...(config.exitUseCustomTiming ? [
                {
                  id: 'exitDuration',
                  type: 'slider' as const,
                  label: 'Duration',
                  value: config.exitDuration,
                  min: 0,
                  max: 800,
                  step: 25,
                  formatLabel: (v: number) => v === 0 ? 'Instant' : `${v}ms`,
                },
                {
                  id: 'exitEase',
                  type: 'select' as const,
                  label: 'Easing',
                  value: config.exitEase,
                  options: EASING_OPTIONS,
                },
                {
                  id: 'exitDelay',
                  type: 'slider' as const,
                  label: 'Hold Delay',
                  value: config.exitDelay,
                  min: 0,
                  max: 300,
                  step: 10,
                  formatLabel: (v: number) => v === 0 ? 'None' : `${v}ms`,
                },
              ] : []),
            ],
          },
          {
            title: 'Collapse Layout — parent repositioning',
            controls: [
              {
                id: 'collapseLayoutDuration',
                type: 'slider',
                label: 'Duration',
                value: config.collapseLayoutDuration,
                min: 25,
                max: 400,
                step: 25,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
        ],
      },
      {
        id: 'stacking',
        title: 'Stacking',
        tabLabel: 'Stack',
        groups: [
          {
            title: 'Peek Behavior',
            controls: [
              {
                id: 'peekOffset',
                type: 'slider',
                label: 'Peek Offset',
                value: config.peekOffset,
                min: -40,
                max: 40,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'anchoredOpacity',
                type: 'slider',
                label: 'Anchored Opacity',
                value: config.anchoredOpacity,
                min: 0.2,
                max: 1,
                step: 0.05,
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
            title: 'Spacing',
            controls: [
              {
                id: 'gap',
                type: 'select',
                label: 'Gap',
                value: config.gap,
                options: [
                  { value: 'sm', label: 'Small' },
                  { value: 'md', label: 'Medium' },
                  { value: 'lg', label: 'Large' },
                ],
              },
              {
                id: 'pageBackground',
                type: 'select',
                label: 'Background',
                value: config.pageBackground,
                options: [
                  { value: 'primary', label: 'Primary' },
                  { value: 'secondary', label: 'Secondary' },
                  { value: 'tertiary', label: 'Tertiary' },
                  { value: 'brand', label: 'Brand' },
                  { value: 'black', label: 'Black' },
                  { value: 'white', label: 'White' },
                ],
              },
            ],
          },
          {
            title: 'Button Style',
            controls: [
              {
                id: 'buttonSize',
                type: 'select',
                label: 'Size',
                value: config.buttonSize,
                options: [
                  { value: 'xs', label: 'Extra Small' },
                  { value: 'sm', label: 'Small' },
                  { value: 'md', label: 'Medium' },
                  { value: 'lg', label: 'Large' },
                  { value: 'xl', label: 'Extra Large' },
                ],
              },
              {
                id: 'buttonRoundness',
                type: 'select',
                label: 'Roundness',
                value: config.buttonRoundness,
                options: [
                  { value: 'default', label: 'Default' },
                  { value: 'pill', label: 'Pill' },
                  { value: 'squircle', label: 'Squircle' },
                ],
              },
            ],
          },
          {
            title: 'Button Variants',
            controls: [
              {
                id: 'expandedVariant',
                type: 'select',
                label: 'Expanded',
                value: config.expandedVariant,
                options: BUTTON_VARIANT_OPTIONS,
              },
              {
                id: 'childVariant',
                type: 'select',
                label: 'Child',
                value: config.childVariant,
                options: BUTTON_VARIANT_OPTIONS,
              },
              {
                id: 'anchoredVariant',
                type: 'select',
                label: 'Anchored',
                value: config.anchoredVariant,
                options: BUTTON_VARIANT_OPTIONS,
              },
              {
                id: 'selectedLeafVariant',
                type: 'select',
                label: 'Selected Leaf',
                value: config.selectedLeafVariant,
                options: BUTTON_VARIANT_OPTIONS,
              },
            ],
          },
          {
            title: 'Level All Button',
            controls: [
              {
                id: 'showLevelAll',
                type: 'toggle',
                label: 'Show Level All',
                value: config.showLevelAll,
              },
              {
                id: 'levelAllLabel',
                type: 'text',
                label: 'Label',
                value: config.levelAllLabel,
              },
              {
                id: 'levelAllActiveVariant',
                type: 'select',
                label: 'Active Variant',
                value: config.levelAllActiveVariant,
                options: BUTTON_VARIANT_OPTIONS,
              },
              {
                id: 'levelAllInactiveVariant',
                type: 'select',
                label: 'Inactive Variant',
                value: config.levelAllInactiveVariant,
                options: BUTTON_VARIANT_OPTIONS,
              },
            ],
          },
        ],
      },
      {
        id: 'display',
        title: 'Display',
        tabLabel: 'Display',
        groups: [
          {
            title: 'Navigation Variant',
            controls: [
              {
                id: 'navVariant',
                type: 'select',
                label: 'Variant',
                value: config.navVariant,
                options: [
                  { value: 'orders', label: 'Orders (Filter)' },
                  { value: 'products', label: 'Products (Shop)' },
                  { value: 'content', label: 'Content (CMS)' },
                ],
              },
            ],
          },
          {
            title: 'Debug',
            controls: [
              {
                id: 'showNumbers',
                type: 'toggle',
                label: 'Show Numbers',
                value: config.showNumbers,
              },
              {
                id: 'showDebug',
                type: 'toggle',
                label: 'Show Debug',
                value: config.showDebug,
              },
            ],
          },
          {
            title: 'Slow-Mo Mode',
            controls: [
              {
                id: 'timeScale',
                type: 'slider',
                label: 'Time Scale',
                value: config.timeScale,
                min: 0.1,
                max: 2,
                step: 0.1,
                formatLabel: (v: number) =>
                  v === 1 ? '1x (Normal)' :
                  v < 1 ? `${v.toFixed(1)}x (${Math.round(1/v)}x Slower)` :
                  `${v.toFixed(1)}x Faster`,
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
