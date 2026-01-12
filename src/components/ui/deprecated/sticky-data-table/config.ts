/**
 * StickyDataTable V2 - Configuration
 *
 * Centralized configuration constants and factory functions.
 * Provides sensible defaults with full customization support.
 *
 * @module config
 */

import type { ReactNode } from 'react'
import type { BackgroundConfig, BorderConfig, StickyState } from './types'

// ============================================================================
// TABLE DIMENSIONS
// ============================================================================

export const TABLE_CONFIG = {
  /** Gap above sticky header (px) - base gap when toolbar is NOT integrated */
  HEADER_GAP: 12,
  /** Fixed header row height (px) */
  HEADER_HEIGHT: 48,
  /** Fixed body row height (px) */
  ROW_HEIGHT: 46,
  /** Fixed toolbar height (px) - matches actual button height + spacing */
  TOOLBAR_HEIGHT: 40,
  /** Toolbar bottom margin (px) - matches mb-4 (16px) */
  TOOLBAR_MARGIN: 16,
  // ---- Integrated Toolbar (Experimental) ----
  /** Height of toolbar when integrated into sticky header (px) */
  INTEGRATED_TOOLBAR_HEIGHT: 40,
  /** Gap between integrated toolbar and table header (px) */
  INTEGRATED_TOOLBAR_TO_HEADER_GAP: 12,
  /** Top padding above integrated toolbar (px) */
  INTEGRATED_TOOLBAR_TOP_PADDING: 12,
  /** Additional margin when count display is shown (px) */
  COUNT_DISPLAY_MARGIN: 20,
  /** Height of a single filter pill row (px) */
  FILTER_PILL_HEIGHT: 32,
  /** Gap between filter pills (px) */
  FILTER_PILL_GAP: 8,
  /** Scroll amount per arrow click (px) */
  SCROLL_AMOUNT: 300,
  /** Threshold for scroll boundary detection (px) */
  SCROLL_THRESHOLD: 10,
  /** Default border radius (px) */
  DEFAULT_BORDER_RADIUS: 20,
} as const

// ============================================================================
// CELL CONFIGURATION
// ============================================================================

/**
 * Cell-level styling constants
 * Centralized values for consistent cell rendering
 */
export const CELL_CONFIG = {
  /** Padding classes for cell positions */
  PADDING: {
    /** First column: extra left padding */
    FIRST: 'pl-6 pr-4',
    /** Last column: extra right padding */
    LAST: 'pl-4 pr-6',
    /** Middle columns: standard padding */
    MIDDLE: 'px-4',
  },
  /** Z-index values for cell layering */
  Z_INDEX: {
    /** Sticky cells need higher z-index */
    STICKY: 10,
    /** Normal cells */
    NORMAL: 1,
  },
  /** Default checkbox column width */
  CHECKBOX_WIDTH: 48,
} as const

// ============================================================================
// TOOLBAR CONFIGURATION TYPES
// ============================================================================

/**
 * Toolbar position options
 * - 'above': Toolbar renders above the table with margin (default)
 * - 'integrated': Toolbar renders inside the header gap (sticky area above table header)
 */
export type ToolbarPosition = 'above' | 'integrated'

/**
 * Count display position options
 * - 'left': Count displays below left toolbar (default)
 * - 'right': Count displays below right toolbar/column controls
 * - 'both': Count displays on both sides (use leftCount/rightCount for custom values)
 */
export type CountPosition = 'left' | 'right' | 'both'

/**
 * Configuration for a single count display
 */
export interface CountDisplayConfig {
  /** The count value to display */
  value: number
  /** The label text (e.g., "products", "orders") */
  label: string
  /** Custom renderer - if provided, overrides default rendering */
  renderer?: ReactNode
}

/**
 * Configuration for toolbar layout and spacing
 * Controls where toolbar appears and spacing between sections
 */
export interface ToolbarLayoutConfig {
  /**
   * Where the toolbar should be positioned
   * - 'above': Traditional position above table with margin
   * - 'integrated': Inside the header gap (sticky with table header)
   * @default 'above'
   */
  position?: ToolbarPosition

