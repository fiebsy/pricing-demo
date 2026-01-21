/**
 * ButtonAnimation Playground - Child Animation Panel
 *
 * Control panel section for child animation settings.
 *
 * @module playground/button-animation/panels
 */

import type { Section as ControlSection } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundConfig } from '../types'
import {
  EASE_OPTIONS,
  ENTRY_DIRECTION_OPTIONS,
  ENTRY_ORDER_OPTIONS,
  STAGGER_DIRECTION_OPTIONS,
} from '../constants'

/**
 * Creates the child animation control section.
 */
export function createChildPanel(config: PlaygroundConfig): ControlSection {
  const isSpring = config.childEase === 'spring'
  const hasDirection = config.childEntryDirection !== 'none'

  return {
    id: 'child',
    title: 'Child Animation',
    tabLabel: 'Child',
    groups: [
      {
        title: 'Stagger',
        controls: [
          {
            id: 'childDelay',
            label: 'Initial Delay',
            type: 'slider',
            value: config.childDelay,
            min: 0,
            max: 300,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'childStagger',
            label: 'Stagger',
            type: 'slider',
            value: config.childStagger,
            min: 10,
            max: 100,
            step: 5,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Timing',
        controls: [
          {
            id: 'childDuration',
            label: 'Duration',
            type: 'slider',
            value: config.childDuration,
            min: 50,
            max: 500,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
            disabled: isSpring,
          },
          {
            id: 'childEase',
            label: 'Ease',
            type: 'select',
            value: config.childEase,
            options: EASE_OPTIONS,
          },
        ],
      },
      {
        title: 'Spring Physics',
        controls: [
          {
            id: 'childStiffness',
            label: 'Stiffness',
            type: 'slider',
            value: config.childStiffness,
            min: 100,
            max: 800,
            step: 50,
            formatLabel: (v: number) => `${v}`,
            disabled: !isSpring,
          },
          {
            id: 'childDamping',
            label: 'Damping',
            type: 'slider',
            value: config.childDamping,
            min: 10,
            max: 60,
            step: 5,
            formatLabel: (v: number) => `${v}`,
            disabled: !isSpring,
          },
        ],
      },
      {
        title: 'Entry Direction',
        controls: [
          {
            id: 'childEntryDirection',
            label: 'Direction',
            type: 'select',
            value: config.childEntryDirection,
            options: ENTRY_DIRECTION_OPTIONS,
          },
          {
            id: 'childEntryDistance',
            label: 'Distance',
            type: 'slider',
            value: config.childEntryDistance,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
            disabled: !hasDirection,
          },
        ],
      },
      {
        title: 'Entry Order',
        controls: [
          {
            id: 'childEntryOrder',
            label: 'Order',
            type: 'select',
            value: config.childEntryOrder,
            options: ENTRY_ORDER_OPTIONS,
          },
          {
            id: 'childStaggerDirection',
            label: 'Stagger Dir',
            type: 'select',
            value: config.childStaggerDirection,
            options: STAGGER_DIRECTION_OPTIONS,
          },
        ],
      },
      {
        title: 'Exit',
        controls: [
          {
            id: 'childExitDuration',
            label: 'Exit Duration',
            type: 'slider',
            value: config.childExitDuration,
            min: 50,
            max: 200,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
    ],
  }
}
