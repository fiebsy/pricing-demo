/**
 * Stacking Nav + Table Motion Playground - Panel Configuration
 *
 * Merged UnifiedControlPanel sections combining:
 * - Table controls (Layout, Table, Cells, Chart)
 * - Motion controls (Animation, Entry, Exit, Stacking, Display)
 */

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
      // =======================================================================
      // LAYOUT TAB (Page layout, data variant, presets)
      // =======================================================================
      {
        id: 'layout',
        title: 'Layout',
        tabLabel: 'Layout',
        groups: [
          {
            title: 'Data',
            controls: [
              {
                id: 'dataVariant',
                type: 'select',
                label: 'Dataset',
                value: config.dataVariant,
                options: [
                  { value: 'characters', label: 'Multiverse Characters' },
                  { value: 'employees', label: 'Corporate Directory' },
                ],
              },
            ],
          },
          {
            title: 'Appearance',
            controls: [
              {
                id: 'pageBackground',
                type: 'select',
                label: 'Background',
                value: config.pageBackground,
                options: [
                  { value: 'primary', label: 'Primary' },
                  { value: 'secondary', label: 'Secondary' },
                  { value: 'secondary_alt', label: 'Secondary Alt' },
                  { value: 'tertiary', label: 'Tertiary' },
                ],
              },
            ],
          },
          {
            title: 'Spacing',
            controls: [
              {
                id: 'pageTopGap',
                type: 'slider',
                label: 'Top Gap',
                value: config.pageTopGap,
                min: 0,
                max: 400,
                step: 8,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'pageMaxWidth',
                type: 'slider',
                label: 'Max Width',
                value: config.pageMaxWidth,
                min: 480,
                max: 1200,
                step: 40,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
        ],
      },

      // =======================================================================
      // TABLE TAB (Table features, borders, toolbar padding)
      // =======================================================================
      {
        id: 'table',
        title: 'Table',
        tabLabel: 'Table',
        groups: [
          {
            title: 'Features',
            controls: [
              {
                id: 'enableSelection',
                type: 'toggle',
                label: 'Row Selection',
                value: config.enableSelection,
              },
              {
                id: 'showColumnControl',
                type: 'toggle',
                label: 'Column Control',
                value: config.showColumnControl,
              },
              {
                id: 'showCount',
                type: 'toggle',
                label: 'Show Count',
                value: config.showCount,
              },
              {
                id: 'enableColumnReorder',
                type: 'toggle',
                label: 'Column Reorder',
                value: config.enableColumnReorder,
              },
            ],
          },
          {
            title: 'Appearance',
            controls: [
              {
                id: 'tableOpacity',
                type: 'slider',
                label: 'Table Opacity',
                value: config.tableOpacity,
                min: 0,
                max: 100,
                step: 5,
                formatLabel: (v: number) => `${v}%`,
              },
              {
                id: 'tableMuted',
                type: 'toggle',
                label: 'Mute Table',
                value: config.tableMuted,
              },
              {
                id: 'borderRadius',
                type: 'slider',
                label: 'Border Radius',
                value: config.borderRadius,
                min: 0,
                max: 24,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
          {
            title: 'Borders',
            controls: [
              {
                id: 'showOuterBorder',
                type: 'toggle',
                label: 'Outer Border',
                value: config.showOuterBorder,
              },
              {
                id: 'showRowBorders',
                type: 'toggle',
                label: 'Row Borders',
                value: config.showRowBorders,
              },
              {
                id: 'showCellBorders',
                type: 'toggle',
                label: 'Cell Borders',
                value: config.showCellBorders,
              },
              {
                id: 'outerBorderColor',
                type: 'select',
                label: 'Outer Color',
                value: config.outerBorderColor,
                options: [
                  { value: 'primary', label: 'Primary' },
                  { value: 'secondary', label: 'Secondary' },
                  { value: 'tertiary', label: 'Tertiary' },
                ],
              },
              {
                id: 'rowBorderColor',
                type: 'select',
                label: 'Row Color',
                value: config.rowBorderColor,
                options: [
                  { value: 'primary', label: 'Primary' },
                  { value: 'secondary', label: 'Secondary' },
                  { value: 'tertiary', label: 'Tertiary' },
                ],
              },
              {
                id: 'rowBorderOpacity',
                type: 'slider',
                label: 'Row Opacity',
                value: config.rowBorderOpacity,
                min: 5,
                max: 100,
                step: 5,
                formatLabel: (v: number) => `${v}%`,
              },
              {
                id: 'cellBorderColor',
                type: 'select',
                label: 'Cell Color',
                value: config.cellBorderColor,
                options: [
                  { value: 'primary', label: 'Primary' },
                  { value: 'secondary', label: 'Secondary' },
                  { value: 'tertiary', label: 'Tertiary' },
                ],
              },
              {
                id: 'cellBorderOpacity',
                type: 'slider',
                label: 'Cell Opacity',
                value: config.cellBorderOpacity,
                min: 5,
                max: 100,
                step: 5,
                formatLabel: (v: number) => `${v}%`,
              },
            ],
          },
          {
            title: 'Toolbar Padding',
            controls: [
              {
                id: 'toolbarPaddingTop',
                type: 'slider',
                label: 'Top',
                value: config.toolbarPaddingTop,
                min: 0,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'toolbarPaddingBottom',
                type: 'slider',
                label: 'Bottom',
                value: config.toolbarPaddingBottom,
                min: 0,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'toolbarPaddingLeft',
                type: 'slider',
                label: 'Left',
                value: config.toolbarPaddingLeft,
                min: 0,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'toolbarPaddingRight',
                type: 'slider',
                label: 'Right',
                value: config.toolbarPaddingRight,
                min: 0,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'navToCountGap',
                type: 'slider',
                label: 'Nav \u2192 Count Gap',
                value: config.navToCountGap,
                min: 0,
                max: 32,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
            ],
          },
        ],
      },

      // =======================================================================
      // ANIMATION TAB (Motion animation settings)
      // =======================================================================
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

      // =======================================================================
      // ENTRY TAB (Child entry animation)
      // =======================================================================
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

      // =======================================================================
      // EXIT TAB (Exit and collapse animation)
      // =======================================================================
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

      // =======================================================================
      // STACKING TAB (Peek behavior and button styling)
      // =======================================================================
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

      // =======================================================================
      // CELLS TAB (Badge and avatar config)
      // =======================================================================
      {
        id: 'cells',
        title: 'Cells',
        tabLabel: 'Cells',
        groups: [
          {
            title: 'Realm Badge',
            controls: [
              {
                id: 'badgeStyle',
                type: 'select',
                label: 'Style',
                value: config.badgeStyle,
                options: [
                  { value: 'default', label: 'Default' },
                  { value: 'modern', label: 'Modern' },
                ],
              },
              {
                id: 'badgeShape',
                type: 'select',
                label: 'Shape',
                value: config.badgeShape,
                options: [
                  { value: 'pill', label: 'Pill' },
                  { value: 'rounded', label: 'Rounded' },
                  { value: 'squircle', label: 'Squircle' },
                ],
              },
              {
                id: 'badgeNeutral',
                type: 'toggle',
                label: 'Neutral color',
                value: config.badgeNeutral,
              },
            ],
          },
          {
            title: 'Origin Avatar',
            controls: [
              {
                id: 'originImageType',
                type: 'select',
                label: 'Image type',
                value: config.originImageType,
                options: [
                  { value: 'poster', label: 'Poster' },
                  { value: 'logo', label: 'Logo' },
                  { value: 'backdrop', label: 'Backdrop' },
                ],
              },
              {
                id: 'originAvatarWidth',
                type: 'slider',
                label: 'Width',
                value: config.originAvatarWidth,
                min: 12,
                max: 80,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'originAvatarHeight',
                type: 'slider',
                label: 'Height',
                value: config.originAvatarHeight,
                min: 12,
                max: 40,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              ...(config.originImageType === 'logo'
                ? [
                    {
                      id: 'originLogoBg',
                      type: 'toggle' as const,
                      label: 'Logo background',
                      value: config.originLogoBg,
                    },
                    ...(config.originLogoBg
                      ? [
                          {
                            id: 'originLogoBgColor',
                            type: 'select' as const,
                            label: 'Bg color',
                            value: config.originLogoBgColor,
                            options: [
                              { value: 'bg-tertiary', label: 'Tertiary' },
                              { value: 'bg-secondary', label: 'Secondary' },
                              { value: 'bg-quaternary', label: 'Quaternary' },
                              { value: 'bg-secondary_alt', label: 'Secondary Alt' },
                              { value: 'bg-inverted-primary', label: 'Inverted Primary' },
                              { value: 'bg-inverted-secondary', label: 'Inverted Secondary' },
                            ],
                          },
                          {
                            id: 'originLogoPaddingX',
                            type: 'slider' as const,
                            label: 'Pad X',
                            value: config.originLogoPaddingX,
                            min: 0,
                            max: 16,
                            step: 1,
                            formatLabel: (v: number) => `${v}px`,
                          },
                          {
                            id: 'originLogoPaddingY',
                            type: 'slider' as const,
                            label: 'Pad Y',
                            value: config.originLogoPaddingY,
                            min: 0,
                            max: 16,
                            step: 1,
                            formatLabel: (v: number) => `${v}px`,
                          },
                          {
                            id: 'originLogoShine',
                            type: 'select' as const,
                            label: 'Shine',
                            value: config.originLogoShine,
                            options: [
                              { value: 'none', label: 'None' },
                              { value: 'shine-0-subtle', label: '0 Subtle' },
                              { value: 'shine-1', label: '1' },
                              { value: 'shine-1-shadow-sm', label: '1 + Shadow SM' },
                              { value: 'shine-2', label: '2' },
                              { value: 'shine-3', label: '3' },
                              { value: 'shine-3-shadow-sm', label: '3 + Shadow SM' },
                            ],
                          },
                          {
                            id: 'originLogoSquircle',
                            type: 'toggle' as const,
                            label: 'Squircle',
                            value: config.originLogoSquircle,
                          },
                        ]
                      : []),
                    {
                      id: 'originLogoInvert',
                      type: 'slider' as const,
                      label: 'Invert',
                      value: config.originLogoInvert,
                      min: 0,
                      max: 1,
                      step: 0.05,
                      formatLabel: (v: number) => `${Math.round(v * 100)}%`,
                    },
                  ]
                : []),
            ],
          },
        ],
      },

      // =======================================================================
      // CHART TAB (Sparkline settings)
      // =======================================================================
      {
        id: 'chart',
        title: 'Chart',
        tabLabel: 'Chart',
        groups: [
          {
            title: '30d Sparkline',
            controls: [
              {
                id: 'sparklineHeight',
                type: 'slider',
                label: 'Height',
                value: config.sparklineHeight,
                min: 12,
                max: 40,
                step: 2,
                formatLabel: (v: number) => `${v}px`,
              },
              {
                id: 'sparklineStrokeWidth',
                type: 'slider',
                label: 'Stroke Width',
                value: config.sparklineStrokeWidth,
                min: 0.5,
                max: 3,
                step: 0.5,
                formatLabel: (v: number) => `${v}`,
              },
              {
                id: 'sparklineShowFill',
                type: 'toggle',
                label: 'Fill Area',
                value: config.sparklineShowFill,
              },
              {
                id: 'sparklineShowDot',
                type: 'toggle',
                label: 'End Dot',
                value: config.sparklineShowDot,
              },
            ],
          },
        ],
      },

      // =======================================================================
      // DISPLAY TAB (Debug options, slow-mo)
      // =======================================================================
      {
        id: 'display',
        title: 'Display',
        tabLabel: 'Display',
        groups: [
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
                id: 'showNavDebug',
                type: 'toggle',
                label: 'Show Debug',
                value: config.showNavDebug,
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
    defaultActiveTab: 'layout',
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
