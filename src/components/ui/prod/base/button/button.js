"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const react_1 = require("react");
const button_1 = require("@base-ui/react/button");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const config_1 = require("./config");
// ============================================================================
// UTILITIES
// ============================================================================
/**
 * Check if a value is a HugeIcon array format
 * HugeIcons export arrays like: [["circle", {...}], ["path", {...}]]
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
function renderIcon(icon, position) {
    if (!icon)
        return null;
    // Already a React element
    if ((0, react_1.isValidElement)(icon)) {
        return icon;
    }
    // HugeIcon array - needs HugeIcon wrapper
    if (isHugeIconArray(icon)) {
        return (<icon_1.HugeIcon icon={icon} size={20} strokeWidth={1.5} data-icon={position} className={config_1.iconStyles}/>);
    }
    // React component function
    if (isReactComponent(icon)) {
        return (0, react_1.createElement)(icon, {
            'data-icon': position,
            className: config_1.iconStyles,
        });
    }
    return null;
}
// ============================================================================
// LOADING SPINNER
// ============================================================================
function LoadingSpinner({ className }) {
    return (<svg viewBox="0 0 20 20" fill="none" data-icon="loading" className={(0, utils_1.cn)(config_1.loadingStyles.spinner, className)} aria-hidden="true">
      {/* Background circle */}
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" className="opacity-30"/>
      {/* Spinning arc */}
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeDasharray="12.5 50" strokeLinecap="round" className="origin-center animate-spin"/>
    </svg>);
}
// ============================================================================
// BUTTON COMPONENT
// ============================================================================
/**
 * Button component built on Base UI primitives.
 *
 * @example
 * ```tsx
 * // Primary button
 * <Button variant="primary">Save Changes</Button>
 *
 * // With icons
 * <Button iconLeading={PlusIcon}>Add Item</Button>
 *
 * // Loading state
 * <Button isLoading>Saving...</Button>
 *
 * // As a link
 * <Button href="/settings" asChild>Settings</Button>
 * ```
 */
exports.Button = (0, react_1.forwardRef)(({ variant = 'primary', size = 'md', roundness = 'default', iconLeading, iconTrailing, isLoading = false, showTextWhileLoading = false, className, children, ...props }, ref) => {
    const isIconOnly = (iconLeading || iconTrailing) && !children;
    const isLinkVariant = variant === 'link-gray' || variant === 'link-color' || variant === 'link-destructive';
    // Extract disabled from props (only exists on button element, not anchor)
    const disabled = 'disabled' in props ? props.disabled : false;
    const isDisabled = disabled || isLoading;
    // Determine if we should render as a link
    const href = 'href' in props ? props.href : undefined;
    const asChild = 'asChild' in props ? props.asChild : false;
    // For link buttons, we'll render an anchor
    if (href && asChild) {
        const { href: _, asChild: __, ...anchorProps } = props;
        return (<a ref={ref} href={isDisabled ? undefined : href} aria-disabled={isDisabled} data-disabled={isDisabled || undefined} className={(0, utils_1.cn)(config_1.commonStyles, config_1.sizeStyles[size], config_1.roundnessStyles[roundness], isIconOnly && config_1.iconOnlySizeStyles[size], config_1.variantStyles[variant], isLoading && 'pointer-events-none', className)} {...anchorProps}>
          {renderIcon(iconLeading, 'leading')}
          {children && (<span data-text className={(0, utils_1.cn)(!isLinkVariant && 'px-0.5')}>
              {children}
            </span>)}
          {renderIcon(iconTrailing, 'trailing')}
        </a>);
    }
    return (<button_1.Button ref={ref} disabled={isDisabled} className={(0, utils_1.cn)(config_1.commonStyles, config_1.sizeStyles[size], config_1.roundnessStyles[roundness], isIconOnly && config_1.iconOnlySizeStyles[size], config_1.variantStyles[variant], isLoading && 'relative', className)} {...props}>
        {/* Loading overlay */}
        {isLoading && !showTextWhileLoading && (<span className={config_1.loadingStyles.overlay}>
            <LoadingSpinner />
          </span>)}

        {/* Leading icon */}
        <span className={(0, utils_1.cn)('transition-inherit-all', isLoading && !showTextWhileLoading && 'invisible')}>
          {renderIcon(iconLeading, 'leading')}
        </span>

        {/* Inline loading spinner (when showing text) */}
        {isLoading && showTextWhileLoading && <LoadingSpinner />}

        {/* Text content */}
        {children && (<span data-text className={(0, utils_1.cn)(!isLinkVariant && 'px-0.5', isLoading && !showTextWhileLoading && 'invisible')}>
            {children}
          </span>)}

        {/* Trailing icon */}
        <span className={(0, utils_1.cn)('transition-inherit-all', isLoading && !showTextWhileLoading && 'invisible')}>
          {renderIcon(iconTrailing, 'trailing')}
        </span>
      </button_1.Button>);
});
exports.Button.displayName = 'Button';
//# sourceMappingURL=button.js.map