  /**
   * Where the count display should appear
   * - 'left': Below the left toolbar (default)
   * - 'right': Below the right toolbar/column controls
   * @default 'left'
   */
  countPosition?: CountPosition

  /**
   * Stack position of count relative to toolbar
   * - 'above': Count displays above the toolbar row
   * - 'below': Count displays below the toolbar row (default)
   * - 'inline': Count displays inline with the toolbar (same row)
   * @default 'below'
   */
  countStackPosition?: 'above' | 'below' | 'inline'

  /**
   * Gap between toolbar row and count row (px)
   * Only applies when both toolbar and count are shown
   * @default 6 (matches gap-1.5)
   */
  toolbarToCountGap?: number

  /**
   * Bottom margin of the entire toolbar section (px)
   * Space between toolbar section and table header
   * @default 16 (TABLE_CONFIG.TOOLBAR_MARGIN)
   */
  toolbarBottomMargin?: number

  /**
   * Header gap height when toolbar is integrated (px)
   * This is the sticky area above the table header
   * @default 12 (TABLE_CONFIG.HEADER_GAP)
   */
  headerGap?: number

  /**
   * Padding inside integrated toolbar (px)
   * Only applies when position is 'integrated'
   * @default { top: 0, bottom: 0, left: 0, right: 0 }
   */
  integratedPadding?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }

  /**
   * Height of the integrated toolbar row (px)
   * Only applies when position is 'integrated'
   * @default 40 (TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT)
   */
  integratedToolbarHeight?: number

  /**
   * Enable debug mode to visualize toolbar containers
   * Shows colored backgrounds for each container:
   * - Purple: Main toolbar wrapper
   * - Blue: Left column (toolbar row + count)
   * - Green: Right column (toolbar row + count)
   * @default false
   */
  debug?: boolean

  /**
   * Left padding for left count container (px)
   * Used to align count with table columns
   * @default 0
   */
  countPaddingLeft?: number

  /**
   * Right padding for right count container (px)
   * Used to align count with table columns
   * @default 0
   */
  countPaddingRight?: number

  /**
   * Custom left count display config
   * When provided, overrides totalCount/countLabel for the left side
   * Only used when countPosition is 'left' or 'both'
   */
  leftCount?: CountDisplayConfig

  /**
   * Custom right count display config
   * When provided, overrides totalCount/countLabel for the right side
   * Only used when countPosition is 'right' or 'both'
   */
  rightCount?: CountDisplayConfig
}

/**
 * Configuration for toolbar height calculation
 * Used by both StickyDataTable and TableSkeleton for perfect sync
 */
export interface ToolbarConfig {
  /** Show toolbar (default: false) */
  showToolbar?: boolean
  /** Show left toolbar content (default: false) */
  showLeftToolbar?: boolean
  /** Show right toolbar content (default: false) */
  showRightToolbar?: boolean
  /** Show export button (default: false) */
  showExportButton?: boolean
  /** Show column control (default: false) */
  showColumnControl?: boolean
  /** Show count display below toolbar (default: false) */
  showCount?: boolean
  /** Number of active filter pills (for height estimation) */
  activeFilterCount?: number
  /** Estimated container width for calculating filter pill rows (px) */
  containerWidth?: number
  /** Layout configuration for toolbar positioning and spacing */
  layout?: ToolbarLayoutConfig
}

/**
 * Default toolbar layout configuration
 * Note: leftCount and rightCount are intentionally omitted - they're runtime values
 */
export const DEFAULT_TOOLBAR_LAYOUT: Omit<Required<ToolbarLayoutConfig>, 'leftCount' | 'rightCount'> = {
  position: 'above',
  countPosition: 'left',
  countStackPosition: 'below',
  toolbarToCountGap: 6,
  toolbarBottomMargin: TABLE_CONFIG.TOOLBAR_MARGIN,
  headerGap: TABLE_CONFIG.HEADER_GAP,
  integratedPadding: {
    top: TABLE_CONFIG.INTEGRATED_TOOLBAR_TOP_PADDING,
    bottom: TABLE_CONFIG.INTEGRATED_TOOLBAR_TO_HEADER_GAP,
    left: 0,
    right: 0,
  },
  integratedToolbarHeight: TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT,
  countPaddingLeft: 0,
  countPaddingRight: 0,
  debug: false,
} as const

