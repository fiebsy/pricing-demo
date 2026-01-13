"use strict";
/**
 * Skwircle Color Resolver
 *
 * Resolves semantic color tokens to CSS values.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePx = exports.resolveColor = void 0;
const constants_1 = require("../config/constants");
/**
 * Resolve a semantic color token to its CSS value.
 *
 * @param color - Semantic token (e.g., 'background-primary') or CSS color
 * @returns CSS color value
 */
const resolveColor = (color) => {
    if (!color)
        return 'transparent';
    return constants_1.V2_SEMANTIC_COLORS[color] || color;
};
exports.resolveColor = resolveColor;
/**
 * Parse a pixel value from CSS width/height.
 *
 * @param value - CSS value (number, 'Npx', or string)
 * @returns Parsed number or null
 */
const parsePx = (value) => {
    if (typeof value === 'number' && Number.isFinite(value))
        return value;
    if (typeof value !== 'string')
        return null;
    const trimmed = value.trim();
    if (trimmed.endsWith('px')) {
        const n = Number(trimmed.slice(0, -2));
        return Number.isFinite(n) ? n : null;
    }
    const n = Number(trimmed);
    return Number.isFinite(n) ? n : null;
};
exports.parsePx = parsePx;
//# sourceMappingURL=color-resolver.js.map