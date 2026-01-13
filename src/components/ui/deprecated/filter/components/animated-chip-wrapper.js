"use strict";
/**
 * Animated Chip Wrapper
 *
 * Wraps filter chips to provide a smooth fade-in (and optional scale) animation
 * when the chip appears. Uses requestAnimationFrame for optimal performance.
 *
 * @module base-ui/filter/components/animated-chip-wrapper
 */
'use client';
/**
 * Animated Chip Wrapper
 *
 * Wraps filter chips to provide a smooth fade-in (and optional scale) animation
 * when the chip appears. Uses requestAnimationFrame for optimal performance.
 *
 * @module base-ui/filter/components/animated-chip-wrapper
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedChipWrapper = void 0;
const react_1 = require("react");
const constants_1 = require("../constants");
/**
 * AnimatedChipWrapper - Provides fade-in animation for filter chips
 *
 * Wraps any content and animates it in with opacity (and optionally scale).
 * The animation triggers on mount using requestAnimationFrame for a
 * smooth one-frame delay that ensures the transition plays.
 */
const AnimatedChipWrapper = ({ duration = constants_1.DURATION_FADE_IN, noScale = true, children, }) => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const frame = requestAnimationFrame(() => {
            setIsVisible(true);
        });
        return () => cancelAnimationFrame(frame);
    }, []);
    return (<div style={{
            transition: noScale
                ? `opacity ${duration}ms ${constants_1.EASING_EXPO_OUT}`
                : `opacity ${duration}ms ${constants_1.EASING_EXPO_OUT}, transform ${duration}ms ${constants_1.EASING_EXPO_OUT}`,
            transformOrigin: 'center center',
            opacity: isVisible ? 1 : 0,
            transform: noScale ? 'none' : (isVisible ? 'scale(1)' : 'scale(0.85)'),
            display: 'inline-flex',
            alignItems: 'center',
        }}>
      {children}
    </div>);
};
exports.AnimatedChipWrapper = AnimatedChipWrapper;
//# sourceMappingURL=animated-chip-wrapper.js.map