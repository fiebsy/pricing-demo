"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = exports.HugeIcon = void 0;
const react_1 = require("@hugeicons/react");
const utils_1 = require("@/lib/utils");
const config_1 = require("./config");
/**
 * Extracts valid icon data from various import formats
 */
function extractIconData(icon) {
    if (!icon)
        return null;
    // Handle default export wrapper: { default: [...] }
    const unwrapped = icon?.default ?? icon;
    // Validate it's an array
    if (!Array.isArray(unwrapped)) {
        // Try nested structures
        if (typeof unwrapped === 'object' && unwrapped !== null) {
            const obj = unwrapped;
            if ('icon' in obj && Array.isArray(obj.icon)) {
                return obj.icon;
            }
            if ('default' in obj && Array.isArray(obj.default)) {
                return obj.default;
            }
        }
        return null;
    }
    // Validate array structure: should be array of [tag, attrs] tuples
    if (unwrapped.length > 0 && !Array.isArray(unwrapped[0])) {
        return null;
    }
    return unwrapped;
}
/**
 * HugeIcon - Wrapper for Huge Icons PRO
 *
 * Huge Icons is the standard icon library for PAYVA V2. This wrapper handles
 * the array format that @hugeicons-pro exports and provides a consistent API
 * with size presets, semantic colors, stroke width presets, and variant support.
 *
 * Stroke Width Behavior:
 * - stroke/duotone/twotone: strokeWidth applies (default: 'regular' = 1.5)
 * - solid/bulk: strokeWidth auto-set to 0 (filled icons)
 *
 * @example
 * ```tsx
 * import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
 * import { HugeIcon } from '@/components/ui/prod/base/icon'
 *
 * // Basic usage with presets
 * <HugeIcon icon={Cancel01Icon} size="md" color="secondary" />
 *
 * // With numeric values
 * <HugeIcon icon={Cancel01Icon} size={24} strokeWidth={2} />
 *
 * // Solid/bulk icons (strokeWidth automatically set to 0)
 * import Alert02Icon from '@hugeicons-pro/core-solid-rounded/Alert02Icon'
 * <HugeIcon icon={Alert02Icon} variant="solid" color="error" />
 *
 * // Duotone/twotone icons (strokeWidth applies!)
 * import Star01Icon from '@hugeicons-pro/core-duotone-rounded/Star01Icon'
 * <HugeIcon icon={Star01Icon} variant="duotone" strokeWidth="medium" />
 *
 * // With all options
 * <HugeIcon
 *   icon={Cancel01Icon}
 *   size="lg"
 *   color="primary"
 *   strokeWidth="medium"
 *   className="transition-colors hover:text-error-primary"
 * />
 * ```
 *
 * @see https://hugeicons.com - Browse 40,000+ icons
 */
function HugeIcon({ icon, size = 'md', color = 'current', strokeWidth = 'regular', variant = 'stroke', className, 'aria-label': ariaLabel, 'aria-hidden': ariaHidden = true, ...props }) {
    const iconData = extractIconData(icon);
    if (!iconData) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('HugeIcon: Invalid icon data provided', {
                iconType: typeof icon,
                icon: icon,
            });
        }
        return null;
    }
    // Resolve values from presets or pass through numbers
    const resolvedSize = (0, config_1.resolveSize)(size);
    const resolvedStrokeWidth = (0, config_1.getVariantStrokeWidth)(variant, strokeWidth);
    const colorClass = (0, config_1.resolveColorClass)(color);
    return (<react_1.HugeiconsIcon icon={iconData} size={resolvedSize} color="currentColor" strokeWidth={resolvedStrokeWidth} className={(0, utils_1.cn)('shrink-0', colorClass, className)} aria-label={ariaLabel} aria-hidden={ariaLabel ? undefined : ariaHidden} {...props}/>);
}
exports.HugeIcon = HugeIcon;
HugeIcon.displayName = 'HugeIcon';
/**
 * Icon - HugeIcon with optional container wrapper
 *
 * Use this when you need proper containment for solid/bulk icons,
 * which require relative positioning and overflow-hidden to render correctly.
 *
 * @example
 * ```tsx
 * import Alert02Icon from '@hugeicons-pro/core-solid-rounded/Alert02Icon'
 * import { Icon } from '@/components/ui/prod/base/icon'
 *
 * // Solid icon with container (recommended for solid/bulk variants)
 * <Icon
 *   icon={Alert02Icon}
 *   variant="solid"
 *   size="md"
 *   color="error"
 *   withContainer
 * />
 * ```
 */
function Icon({ withContainer = false, containerClassName, size = 'md', ...props }) {
    const resolvedSize = (0, config_1.resolveSize)(size);
    if (withContainer) {
        return (<div className={(0, utils_1.cn)(config_1.containerStyles, containerClassName)} style={{ width: resolvedSize, height: resolvedSize }}>
        <HugeIcon size={size} {...props}/>
      </div>);
    }
    return <HugeIcon size={size} {...props}/>;
}
exports.Icon = Icon;
Icon.displayName = 'Icon';
//# sourceMappingURL=huge-icon.js.map