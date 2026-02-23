/**
 * Button Fluid Layout Control Panel Configuration
 *
 * Simplified panel config for FluidButtonGroup API.
 */

import type { PanelConfig, Section } from '@/components/ui/patterns/control-panel'
import type { ButtonFluidLayoutConfig, ButtonFluidLayoutPresetMeta } from '../config/types'
import {
  TIMING_PRESET_OPTIONS,
  COLLAPSE_DURATION_RANGE,
  EXPAND_DURATION_RANGE,
  SHOW_BOTH_DURATION_RANGE,
  EXPAND_DELAY_RANGE,
  EASING_OPTIONS,
  BLUR_AMOUNT_RANGE,
  BLUR_DURATION_RANGE,
  BUTTON_VARIANT_OPTIONS,
  CONTAINER_WIDTH_RANGE,
  GAP_RANGE,
  TEXT_SLIDE_DURATION_RANGE,
  CHECKMARK_DRAW_DURATION_RANGE,
  SPINNER_TO_CHECKMARK_DURATION_RANGE,
  CHECKMARK_ENTRANCE_OPTIONS,
} from '../config/options'

// ============================================================================
// Panel Builder
// ============================================================================

export function buildButtonFluidLayoutPanelConfig(
  config: ButtonFluidLayoutConfig,
  presets: ButtonFluidLayoutPresetMeta[],
  activePresetId: string | null
): PanelConfig {
  return {
    sections: [
      buildButtonStatesSection(config),
      buildTimingSection(config),
      buildBlurSection(config),
      buildLayoutSection(config),
    ],
    presetConfig: {
      presets: presets.map((p) => ({
        id: p.id,
        name: p.name,
        data: p.data,
      })),
      activePresetId,
      showCopyButton: true,
    },
    showReset: true,
  }
}

// ============================================================================
// Section Builders
// ============================================================================

function buildButtonStatesSection(config: ButtonFluidLayoutConfig): Section {
  const activeState = config.buttonStates.activeState
  const stateKey = `state${activeState}` as const
  const currentState = config.buttonStates.states[stateKey]

  return {
    id: 'states',
    label: 'States',
    title: 'Button States',
    groups: [
      {
        title: 'Active State',
        controls: [
          {
            id: 'buttonStates.activeState',
            type: 'select',
            label: 'State',
            value: String(activeState),
            options: [
              { label: 'State 1', value: '1' },
              { label: 'State 2', value: '2' },
              { label: 'State 3', value: '3' },
              { label: 'State 4', value: '4' },
            ],
          },
        ],
      },
      {
        title: `State ${activeState} Config`,
        controls: [
          {
            id: `buttonStates.states.${stateKey}.text`,
            type: 'text',
            label: 'Text',
            value: currentState.text,
          },
          {
            id: `buttonStates.states.${stateKey}.showText`,
            type: 'toggle',
            label: 'Show Text',
            value: currentState.showText,
          },
          {
            id: `buttonStates.states.${stateKey}.showSpinner`,
            type: 'toggle',
            label: 'Show Spinner',
            value: currentState.showSpinner,
          },
          {
            id: `buttonStates.states.${stateKey}.showCheckmark`,
            type: 'toggle',
            label: 'Show Checkmark',
            value: currentState.showCheckmark,
          },
          {
            id: `buttonStates.states.${stateKey}.showLeftButton`,
            type: 'toggle',
            label: 'Show Left Button',
            value: currentState.showLeftButton,
          },
        ],
      },
      {
        title: 'Transition Timing',
        controls: [
          {
            id: 'stateTransition.textSlideDuration',
            type: 'slider',
            label: 'Text Slide',
            value: config.stateTransition.textSlideDuration,
            min: TEXT_SLIDE_DURATION_RANGE.min,
            max: TEXT_SLIDE_DURATION_RANGE.max,
            step: TEXT_SLIDE_DURATION_RANGE.step,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'stateTransition.checkmarkDrawDuration',
            type: 'slider',
            label: 'Checkmark Draw',
            value: config.stateTransition.checkmarkDrawDuration,
            min: CHECKMARK_DRAW_DURATION_RANGE.min,
            max: CHECKMARK_DRAW_DURATION_RANGE.max,
            step: CHECKMARK_DRAW_DURATION_RANGE.step,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'stateTransition.spinnerToCheckmarkDuration',
            type: 'slider',
            label: 'Spinner → Check',
            value: config.stateTransition.spinnerToCheckmarkDuration,
            min: SPINNER_TO_CHECKMARK_DURATION_RANGE.min,
            max: SPINNER_TO_CHECKMARK_DURATION_RANGE.max,
            step: SPINNER_TO_CHECKMARK_DURATION_RANGE.step,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'stateTransition.checkmarkEntranceStyle',
            type: 'select',
            label: 'Checkmark Style',
            value: config.stateTransition.checkmarkEntranceStyle,
            options: [...CHECKMARK_ENTRANCE_OPTIONS],
          },
        ],
      },
    ],
  }
}

