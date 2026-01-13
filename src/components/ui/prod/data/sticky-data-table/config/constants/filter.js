"use strict";
/**
 * StickyDataTable - Filter Constants
 *
 * Default filter menu, trigger, and pill configurations.
 * Based on JAN2 production preset.
 *
 * @module config/constants/filter
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FILTER_CONFIG = exports.DEFAULT_FILTER_PILL = exports.DEFAULT_FILTER_TRIGGER = exports.DEFAULT_FILTER_MENU = void 0;
/**
 * Default filter menu configuration (JAN2)
 *
 * Only specifies width - appearance and animation inherit from Menu's defaults.
 * This ensures FilterToolbar stays in sync with any updates to the core Menu component.
 */
exports.DEFAULT_FILTER_MENU = {
    width: 240,
};
/**
 * Default filter trigger configuration (JAN2)
 */
exports.DEFAULT_FILTER_TRIGGER = {
    height: 40,
    shine: '0',
    shineIntensity: 'intense',
    background: 'primary',
    backgroundHover: 'tertiary',
    border: false,
    rounded: 'full',
    paddingX: 12,
    textColor: 'secondary',
    textColorHover: 'primary',
    fontWeight: 'semibold',
    iconSize: 20,
    iconStrokeWidth: 1.5,
    iconColor: 'quaternary',
};
/**
 * Default filter pill configuration (JAN2)
 */
exports.DEFAULT_FILTER_PILL = {
    shine: '1',
    shineIntensity: 'subtle',
    background: 'secondary',
    border: false,
    size: 'sm',
    rounded: 'full',
    paddingLeft: 8,
    paddingRight: 4,
    iconValueGap: 4,
    itemGap: 10,
    iconSize: 14,
    closeIconSize: 16,
    leftIconOpacity: 55,
    duration: 150,
};
/**
 * Default combined filter configuration (JAN2)
 * Production-ready settings that work out of the box
 */
exports.DEFAULT_FILTER_CONFIG = {
    menu: exports.DEFAULT_FILTER_MENU,
    trigger: exports.DEFAULT_FILTER_TRIGGER,
    pill: exports.DEFAULT_FILTER_PILL,
};
//# sourceMappingURL=filter.js.map