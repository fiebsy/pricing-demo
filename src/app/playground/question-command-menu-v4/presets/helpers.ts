/**
 * Question Command Menu V4 - Preset Helpers
 *
 * Utilities for composing and merging preset configurations.
 */

import type { QuestionCommandMenuV4Config, TriggerButtonConfig } from '../types'

/**
 * Deep merge two objects
 */
export function deepMerge<T extends Record<string, unknown>>(base: T, override: Partial<T>): T {
  const result = { ...base } as T

  for (const key in override) {
    if (Object.prototype.hasOwnProperty.call(override, key)) {
      const baseValue = base[key]
      const overrideValue = override[key]

      if (
        typeof baseValue === 'object' &&
        baseValue !== null &&
        !Array.isArray(baseValue) &&
        typeof overrideValue === 'object' &&
        overrideValue !== null &&
        !Array.isArray(overrideValue)
      ) {
        result[key] = deepMerge(
          baseValue as Record<string, unknown>,
          overrideValue as Record<string, unknown>
        ) as T[typeof key]
      } else {
        result[key] = overrideValue as T[typeof key]
      }
    }
  }

  return result
}

/**
 * Create a preset config by merging with default
 */
export function createPreset(
  baseConfig: QuestionCommandMenuV4Config,
  overrides: Partial<QuestionCommandMenuV4Config>
): QuestionCommandMenuV4Config {
  return deepMerge(
    baseConfig as unknown as Record<string, unknown>,
    overrides as unknown as Record<string, unknown>
  ) as unknown as QuestionCommandMenuV4Config
}

/**
 * Common trigger button configurations
 */
export const COMMON_BUTTONS = {
  sendExpanded: {
    id: 'send-expanded',
    position: 'right' as const,
    enabled: true,
    type: 'icon' as const,
    variant: 'primary' as const,
    size: 'sm' as const,
    roundness: 'squircle' as const,
    icon: 'send',
    showWhen: 'expanded' as const,
  },
  arrowCollapsed: {
    id: 'arrow-collapsed',
    position: 'right' as const,
    enabled: true,
    type: 'indicator' as const,
    variant: 'tertiary' as const,
    size: 'sm' as const,
    icon: 'arrow-right',
    showWhen: 'collapsed' as const,
  },
  deleteExpanded: {
    id: 'delete-expanded',
    position: 'right' as const,
    enabled: false,
    type: 'icon' as const,
    variant: 'tertiary-destructive' as const,
    size: 'sm' as const,
    roundness: 'squircle' as const,
    icon: 'delete',
    showWhen: 'expanded' as const,
  },
  editExpanded: {
    id: 'edit-expanded',
    position: 'right' as const,
    enabled: true,
    type: 'text' as const,
    variant: 'shine' as const,
    size: 'sm' as const,
    roundness: 'squircle' as const,
    icon: 'delete',
    showWhen: 'expanded' as const,
    label: 'Edit',
  },
  saveExpanded: {
    id: 'save-expanded',
    position: 'right' as const,
    enabled: true,
    type: 'text' as const,
    variant: 'primary' as const,
    size: 'sm' as const,
    roundness: 'squircle' as const,
    icon: 'check',
    showWhen: 'expanded' as const,
    label: 'Save',
  },
} satisfies Record<string, TriggerButtonConfig>
