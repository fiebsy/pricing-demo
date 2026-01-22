/**
 * Question Command Menu - Bottom Section Config
 */

import type { Section } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from '../config/types'
import {
  BACKGROUND_OPTIONS,
  BORDER_COLOR_OPTIONS,
  SHINE_OPTIONS,
  BOTTOM_SECTION_CONTENT_OPTIONS,
} from '../config/options'

export function buildBottomSection(state: PlaygroundState): Section {
  return {
    id: 'bottom',
    label: 'Bottom',
    title: 'Bottom Section Settings',
    groups: [
      {
        title: 'Enable',
        controls: [
          {
            id: 'config.bottomSlot.enabled',
            label: 'Enable Bottom Section',
            type: 'toggle',
            value: state.config.bottomSlot.enabled ?? true,
          },
        ],
      },
      {
        title: 'Content',
        controls: [
          {
            id: 'config.bottomSlot.contentType',
            label: 'Content Type',
            type: 'select',
            value: state.config.bottomSlot.contentType ?? 'questions',
            options: [...BOTTOM_SECTION_CONTENT_OPTIONS],
          },
        ],
      },
      {
        title: 'Size',
        controls: [
          {
            id: 'config.layout.maxBottomHeight',
            label: 'Max Height',
            type: 'slider',
            value: state.config.layout.maxBottomHeight,
            min: 48,
            max: 600,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.layout.bottomGap',
            label: 'Gap from Trigger',
            type: 'slider',
            value: state.config.layout.bottomGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.bottomSlot.inset',
            label: 'Inset',
            type: 'slider',
            value: state.config.bottomSlot.inset ?? 4,
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
            id: 'config.bottomSlot.background',
            label: 'Background',
            type: 'select',
            value: state.config.bottomSlot.background ?? 'secondary',
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'config.bottomSlot.shine',
            label: 'Shine',
            type: 'select',
            value: state.config.bottomSlot.shine ?? 'none',
            options: [...SHINE_OPTIONS],
          },
          {
            id: 'config.bottomSlot.borderRadius',
            label: 'Border Radius',
            type: 'slider',
            value: state.config.bottomSlot.borderRadius ?? 14,
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
            id: 'config.bottomSlot.borderWidth',
            label: 'Border Width',
            type: 'slider',
            value: state.config.bottomSlot.borderWidth ?? 1,
            min: 0,
            max: 4,
            step: 1,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.bottomSlot.borderColor',
            label: 'Border Color',
            type: 'select',
            value: state.config.bottomSlot.borderColor ?? 'primary',
            options: [...BORDER_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Scroll & Overflow',
        controls: [
          {
            id: 'config.bottomSlot.overflowGradient',
            label: 'Overflow Gradient',
            type: 'toggle',
            value: state.config.bottomSlot.overflowGradient,
          },
          {
            id: 'config.bottomSlot.overflowGradientHeight',
            label: 'Gradient Height',
            type: 'slider',
            value: state.config.bottomSlot.overflowGradientHeight,
            min: 8,
            max: 48,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.bottomSlot.scrollPaddingTop',
            label: 'Scroll Padding Top',
            type: 'slider',
            value: state.config.bottomSlot.scrollPaddingTop,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.bottomSlot.scrollPaddingBottom',
            label: 'Scroll Padding Bottom',
            type: 'slider',
            value: state.config.bottomSlot.scrollPaddingBottom,
            min: 0,
            max: 32,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Animation',
        controls: [
          {
            id: 'config.bottomSlot.delayOffset',
            label: 'Delay Offset',
            type: 'slider',
            value: state.config.bottomSlot.delayOffset ?? 0,
            min: -100,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.bottomSlot.durationOffset',
            label: 'Duration Offset',
            type: 'slider',
            value: state.config.bottomSlot.durationOffset ?? 100,
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