/**
 * Calculate the total header gap when toolbar is integrated
 * This is the distance from the top of the viewport to the table header row
 *
 * Structure when integrated:
 * [top padding] + [toolbar height] + [gap to header] = total sticky area above header
 */
export function calculateIntegratedHeaderGap(
  toolbarHeight: number = TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT,
  topPadding: number = TABLE_CONFIG.INTEGRATED_TOOLBAR_TOP_PADDING,
  toHeaderGap: number = TABLE_CONFIG.INTEGRATED_TOOLBAR_TO_HEADER_GAP
): number {
  return topPadding + toolbarHeight + toHeaderGap
}

/**
 * Configuration for skeleton dimensions
 * Comprehensive config that captures all dimension variables
 */
export interface SkeletonDimensionConfig {
  /** Toolbar configuration */
  toolbar: ToolbarConfig
  /** Custom row height override (px) - defaults to TABLE_CONFIG.ROW_HEIGHT */
  rowHeight?: number
  /** Custom header height override (px) - defaults to TABLE_CONFIG.HEADER_HEIGHT */
  headerHeight?: number
  /** Custom header gap override (px) - defaults to TABLE_CONFIG.HEADER_GAP */
  headerGap?: number
  /** Custom border radius (px) - defaults to TABLE_CONFIG.DEFAULT_BORDER_RADIUS */
  borderRadius?: number
}

// ============================================================================
// DIMENSION CALCULATION UTILITIES
// ============================================================================

/**
 * Calculate toolbar height based on configuration
 * This is the single source of truth for toolbar height calculation
 *
 * The calculation differs based on toolbar position:
 * - 'above': Uses bottom margin from layout (configurable)
 * - 'integrated': Uses integrated padding + toolbar height (inside sticky header)
 *
 * @param config - Toolbar configuration
 * @param layout - Optional toolbar layout configuration for accurate margin calculation
 */
export function calculateToolbarHeight(
  config: ToolbarConfig,
  layout?: ToolbarLayoutConfig
): number {
  if (!config.showToolbar) return 0

  const effectiveLayout = layout ?? config.layout

  // Check if toolbar is integrated into sticky header
  const isIntegrated = effectiveLayout?.position === 'integrated'

  if (isIntegrated) {
    // Integrated toolbar: renders inside sticky header wrapper
    // Height = top padding + toolbar height + bottom padding (gap to header)
    const topPadding = effectiveLayout?.integratedPadding?.top ?? 0
    const bottomPadding = effectiveLayout?.integratedPadding?.bottom ?? 8
    const toolbarHeight = effectiveLayout?.integratedToolbarHeight ?? TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT
    return topPadding + toolbarHeight + bottomPadding
  }

  // 'Above' position: toolbar renders above table with margin
  let height = TABLE_CONFIG.TOOLBAR_HEIGHT

  // Use configured margin or fall back to default
  const margin = effectiveLayout?.toolbarBottomMargin ?? TABLE_CONFIG.TOOLBAR_MARGIN

  // Count display adds height (in normal document flow)
  // Note: For 'below' stack position, count is below toolbar row
  if (config.showCount && effectiveLayout?.countStackPosition !== 'inline') {
    height += (effectiveLayout?.toolbarToCountGap ?? 6) + TABLE_CONFIG.COUNT_DISPLAY_MARGIN
  }

  return height + margin
}

/**
 * Calculate total skeleton height for perfect layout sync
 *
 * @param config - Skeleton dimension configuration
 * @param rowCount - Number of skeleton rows to display
 * @param toolbarLayout - Optional toolbar layout for accurate toolbar height calculation
 * @returns Total height in pixels
 */
