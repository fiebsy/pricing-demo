"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = void 0;
const cx_1 = require("@/components/utils/cx");
/**
 * Skeleton Component
 *
 * A lightweight skeleton loader using semantic tokens for consistent
 * loading states across the V2 design system.
 *
 * Features:
 * - Uses semantic tokens (bg-secondary) for automatic dark mode support
 * - Three variants: text, rectangle, circle
 * - Configurable dimensions
 * - Optional animation
 *
 * @example
 * ```tsx
 * // Text skeleton (default)
 * <Skeleton width="70%" />
 *
 * // Badge skeleton
 * <Skeleton variant="rectangle" width={80} height={24} className="rounded-full" />
 *
 * // Avatar skeleton
 * <Skeleton variant="circle" width={40} height={40} />
 *
 * // Right-aligned number
 * <Skeleton width={80} className="ml-auto" />
 * ```
 */
function Skeleton({ className, variant = 'text', width, height, animate = true }) {
    const baseStyles = (0, cx_1.cx)(
    // Use semantic token for background - adapts to dark mode automatically
    'bg-secondary', 
    // Animate with pulse effect
    animate && 'animate-pulse', 
    // Variant-specific styling
    variant === 'circle' && 'rounded-full', variant === 'rectangle' && 'rounded-sm', variant === 'text' && 'rounded h-4', // Default text line height
    className);
    const inlineStyles = {};
    if (width !== undefined) {
        inlineStyles.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
        inlineStyles.height = typeof height === 'number' ? `${height}px` : height;
    }
    return (<div className={baseStyles} style={Object.keys(inlineStyles).length > 0 ? inlineStyles : undefined} aria-hidden="true"/>);
}
exports.Skeleton = Skeleton;
//# sourceMappingURL=skeleton.js.map