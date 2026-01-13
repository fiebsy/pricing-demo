"use strict";
/**
 * StickyDataTable - Filter Factories
 *
 * Factory functions for creating filter configurations.
 *
 * @module config/factories/filter
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeFilterConfig = exports.createFilterConfig = exports.toMenuAppearanceConfig = void 0;
const constants_1 = require("../constants");
// ============================================================================
// MENU APPEARANCE CONVERTER
// ============================================================================
/**
 * Convert FilterMenuConfig to PROD MenuAppearance
 * Used internally by FilterToolbar
 *
 * Only includes properties that are explicitly set in the config.
 * Returns undefined if no appearance overrides are specified,
 * allowing Menu to use its DEFAULT_APPEARANCE.
 */
function toMenuAppearanceConfig(config) {
    const appearance = {};
    let hasOverrides = false;
    if (config.borderRadius !== undefined) {
        appearance.borderRadius = config.borderRadius;
        hasOverrides = true;
    }
    if (config.shadow !== undefined) {
        appearance.shadow = config.shadow;
        hasOverrides = true;
    }
    if (config.shine !== undefined) {
        appearance.shine = config.shine;
        hasOverrides = true;
    }
    if (config.squircle !== undefined) {
        appearance.squircle = config.squircle;
        hasOverrides = true;
    }
    if (config.background !== undefined) {
        appearance.background = config.background;
        hasOverrides = true;
    }
    if (config.gradient !== undefined) {
        appearance.gradient = config.gradient;
        hasOverrides = true;
    }
    if (config.gradientColor !== undefined) {
        appearance.gradientColor = config.gradientColor;
        hasOverrides = true;
    }
    return hasOverrides ? appearance : undefined;
}
exports.toMenuAppearanceConfig = toMenuAppearanceConfig;
// ============================================================================
// FILTER CONFIG FACTORY
// ============================================================================
/**
 * Create filter config with partial overrides
 */
function createFilterConfig(overrides) {
    return {
        menu: { ...constants_1.DEFAULT_FILTER_MENU, ...overrides?.menu },
        trigger: { ...constants_1.DEFAULT_FILTER_TRIGGER, ...overrides?.trigger },
        pill: { ...constants_1.DEFAULT_FILTER_PILL, ...overrides?.pill },
    };
}
exports.createFilterConfig = createFilterConfig;
/**
 * Merge filter config with defaults
 * Deep merges each section independently
 */
function mergeFilterConfig(base, overrides) {
    if (!overrides)
        return base;
    return {
        menu: { ...base.menu, ...overrides.menu },
        trigger: { ...base.trigger, ...overrides.trigger },
        pill: { ...base.pill, ...overrides.pill },
    };
}
exports.mergeFilterConfig = mergeFilterConfig;
//# sourceMappingURL=filter.js.map