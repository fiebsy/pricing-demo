/**
 * Biaxial Command Menu V3 - Sync Section Config
 *
 * Animation synchronization controls for timing relationships between layers.
 */

import type { Section } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState } from '../types'
import { BACKDROP_MODE_OPTIONS, EXPAND_ORIGIN_OPTIONS } from '../options'

export function buildSyncSection(state: PlaygroundState): Section {
  return {
    id: 'sync',
    label: 'Sync',
    title: 'Animation Sync',
    groups: [
      {
        title: 'Backdrop Animation',
        controls: [
          {
            id: 'config.animationSync.backdropMode',
            label: 'Mode',
            type: 'select',
            value: state.config.animationSync.backdropMode,
            options: [...BACKDROP_MODE_OPTIONS],
          },
          {
            id: 'config.animationSync.backdropDelay',
            label: 'Delay',
            type: 'slider',
            value: state.config.animationSync.backdropDelay,
            min: -100,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.animationSync.backdropDurationOffset',
            label: 'Duration Offset',
            type: 'slider',
            value: state.config.animationSync.backdropDurationOffset,
            min: -100,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}ms`,
          },
        ],
      },
      {
        title: 'Menu Container',
        controls: [
          {
            id: 'config.animationSync.animateMenuContainer',
            label: 'Enable Animation',
            type: 'toggle',
            value: state.config.animationSync.animateMenuContainer,
            description: 'Menu grows from collapsed to expanded',
          },
          {
            id: 'config.animationSync.expandOrigin',
            label: 'Expand Origin',
            type: 'select',
            value: state.config.animationSync.expandOrigin,
            options: [...EXPAND_ORIGIN_OPTIONS],
            disabled: !state.config.animationSync.animateMenuContainer,
          },
          {
            id: 'config.animationSync.menuContainerDelay',
            label: 'Delay',
            type: 'slider',
            value: state.config.animationSync.menuContainerDelay,
            min: 0,
            max: 150,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
            disabled: !state.config.animationSync.animateMenuContainer,
          },
          {
            id: 'config.animationSync.menuContainerDurationOffset',
            label: 'Duration Offset',
            type: 'slider',
            value: state.config.animationSync.menuContainerDurationOffset,
            min: -100,
            max: 100,
            step: 10,
            formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}ms`,
            disabled: !state.config.animationSync.animateMenuContainer,
          },
        ],
      },
      {
        title: 'Base Timing',
        controls: [
          {
            id: 'config.duration',
            label: 'Expand Duration',
            type: 'slider',
            value: state.config.duration,
            min: 100,
            max: 500,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.collapseDuration',
            label: 'Collapse Duration',
            type: 'slider',
            value: state.config.collapseDuration,
            min: 50,
            max: 300,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.contentFadeDuration',
            label: 'Content Fade',
            type: 'slider',
            value: state.config.contentFadeDuration,
            min: 0,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.contentFadeDelay',
            label: 'Content Delay',
            type: 'slider',
            value: state.config.contentFadeDelay,
            min: 0,
            max: 150,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
    ],
  }
}
