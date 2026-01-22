/**
 * Question Command Menu - Top Section Config
 */

import type { Section } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from '../config/types'
import {
  BACKGROUND_OPTIONS,
  BORDER_COLOR_OPTIONS,
  SHINE_OPTIONS,
  TOP_SECTION_CONTENT_OPTIONS,
} from '../config/options'

export function buildTopSection(state: PlaygroundState): Section {
  return {
    id: 'top',
    label: 'Top',
    title: 'Top Section Settings',
    groups: [
      {
        title: 'Enable',
        controls: [
          {
            id: 'config.topSlot.enabled',
            label: 'Enable Top Section',
            type: 'toggle',
            value: state.config.topSlot.enabled ?? false,
          },
        ],
      },
      {
        title: 'Content',
        controls: [
          {
            id: 'config.topSlot.contentType',
            label: 'Content Type',
            type: 'select',
            value: state.config.topSlot.contentType,
            options: [...TOP_SECTION_CONTENT_OPTIONS],
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'config.topSlot.height',
            label: 'Height',
            type: 'slider',
            value: state.config.topSlot.height ?? 48,
            min: 32,
            max: 96,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.layout.topGap',
            label: 'Gap to Trigger',
            type: 'slider',
            value: state.config.layout.topGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.topSlot.inset',
            label: 'Inset',
            type: 'slider',
            value: state.config.topSlot.inset ?? 4,
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
            id: 'config.topSlot.background',
            label: 'Background',
            type: 'select',
            value: state.config.topSlot.background ?? 'secondary',
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'config.topSlot.shine',
            label: 'Shine',
            type: 'select',
            value: state.config.topSlot.shine ?? 'none',
            options: [...SHINE_OPTIONS],
          },
          {
            id: 'config.topSlot.borderRadius',
            label: 'Border Radius',
            type: 'slider',
            value: state.config.topSlot.borderRadius ?? 14,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Border',
        controls: [
          {
            id: 'config.topSlot.borderWidth',
            label: 'Border Width',
            type: 'slider',
            value: state.config.topSlot.borderWidth ?? 1,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.topSlot.borderColor',
            label: 'Border Color',
            type: 'select',
            value: state.config.topSlot.borderColor ?? 'primary',
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Animation',
        controls: [
          {
            id: 'config.topSlot.delayOffset',
            label: 'Delay Offset',
            type: 'slider',
            value: state.config.topSlot.delayOffset ?? 0,
            min: -100,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.topSlot.durationOffset',
            label: 'Duration Offset',
            type: 'slider',
            value: state.config.topSlot.durationOffset ?? -100,
            min: -200,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}ms`,
          },
        ],
      },
    ],
  }
}
