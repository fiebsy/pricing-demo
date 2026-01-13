"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useArrowPosition = void 0;
/**
 * StickyDataTable V2 - Arrow Position Hook
 *
 * Calculates dynamic positioning for navigation arrows.
 * Adapts to table height for optimal placement.
 *
 * @module hooks/use-arrow-position
 */
const react_1 = require("react");
const config_1 = require("../../config");
/**
 * Hook for calculating arrow positioning
 *
 * Strategy:
 * 1. Short tables (< 200px): Use percentage (40%) positioning
 * 2. Normal tables: Use fixed offset (default 300px)
 * 3. Clamp to ensure arrows stay within bounds
 *
 * Features:
 * - Responsive to table height changes
 * - ResizeObserver for dynamic updates
 * - Scroll-aware positioning
 */
function useArrowPosition({ bodyRef, headerGap = config_1.TABLE_CONFIG.HEADER_GAP, preferredTopOffset = config_1.ARROW_CONFIG.PREFERRED_TOP_OFFSET, bottomOffset = config_1.ARROW_CONFIG.BOTTOM_OFFSET, arrowHeight = config_1.ARROW_CONFIG.ARROW_HEIGHT, }) {
    const [position, setPosition] = (0, react_1.useState)({
        top: `${preferredTopOffset}px`,
    });
    (0, react_1.useEffect)(() => {
        const body = bodyRef.current;
        if (!body)
            return;
        const calculatePosition = () => {
            const bodyHeight = body.scrollHeight;
            const headerHeight = config_1.TABLE_CONFIG.HEADER_HEIGHT;
            // Strategy based on table height
            const isShortTable = bodyHeight < config_1.ARROW_CONFIG.SHORT_TABLE_THRESHOLD;
            const offsetFromTop = isShortTable
                ? Math.round(bodyHeight * config_1.ARROW_CONFIG.SHORT_TABLE_POSITION_PERCENT)
                : preferredTopOffset;
            // Clamp to valid range
            const minOffset = 60;
            const maxOffset = Math.max(minOffset, bodyHeight - arrowHeight - bottomOffset);
            const clampedOffset = Math.max(minOffset, Math.min(offsetFromTop, maxOffset));
            // Final position relative to sticky header wrapper
            const arrowTop = headerHeight + clampedOffset;
            setPosition({ top: `${arrowTop}px` });
        };
        // Initial calculation
        calculatePosition();
        // Watch for size changes
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(calculatePosition);
        });
        resizeObserver.observe(body);
        // Watch for scroll changes
        const handleScroll = () => requestAnimationFrame(calculatePosition);
        const handleResize = () => requestAnimationFrame(calculatePosition);
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [bodyRef, headerGap, preferredTopOffset, bottomOffset, arrowHeight]);
    return position;
}
exports.useArrowPosition = useArrowPosition;
//# sourceMappingURL=use-arrow-position.js.map