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
            ],
          },
          {
            title: 'Spacing',
            controls: [
              {
                id: 'toolbarGap',
                type: 'slider',
                label: 'Toolbar Gap',
                value: config.toolbarGap,
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
