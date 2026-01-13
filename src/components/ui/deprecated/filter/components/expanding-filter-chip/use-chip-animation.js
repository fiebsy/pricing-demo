"use strict";
/**
 * Chip Animation Hook
 *
 * Manages the expand/collapse animation state and timing for filter chips.
 * Handles reveal modes, opacity transitions, and animation completion tracking.
 *
 * @module base-ui/filter/components/expanding-filter-chip/use-chip-animation
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChipAnimation = void 0;
const react_1 = require("react");
const constants_1 = require("../../constants");
// ============================================================================
// Hook
// ============================================================================
/**
 * useChipAnimation - Manages chip expand/collapse animation
 *
 * @param options - Animation configuration options
 * @returns Animation state and handlers
 */
function useChipAnimation(options) {
    const { defaultExpanded = false, expanded: controlledExpanded, onExpandedChange, duration = constants_1.DURATION_EXPAND, revealMode = 'instant', opacityFadeRatio = constants_1.OPACITY_FADE_RATIO, } = options;
    const [internalExpanded, setInternalExpanded] = (0, react_1.useState)(defaultExpanded);
    const isExpanded = controlledExpanded ?? internalExpanded;
    // For 'sync' mode: track when width animation completes
    const [widthAnimationComplete, setWidthAnimationComplete] = (0, react_1.useState)(defaultExpanded);
    // Reset widthAnimationComplete when collapsing
    (0, react_1.useEffect)(() => {
        if (!isExpanded) {
            setWidthAnimationComplete(false);
        }
    }, [isExpanded]);
    // Auto-expand on mount after a frame
    (0, react_1.useEffect)(() => {
        if (defaultExpanded)
            return;
        const frame = requestAnimationFrame(() => {
            setInternalExpanded(true);
            onExpandedChange?.(true);
        });
        return () => cancelAnimationFrame(frame);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleToggle = (0, react_1.useCallback)(() => {
        const newValue = !isExpanded;
        setInternalExpanded(newValue);
        onExpandedChange?.(newValue);
    }, [isExpanded, onExpandedChange]);
    const handleTransitionEnd = (0, react_1.useCallback)((e) => {
        if (e.propertyName === 'width') {
            if (isExpanded) {
                setWidthAnimationComplete(true);
            }
        }
    }, [isExpanded]);
    const getContentOpacity = (0, react_1.useCallback)(() => {
        if (revealMode === 'none')
            return 1;
        if (!isExpanded)
            return 0;
        if (revealMode === 'sync')
            return widthAnimationComplete ? 1 : 0;
        return 1;
    }, [revealMode, isExpanded, widthAnimationComplete]);
    const getContentTransition = (0, react_1.useCallback)(() => {
        if (revealMode === 'none')
            return 'none';
        if (!isExpanded) {
            return `opacity ${constants_1.DURATION_COLLAPSE}ms ease-out`;
        }
        switch (revealMode) {
            case 'fade': {
                const fadeDelay = duration * (1 - opacityFadeRatio);
                const fadeDuration = duration * opacityFadeRatio;
                return `opacity ${fadeDuration}ms ${constants_1.EASING_EXPO_OUT} ${fadeDelay}ms`;
            }
            case 'delay':
                return `opacity 1ms linear ${duration}ms`;
            case 'sync':
                return 'opacity 50ms linear';
            case 'instant':
                return `opacity ${duration}ms ${constants_1.EASING_EXPO_OUT}`;
            default:
                return `opacity ${duration * opacityFadeRatio}ms ${constants_1.EASING_EXPO_OUT}`;
        }
    }, [revealMode, isExpanded, duration, opacityFadeRatio]);
    const getContainerTransition = (0, react_1.useCallback)(() => {
        if (isExpanded) {
            return `width ${duration}ms ${constants_1.EASING_EXPO_OUT}`;
        }
        return `width ${constants_1.DURATION_COLLAPSE}ms ease-out`;
    }, [isExpanded, duration]);
    return {
        isExpanded,
        widthAnimationComplete,
        handleToggle,
        handleTransitionEnd,
        getContentOpacity,
        getContentTransition,
        getContainerTransition,
    };
}
exports.useChipAnimation = useChipAnimation;
//# sourceMappingURL=use-chip-animation.js.map