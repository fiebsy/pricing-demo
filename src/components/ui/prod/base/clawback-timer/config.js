"use strict";
/**
 * ClawbackTimer Configuration
 *
 * Size presets and color configuration for the clawback timer component.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SIZE = exports.DEFAULT_THRESHOLD_DAYS = exports.LABEL_CLASSES = exports.BORDER_COLORS = exports.FILL_COLORS = exports.COLOR_THRESHOLDS = exports.SIZE_CONFIGS = void 0;
// -----------------------------------------------------------------------------
// Size Presets
// -----------------------------------------------------------------------------
/** Size configuration for each preset (xs, sm, md, lg, xl) */
exports.SIZE_CONFIGS = {
    // XS - 16px container
    '16': {
        containerSize: 16,
        bodyWidth: 11,
        bodyHeight: 7,
        borderRadius: 2,
        terminalWidth: 2,
        terminalHeight: 3,
        terminalRadius: 1,
        terminalGap: 0,
        fillInset: 1,
        labelSize: 'text-[10px]',
        labelGap: 3,
    },
    // SM - 24px container
    '24': {
        containerSize: 24,
        bodyWidth: 18,
        bodyHeight: 13,
        borderRadius: 4,
        terminalWidth: 2.5,
        terminalHeight: 4,
        terminalRadius: 1.5,
        terminalGap: 0,
        fillInset: 1.5,
        labelSize: 'text-xs',
        labelGap: 4,
    },
    // MD - 32px container (default)
    '32': {
        containerSize: 32,
        bodyWidth: 23,
        bodyHeight: 14,
        borderRadius: 5,
        terminalWidth: 2.5,
        terminalHeight: 5,
        terminalRadius: 3,
        terminalGap: 0,
        fillInset: 2,
        labelSize: 'text-sm',
        labelGap: 2,
    },
    // LG - 40px container
    '40': {
        containerSize: 40,
        bodyWidth: 32,
        bodyHeight: 19,
        borderRadius: 7.5,
        terminalWidth: 4,
        terminalHeight: 8,
        terminalRadius: 2.5,
        terminalGap: 0,
        fillInset: 2,
        labelSize: 'text-sm',
        labelGap: 8,
    },
    // XL - 64px container
    '64': {
        containerSize: 64,
        bodyWidth: 48,
        bodyHeight: 26,
        borderRadius: 9.5,
        terminalWidth: 5,
        terminalHeight: 9,
        terminalRadius: 5,
        terminalGap: 0,
        fillInset: 2.5,
        labelSize: 'text-base',
        labelGap: 10,
    },
};
// -----------------------------------------------------------------------------
// Color Configuration
// -----------------------------------------------------------------------------
/** Thresholds for color state determination */
exports.COLOR_THRESHOLDS = {
    critical: 33,
    healthy: 66,
};
/** Fill colors using semantic CSS custom properties */
exports.FILL_COLORS = {
    error: 'var(--color-utility-error-500)',
    warning: 'var(--color-utility-warning-500)',
    success: 'var(--color-utility-warning-500)',
};
/** Border colors using semantic CSS custom properties */
exports.BORDER_COLORS = {
    error: 'var(--color-utility-error-300)',
    warning: 'var(--color-utility-gray-300)',
    success: 'var(--color-utility-gray-300)',
};
/** Label text color classes */
exports.LABEL_CLASSES = {
    error: 'text-error-primary',
    warning: 'text-tertiary',
    success: 'text-tertiary',
};
// -----------------------------------------------------------------------------
// Defaults
// -----------------------------------------------------------------------------
/** Default threshold in days for 100% battery charge */
exports.DEFAULT_THRESHOLD_DAYS = 15;
/** Default size preset */
exports.DEFAULT_SIZE = '32';
//# sourceMappingURL=config.js.map