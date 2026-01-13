"use strict";
/**
 * StickyDataTable V2 - Configuration
 *
 * Centralized configuration constants and factory functions.
 * Provides sensible defaults with full customization support.
 *
 * @module config
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultTableProps = exports.tableConfigToProps = exports.createTableConfiguration = exports.deepMerge = exports.DEFAULT_TABLE_CONFIGURATION = exports.createInitialStickyState = exports.createStickyState = exports.createBackgroundConfig = exports.createBorderConfig = exports.DEFAULT_BACKGROUND_CONFIG = exports.DEFAULT_BORDER_CONFIG = exports.ANIMATION_CONFIG = exports.ARROW_CONFIG = exports.inferToolbarConfigFromProps = exports.createSkeletonDimensionConfig = exports.createToolbarConfig = exports.createToolbarLayoutConfig = exports.calculateSkeletonHeight = exports.calculateToolbarHeight = exports.calculateIntegratedHeaderGap = exports.DEFAULT_TOOLBAR_LAYOUT = exports.CELL_CONFIG = exports.TABLE_CONFIG = void 0;
// ============================================================================
// TABLE DIMENSIONS
// ============================================================================
exports.TABLE_CONFIG = {
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
};
// ============================================================================
// CELL CONFIGURATION
// ============================================================================
/**
 * Cell-level styling constants
 * Centralized values for consistent cell rendering
 */
exports.CELL_CONFIG = {
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
};
/**
 * Default toolbar layout configuration
 * Note: leftCount and rightCount are intentionally omitted - they're runtime values
 */
exports.DEFAULT_TOOLBAR_LAYOUT = {
    position: 'above',
    countPosition: 'left',
    countStackPosition: 'below',
    toolbarToCountGap: 6,
    toolbarBottomMargin: exports.TABLE_CONFIG.TOOLBAR_MARGIN,
    headerGap: exports.TABLE_CONFIG.HEADER_GAP,
    integratedPadding: {
        top: exports.TABLE_CONFIG.INTEGRATED_TOOLBAR_TOP_PADDING,
        bottom: exports.TABLE_CONFIG.INTEGRATED_TOOLBAR_TO_HEADER_GAP,
        left: 0,
        right: 0,
    },
    integratedToolbarHeight: exports.TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT,
    countPaddingLeft: 0,
    countPaddingRight: 0,
    debug: false,
};
/**
 * Calculate the total header gap when toolbar is integrated
 * This is the distance from the top of the viewport to the table header row
 *
 * Structure when integrated:
 * [top padding] + [toolbar height] + [gap to header] = total sticky area above header
 */
function calculateIntegratedHeaderGap(toolbarHeight = exports.TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT, topPadding = exports.TABLE_CONFIG.INTEGRATED_TOOLBAR_TOP_PADDING, toHeaderGap = exports.TABLE_CONFIG.INTEGRATED_TOOLBAR_TO_HEADER_GAP) {
    return topPadding + toolbarHeight + toHeaderGap;
}
exports.calculateIntegratedHeaderGap = calculateIntegratedHeaderGap;
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
function calculateToolbarHeight(config, layout) {
    if (!config.showToolbar)
        return 0;
    const effectiveLayout = layout ?? config.layout;
    // Check if toolbar is integrated into sticky header
    const isIntegrated = effectiveLayout?.position === 'integrated';
    if (isIntegrated) {
        // Integrated toolbar: renders inside sticky header wrapper
        // Height = top padding + toolbar height + bottom padding (gap to header)
        const topPadding = effectiveLayout?.integratedPadding?.top ?? 0;
        const bottomPadding = effectiveLayout?.integratedPadding?.bottom ?? 8;
        const toolbarHeight = effectiveLayout?.integratedToolbarHeight ?? exports.TABLE_CONFIG.INTEGRATED_TOOLBAR_HEIGHT;
        return topPadding + toolbarHeight + bottomPadding;
    }
    // 'Above' position: toolbar renders above table with margin
    let height = exports.TABLE_CONFIG.TOOLBAR_HEIGHT;
    // Use configured margin or fall back to default
    const margin = effectiveLayout?.toolbarBottomMargin ?? exports.TABLE_CONFIG.TOOLBAR_MARGIN;
    // Count display adds height (in normal document flow)
    // Note: For 'below' stack position, count is below toolbar row
    if (config.showCount && effectiveLayout?.countStackPosition !== 'inline') {
        height += (effectiveLayout?.toolbarToCountGap ?? 6) + exports.TABLE_CONFIG.COUNT_DISPLAY_MARGIN;
    }
    return height + margin;
}
exports.calculateToolbarHeight = calculateToolbarHeight;
/**
 * Calculate total skeleton height for perfect layout sync
 *
 * @param config - Skeleton dimension configuration
 * @param rowCount - Number of skeleton rows to display
 * @param toolbarLayout - Optional toolbar layout for accurate toolbar height calculation
 * @returns Total height in pixels
 */
