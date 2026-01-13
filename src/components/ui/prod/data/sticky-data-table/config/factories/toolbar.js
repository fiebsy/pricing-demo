"use strict";
/**
 * StickyDataTable - Toolbar Factories
 *
 * Factory functions for creating toolbar configurations.
 *
 * @module config/factories/toolbar
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.inferToolbarConfigFromProps = exports.createToolbarConfig = exports.createToolbarLayoutConfig = void 0;
const constants_1 = require("../constants");
// ============================================================================
// TOOLBAR LAYOUT FACTORY
// ============================================================================
/**
 * Create toolbar layout configuration with defaults
 * Note: leftCount and rightCount are runtime values, not returned in defaults
 */
function createToolbarLayoutConfig(overrides) {
    return {
        ...constants_1.DEFAULT_TOOLBAR_LAYOUT,
        ...overrides,
        integratedPadding: {
            ...constants_1.DEFAULT_TOOLBAR_LAYOUT.integratedPadding,
            ...overrides?.integratedPadding,
        },
    };
}
exports.createToolbarLayoutConfig = createToolbarLayoutConfig;
// ============================================================================
// TOOLBAR CONFIG FACTORY
// ============================================================================
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
// ============================================================================
// INFERENCE UTILITY
// ============================================================================
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
//# sourceMappingURL=toolbar.js.map