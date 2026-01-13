"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTableScrollState = void 0;
const react_1 = require("react");
const config_1 = require("../config");
function useTableScrollState({ headerScrollRef, bodyScrollRef }) {
    const [scrollState, setScrollState] = (0, react_1.useState)({
        scrollLeft: 0,
        scrollWidth: 0,
        clientWidth: 0,
        canScrollLeft: false,
        canScrollRight: false,
        hasOverflow: false,
        showScrollIndicator: false,
    });
    const rafIdRef = (0, react_1.useRef)(null);
    const tickingRef = (0, react_1.useRef)(false);
    const calculateScrollState = (0, react_1.useCallback)((element) => {
        const scrollLeft = element.scrollLeft;
        const scrollWidth = element.scrollWidth;
        const clientWidth = element.clientWidth;
        const hasOverflow = scrollWidth > clientWidth;
        const canScrollRight = scrollLeft + clientWidth < scrollWidth - config_1.TABLE_CONFIG.SCROLL_THRESHOLD;
        const canScrollLeft = scrollLeft > 0;
        return {
            scrollLeft,
            scrollWidth,
            clientWidth,
            canScrollLeft,
            canScrollRight,
            hasOverflow,
            showScrollIndicator: hasOverflow && canScrollRight,
        };
    }, []);
    const updateScrollState = (0, react_1.useCallback)(() => {
        const headerScroll = headerScrollRef.current;
        if (!headerScroll)
            return;
        if (!tickingRef.current) {
            rafIdRef.current = requestAnimationFrame(() => {
                const newState = calculateScrollState(headerScroll);
                setScrollState((prev) => {
                    if (prev.scrollLeft === newState.scrollLeft &&
                        prev.canScrollLeft === newState.canScrollLeft &&
                        prev.canScrollRight === newState.canScrollRight &&
                        prev.hasOverflow === newState.hasOverflow &&
                        prev.showScrollIndicator === newState.showScrollIndicator) {
                        return prev;
                    }
                    return newState;
                });
                tickingRef.current = false;
            });
            tickingRef.current = true;
        }
    }, [headerScrollRef, calculateScrollState]);
    (0, react_1.useEffect)(() => {
        const headerScroll = headerScrollRef.current;
        const bodyScroll = bodyScrollRef.current;
        if (!headerScroll || !bodyScroll)
            return;
        const handleHeaderScroll = () => {
            if (bodyScroll.scrollLeft !== headerScroll.scrollLeft) {
                bodyScroll.scrollLeft = headerScroll.scrollLeft;
            }
            updateScrollState();
        };
        const handleBodyScroll = () => {
            if (headerScroll.scrollLeft !== bodyScroll.scrollLeft) {
                headerScroll.scrollLeft = bodyScroll.scrollLeft;
            }
            updateScrollState();
        };
        const resizeObserver = new ResizeObserver(() => {
            updateScrollState();
        });
        resizeObserver.observe(headerScroll);
        resizeObserver.observe(bodyScroll);
        headerScroll.addEventListener('scroll', handleHeaderScroll, { passive: true });
        bodyScroll.addEventListener('scroll', handleBodyScroll, { passive: true });
        updateScrollState();
        return () => {
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
            headerScroll.removeEventListener('scroll', handleHeaderScroll);
            bodyScroll.removeEventListener('scroll', handleBodyScroll);
            resizeObserver.disconnect();
        };
    }, [headerScrollRef, bodyScrollRef, updateScrollState]);
    const handleScrollLeft = (0, react_1.useCallback)(() => {
        if (headerScrollRef.current) {
            headerScrollRef.current.scrollBy({ left: -config_1.TABLE_CONFIG.SCROLL_AMOUNT, behavior: 'smooth' });
        }
    }, [headerScrollRef]);
    const handleScrollRight = (0, react_1.useCallback)(() => {
        if (headerScrollRef.current) {
            headerScrollRef.current.scrollBy({ left: config_1.TABLE_CONFIG.SCROLL_AMOUNT, behavior: 'smooth' });
        }
    }, [headerScrollRef]);
    return {
        ...scrollState,
        handleScrollLeft,
        handleScrollRight,
    };
}
exports.useTableScrollState = useTableScrollState;
//# sourceMappingURL=use-table-scroll-state.js.map