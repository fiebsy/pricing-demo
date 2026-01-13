"use strict";
/**
 * StickyDataTable V2 - Style Utilities
 *
 * Functions for computing dynamic CSS classes and inline styles.
 * Centralized styling logic for consistency.
 *
 * @module utils/styles
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCellStyle = exports.getColumnAnimationClass = exports.getColumnAnimationDataAttrs = exports.getColumnAnimationState = exports.getStickyLeft = exports.getStickyColumnBorder = exports.getCellBorder = exports.getRowBorder = exports.getBodyOuterBorderStyles = exports.getBodyOuterBorders = exports.getHeaderOuterBorderStyles = exports.getHeaderOuterBorders = exports.getRowStickyBackground = exports.getHeaderStickyBackground = exports.getCellPadding = exports.getAlignmentClasses = void 0;
/**
 * Get Tailwind classes for column alignment
 */
function getAlignmentClasses(align) {
    switch (align) {
        case 'right':
            return { textAlign: 'text-right', flexJustify: 'justify-end' };
        case 'center':
            return { textAlign: 'text-center', flexJustify: 'justify-center' };
        default:
            return { textAlign: 'text-left', flexJustify: 'justify-start' };
    }
}
exports.getAlignmentClasses = getAlignmentClasses;
// ============================================================================
// PADDING
// ============================================================================
/**
 * Get cell padding classes based on position
 * First column: extra left padding
 * Last column: extra right padding
 */
function getCellPadding(isFirst, isLast) {
    if (isFirst)
        return 'pl-6 pr-4';
    if (isLast)
        return 'pl-4 pr-6';
    return 'px-4';
}
exports.getCellPadding = getCellPadding;
// ============================================================================
// BACKGROUNDS
// ============================================================================
/**
 * Get background class for header sticky cell
 */
function getHeaderStickyBackground(config, stickyState, isSticky) {
    if (!isSticky)
        return '';
    return stickyState.useEnhancedStyling
        ? config.headerStickyCellWithArrows
        : config.headerStickyCell;
}
exports.getHeaderStickyBackground = getHeaderStickyBackground;
/**
 * Get background class for row sticky cell
 */
function getRowStickyBackground(config, stickyState, isSticky) {
    if (!isSticky)
        return '';
    return stickyState.useEnhancedStyling
        ? config.rowStickyCellWithArrows
        : config.rowStickyCell;
}
exports.getRowStickyBackground = getRowStickyBackground;
// ============================================================================
// BORDERS
// ============================================================================
/**
 * Check if a specific border side should be shown
 */
function shouldShowSide(config, side) {
    if (!config.showOuter)
        return false;
    const showMap = {
        left: config.showLeft,
        right: config.showRight,
        top: config.showTop,
        bottom: config.showBottom,
    };
    return showMap[side] ?? config.showOuter;
}
/**
 * Map semantic border token to CSS variable
 * e.g., 'border-primary' -> 'var(--border-color-primary)'
 */
function borderTokenToCssVar(token) {
    // Handle tokens like 'border-primary', 'border-secondary', 'border-tertiary/20'
    const match = token.match(/^border-(.+)$/);
    if (!match || !match[1])
        return token;
    const colorPart = match[1];
    // Handle opacity variants like 'tertiary/20'
    if (colorPart.includes('/')) {
        const [color, opacity] = colorPart.split('/');
        if (color && opacity) {
            return `color-mix(in srgb, var(--border-color-${color}) ${opacity}%, transparent)`;
        }
    }
    return `var(--border-color-${colorPart})`;
}
/**
 * Get outer border classes for header
 * Uses outerColor for all borders except bottom which may have headerBottomColor override.
 * When headerBottomColor is set, bottom border width is added but color comes from inline style.
 */
function getHeaderOuterBorders(config) {
    const classes = [];
    const hasHeaderBottomColor = !!config.headerBottomColor;
    if (shouldShowSide(config, 'top')) {
        classes.push(`border-t ${config.outerColor}`);
    }
    if (shouldShowSide(config, 'left')) {
        classes.push(`border-l ${config.outerColor}`);
    }
    if (shouldShowSide(config, 'right')) {
        classes.push(`border-r ${config.outerColor}`);
    }
    if (shouldShowSide(config, 'bottom')) {
        // If headerBottomColor is set, add width class only (color via inline style)
        classes.push(hasHeaderBottomColor ? 'border-b' : `border-b ${config.outerColor}`);
    }
    return classes.join(' ');
}
exports.getHeaderOuterBorders = getHeaderOuterBorders;
/**
 * Get inline styles for header outer borders
 * Only applies headerBottomColor when set - all other sides use Tailwind classes.
 */
function getHeaderOuterBorderStyles(config) {
    if (!config.headerBottomColor) {
        return {};
    }
    // Only override bottom border color for header
    return {
        borderBottomColor: borderTokenToCssVar(config.headerBottomColor),
    };
}
exports.getHeaderOuterBorderStyles = getHeaderOuterBorderStyles;
/**
 * Get outer border classes for body
 * Body always uses outerColor for all sides (no headerBottomColor here)
 */
