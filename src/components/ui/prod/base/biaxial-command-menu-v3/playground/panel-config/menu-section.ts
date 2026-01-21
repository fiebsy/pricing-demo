/**
 * Biaxial Command Menu V3 - Menu Section Config
 *
 * Menu area settings including size, appearance, and overflow handling.
 */

import type { Section } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from '../types'
import { AREA_BACKGROUND_OPTIONS } from '../options'

export function buildMenuSection(state: PlaygroundState): Section {
  return {
    id: 'menu',
    label: 'Menu',
    title: 'Menu Settings',
    groups: [
      {
        title: 'Size',
        controls: [
          {
            id: 'config.panelWidth',
            label: 'Panel Width',
            type: 'slider',
            value: state.config.panelWidth,
            min: 240,
            max: 560,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.maxPanelHeight',
            label: 'Max Height',
            type: 'slider',
            value: state.config.maxPanelHeight,
            min: 200,
            max: 600,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Appearance',
        controls: [
          {
            id: 'config.menuBackground',
            label: 'Background',
            type: 'select',
            value: state.config.menuBackground ?? 'primary',
            options: [...AREA_BACKGROUND_OPTIONS],
          },
          {
            id: 'config.syncMenuContainerRadius',
            label: 'Sync Radius',
            type: 'toggle',
            value: state.config.syncMenuContainerRadius,
          },
          {
            id: 'config.menuContainerInset',
            label: 'Container Inset',
            type: 'slider',
            value: state.config.menuContainerInset,
            min: 0,
            max: 12,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.menuBorderWidth',
            label: 'Border',
            type: 'slider',
            value: state.config.menuBorderWidth ?? 0,
            min: 0,
            max: 4,
            step: 0.5,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.contentTopOffset',
            label: 'Top Offset',
            type: 'slider',
            value: state.config.contentTopOffset,
            min: -12,
            max: 48,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.contentBottomOffset',
            label: 'Bottom Offset',
            type: 'slider',
            value: state.config.contentBottomOffset ?? 0,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Scroll Padding',
        description: 'Internal padding within scroll area',
        controls: [
          {
            id: 'config.scrollPaddingTop',
            label: 'Top',
            type: 'slider',
            value: state.config.scrollPaddingTop ?? 0,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.scrollPaddingBottom',
            label: 'Bottom',
            type: 'slider',
            value: state.config.scrollPaddingBottom ?? 12,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Inner Padding',
        description: 'Padding around content area',
        controls: [
          {
            id: 'config.innerPaddingTop',
            label: 'Top',
            type: 'slider',
            value: state.config.innerPaddingTop ?? 4,
            min: 0,
            max: 16,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.innerPaddingBottom',
            label: 'Bottom',
            type: 'slider',
            value: state.config.innerPaddingBottom ?? 4,
            min: 0,
            max: 16,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.innerPaddingLeft',
            label: 'Left',
            type: 'slider',
            value: state.config.innerPaddingLeft ?? 4,
            min: 0,
            max: 16,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.innerPaddingRight',
            label: 'Right',
            type: 'slider',
            value: state.config.innerPaddingRight ?? 4,
            min: 0,
            max: 16,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Overflow Fade',
        controls: [
          {
            id: 'config.menuOverflowGradient',
            label: 'Enable',
            type: 'toggle',
            value: state.config.menuOverflowGradient ?? false,
          },
          {
            id: 'config.menuOverflowGradientHeight',
            label: 'Height',
            type: 'slider',
            value: state.config.menuOverflowGradientHeight ?? 16,
            min: 8,
            max: 48,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Debug',
        controls: [
          {
            id: 'config.debug',
            label: 'Show Layers',
            type: 'toggle',
            value: state.config.debug ?? false,
            description: 'Red=container, Blue=scroll, Green=content',
          },
        ],
      },
    ],
  }
}
