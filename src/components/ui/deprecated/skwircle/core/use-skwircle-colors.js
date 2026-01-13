"use strict";
/**
 * useSkwircleColors Hook
 *
 * Resolves and manages color values with hover states.
 */
'use client';
/**
 * useSkwircleColors Hook
 *
 * Resolves and manages color values with hover states.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSkwircleColors = void 0;
const react_1 = require("react");
const utils_1 = require("../utils");
/**
 * Hook to resolve color values with hover state support.
 *
 * @param colors - Color configuration
 * @param isHovered - Whether element is hovered
 */
function useSkwircleColors(colors, isHovered) {
    return (0, react_1.useMemo)(() => ({
        bgColor: (0, utils_1.resolveColor)(isHovered && colors.backgroundColorHover ? colors.backgroundColorHover : colors.backgroundColor),
        borderColor: (0, utils_1.resolveColor)(isHovered && colors.borderColorHover ? colors.borderColorHover : colors.borderColor),
        outerBorderColor: colors.outerBorderColor ? (0, utils_1.resolveColor)(colors.outerBorderColor) : undefined,
        shadowColor: (0, utils_1.resolveColor)(colors.shadowColor ?? 'black'),
    }), [colors, isHovered]);
}
exports.useSkwircleColors = useSkwircleColors;
//# sourceMappingURL=use-skwircle-colors.js.map