/**
 * Question Command Menu - Items Section Config
 */

import type { Section } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from '../config/types'
import { BACKGROUND_OPTIONS } from '../config/options'

export function buildItemsSection(state: PlaygroundState): Section {
  return {
    id: 'items',
    label: 'Items',
    title: 'Question Item Settings',
    groups: [
      {
        title: 'Size',
        controls: [
          {
            id: 'config.items.height',
            label: 'Height',
            type: 'slider',
            value: state.config.items.height,
            min: 36,
            max: 96,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.items.gap',
            label: 'Gap Between',
            type: 'slider',
            value: state.config.items.gap,
            min: 0,
            max: 12,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Padding',
        controls: [
          {
            id: 'config.items.paddingX',
            label: 'Horizontal',
            type: 'slider',
            value: state.config.items.paddingX,
            min: 4,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.items.paddingY',
            label: 'Vertical',
            type: 'slider',
            value: state.config.items.paddingY,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Appearance',
        controls: [
          {
            id: 'config.items.borderRadius',
            label: 'Border Radius',
            type: 'slider',
            value: state.config.items.borderRadius,
            min: 0,
            max: 20,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.items.highlightBackground',
            label: 'Highlight BG',
            type: 'select',
            value: state.config.items.highlightBackground,
            options: [...BACKGROUND_OPTIONS],
            description: 'Keyboard/selected state',
          },
          {
            id: 'config.items.hoverBackground',
            label: 'Hover BG',
            type: 'select',
            value: state.config.items.hoverBackground,
            options: [...BACKGROUND_OPTIONS],
          },
        ],
      },
      {
        title: 'Icon',
        controls: [
          {
            id: 'config.items.iconSize',
            label: 'Size',
            type: 'slider',
            value: state.config.items.iconSize,
            min: 12,
            max: 28,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.items.iconGap',
            label: 'Gap to Text',
            type: 'slider',
            value: state.config.items.iconGap,
            min: 4,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.items.iconOpacity',
            label: 'Opacity',
            type: 'slider',
            value: state.config.items.iconOpacity,
            min: 20,
            max: 100,
            step: 10,
            formatLabel: (v: number) => `${v}%`,
          },
        ],
      },
    ],
  }
}