export function calculateSkeletonHeight(
  config: SkeletonDimensionConfig,
  rowCount: number,
  toolbarLayout?: ToolbarLayoutConfig
): number {
  // Pass toolbarLayout for accurate margin/padding calculation
  const toolbarHeight = calculateToolbarHeight(config.toolbar, toolbarLayout)
  const headerHeight = config.headerHeight ?? TABLE_CONFIG.HEADER_HEIGHT
  const rowHeight = config.rowHeight ?? TABLE_CONFIG.ROW_HEIGHT
  const bodyHeight = rowCount * rowHeight

  // For integrated toolbar, the toolbar height is part of the sticky header area
  // so we don't add it to document flow height
  const isIntegrated = toolbarLayout?.position === 'integrated'
  const effectiveToolbarHeight = isIntegrated ? 0 : toolbarHeight

  // Note: Header gap is NOT included because it's handled by sticky positioning
  // (top: HEADER_GAP) rather than document flow
  return effectiveToolbarHeight + headerHeight + bodyHeight
}

/**
 * Create toolbar layout configuration with defaults
 * Note: leftCount and rightCount are runtime values, not returned in defaults
 */
export function createToolbarLayoutConfig(
  overrides?: Partial<ToolbarLayoutConfig>
): ToolbarLayoutConfig {
  return {
    ...DEFAULT_TOOLBAR_LAYOUT,
    ...overrides,
    integratedPadding: {
      ...DEFAULT_TOOLBAR_LAYOUT.integratedPadding,
      ...overrides?.integratedPadding,
    },
  }
}

/**
 * Create default toolbar configuration
 */
export function createToolbarConfig(overrides?: Partial<ToolbarConfig>): ToolbarConfig {
  return {
    showToolbar: false,
    showLeftToolbar: false,
    showRightToolbar: false,
    showExportButton: false,
    showColumnControl: false,
    showCount: false,
    activeFilterCount: 0,
    layout: createToolbarLayoutConfig(overrides?.layout),
    ...overrides,
  }
}

/**
 * Create skeleton dimension configuration
 */
export function createSkeletonDimensionConfig(
  overrides?: Partial<SkeletonDimensionConfig>
): SkeletonDimensionConfig {
  return {
    toolbar: createToolbarConfig(overrides?.toolbar),
    rowHeight: overrides?.rowHeight ?? TABLE_CONFIG.ROW_HEIGHT,
    headerHeight: overrides?.headerHeight ?? TABLE_CONFIG.HEADER_HEIGHT,
    headerGap: overrides?.headerGap ?? TABLE_CONFIG.HEADER_GAP,
    borderRadius: overrides?.borderRadius ?? TABLE_CONFIG.DEFAULT_BORDER_RADIUS,
  }
}

/**
 * Infer toolbar configuration from StickyDataTable props
 * Useful for creating matching skeleton configuration
 */
export function inferToolbarConfigFromProps(props: {
  leftToolbar?: unknown
  rightToolbar?: unknown
  exportAll?: unknown
  exportSelected?: unknown
  exportToolbar?: unknown
  showColumnControl?: boolean
  showCount?: boolean
}): ToolbarConfig {
  const showExportButton = !!(props.exportAll || props.exportSelected || props.exportToolbar)
  const showToolbar = !!(
    props.leftToolbar ||
    props.rightToolbar ||
    showExportButton ||
    props.showColumnControl ||
    props.showCount
  )

  return {
    showToolbar,
    showLeftToolbar: !!props.leftToolbar,
    showRightToolbar: !!props.rightToolbar,
    showExportButton,
    showColumnControl: props.showColumnControl ?? true,
    showCount: props.showCount ?? false,
    activeFilterCount: 0, // Can't infer from props alone
  }
}

// ============================================================================
// ARROW POSITIONING
// ============================================================================

