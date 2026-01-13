"use strict";
/**
 * StickyDataTable - Dimension Constants
 *
 * Core dimension values used throughout the table component.
 * All values are in pixels unless otherwise noted.
 *
 * @module config/constants/dimensions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANIMATION_CONFIG = exports.ARROW_CONFIG = exports.CELL_CONFIG = exports.TABLE_CONFIG = void 0;
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
//# sourceMappingURL=dimensions.js.map