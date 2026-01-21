/**
 * ButtonAnimation Playground - Parent Animation Panel
 *
 * Control panel section for parent animation settings.
 *
 * @module playground/button-animation/panels
 */

import type { Section as ControlSection } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundConfig } from '../types'
import { EASE_OPTIONS, ORCHESTRATION_OPTIONS } from '../constants'

/**
 * Creates the parent animation control section.
 */
export function createParentPanel(config: PlaygroundConfig): ControlSection {
  const isSpring = config.parentEase === 'spring'

  return {
    id: 'parent',
    title: 'Parent Animation',
    tabLabel: 'Parent',
    groups: [
      {
        title: 'Timing',
        controls: [
          {
            id: 'parentDuration',
            label: 'Duration',
            type: 'slider',
            value: config.parentDuration,
            min: 50,
            max: 500,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
            disabled: isSpring,
          },
          {
            id: 'parentEase',
            label: 'Ease',
            type: 'select',
            value: config.parentEase,
            options: EASE_OPTIONS,
          },
        ],
      },
      {
        title: 'Spring Physics',
        controls: [
          {
            id: 'parentStiffness',
            label: 'Stiffness',
            type: 'slider',
            value: config.parentStiffness,
            min: 100,
            max: 800,
            step: 50,
            formatLabel: (v: number) => `${v}`,
            disabled: !isSpring,
          },
          {
            id: 'parentDamping',
            label: 'Damping',
            type: 'slider',
            value: config.parentDamping,
            min: 10,
            max: 60,
            step: 5,
            formatLabel: (v: number) => `${v}`,
            disabled: !isSpring,
          },
        ],
      },
      {
        title: 'Exit & Orchestration',
        controls: [
          {
            id: 'parentExitDuration',
            label: 'Exit Duration',
            type: 'slider',
            value: config.parentExitDuration,
            min: 50,
            max: 300,
            step: 10,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'parentWhen',
            label: 'Orchestration',
            type: 'select',
            value: config.parentWhen,
            options: ORCHESTRATION_OPTIONS,
          },
        ],
      },
    ],
  }
}
