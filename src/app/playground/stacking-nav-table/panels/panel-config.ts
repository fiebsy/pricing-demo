/**
 * Stacking Nav + Table Playground - Panel Configuration
 *
 * UnifiedControlPanel sections for Layout, Table, and Nav settings.
 */

import type { PanelConfig } from '@/components/ui/patterns/control-panel'
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
