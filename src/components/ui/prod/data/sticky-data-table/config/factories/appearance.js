"use strict";
/**
 * StickyDataTable - Appearance Factories
 *
 * Factory functions for creating border, background, and sticky state configs.
 *
 * @module config/factories/appearance
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInitialStickyState = exports.createStickyState = exports.createBackgroundConfig = exports.createBorderConfig = void 0;
const constants_1 = require("../constants");
// ============================================================================
// BORDER CONFIG FACTORY
// ============================================================================
/**
 * Create merged border config with defaults
 */
function createBorderConfig(overrides) {
    return {
        ...constants_1.DEFAULT_BORDER_CONFIG,
        ...overrides,
        hideCellBordersForColumns: overrides?.hideCellBordersForColumns ?? constants_1.DEFAULT_BORDER_CONFIG.hideCellBordersForColumns,
    };
}
exports.createBorderConfig = createBorderConfig;
// ============================================================================
// BACKGROUND CONFIG FACTORY
// ============================================================================
/**
 * Create merged background config with defaults
 */
function createBackgroundConfig(overrides) {
    return {
        ...constants_1.DEFAULT_BACKGROUND_CONFIG,
        ...overrides,
    };
}
exports.createBackgroundConfig = createBackgroundConfig;
// ============================================================================
// STICKY STATE FACTORIES
// ============================================================================
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
//# sourceMappingURL=appearance.js.map