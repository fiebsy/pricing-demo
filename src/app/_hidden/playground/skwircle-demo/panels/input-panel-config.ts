/**
 * Input Panel Configuration
 */

import type { Section as ControlSection } from '@/components/ui/prod/base/control-panel'
import type { InputConfig } from '../types'
import { INPUT_STATE_OPTIONS, RING_COLOR_OPTIONS, ROUNDNESS_OPTIONS } from '../constants'

export const createInputPanelConfig = (config: InputConfig): ControlSection => ({
  id: 'input',
  title: 'Input',
  tabLabel: 'Input',
  subsections: [
    {
      title: 'Appearance',
      controls: [
        {
          id: 'roundness',
          label: 'Roundness',
          type: 'select',
          value: config.roundness,
          options: ROUNDNESS_OPTIONS,
        },
        {
          id: 'state',
          label: 'State',
          type: 'select',
          value: config.state,
          options: INPUT_STATE_OPTIONS,
        },
      ],
    },
    {
      title: 'Content',
      controls: [
        {
          id: 'placeholder',
          label: 'Placeholder',
          type: 'text',
          value: config.placeholder,
          placeholder: 'Enter placeholder...',
        },
        {
          id: 'showIcon',
          label: 'Show Icon',
          type: 'inline-toggle',
          value: config.showIcon,
        },
      ],
    },
    {
      title: 'Ring',
      controls: [
        {
          id: 'ring',
          label: 'Enable Ring',
          type: 'inline-toggle',
          value: config.ring,
        },
        {
          id: 'ringColor',
          label: 'Ring Color',
          type: 'color-select',
          value: config.ringColor,
          options: RING_COLOR_OPTIONS,
          disabled: !config.ring,
        },
        {
          id: 'ringWidth',
          label: 'Ring Width',
          type: 'slider',
          value: config.ringWidth,
          min: 1,
          max: 4,
          step: 1,
          formatLabel: (v) => `${v}px`,
          disabled: !config.ring,
        },
      ],
    },
  ],
})