function calculateSkeletonHeight(config, rowCount, toolbarLayout) {
    // Pass toolbarLayout for accurate margin/padding calculation
    const toolbarHeight = calculateToolbarHeight(config.toolbar, toolbarLayout);
    const headerHeight = config.headerHeight ?? exports.TABLE_CONFIG.HEADER_HEIGHT;
    const rowHeight = config.rowHeight ?? exports.TABLE_CONFIG.ROW_HEIGHT;
    const bodyHeight = rowCount * rowHeight;
    // For integrated toolbar, the toolbar height is part of the sticky header area
    // so we don't add it to document flow height
    const isIntegrated = toolbarLayout?.position === 'integrated';
    const effectiveToolbarHeight = isIntegrated ? 0 : toolbarHeight;
    // Note: Header gap is NOT included because it's handled by sticky positioning
    // (top: HEADER_GAP) rather than document flow
    return effectiveToolbarHeight + headerHeight + bodyHeight;
}
exports.calculateSkeletonHeight = calculateSkeletonHeight;
/**
 * Create toolbar layout configuration with defaults
 * Note: leftCount and rightCount are runtime values, not returned in defaults
 */
function createToolbarLayoutConfig(overrides) {
    return {
        ...exports.DEFAULT_TOOLBAR_LAYOUT,
        ...overrides,
        integratedPadding: {
            ...exports.DEFAULT_TOOLBAR_LAYOUT.integratedPadding,
            ...overrides?.integratedPadding,
        },
    };
}
exports.createToolbarLayoutConfig = createToolbarLayoutConfig;
/**
 * Create default toolbar configuration
 */
function createToolbarConfig(overrides) {
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
    };
}
exports.createToolbarConfig = createToolbarConfig;
/**
 * Create skeleton dimension configuration
 */
function createSkeletonDimensionConfig(overrides) {
    return {
        toolbar: createToolbarConfig(overrides?.toolbar),
        rowHeight: overrides?.rowHeight ?? exports.TABLE_CONFIG.ROW_HEIGHT,
        headerHeight: overrides?.headerHeight ?? exports.TABLE_CONFIG.HEADER_HEIGHT,
        headerGap: overrides?.headerGap ?? exports.TABLE_CONFIG.HEADER_GAP,
        borderRadius: overrides?.borderRadius ?? exports.TABLE_CONFIG.DEFAULT_BORDER_RADIUS,
    };
}
exports.createSkeletonDimensionConfig = createSkeletonDimensionConfig;
/**
 * Infer toolbar configuration from StickyDataTable props
 * Useful for creating matching skeleton configuration
 */
function inferToolbarConfigFromProps(props) {
    const showExportButton = !!(props.exportAll || props.exportSelected || props.exportToolbar);
    const showToolbar = !!(props.leftToolbar ||
        props.rightToolbar ||
        showExportButton ||
        props.showColumnControl ||
        props.showCount);
    return {
        showToolbar,
        showLeftToolbar: !!props.leftToolbar,
        showRightToolbar: !!props.rightToolbar,
        showExportButton,
        showColumnControl: props.showColumnControl ?? true,
        showCount: props.showCount ?? false,
        activeFilterCount: 0, // Can't infer from props alone
    };
}
exports.inferToolbarConfigFromProps = inferToolbarConfigFromProps;
// ============================================================================
// ARROW POSITIONING
// ============================================================================
exports.ARROW_CONFIG = {
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
};
// ============================================================================
// ANIMATION TIMING
// ============================================================================
exports.ANIMATION_CONFIG = {
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
};
// ============================================================================
// DEFAULT CONFIGURATIONS
// ============================================================================
/**
 * Default border configuration
 * Uses semantic design tokens
 */
