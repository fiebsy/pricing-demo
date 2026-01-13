"use strict";
/**
 * Skwircle Path Generator
 *
 * Generates SVG paths for iOS-style superellipse shapes.
 * Ported from legacy Squircle with simplified API.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSkwirclePath = void 0;
/**
 * Generate an SVG path for a superellipse (squircle) shape.
 *
 * @param width - Total width of the shape
 * @param height - Total height of the shape
 * @param config - Roundness configuration
 * @param offset - Offset for border layers (default: 0)
 * @returns SVG path string
 */
const generateSkwirclePath = (width, height, config, offset = 0) => {
    const w = width - offset * 2;
    const h = height - offset * 2;
    const { smoothing, borderRadius, pointsPerCorner } = config;
    // Calculate the actual radius to use (bounded by the smaller dimension)
    const maxRadius = Math.min(w, h) / 2;
    const r = Math.min(borderRadius, maxRadius);
    // Rounding helper for cleaner SVG paths
    const round = (num) => Math.round(num * 1000) / 1000;
    // Generate corner points for a superellipse corner
    const generateCornerPoints = (centerX, centerY, radiusX, radiusY, startAngle, endAngle) => {
        let points = '';
        const numPoints = pointsPerCorner;
        const angleStep = (endAngle - startAngle) / (numPoints - 1);
        // Exponent for superellipse formula (higher = more square-like)
        const exponent = smoothing;
        for (let i = 0; i < numPoints; i++) {
            const angle = startAngle + angleStep * i;
            const cosAngle = Math.cos(angle);
            const sinAngle = Math.sin(angle);
            // Superellipse formula for iOS-style rounded corners
            const factor = Math.pow(Math.pow(Math.abs(cosAngle), exponent) + Math.pow(Math.abs(sinAngle), exponent), 1 / exponent);
            const x = centerX + (radiusX * cosAngle) / factor;
            const y = centerY + (radiusY * sinAngle) / factor;
            points += `L ${round(x + offset)},${round(y + offset)} `;
        }
        return points;
    };
    // Build the path using corner points
    const path = [
        // Start at top left, after the corner curve
        `M ${round(r + offset)},${round(offset)}`,
        // Line to start of top right corner
        `L ${round(w - r + offset)},${round(offset)}`,
        // Top right corner
        generateCornerPoints(w - r, r, r, r, -Math.PI / 2, 0),
        // Line to start of bottom right corner
        `L ${round(w + offset)},${round(h - r + offset)}`,
        // Bottom right corner
        generateCornerPoints(w - r, h - r, r, r, 0, Math.PI / 2),
        // Line to start of bottom left corner
        `L ${round(r + offset)},${round(h + offset)}`,
        // Bottom left corner
        generateCornerPoints(r, h - r, r, r, Math.PI / 2, Math.PI),
        // Line to start of top left corner
        `L ${round(offset)},${round(r + offset)}`,
        // Top left corner
        generateCornerPoints(r, r, r, r, Math.PI, (3 * Math.PI) / 2),
        // Close the path
        'Z',
    ].join(' ');
    return path;
};
exports.generateSkwirclePath = generateSkwirclePath;
//# sourceMappingURL=path-generator.js.map