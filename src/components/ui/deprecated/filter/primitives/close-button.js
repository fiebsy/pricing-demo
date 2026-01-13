"use strict";
/**
 * Close Button Primitive
 *
 * A 40px touch target close button that visually appears smaller.
 * Uses negative margins to maintain layout based on icon size while
 * providing an accessible touch target.
 *
 * @module base-ui/filter/primitives/close-button
 */
'use client';
/**
 * Close Button Primitive
 *
 * A 40px touch target close button that visually appears smaller.
 * Uses negative margins to maintain layout based on icon size while
 * providing an accessible touch target.
 *
 * @module base-ui/filter/primitives/close-button
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloseButton = void 0;
const react_aria_components_1 = require("react-aria-components");
const core_stroke_rounded_1 = require("@hugeicons-pro/core-stroke-rounded");
const utils_1 = require("@/lib/utils");
const icon_1 = require("@/components/ui/prod/base/icon");
const constants_1 = require("../constants");
// ============================================================================
// Component
// ============================================================================
/**
 * CloseButton - Accessible close button with 40px touch target
 *
 * Renders a close icon that appears at `iconSize` but has a full
 * 40px touch target for accessibility. Uses negative margins to
 * prevent the touch target from affecting layout.
 */
const CloseButton = ({ onPress, iconSize = 14, icon, strokeWidth, opacity = 1, transition, className, }) => {
    const IconComponent = icon ?? core_stroke_rounded_1.MultiplicationSignIcon;
    // For solid/bulk icons use strokeWidth 0; for stroke icons use 2.5
    const finalStrokeWidth = strokeWidth ?? (icon ? 0 : 2.5);
    // Calculate negative margins to center the touch target around the icon
    const marginOffset = -((constants_1.TOUCH_TARGET_SIZE - iconSize) / 2);
    return (<react_aria_components_1.Button onPress={onPress} className={(0, utils_1.cn)('flex-shrink-0 flex items-center justify-center rounded-full', 'text-tertiary hover:text-primary', 'outline-hidden focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand', className)} style={{
            width: constants_1.TOUCH_TARGET_SIZE,
            height: constants_1.TOUCH_TARGET_SIZE,
            marginTop: marginOffset,
            marginBottom: marginOffset,
            marginLeft: marginOffset,
            marginRight: marginOffset,
            opacity,
            transition: transition ? `${transition}, color 100ms ease` : 'color 100ms ease',
        }}>
      <icon_1.HugeIcon icon={IconComponent} size={iconSize} strokeWidth={finalStrokeWidth}/>
    </react_aria_components_1.Button>);
};
exports.CloseButton = CloseButton;
exports.CloseButton.displayName = 'CloseButton';
//# sourceMappingURL=close-button.js.map