"use strict";
/**
 * StickyDataTable V2 - Column FLIP Animation Hook
 *
 * Implements the FLIP technique (First, Last, Invert, Play) for smooth
 * column add/remove animations. Uses Web Animations API (WAAPI) for
 * S-Tier performance (transform-only animations).
 *
 * @see https://aerotwist.com/blog/flip-your-animations/
 * @see /docs/frontend/ANIMATION-PREFERENCES.md (B-Tier FLIP pattern)
 *
 * @module hooks/use-column-flip
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefersReducedMotion = exports.supportsWAAPI = exports.useColumnFlip = void 0;
const react_1 = require("react");
const config_1 = require("../config");
// ============================================================================
// CONSTANTS
// ============================================================================
const DEFAULT_OPTIONS = {
    threshold: 2, // Minimum 2px movement to animate
    duration: config_1.ANIMATION_CONFIG.COLUMN_ANIMATION_DURATION,
    easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)', // --ease-standard from ANIMATION-PREFERENCES.md
};
// ============================================================================
// HOOK IMPLEMENTATION
// ============================================================================
/**
 * Hook for FLIP-based column animations
 *
 * Usage:
 * ```tsx
 * const { capturePositions, animateShifts } = useColumnFlip(containerRef)
 *
 * const toggleColumn = (key: string) => {
 *   capturePositions()           // FIRST: Record positions
 *   setVisibleColumns(...)       // DOM update
 *   requestAnimationFrame(() => {
 *     animateShifts()            // LAST + INVERT + PLAY
 *   })
 * }
 * ```
 */
function useColumnFlip(containerRef, options = {}) {
    const { threshold, duration, easing } = { ...DEFAULT_OPTIONS, ...options };
    // Store column positions from FIRST phase
    const positionsRef = (0, react_1.useRef)(new Map());
    const isAnimatingRef = (0, react_1.useRef)(false);
    /**
     * FIRST: Capture current positions of all columns
     * Call this BEFORE making DOM changes
     */
    const capturePositions = (0, react_1.useCallback)(() => {
        const container = containerRef.current;
        if (!container)
            return;
        const columns = container.querySelectorAll('[data-column-key]');
        const positions = new Map();
        columns.forEach((el) => {
            const key = el.getAttribute('data-column-key');
            if (!key)
                return;
            const rect = el.getBoundingClientRect();
            positions.set(key, {
                key,
                left: rect.left,
                width: rect.width,
            });
        });
        positionsRef.current = positions;
    }, [containerRef]);
    /**
     * LAST + INVERT + PLAY: Calculate deltas and animate
     * Call this AFTER DOM changes have been applied
     */
    const animateShifts = (0, react_1.useCallback)(() => {
        const container = containerRef.current;
        if (!container)
            return;
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion)
            return;
        const oldPositions = positionsRef.current;
        if (oldPositions.size === 0)
            return;
        isAnimatingRef.current = true;
        // Use RAF to ensure DOM has updated
        requestAnimationFrame(() => {
            const columns = container.querySelectorAll('[data-column-key]');
            const animations = [];
            columns.forEach((el) => {
                const key = el.getAttribute('data-column-key');
                if (!key)
                    return;
                const oldPos = oldPositions.get(key);
                if (!oldPos)
                    return; // New column, handled by enter animation
                const newRect = el.getBoundingClientRect();
                const deltaX = oldPos.left - newRect.left;
                // Only animate if movement exceeds threshold
                if (Math.abs(deltaX) <= threshold)
                    return;
                // Skip columns that are entering or leaving (they have their own animations)
                if (el.hasAttribute('data-column-entering') || el.hasAttribute('data-column-leaving')) {
                    return;
                }
                // INVERT + PLAY: Animate from old position to new position
                const animation = el.animate([
                    { transform: `translateX(${deltaX}px)` },
                    { transform: 'translateX(0)' },
                ], {
                    duration,
                    easing,
                    fill: 'none',
                });
                animations.push(animation);
            });
            // Clear positions and animating state when all animations complete
            if (animations.length > 0) {
                Promise.all(animations.map((a) => a.finished))
                    .then(() => {
                    isAnimatingRef.current = false;
                    positionsRef.current.clear();
                })
                    .catch(() => {
                    // Animation was cancelled, that's fine
                    isAnimatingRef.current = false;
                });
            }
            else {
                isAnimatingRef.current = false;
                positionsRef.current.clear();
            }
        });
    }, [containerRef, threshold, duration, easing]);
    return {
        capturePositions,
        animateShifts,
        get isAnimating() {
            return isAnimatingRef.current;
        },
    };
}
exports.useColumnFlip = useColumnFlip;
// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
/**
 * Check if the browser supports Web Animations API
 * All modern browsers support it, but good to have a fallback check
 */
function supportsWAAPI() {
    return typeof Element.prototype.animate === 'function';
}
exports.supportsWAAPI = supportsWAAPI;
/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
    if (typeof window === 'undefined')
        return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
exports.prefersReducedMotion = prefersReducedMotion;
//# sourceMappingURL=use-column-flip.js.map