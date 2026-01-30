/**
 * Question Command Menu V4 - Animation Section Builder
 *
 * Configures animation timing and behavior.
 */

import type { Section } from '@/components/ui/patterns/control-panel'
import type { PlaygroundState } from '../../types'
import { BACKDROP_MODE_OPTIONS } from '../../config/options'

// ============================================================================
// ANIMATION SECTION
// ============================================================================

export function buildAnimationSection(state: PlaygroundState): Section {
  const animation = state.config.animation

  return {
    id: 'animation',
    label: 'Animation',
    title: 'Animation Settings',
    groups: [
      {
        title: 'Timing',
        controls: [
          {
            id: 'config.animation.duration',
            label: 'Expand Duration',
            type: 'slider',
            value: animation.duration,
            min: 100,
            max: 800,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.animation.collapseDuration',
            label: 'Collapse Duration',
            type: 'slider',
            value: animation.collapseDuration,
            min: 50,
            max: 500,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Backdrop',
        controls: [
          {
            id: 'config.animation.backdropMode',
            label: 'Backdrop Mode',
            type: 'select',
            value: animation.backdropMode,
            options: [...BACKDROP_MODE_OPTIONS],
          },
          {
            id: 'config.animation.backdropDelay',
            label: 'Backdrop Delay',
            type: 'slider',
            value: animation.backdropDelay,
            min: 0,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.animation.backdropDurationOffset',
            label: 'Backdrop Duration Offset',
            type: 'slider',
            value: animation.backdropDurationOffset,
            min: -200,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}ms`,
          },
        ],
      },
      {
        title: 'Slot Containers',
        controls: [
          {
            id: 'config.animation.animateSlotContainers',
            label: 'Animate Slot Containers',
            type: 'toggle',
            value: animation.animateSlotContainers,
          },
          {
            id: 'config.animation.slotContainerDelay',
            label: 'Slot Container Delay',
            type: 'slider',
            value: animation.slotContainerDelay,
            min: 0,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.animation.slotContainerDurationOffset',
            label: 'Duration Offset',
            type: 'slider',
            value: animation.slotContainerDurationOffset,
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
