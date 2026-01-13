"use strict";
/**
 * Skwircle SVG Component
 *
 * Renders the main SVG shape with background, border, and gradients.
 */
'use client';
/**
 * Skwircle SVG Component
 *
 * Renders the main SVG shape with background, border, and gradients.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkwircleSvg = void 0;
const react_1 = require("react");
const skwircle_gradients_1 = require("./skwircle-gradients");
/**
 * Renders the main Skwircle SVG shape.
 */
const SkwircleSvg = ({ dimensions, borderWidth, outerBorderWidth, outerBorderOpacity, paths, bgColor, borderColor, outerBorderColor, borderGradient, backgroundGradient, overflow, }) => {
    const instanceId = (0, react_1.useId)().replace(/:/g, '-');
    const totalBorderOffset = borderWidth + outerBorderWidth;
    // Don't render if dimensions aren't ready
    if (dimensions.width === 0 || dimensions.height === 0) {
        return null;
    }
    const svgWidth = dimensions.width + totalBorderOffset * 2;
    const svgHeight = dimensions.height + totalBorderOffset * 2;
    return (<svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
        }}>
      <defs>
        {/* ClipPath for overflow control */}
        {overflow !== 'visible' && paths.border && (<clipPath id={`clip-${instanceId}`}>
            <path d={paths.border} transform={`translate(${outerBorderWidth}, ${outerBorderWidth})`}/>
          </clipPath>)}

        {/* Gradient definitions */}
        <skwircle_gradients_1.SkwircleGradients instanceId={instanceId} borderGradient={borderGradient} backgroundGradient={backgroundGradient}/>
      </defs>

      {/* Shape layers */}
      <g>
        {/* Outer Border (ring) - outermost layer */}
        {outerBorderWidth > 0 && paths.outerBorder && outerBorderColor && (<path d={paths.outerBorder} style={{
                fill: outerBorderColor,
                fillOpacity: outerBorderOpacity ?? 1,
                transition: 'fill 100ms linear, fill-opacity 100ms linear'
            }}/>)}

        {/* Main Border */}
        {borderWidth > 0 && (<g transform={`translate(${outerBorderWidth}, ${outerBorderWidth})`}>
            <path d={paths.border} style={{
                fill: borderGradient ? `url(#border-gradient-${instanceId})` : borderColor,
                transition: 'fill 100ms linear'
            }}/>
          </g>)}

        {/* Background - Base solid color */}
        <g transform={`translate(${totalBorderOffset}, ${totalBorderOffset})`}>
          <path d={paths.background} style={{
            fill: bgColor,
            transition: 'fill 100ms linear'
        }}/>
        </g>

        {/* Background Gradient Overlay */}
        {backgroundGradient && (<g transform={`translate(${totalBorderOffset}, ${totalBorderOffset})`}>
            <path d={paths.background} fill={`url(#background-gradient-${instanceId})`} style={{ transition: 'fill 100ms linear' }}/>
          </g>)}
      </g>
    </svg>);
};
exports.SkwircleSvg = SkwircleSvg;
//# sourceMappingURL=skwircle-svg.js.map