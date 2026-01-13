"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeGroup = void 0;
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const ArrowRight01Icon_1 = require("@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon");
const icon_1 = require("@/components/ui/prod/base/icon");
const config_1 = require("./config");
// ============================================================================
// UTILITIES
// ============================================================================
/**
 * Check if a value is a HugeIcon array format
 */
function isHugeIconArray(value) {
    return (Array.isArray(value) &&
        value.length > 0 &&
        Array.isArray(value[0]) &&
        typeof value[0][0] === 'string');
}
/**
 * Check if a value is a React component function
 */
function isReactComponent(value) {
    return typeof value === 'function';
}
/**
 * Render an icon prop consistently
 */
function renderIcon(icon, className) {
    if (!icon)
        return null;
    // Already a React element
    if ((0, react_1.isValidElement)(icon)) {
        return icon;
    }
    // HugeIcon array - needs wrapper
    if (isHugeIconArray(icon)) {
        return <icon_1.HugeIcon icon={icon} size={14} strokeWidth={2} className={className}/>;
    }
    // React component function
    if (isReactComponent(icon)) {
        return (0, react_1.createElement)(icon, { className });
    }
    return null;
}
// ============================================================================
// BADGE GROUP COMPONENT
// ============================================================================
/**
 * BadgeGroup component - compound badge with addon section.
 * Used for badges that need a highlighted sub-section (like "New" + "Feature").
 *
 * @example
 * ```tsx
 * // Leading addon (default)
 * <BadgeGroup addonText="New" color="brand">
 *   Feature
 * </BadgeGroup>
 *
 * // Trailing addon with icon
 * <BadgeGroup addonText="View" align="trailing" iconTrailing={ArrowRightIcon}>
 *   Updates
 * </BadgeGroup>
 *
 * // Modern theme with dot
 * <BadgeGroup addonText="Beta" theme="modern" color="warning">
 *   Dashboard
 * </BadgeGroup>
 * ```
 */
function BadgeGroup({ children, addonText, size = 'md', color = 'brand', theme = 'light', align = 'leading', className, iconTrailing, }) {
    const themeConfig = config_1.badgeGroupThemeStyles[theme];
    const colorConfig = config_1.badgeGroupColorStyles[theme][color] ?? {};
    const sizeConfig = config_1.badgeGroupSizeStyles[align][size];
    // Use default arrow icon if no icon provided
    const IconTrailing = iconTrailing ?? ArrowRight01Icon_1.default;
    const rootClasses = (0, utils_1.cn)(config_1.badgeGroupCommonStyles, themeConfig.root, sizeConfig.root, colorConfig.root, 
    // Adjust padding when no children
    !children && !IconTrailing && 'pr-1', className);
    const addonClasses = (0, utils_1.cn)('inline-flex items-center', themeConfig.addon, sizeConfig.addon, colorConfig.addon);
    const dotClasses = (0, utils_1.cn)('inline-block size-2 shrink-0 rounded-full', sizeConfig.dot, colorConfig.dot);
    const iconClasses = (0, utils_1.cn)(themeConfig.icon, sizeConfig.icon, colorConfig.icon);
    // Trailing alignment: [dot?] children [addon + icon]
    if (align === 'trailing') {
        return (<div className={rootClasses}>
        {/* Dot for modern theme */}
        {theme === 'modern' && <span className={dotClasses}/>}

        {/* Main content */}
        {children}

        {/* Addon section with trailing icon */}
        <span className={addonClasses}>
          {addonText}
          {renderIcon(IconTrailing, iconClasses)}
        </span>
      </div>);
    }
    // Leading alignment (default): [addon + dot?] children [icon]
    return (<div className={rootClasses}>
      {/* Addon section */}
      <span className={addonClasses}>
        {/* Dot for modern theme inside addon */}
        {theme === 'modern' && <span className={dotClasses}/>}
        {addonText}
      </span>

      {/* Main content */}
      {children}

      {/* Trailing icon */}
      {renderIcon(IconTrailing, iconClasses)}
    </div>);
}
exports.BadgeGroup = BadgeGroup;
BadgeGroup.displayName = 'BadgeGroup';
//# sourceMappingURL=badge-group.js.map