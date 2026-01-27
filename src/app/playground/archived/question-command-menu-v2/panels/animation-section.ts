/**
 * Question Command Menu - Animation Section Config
 */

import type { Section } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from '../config/types'
import { BACKDROP_MODE_OPTIONS, EXPAND_ORIGIN_OPTIONS } from '../config/options'

export function buildAnimationSection(state: PlaygroundState): Section {
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
            value: state.config.animation.duration,
            min: 100,
            max: 600,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.animation.collapseDuration',
            label: 'Collapse Duration',
            type: 'slider',
            value: state.config.animation.collapseDuration,
            min: 50,
            max: 400,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.animation.contentFadeDuration',
            label: 'Content Fade',
            type: 'slider',
            value: state.config.animation.contentFadeDuration,
            min: 0,
            max: 200,
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
            label: 'Mode',
            type: 'select',
            value: state.config.animation.backdropMode,
            options: [...BACKDROP_MODE_OPTIONS],
          },
          {
            id: 'config.animation.backdropDelay',
            label: 'Delay',
            type: 'slider',
            value: state.config.animation.backdropDelay,
            min: -100,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.animation.backdropDurationOffset',
            label: 'Duration Offset',
            type: 'slider',
            value: state.config.animation.backdropDurationOffset,
            min: -100,
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
            label: 'Enable Animation',
            type: 'toggle',
            value: state.config.animation.animateSlotContainers,
          },
          {
            id: 'config.animation.expandOrigin',
            label: 'Bottom Origin',
            description: 'Direction bottom slot content animates',
            type: 'select',
            value: state.config.animation.expandOrigin,
            options: [...EXPAND_ORIGIN_OPTIONS],
          },
          {
            id: 'config.animation.topExpandOrigin',
            label: 'Top Origin',
            description: 'Direction top slot content animates',
            type: 'select',
            value: state.config.animation.topExpandOrigin,
            options: [...EXPAND_ORIGIN_OPTIONS],
          },
          {
            id: 'config.animation.slotContainerDelay',
            label: 'Slot Delay',
            type: 'slider',
            value: state.config.animation.slotContainerDelay,
            min: 0,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.animation.slotContainerDurationOffset',
            label: 'Slot Duration Offset',
            type: 'slider',
            value: state.config.animation.slotContainerDurationOffset,
            min: -100,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}ms`,
          },
        ],
      },
    ],
  }
}
