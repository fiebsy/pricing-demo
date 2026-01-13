"use strict";
/**
 * useSkwircleMount Hook
 *
 * Smart FOUC (Flash of Unstyled Content) prevention.
 * Analyzes layout stability to determine the best mount strategy.
 */
'use client';
/**
 * useSkwircleMount Hook
 *
 * Smart FOUC (Flash of Unstyled Content) prevention.
 * Analyzes layout stability to determine the best mount strategy.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSkwircleMount = void 0;
const react_1 = require("react");
const utils_1 = require("../utils");
/**
 * Analyze layout stability based on CSS properties.
 *
 * @returns Layout stability level
 */
function analyzeLayoutStability(className, style, fillMode, initialDimensions) {
    const cn = className ?? '';
    const st = style ?? {};
    // Check for fixed dimensions
    const fixedW = (0, utils_1.parsePx)(st.width);
    const fixedH = (0, utils_1.parsePx)(st.height);
    const hasFixedSize = !!fixedW && !!fixedH;
    const hasInitialDims = !!initialDimensions && initialDimensions.width > 0 && initialDimensions.height > 0;
    // Fixed size or initial dimensions = stable
    if (hasFixedSize || hasInitialDims) {
        return 'stable';
    }
    // Check for fluid sizing patterns
    const isFluidWidth = typeof st.width === 'string' &&
        (st.width.includes('%') || st.width.includes('calc') || st.width === 'auto');
    const isFluidHeight = typeof st.height === 'string' &&
        (st.height.includes('%') || st.height.includes('calc') || st.height === 'auto');
    const isFlexGrow = st.flex !== undefined ||
        st.flexGrow !== undefined ||
        st.flexBasis !== undefined ||
        cn.includes('flex-1') ||
        cn.includes('grow') ||
        cn.includes('basis-') ||
        cn.includes('w-full');
    const isFluid = isFluidWidth ||
        isFluidHeight ||
        cn.includes('w-full') ||
        cn.includes('h-full') ||
        fillMode;
    // Fluid or flex = unstable
    if (isFluid || isFlexGrow) {
        return 'unstable';
    }
    // Otherwise uncertain (content-based sizing)
    return 'uncertain';
}
/**
 * Hook to determine mount behavior for FOUC prevention.
 *
 * Mount strategies:
 * - 'auto': Smart detection based on layout stability
 * - 'fade': Always fade in after measurement
 * - 'immediate': Show immediately (use with initialDimensions)
 */
function useSkwircleMount(options) {
    const { mountStrategy, hasMeasured, initialDimensions, className, style, fillMode, } = options;
    return (0, react_1.useMemo)(() => {
        // Determine effective strategy
        let effectiveStrategy = 'fade';
        if (mountStrategy === 'immediate') {
            effectiveStrategy = 'immediate';
        }
        else if (mountStrategy === 'fade') {
            effectiveStrategy = 'fade';
        }
        else {
            // 'auto' - analyze layout stability
            const stability = analyzeLayoutStability(className, style, fillMode, initialDimensions);
            switch (stability) {
                case 'stable':
                    // Fixed dimensions - show immediately
                    effectiveStrategy = 'immediate';
                    break;
                case 'unstable':
                    // Fluid layout - must fade to hide resize
                    effectiveStrategy = 'fade';
                    break;
                case 'uncertain':
                default:
                    // Content-based - fade to be safe
                    effectiveStrategy = 'fade';
                    break;
            }
        }
        // Compute visibility
        const shouldShow = effectiveStrategy === 'immediate' ? true : hasMeasured;
        return {
            shouldShow,
            opacity: shouldShow ? 1 : 0,
            transition: effectiveStrategy === 'fade' ? 'opacity 150ms ease-out' : undefined,
        };
    }, [mountStrategy, hasMeasured, initialDimensions, className, style, fillMode]);
}
exports.useSkwircleMount = useSkwircleMount;
//# sourceMappingURL=use-skwircle-mount.js.map