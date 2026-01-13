"use strict";
/**
 * FilterSelectChip - Configuration
 *
 * Default configuration and size mappings for the biaxial filter chip.
 *
 * @module prod/base/filter/filter-select-chip/config
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFSCCSSVariables = exports.FSC_CSS_VARS = exports.getChipSizeConfig = exports.mergeConfig = exports.DEFAULT_CONFIG = exports.CHIP_ROUNDED_CLASSES = exports.CHIP_SIZE_CONFIGS = exports.EASING_EXPO_OUT = void 0;
const config_1 = require("../filter-chip/config");
Object.defineProperty(exports, "EASING_EXPO_OUT", { enumerable: true, get: function () { return config_1.EASING_EXPO_OUT; } });
const config_2 = require("../../menu/config");
exports.CHIP_SIZE_CONFIGS = {
    xs: { height: 24, paddingX: 8, textClass: 'text-xs', iconSize: 12, closeSize: 12 },
    sm: { height: 28, paddingX: 10, textClass: 'text-xs', iconSize: 14, closeSize: 14 },
    md: { height: 32, paddingX: 12, textClass: 'text-sm', iconSize: 16, closeSize: 16 },
    lg: { height: 36, paddingX: 14, textClass: 'text-sm', iconSize: 18, closeSize: 18 },
};
exports.CHIP_ROUNDED_CLASSES = {
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
};
// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================
/**
 * Default configuration for FilterSelectChip
 *
 * These values are the production-hardened presets.
 * Override via the `config` prop for custom behavior.
 */
exports.DEFAULT_CONFIG = {
    // Chip Configuration (entry animation)
    chipSize: 'md',
    chipRounded: 'full',
    iconSize: 14,
    chipDuration: 200,
    revealMode: 'fade',
    chipExpandAnimation: true,
    iconOpacity: 0.5,
    iconValueGap: 4,
    paddingLeft: 8,
    paddingRight: 6,
    // Menu Animation (biaxial expansion)
    menuDuration: 225,
    menuCollapseDuration: 125,
    contentFadeDuration: 75,
    contentFadeDelay: 0,
    // Menu Layout
    minPanelWidth: 200,
    maxPanelHeight: 300,
    innerPadding: 4,
    itemHeight: 32,
    itemTextSize: 'sm',
    itemGap: 2,
    borderRadius: 16,
    contentTopOffset: 0,
    topExtension: 0,
    showHeaderSeparator: false,
    squircleOnOpen: false,
    itemSquircle: true,
    shadowOnExpandOnly: false,
    menuAnchor: 'left',
    // Appearance (uses menu styling system)
    appearance: {
        ...config_2.DEFAULT_APPEARANCE,
    },
};
// ============================================================================
// HELPERS
// ============================================================================
function mergeConfig(config) {
    if (!config)
        return exports.DEFAULT_CONFIG;
    const mergedAppearance = {
        ...exports.DEFAULT_CONFIG.appearance,
        ...config.appearance,
    };
    // Auto-sync itemSquircle with appearance.squircle if not explicitly set
    const itemSquircle = config.itemSquircle !== undefined
        ? config.itemSquircle
        : mergedAppearance.squircle ?? exports.DEFAULT_CONFIG.itemSquircle;
    return {
        ...exports.DEFAULT_CONFIG,
        ...config,
        itemSquircle,
        appearance: mergedAppearance,
    };
}
exports.mergeConfig = mergeConfig;
function getChipSizeConfig(size) {
    return exports.CHIP_SIZE_CONFIGS[size];
}
exports.getChipSizeConfig = getChipSizeConfig;
// ============================================================================
// CSS VARIABLE HELPERS (S-tier animation system)
// ============================================================================
/**
 * CSS variable names for filter-select-chip-transitions.css
 */
exports.FSC_CSS_VARS = {
    chipWidth: '--fsc-chip-width',
    panelWidth: '--fsc-panel-width',
    panelHeight: '--fsc-panel-height',
    chipHeight: '--fsc-chip-height',
    topExtension: '--fsc-top-extension',
    duration: '--fsc-duration',
    collapseDuration: '--fsc-collapse-duration',
    easing: '--fsc-easing',
    contentFadeDuration: '--fsc-content-fade-duration',
    contentFadeDelay: '--fsc-content-fade-delay',
    borderRadius: '--fsc-border-radius',
};
/**
 * Generate CSS custom properties for the filter-select-chip container.
 * These drive the CSS-based animations in filter-select-chip-transitions.css.
 */
function getFSCCSSVariables(config, measurements) {
    return {
        [exports.FSC_CSS_VARS.chipWidth]: `${measurements.chipWidth}px`,
        [exports.FSC_CSS_VARS.panelWidth]: `${config.minPanelWidth}px`,
        [exports.FSC_CSS_VARS.panelHeight]: `${measurements.panelHeight}px`,
        [exports.FSC_CSS_VARS.chipHeight]: `${measurements.chipHeight}px`,
        [exports.FSC_CSS_VARS.topExtension]: `${config.topExtension}px`,
        [exports.FSC_CSS_VARS.duration]: `${config.menuDuration}ms`,
        [exports.FSC_CSS_VARS.collapseDuration]: `${config.menuCollapseDuration}ms`,
        [exports.FSC_CSS_VARS.easing]: config_1.EASING_EXPO_OUT,
        [exports.FSC_CSS_VARS.contentFadeDuration]: `${config.contentFadeDuration}ms`,
        [exports.FSC_CSS_VARS.contentFadeDelay]: `${config.contentFadeDelay}ms`,
        [exports.FSC_CSS_VARS.borderRadius]: `${config.borderRadius}px`,
    };
}
exports.getFSCCSSVariables = getFSCCSSVariables;
//# sourceMappingURL=config.js.map