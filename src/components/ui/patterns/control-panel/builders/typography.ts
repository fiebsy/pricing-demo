// =============================================================================
// Typography Section Builder
// =============================================================================
// Creates a typography controls section with font weight, size, etc.
// =============================================================================

import type { Section, Control } from '../types'
import {
  FONT_WEIGHT_OPTIONS,
  COMMON_FONT_WEIGHTS,
  FONT_SIZE_OPTIONS,
  LINE_HEIGHT_OPTIONS,
  LETTER_SPACING_OPTIONS,
} from '../tokens/typography'
import { createSection, filterGroups, toControlGroups, type BuilderOptions, type GroupDefinition } from './utils'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface TypographyValues {
  fontWeight?: string
  fontSize?: string
  lineHeight?: string
  letterSpacing?: string
}

export interface TypographyOptions extends BuilderOptions {
  /** Use common weights subset (default: true) */
  useCommonWeights?: boolean
}

// -----------------------------------------------------------------------------
// Builder
// -----------------------------------------------------------------------------

/**
 * Create a typography controls section
 *
 * @example
 * ```ts
 * createTypographySection({
 *   values: { fontWeight: '500', fontSize: 'md' },
 *   options: { include: ['weight', 'size'] }
 * })
 * ```
 */
export function createTypographySection(config: {
  values: TypographyValues
  options?: TypographyOptions
}): Section {
  const { values, options = {} } = config
  const weightOptions = options.useCommonWeights !== false ? COMMON_FONT_WEIGHTS : FONT_WEIGHT_OPTIONS

  const groups: GroupDefinition[] = [
    {
      key: 'weight',
      title: 'Font Weight',
      controls: [
        {
          type: 'font-weight-select',
          id: 'fontWeight',
          label: 'Weight',
          value: values.fontWeight ?? '400',
          options: weightOptions,
        } as Control,
      ],
    },
    {
      key: 'size',
      title: 'Font Size',
      controls: [
        {
          type: 'select',
          id: 'fontSize',
          label: 'Size',
          value: values.fontSize ?? 'md',
          options: FONT_SIZE_OPTIONS.map((o) => ({
            label: `${o.label} (${o.pixels}px)`,
            value: o.value,
          })),
        } as Control,
      ],
    },
    {
      key: 'lineHeight',
      title: 'Line Height',
      controls: [
        {
          type: 'select',
          id: 'lineHeight',
          label: 'Line Height',
          value: values.lineHeight ?? 'normal',
          options: LINE_HEIGHT_OPTIONS.map((o) => ({
            label: `${o.label} (${o.lineHeight})`,
            value: o.value,
          })),
        } as Control,
      ],
    },
    {
      key: 'letterSpacing',
      title: 'Letter Spacing',
      controls: [
        {
          type: 'select',
          id: 'letterSpacing',
          label: 'Letter Spacing',
          value: values.letterSpacing ?? 'normal',
          options: LETTER_SPACING_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    },
  ]

  return createSection(
    {
      id: 'typography',
      title: 'Typography',
    },
    groups,
    options
  )
}

/**
 * Get typography groups without section wrapper
 * Useful for embedding typography controls in a custom section
 */
export function getTypographyGroups(config: {
  values: TypographyValues
  options?: TypographyOptions
}) {
  const section = createTypographySection(config)
  return section.groups ?? []
}
