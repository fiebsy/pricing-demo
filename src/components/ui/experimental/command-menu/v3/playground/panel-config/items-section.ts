/**
 * Biaxial Command Menu V3 - Items Section Config
 *
 * Menu item styling controls: height, gap, padding, border radius, and hover effects.
 */

import type { Section } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from '../types'
import { AREA_BACKGROUND_OPTIONS } from '../options'

export function buildItemsSection(state: PlaygroundState): Section {
  return {
    id: 'items',
    label: 'Items',
    title: 'Item Settings',
    groups: [
      {
        title: 'Size',
        controls: [
          {
            id: 'config.itemHeight',
            label: 'Height',
            type: 'slider',
            value: state.config.itemHeight,
            min: 28,
            max: 48,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.itemGap',
            label: 'Gap',
            type: 'slider',
            value: state.config.itemGap,
            min: 0,
            max: 8,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.itemsTopGap',
            label: 'Top Gap',
            type: 'slider',
            value: state.config.itemsTopGap ?? 0,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
            description: 'Gap above first item in each group',
          },
        ],
      },
      {
        title: 'Spacing',
        controls: [
          {
            id: 'config.itemPaddingX',
            label: 'Horizontal Padding',
            type: 'slider',
            value: state.config.itemPaddingX ?? 10,
            min: 4,
            max: 20,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.itemPaddingY',
            label: 'Vertical Padding',
            type: 'slider',
            value: state.config.itemPaddingY ?? 0,
            min: 0,
            max: 12,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Appearance',
        controls: [
          {
            id: 'config.itemBorderRadius',
            label: 'Border Radius',
            type: 'slider',
            value: state.config.itemBorderRadius ?? 12,
            min: 0,
            max: 20,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.itemHighlightBackground',
            label: 'Highlight Bg',
            type: 'select',
            value: state.config.itemHighlightBackground ?? 'quaternary',
            options: [...AREA_BACKGROUND_OPTIONS].filter(o => o.value !== 'none'),
          },
          {
            id: 'config.itemHoverBackground',
            label: 'Hover Bg',
            type: 'select',
            value: state.config.itemHoverBackground ?? 'tertiary',
            options: [...AREA_BACKGROUND_OPTIONS].filter(o => o.value !== 'none'),
          },
        ],
      },
      {
        title: 'Icon',
        controls: [
          {
            id: 'config.itemIconSize',
            label: 'Size',
            type: 'slider',
            value: state.config.itemIconSize ?? 16,
            min: 12,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.itemIconGap',
            label: 'Gap',
            type: 'slider',
            value: state.config.itemIconGap ?? 8,
            min: 4,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.itemIconOpacity',
            label: 'Opacity',
            type: 'slider',
            value: state.config.itemIconOpacity ?? 60,
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
