/**
 * Question Command Menu V4 - Trigger Section Builder
 *
 * Configures trigger input, padding, and button settings.
 */

import type { Section } from '@/components/ui/patterns/control-panel'
import type { PlaygroundState } from '../../types'
import {
  CURSOR_OPTIONS,
  TRIGGER_MODE_OPTIONS,
  BUTTON_POSITION_OPTIONS,
  BUTTON_TYPE_OPTIONS,
  BUTTON_VARIANT_OPTIONS,
  BUTTON_SIZE_OPTIONS,
  BUTTON_ROUNDNESS_OPTIONS,
  BUTTON_SHOW_WHEN_OPTIONS,
  ICON_OPTIONS,
} from '../../config/options'

// ============================================================================
// TRIGGER SECTION
// ============================================================================

export function buildTriggerSection(state: PlaygroundState): Section {
  const trigger = state.config.trigger

  // Build button config groups
  const buttonGroups = trigger.buttons.map((button, index) => ({
    title: `Button ${index + 1}`,
    controls: [
      {
        id: `config.trigger.buttons.${index}.enabled`,
        label: 'Enabled',
        type: 'toggle' as const,
        value: button.enabled,
      },
      {
        id: `config.trigger.buttons.${index}.showWhen`,
        label: 'Show When',
        type: 'select' as const,
        value: typeof button.showWhen === 'boolean' ? (button.showWhen ? 'always' : 'collapsed') : (button.showWhen ?? 'always'),
        options: [...BUTTON_SHOW_WHEN_OPTIONS],
      },
      {
        id: `config.trigger.buttons.${index}.position`,
        label: 'Position',
        type: 'select' as const,
        value: button.position,
        options: [...BUTTON_POSITION_OPTIONS],
      },
      {
        id: `config.trigger.buttons.${index}.type`,
        label: 'Type',
        type: 'select' as const,
        value: button.type,
        options: [...BUTTON_TYPE_OPTIONS],
      },
      {
        id: `config.trigger.buttons.${index}.variant`,
        label: 'Variant',
        type: 'select' as const,
        value: button.variant,
        options: [...BUTTON_VARIANT_OPTIONS],
      },
      {
        id: `config.trigger.buttons.${index}.size`,
        label: 'Size',
        type: 'select' as const,
        value: button.size,
        options: [...BUTTON_SIZE_OPTIONS],
      },
      {
        id: `config.trigger.buttons.${index}.roundness`,
        label: 'Roundness',
        type: 'select' as const,
        value: button.roundness ?? 'squircle',
        options: [...BUTTON_ROUNDNESS_OPTIONS],
      },
      {
        id: `config.trigger.buttons.${index}.icon`,
        label: 'Icon',
        type: 'select' as const,
        value: button.icon ?? 'none',
        options: [...ICON_OPTIONS],
      },
      {
        id: `config.trigger.buttons.${index}.label`,
        label: 'Label',
        type: 'text' as const,
        value: button.label ?? '',
      },
    ],
  }))

  return {
    id: 'trigger',
    label: 'Trigger',
    title: 'Trigger Settings',
    groups: [
      {
        title: 'Mode',
        controls: [
          {
            id: 'config.trigger.defaultMode',
            label: 'Default Mode',
            type: 'select',
            value: trigger.defaultMode ?? 'input',
            options: [...TRIGGER_MODE_OPTIONS],
          },
        ],
      },
      {
        title: 'Input',
        controls: [
          {
            id: 'config.placeholder',
            label: 'Placeholder',
            type: 'text',
            value: state.config.placeholder,
          },
          {
            id: 'config.trigger.showSearchIcon',
            label: 'Show Search Icon',
            type: 'toggle',
            value: trigger.showSearchIcon,
          },
          {
            id: 'config.trigger.showKeyboardHint',
            label: 'Show Keyboard Hint',
            type: 'toggle',
            value: trigger.showKeyboardHint,
          },
          {
            id: 'config.trigger.keyboardHintText',
            label: 'Keyboard Hint Text',
            type: 'text',
            value: trigger.keyboardHintText,
          },
          {
            id: 'config.trigger.cursor',
            label: 'Cursor',
            type: 'select',
            value: trigger.cursor,
            options: [...CURSOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Padding',
        controls: [
          {
            id: 'config.trigger.paddingLeft',
            label: 'Padding Left',
            type: 'slider',
            value: trigger.paddingLeft,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.trigger.paddingRight',
            label: 'Padding Right',
            type: 'slider',
            value: trigger.paddingRight,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.trigger.paddingTop',
            label: 'Padding Top',
            type: 'slider',
            value: trigger.paddingTop,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.trigger.paddingBottom',
            label: 'Padding Bottom',
            type: 'slider',
            value: trigger.paddingBottom,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.trigger.paddingExpandedLeft',
            label: 'Expanded Padding Left',
            type: 'slider',
            value: trigger.paddingExpandedLeft,
            min: -16,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}px`,
          },
          {
            id: 'config.trigger.paddingExpandedRight',
            label: 'Expanded Padding Right',
            type: 'slider',
            value: trigger.paddingExpandedRight,
            min: -16,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}px`,
          },
        ],
      },
      ...buttonGroups,
    ],
  }
}
