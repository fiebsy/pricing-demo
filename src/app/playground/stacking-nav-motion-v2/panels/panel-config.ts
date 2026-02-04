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
                  // Slow
                  { value: 'soft', label: 'Soft — Slowest' },
                  { value: 'heavy', label: 'Heavy — Slow + Weighty' },
                  // Medium
                  { value: 'smooth', label: 'Smooth — Balanced' },
                  { value: 'subtle', label: 'Subtle — Controlled' },
                  { value: 'bouncy', label: 'Bouncy — Playful' },
                  // Fast
                  { value: 'snappy', label: 'Snappy — Quick' },
                  { value: 'crisp', label: 'Crisp — Fast + Clean' },
                  { value: 'precise', label: 'Precise — Fast + Tight' },
                  // Fastest
                  { value: 'swift', label: 'Swift — Very Fast' },
                  { value: 'responsive', label: 'Responsive — Fastest' },
                  // Custom
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
                formatLabel: (v: number) => (v === 1 ? 'Off' : `${v.toFixed(2)}`),
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
            title: 'Direction — Children',
            controls: [
              {
                id: 'entryInstant',
                type: 'toggle',
                label: 'Instant (No Slide)',
                value: config.entryInstant,
              },
              ...(!config.entryInstant
                ? [
                    {
                      id: 'entryFromParent',
                      type: 'toggle' as const,
                      label: 'From Parent Position',
                      value: config.entryFromParent,
                    },
                    ...(!config.entryFromParent
                      ? [
                          {
                            id: 'entryDirection',
                            type: 'select' as const,
                            label: 'Preset',
                            value: config.entryDirection,
                            options: ENTRY_DIRECTION_OPTIONS,
                          },
                        ]
                      : []),
                  ]
                : []),
            ],
          },
          // Only show offset controls when using custom direction (not instant or fromParent)
          ...(!config.entryInstant && !config.entryFromParent
            ? [
                {
                  title: 'Offset — Children',
                  controls: [
                    {
                      id: 'entryOffsetX',
                      type: 'slider' as const,
                      label: 'X Offset',
                      value: config.entryOffsetX,
                      min: -40,
                      max: 40,
                      step: 2,
                      formatLabel: (v: number) => (v === 0 ? '0' : `${v}px`),
                    },
                    {
                      id: 'entryOffsetY',
                      type: 'slider' as const,
                      label: 'Y Offset',
                      value: config.entryOffsetY,
                      min: -40,
                      max: 40,
                      step: 2,
                      formatLabel: (v: number) => (v === 0 ? '0' : `${v}px`),
                    },
                  ],
                },
              ]
            : []),
          {
            title: 'Timing — Children',
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
            ],
          },
          {
            title: 'Appearance — Children',
            controls: [
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
              {
                id: 'childEntryOpacity',
                type: 'slider',
                label: 'Opacity',
                value: config.childEntryOpacity,
                min: 0,
                max: 1,
                step: 0.05,
                formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
              },
            ],
          },
          {
            title: 'Promotion Sync — Children',
            controls: [
              {
                id: 'syncChildEntryToPromotion',
                type: 'toggle',
                label: 'Wait for Promotion',
                value: config.syncChildEntryToPromotion,
              },
              {
                id: 'promotionChildOffset',
                type: 'slider',
                label: 'Extra Delay',
                value: config.promotionChildOffset,
                min: 0,
                max: 300,
                step: 10,
                formatLabel: (v: number) => (v === 0 ? 'None' : `+${v}ms`),
              },
            ],
          },
          {
            title: 'Demotion Entry — Timing',
            controls: [
              {
                id: 'demotionEntryDelay',
                type: 'slider',
                label: 'Delay',
                value: config.demotionEntryDelay,
                min: 0,
                max: 300,
                step: 10,
                formatLabel: (v: number) => `${v}ms`,
              },
              {
                id: 'demotionStagger',
                type: 'slider',
                label: 'Stagger',
                value: config.demotionStagger,
                min: 0,
                max: 150,
                step: 5,
                formatLabel: (v: number) => `${v}ms`,
              },
            ],
          },
          {
            title: 'Demotion Entry — Appearance',
            controls: [
              {
                id: 'demotionEntryScale',
                type: 'slider',
                label: 'Scale',
                value: config.demotionEntryScale,
                min: 0.8,
                max: 1.0,
                step: 0.01,
                formatLabel: (v: number) => `${v.toFixed(2)}`,
              },
              {
                id: 'demotionEntryOpacity',
                type: 'slider',
                label: 'Opacity',
                value: config.demotionEntryOpacity,
                min: 0,
                max: 1,
                step: 0.05,
                formatLabel: (v: number) => `${(v * 100).toFixed(0)}%`,
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
                formatLabel: (v: number) => (v === 0 ? 'None' : `${v}ms`),
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
            title: 'Child Exit \u2014 items leaving the DOM',
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
              ...(config.exitUseCustomTiming
                ? [
                    {
                      id: 'exitDuration',
                      type: 'slider' as const,
                      label: 'Duration',
                      value: config.exitDuration,
                      min: 0,
                      max: 800,
                      step: 25,
                      formatLabel: (v: number) => (v === 0 ? 'Instant' : `${v}ms`),
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
                      formatLabel: (v: number) => (v === 0 ? 'None' : `${v}ms`),
                    },
                  ]
                : []),
            ],
          },
          {
            title: 'Collapse Layout \u2014 parent repositioning',
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
              {
                id: 'reentryVariant',
                type: 'select',
                label: 'Reentry',
                value: config.reentryVariant,
                options: BUTTON_VARIANT_OPTIONS,
              },
              {
                id: 'demotingVariant',
                type: 'select',
                label: 'Demoting',
                value: config.demotingVariant,
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
              {
                id: 'showPhaseIndicator',
                type: 'toggle',
                label: 'Phase Indicator (V2)',
                value: config.showPhaseIndicator,
              },
            ],
          },
          {
            title: 'Slow-Mo Mode',
            controls: [
              {
                id: 'slowMoEnabled',
                type: 'toggle',
                label: 'Slow-Mo (0.1x)',
                value: config.slowMoEnabled,
              },
            ],
          },
          {
            title: 'Container Debug',
            controls: [
              {
                id: 'showContainerBounds',
                type: 'toggle',
                label: 'Show Bounds',
                value: config.showContainerBounds,
              },
              {
                id: 'containerWidth',
                type: 'slider',
                label: 'Width',
                value: config.containerWidth,
                min: 400,
                max: 1200,
                step: 50,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'containerOverflow',
                type: 'select',
                label: 'Overflow',
                value: config.containerOverflow,
                options: [
                  { value: 'visible', label: 'Visible' },
                  { value: 'hidden', label: 'Hidden' },
                  { value: 'clip', label: 'Clip' },
                ],
              },
              {
                id: 'showOverflowGradient',
                type: 'toggle',
                label: 'Edge Gradient',
                value: config.showOverflowGradient,
              },
              ...(config.showOverflowGradient
                ? [
                    {
                      id: 'gradientWidth',
                      type: 'slider' as const,
                      label: 'Gradient Width',
                      value: config.gradientWidth,
                      min: 20,
                      max: 200,
                      step: 10,
                      formatLabel: (v: number) => `${v}px`,
                    },
                  ]
                : []),
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
