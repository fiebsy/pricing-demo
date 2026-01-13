"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturedIcon = void 0;
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const config_1 = require("./config");
/**
 * Check if an icon should use the HugeIcon wrapper
 * HugeIcons and function components need the wrapper
 * Already-rendered React elements can be rendered directly
 */
function shouldUseHugeIcon(icon) {
    if (!icon)
        return false;
    // If it's already a React element (JSX), render it directly
    if ((0, react_1.isValidElement)(icon))
        return false;
    // Everything else (functions, arrays, objects) should use HugeIcon wrapper
    return true;
}
/**
 * FeaturedIcon - A decorative icon container with multiple theme variants
 *
 * Used for empty states, feature highlights, and visual emphasis.
 * Supports HugeIcons (recommended), React components, or pre-rendered elements.
 *
 * @example
 * ```tsx
 * import Search01Icon from '@hugeicons-pro/core-stroke-rounded/Search01Icon'
 * import { FeaturedIcon } from '@/components/ui/prod/features/featured-icon'
 *
 * // With HugeIcon (recommended)
 * <FeaturedIcon icon={Search01Icon} color="gray" theme="modern" size="lg" />
 *
 * // With custom element
 * <FeaturedIcon icon={<CustomIcon />} color="brand" theme="light" />
 * ```
 */
function FeaturedIcon({ size = 'sm', theme = 'light', color = 'brand', icon, className, children, ...props }) {
    const styles = config_1.themeStyles[theme];
    return (<div {...props} data-featured-icon className={(0, utils_1.cn)('relative flex shrink-0 items-center justify-center', config_1.iconSizes[size], styles.base, styles.sizes[size], styles.colors[color], className)}>
      {/* Render HugeIcon array or function component via wrapper */}
      {shouldUseHugeIcon(icon) && (<icon_1.HugeIcon icon={icon} size={config_1.iconPixelSizes[size]} className="z-1" data-icon/>)}

      {/* Render pre-created React element directly */}
      {!shouldUseHugeIcon(icon) && (0, react_1.isValidElement)(icon) && (<div className="z-1" data-icon>
          {icon}
        </div>)}

      {children}
    </div>);
}
exports.FeaturedIcon = FeaturedIcon;
//# sourceMappingURL=featured-icon.js.map