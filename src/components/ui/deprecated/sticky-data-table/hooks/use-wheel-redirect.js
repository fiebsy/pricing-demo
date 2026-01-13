"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWheelRedirect = void 0;
/**
 * StickyDataTable V2 - Wheel Redirect Hook
 *
 * Redirects vertical scroll events on the table body to the window.
 * Prevents scroll trapping when table has horizontal overflow.
 *
 * @module hooks/use-wheel-redirect
 */
const react_1 = require("react");
/**
 * Hook for redirecting vertical scroll to window
 *
 * When a user scrolls vertically over the table body (which only
 * scrolls horizontally), this hook captures the wheel event and
 * redirects it to the window for page scrolling.
 *
 * Features:
 * - Only redirects vertical scroll (deltaY > deltaX)
 * - Prevents default to avoid conflicts
 * - Can be disabled for special use cases
 */
function useWheelRedirect({ bodyRef, enabled = true, }) {
    (0, react_1.useEffect)(() => {
        if (!enabled)
            return;
        const body = bodyRef.current;
        if (!body)
            return;
        const handleWheel = (e) => {
            // Only redirect if scrolling more vertically than horizontally
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                // CRITICAL: preventDefault FIRST to stop browser's default scroll handling
                // This must happen before window.scrollBy() to prevent conflicts with
                // horizontally-scrollable containers that try to capture wheel events
                e.preventDefault();
                e.stopPropagation();
                // Now redirect vertical scroll to the window
                window.scrollBy({
                    top: e.deltaY,
                    behavior: 'instant',
                });
            }
        };
        // Use passive: false because we need to call preventDefault
        body.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            body.removeEventListener('wheel', handleWheel);
        };
    }, [bodyRef, enabled]);
}
exports.useWheelRedirect = useWheelRedirect;
//# sourceMappingURL=use-wheel-redirect.js.map