/**
 * StickyDataTable V2 - Column Processor
 *
 * Unified column processing logic shared between StickyDataTable and TableSkeleton.
 * This ensures both components use identical column calculations for perfect alignment.
 *
 * @module utils/column-processor
 */

import type { ColumnConfig, ComputedColumn, StickyState, BorderConfig, BackgroundConfig } from '../types'
import { computeColumnOffsets, separateColumns, calculateTotalStickyWidth, generateGridTemplate } from './grid'
import { createBorderConfig, createBackgroundConfig, createInitialStickyState } from '../config'

// ============================================================================
// TYPES
// ============================================================================

/**
 * Options for processing columns
 */
export interface ColumnProcessorOptions {
  /** Raw column configuration */
  columns: ColumnConfig[]
  /** Enable selection checkbox column */
  enableSelection?: boolean
  /** Set of visible column keys (filters columns) */
  visibleColumnKeys?: Set<string>
  /** Simulate scrollable state for skeleton */
  simulateScrollable?: boolean
  /** Border configuration overrides */
  borderConfig?: Partial<BorderConfig>
  /** Background configuration overrides */
  backgroundConfig?: Partial<BackgroundConfig>
}

/**
 * Result of column processing
 */
export interface ProcessedColumnsResult {
  /** All processed columns with computed offsets */
  allColumns: ComputedColumn[]
  /** Sticky columns only */
  stickyColumns: ComputedColumn[]
  /** Scrollable (non-sticky) columns only */
  scrollableColumns: ComputedColumn[]
  /** CSS grid template string */
  gridTemplate: string
  /** Total width of sticky columns in pixels */
  totalStickyWidth: number
  /** Sticky state (simulated or initial) */
  stickyState: StickyState
  /** Merged border configuration */
  borderConfig: BorderConfig
  /** Merged background configuration */
  backgroundConfig: BackgroundConfig
  /** Whether checkbox column was added */
  hasCheckboxColumn: boolean
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Checkbox column configuration
 * Added as first sticky column when selection is enabled
 */
const CHECKBOX_COLUMN: ColumnConfig = {
  key: '__checkbox',
  width: 48,
  align: 'center',
  isSticky: true,
  stickyLeft: 0,
  sortable: false,
}

// ============================================================================
// CORE PROCESSING
// ============================================================================

/**
 * Process columns with unified logic
 *
 * This function handles:
 * 1. Adding checkbox column if selection enabled
 * 2. Adjusting sticky offsets for existing columns
 * 3. Filtering by visibility
 * 4. Computing sticky offsets
 * 5. Generating grid template
 * 6. Creating sticky state
 *
 * @param options - Column processor options
 * @returns Processed columns result
 *
 * @example
 * ```tsx
 * // Basic usage
 * const result = processColumns({ columns: myColumns })
 *
 * // With selection
 * const result = processColumns({
 *   columns: myColumns,
 *   enableSelection: true,
 * })
 *
 * // With visibility filter
 * const result = processColumns({
 *   columns: myColumns,
 *   visibleColumnKeys: new Set(['id', 'name', 'amount']),
 * })
 *
 * // For skeleton with scrollable simulation
 * const result = processColumns({
 *   columns: myColumns,
 *   enableSelection: true,
 *   simulateScrollable: true,
 * })
 * ```
 */
export function processColumns(options: ColumnProcessorOptions): ProcessedColumnsResult {
  const {
    columns,
    enableSelection = false,
    visibleColumnKeys,
    simulateScrollable = false,
    borderConfig: borderConfigOverrides,
    backgroundConfig: backgroundConfigOverrides,
  } = options

  let processedColumns = [...columns]
  let hasCheckboxColumn = false

  // Step 1: Add checkbox column if selection enabled
  if (enableSelection) {
    // Check if checkbox column already exists
    const hasExistingCheckbox = processedColumns.some((col) => col.key === '__checkbox')

    if (!hasExistingCheckbox) {
      // Adjust stickyLeft for existing sticky columns
      processedColumns = processedColumns.map((col) => {
        if (col.isSticky && col.stickyLeft !== undefined) {
          return { ...col, stickyLeft: col.stickyLeft + CHECKBOX_COLUMN.width }
        }
        return col
      })

      // Add checkbox as first column
      processedColumns = [CHECKBOX_COLUMN, ...processedColumns]
      hasCheckboxColumn = true
    } else {
      hasCheckboxColumn = true
    }
  }

  // Step 2: Filter by visibility if provided
  if (visibleColumnKeys && visibleColumnKeys.size > 0) {
    processedColumns = processedColumns.filter((col) => {
      // Always include checkbox column
      if (col.key === '__checkbox') return true
      return visibleColumnKeys.has(col.key)
    })
  }

  // Step 2.5: Reorder columns so sticky come first (matches grid template order)
  // This is critical for skeleton alignment - the grid template expects sticky columns
  // to come before scrollable columns. Without this reordering, cells would be rendered
  // in user order but the grid expects sticky-first order, causing misalignment.
  const reorderedColumns = [
    ...processedColumns.filter((col) => col.isSticky),
    ...processedColumns.filter((col) => !col.isSticky),
  ]

  // Step 3: Compute column offsets
  const computedColumns = computeColumnOffsets(reorderedColumns)

  // Step 4: Separate into sticky and scrollable
  const { stickyColumns, scrollableColumns } = separateColumns(computedColumns)

  // Step 5: Generate grid template
  const gridTemplate = generateGridTemplate(stickyColumns, scrollableColumns)

  // Step 6: Calculate total sticky width
  const totalStickyWidth = calculateTotalStickyWidth(stickyColumns)

  // Step 7: Create sticky state
  const stickyState: StickyState = simulateScrollable
    ? {
        showLeftArrow: false,
        showRightArrow: true,
        hasArrows: true,
        useEnhancedStyling: true,
      }
    : createInitialStickyState()

  // Step 8: Merge configurations
  const borderConfig = createBorderConfig(borderConfigOverrides)
  const backgroundConfig = createBackgroundConfig(backgroundConfigOverrides)

  return {
    allColumns: computedColumns,
    stickyColumns,
    scrollableColumns,
    gridTemplate,
    totalStickyWidth,
    stickyState,
    borderConfig,
    backgroundConfig,
    hasCheckboxColumn,
  }
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Create visible column keys set from default visible columns array
 *
 * @param columns - All columns
 * @param defaultVisibleColumns - Array of visible column keys
 * @returns Set of visible column keys
 */
export function createVisibleColumnKeys(
  columns: ColumnConfig[],
  defaultVisibleColumns?: string[]
): Set<string> | undefined {
  if (!defaultVisibleColumns || defaultVisibleColumns.length === 0) {
    return undefined
  }

  const visibleSet = new Set(defaultVisibleColumns)

  // Filter to only include keys that exist in columns
  const validKeys = columns.map((c) => c.key).filter((key) => visibleSet.has(key))

  return new Set(validKeys)
}

/**
 * Check if columns configuration has any sticky columns
 *
 * @param columns - Column configuration array
 * @returns True if any column is sticky
 */
export function hasStickyColumns(columns: ColumnConfig[]): boolean {
  return columns.some((col) => col.isSticky)
}

/**
 * Count total number of sticky columns
 *
 * @param columns - Column configuration array
 * @returns Number of sticky columns
 */
export function countStickyColumns(columns: ColumnConfig[]): number {
  return columns.filter((col) => col.isSticky).length
}

/**
 * Get the rightmost sticky column
 *
 * @param columns - Computed columns
 * @returns The last sticky column or undefined
 */
export function getRightmostStickyColumn(columns: ComputedColumn[]): ComputedColumn | undefined {
  const stickyColumns = columns.filter((col) => col.isSticky)
  return stickyColumns[stickyColumns.length - 1]
}













