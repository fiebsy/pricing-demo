/**
 * StickyDataTable V2 - TableHeader Icons
 *
 * Icon components used in the table header.
 *
 * @module components/table-header/icons
 */

import type { SortDirection } from '../../types'

/**
 * Drag handle icon (6-dot grid pattern)
 */
export const DragHandleIcon = () => (
  <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="9" cy="6" r="1.5" />
    <circle cx="15" cy="6" r="1.5" />
    <circle cx="9" cy="12" r="1.5" />
    <circle cx="15" cy="12" r="1.5" />
    <circle cx="9" cy="18" r="1.5" />
    <circle cx="15" cy="18" r="1.5" />
  </svg>
)

/**
 * Sort indicator SVG component
 */
export const SortIndicator = ({
  isActive,
  direction,
}: {
  isActive: boolean
  direction: SortDirection
}) => (
  <div className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center">
    <svg
      className="h-3.5 w-3.5 transition-all duration-75"
      style={{
        transform: isActive && direction === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)',
        opacity: isActive ? 1 : 0.4,
      }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M19 9l-7 7-7-7" />
    </svg>
  </div>
)