export const ARROW_CONFIG = {
  /** Preferred top offset for normal tables (px) */
  PREFERRED_TOP_OFFSET: 300,
  /** Minimum offset from bottom (px) */
  BOTTOM_OFFSET: 100,
  /** Arrow button height (px) */
  ARROW_HEIGHT: 40,
  /** Right arrow distance from right edge */
  RIGHT_ARROW_RIGHT: '16px',
  /** Short table height threshold (px) */
  SHORT_TABLE_THRESHOLD: 200,
  /** Short table position percentage */
  SHORT_TABLE_POSITION_PERCENT: 0.4,
} as const

// ============================================================================
// ANIMATION TIMING
// ============================================================================

export const ANIMATION_CONFIG = {
  /** Column enter animation duration (ms) - matches CSS column-enter */
  COLUMN_ENTER_DURATION: 300,
  /** Column leave animation duration (ms) - matches CSS column-leave */
  COLUMN_LEAVE_DURATION: 250,
  /** FLIP neighbor shift animation duration (ms) */
  COLUMN_SHIFT_DURATION: 200,
  /** Combined animation duration for FLIP sequencing (ms) */
  COLUMN_ANIMATION_DURATION: 200,
  /** Delay before removing column from DOM after leave animation starts (ms) */
  COLUMN_REMOVE_DELAY: 250,
  /** Column change state clear delay (ms) - slightly after animations complete */
  COLUMN_CHANGE_CLEAR_DELAY: 350,
  /** Leaving column cleanup delay (ms) - matches leave animation */
  LEAVING_COLUMN_CLEAR_DELAY: 250,
  /** Scroll sync sub-pixel threshold */
  SCROLL_SYNC_THRESHOLD: 1,
} as const

// ============================================================================
// DEFAULT CONFIGURATIONS
// ============================================================================

/**
 * Default border configuration
 * Uses semantic design tokens
 */
export const DEFAULT_BORDER_CONFIG: BorderConfig = {
  outerColor: 'border-primary',
  rowColor: 'border-tertiary',
  cellColor: 'border-tertiary/20',
  showOuter: true,
  showRows: true,
  showCells: true,
  stickyColumnRightBorderColor: 'border-secondary',
} as const

/**
 * Default background configuration
 * Uses semantic design tokens for theming support
 */
export const DEFAULT_BACKGROUND_CONFIG: BackgroundConfig = {
  headerWrapper: 'bg-secondary_alt',
  headerContainer: 'bg-secondary_p1',
  headerStickyCell: 'bg-secondary_p1',
  headerStickyCellWithArrows: 'bg-secondary_t1_95',
  bodyContainer: 'bg-primary',
  rowStickyCell: 'bg-primary_transparent',
  rowStickyCellWithArrows: 'bg-secondary_t1_95',
  rowHover: 'bg-secondary',
} as const

// ============================================================================
// FACTORY FUNCTIONS
// ============================================================================

/**
 * Create merged border config with defaults
 */
export function createBorderConfig(overrides?: Partial<BorderConfig>): BorderConfig {
  return {
    ...DEFAULT_BORDER_CONFIG,
    ...overrides,
    hideCellBordersForColumns: overrides?.hideCellBordersForColumns ?? [],
  }
}

/**
 * Create merged background config with defaults
 */
export function createBackgroundConfig(overrides?: Partial<BackgroundConfig>): BackgroundConfig {
  return {
    ...DEFAULT_BACKGROUND_CONFIG,
    ...overrides,
  }
}

/**
 * Create StickyState from scroll state
 */
export function createStickyState(canScrollLeft: boolean, canScrollRight: boolean): StickyState {
  const hasArrows = canScrollLeft || canScrollRight
  return {
    showLeftArrow: canScrollLeft,
    showRightArrow: canScrollRight,
    hasArrows,
    useEnhancedStyling: hasArrows,
  }
}

/**
 * Create initial sticky state (no scrolling)
 */
export function createInitialStickyState(): StickyState {
  return {
    showLeftArrow: false,
    showRightArrow: false,
    hasArrows: false,
    useEnhancedStyling: false,
  }
}

// ============================================================================
// UNIFIED TABLE CONFIGURATION
// ============================================================================

