/**
 * StickyDataTable V2 - Unified Configuration Types
 *
 * Main TableConfiguration interface and related hook types.
 *
 * @module types/configuration/unified
 */

import type { TableDimensionConfig } from './dimensions.types'
import type {
  TableToolbarConfig,
  ToolbarPositionMode,
  CountPositionMode,
  CountStackPositionMode,
  IntegratedToolbarPadding,
} from './toolbar.types'
import type { TableFeatureConfig } from './features.types'
import type { TableSkeletonConfig, SkeletonConfigurationProps } from './skeleton.types'
import type { TableBorderConfig, TableBackgroundConfig } from './border-background.types'

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