function buildTimingSection(config: ButtonFluidLayoutConfig): Section {
  const isCustom = config.timing.preset === 'custom'

  return {
    id: 'timing',
    label: 'Timing',
    title: 'Animation Timing',
    groups: [
      {
        title: 'Preset',
        controls: [
          {
            id: 'timing.preset',
            type: 'select',
            label: 'Timing',
            value: config.timing.preset,
            options: [...TIMING_PRESET_OPTIONS],
          },
          {
            id: 'timing.syncToExpand',
            type: 'toggle',
            label: 'Sync Collapse',
            value: config.timing.syncToExpand,
          },
        ],
      },
      {
        title: 'Custom Timing',
        controls: [
          {
            id: 'timing.custom.collapseDuration',
            type: 'slider',
            label: 'Collapse',
            value: config.timing.custom.collapseDuration,
            min: COLLAPSE_DURATION_RANGE.min,
            max: COLLAPSE_DURATION_RANGE.max,
            step: COLLAPSE_DURATION_RANGE.step,
            formatLabel: (v: number) => `${v}ms`,
            disabled: !isCustom || config.timing.syncToExpand,
          },
          {
            id: 'timing.custom.expandDuration',
            type: 'slider',
            label: 'Expand',
            value: config.timing.custom.expandDuration,
            min: EXPAND_DURATION_RANGE.min,
            max: EXPAND_DURATION_RANGE.max,
            step: EXPAND_DURATION_RANGE.step,
            formatLabel: (v: number) => `${v}ms`,
            disabled: !isCustom,
          },
          {
            id: 'timing.custom.showBothDuration',
            type: 'slider',
            label: 'Show Both',
            value: config.timing.custom.showBothDuration,
            min: SHOW_BOTH_DURATION_RANGE.min,
            max: SHOW_BOTH_DURATION_RANGE.max,
            step: SHOW_BOTH_DURATION_RANGE.step,
            formatLabel: (v: number) => `${v}ms`,
            disabled: !isCustom,
          },
          {
            id: 'timing.custom.expandDelay',
            type: 'slider',
            label: 'Expand Delay',
            value: config.timing.custom.expandDelay ?? 0,
            min: EXPAND_DELAY_RANGE.min,
            max: EXPAND_DELAY_RANGE.max,
            step: EXPAND_DELAY_RANGE.step,
            formatLabel: (v: number) => `${v}ms`,
            disabled: !isCustom,
          },
        ],
      },
      {
        title: 'Custom Easing',
        controls: [
          {
            id: 'timing.custom.collapseEasing',
            type: 'select',
            label: 'Collapse',
            value: config.timing.custom.collapseEasing,
            options: [...EASING_OPTIONS],
            disabled: !isCustom || config.timing.syncToExpand,
          },
          {
            id: 'timing.custom.expandEasing',
            type: 'select',
            label: 'Expand',
            value: config.timing.custom.expandEasing,
            options: [...EASING_OPTIONS],
            disabled: !isCustom,
          },
        ],
      },
    ],
  }
}

function buildBlurSection(config: ButtonFluidLayoutConfig): Section {
  return {
    id: 'blur',
    label: 'Blur',
    title: 'Exit Blur Effect',
    groups: [
      {
        title: 'Blur',
        controls: [
          {
            id: 'blur.enabled',
            type: 'toggle',
            label: 'Enabled',
            value: config.blur.enabled,
          },
          {
            id: 'blur.amount',
            type: 'slider',
            label: 'Amount',
            value: config.blur.amount,
            min: BLUR_AMOUNT_RANGE.min,
            max: BLUR_AMOUNT_RANGE.max,
            step: BLUR_AMOUNT_RANGE.step,
            formatLabel: (v: number) => `${v}px`,
            disabled: !config.blur.enabled,
          },
          {
            id: 'blur.duration',
            type: 'slider',
            label: 'Duration',
            value: config.blur.duration,
            min: BLUR_DURATION_RANGE.min,
            max: BLUR_DURATION_RANGE.max,
            step: BLUR_DURATION_RANGE.step,
            formatLabel: (v: number) => `${v}ms`,
            disabled: !config.blur.enabled,
          },
        ],
      },
    ],
  }
}

function buildLayoutSection(config: ButtonFluidLayoutConfig): Section {
  return {
    id: 'layout',
    label: 'Layout',
    title: 'Container Layout',
    groups: [
      {
        title: 'Container',
        controls: [
          {
            id: 'layout.containerWidth',
            type: 'slider',
            label: 'Width',
            value: config.layout.containerWidth,
            min: CONTAINER_WIDTH_RANGE.min,
            max: CONTAINER_WIDTH_RANGE.max,
            step: CONTAINER_WIDTH_RANGE.step,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'layout.gap',
            type: 'slider',
            label: 'Gap',
            value: config.layout.gap,
            min: GAP_RANGE.min,
            max: GAP_RANGE.max,
            step: GAP_RANGE.step,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Buttons',
        controls: [
          {
            id: 'layout.leftButtonVariant',
            type: 'select',
            label: 'Left Variant',
            value: config.layout.leftButtonVariant,
            options: [...BUTTON_VARIANT_OPTIONS],
          },
          {
            id: 'layout.rightButtonVariant',
            type: 'select',
            label: 'Right Variant',
            value: config.layout.rightButtonVariant,
            options: [...BUTTON_VARIANT_OPTIONS],
          },
        ],
      },
    ],
  }
}
