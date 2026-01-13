"use strict";
/**
 * Chip Base Primitive
 *
 * Base container for filter chips with consistent styling.
 * Provides the foundation for ExpandingFilterChip and other chip variants.
 *
 * @module base-ui/filter/primitives/chip-base
 */
'use client';
/**
 * Chip Base Primitive
 *
 * Base container for filter chips with consistent styling.
 * Provides the foundation for ExpandingFilterChip and other chip variants.
 *
 * @module base-ui/filter/primitives/chip-base
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChipBase = void 0;
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const constants_1 = require("../constants");
// ============================================================================
// Component
// ============================================================================
/**
 * ChipBase - Foundation container for filter chips
 *
 * Provides consistent styling for:
 * - Background and border
 * - Size presets (height, padding)
 * - Border radius presets
 * - Motion-reduce support
 */
exports.ChipBase = (0, react_1.forwardRef)(({ size = 'default', rounded = 'default', isExpanded = true, width, transition, className, style, children, ...props }, ref) => {
    const sizeConfig = constants_1.SIZE_CONFIG[size];
    const roundingClass = constants_1.ROUNDING_CONFIG[rounded];
    return (<div ref={ref} className={(0, utils_1.cn)('relative overflow-hidden', 'bg-primary', 'border border-primary', roundingClass, 'motion-reduce:transition-none', !isExpanded && 'cursor-pointer', className)} style={{
            width: width ?? 'auto',
            height: sizeConfig.height,
            transition,
            ...style,
        }} {...props}>
        {children}
      </div>);
});
exports.ChipBase.displayName = 'ChipBase';
//# sourceMappingURL=chip-base.js.map