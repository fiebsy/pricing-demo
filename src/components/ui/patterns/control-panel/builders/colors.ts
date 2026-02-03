// =============================================================================
// Colors Section Builder
// =============================================================================
// Creates a colors controls section with text, background, border colors.
// =============================================================================

import type { Section, Control } from '../types'
import {
  SEMANTIC_TEXT_COLORS,
  SEMANTIC_BG_COLORS,
  SEMANTIC_BORDER_COLORS,
} from '../tokens/colors'
import { createSection, type BuilderOptions, type GroupDefinition } from './utils'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface ColorValues {
  textColor?: string
  bgColor?: string
  borderColor?: string
}

export interface ColorOptions extends BuilderOptions {
  /** Show category groups in dropdowns (default: true) */
  showGroups?: boolean
}

// -----------------------------------------------------------------------------
// Builder
// -----------------------------------------------------------------------------

/**
 * Create a colors controls section
 *
 * @example
 * ```ts
 * createColorsSection({
 *   values: { textColor: 'primary', bgColor: 'secondary' },
 *   options: { include: ['text', 'background'] }
 * })
 * ```
 */
export function createColorsSection(config: {
  values: ColorValues
  options?: ColorOptions
}): Section {
  const { values, options = {} } = config
  const showGroups = options.showGroups !== false

  const groups: GroupDefinition[] = [
    {
      key: 'text',
      title: 'Text Color',
      controls: [
        {
          type: 'color-enhanced-select',
          id: 'textColor',
          label: 'Text',
          value: values.textColor ?? 'primary',
          options: SEMANTIC_TEXT_COLORS,
          showGroups,
        } as Control,
      ],
    },
    {
      key: 'background',
      title: 'Background Color',
      controls: [
        {
          type: 'color-enhanced-select',
          id: 'bgColor',
          label: 'Background',
          value: values.bgColor ?? 'primary',
          options: SEMANTIC_BG_COLORS,
          showGroups,
        } as Control,
      ],
    },
    {
      key: 'border',
      title: 'Border Color',
      controls: [
        {
          type: 'color-enhanced-select',
          id: 'borderColor',
          label: 'Border',
          value: values.borderColor ?? 'primary',
          options: SEMANTIC_BORDER_COLORS,
          showGroups,
        } as Control,
      ],
    },
  ]

  return createSection(
    {
      id: 'colors',
      title: 'Colors',
      sectionType: 'colors',
    },
    groups,
    options
  )
}

/**
 * Get color groups without section wrapper
 */
export function getColorGroups(config: {
  values: ColorValues
  options?: ColorOptions
}) {
  const section = createColorsSection(config)
  return section.groups ?? []
}
