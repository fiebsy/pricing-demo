/**
 * Question Command Menu V4 - Layout Section Builder
 *
 * Configures dimensions and spacing: widths, heights, gaps.
 */

import type { Section } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from '../../types'

// ============================================================================
// LAYOUT SECTION
// ============================================================================

export function buildLayoutSection(state: PlaygroundState): Section {
  const layout = state.config.layout

  return {
    id: 'layout',
    label: 'Layout',
    title: 'Layout Settings',
    groups: [
      {
        title: 'Dimensions',
        controls: [
          {
            id: 'config.layout.triggerWidth',
            label: 'Trigger Width',
            type: 'slider',
            value: layout.triggerWidth,
            min: 200,
            max: 600,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.layout.triggerHeight',
            label: 'Trigger Height',
            type: 'slider',
            value: layout.triggerHeight,
            min: 32,
            max: 64,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.layout.fillWidth',
            label: 'Fill Width (No Horizontal Expand)',
            type: 'toggle',
            value: layout.fillWidth ?? true,
          },
          {
            id: 'config.layout.panelWidth',
            label: 'Panel Width',
            type: 'slider',
            value: layout.panelWidth,
            min: 280,
            max: 700,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Gaps',
        controls: [
          {
            id: 'config.layout.topGap',
            label: 'Top Gap',
            type: 'slider',
            value: layout.topGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.layout.bottomGap',
            label: 'Bottom Gap',
            type: 'slider',
            value: layout.bottomGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.layout.borderRadius',
            label: 'Border Radius',
            type: 'slider',
            value: layout.borderRadius,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}
