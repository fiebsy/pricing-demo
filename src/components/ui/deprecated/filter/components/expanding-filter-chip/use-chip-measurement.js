"use strict";
/**
 * Chip Measurement Hook
 *
 * Measures the collapsed and expanded widths of a chip using
 * hidden measurement elements. This allows for smooth width
 * animations without layout thrashing.
 *
 * @module base-ui/filter/components/expanding-filter-chip/use-chip-measurement
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChipMeasurement = void 0;
const react_1 = require("react");
/**
 * useChipMeasurement - Measures chip widths for animation
 *
 * @param deps - Dependencies that trigger re-measurement
 * @returns Measured widths and refs for measurement elements
 */
function useChipMeasurement(deps) {
    const measureRef = (0, react_1.useRef)(null);
    const iconLabelMeasureRef = (0, react_1.useRef)(null);
    const [collapsedWidth, setCollapsedWidth] = (0, react_1.useState)(0);
    const [expandedWidth, setExpandedWidth] = (0, react_1.useState)(0);
    (0, react_1.useLayoutEffect)(() => {
        if (measureRef.current) {
            setExpandedWidth(measureRef.current.offsetWidth);
        }
        if (iconLabelMeasureRef.current) {
            setCollapsedWidth(iconLabelMeasureRef.current.offsetWidth);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    return {
        collapsedWidth,
        expandedWidth,
        refs: {
            measureRef,
            iconLabelMeasureRef,
        },
    };
}
exports.useChipMeasurement = useChipMeasurement;
//# sourceMappingURL=use-chip-measurement.js.map