/**
 * ButtonAnimation Playground - Style Panel
 *
 * Control panel section for visual styling settings.
 *
 * @module playground/button-animation/panels
 */

import type { Section as ControlSection } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundConfig } from '../types'
import {
  BUTTON_VARIANT_OPTIONS,
  SIZE_OPTIONS,
  ROUNDNESS_OPTIONS,
  GAP_OPTIONS,
} from '../constants'

/**
 * Creates the style control section.
 */
export function createStylePanel(config: PlaygroundConfig): ControlSection {
  return {
    id: 'style',
    title: 'Style',
    tabLabel: 'Style',
    groups: [
      {
        title: 'Parent Variants',
        controls: [
          {
            id: 'parentVariant',
            label: 'Collapsed',
            type: 'select',
            value: config.parentVariant,
            options: BUTTON_VARIANT_OPTIONS,
          },
          {
            id: 'parentExpandedVariant',
            label: 'Expanded',
            type: 'select',
            value: config.parentExpandedVariant,
            options: BUTTON_VARIANT_OPTIONS,
          },
        ],
      },
      {
        title: 'Child Variants',
        controls: [
          {
            id: 'childVariant',
            label: 'Default',
            type: 'select',
            value: config.childVariant,
            options: BUTTON_VARIANT_OPTIONS,
          },
          {
            id: 'childSelectedVariant',
            label: 'Selected',
            type: 'select',
            value: config.childSelectedVariant,
            options: BUTTON_VARIANT_OPTIONS,
          },
        ],
      },
      {
        title: '"All" Button',
        controls: [
          {
            id: 'allButtonVariant',
            label: 'Variant',
            type: 'select',
            value: config.allButtonVariant,
            options: BUTTON_VARIANT_OPTIONS,
          },
          {
            id: 'allButtonOffset',
            label: 'Offset',
            type: 'slider',
            value: config.allButtonOffset,
            min: -16,
            max: 0,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Layout',
        controls: [
          {
            id: 'size',
            label: 'Size',
            type: 'select',
            value: config.size,
            options: SIZE_OPTIONS,
          },
          {
            id: 'roundness',
            label: 'Roundness',
            type: 'select',
            value: config.roundness,
            options: ROUNDNESS_OPTIONS,
          },
          {
            id: 'gap',
            label: 'Gap',
            type: 'select',
            value: config.gap,
            options: GAP_OPTIONS,
          },
        ],
      },
      {
        title: 'Behavior',
        controls: [
          {
            id: 'asLink',
            label: 'Render as Links',
            type: 'toggle',
            value: config.asLink,
          },
        ],
      },
    ],
  }
}
