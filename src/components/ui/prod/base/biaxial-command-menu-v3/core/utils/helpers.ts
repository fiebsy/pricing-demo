/**
 * Biaxial Command Menu V3 - Helper Utilities
 *
 * General helper functions for the command menu.
 */

import type { BackgroundOption, CommandGroup, CommandItemAction } from '../types'

/**
 * Get Tailwind background class from background option
 *
 * @param bg - Background option
 * @returns Tailwind class string
 */
export function getBackgroundClass(bg: BackgroundOption): string {
  switch (bg) {
    case 'none':
      return ''
    case 'primary':
      return 'bg-primary'
    case 'secondary':
      return 'bg-secondary'
    case 'tertiary':
      return 'bg-tertiary'
    case 'quaternary':
      return 'bg-quaternary'
    default:
      return ''
  }
}

/**
 * Filter command groups based on search text
 *
 * @param groups - Array of command groups
 * @param filter - Search filter string
 * @returns Filtered groups with matching items
 */
export function filterGroups(groups: CommandGroup[], filter: string): CommandGroup[] {
  if (!filter.trim()) return groups

  const lowerFilter = filter.toLowerCase()

  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (item.type === 'separator') return false
        const action = item as CommandItemAction
        return (
          action.label.toLowerCase().includes(lowerFilter) ||
          action.description?.toLowerCase().includes(lowerFilter)
        )
      }),
    }))
    .filter((group) => group.items.length > 0)
}

/**
 * Count action items in groups (excludes separators)
 *
 * @param groups - Array of command groups
 * @returns Total count of action items
 */
export function countItems(groups: CommandGroup[]): number {
  return groups.reduce(
    (sum, g) => sum + g.items.filter((i) => i.type !== 'separator').length,
    0
  )
}
