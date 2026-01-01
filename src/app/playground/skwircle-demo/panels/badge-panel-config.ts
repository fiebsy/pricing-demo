/**
 * Badge Panel Configuration
 */

import type { ControlSection } from '@/components/ui/controls/unified-control-panel'
import type { BadgeConfig } from '../types'
import { BADGE_TYPE_OPTIONS, BADGE_SIZE_OPTIONS, BADGE_COLOR_OPTIONS, ROUNDNESS_OPTIONS } from '../constants'

export const createBadgePanelConfig = (config: BadgeConfig): ControlSection => ({
  id: 'badge',
  title: 'Badge',
  tabLabel: 'Badge',
  subsections: [
    {
      title: 'Appearance',
      controls: [
        {
          id: 'type',
          label: 'Type',
          type: 'select',
          value: config.type,
          options: BADGE_TYPE_OPTIONS,
        },
        {
          id: 'size',
          label: 'Size',
          type: 'select',
          value: config.size,
          options: BADGE_SIZE_OPTIONS,
        },
        {
          id: 'color',
          label: 'Color',
          type: 'color-select',
          value: config.color,
          options: BADGE_COLOR_OPTIONS,
        },
        {
          id: 'roundness',
          label: 'Roundness',
          type: 'select',
          value: config.roundness,
          options: ROUNDNESS_OPTIONS,
          disabled: config.type === 'pill',
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
          placeholder: 'Badge text...',
        },
        {
          id: 'showIcon',
          label: 'Show Icon',
          type: 'inline-toggle',
          value: config.showIcon,
        },
      ],
    },
  ],
})
