/**
 * Button Panel Configuration
 */

import type { ControlSection } from '@/components/ui/controls/unified-control-panel'
import type { ButtonConfig } from '../types'
import { BUTTON_INTENT_OPTIONS, BUTTON_SIZE_OPTIONS, ROUNDNESS_OPTIONS } from '../constants'

export const createButtonPanelConfig = (config: ButtonConfig): ControlSection => ({
  id: 'button',
  title: 'Button',
  tabLabel: 'Button',
  subsections: [
    {
      title: 'Appearance',
      controls: [
        {
          id: 'intent',
          label: 'Intent',
          type: 'select',
          value: config.intent,
          options: BUTTON_INTENT_OPTIONS,
        },
        {
          id: 'size',
          label: 'Size',
          type: 'select',
          value: config.size,
          options: BUTTON_SIZE_OPTIONS,
        },
        {
          id: 'roundness',
          label: 'Roundness',
          type: 'select',
          value: config.roundness,
          options: ROUNDNESS_OPTIONS,
        },
      ],
    },
    {
      title: 'Content',
      controls: [
        {
          id: 'label',
          label: 'Label',
          type: 'text',
          value: config.label,
          placeholder: 'Button text...',
        },
        {
          id: 'showIcon',
          label: 'Show Icon',
          type: 'inline-toggle',
          value: config.showIcon,
        },
        {
          id: 'iconOnly',
          label: 'Icon Only',
          type: 'inline-toggle',
          value: config.iconOnly,
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
          id: 'ringOpacity',
          label: 'Ring Opacity',
          type: 'slider',
          value: config.ringOpacity,
          min: 0,
          max: 100,
          step: 10,
          formatLabel: (v) => `${v}%`,
          disabled: !config.ring,
        },
      ],
    },
  ],
})
