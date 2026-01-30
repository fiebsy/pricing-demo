/**
 * Question Command Menu - Trigger Section Config
 *
 * Configuration for the input trigger including buttons.
 */

import type { Section } from '@/components/ui/patterns/control-panel'
import type { PlaygroundState } from '../config/types'
import {
  BACKGROUND_WITH_NONE_OPTIONS,
  CURSOR_OPTIONS,
  BUTTON_TYPE_OPTIONS,
  BUTTON_VARIANT_OPTIONS,
  BUTTON_SIZE_OPTIONS,
  ICON_OPTIONS,
} from '../config/options'

export function buildTriggerSection(state: PlaygroundState): Section {
  const buttons = state.config.trigger.buttons ?? []
  const hasButtons = buttons.length > 0

  return {
    id: 'trigger',
    label: 'Trigger',
    title: 'Trigger Settings',
    groups: [
      {
        title: 'Layout',
        controls: [
          {
            id: 'config.layout.triggerWidth',
            label: 'Width (Collapsed)',
            type: 'slider',
            value: state.config.layout.triggerWidth,
            min: 200,
            max: 500,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.layout.triggerHeight',
            label: 'Height',
            type: 'slider',
            value: state.config.layout.triggerHeight,
            min: 36,
            max: 64,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.layout.panelWidth',
            label: 'Panel Width (Expanded)',
            type: 'slider',
            value: state.config.layout.panelWidth,
            min: 280,
            max: 600,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Padding',
        controls: [
          {
            id: 'config.trigger.paddingX',
            label: 'Base H-Padding',
            type: 'slider',
            value: state.config.trigger.paddingX,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.trigger.paddingExpanded',
            label: 'Expanded H-Padding',
            type: 'slider',
            value: state.config.trigger.paddingExpanded,
            min: -12,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}px`,
          },
          {
            id: 'config.trigger.topPaddingExpanded',
            label: 'Expanded Top',
            type: 'slider',
            value: state.config.trigger.topPaddingExpanded,
            min: 0,
            max: 16,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Appearance',
        controls: [
          {
            id: 'config.trigger.background',
            label: 'Background',
            type: 'select',
            value: state.config.trigger.background ?? 'none',
            options: [...BACKGROUND_WITH_NONE_OPTIONS],
          },
          {
            id: 'config.trigger.cursor',
            label: 'Cursor',
            type: 'select',
            value: state.config.trigger.cursor,
            options: [...CURSOR_OPTIONS],
          },
        ],
      },
      {
        title: 'Input Features',
        controls: [
          {
            id: 'config.trigger.showSearchIcon',
            label: 'Search Icon',
            type: 'toggle',
            value: state.config.trigger.showSearchIcon,
          },
          {
            id: 'config.trigger.showKeyboardHint',
            label: 'Keyboard Hint',
            type: 'toggle',
            value: state.config.trigger.showKeyboardHint,
            description: 'Shows when no buttons',
          },
          {
            id: 'config.placeholder',
            label: 'Placeholder',
            type: 'text',
            value: state.config.placeholder,
          },
        ],
      },
      // Button 1 Configuration
      {
        title: 'Button 1',
        controls: [
          {
            id: 'config.trigger.buttons.0.enabled',
            label: 'Enable Button',
            type: 'toggle',
            value: buttons[0]?.enabled ?? false,
          },
          {
            id: 'config.trigger.buttons.0.type',
            label: 'Type',
            type: 'select',
            value: buttons[0]?.type ?? 'icon',
            options: [...BUTTON_TYPE_OPTIONS],
          },
          {
            id: 'config.trigger.buttons.0.variant',
            label: 'Variant',
            type: 'select',
            value: buttons[0]?.variant ?? 'solid',
            options: [...BUTTON_VARIANT_OPTIONS],
          },
          {
            id: 'config.trigger.buttons.0.size',
            label: 'Size',
            type: 'select',
            value: buttons[0]?.size ?? 'sm',
            options: [...BUTTON_SIZE_OPTIONS],
          },
          {
            id: 'config.trigger.buttons.0.icon',
            label: 'Icon',
            type: 'select',
            value: buttons[0]?.icon ?? 'send',
            options: [...ICON_OPTIONS],
          },
          {
            id: 'config.trigger.buttons.0.label',
            label: 'Label',
            type: 'text',
            value: buttons[0]?.label ?? '',
          },
        ],
      },
      // Button 2 Configuration
      {
        title: 'Button 2',
        controls: [
          {
            id: 'config.trigger.buttons.1.enabled',
            label: 'Enable Button',
            type: 'toggle',
            value: buttons[1]?.enabled ?? false,
          },
          {
            id: 'config.trigger.buttons.1.type',
            label: 'Type',
            type: 'select',
            value: buttons[1]?.type ?? 'icon',
            options: [...BUTTON_TYPE_OPTIONS],
          },
          {
            id: 'config.trigger.buttons.1.variant',
            label: 'Variant',
            type: 'select',
            value: buttons[1]?.variant ?? 'ghost',
            options: [...BUTTON_VARIANT_OPTIONS],
          },
          {
            id: 'config.trigger.buttons.1.size',
            label: 'Size',
            type: 'select',
            value: buttons[1]?.size ?? 'sm',
            options: [...BUTTON_SIZE_OPTIONS],
          },
          {
            id: 'config.trigger.buttons.1.icon',
            label: 'Icon',
            type: 'select',
            value: buttons[1]?.icon ?? 'add',
            options: [...ICON_OPTIONS],
          },
          {
            id: 'config.trigger.buttons.1.label',
            label: 'Label',
            type: 'text',
            value: buttons[1]?.label ?? '',
          },
        ],
      },
    ],
  }
}
