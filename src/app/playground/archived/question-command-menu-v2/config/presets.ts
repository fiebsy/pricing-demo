/**
 * Question Command Menu - Presets
 *
 * Preset categories:
 * - default: Standard starting point
 * - minimal: Clean, understated
 * - elevated: Premium, with depth effects
 * - brand: Uses brand colors and effects
 * - custom: User-defined variations
 */

import type { Preset } from '@/components/ui/patterns/control-panel'
import type {
  QuestionCommandMenuConfig,
  QuestionCommandMenuPreset,
  PlaygroundState,
} from './types'

// ============================================================================
// DEFAULT CONFIG
// ============================================================================

export const DEFAULT_CONFIG: QuestionCommandMenuConfig = {
  // Animation
  animation: {
    duration: 350,
    collapseDuration: 150,
    contentFadeDuration: 0,
    contentFadeDelay: 0,
    backdropMode: 'size',
    backdropDelay: 0,
    backdropDurationOffset: 0,
    animateSlotContainers: true,
    slotContainerDelay: 0,
    slotContainerDurationOffset: 100,
    expandOrigin: 'top',
    topExpandOrigin: 'bottom', // bottom = expands upward (away from trigger)
  },

  // Layout
  layout: {
    triggerWidth: 320,
    triggerHeight: 44,
    panelWidth: 420,
    maxTopHeight: 0, // 0 = use fixed height mode
    maxBottomHeight: 340,
    borderRadius: 20,
    topGap: 8,
    bottomGap: 12,
    backdropTopOffset: 0,
  },

  // Appearance
  appearance: {
    borderRadius: '2xl',
    shadow: '2xl',
    shine: 'shine-2-subtle',
    background: 'tertiary',
    gradient: 'subtle-depth-md',
    gradientColor: 'tertiary',
    squircle: true,
  },

  // Top Slot
  topSlot: {
    enabled: true,
    height: 48,
    delayOffset: 0,
    durationOffset: -100,
    background: 'secondary',
    borderRadius: 14,
    inset: 4,
    borderWidth: 1,
    borderColor: 'primary',
    contentType: 'filters',
    shine: 'none',
    bottomOffset: 0,
  },

  // Trigger
  trigger: {
    enabled: true,
    background: 'none',
    borderRadius: 0,
    inset: 0,
    borderWidth: 0,
    borderColor: 'primary',
    paddingX: 12,
    paddingExpanded: 4,
    topPaddingExpanded: 0,
    showSearchIcon: true,
    showKeyboardHint: true,
    keyboardHintText: '/',
    cursor: 'text',
    buttons: [
      {
        position: 'right',
        enabled: true,
        type: 'icon',
        variant: 'primary',
        size: 'sm',
        roundness: 'squircle',
        icon: 'send',
      },
    ],
  },

  // Bottom Slot
  bottomSlot: {
    enabled: true,
    contentType: 'questions',
    delayOffset: 0,
    durationOffset: 100,
    background: 'secondary',
    borderRadius: 14,
    inset: 4,
    borderWidth: 1,
    borderColor: 'primary',
    overflowGradient: true,
    overflowGradientHeight: 24,
    scrollPaddingTop: 0,
    scrollPaddingBottom: 16,
    shine: 'none',
    buttons: [
      { id: 'btn1', label: 'Approve', icon: 'check', variant: 'primary', enabled: true },
      { id: 'btn2', label: 'Edit', icon: 'edit', variant: 'secondary', enabled: true },
      { id: 'btn3', label: 'Regenerate', icon: 'sparkle', variant: 'tertiary', enabled: true },
      { id: 'btn4', label: 'Cancel', icon: 'close', variant: 'tertiary', enabled: false },
    ],
  },

  // Items
  items: {
    height: 56,
    gap: 4,
    paddingX: 12,
    paddingY: 8,
    borderRadius: 12,
    highlightBackground: 'quaternary',
    hoverBackground: 'tertiary',
    iconSize: 18,
    iconGap: 10,
    iconOpacity: 60,
  },

  // Behavior
  placeholder: 'Type your question...',
  showEmptyState: true,
  emptyStateMessage: 'No questions yet. Start typing to add one.',

  // Debug
  debug: false,
}

// ============================================================================
// PRESETS
// ============================================================================

const DEFAULT_PRESET: QuestionCommandMenuPreset = {
  id: 'default',
  name: 'Default',
  category: 'default',
  description: 'Standard configuration with all features',
  data: DEFAULT_CONFIG,
}

const MINIMAL_PRESET: QuestionCommandMenuPreset = {
  id: 'minimal',
  name: 'Minimal',
  category: 'minimal',
  description: 'Clean design without top section',
  data: {
    ...DEFAULT_CONFIG,
    layout: {
      ...DEFAULT_CONFIG.layout,
      triggerWidth: 280,
      panelWidth: 360,
    },
    appearance: {
      ...DEFAULT_CONFIG.appearance,
      shine: 'none',
      gradient: 'none',
    },
    topSlot: {
      ...DEFAULT_CONFIG.topSlot,
      enabled: false,
    },
    trigger: {
      ...DEFAULT_CONFIG.trigger,
      buttons: [],
      showKeyboardHint: true,
    },
    bottomSlot: {
      ...DEFAULT_CONFIG.bottomSlot,
      overflowGradient: false,
    },
  },
}

