/**
 * StickyDataTable V2 - Table Configuration Types
 *
 * Unified configuration system for consistent table styling across the application.
 * Supports site-wide defaults with optional per-page overrides.
 *
 * @module types/table-configuration
 */

import type { ReactNode } from 'react'

// ============================================================================
// DIMENSION CONFIGURATION
// ============================================================================

/**
 * Table dimension settings
 */
export interface TableDimensionConfig {
  /** Row height in pixels (default: 46) */
  rowHeight: number
  /** Header height in pixels (default: 48) */
  headerHeight: number
  /** Border radius in pixels (default: 20) */
  borderRadius: number
  /** Header gap - space above sticky header (default: 12) */
  headerGap: number
}

// ============================================================================
// BORDER CONFIGURATION
// ============================================================================

/**
 * Border visibility and color settings
 */
export interface TableBorderConfig {
  /** Show outer border around table (default: true) */
  showOuter: boolean
  /** Show row divider borders (default: true) */
  showRows: boolean
  /** Show cell divider borders (default: false) */
  showCells: boolean
  /** Outer border color class (default: 'border-primary') */
  outerColor: string
  /** Row border color class (default: 'border-tertiary') */
  rowColor: string
  /** Cell border color class (default: 'border-tertiary/20') */
  cellColor: string
  /** Sticky column right border color (default: 'border-secondary') */
  stickyColumnRightBorderColor: string
  /** Columns to hide cell borders for (e.g., ['__checkbox']) */
  hideCellBordersForColumns: string[]
  /** Override for header bottom border only (body bottom uses outerColor) */
  headerBottomColor?: string
}

// ============================================================================
// BACKGROUND CONFIGURATION
// ============================================================================

/**
 * Background color settings for table sections
 */
export interface TableBackgroundConfig {
  /** Header wrapper background (default: 'bg-secondary_alt') */
  headerWrapper: string
  /** Header container background (default: 'bg-secondary_p1') */
  headerContainer: string
  /** Header sticky cell background (default: 'bg-secondary_p1') */
  headerStickyCell: string
  /** Header sticky cell with arrows (default: 'bg-secondary_t1_95') */
  headerStickyCellWithArrows: string
  /** Body container background (default: 'bg-primary') */
  bodyContainer: string
  /** Row sticky cell background (default: 'bg-primary_transparent') */
  rowStickyCell: string
  /** Row sticky cell with arrows (default: 'bg-secondary_t1_95') */
  rowStickyCellWithArrows: string
  /** Row hover background (default: 'bg-secondary') */
  rowHover: string
}

// ============================================================================
// TOOLBAR CONFIGURATION
// ============================================================================

/**
 * Toolbar position mode
 * - 'above': Toolbar renders above the table (scrolls away)
 * - 'integrated': Toolbar is part of sticky header (stays fixed)
 */
export type ToolbarPositionMode = 'above' | 'integrated'

/**
 * Count display position
 * - 'left': Count displays on left side
 * - 'right': Count displays on right side
 * - 'both': Count displays on both sides
 */
export type CountPositionMode = 'left' | 'right' | 'both'

/**
 * Count stack position relative to toolbar
 * - 'above': Count displays above the toolbar row
 * - 'below': Count displays below the toolbar row
 * - 'inline': Count displays inline with the toolbar (same row)
 */
export type CountStackPositionMode = 'above' | 'below' | 'inline'

/**
 * Integrated toolbar padding settings
 */
export interface IntegratedToolbarPadding {
  /** Top padding above toolbar (default: 0) */
  top: number
  /** Bottom padding / gap to header (default: 8) */
  bottom: number
  /** Left padding (default: 0) */
  left: number
  /** Right padding (default: 0) */
  right: number
}

/**
 * Toolbar layout and spacing configuration
 */
export interface TableToolbarConfig {
  /** Toolbar position mode (default: 'above') */
  position: ToolbarPositionMode
  /** Count display position (default: 'left') */
  countPosition: CountPositionMode
  /** Count stack position relative to toolbar (default: 'below') */
  countStackPosition: CountStackPositionMode

  // === Non-sticky mode settings ===
  /** Bottom margin below toolbar (default: 16) */
  bottomMargin: number
  /** Gap between toolbar and count row (default: 6) */
  countGap: number

  // === Sticky/Integrated mode settings ===
  /** Height of integrated toolbar (default: 40) */
  integratedHeight: number
  /** Padding for integrated toolbar */
  integratedPadding: IntegratedToolbarPadding

  // === Count container padding (for alignment with table) ===
  /** Left padding for left count container (default: 0) */
  countPaddingLeft: number
  /** Right padding for right count container (default: 0) */
  countPaddingRight: number

  // === Debug ===
  /** Show debug outlines for toolbar containers */
  debug: boolean
}

