/**
 * StickyDataTable V2 - Column Types
 *
 * Types for column configuration and computed column state.
 *
 * @module types/core/column
 */

// ============================================================================
// COLUMN CONFIGURATION
// ============================================================================

/** Text alignment options */
export type ColumnAlignment = 'left' | 'center' | 'right'

/**
 * Column configuration interface
 * Defines how a column should be rendered and behave
 *
 * @see docs/STYLING-GUIDE.md for cell rendering typography rules
 *
 * ## Typography Rules (enforced in renderCell):
 * - Body text: `text-sm font-normal text-primary`
 * - Descriptions: `text-xs font-normal text-secondary`
 * - Status codes/IDs: `text-xs font-mono text-tertiary`
 * - Headers: `text-xs font-medium text-tertiary` (automatic)
 *
 * ## Forbidden in renderCell:
 * - Bold text (`font-bold`, `font-semibold`)
 * - Decorative colors (`text-blue-500`, `text-green-600`)
 * - Arbitrary font sizes (`text-[13px]`, `text-lg`)
 * - Custom status badges (use Untitled UI Badge component)
 */
export interface ColumnConfig {
  /** Unique column identifier - used as key and data accessor */
  key: string

  /** Fixed column width in pixels */
  width: number

  /** Text alignment for header and cells */
  align: ColumnAlignment

  /** Whether column sticks during horizontal scroll */
  isSticky?: boolean

  /** Sticky left offset (auto-calculated if not provided) */
  stickyLeft?: number

  /** Whether column header is clickable for sorting */
  sortable?: boolean

  /** Minimum width constraint (defaults to width) */
  minWidth?: number

  /** Maximum width constraint (enables flexible sizing) */
  maxWidth?: number

  /** fr unit ratio for flexible columns (default: 1) */
  flexRatio?: number

  /**
   * Allow text wrapping in cells
   * @default false - Single line, truncated with ellipsis
   *
   * Use for description columns or multi-line content.
   * Combine with appropriate column width.
   *
   * Note: For controlled wrapping with truncation, use `maxLines` instead.
   */
  allowTextWrap?: boolean

  /**
   * Maximum number of lines before truncating with ellipsis
   * Uses CSS line-clamp for clean truncation
   *
   * @default undefined - No line limit (respects allowTextWrap)
   *
   * When set:
   * - Text wraps normally up to maxLines
   * - Additional text is truncated with "..."
   * - Row height may increase up to maxLines worth of text
   *
   * @example
   * // Allow 2 lines max, then truncate
   * { key: 'description', width: 300, align: 'left', maxLines: 2 }
   *
   * // Single line with truncation (default behavior)
   * { key: 'name', width: 200, align: 'left' }
   *
   * // Unlimited wrapping (no truncation)
   * { key: 'notes', width: 300, align: 'left', allowTextWrap: true }
   */
  maxLines?: number

  /**
   * Enable tabular numbers for digit alignment
   * @default true - Enabled by default
   *
   * Tabular numbers ensure equal digit widths for proper column alignment.
   * Set to `false` for text-only columns (names, descriptions, etc.)
   * Keep `true` for numeric columns (amounts, counts, dates).
   *
   * @example
   * // Numeric column - keep default (true)
   * { key: 'amount', width: 120, align: 'right' }
   *
   * // Text column - disable
   * { key: 'name', width: 200, align: 'left', useTabularNums: false }
   *
   * // ID column (mono font) - disable
   * { key: 'id', width: 80, align: 'left', useTabularNums: false }
   */
  useTabularNums?: boolean
}

/** Column with computed sticky offset */
export interface ComputedColumn extends ColumnConfig {
  /** Computed sticky left position */
  computedStickyLeft: number
  /** Column index in the visible columns array */
  index: number
  /** Whether this is the first visible column */
  isFirst: boolean
  /** Whether this is the last visible column */
  isLast: boolean
  /** Whether this is the last sticky column */
  isLastSticky: boolean
  /** Whether this is the first sticky column */
  isFirstSticky: boolean
}

// ============================================================================
// COLUMN VISIBILITY
// ============================================================================

/** Column change event */
export interface ColumnChange {
  columnKey: string
  action: 'added' | 'removed'
  timestamp: number
}

/** Column visibility state */
export interface ColumnVisibilityState {
  /** Set of visible column keys */
  visibleKeys: Set<string>
  /** Set of columns animating out */
  leavingKeys: Set<string>
  /** Current column change (for animation) */
  columnChange: ColumnChange | null
}
