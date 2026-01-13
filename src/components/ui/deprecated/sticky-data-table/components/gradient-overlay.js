"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradientOverlay = void 0;
/**
 * StickyDataTable V2 - GradientOverlay Component
 *
 * Visual indicator for horizontal scroll availability.
 * Shows a gradient fade on the right edge.
 *
 * @module components/gradient-overlay
 */
const react_1 = require("react");
/**
 * Gradient overlay for scroll indication
 *
 * Shows a subtle gradient on the right edge of the table
 * to indicate more content is available to scroll.
 */
const GradientOverlayBase = ({ visible, position, backgroundColor = 'var(--background-color-primary)', borderRadius = 12, topOffset = 0, }) => {
    if (!visible)
        return null;
    // Determine border radius based on position
    const borderRadiusStyle = position === 'header'
        ? { borderTopRightRadius: `${borderRadius}px` }
        : position === 'body'
            ? { borderBottomRightRadius: `${borderRadius}px` }
            : { borderTopRightRadius: `${borderRadius}px`, borderBottomRightRadius: `${borderRadius}px` };
    return (<div className="absolute w-[20px] pointer-events-none z-[20]" style={{
            top: topOffset,
            bottom: position === 'full' || position === 'header' ? 0 : undefined,
            right: '1px',
            background: `linear-gradient(to left, ${backgroundColor} 0%, transparent 100%)`,
            ...borderRadiusStyle,
        }}/>);
};
exports.GradientOverlay = (0, react_1.memo)(GradientOverlayBase);
exports.GradientOverlay.displayName = 'GradientOverlay';
//# sourceMappingURL=gradient-overlay.js.map