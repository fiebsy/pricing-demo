/**
 * Stacking Nav + Table Playground - Panel Configuration
 *
 * UnifiedControlPanel sections for Layout, Table, and Nav settings.
 */

import type { PanelConfig } from '@/components/ui/patterns/control-panel'
import { CHART_PALETTE_COLORS, BAR_STATUS_COLORS } from '@/components/ui/patterns/control-panel/tokens/colors'
import type { PlaygroundConfig } from '../config/types'

export function createPanelConfig(config: PlaygroundConfig): PanelConfig {
  return {
    sections: [
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
          {
            title: 'Preset',
            controls: [
              {
                id: 'preset',
                type: 'select',
                label: 'Preset',
                value: 'custom',
                options: [
                  { value: 'default', label: 'Default' },
                  { value: 'compact', label: 'Compact' },
                  { value: 'custom', label: 'Custom' },
                ],
              },
            ],
          },
        ],
      },
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
                label: 'Nav → Count Gap',
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
                  { value: 'none', label: 'None' },
                  { value: 'poster', label: 'Poster' },
                  { value: 'logo', label: 'Logo' },
                  { value: 'backdrop', label: 'Backdrop' },
                ],
              },
              ...(config.originImageType !== 'none'
                ? [
                    {
                      id: 'originAvatarWidth',
                      type: 'slider' as const,
                      label: 'Width',
                      value: config.originAvatarWidth,
                      min: 12,
                      max: 80,
                      step: 2,
                      formatLabel: (v: number) => `${v}px`,
                    },
                    {
                      id: 'originAvatarHeight',
                      type: 'slider' as const,
                      label: 'Height',
                      value: config.originAvatarHeight,
                      min: 12,
                      max: 40,
                      step: 2,
                      formatLabel: (v: number) => `${v}px`,
                    },
                  ]
                : []),
              {
                id: 'originShowLabel',
                type: 'toggle',
                label: 'Show label',
                value: config.originShowLabel,
              },
              ...(config.originShowLabel
                ? [
                    {
                      id: 'originLabelOpacity',
                      type: 'slider' as const,
                      label: 'Label opacity',
                      value: config.originLabelOpacity,
                      min: 0,
                      max: 1,
                      step: 0.05,
                      formatLabel: (v: number) => `${Math.round(v * 100)}%`,
                    },
                  ]
                : []),
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
                              { value: 'bg-gray-900', label: 'Gray 900' },
                              { value: 'bg-gray-950', label: 'Gray 950' },
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
                    {
                      id: 'originLogoOutline',
                      type: 'toggle' as const,
                      label: 'Logo outline',
                      value: config.originLogoOutline,
                    },
                    ...(config.originLogoOutline
                      ? [
                          {
                            id: 'originLogoOutlineColor',
                            type: 'select' as const,
                            label: 'Outline color',
                            value: config.originLogoOutlineColor,
                            options: [
                              { value: 'auto', label: 'Auto (theme)' },
                              { value: 'dark', label: 'Dark' },
                              { value: 'light', label: 'Light' },
                              { value: 'brand', label: 'Brand' },
                              { value: 'subtle', label: 'Subtle' },
                            ],
                          },
                          {
                            id: 'originLogoOutlineSize',
                            type: 'slider' as const,
                            label: 'Outline size',
                            value: config.originLogoOutlineSize,
                            min: 0.5,
                            max: 4,
                            step: 0.5,
                            formatLabel: (v: number) => `${v}px`,
                          },
                          {
                            id: 'originLogoOutlineOpacity',
                            type: 'slider' as const,
                            label: 'Outline opacity',
                            value: config.originLogoOutlineOpacity,
                            min: 0,
                            max: 1,
                            step: 0.05,
                            formatLabel: (v: number) => `${Math.round(v * 100)}%`,
                          },
                          {
                            id: 'originLogoOutlineIntensity',
                            type: 'slider' as const,
                            label: 'Intensity',
                            value: config.originLogoOutlineIntensity,
                            min: 1,
                            max: 3,
                            step: 1,
                            formatLabel: (v: number) => `${v}x`,
                          },
                        ]
                      : []),
                    {
                      id: 'originShowBackdrop',
                      type: 'toggle' as const,
                      label: 'Backdrop behind',
                      value: config.originShowBackdrop,
                    },
                    ...(config.originShowBackdrop
                      ? [
                          {
                            id: 'originBackdropPaddingX',
                            type: 'slider' as const,
                            label: 'Backdrop pad X',
                            value: config.originBackdropPaddingX,
                            min: 0,
                            max: 24,
                            step: 2,
                            formatLabel: (v: number) => `${v}px`,
                          },
                          {
                            id: 'originBackdropPaddingY',
                            type: 'slider' as const,
                            label: 'Backdrop pad Y',
                            value: config.originBackdropPaddingY,
                            min: 0,
                            max: 24,
                            step: 2,
                            formatLabel: (v: number) => `${v}px`,
                          },
                          {
                            id: 'originBackdropRadius',
                            type: 'slider' as const,
                            label: 'Backdrop radius',
                            value: config.originBackdropRadius,
                            min: 0,
                            max: 16,
                            step: 1,
                            formatLabel: (v: number) => `${v}px`,
                          },
                          {
                            id: 'originBackdropOpacity',
                            type: 'slider' as const,
                            label: 'Backdrop opacity',
                            value: config.originBackdropOpacity,
                            min: 0,
                            max: 1,
                            step: 0.05,
                            formatLabel: (v: number) => `${Math.round(v * 100)}%`,
                          },
                          {
                            id: 'originBackdropShine',
                            type: 'select' as const,
                            label: 'Backdrop shine',
                            value: config.originBackdropShine,
                            options: [
                              { value: 'none', label: 'None' },
                              { value: 'shine-1', label: '1' },
                              { value: 'shine-1-shadow-sm', label: '1 + Shadow SM' },
                              { value: 'shine-2', label: '2' },
                              { value: 'shine-2-shadow-sm', label: '2 + Shadow SM' },
                              { value: 'shine-3', label: '3' },
                              { value: 'shine-3-shadow-sm', label: '3 + Shadow SM' },
                            ],
                          },
                        ]
                      : []),
                  ]
                : []),
            ],
          },
        ],
      },
      {
        id: 'chart',
        title: 'Chart',
        tabLabel: 'Chart',
        groups: [
          {
            title: 'Type',
            controls: [
              {
                id: 'chartType',
                type: 'select',
                label: 'Chart Type',
                value: config.chartType,
                options: [
                  { value: 'line', label: 'Line' },
                  { value: 'bar', label: 'Bar' },
                ],
              },
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
            ],
          },
          ...(config.chartType === 'line'
            ? [
                {
                  title: 'Line Options',
                  controls: [
                    {
                      id: 'sparklineStrokeWidth',
                      type: 'slider' as const,
                      label: 'Stroke Width',
                      value: config.sparklineStrokeWidth,
                      min: 0.5,
                      max: 3,
                      step: 0.5,
                      formatLabel: (v: number) => `${v}`,
                    },
                    {
                      id: 'sparklineShowFill',
                      type: 'toggle' as const,
                      label: 'Fill Area',
                      value: config.sparklineShowFill,
                    },
                    {
                      id: 'sparklineShowDot',
                      type: 'toggle' as const,
                      label: 'End Dot',
                      value: config.sparklineShowDot,
                    },
                  ],
                },
              ]
            : []),
          ...(config.chartType === 'bar'
            ? [
                {
                  title: 'Bar Style',
                  controls: [
                    {
                      id: 'barGap',
                      type: 'slider' as const,
                      label: 'Gap',
                      value: config.barGap,
                      min: 0,
                      max: 4,
                      step: 0.5,
                      formatLabel: (v: number) => `${v}px`,
                    },
                    {
                      id: 'barRadius',
                      type: 'slider' as const,
                      label: 'Radius',
                      value: config.barRadius,
                      min: 0,
                      max: 4,
                      step: 0.5,
                      formatLabel: (v: number) => `${v}px`,
                    },
                    {
                      id: 'barOpacity',
                      type: 'slider' as const,
                      label: 'Opacity',
                      value: config.barOpacity,
                      min: 10,
                      max: 100,
                      step: 5,
                      formatLabel: (v: number) => `${v}%`,
                    },
                    {
                      id: 'barColorMode',
                      type: 'select' as const,
                      label: 'Bar Color',
                      value: config.barColorMode,
                      options: [
                        { value: 'neutral', label: 'Neutral' },
                        { value: 'status', label: 'Status (+/-)' },
                        { value: 'chart', label: 'Chart Color' },
                      ],
                    },
                    ...(config.barColorMode === 'chart'
                      ? [
                          {
                            id: 'barChartColor',
                            type: 'color-enhanced-select' as const,
                            label: 'Chart Palette',
                            value: config.barChartColor,
                            options: CHART_PALETTE_COLORS,
                            swatchSize: 'sm' as const,
                            showGroups: false,
                          },
                        ]
                      : []),
                    ...(config.barColorMode === 'status'
                      ? [
                          {
                            id: 'barPositiveColor',
                            type: 'color-enhanced-select' as const,
                            label: 'Positive',
                            value: config.barPositiveColor,
                            options: BAR_STATUS_COLORS,
                            swatchSize: 'sm' as const,
                            showGroups: true,
                          },
                          {
                            id: 'barNegativeColor',
                            type: 'color-enhanced-select' as const,
                            label: 'Negative',
                            value: config.barNegativeColor,
                            options: BAR_STATUS_COLORS,
                            swatchSize: 'sm' as const,
                            showGroups: true,
                          },
                        ]
                      : []),
                  ],
                },
                {
                  title: 'Tips',
                  controls: [
                    {
                      id: 'barShowTips',
                      type: 'toggle' as const,
                      label: 'Show Tips',
                      value: config.barShowTips,
                    },
                    ...(config.barShowTips
                      ? [
                          {
                            id: 'barTipSize',
                            type: 'slider' as const,
                            label: 'Tip Size',
                            value: config.barTipSize,
                            min: 1,
                            max: 6,
                            step: 0.5,
                            formatLabel: (v: number) => `${v}px`,
                          },
                          {
                            id: 'barTipColorMode',
                            type: 'select' as const,
                            label: 'Tip Color',
                            value: config.barTipColorMode,
                            options: [
                              { value: 'neutral', label: 'Neutral' },
                              { value: 'status', label: 'Status (+/-)' },
                              { value: 'chart', label: 'Chart Color' },
                            ],
                          },
                          ...(config.barTipColorMode === 'chart'
                            ? [
                                {
                                  id: 'barTipChartColor',
                                  type: 'color-enhanced-select' as const,
                                  label: 'Tip Palette',
                                  value: config.barTipChartColor,
                                  options: CHART_PALETTE_COLORS,
                                  swatchSize: 'sm' as const,
                                  showGroups: false,
                                },
                              ]
                            : []),
                          ...(config.barTipColorMode === 'status'
                            ? [
                                {
                                  id: 'barTipPositiveColor',
                                  type: 'color-enhanced-select' as const,
                                  label: 'Tip Positive',
                                  value: config.barTipPositiveColor,
                                  options: BAR_STATUS_COLORS,
                                  swatchSize: 'sm' as const,
                                  showGroups: true,
                                },
                                {
                                  id: 'barTipNegativeColor',
                                  type: 'color-enhanced-select' as const,
                                  label: 'Tip Negative',
                                  value: config.barTipNegativeColor,
                                  options: BAR_STATUS_COLORS,
                                  swatchSize: 'sm' as const,
                                  showGroups: true,
                                },
                              ]
                            : []),
                        ]
                      : []),
                  ],
                },
                {
                  title: 'Trend Line',
                  controls: [
                    {
                      id: 'barShowTrendLine',
                      type: 'toggle' as const,
                      label: 'Show Trend Line',
                      value: config.barShowTrendLine,
                    },
                    ...(config.barShowTrendLine
                      ? [
                          {
                            id: 'barTrendLineWidth',
                            type: 'slider' as const,
                            label: 'Width',
                            value: config.barTrendLineWidth,
                            min: 0.5,
                            max: 3,
                            step: 0.5,
                            formatLabel: (v: number) => `${v}px`,
                          },
                          {
                            id: 'barTrendLineOpacity',
                            type: 'slider' as const,
                            label: 'Opacity',
                            value: config.barTrendLineOpacity,
                            min: 0.1,
                            max: 1,
                            step: 0.05,
                            formatLabel: (v: number) => `${Math.round(v * 100)}%`,
                          },
                          {
                            id: 'barTrendLineColorMode',
                            type: 'select' as const,
                            label: 'Line Color',
                            value: config.barTrendLineColorMode,
                            options: [
                              { value: 'neutral', label: 'Neutral' },
                              { value: 'status', label: 'Status' },
                              { value: 'chart', label: 'Chart Color' },
                            ],
                          },
                          ...(config.barTrendLineColorMode === 'chart'
                            ? [
                                {
                                  id: 'barTrendLineChartColor',
                                  type: 'color-enhanced-select' as const,
                                  label: 'Line Palette',
                                  value: config.barTrendLineChartColor,
                                  options: CHART_PALETTE_COLORS,
                                  swatchSize: 'sm' as const,
                                  showGroups: false,
                                },
                              ]
                            : []),
                          ...(config.barTrendLineColorMode === 'status'
                            ? [
                                {
                                  id: 'barTrendLineStatusColor',
                                  type: 'color-enhanced-select' as const,
                                  label: 'Line Color',
                                  value: config.barTrendLineStatusColor,
                                  options: BAR_STATUS_COLORS,
                                  swatchSize: 'sm' as const,
                                  showGroups: true,
                                },
                              ]
                            : []),
                        ]
                      : []),
                  ],
                },
              ]
            : []),
          {
            title: 'Baseline',
            controls: [
              {
                id: 'sparklineShowBaseline',
                type: 'toggle',
                label: 'Show Baseline',
                value: config.sparklineShowBaseline,
              },
              ...(config.sparklineShowBaseline
                ? [
                    {
                      id: 'sparklineBaselineWidth',
                      type: 'slider' as const,
                      label: 'Width',
                      value: config.sparklineBaselineWidth,
                      min: 0.5,
                      max: 3,
                      step: 0.5,
                      formatLabel: (v: number) => `${v}px`,
                    },
                    {
                      id: 'sparklineBaselineOpacity',
                      type: 'slider' as const,
                      label: 'Opacity',
                      value: config.sparklineBaselineOpacity,
                      min: 0.1,
                      max: 1,
                      step: 0.05,
                      formatLabel: (v: number) => `${Math.round(v * 100)}%`,
                    },
                    ...(config.chartType === 'bar'
                      ? [
                          {
                            id: 'barBaselineColorMode',
                            type: 'select' as const,
                            label: 'Color',
                            value: config.barBaselineColorMode,
                            options: [
                              { value: 'neutral', label: 'Neutral' },
                              { value: 'status', label: 'Status' },
                              { value: 'chart', label: 'Chart Color' },
                            ],
                          },
                          ...(config.barBaselineColorMode === 'chart'
                            ? [
                                {
                                  id: 'barBaselineChartColor',
                                  type: 'color-enhanced-select' as const,
                                  label: 'Palette',
                                  value: config.barBaselineChartColor,
                                  options: CHART_PALETTE_COLORS,
                                  swatchSize: 'sm' as const,
                                  showGroups: false,
                                },
                              ]
                            : []),
                          ...(config.barBaselineColorMode === 'status'
                            ? [
                                {
                                  id: 'barBaselineStatusColor',
                                  type: 'color-enhanced-select' as const,
                                  label: 'Color',
                                  value: config.barBaselineStatusColor,
                                  options: BAR_STATUS_COLORS,
                                  swatchSize: 'sm' as const,
                                  showGroups: true,
                                },
                              ]
                            : []),
                        ]
                      : []),
                  ]
                : []),
            ],
          },
        ],
      },
      {
        id: 'nav',
        title: 'Navigation',
        tabLabel: 'Nav',
        groups: [
          {
            title: 'Animation',
            controls: [
              {
                id: 'navVariant',
                type: 'select',
                label: 'Variant',
                value: config.navVariant,
                options: [
                  { value: 'default', label: 'Default (Easing)' },
                  { value: 'spring', label: 'Spring (Physics)' },
                ],
              },
            ],
          },
          {
            title: 'Debug',
            controls: [
              {
                id: 'showNavDebug',
                type: 'toggle',
                label: 'Show Debug',
                value: config.showNavDebug,
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