const ELEVATED_PRESET: QuestionCommandMenuPreset = {
  id: 'elevated',
  name: 'Elevated',
  category: 'elevated',
  description: 'Premium look with enhanced depth',
  data: {
    ...DEFAULT_CONFIG,
    layout: {
      ...DEFAULT_CONFIG.layout,
      triggerWidth: 360,
      panelWidth: 480,
      borderRadius: 24,
    },
    appearance: {
      ...DEFAULT_CONFIG.appearance,
      shadow: '2xl',
      shine: 'shine-2',
      gradient: 'subtle-depth-lg',
    },
    topSlot: {
      ...DEFAULT_CONFIG.topSlot,
      height: 56,
      shine: 'shine-1-subtle',
      borderRadius: 16,
    },
    bottomSlot: {
      ...DEFAULT_CONFIG.bottomSlot,
      shine: 'shine-1-subtle',
      borderRadius: 16,
    },
    items: {
      ...DEFAULT_CONFIG.items,
      height: 64,
      borderRadius: 14,
    },
  },
}

const WITH_ACTION_BUTTONS_PRESET: QuestionCommandMenuPreset = {
  id: 'with-action-buttons',
  name: 'With Action Buttons',
  category: 'custom',
  description: 'Multiple action buttons with shine variant',
  data: {
    ...DEFAULT_CONFIG,
    trigger: {
      ...DEFAULT_CONFIG.trigger,
      buttons: [
        {
          position: 'left',
          enabled: true,
          type: 'icon',
          variant: 'shine',
          size: 'sm',
          roundness: 'squircle',
          icon: 'sparkle',
        },
        {
          position: 'right',
          enabled: true,
          type: 'icon-text',
          variant: 'primary',
          size: 'sm',
          roundness: 'squircle',
          icon: 'send',
          label: 'Submit',
        },
      ],
      showSearchIcon: false,
    },
  },
}

const QUESTION_REVIEW_PRESET: QuestionCommandMenuPreset = {
  id: 'question-review',
  name: 'Question Review',
  category: 'custom',
  description: 'Optimized for reviewing questions with status',
  data: {
    ...DEFAULT_CONFIG,
    layout: {
      ...DEFAULT_CONFIG.layout,
      triggerWidth: 400,
      panelWidth: 520,
      maxBottomHeight: 400,
    },
    topSlot: {
      ...DEFAULT_CONFIG.topSlot,
      contentType: 'tabs',
      height: 52,
    },
    items: {
      ...DEFAULT_CONFIG.items,
      height: 72,
      gap: 6,
      paddingX: 16,
      paddingY: 12,
    },
    trigger: {
      ...DEFAULT_CONFIG.trigger,
      buttons: [
        {
          position: 'right',
          enabled: true,
          type: 'icon',
          variant: 'secondary',
          size: 'sm',
          roundness: 'squircle',
          icon: 'refresh',
        },
        {
          position: 'right',
          enabled: true,
          type: 'icon',
          variant: 'primary',
          size: 'sm',
          roundness: 'squircle',
          icon: 'add',
        },
      ],
    },
  },
}

const WITH_INDICATOR_PRESET: QuestionCommandMenuPreset = {
  id: 'with-indicator',
  name: 'With Indicator',
  category: 'custom',
  description: 'Arrow indicator for navigation hint',
  data: {
    ...DEFAULT_CONFIG,
    trigger: {
      ...DEFAULT_CONFIG.trigger,
      buttons: [
        {
          position: 'right',
          enabled: true,
          type: 'indicator',
          variant: 'tertiary',
          size: 'sm',
          icon: 'arrow-right',
        },
      ],
      showKeyboardHint: false,
    },
  },
}

// ============================================================================
// EXPORTS
// ============================================================================

export const PRESETS: Preset<PlaygroundState>[] = [
  { ...DEFAULT_PRESET, data: { config: DEFAULT_PRESET.data } },
  { ...MINIMAL_PRESET, data: { config: MINIMAL_PRESET.data } },
  { ...ELEVATED_PRESET, data: { config: ELEVATED_PRESET.data } },
  { ...WITH_ACTION_BUTTONS_PRESET, data: { config: WITH_ACTION_BUTTONS_PRESET.data } },
  { ...QUESTION_REVIEW_PRESET, data: { config: QUESTION_REVIEW_PRESET.data } },
  { ...WITH_INDICATOR_PRESET, data: { config: WITH_INDICATOR_PRESET.data } },
]

export const DEFAULT_STATE: PlaygroundState = {
  config: DEFAULT_CONFIG,
}

export function getPresetById(id: string): Preset<PlaygroundState> | undefined {
  return PRESETS.find((p) => p.id === id)
}

export function getPresetsByCategory(category: string): Preset<PlaygroundState>[] {
  return PRESETS.filter((p) => {
    const preset = p as { category?: string }
    return preset.category === category
  })
}
