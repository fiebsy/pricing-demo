"use strict";
/**
 * Use Tab Indicator
 *
 * Manages tab indicator position using CSS custom properties
 */
'use client';
/**
 * Use Tab Indicator
 *
 * Manages tab indicator position using CSS custom properties
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTabIndicator = void 0;
const react_1 = require("react");
const useTabIndicator = ({ activeIndex, skipInitialAnimation = true, onInitialized, }) => {
    const [state, setState] = (0, react_1.useState)({
        left: 0,
        width: 0,
        isInitialized: false,
    });
    const tabRefs = (0, react_1.useRef)([]);
    const indicatorRef = (0, react_1.useRef)(null);
    const containerRef = (0, react_1.useRef)(null);
    const isInitializedRef = (0, react_1.useRef)(false);
    const setTabRef = (0, react_1.useCallback)((index) => (el) => {
        tabRefs.current[index] = el;
    }, []);
    const updateIndicatorPosition = (0, react_1.useCallback)(() => {
        const activeTab = tabRefs.current[activeIndex];
        const container = containerRef.current;
        const indicator = indicatorRef.current;
        if (!activeTab || !container || !indicator)
            return;
        const left = activeTab.offsetLeft;
        const width = activeTab.offsetWidth;
        if (!isInitializedRef.current && skipInitialAnimation) {
            indicator.style.transition = 'none';
            indicator.style.setProperty('--indicator-left', `${left}px`);
            indicator.style.setProperty('--indicator-width', `${width}px`);
            indicator.offsetHeight;
            indicator.style.transition = '';
            isInitializedRef.current = true;
            onInitialized?.();
        }
        else {
            indicator.style.setProperty('--indicator-left', `${left}px`);
            indicator.style.setProperty('--indicator-width', `${width}px`);
        }
        setState({
            left,
            width,
            isInitialized: true,
        });
    }, [activeIndex, skipInitialAnimation, onInitialized]);
    (0, react_1.useEffect)(() => {
        updateIndicatorPosition();
    }, [updateIndicatorPosition]);
    (0, react_1.useEffect)(() => {
        const handleResize = () => {
            updateIndicatorPosition();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [updateIndicatorPosition]);
    return {
        state,
        setTabRef,
        indicatorRef,
        containerRef,
        recalculate: updateIndicatorPosition,
    };
};
exports.useTabIndicator = useTabIndicator;
//# sourceMappingURL=use-tab-indicator.js.map