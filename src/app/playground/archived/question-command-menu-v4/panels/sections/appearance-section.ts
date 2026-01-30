/**
 * Question Command Menu V4 - Appearance Section Builder
 *
 * Configures visual appearance: background, shadow, shine, gradient.
 */

import type { Section } from '@/components/ui/patterns/control-panel'
import type { PlaygroundState } from '../../types'
import {
  BACKGROUND_WITH_NONE_OPTIONS,
  SHADOW_OPTIONS,
  SHINE_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  GRADIENT_OPTIONS,
  GRADIENT_COLOR_OPTIONS,
} from '../../config/options'

// ============================================================================
// APPEARANCE SECTION
// ============================================================================

export function buildAppearanceSection(state: PlaygroundState): Section {
  const appearance = state.config.appearance

  return {
    id: 'appearance',
    label: 'Appearance',
    title: 'Appearance Settings',
    groups: [
      {
        title: 'Background',
        controls: [
          {
            id: 'config.appearance.background',
            label: 'Background',
            type: 'select',
            value: appearance.background,
            options: [...BACKGROUND_WITH_NONE_OPTIONS],
          },
          {
            id: 'config.appearance.squircle',
            label: 'Use Squircle Corners',
            type: 'toggle',
            value: appearance.squircle,
          },
        ],
      },
      {
        title: 'Effects',
        controls: [
          {
            id: 'config.appearance.shadow',
            label: 'Shadow',
            type: 'select',
            value: appearance.shadow,
            options: [...SHADOW_OPTIONS],
          },
          {
            id: 'config.appearance.shine',
            label: 'Shine',
            type: 'select',
            value: appearance.shine,
            options: [...SHINE_OPTIONS],
          },
          {
            id: 'config.appearance.borderRadius',
            label: 'Border Radius',
            type: 'select',
            value: appearance.borderRadius,
            options: [...BORDER_RADIUS_OPTIONS],
          },
        ],
      },
      {
        title: 'Gradient',
        controls: [
          {
            id: 'config.appearance.gradient',
            label: 'Gradient',
            type: 'select',
            value: appearance.gradient,
            options: [...GRADIENT_OPTIONS],
          },
          {
            id: 'config.appearance.gradientColor',
            label: 'Gradient Color',
            type: 'select',
            value: appearance.gradientColor,
            options: [...GRADIENT_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}