// ============================================================================
// FEATURE FLAGS
// ============================================================================

/**
 * Table feature toggles
 */
export interface TableFeatureConfig {
  /** Enable row selection with checkboxes */
  enableSelection: boolean
  /** Show column visibility control */
  showColumnControl: boolean
  /** Show count display */
  showCount: boolean
  /** Show export button */
  showExport: boolean
  /** Drag clone mode for column reordering: 'floating' or 'inline' */
  dragCloneMode?: 'floating' | 'inline'
}

// ============================================================================
// SKELETON CONFIGURATION
// ============================================================================

/**
 * Width calculation mode for skeleton cells
 */
export type SkeletonWidthMode = 'auto' | 'percentage' | 'fixed'

/**
 * Sticky state simulation mode for skeleton
 */
export type SkeletonStickyStateMode = 'auto' | 'scrollable' | 'no-scroll'

/**
 * Skeleton scope - controls what parts of the table show skeletons
 *
 * - 'full': Skeleton for toolbar, header, and body (legacy behavior)
 * - 'table-only': Real toolbar, skeleton for header + body
 * - 'rows-only': Real toolbar + header, skeleton only for body rows (recommended)
 */
export type SkeletonScope = 'full' | 'table-only' | 'rows-only'

/**
 * Individual cell skeleton appearance configuration
 */
export interface SkeletonCellConfig {
  /** Width calculation mode: 'auto' uses column width minus padding, 'percentage' uses a percentage of column width, 'fixed' uses a fixed pixel width */
  widthMode: SkeletonWidthMode
  /** Width percentage (0-100) when mode is 'percentage' */
  widthPercentage: number
  /** Fixed width in pixels when mode is 'fixed' */
  fixedWidth: number
  /** Height in pixels */
  height: number
  /** Border radius of skeleton element in pixels */
  borderRadius: number
}

/**
 * Skeleton mode configuration for testing and development
 *
 * This configuration allows developers to:
 * - Force skeleton display for testing layout shift prevention
 * - Configure the number of skeleton rows for initial load and infinite scroll
 * - Customize individual cell skeleton appearance
 * - Control toolbar skeleton visibility
 * - Test different sticky state scenarios
 *
 * @example
 * ```tsx
 * // Enable skeleton mode in table config
 * const config = createTableConfiguration({
 *   skeleton: {
 *     enabled: true,
 *     initialRowCount: 15,
 *     bodyCell: { height: 20, widthPercentage: 60 }
 *   }
 * })
 * ```
 */
export interface TableSkeletonConfig {
  // === Mode Control ===
  /** Enable skeleton mode (forces skeleton display instead of data) */
  enabled: boolean

  /**
   * Skeleton scope - controls what parts show skeletons
   * - 'full': Skeleton for toolbar, header, and body (for testing)
   * - 'table-only': Real toolbar, skeleton for header + body
   * - 'rows-only': Real toolbar + header, skeleton only for rows (recommended for production)
   * @default 'rows-only'
   */
  scope: SkeletonScope

  // === Row Count Configuration ===
  /** Number of skeleton rows for initial page load (default: 10) */
  initialRowCount: number
  /** Number of skeleton rows for infinite scroll loads (default: 5) */
  infiniteScrollRowCount: number

  // === Cell Configuration ===
  /** Header cell skeleton appearance configuration */
  headerCell: SkeletonCellConfig
  /** Body cell skeleton appearance configuration */
  bodyCell: SkeletonCellConfig
  /** Checkbox cell skeleton size in pixels (default: 16) */
  checkboxSize: number

  // === Toolbar Skeleton ===
  /** Show toolbar skeleton when skeleton mode is enabled */
  showToolbarSkeleton: boolean
  /** Show filter skeleton in toolbar */
  showFilterSkeleton: boolean
  /** Show search skeleton in toolbar */
  showSearchSkeleton: boolean
  /** Show export button skeleton */
  showExportSkeleton: boolean
  /** Show column control skeleton */
  showColumnControlSkeleton: boolean

  // === Sticky State Simulation ===
  /**
   * How to simulate sticky state for skeleton
   * - 'auto': Automatically detect based on column widths
   * - 'scrollable': Show enhanced sticky styling (backgrounds, borders)
   * - 'no-scroll': Show default styling (no enhanced backgrounds)
   */
  simulateStickyState: SkeletonStickyStateMode

  // === Animation ===
  /** Enable shimmer animation on skeletons (default: true) */
  enableShimmer: boolean
  /** Shimmer animation duration in milliseconds (default: 1500) */
  shimmerDuration: number
}

// ============================================================================
// UNIFIED TABLE CONFIGURATION
// ============================================================================