import type {
  TableConfiguration,
  TableConfigurationOverrides,
  TableConfigurationProps,
  DeepPartial,
} from './types/table-configuration.types'

/**
 * Site-wide default table configuration
 *
 * This is the "blessed" production configuration used across the application.
 * Most pages should use this directly without modification.
 *
 * For experimentation, use the useTableConfiguration hook which allows
 * temporary overrides with localStorage persistence.
 *
 * @example
 * ```tsx
 * // Direct usage (most common)
 * <StickyDataTable {...DEFAULT_TABLE_CONFIGURATION.toProps()} />
 *
 * // With overrides
 * <StickyDataTable
 *   {...DEFAULT_TABLE_CONFIGURATION.toProps()}
 *   borderRadius={16}
 * />
 * ```
 */
export const DEFAULT_TABLE_CONFIGURATION: TableConfiguration = {
  // GAN2 Configuration - Updated 2026-01-02
  dimensions: {
    rowHeight: 52,
    headerHeight: 40,
    borderRadius: 16,
    headerGap: 12,
  },

  border: {
    showOuter: true,
    showRows: true,
    showCells: true,
    outerColor: 'border-primary',
    rowColor: 'border-secondary',
    cellColor: 'border-tertiary',
    stickyColumnRightBorderColor: 'border-secondary',
    hideCellBordersForColumns: ['__checkbox'],
    headerBottomColor: 'border-primary',
  },

  background: {
    headerWrapper: 'bg-secondary_alt',
    headerContainer: 'bg-secondary_t1',
    headerStickyCell: 'bg-secondary_t1',
    headerStickyCellWithArrows: 'bg-secondary_t1/90',
    bodyContainer: 'bg-primary',
    rowStickyCell: 'bg-primary/0',
    rowStickyCellWithArrows: 'bg-secondary_t1/90',
    rowHover: 'bg-tertiary',
  },

  toolbar: {
    position: 'integrated',
    countPosition: 'right',
    countStackPosition: 'inline',
    bottomMargin: 16,
    countGap: 0,
    integratedHeight: 32,
    integratedPadding: {
      top: 0,
      bottom: 12,
      left: 0,
      right: 0,
    },
    countPaddingLeft: 0,
    countPaddingRight: 24,
    debug: false,
  },

  features: {
    enableSelection: false,
    showColumnControl: true,
    showCount: false,
    showExport: false,
    dragCloneMode: 'inline',
  },

  skeleton: {
    enabled: false,
    scope: 'rows-only',
    initialRowCount: 16,
    infiniteScrollRowCount: 5,

    headerCell: {
      widthMode: 'auto',
      widthPercentage: 80,
      fixedWidth: 60,
      height: 16,
      borderRadius: 12,
    },

    bodyCell: {
      widthMode: 'auto',
      widthPercentage: 80,
      fixedWidth: 60,
      height: 16,
      borderRadius: 12,
    },

    checkboxSize: 16,
    showToolbarSkeleton: true,
    showFilterSkeleton: true,
    showSearchSkeleton: false,
    showExportSkeleton: true,
    showColumnControlSkeleton: true,
    simulateStickyState: 'auto',
    enableShimmer: true,
    shimmerDuration: 1500,
  },
} as const

/**
 * Deep merge utility for configuration objects
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: DeepPartial<T>
): T {
  const result = { ...target }

  for (const key in source) {
    const sourceValue = source[key]
    const targetValue = target[key]

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
      result[key] = deepMerge(
        targetValue as Record<string, unknown>,
        sourceValue as DeepPartial<Record<string, unknown>>
      ) as T[Extract<keyof T, string>]
    } else if (sourceValue !== undefined) {
      // Direct assignment for primitives, arrays, or when target isn't an object
      result[key] = sourceValue as T[Extract<keyof T, string>]
    }
  }

  return result
}

/**
 * Create a table configuration with overrides
 */
