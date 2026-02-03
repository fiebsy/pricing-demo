// =============================================================================
// Border Radius Section Builder
// =============================================================================
// Creates a border radius controls section.
// =============================================================================

import type { Section, Control } from '../types'
import { BORDER_RADIUS_OPTIONS, COMMON_RADIUS_OPTIONS } from '../tokens/radius'
import { createSection, type BuilderOptions, type GroupDefinition } from './utils'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface RadiusValues {
  borderRadius?: string
  topLeftRadius?: string
  topRightRadius?: string
  bottomLeftRadius?: string
  bottomRightRadius?: string
}

export interface RadiusOptions extends BuilderOptions {
  /** Use common radius subset (default: true) */
  useCommonOptions?: boolean
  /** Show per-corner controls (default: false) */
  showCornerControls?: boolean
}

// -----------------------------------------------------------------------------
// Builder
// -----------------------------------------------------------------------------

/**
 * Create a border radius controls section
 *
 * @example
 * ```ts
 * createBorderRadiusSection({
 *   values: { borderRadius: 'lg' },
 *   options: { showCornerControls: true }
 * })
 * ```
 */
export function createBorderRadiusSection(config: {
  values: RadiusValues
  options?: RadiusOptions
}): Section {
  const { values, options = {} } = config
  const radiusOptions = options.useCommonOptions !== false ? COMMON_RADIUS_OPTIONS : BORDER_RADIUS_OPTIONS

  const groups: GroupDefinition[] = [
    {
      key: 'radius',
      title: 'Border Radius',
      controls: [
        {
          type: 'radius-select',
          id: 'borderRadius',
          label: 'Radius',
          value: values.borderRadius ?? 'md',
          options: radiusOptions,
        } as Control,
      ],
    },
  ]

  // Add corner controls if enabled
  if (options.showCornerControls) {
    groups.push({
      key: 'corners',
      title: 'Corner Radius',
      columns: 2,
      defaultCollapsed: true,
      controls: [
        {
          type: 'radius-select',
          id: 'topLeftRadius',
          label: 'Top Left',
          value: values.topLeftRadius ?? values.borderRadius ?? 'md',
          options: radiusOptions,
        } as Control,
        {
          type: 'radius-select',
          id: 'topRightRadius',
          label: 'Top Right',
          value: values.topRightRadius ?? values.borderRadius ?? 'md',
          options: radiusOptions,
        } as Control,
        {
          type: 'radius-select',
          id: 'bottomLeftRadius',
          label: 'Bottom Left',
          value: values.bottomLeftRadius ?? values.borderRadius ?? 'md',
          options: radiusOptions,
        } as Control,
        {
          type: 'radius-select',
          id: 'bottomRightRadius',
          label: 'Bottom Right',
          value: values.bottomRightRadius ?? values.borderRadius ?? 'md',
          options: radiusOptions,
        } as Control,
      ],
    })
  }

  return createSection(
    {
      id: 'radius',
      title: 'Border Radius',
      label: 'Radius',
      sectionType: 'radius',
    },
    groups,
    options
  )
}

/**
 * Get radius groups without section wrapper
 */
export function getRadiusGroups(config: {
  values: RadiusValues
  options?: RadiusOptions
}) {
  const section = createBorderRadiusSection(config)
  return section.groups ?? []
}
