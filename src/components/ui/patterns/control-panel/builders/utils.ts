// =============================================================================
// Builder Utilities
// =============================================================================
// Shared utilities for section builder functions.
// =============================================================================

import type { Control, ControlGroup, Section, SectionType } from '../types'

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface BuilderOptions {
  /** Include only these groups by key */
  include?: string[]
  /** Exclude these groups by key */
  exclude?: string[]
  /** Override default collapsed state for section */
  defaultCollapsed?: boolean
  /** Custom section ID */
  id?: string
  /** Custom section title */
  title?: string
  /** Custom section label (for tab/sidebar) */
  label?: string
}

export interface GroupDefinition {
  key: string
  title?: string
  description?: string
  controls: Control[]
  columns?: 1 | 2
  defaultCollapsed?: boolean
}

// -----------------------------------------------------------------------------
// Utility Functions
// -----------------------------------------------------------------------------

/**
 * Filter groups based on include/exclude options
 */
export function filterGroups(
  groups: GroupDefinition[],
  options: BuilderOptions
): GroupDefinition[] {
  let filtered = groups

  if (options.include?.length) {
    filtered = filtered.filter((g) => options.include!.includes(g.key))
  }

  if (options.exclude?.length) {
    filtered = filtered.filter((g) => !options.exclude!.includes(g.key))
  }

  return filtered
}

/**
 * Convert group definitions to ControlGroup array
 */
export function toControlGroups(groups: GroupDefinition[]): ControlGroup[] {
  return groups.map(({ key, ...group }) => group)
}

/**
 * Create a section from group definitions
 */
export function createSection(
  defaults: {
    id: string
    title: string
    label?: string
    sectionType: SectionType
  },
  groups: GroupDefinition[],
  options: BuilderOptions = {}
): Section {
  const filteredGroups = filterGroups(groups, options)

  return {
    id: options.id ?? defaults.id,
    title: options.title ?? defaults.title,
    label: options.label ?? defaults.label ?? defaults.title,
    sectionType: defaults.sectionType,
    defaultCollapsed: options.defaultCollapsed,
    groups: toControlGroups(filteredGroups),
  }
}

/**
 * Get value from a config object with dot notation support
 * e.g., getValue(config, 'typography.fontWeight') or getValue(config, 'fontWeight')
 */
export function getValue<T>(obj: Record<string, unknown>, path: string): T | undefined {
  const parts = path.split('.')
  let current: unknown = obj

  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined
    current = (current as Record<string, unknown>)[part]
  }

  return current as T
}

/**
 * Create a slider control definition
 */
export function slider(
  id: string,
  label: string,
  value: number,
  config: { min: number; max: number; step: number; formatLabel?: (v: number) => string }
): Control {
  return {
    type: 'slider',
    id,
    label,
    value,
    ...config,
  }
}

/**
 * Create a select control definition
 */
export function select(
  id: string,
  label: string,
  value: string,
  options: Array<{ label: string; value: string }>
): Control {
  return {
    type: 'select',
    id,
    label,
    value,
    options,
  }
}

/**
 * Create a toggle control definition
 */
export function toggle(id: string, label: string, value: boolean): Control {
  return {
    type: 'toggle',
    id,
    label,
    value,
  }
}
