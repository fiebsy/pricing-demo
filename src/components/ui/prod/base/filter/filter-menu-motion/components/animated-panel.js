"use strict";
/**
 * AnimatedPanel - Motion-animated menu panel
 *
 * Handles the sliding panel animation for root/submenu transitions.
 * Uses the state-based animation pattern for mounted components.
 *
 * @module prod/base/filter/filter-menu-motion/components/animated-panel
 */
'use client';
/**
 * AnimatedPanel - Motion-animated menu panel
 *
 * Handles the sliding panel animation for root/submenu transitions.
 * Uses the state-based animation pattern for mounted components.
 *
 * @module prod/base/filter/filter-menu-motion/components/animated-panel
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedPanel = void 0;
const React = require("react");
const react_1 = require("react");
const react_2 = require("motion/react");
const animation_config_1 = require("../animation-config");
// ============================================================================
// COMPONENT
// ============================================================================
/**
 * AnimatedPanel - A panel that scales during slide transitions.
 *
 * The scale animation creates depth perception:
 * - Active panel scales to 1 (full size)
 * - Inactive panel scales down slightly (panelExitScale/panelEnterScale)
 * - Transform origin varies based on panel position in strip
 */
exports.AnimatedPanel = (0, react_1.forwardRef)(function AnimatedPanel({ isActive, animationConfig, isSubmenu = false, children, className }, ref) {
    // Determine scale based on active state
    const scale = isActive
        ? 1
        : isSubmenu
            ? animationConfig.panelEnterScale
            : animationConfig.panelExitScale;
    // Use the SCALE_ORIGIN_MAP for 9-point transform origins
    const transformOrigin = animation_config_1.SCALE_ORIGIN_MAP[animationConfig.panelScaleOrigin];
    return (<react_2.motion.div ref={ref} initial={false} animate={{ scale }} transition={(0, animation_config_1.getSlideTransition)(animationConfig)} style={{ transformOrigin }} className={className}>
        {children}
      </react_2.motion.div>);
});
exports.AnimatedPanel.displayName = 'AnimatedPanel';
//# sourceMappingURL=animated-panel.js.map