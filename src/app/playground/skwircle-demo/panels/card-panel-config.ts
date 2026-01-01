/**
 * Card Panel Configuration
 */

import type { ControlSection } from '@/components/ui/controls/unified-control-panel'
import type { CardConfig } from '../types'
import {
  CARD_INTENT_OPTIONS,
  DEPTH_INTENSITY_OPTIONS,
  DEPTH_DIRECTION_OPTIONS,
  ROUNDNESS_OPTIONS,
  ELEVATION_OPTIONS,
} from '../constants'

export const createCardPanelConfig = (config: CardConfig): ControlSection => ({
  id: 'card',
  title: 'Card',
  tabLabel: 'Card',
  subsections: [
    {
      title: 'Base',
      controls: [
        {
          id: 'intent',
          label: 'Intent',
          type: 'select',
          value: config.intent,
          options: CARD_INTENT_OPTIONS,
        },
        {
          id: 'elevation',
          label: 'Elevation',
          type: 'select',
          value: config.elevation,
          options: ELEVATION_OPTIONS,
        },
        {
          id: 'roundness',
          label: 'Roundness',
          type: 'select',
          value: config.roundness,
          options: ROUNDNESS_OPTIONS,
        },
        {
          id: 'fillMode',
          label: 'Fill Mode',
          type: 'inline-toggle',
          value: config.fillMode,
        },
      ],
    },
    {
      title: 'Depth Gradient',
      controls: [
        {
          id: 'depthIntensity',
          label: 'Intensity',
          type: 'select',
          value: config.depthIntensity,
          options: DEPTH_INTENSITY_OPTIONS,
        },
        {
          id: 'depthDirection',
          label: 'Direction',
          type: 'select',
          value: config.depthDirection,
          options: DEPTH_DIRECTION_OPTIONS,
          disabled: config.depthIntensity === 'none',
        },
      ],
    },
    {
      title: 'Border',
      controls: [
        {
          id: 'borderWidth',
          label: 'Border Width',
          type: 'slider',
          value: config.borderWidth,
          min: 0,
          max: 4,
          step: 1,
          formatLabel: (v) => `${v}px`,
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