exports.DEFAULT_BORDER_CONFIG = {
    outerColor: 'border-primary',
    rowColor: 'border-tertiary',
    cellColor: 'border-tertiary/20',
    showOuter: true,
    showRows: true,
    showCells: true,
    stickyColumnRightBorderColor: 'border-secondary',
};
/**
 * Default background configuration
 * Uses semantic design tokens for theming support
 */
exports.DEFAULT_BACKGROUND_CONFIG = {
    headerWrapper: 'bg-secondary_alt',
    headerContainer: 'bg-secondary_p1',
    headerStickyCell: 'bg-secondary_p1',
    headerStickyCellWithArrows: 'bg-secondary_t1_95',
    bodyContainer: 'bg-primary',
    rowStickyCell: 'bg-primary_transparent',
    rowStickyCellWithArrows: 'bg-secondary_t1_95',
    rowHover: 'bg-secondary',
};
// ============================================================================
// FACTORY FUNCTIONS
// ============================================================================
/**
 * Create merged border config with defaults
 */
function createBorderConfig(overrides) {
    return {
        ...exports.DEFAULT_BORDER_CONFIG,
        ...overrides,
        hideCellBordersForColumns: overrides?.hideCellBordersForColumns ?? [],
    };
}
exports.createBorderConfig = createBorderConfig;
/**
 * Create merged background config with defaults
 */
function createBackgroundConfig(overrides) {
    return {
        ...exports.DEFAULT_BACKGROUND_CONFIG,
        ...overrides,
    };
}
exports.createBackgroundConfig = createBackgroundConfig;
/**
 * Create StickyState from scroll state
 */
function createStickyState(canScrollLeft, canScrollRight) {
    const hasArrows = canScrollLeft || canScrollRight;
    return {
        showLeftArrow: canScrollLeft,
        showRightArrow: canScrollRight,
        hasArrows,
        useEnhancedStyling: hasArrows,
    };
}
exports.createStickyState = createStickyState;
/**
 * Create initial sticky state (no scrolling)
 */
function createInitialStickyState() {
    return {
        showLeftArrow: false,
        showRightArrow: false,
        hasArrows: false,
        useEnhancedStyling: false,
    };
}
exports.createInitialStickyState = createInitialStickyState;
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
exports.DEFAULT_TABLE_CONFIGURATION = {
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
};
/**
 * Deep merge utility for configuration objects
 */
function deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
        const sourceValue = source[key];
        const targetValue = target[key];
        if (sourceValue !== undefined &&
            typeof sourceValue === 'object' &&
            sourceValue !== null &&
            !Array.isArray(sourceValue) &&
            typeof targetValue === 'object' &&
            targetValue !== null &&
            !Array.isArray(targetValue)) {
            // Recursively merge nested objects
            result[key] = deepMerge(targetValue, sourceValue);
        }
        else if (sourceValue !== undefined) {
            // Direct assignment for primitives, arrays, or when target isn't an object
            result[key] = sourceValue;
        }
    }
    return result;
}
exports.deepMerge = deepMerge;
/**
 * Create a table configuration with overrides
 */
function createTableConfiguration(overrides) {
    if (!overrides)
        return { ...exports.DEFAULT_TABLE_CONFIGURATION };
    return deepMerge({ ...exports.DEFAULT_TABLE_CONFIGURATION }, overrides);
}
exports.createTableConfiguration = createTableConfiguration;
/**
 * Convert TableConfiguration to StickyDataTable props
 *
 * This is the key function that transforms the unified config
 * into the props expected by StickyDataTable.
 */
function tableConfigToProps(config) {
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
    };
}
exports.tableConfigToProps = tableConfigToProps;
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
function getDefaultTableProps() {
    return tableConfigToProps(exports.DEFAULT_TABLE_CONFIGURATION);
}
exports.getDefaultTableProps = getDefaultTableProps;
//# sourceMappingURL=config.js.map