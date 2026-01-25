/**
 * Biaxial Command Menu V3 - Backdrop Section Config
 *
 * Backdrop layer settings including shape, surface, and gradient controls.
 */

import type { Section } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from '../types'
import {
  BACKGROUND_OPTIONS,
  SHINE_OPTIONS,
  SHADOW_OPTIONS,
  GRADIENT_OPTIONS,
  GRADIENT_COLOR_OPTIONS,
} from '../options'

export function buildBackdropSection(state: PlaygroundState): Section {
  return {
    id: 'backdrop',
    label: 'Backdrop',
    title: 'Backdrop Settings',
    groups: [
      {
        title: 'Shape',
        controls: [
          {
            id: 'config.borderRadius',
            label: 'Border Radius',
            type: 'slider',
            value: state.config.borderRadius,
            min: 8,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.topBorderRadius',
            label: 'Top Radius',
            type: 'slider',
            value: state.config.topBorderRadius ?? state.config.borderRadius,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.menuBorderRadius',
            label: 'Menu Radius',
            type: 'slider',
            value: state.config.menuBorderRadius ?? state.config.borderRadius,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.appearance.squircle',
            label: 'Squircle',
            type: 'toggle',
            value: state.config.appearance.squircle ?? true,
          },
          {
            id: 'config.backdropTopOffset',
            label: 'Top Extension',
            type: 'slider',
            value: state.config.backdropTopOffset ?? 0,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Surface',
        controls: [
          {
            id: 'config.appearance.background',
            label: 'Background',
            type: 'select',
            value: state.config.appearance.background ?? 'primary',
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'config.appearance.shine',
            label: 'Shine',
            type: 'select',
            value: state.config.appearance.shine ?? 'shine-2-subtle',
            options: [...SHINE_OPTIONS],
          },
          {
            id: 'config.appearance.shadow',
            label: 'Shadow',
            type: 'select',
            value: state.config.appearance.shadow ?? '2xl',
            options: [...SHADOW_OPTIONS],
          },
        ],
      },
      {
        title: 'Gradient',
        controls: [
          {
            id: 'config.appearance.gradient',
            label: 'Pattern',
            type: 'select',
            value: state.config.appearance.gradient ?? 'subtle-depth-md',
            options: [...GRADIENT_OPTIONS],
          },
          {
            id: 'config.appearance.gradientColor',
            label: 'Color',
            type: 'select',
            value: state.config.appearance.gradientColor ?? 'tertiary',
            options: [...GRADIENT_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}
