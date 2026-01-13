"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const react_1 = require("react");
const tooltip_1 = require("@base-ui/react/tooltip");
const utils_1 = require("@/lib/utils");
const config_1 = require("./config");
// Import keyframe animations
require("./tooltip-transitions.css");
/**
 * Merge event handlers from two sources
 * Ensures both the original handler and tooltip handler are called
 */
function mergeEventHandlers(original, additional) {
    if (!original && !additional)
        return undefined;
    if (!original)
        return additional;
    if (!additional)
        return original;
    return ((...args) => {
        original(...args);
        additional(...args);
    });
}
/**
 * Merge props from tooltip trigger with child props
 * Event handlers are composed so both fire, other props from tooltip take precedence
 */
function mergeProps(childProps, tooltipProps) {
    const merged = { ...childProps };
    for (const key of Object.keys(tooltipProps)) {
        const childValue = childProps[key];
        const tooltipValue = tooltipProps[key];
        // Merge event handlers (on* props)
        if (key.startsWith('on') &&
            typeof childValue === 'function' &&
            typeof tooltipValue === 'function') {
            merged[key] = mergeEventHandlers(childValue, tooltipValue);
        }
        else {
            // For non-event props, tooltip props take precedence
            merged[key] = tooltipValue;
        }
    }
    return merged;
}
const Tooltip = ({ title, description, arrow = config_1.defaults.arrow, delay = config_1.defaults.delay, closeDelay = config_1.defaults.closeDelay, side = config_1.defaults.side, align = config_1.defaults.align, sideOffset = config_1.defaults.sideOffset, disabled, open, defaultOpen, onOpenChange, children, }) => {
    return (<tooltip_1.Tooltip.Provider delay={delay} closeDelay={closeDelay}>
      <tooltip_1.Tooltip.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} disabled={disabled}>
        <tooltip_1.Tooltip.Trigger render={(tooltipProps) => {
            if ((0, react_1.isValidElement)(children)) {
                const childElement = children;
                const childProps = childElement.props || {};
                // Merge props so event handlers are composed, not overwritten
                const mergedProps = mergeProps(childProps, tooltipProps);
                return (0, react_1.cloneElement)(childElement, mergedProps);
            }
            return <span {...tooltipProps}>{children}</span>;
        }}/>

        <tooltip_1.Tooltip.Portal>
          <tooltip_1.Tooltip.Positioner side={side} align={align} sideOffset={sideOffset} className="z-[9999]">
            <tooltip_1.Tooltip.Popup className={(0, utils_1.cn)(config_1.popupStyles, description ? config_1.paddingStyles.withDescription : config_1.paddingStyles.titleOnly)}>
              <span className={config_1.titleStyles}>{title}</span>

              {description && (<span className={config_1.descriptionStyles}>{description}</span>)}

              {arrow && (<tooltip_1.Tooltip.Arrow className={config_1.arrowStyles}>
                  <ArrowSvg />
                </tooltip_1.Tooltip.Arrow>)}
            </tooltip_1.Tooltip.Popup>
          </tooltip_1.Tooltip.Positioner>
        </tooltip_1.Tooltip.Portal>
      </tooltip_1.Tooltip.Root>
    </tooltip_1.Tooltip.Provider>);
};
exports.Tooltip = Tooltip;
exports.Tooltip.displayName = 'Tooltip';
/**
 * Custom arrow SVG for squircle-style appearance.
 */
const ArrowSvg = () => (<svg viewBox="0 0 100 100" className="size-full">
    <path d="M0,0 L35.858,35.858 Q50,50 64.142,35.858 L100,0 Z"/>
  </svg>);
//# sourceMappingURL=tooltip.js.map