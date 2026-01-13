"use strict";
/**
 * Accordion - Configuration
 *
 * Size presets and style tokens for the base accordion.
 * For animated line configuration, see features/animated-line/config.ts
 *
 * @module prod/base/accordion
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAnimationDuration = exports.styles = exports.sizePresets = void 0;
// ============================================================================
// SIZE PRESETS
// ============================================================================
/**
 * Size presets for consistent accordion styling.
 *
 * - compact: Dense sidebars with many items (glossary, settings)
 * - default: Standard navigation menus (main nav, playground)
 * - comfortable: Spacious layouts with fewer items (features, marketing)
 */
exports.sizePresets = {
    compact: {
        triggerHeight: 28,
        triggerFontSize: 13,
        itemHeight: 26,
        itemGap: 2,
        iconSize: 16,
    },
    default: {
        triggerHeight: 32,
        triggerFontSize: 14,
        itemHeight: 32,
        itemGap: 4,
        iconSize: 18,
    },
    comfortable: {
        triggerHeight: 40,
        triggerFontSize: 15,
        itemHeight: 40,
        itemGap: 6,
        iconSize: 20,
    },
};
// ============================================================================
// STYLE TOKENS
// ============================================================================
/**
 * Common styles for accordion elements
 */
exports.styles = {
    trigger: {
        base: [
            'group flex items-center gap-2',
            'cursor-pointer',
            'transition-colors duration-100 ease-linear',
            'hover:bg-secondary_hover',
            'motion-reduce:transition-none',
        ].join(' '),
    },
    item: {
        base: [
            'relative block cursor-pointer',
            'text-sm text-secondary',
            'rounded-md',
            'transition-colors duration-100',
            'hover:bg-secondary_hover',
            'motion-reduce:transition-none',
        ].join(' '),
    },
    content: {
        base: 'overflow-hidden',
    },
    chevron: {
        base: ['transition-transform', 'motion-reduce:transition-none'].join(' '),
        expanded: 'rotate-0',
        collapsed: '-rotate-90',
    },
};
// ============================================================================
// ANIMATION DEFAULTS
// ============================================================================
/**
 * Default animation timings for the base accordion
 */
exports.defaultAnimationDuration = {
    accordion: 200,
    chevron: 100,
};
//# sourceMappingURL=config.js.map