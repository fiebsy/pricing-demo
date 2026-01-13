"use strict";
/**
 * Select - Configuration
 *
 * Default values and styling utilities, matching Menu component patterns.
 * Reuses Menu's appearance system for visual consistency.
 *
 * @module prod/base/select/config
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTERACTIVE_STATES = exports.getSeparatorClasses = exports.SEPARATOR_STYLES = exports.SELECT_ITEM_STYLES = exports.getRevealAnimationClasses = exports.REVEAL_ANIMATION_CLASSES = exports.REVEAL_ANIMATION = exports.USE_LEGACY_ANIMATION = exports.getItemRadius = exports.getGradientStyles = exports.getPopupClasses = exports.BACKGROUND_CLASSES = exports.SHADOW_CLASSES = exports.BORDER_RADIUS_CLASSES = exports.DEFAULT_SIDE_OFFSET = exports.DEFAULT_POPUP_WIDTH = exports.DEFAULT_SELECT_WIDTH = exports.DEFAULT_APPEARANCE = exports.EASING_EXPO_OUT = exports.Z_INDEX = void 0;
// ============================================================================
// Z-Index Scale
// ============================================================================
exports.Z_INDEX = {
    SELECT_POSITIONER: 9999,
    SELECT_POPUP: 9999,
};
// ============================================================================
// Animation Constants
// ============================================================================
/** Expo ease-out for smooth deceleration */
exports.EASING_EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
// ============================================================================
// Appearance Defaults
// ============================================================================
/** Default appearance configuration (matches Menu) */
exports.DEFAULT_APPEARANCE = {
    borderRadius: '2xl',
    shadow: '2xl',
    shine: 'shine-1',
    background: 'primary',
    gradient: 'subtle-depth-sm',
    gradientColor: 'secondary',
    squircle: true,
};
/** Default select dimensions */
exports.DEFAULT_SELECT_WIDTH = 200;
exports.DEFAULT_POPUP_WIDTH = 240;
exports.DEFAULT_SIDE_OFFSET = 6;
// ============================================================================
// CSS Class Maps
// ============================================================================
exports.BORDER_RADIUS_CLASSES = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
};
exports.SHADOW_CLASSES = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
};
exports.BACKGROUND_CLASSES = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
    quaternary: 'bg-quaternary',
};
/** Combined shine + shadow classes (both use box-shadow) */
const SHINE_SHADOW_MAP = {
    'shine-0': { none: 'shine-0', sm: 'shine-0-shadow-sm', md: 'shine-0-shadow-md', lg: 'shine-0-shadow-lg' },
    'shine-0-subtle': { none: 'shine-0-subtle', sm: 'shine-0-subtle-shadow-sm', md: 'shine-0-subtle-shadow-md', lg: 'shine-0-subtle-shadow-lg' },
    'shine-0-intense': { none: 'shine-0-intense', sm: 'shine-0-intense-shadow-sm', md: 'shine-0-intense-shadow-md', lg: 'shine-0-intense-shadow-lg' },
    'shine-1': { none: 'shine-1', sm: 'shine-1-shadow-sm', md: 'shine-1-shadow-md', lg: 'shine-1-shadow-lg' },
    'shine-1-subtle': { none: 'shine-1-subtle', sm: 'shine-1-subtle-shadow-sm', md: 'shine-1-subtle-shadow-md', lg: 'shine-1-subtle-shadow-lg' },
    'shine-1-intense': { none: 'shine-1-intense', sm: 'shine-1-intense-shadow-sm', md: 'shine-1-intense-shadow-md', lg: 'shine-1-intense-shadow-lg' },
    'shine-2': { none: 'shine-2', sm: 'shine-2-shadow-sm', md: 'shine-2-shadow-md', lg: 'shine-2-shadow-lg' },
    'shine-2-subtle': { none: 'shine-2-subtle', sm: 'shine-2-subtle-shadow-sm', md: 'shine-2-subtle-shadow-md', lg: 'shine-2-subtle-shadow-lg' },
    'shine-2-intense': { none: 'shine-2-intense', sm: 'shine-2-intense-shadow-sm', md: 'shine-2-intense-shadow-md', lg: 'shine-2-intense-shadow-lg' },
    'shine-3': { none: 'shine-3', sm: 'shine-3-shadow-sm', md: 'shine-3-shadow-md', lg: 'shine-3-shadow-lg' },
    'shine-3-subtle': { none: 'shine-3-subtle', sm: 'shine-3-subtle-shadow-sm', md: 'shine-3-subtle-shadow-md', lg: 'shine-3-subtle-shadow-lg' },
    'shine-3-intense': { none: 'shine-3-intense', sm: 'shine-3-intense-shadow-sm', md: 'shine-3-intense-shadow-md', lg: 'shine-3-intense-shadow-lg' },
    'shine-brand': { none: 'shine-brand', sm: 'shine-brand-shadow-sm', md: 'shine-brand-shadow-md', lg: 'shine-brand-shadow-lg' },
    'shine-brand-subtle': { none: 'shine-brand-subtle', sm: 'shine-brand-subtle-shadow-sm', md: 'shine-brand-subtle-shadow-md', lg: 'shine-brand-subtle-shadow-lg' },
    'shine-brand-intense': { none: 'shine-brand-intense', sm: 'shine-brand-intense-shadow-sm', md: 'shine-brand-intense-shadow-md', lg: 'shine-brand-intense-shadow-lg' },
};
// ============================================================================
// Utility Functions
// ============================================================================
/**
 * Generate popup classes from appearance config
 */
