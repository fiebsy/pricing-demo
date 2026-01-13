"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = exports.arrowStyles = exports.descriptionStyles = exports.titleStyles = exports.paddingStyles = exports.popupStyles = void 0;
/**
 * Base styles for the tooltip popup container.
 * Animation is handled by tooltip-transitions.css using keyframes.
 */
exports.popupStyles = [
    // CSS class for keyframe animations (see tooltip-transitions.css)
    'tooltip-popup',
    // Layout
    'flex max-w-xs flex-col items-start gap-1',
    // Colors
    'bg-primary-solid',
    // Shape
    'rounded-xl corner-squircle',
    // Effects
    'shine-1-shadow-lg',
].join(' ');
/**
 * Padding styles based on whether description is present.
 */
exports.paddingStyles = {
    titleOnly: 'px-3 py-2',
    withDescription: 'px-3 py-3',
};
/**
 * Title text styles.
 */
exports.titleStyles = 'text-xs font-semibold text-white';
/**
 * Description text styles.
 */
exports.descriptionStyles = 'text-xs font-medium text-tooltip-supporting-text';
/**
 * Arrow styles - rotated based on side.
 */
exports.arrowStyles = 'size-2.5 fill-bg-primary-solid';
/**
 * Default configuration values.
 */
exports.defaults = {
    delay: 150,
    closeDelay: 0,
    sideOffset: 6,
    side: 'top',
    align: 'center',
    arrow: false,
};
//# sourceMappingURL=config.js.map