function getBodyOuterBorders(config) {
    const classes = [];
    if (shouldShowSide(config, 'left')) {
        classes.push(`border-l ${config.outerColor}`);
    }
    if (shouldShowSide(config, 'right')) {
        classes.push(`border-r ${config.outerColor}`);
    }
    if (shouldShowSide(config, 'bottom')) {
        classes.push(`border-b ${config.outerColor}`);
    }
    return classes.join(' ');
}
exports.getBodyOuterBorders = getBodyOuterBorders;
/**
 * Get inline styles for body outer borders
 * Body always uses Tailwind classes with outerColor, no inline overrides needed.
 */
function getBodyOuterBorderStyles(_config) {
    // Body always uses outerColor via Tailwind classes - no inline styles needed
    return {};
}
exports.getBodyOuterBorderStyles = getBodyOuterBorderStyles;
/**
 * Get row border class (between rows)
 */
function getRowBorder(config) {
    if (!config.showRows)
        return '';
    return `border-b ${config.rowColor}`;
}
exports.getRowBorder = getRowBorder;
/**
 * Get cell border class (between columns)
 */
function getCellBorder(config, isLast, columnKey) {
    if (!config.showCells || isLast)
        return '';
    if (columnKey && config.hideCellBordersForColumns?.includes(columnKey)) {
        return 'border-r border-transparent';
    }
    return `border-r ${config.cellColor}`;
}
exports.getCellBorder = getCellBorder;
/**
 * Get sticky column right border when enhanced styling is active
 */
function getStickyColumnBorder(column, stickyState, config) {
    if (!column.isSticky || !column.isLastSticky || !stickyState.useEnhancedStyling) {
        return '';
    }
    // If only one sticky column, always show border
    // If multiple, only show on last (not first)
    const isOnlySticky = column.isFirstSticky && column.isLastSticky;
    if (!isOnlySticky && column.isFirstSticky) {
        return '';
    }
    const color = config.stickyColumnRightBorderColor ?? 'border-primary';
    return `border-r ${color}`;
}
exports.getStickyColumnBorder = getStickyColumnBorder;
// ============================================================================
// STICKY POSITIONING
// ============================================================================
/**
 * Get CSS left value for sticky positioning
 */
function getStickyLeft(stickyLeft) {
    if (stickyLeft === undefined)
        return undefined;
    return `${stickyLeft}px`;
}
exports.getStickyLeft = getStickyLeft;
/**
 * Get animation state for a column
 * Used with data attributes for Tailwind v4 integration
 */
function getColumnAnimationState(columnKey, leavingKeys, enteringKeys) {
    if (leavingKeys.has(columnKey)) {
        return 'leaving';
    }
    if (enteringKeys.has(columnKey)) {
        return 'entering';
    }
    return 'idle';
}
exports.getColumnAnimationState = getColumnAnimationState;
/**
 * Get data attributes for column animation
 * Returns an object to spread onto the element
 *
 * @example
 * <div {...getColumnAnimationDataAttrs(key, leaving, entering)} />
 */
function getColumnAnimationDataAttrs(columnKey, leavingKeys, enteringKeys) {
    const state = getColumnAnimationState(columnKey, leavingKeys, enteringKeys);
    return {
        'data-column-key': columnKey,
        'data-column-leaving': state === 'leaving' ? '' : undefined,
        'data-column-entering': state === 'entering' ? '' : undefined,
    };
}
exports.getColumnAnimationDataAttrs = getColumnAnimationDataAttrs;
/**
 * Get animation class for column transitions
 * Provides backwards compatibility with legacy class names
 */
function getColumnAnimationClass(columnKey, leavingKeys, columnChange, enteringKeys) {
    // Column is animating out
    if (leavingKeys.has(columnKey)) {
        return 'animate-column-remove';
    }
    // Column is animating in (new: check enteringKeys first)
    if (enteringKeys?.has(columnKey)) {
        return 'animate-column-add';
    }
    // Legacy: Column was just added (fallback for backwards compatibility)
    if (columnChange?.columnKey === columnKey && columnChange.action === 'added') {
        return 'animate-column-add';
    }
    // Legacy: Reset (multiple columns added)
    if (columnChange?.columnKey === 'reset' && columnChange.action === 'added') {
        return 'animate-column-add';
    }
    return '';
}
exports.getColumnAnimationClass = getColumnAnimationClass;
// ============================================================================
// CELL STYLES
// ============================================================================
/**
 * Generate complete cell style object
 */
function getCellStyle(column, stickyState) {
    const minWidth = column.minWidth ?? column.width;
    return {
        position: column.isSticky ? 'sticky' : 'relative',
        left: column.isSticky ? getStickyLeft(column.computedStickyLeft) : undefined,
        height: '100%',
        boxSizing: 'border-box',
        zIndex: column.isSticky ? 10 : 1,
        minWidth: `${minWidth}px`,
        ...(column.maxWidth ? { maxWidth: `${column.maxWidth}px` } : {}),
        ...(column.isSticky && stickyState.useEnhancedStyling ? { borderOpacity: 0 } : {}),
    };
}
exports.getCellStyle = getCellStyle;
//# sourceMappingURL=styles.js.map