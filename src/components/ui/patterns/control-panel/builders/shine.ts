// =============================================================================
// Shine Section Builder
// =============================================================================
// Creates a shine/effects controls section with preset, intensity, shadow.
// =============================================================================

import type { Section, Control } from '../types'
import {
  SHINE_PRESET_OPTIONS,
  SHINE_INTENSITY_OPTIONS,
  SHINE_SHADOW_OPTIONS,
  DEPTH_GRADIENT_OPTIONS,
} from '../tokens/shine'
import { createSection, type BuilderOptions, type GroupDefinition } from './utils'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface ShineValues {
  shinePreset?: string
  shineIntensity?: 'subtle' | 'normal' | 'intense'
  shadow?: string
  depthGradient?: string
}

export interface ShineOptions extends BuilderOptions {
  /** Include depth gradient control (default: false) */
  includeDepthGradient?: boolean
}

// -----------------------------------------------------------------------------
// Builder
// -----------------------------------------------------------------------------

/**
 * Create a shine/effects controls section
 *
 * @example
 * ```ts
 * createShineSection({
 *   values: { shinePreset: '2', shineIntensity: 'subtle' },
 *   options: { includeDepthGradient: true }
 * })
 * ```
 */
export function createShineSection(config: {
  values: ShineValues
  options?: ShineOptions
}): Section {
  const { values, options = {} } = config

  const groups: GroupDefinition[] = [
    {
      key: 'preset',
      title: 'Shine Preset',
      controls: [
        {
          type: 'select',
          id: 'shinePreset',
          label: 'Preset',
          value: values.shinePreset ?? 'none',
          options: SHINE_PRESET_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    },
    {
      key: 'intensity',
      title: 'Intensity',
      controls: [
        {
          type: 'select',
          id: 'shineIntensity',
          label: 'Intensity',
          value: values.shineIntensity ?? 'normal',
          options: SHINE_INTENSITY_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    },
    {
      key: 'shadow',
      title: 'Shadow',
      controls: [
        {
          type: 'select',
          id: 'shadow',
          label: 'Shadow',
          value: values.shadow ?? 'none',
          options: SHINE_SHADOW_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    },
  ]

  // Add depth gradient if enabled
  if (options.includeDepthGradient) {
    groups.push({
      key: 'depthGradient',
      title: 'Depth Gradient',
      controls: [
        {
          type: 'select',
          id: 'depthGradient',
          label: 'Depth',
          value: values.depthGradient ?? 'none',
          options: DEPTH_GRADIENT_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    })
  }

  return createSection(
    {
      id: 'shine',
      title: 'Shine & Effects',
      label: 'Shine',
    },
    groups,
    options
  )
}

/**
 * Get shine groups without section wrapper
 */
export function getShineGroups(config: {
  values: ShineValues
  options?: ShineOptions
}) {
  const section = createShineSection(config)
  return section.groups ?? []
}
