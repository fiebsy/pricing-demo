"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonUtility = void 0;
const react_1 = require("react");
const button_1 = require("@base-ui/react/button");
const utils_1 = require("@/lib/utils");
const is_react_component_1 = require("@/lib/is-react-component");
const tooltip_1 = require("@/components/ui/prod/base/tooltip");
const icon_1 = require("@/components/ui/prod/base/icon");
const config_1 = require("./config");
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
 * Map button utility size to HugeIcon size in pixels
 * xs: 16px (size-4), sm: 20px (size-5)
 */
const iconSizeMap = {
    xs: 16,
    sm: 20,
};
/**
 * Maps react-aria Placement to Base UI TooltipSide
 * Base UI uses 'side' + 'align' instead of combined placement
 */
function mapPlacementToSide(placement) {
    // Extract the primary side from placement
    // e.g., 'top start' -> 'top', 'bottom' -> 'bottom'
    const side = placement.split(' ')[0];
    switch (side) {
        case 'top':
        case 'bottom':
        case 'left':
        case 'right':
            return side;
        case 'start':
            return 'left';
        case 'end':
            return 'right';
        default:
            return 'top';
    }
}
/**
 * ButtonUtility - Icon-only utility button
 *
 * A compact button designed for icon-only actions like settings, close, etc.
 * Supports both button and anchor elements via the `href` prop.
 *
 * @example
 * ```tsx
 * <ButtonUtility icon={Settings01Icon} tooltip="Settings" />
 * <ButtonUtility icon={Close01Icon} color="tertiary" />
 * <ButtonUtility icon={LinkIcon} href="/settings" tooltip="Go to settings" />
 * ```
 */
exports.ButtonUtility = (0, react_1.forwardRef)(({ tooltip, className, isDisabled, isActive, disableHoverWhenActive = true, icon: Icon, size = 'sm', color = 'secondary', shape = 'square', tooltipPlacement = 'top', ...otherProps }, ref) => {
    const href = 'href' in otherProps ? otherProps.href : undefined;
    const isLink = Boolean(href);
    // Whether to disable hover effects when active
    const shouldDisableHover = isActive && disableHoverWhenActive;
    const buttonClassName = (0, utils_1.cn)(
    // Base styles
    config_1.baseStyles, 
    // Shape
    config_1.shapeStyles[shape], 
    // Color (only when not active)
    !isActive && config_1.colorStyles[color], 
    // Active state styles
    isActive && config_1.activeStyles[color], 
    // Hover overrides (when active and disableHoverWhenActive is true)
    shouldDisableHover && config_1.activeHoverOverrideStyles[color], 
    // Icon styles
    config_1.iconStyles, config_1.iconSizeStyles[size], className);
    // Render the icon
    const iconContent = (() => {
        // HugeIcon array format - needs HugeIcon wrapper
        if (isHugeIconArray(Icon)) {
            return (<icon_1.HugeIcon icon={Icon} size={iconSizeMap[size]} strokeWidth={1.5} data-icon/>);
        }
        // React component (function/class)
        if ((0, is_react_component_1.isReactComponent)(Icon)) {
            return <Icon data-icon/>;
        }
        // Already a valid React element
        if ((0, react_1.isValidElement)(Icon)) {
            return Icon;
        }
        return null;
    })();
    // For links, use a native anchor element
    if (isLink) {
        const { href: linkHref, ...linkProps } = otherProps;
        const content = (<a ref={ref} href={isDisabled ? undefined : linkHref} aria-label={tooltip} data-active={isActive ? true : undefined} data-disabled={isDisabled ? true : undefined} className={buttonClassName} {...linkProps}>
          {/* Background layer with shine - fades in on hover, always visible when active */}
          <div className={(0, utils_1.cn)('absolute inset-0 -z-10 rounded-[inherit] pointer-events-none transition-opacity duration-150', 'bg-secondary shine-1', isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100', 
            // Lock hover when active and disableHoverWhenActive is true
            shouldDisableHover && 'group-hover:opacity-100')}/>
          {iconContent}
        </a>);
        if (tooltip) {
            return (<tooltip_1.Tooltip title={tooltip} side={mapPlacementToSide(tooltipPlacement)} disabled={isDisabled} sideOffset={config_1.tooltipOffsets[size]}>
            {content}
          </tooltip_1.Tooltip>);
        }
        return content;
    }
    // For buttons, use Base UI Button
    const { type = 'button', ...buttonProps } = otherProps;
    const content = (<button_1.Button ref={ref} type={type} disabled={isDisabled} aria-label={tooltip} data-active={isActive ? true : undefined} className={buttonClassName} {...buttonProps}>
        {/* Background layer with shine - fades in on hover, always visible when active */}
        <div className={(0, utils_1.cn)('absolute inset-0 -z-10 rounded-[inherit] pointer-events-none transition-opacity duration-150', 'bg-secondary shine-1', isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100', 
        // Lock hover when active and disableHoverWhenActive is true
        shouldDisableHover && 'group-hover:opacity-100')}/>
        {iconContent}
      </button_1.Button>);
    if (tooltip) {
        return (<tooltip_1.Tooltip title={tooltip} side={mapPlacementToSide(tooltipPlacement)} disabled={isDisabled} sideOffset={config_1.tooltipOffsets[size]}>
          {content}
        </tooltip_1.Tooltip>);
    }
    return content;
});
exports.ButtonUtility.displayName = 'ButtonUtility';
//# sourceMappingURL=button-utility.js.map