function getPopupClasses(appearance) {
    const merged = { ...exports.DEFAULT_APPEARANCE, ...appearance };
    const classes = [];
    // Background
    classes.push(exports.BACKGROUND_CLASSES[merged.background]);
    // Border radius
    classes.push(exports.BORDER_RADIUS_CLASSES[merged.borderRadius]);
    // Squircle corners
    if (merged.squircle) {
        classes.push('corner-squircle');
    }
    // Handle shine + shadow combination (both use box-shadow CSS property)
    const hasShine = merged.shine !== 'none';
    const hasShadow = merged.shadow !== 'none';
    if (hasShine && hasShadow) {
        const shineCombos = SHINE_SHADOW_MAP[merged.shine];
        // Map xl/2xl to lg since combined classes only go up to lg
        const shadowKey = merged.shadow === 'xl' || merged.shadow === '2xl' ? 'lg' : merged.shadow;
        if (shineCombos?.[shadowKey]) {
            classes.push(shineCombos[shadowKey]);
        }
        else {
            classes.push(merged.shine);
        }
    }
    else if (hasShine) {
        classes.push(merged.shine);
    }
    else if (hasShadow) {
        classes.push(exports.SHADOW_CLASSES[merged.shadow]);
    }
    return classes.filter(Boolean).join(' ');
}
exports.getPopupClasses = getPopupClasses;
/**
 * Generate inline gradient styles
 */
function getGradientStyles(appearance) {
    const merged = { ...exports.DEFAULT_APPEARANCE, ...appearance };
    if (merged.gradient === 'none') {
        return {};
    }
    const gradientColors = {
        brand: 'var(--color-brand-500)',
        primary: 'var(--foreground-color-primary)',
        secondary: 'var(--foreground-color-secondary)',
        tertiary: 'var(--foreground-color-tertiary)',
        gray: 'var(--utility-gray-500)',
        'gray-light': 'var(--utility-gray-300)',
    };
    const color = gradientColors[merged.gradientColor] || gradientColors['gray-light'];
    const opacityMap = {
        sm: { start: 0, end: 0.03 },
        md: { start: 0, end: 0.05 },
        lg: { start: 0, end: 0.08 },
        xl: { start: 0, end: 0.12 },
    };
    const intensity = merged.gradient.replace('subtle-depth-', '');
    const { start, end } = opacityMap[intensity] || opacityMap.sm;
    return {
        backgroundImage: `linear-gradient(to bottom, color-mix(in srgb, ${color} ${start * 100}%, transparent), color-mix(in srgb, ${color} ${end * 100}%, transparent))`,
    };
}
exports.getGradientStyles = getGradientStyles;
// ============================================================================
// Item Radius Calculation
// ============================================================================
const BORDER_RADIUS_PX = {
    none: 0,
    sm: 2,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
};
const CONTAINER_PADDING = 4; // px
function getItemRadius(containerRadius) {
    const radiusPx = BORDER_RADIUS_PX[containerRadius];
    return Math.max(0, radiusPx - CONTAINER_PADDING);
}
exports.getItemRadius = getItemRadius;
// ============================================================================
// Reveal Animation Config
// ============================================================================
exports.USE_LEGACY_ANIMATION = true;
exports.REVEAL_ANIMATION = {
    duration: 200,
    scaleStart: 0.4,
    scaleEnd: 1,
    slideOffsetRatio: 0.5,
};
exports.REVEAL_ANIMATION_CLASSES = [
    'data-[state=open]:animate-in',
    'data-[state=closed]:animate-out',
    'data-[state=open]:fade-in-0',
    'data-[state=closed]:fade-out-0',
    'data-[state=open]:zoom-in-95',
    'data-[state=closed]:zoom-out-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=bottom]:slide-out-to-top-2',
    'data-[side=top]:slide-in-from-bottom-2',
    'data-[side=top]:slide-out-to-bottom-2',
];
function getRevealAnimationClasses() {
    return exports.REVEAL_ANIMATION_CLASSES;
}
exports.getRevealAnimationClasses = getRevealAnimationClasses;
// ============================================================================
// Select Item Styling
// ============================================================================
exports.SELECT_ITEM_STYLES = {
    paddingX: 'px-2.5',
    minHeight: 'min-h-9',
    iconGap: 'gap-2.5',
    iconSize: 16,
    iconStrokeWidth: 2,
    iconColor: 'text-tertiary',
    textSize: 'text-sm',
    textWeight: 'font-medium',
};
// ============================================================================
// Separator Styling
// ============================================================================
exports.SEPARATOR_STYLES = {
    base: 'border-t border-primary opacity-50',
    fullWidth: '-mx-1',
};
function getSeparatorClasses() {
    return `${exports.SEPARATOR_STYLES.base} ${exports.SEPARATOR_STYLES.fullWidth}`;
}
exports.getSeparatorClasses = getSeparatorClasses;
// ============================================================================
// Hover/Interactive States
// ============================================================================
exports.INTERACTIVE_STATES = {
    hover: 'hover:bg-quaternary',
    focusVisible: 'focus-visible:bg-quaternary',
    active: 'active:bg-tertiary',
    highlighted: 'data-[highlighted]:bg-quaternary',
    disabled: 'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
};
//# sourceMappingURL=config.js.map