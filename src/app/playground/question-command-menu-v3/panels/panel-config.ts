/**
 * Question Command Menu V3 - Panel Config Builder
 *
 * Main panel configuration assembly.
 */

import type { PanelConfig, Section } from '@/components/ui/prod/base/control-panel'
import type { PlaygroundState, SlotPosition, ContentTypeId } from '../config/types'
import { PRESETS } from '../config/presets'
import { buildContentSection } from './content-section'
import { buildTopSlotSection, buildBottomSlotSection } from './slot-section'
import {
  BACKDROP_MODE_OPTIONS,
  CURSOR_OPTIONS,
  BUTTON_POSITION_OPTIONS,
  BUTTON_TYPE_OPTIONS,
  BUTTON_VARIANT_OPTIONS,
  BUTTON_SIZE_OPTIONS,
  BUTTON_ROUNDNESS_OPTIONS,
  BUTTON_SHOW_WHEN_OPTIONS,
  ICON_OPTIONS,
  SHADOW_OPTIONS,
  SHINE_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  GRADIENT_OPTIONS,
  GRADIENT_COLOR_OPTIONS,
  BACKGROUND_WITH_NONE_OPTIONS,
} from '../config/options'

// ============================================================================
// TRIGGER SECTION
// ============================================================================

function buildTriggerSection(state: PlaygroundState): Section {
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
        value: button.showWhen ?? 'always',
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

// ============================================================================
// LAYOUT SECTION
// ============================================================================

function buildLayoutSection(state: PlaygroundState): Section {
  const layout = state.config.layout

  return {
    id: 'layout',
    label: 'Layout',
    title: 'Layout Settings',
    groups: [
      {
        title: 'Dimensions',
        controls: [
          {
            id: 'config.layout.triggerWidth',
            label: 'Trigger Width',
            type: 'slider',
            value: layout.triggerWidth,
            min: 200,
            max: 600,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.layout.triggerHeight',
            label: 'Trigger Height',
            type: 'slider',
            value: layout.triggerHeight,
            min: 32,
            max: 64,
            step: 4,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.layout.fillWidth',
            label: 'Fill Width (No Horizontal Expand)',
            type: 'toggle',
            value: layout.fillWidth ?? true,
          },
          {
            id: 'config.layout.panelWidth',
            label: 'Panel Width',
            type: 'slider',
            value: layout.panelWidth,
            min: 280,
            max: 700,
            step: 20,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
      {
        title: 'Gaps',
        controls: [
          {
            id: 'config.layout.topGap',
            label: 'Top Gap',
            type: 'slider',
            value: layout.topGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.layout.bottomGap',
            label: 'Bottom Gap',
            type: 'slider',
            value: layout.bottomGap,
            min: 0,
            max: 24,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
          {
            id: 'config.layout.borderRadius',
            label: 'Border Radius',
            type: 'slider',
            value: layout.borderRadius,
            min: 0,
            max: 32,
            step: 2,
            formatLabel: (v: number) => `${v}px`,
          },
        ],
      },
    ],
  }
}

// ============================================================================
// ANIMATION SECTION
// ============================================================================

function buildAnimationSection(state: PlaygroundState): Section {
  const animation = state.config.animation

  return {
    id: 'animation',
    label: 'Animation',
    title: 'Animation Settings',
    groups: [
      {
        title: 'Timing',
        controls: [
          {
            id: 'config.animation.duration',
            label: 'Expand Duration',
            type: 'slider',
            value: animation.duration,
            min: 100,
            max: 800,
            step: 50,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.animation.collapseDuration',
            label: 'Collapse Duration',
            type: 'slider',
            value: animation.collapseDuration,
            min: 50,
            max: 500,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
        ],
      },
      {
        title: 'Backdrop',
        controls: [
          {
            id: 'config.animation.backdropMode',
            label: 'Backdrop Mode',
            type: 'select',
            value: animation.backdropMode,
            options: [...BACKDROP_MODE_OPTIONS],
          },
          {
            id: 'config.animation.backdropDelay',
            label: 'Backdrop Delay',
            type: 'slider',
            value: animation.backdropDelay,
            min: 0,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.animation.backdropDurationOffset',
            label: 'Backdrop Duration Offset',
            type: 'slider',
            value: animation.backdropDurationOffset,
            min: -200,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}ms`,
          },
        ],
      },
      {
        title: 'Slot Containers',
        controls: [
          {
            id: 'config.animation.animateSlotContainers',
            label: 'Animate Slot Containers',
            type: 'toggle',
            value: animation.animateSlotContainers,
          },
          {
            id: 'config.animation.slotContainerDelay',
            label: 'Slot Container Delay',
            type: 'slider',
            value: animation.slotContainerDelay,
            min: 0,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v}ms`,
          },
          {
            id: 'config.animation.slotContainerDurationOffset',
            label: 'Duration Offset',
            type: 'slider',
            value: animation.slotContainerDurationOffset,
            min: -200,
            max: 200,
            step: 25,
            formatLabel: (v: number) => `${v > 0 ? '+' : ''}${v}ms`,
          },
        ],
      },
    ],
  }
}

// ============================================================================
// APPEARANCE SECTION
// ============================================================================

function buildAppearanceSection(state: PlaygroundState): Section {
  const appearance = state.config.appearance

  return {
    id: 'appearance',
    label: 'Appearance',
    title: 'Appearance Settings',
    groups: [
      {
        title: 'Background',
        controls: [
          {
            id: 'config.appearance.background',
            label: 'Background',
            type: 'select',
            value: appearance.background,
            options: [...BACKGROUND_WITH_NONE_OPTIONS],
          },
          {
            id: 'config.appearance.squircle',
            label: 'Use Squircle Corners',
            type: 'toggle',
            value: appearance.squircle,
          },
        ],
      },
      {
        title: 'Effects',
        controls: [
          {
            id: 'config.appearance.shadow',
            label: 'Shadow',
            type: 'select',
            value: appearance.shadow,
            options: [...SHADOW_OPTIONS],
          },
          {
            id: 'config.appearance.shine',
            label: 'Shine',
            type: 'select',
            value: appearance.shine,
            options: [...SHINE_OPTIONS],
          },
          {
            id: 'config.appearance.borderRadius',
            label: 'Border Radius',
            type: 'select',
            value: appearance.borderRadius,
            options: [...BORDER_RADIUS_OPTIONS],
          },
        ],
      },
      {
        title: 'Gradient',
        controls: [
          {
            id: 'config.appearance.gradient',
            label: 'Gradient',
            type: 'select',
            value: appearance.gradient,
            options: [...GRADIENT_OPTIONS],
          },
          {
            id: 'config.appearance.gradientColor',
            label: 'Gradient Color',
            type: 'select',
            value: appearance.gradientColor,
            options: [...GRADIENT_COLOR_OPTIONS],
          },
        ],
      },
    ],
  }
}

// ============================================================================
// MAIN PANEL CONFIG BUILDER
// ============================================================================

export function buildPanelConfig(
  state: PlaygroundState,
  activePresetId: string | null
): PanelConfig {
  return {
    defaultActiveTab: 'content',
    presetConfig: {
      presets: PRESETS,
      activePresetId,
      showCopyButton: true,
      copyLabel: 'Copy Config',
    },
    sections: [
      buildContentSection(state),
      buildTopSlotSection(state),
      buildBottomSlotSection(state),
      buildTriggerSection(state),
      buildLayoutSection(state),
      buildAnimationSection(state),
      buildAppearanceSection(state),
    ],
    showReset: true,
    resetLabel: 'Reset',
  }
}

// ============================================================================
// NESTED VALUE UPDATER
// ============================================================================

export function updateNestedValue(
  obj: PlaygroundState,
  path: string,
  value: unknown
): PlaygroundState {
  // Special handling for content type changes
  if (path === 'topContentType' || path === 'bottomContentType') {
    return handleContentTypeChange(obj, path, value as ContentTypeId)
  }

  const keys = path.split('.')
  const newObj = JSON.parse(JSON.stringify(obj)) as PlaygroundState
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = newObj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!
    if (/^\d+$/.test(keys[i + 1] ?? '')) {
      if (!Array.isArray(current[key])) {
        current[key] = []
      }
    } else if (current[key] === undefined || current[key] === null) {
      current[key] = {}
    }
    current = current[key]
  }

  const finalKey = keys[keys.length - 1]!
  current[finalKey] = value

  return newObj
}

// ============================================================================
// CONTENT TYPE CHANGE HANDLER
// ============================================================================

function handleContentTypeChange(
  state: PlaygroundState,
  path: string,
  newType: ContentTypeId
): PlaygroundState {
  const newObj = JSON.parse(JSON.stringify(state)) as PlaygroundState
  const slot: SlotPosition = path === 'topContentType' ? 'top' : 'bottom'

  // Update the content array
  const existingIndex = newObj.config.content.findIndex((c) => c.slot === slot)

  if (existingIndex >= 0) {
    newObj.config.content[existingIndex] = {
      ...newObj.config.content[existingIndex],
      type: newType,
    }
  } else {
    newObj.config.content.push({
      id: `${slot}-${newType}`,
      type: newType,
      slot,
    })
  }

  return newObj
}
