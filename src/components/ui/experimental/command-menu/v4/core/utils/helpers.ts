/**
 * Biaxial Expand V4 - Helper Utilities
 *
 * Common utility functions for styling and calculations.
 */

import type { BackgroundOption, BorderColorOption, CommandGroup, CommandItem } from '../types'

// ============================================================================
// BACKGROUND CLASSES
// ============================================================================

const BACKGROUND_CLASSES: Record<BackgroundOption, string> = {
  none: '',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  quaternary: 'bg-quaternary',
}

export function getBackgroundClass(background: BackgroundOption): string {
  return BACKGROUND_CLASSES[background]
}

// ============================================================================
// BORDER COLOR
// ============================================================================

export function getBorderColorVar(color: BorderColorOption): string {
  return `var(--color-border-${color})`
}

// ============================================================================
// DEEP MERGE
// ============================================================================

/**
 * Deep merge two objects, with source taking precedence.
 */
export function deepMerge<T>(target: T, source: Partial<T>): T {
  if (!source) return target

  const result = { ...target } as T

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key]
      const targetValue = (target as Record<string, unknown>)[key]

      if (
        sourceValue !== undefined &&
        typeof sourceValue === 'object' &&
        sourceValue !== null &&
        !Array.isArray(sourceValue) &&
        typeof targetValue === 'object' &&
        targetValue !== null &&
        !Array.isArray(targetValue)
      ) {
        // Recursively merge nested objects
        (result as Record<string, unknown>)[key] = deepMerge(
          targetValue as Record<string, unknown>,
          sourceValue as Record<string, unknown>
        )
      } else if (sourceValue !== undefined) {
        (result as Record<string, unknown>)[key] = sourceValue
      }
    }
  }

  return result
}

// ============================================================================
// COMMAND FILTERING
// ============================================================================

/**
 * Filter command groups by search string.
 */
export function filterGroups(
  groups: CommandGroup[],
  filter: string
): CommandGroup[] {
  if (!filter.trim()) return groups

  const searchLower = filter.toLowerCase()

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (item.type === 'separator') return false
        return (
          item.label.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower)
        )
      }),
    }))
    .filter((group) => group.items.length > 0)
}

/**
 * Count total items across groups (excluding separators).
 */
export function countItems(groups: CommandGroup[]): number {
  return groups.reduce((total, group) => {
    return (
      total +
      group.items.filter((item) => item.type !== 'separator').length
    )
  }, 0)
}

/**
 * Calculate panel height based on content.
 */
export function calculatePanelHeight(
  itemCount: number,
  groupCount: number,
  itemHeight: number,
  itemGap: number,
  paddingTop: number,
  paddingBottom: number,
  maxHeight: number,
  isEmpty: boolean
): number {
  if (isEmpty) {
    return Math.min(100, maxHeight) // Empty state height
  }

  // Calculate content height
  const itemsHeight = itemCount * itemHeight
  const gapsHeight = Math.max(0, itemCount - 1) * itemGap
  const groupHeaderHeight = groupCount * 32 // Group labels
  const groupGapsHeight = Math.max(0, groupCount - 1) * 8

  const contentHeight =
    itemsHeight + gapsHeight + groupHeaderHeight + groupGapsHeight + paddingTop + paddingBottom

  return Math.min(contentHeight, maxHeight)
}
