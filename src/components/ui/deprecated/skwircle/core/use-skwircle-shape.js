"use strict";
/**
 * useSkwircleShape Hook
 *
 * Generates SVG paths for skwircle shapes.
 */
'use client';
/**
 * useSkwircleShape Hook
 *
 * Generates SVG paths for skwircle shapes.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSkwircleShape = void 0;
const react_1 = require("react");
const utils_1 = require("../utils");
/**
 * Hook to generate SVG paths for skwircle shapes.
 *
 * @param dimensions - Element dimensions
 * @param borderWidth - Border thickness
 * @param outerBorderWidth - Outer border (ring) thickness
 * @param roundnessConfig - Roundness configuration
 */
function useSkwircleShape(dimensions, borderWidth, outerBorderWidth, roundnessConfig) {
    return (0, react_1.useMemo)(() => {
        if (dimensions.width === 0 || dimensions.height === 0) {
            return { background: '', border: '', outerBorder: '' };
        }
        // Calculate total offset including outer border
        const totalBorderOffset = borderWidth + (outerBorderWidth || 0);
        // Outer border path (outermost layer)
        const outerBorderPath = outerBorderWidth && outerBorderWidth > 0
            ? (0, utils_1.generateSkwirclePath)(dimensions.width + totalBorderOffset * 2, dimensions.height + totalBorderOffset * 2, roundnessConfig, 0)
            : '';
        // Main border path
        const outerWidth = dimensions.width + borderWidth * 2;
        const outerHeight = dimensions.height + borderWidth * 2;
        const borderPath = (0, utils_1.generateSkwirclePath)(outerWidth, outerHeight, roundnessConfig, 0);
        // Background path (innermost)
        const innerBorderRadius = Math.max(1, roundnessConfig.borderRadius - borderWidth);
        const innerConfig = {
            ...roundnessConfig,
            borderRadius: innerBorderRadius,
        };
        const backgroundPath = (0, utils_1.generateSkwirclePath)(dimensions.width, dimensions.height, innerConfig, 0);
        return { background: backgroundPath, border: borderPath, outerBorder: outerBorderPath };
    }, [dimensions, borderWidth, outerBorderWidth, roundnessConfig]);
}
exports.useSkwircleShape = useSkwircleShape;
//# sourceMappingURL=use-skwircle-shape.js.map