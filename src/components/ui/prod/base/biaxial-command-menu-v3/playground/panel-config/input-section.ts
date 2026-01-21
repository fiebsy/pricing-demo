/**
 * Biaxial Command Menu V3 - Input Section Config
 *
 * Input trigger settings and expanded state styling.
 */

import type { Section } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from '../types'
import { AREA_BACKGROUND_OPTIONS } from '../options'

export function buildInputSection(state: PlaygroundState): Section {
  return {
    id: 'input',
    label: 'Input',
    title: 'Input Settings',
    groups: [
      {
        title: 'Size',
        controls: [
          {
            id: 'config.inputWidth',
            label: 'Width',
            type: 'slider',
            value: state.config.inputWidth,
            min: 160,
            max: 400,
            step: 10,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.inputHeight',
            label: 'Height',
            type: 'slider',
            value: state.config.inputHeight,
            min: 32,
            max: 64,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Padding',
        controls: [
          {
            id: 'config.inputPaddingX',
            label: 'Base H-Padding',
            type: 'slider',
            value: state.config.inputPaddingX ?? 12,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
            description: 'Horizontal padding in both states',
          },
          {
            id: 'config.inputPaddingExpanded',
            label: 'Expanded H-Padding',
            type: 'slider',
            value: state.config.inputPaddingExpanded,
            min: -12,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}px`,
            description: 'Additional padding when expanded',
          },
          {
            id: 'config.inputTopPaddingExpanded',
            label: 'Expanded Top',
            type: 'slider',
            value: state.config.inputTopPaddingExpanded,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Expanded Appearance',
        controls: [
          {
            id: 'config.inputBackground',
            label: 'Background',
            type: 'select',
            value: state.config.inputBackground ?? 'tertiary',
            options: [...AREA_BACKGROUND_OPTIONS],
          },
        ],
      },
      {
        title: 'Behavior',
        controls: [
          {
            id: 'config.inputCursor',
            label: 'Cursor',
            type: 'select',
            value: state.config.inputCursor ?? 'text',
            options: [
              { value: 'text', label: 'Text' },
              { value: 'pointer', label: 'Pointer' },
            ],
            description: 'Cursor when collapsed',
          },
          {
            id: 'config.showInputIcon',
            label: 'Left Icon',
            type: 'toggle',
            value: state.config.showInputIcon ?? true,
          },
          {
            id: 'config.showRightIcon',
            label: 'Right Icon',
            type: 'toggle',
            value: state.config.showRightIcon ?? false,
            description: 'Replaces keyboard hint',
          },
          {
            id: 'config.showKeyboardHint',
            label: 'Kbd Hint',
            type: 'toggle',
            value: state.config.showKeyboardHint ?? true,
            description: 'Shows when no right icon',
          },
        ],
      },
    ],
  }
}
