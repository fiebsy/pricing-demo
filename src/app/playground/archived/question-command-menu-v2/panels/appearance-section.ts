/**
 * Question Command Menu - Appearance Section Config
 */

import type { Section } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from '../config/types'
import {
  BACKGROUND_OPTIONS,
  SHINE_OPTIONS,
  SHADOW_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  GRADIENT_OPTIONS,
  GRADIENT_COLOR_OPTIONS,
} from '../config/options'

export function buildAppearanceSection(state: PlaygroundState): Section {
  return {
    id: 'appearance',
    label: 'Appearance',
    title: 'Overall Appearance',
    groups: [
      {
        title: 'Surface',
        controls: [
          {
            id: 'config.appearance.background',
            label: 'Background',
            type: 'select',
            value: state.config.appearance.background,
            options: [...BACKGROUND_OPTIONS],
          },
          {
            id: 'config.appearance.shine',
            label: 'Shine Effect',
            type: 'select',
            value: state.config.appearance.shine,
            options: [...SHINE_OPTIONS],
          },
          {
            id: 'config.appearance.shadow',
            label: 'Shadow',
            type: 'select',
            value: state.config.appearance.shadow,
            options: [...SHADOW_OPTIONS],
          },
        ],
      },
      {
        title: 'Shape',
        controls: [
          {
            id: 'config.appearance.borderRadius',
            label: 'Corner Radius',
            type: 'select',
            value: state.config.appearance.borderRadius,
            options: [...BORDER_RADIUS_OPTIONS],
          },
          {
            id: 'config.layout.borderRadius',
            label: 'Radius (px)',
            type: 'slider',
            value: state.config.layout.borderRadius,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.appearance.squircle',
            label: 'Squircle Corners',
            type: 'toggle',
            value: state.config.appearance.squircle,
          },
        ],
      },
      {
        title: 'Depth Gradient',
        controls: [
          {
            id: 'config.appearance.gradient',
            label: 'Gradient',
            type: 'select',
            value: state.config.appearance.gradient,
            options: [...GRADIENT_OPTIONS],
          },
          {
            id: 'config.appearance.gradientColor',
            label: 'Gradient Color',
            type: 'select',
            value: state.config.appearance.gradientColor,
            options: [...GRADIENT_COLOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Backdrop',
        controls: [
          {
            id: 'config.layout.backdropTopOffset',
            label: 'Top Offset',
            type: 'slider',
            value: state.config.layout.backdropTopOffset,
            min: -20,
            max: 20,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}
