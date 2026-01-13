"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = void 0;
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
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
    // Already a React element - clone and merge className
    if ((0, react_1.isValidElement)(icon)) {
        const element = icon;
        return (0, react_1.cloneElement)(element, {
            className: (0, utils_1.cn)(className, element.props.className),
        });
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
// COMPONENTS
// ============================================================================
/**
 * Dot indicator component
 */
function Dot({ className }) {
    return <span className={(0, utils_1.cn)('rounded-full shrink-0', className)}/>;
}
/**
 * Remove/close icon
 */
function RemoveIcon({ className }) {
    return (<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={(0, utils_1.cn)('size-3', className)} aria-hidden="true">
      <path d="M3 3l6 6M9 3l-6 6"/>
    </svg>);
}
// ============================================================================
// BADGE COMPONENT
// ============================================================================
/**
 * Badge component for status indicators, labels, and tags.
 *
 * @example
 * ```tsx
 * // Basic badge
 * <Badge>Label</Badge>
 *
 * // With color
 * <Badge color="success">Active</Badge>
 *
 * // With dot indicator
 * <Badge color="warning" dot>Pending</Badge>
 *
 * // With icon
 * <Badge iconLeading={CheckIcon} color="success">Completed</Badge>
 *
 * // Removable
 * <Badge onRemove={() => handleRemove()}>Tag</Badge>
 * ```
 */
exports.Badge = (0, react_1.forwardRef)(({ color = 'gray', size = 'md', shape = 'pill', style = 'default', dot = false, iconLeading, iconTrailing, onRemove, className, children, }, ref) => {
    // Use modern color overrides if style is "modern" and override exists
    const baseColorConfig = config_1.colorStyles[color];
    const colorConfig = style === 'modern' && config_1.modernColorOverrides[color]
        ? config_1.modernColorOverrides[color]
        : baseColorConfig;
    const sizeConfig = config_1.sizeStyles[size];
    const hasTrailing = iconTrailing || onRemove;
    return (<span ref={ref} className={(0, utils_1.cn)(config_1.commonStyles, config_1.shapeStyles[shape], config_1.shapeSizeOverrides[shape]?.[size], config_1.styleVariantStyles[style], sizeConfig.root, colorConfig.root, dot && config_1.sizeWithDotStyles[size], !dot && iconLeading && config_1.sizeWithLeadingStyles[size], hasTrailing && config_1.sizeWithTrailingStyles[size], className)}>
        {/* Dot indicator */}
        {dot && <Dot className={(0, utils_1.cn)(sizeConfig.dot, colorConfig.dot)}/>}

        {/* Leading icon */}
        {!dot && renderIcon(iconLeading, (0, utils_1.cn)(sizeConfig.icon, colorConfig.icon))}

        {/* Content */}
        <span>{children}</span>

        {/* Trailing icon */}
        {!onRemove && renderIcon(iconTrailing, (0, utils_1.cn)(sizeConfig.icon, colorConfig.icon))}

        {/* Remove button */}
        {onRemove && (<button type="button" onClick={onRemove} aria-label="Remove" className={(0, utils_1.cn)(config_1.removeButtonStyles, colorConfig.removeButton)}>
            <RemoveIcon />
          </button>)}
      </span>);
});
exports.Badge.displayName = 'Badge';
//# sourceMappingURL=badge.js.map