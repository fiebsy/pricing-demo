"use strict";
/**
 * Filter Chip - Animation Hook
 *
 * Manages expand/collapse animation state and timing.
 *
 * @module prod/base/filter/filter-chip/use-chip-animation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChipAnimation = void 0;
const react_1 = require("react");
const config_1 = require("./config");
function useChipAnimation(options) {
    const { defaultExpanded = false, expanded: controlledExpanded, onExpandedChange, duration = config_1.DURATION_EXPAND, revealMode = 'instant', opacityFadeRatio = config_1.OPACITY_FADE_RATIO, } = options;
    const [internalExpanded, setInternalExpanded] = (0, react_1.useState)(defaultExpanded);
    const isExpanded = controlledExpanded ?? internalExpanded;
    // Track when width animation completes (for 'sync' mode)
    const [widthComplete, setWidthComplete] = (0, react_1.useState)(defaultExpanded);
    // Reset when collapsing
    (0, react_1.useEffect)(() => {
        if (!isExpanded) {
            setWidthComplete(false);
        }
    }, [isExpanded]);
    // Auto-expand on mount
    (0, react_1.useEffect)(() => {
        if (defaultExpanded)
            return;
        const frame = requestAnimationFrame(() => {
            setInternalExpanded(true);
            onExpandedChange?.(true);
        });
        return () => cancelAnimationFrame(frame);
        // Only run on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const toggle = (0, react_1.useCallback)(() => {
        const next = !isExpanded;
        setInternalExpanded(next);
        onExpandedChange?.(next);
    }, [isExpanded, onExpandedChange]);
    const onTransitionEnd = (0, react_1.useCallback)((e) => {
        if (e.propertyName === 'width' && isExpanded) {
            setWidthComplete(true);
        }
    }, [isExpanded]);
    const getContentOpacity = (0, react_1.useCallback)(() => {
        if (revealMode === 'none')
            return 1;
        if (!isExpanded)
            return 0;
        if (revealMode === 'sync')
            return widthComplete ? 1 : 0;
        return 1;
    }, [revealMode, isExpanded, widthComplete]);
    const getContentTransition = (0, react_1.useCallback)(() => {
        if (revealMode === 'none')
            return 'none';
        if (!isExpanded) {
            return `opacity ${config_1.DURATION_COLLAPSE}ms ease-out`;
        }
        switch (revealMode) {
            case 'fade': {
                // Fade starts early, runs most of the duration
                const fadeDelay = duration * opacityFadeRatio;
                const fadeDuration = duration * (1 - opacityFadeRatio);
                return `opacity ${fadeDuration}ms ${config_1.EASING_EXPO_OUT} ${fadeDelay}ms`;
            }
            case 'delay':
                return `opacity 1ms linear ${duration}ms`;
            case 'sync':
                return 'opacity 50ms linear';
            case 'instant':
                return `opacity ${duration}ms ${config_1.EASING_EXPO_OUT}`;
            default:
                return `opacity ${duration * opacityFadeRatio}ms ${config_1.EASING_EXPO_OUT}`;
        }
    }, [revealMode, isExpanded, duration, opacityFadeRatio]);
    const getContainerTransition = (0, react_1.useCallback)(() => {
        if (isExpanded) {
            return `width ${duration}ms ${config_1.EASING_EXPO_OUT}`;
        }
        return `width ${config_1.DURATION_COLLAPSE}ms ease-out`;
    }, [isExpanded, duration]);
    return {
        isExpanded,
        widthComplete,
        toggle,
        onTransitionEnd,
        getContentOpacity,
        getContentTransition,
        getContainerTransition,
    };
}
exports.useChipAnimation = useChipAnimation;
//# sourceMappingURL=use-chip-animation.js.map