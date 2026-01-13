"use strict";
/**
 * Expanding Search - Configuration & Constants
 *
 * @module base-ui/accordion/expanding-search/config
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PROPS = exports.OPACITY_FADE_RATIO = exports.EASING = void 0;
// ============================================================================
// Animation
// ============================================================================
/** Expo ease-out - smooth, premium feel */
exports.EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
/** Opacity fade speed as ratio of total duration (0.2 = 20% = fast fade in) */
exports.OPACITY_FADE_RATIO = 0.2;
// ============================================================================
// Defaults
// ============================================================================
exports.DEFAULT_PROPS = {
    placeholder: 'Search...',
    defaultExpanded: false,
    collapsedWidth: 40,
    expandedWidth: 240,
    height: 40,
    duration: 300,
    autoFocus: true,
    collapseOnBlur: true,
};
//# sourceMappingURL=config.js.map