export function createTableConfiguration(
  overrides?: TableConfigurationOverrides
): TableConfiguration {
  if (!overrides) return { ...DEFAULT_TABLE_CONFIGURATION }
  return deepMerge({ ...DEFAULT_TABLE_CONFIGURATION }, overrides)
}

/**
 * Convert TableConfiguration to StickyDataTable props
 *
 * This is the key function that transforms the unified config
 * into the props expected by StickyDataTable.
 */
export function tableConfigToProps(config: TableConfiguration): TableConfigurationProps {
  return {
    // Dimensions
    borderRadius: config.dimensions.borderRadius,
    headerHeight: config.dimensions.headerHeight,
    rowHeight: config.dimensions.rowHeight,

    // Border config (spread format expected by StickyDataTable)
    borderConfig: {
      showOuter: config.border.showOuter,
      showRows: config.border.showRows,
      showCells: config.border.showCells,
      outerColor: config.border.outerColor,
      rowColor: config.border.rowColor,
      cellColor: config.border.cellColor,
      stickyColumnRightBorderColor: config.border.stickyColumnRightBorderColor,
      hideCellBordersForColumns: config.border.hideCellBordersForColumns,
      // Header-specific border override (body always uses outerColor)
      headerBottomColor: config.border.headerBottomColor,
    },

    // Background config
    backgroundConfig: {
      headerWrapper: config.background.headerWrapper,
      headerContainer: config.background.headerContainer,
      headerStickyCell: config.background.headerStickyCell,
      headerStickyCellWithArrows: config.background.headerStickyCellWithArrows,
      bodyContainer: config.background.bodyContainer,
      rowStickyCell: config.background.rowStickyCell,
      rowStickyCellWithArrows: config.background.rowStickyCellWithArrows,
      rowHover: config.background.rowHover,
    },

    // Toolbar layout (maps to toolbarLayout prop)
    toolbarLayout: {
      position: config.toolbar.position,
      countPosition: config.toolbar.countPosition,
      countStackPosition: config.toolbar.countStackPosition,
      toolbarBottomMargin: config.toolbar.bottomMargin,
      toolbarToCountGap: config.toolbar.countGap,
      headerGap: config.dimensions.headerGap,
      integratedToolbarHeight: config.toolbar.integratedHeight,
      integratedPadding: config.toolbar.integratedPadding,
      countPaddingLeft: config.toolbar.countPaddingLeft,
      countPaddingRight: config.toolbar.countPaddingRight,
      debug: config.toolbar.debug,
    },

    // Features
    enableSelection: config.features.enableSelection,
    showColumnControl: config.features.showColumnControl,
    showCount: config.features.showCount,

    // Skeleton configuration
    skeletonConfig: {
      enabled: config.skeleton.enabled,
      scope: config.skeleton.scope,
      initialRowCount: config.skeleton.initialRowCount,
      infiniteScrollRowCount: config.skeleton.infiniteScrollRowCount,
      headerCell: config.skeleton.headerCell,
      bodyCell: config.skeleton.bodyCell,
      checkboxSize: config.skeleton.checkboxSize,
      showToolbarSkeleton: config.skeleton.showToolbarSkeleton,
      showFilterSkeleton: config.skeleton.showFilterSkeleton,
      showSearchSkeleton: config.skeleton.showSearchSkeleton,
      showExportSkeleton: config.skeleton.showExportSkeleton,
      showColumnControlSkeleton: config.skeleton.showColumnControlSkeleton,
      simulateStickyState: config.skeleton.simulateStickyState,
      enableShimmer: config.skeleton.enableShimmer,
      shimmerDuration: config.skeleton.shimmerDuration,
    },
  }
}

/**
 * Get default table props (convenience function)
 *
 * Use this for the most common case - just spreading defaults.
 *
 * @example
 * ```tsx
 * <StickyDataTable
 *   {...getDefaultTableProps()}
 *   data={myData}
 *   columns={columns}
 * />
 * ```
 */
export function getDefaultTableProps(): TableConfigurationProps {
  return tableConfigToProps(DEFAULT_TABLE_CONFIGURATION)
}
