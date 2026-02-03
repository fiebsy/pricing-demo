// =============================================================================
// Spacing Section Builder
// =============================================================================
// Creates a spacing controls section with gap, padding, margin.
// =============================================================================

import type { Section, Control } from '../types'
import { GAP_OPTIONS, PADDING_OPTIONS, MARGIN_OPTIONS } from '../tokens/spacing'
import { createSection, type BuilderOptions, type GroupDefinition } from './utils'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface SpacingValues {
  gap?: string
  gapX?: string
  gapY?: string
  padding?: string
  paddingX?: string
  paddingY?: string
  margin?: string
  marginX?: string
  marginY?: string
}

export interface SpacingOptions extends BuilderOptions {
  /** Show separate X/Y controls (default: false) */
  showAxisControls?: boolean
}

// -----------------------------------------------------------------------------
// Builder
// -----------------------------------------------------------------------------

/**
 * Create a spacing controls section
 *
 * @example
 * ```ts
 * createSpacingSection({
 *   values: { gap: '4', padding: '4' },
 *   options: { include: ['gap', 'padding'] }
 * })
 * ```
 */
export function createSpacingSection(config: {
  values: SpacingValues
  options?: SpacingOptions
}): Section {
  const { values, options = {} } = config
  const showAxis = options.showAxisControls ?? false

  const groups: GroupDefinition[] = []

  // Gap controls
  if (!showAxis) {
    groups.push({
      key: 'gap',
      title: 'Gap',
      controls: [
        {
          type: 'select',
          id: 'gap',
          label: 'Gap',
          value: values.gap ?? '2',
          options: GAP_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    })
  } else {
    groups.push({
      key: 'gap',
      title: 'Gap',
      columns: 2,
      controls: [
        {
          type: 'select',
          id: 'gapX',
          label: 'Gap X',
          value: values.gapX ?? values.gap ?? '2',
          options: GAP_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
        {
          type: 'select',
          id: 'gapY',
          label: 'Gap Y',
          value: values.gapY ?? values.gap ?? '2',
          options: GAP_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    })
  }

  // Padding controls
  if (!showAxis) {
    groups.push({
      key: 'padding',
      title: 'Padding',
      controls: [
        {
          type: 'select',
          id: 'padding',
          label: 'Padding',
          value: values.padding ?? '4',
          options: PADDING_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    })
  } else {
    groups.push({
      key: 'padding',
      title: 'Padding',
      columns: 2,
      controls: [
        {
          type: 'select',
          id: 'paddingX',
          label: 'Padding X',
          value: values.paddingX ?? values.padding ?? '4',
          options: PADDING_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
        {
          type: 'select',
          id: 'paddingY',
          label: 'Padding Y',
          value: values.paddingY ?? values.padding ?? '4',
          options: PADDING_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    })
  }

  // Margin controls
  if (!showAxis) {
    groups.push({
      key: 'margin',
      title: 'Margin',
      controls: [
        {
          type: 'select',
          id: 'margin',
          label: 'Margin',
          value: values.margin ?? '0',
          options: MARGIN_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    })
  } else {
    groups.push({
      key: 'margin',
      title: 'Margin',
      columns: 2,
      controls: [
        {
          type: 'select',
          id: 'marginX',
          label: 'Margin X',
          value: values.marginX ?? values.margin ?? '0',
          options: MARGIN_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
        {
          type: 'select',
          id: 'marginY',
          label: 'Margin Y',
          value: values.marginY ?? values.margin ?? '0',
          options: MARGIN_OPTIONS.map((o) => ({
            label: o.label,
            value: o.value,
          })),
        } as Control,
      ],
    })
  }

  return createSection(
    {
      id: 'spacing',
      title: 'Spacing',
      sectionType: 'spacing',
    },
    groups,
    options
  )
}

/**
 * Get spacing groups without section wrapper
 */
export function getSpacingGroups(config: {
  values: SpacingValues
  options?: SpacingOptions
}) {
  const section = createSpacingSection(config)
  return section.groups ?? []
}