/**
 * Complete table configuration object
 *
 * This is the single source of truth for all table styling.
 * Site-wide defaults can be defined once and used everywhere.
 *
 * @example
 * ```tsx
 * // Using default config (most pages)
 * <StickyDataTable {...DEFAULT_TABLE_CONFIG.toProps()} />
 *
 * // Using hook for experimentation
 * const { config } = useTableConfiguration({ storageKey: 'my-table' })
 * <StickyDataTable {...config.toProps()} />
 * ```
 */
export interface TableConfiguration {
  /** Dimension settings */
  dimensions: TableDimensionConfig
  /** Border settings */
  border: TableBorderConfig
  /** Background settings */
  background: TableBackgroundConfig
  /** Toolbar settings */
  toolbar: TableToolbarConfig
  /** Feature flags */
  features: TableFeatureConfig
  /** Skeleton mode configuration for testing and development */
  skeleton: TableSkeletonConfig
}

// ============================================================================
// PARTIAL CONFIGURATION (for overrides)
// ============================================================================

/**
 * Deep partial type for nested objects
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Partial table configuration for overrides
 */
export type TableConfigurationOverrides = DeepPartial<TableConfiguration>

// ============================================================================
// HOOK OPTIONS & RETURN TYPES
// ============================================================================

/**
 * Options for useTableConfiguration hook
 */
export interface UseTableConfigurationOptions {
  /**
   * localStorage key for persisting config (optional)
   * If not provided, config won't be persisted
   */
  storageKey?: string

  /**
   * Default overrides to apply on top of site-wide defaults
   */
  defaults?: TableConfigurationOverrides

  /**
   * Whether to persist changes to localStorage (default: true if storageKey provided)
   */
  persist?: boolean
}

/**
 * Return type for useTableConfiguration hook
 */
export interface UseTableConfigurationReturn {
  /** Current configuration */
  config: TableConfiguration

  /**
   * Update configuration with partial overrides
   * Supports deep merging of nested objects
   */
  updateConfig: (overrides: TableConfigurationOverrides) => void

  /**
   * Reset to defaults (clears localStorage if persisting)
   */
  resetConfig: () => void

  /**
   * Check if config has been modified from defaults
   */
  isDirty: boolean

  /**
   * Convert config to StickyDataTable props
   * Spreads all relevant configuration into component props
   */
  toTableProps: () => TableConfigurationProps
}

/**
 * Skeleton configuration props for StickyDataTable
 */
export interface SkeletonConfigurationProps {
  /** Enable skeleton mode (forces skeleton display) */
  enabled: boolean
  /** Skeleton scope - what parts show skeletons */
  scope: SkeletonScope
  /** Number of skeleton rows for initial load */
  initialRowCount: number
  /** Number of skeleton rows for infinite scroll */
  infiniteScrollRowCount: number
  /** Header cell skeleton configuration */
  headerCell: SkeletonCellConfig
  /** Body cell skeleton configuration */
  bodyCell: SkeletonCellConfig
  /** Checkbox skeleton size */
  checkboxSize: number
  /** Show toolbar skeleton */
  showToolbarSkeleton: boolean
  /** Show filter skeleton */
  showFilterSkeleton: boolean
  /** Show search skeleton */
  showSearchSkeleton: boolean
  /** Show export skeleton */
  showExportSkeleton: boolean
  /** Show column control skeleton */
  showColumnControlSkeleton: boolean
  /** Sticky state simulation mode */
  simulateStickyState: SkeletonStickyStateMode
  /** Enable shimmer animation */
  enableShimmer: boolean
  /** Shimmer duration in ms */
  shimmerDuration: number
}

/**
 * Props generated from TableConfiguration for StickyDataTable
 */
export interface TableConfigurationProps {
  borderRadius: number
  headerHeight: number
  rowHeight: number
  borderConfig: {
    showOuter: boolean
    showRows: boolean
    showCells: boolean
    outerColor: string
    rowColor: string
    cellColor: string
    stickyColumnRightBorderColor: string
    hideCellBordersForColumns: string[]
    /** Override for header bottom border only */
    headerBottomColor?: string
  }
  backgroundConfig: {
    headerWrapper: string
    headerContainer: string
    headerStickyCell: string
    headerStickyCellWithArrows: string
    bodyContainer: string
    rowStickyCell: string
    rowStickyCellWithArrows: string
    rowHover: string
  }
  toolbarLayout: {
    position: ToolbarPositionMode
    countPosition: CountPositionMode
    countStackPosition: CountStackPositionMode
    toolbarBottomMargin: number
    toolbarToCountGap: number
    headerGap: number
    integratedToolbarHeight: number
    integratedPadding: IntegratedToolbarPadding
    countPaddingLeft: number
    countPaddingRight: number
    debug: boolean
  }
  enableSelection: boolean
  showColumnControl: boolean
  showCount: boolean
  /** Skeleton mode configuration */
  skeletonConfig: SkeletonConfigurationProps
}
