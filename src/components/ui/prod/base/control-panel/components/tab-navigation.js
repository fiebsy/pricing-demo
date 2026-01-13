"use strict";
// =============================================================================
// Tab Navigation Components
// =============================================================================
// Components for the tab navigation bar:
// - ScrollableTabList: Wrapper with overflow handling and fade indicators
// - TabTrigger: Visual content for tab buttons
// - MinimizeButton: Panel minimize control
// =============================================================================
'use client';
// =============================================================================
// Tab Navigation Components
// =============================================================================
// Components for the tab navigation bar:
// - ScrollableTabList: Wrapper with overflow handling and fade indicators
// - TabTrigger: Visual content for tab buttons
// - MinimizeButton: Panel minimize control
// =============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimizeButton = exports.TabTrigger = exports.ScrollableTabList = void 0;
const react_1 = require("react");
const MinusSignIcon_1 = require("@hugeicons-pro/core-stroke-rounded/MinusSignIcon");
const cx_1 = require("@/components/utils/cx");
const icon_1 = require("@/components/ui/prod/base/icon");
function ScrollableTabList({ children, activeTabId, isScrollable }) {
    const scrollRef = (0, react_1.useRef)(null);
    const [scrollState, setScrollState] = (0, react_1.useState)({ canScrollLeft: false, canScrollRight: false });
    // Update scroll state for fade indicators
    const updateScrollState = (0, react_1.useCallback)(() => {
        const el = scrollRef.current;
        if (!el)
            return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        setScrollState({
            canScrollLeft: scrollLeft > 2,
            canScrollRight: scrollLeft < scrollWidth - clientWidth - 2,
        });
    }, []);
    // Setup scroll listeners
    (0, react_1.useEffect)(() => {
        const el = scrollRef.current;
        if (!el)
            return;
        updateScrollState();
        el.addEventListener('scroll', updateScrollState, { passive: true });
        const resizeObserver = new ResizeObserver(updateScrollState);
        resizeObserver.observe(el);
        return () => {
            el.removeEventListener('scroll', updateScrollState);
            resizeObserver.disconnect();
        };
    }, [updateScrollState]);
    // Scroll active tab into view
    (0, react_1.useEffect)(() => {
        const el = scrollRef.current;
        if (!el || !isScrollable)
            return;
        // Use requestAnimationFrame to ensure DOM is updated
        requestAnimationFrame(() => {
            const activeTab = el.querySelector(`[data-key="${activeTabId}"]`);
            if (!activeTab)
                return;
            const containerRect = el.getBoundingClientRect();
            const tabRect = activeTab.getBoundingClientRect();
            // Check if tab is outside visible area
            if (tabRect.left < containerRect.left + 8) {
                el.scrollBy({ left: tabRect.left - containerRect.left - 16, behavior: 'smooth' });
            }
            else if (tabRect.right > containerRect.right - 8) {
                el.scrollBy({ left: tabRect.right - containerRect.right + 16, behavior: 'smooth' });
            }
        });
    }, [activeTabId, isScrollable]);
    return (<div className="relative flex min-w-0 flex-1">
      {/* Left fade indicator */}
      {isScrollable && (<div aria-hidden="true" className={(0, cx_1.cx)('pointer-events-none absolute left-0 top-0 z-10 h-full w-5', 'bg-gradient-to-r from-[var(--bg-quaternary)] to-transparent', 'transition-opacity duration-150', 'motion-reduce:transition-none', scrollState.canScrollLeft ? 'opacity-100' : 'opacity-0')}/>)}

      {/* Scrollable container */}
      <div ref={scrollRef} className={(0, cx_1.cx)('flex min-w-0 flex-1 items-center gap-0.5', isScrollable && 'overflow-x-auto scrollbar-hide')}>
        {children}
      </div>

      {/* Right fade indicator */}
      {isScrollable && (<div aria-hidden="true" className={(0, cx_1.cx)('pointer-events-none absolute right-0 top-0 z-10 h-full w-5', 'bg-gradient-to-l from-[var(--bg-quaternary)] to-transparent', 'transition-opacity duration-150', 'motion-reduce:transition-none', scrollState.canScrollRight ? 'opacity-100' : 'opacity-0')}/>)}
    </div>);
}
exports.ScrollableTabList = ScrollableTabList;
function TabTrigger({ label, isSelected, isScrollable }) {
    return (<span className={(0, cx_1.cx)('block rounded px-2 py-1.5 font-mono font-medium tracking-wider whitespace-nowrap uppercase', 'transition-colors motion-reduce:transition-none', isScrollable ? 'shrink-0 text-[9px]' : 'text-center text-[10px]', isSelected
            ? 'bg-secondary text-primary'
            : 'text-tertiary group-hover:text-primary bg-transparent')}>
      {label}
    </span>);
}
exports.TabTrigger = TabTrigger;
function MinimizeButton({ onClick }) {
    return (<button type="button" onClick={onClick} className={(0, cx_1.cx)('text-tertiary hover:text-secondary ml-1 shrink-0 rounded p-1.5', 'transition-colors hover:bg-secondary', 'motion-reduce:transition-none')} aria-label="Minimize panel">
      <icon_1.HugeIcon icon={MinusSignIcon_1.default} size={12} strokeWidth={2}/>
    </button>);
}
exports.MinimizeButton = MinimizeButton;
//# sourceMappingURL=tab-navigation.js.map