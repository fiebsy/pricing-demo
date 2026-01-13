"use strict";
/**
 * Skwircle Shadow Component
 *
 * Renders shadow using duplicate SVG method (most reliable cross-browser).
 */
'use client';
/**
 * Skwircle Shadow Component
 *
 * Renders shadow using duplicate SVG method (most reliable cross-browser).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkwircleShadow = void 0;
const react_1 = require("react");
/**
 * Renders a duplicate SVG for shadow effect.
 * This method avoids clipping issues that occur with CSS/filter shadows.
 */
const SkwircleShadow = ({ dimensions, borderWidth, shadowConfig, path, }) => {
    if (!path || shadowConfig.opacity <= 0)
        return null;
    const { offsetX, offsetY, blur, color, opacity } = shadowConfig;
    const svgWidth = dimensions.width + borderWidth * 2;
    const svgHeight = dimensions.height + borderWidth * 2;
    // Calculate expanded dimensions to accommodate blur
    const expandedWidth = svgWidth + blur * 2;
    const expandedHeight = svgHeight + blur * 2;
    return (<svg width={expandedWidth} height={expandedHeight} viewBox={`${-blur} ${-blur} ${expandedWidth} ${expandedHeight}`} style={{
            position: 'absolute',
            top: offsetY - blur,
            left: offsetX - blur,
            pointerEvents: 'none',
            zIndex: -1,
        }}>
      <defs>
        <filter id="shadow-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur / 2}/>
        </filter>
      </defs>
      <path d={path} fill={color} fillOpacity={opacity} filter="url(#shadow-blur)"/>
    </svg>);
};
exports.SkwircleShadow = SkwircleShadow;
//# sourceMappingURL=skwircle-shadow.js.map