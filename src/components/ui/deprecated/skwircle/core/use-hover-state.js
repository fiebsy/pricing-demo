"use strict";
/**
 * useHoverState Hook
 *
 * Manages hover state with callback support.
 */
'use client';
/**
 * useHoverState Hook
 *
 * Manages hover state with callback support.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHoverState = void 0;
const react_1 = require("react");
/**
 * Hook to manage hover state.
 *
 * @param onMouseEnter - Optional callback for mouse enter
 * @param onMouseLeave - Optional callback for mouse leave
 */
function useHoverState(onMouseEnter, onMouseLeave) {
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    const handleMouseEnter = (0, react_1.useCallback)((e) => {
        setIsHovered(true);
        onMouseEnter?.(e);
    }, [onMouseEnter]);
    const handleMouseLeave = (0, react_1.useCallback)((e) => {
        setIsHovered(false);
        onMouseLeave?.(e);
    }, [onMouseLeave]);
    return { isHovered, handleMouseEnter, handleMouseLeave };
}
exports.useHoverState = useHoverState;
//# sourceMappingURL=use-hover-state.js.map