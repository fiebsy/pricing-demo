"use strict";
/**
 * Tab Navigation
 *
 * Optimized tab navigation with CSS-first indicator positioning
 */
'use client';
/**
 * Tab Navigation
 *
 * Optimized tab navigation with CSS-first indicator positioning
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabNavigation = void 0;
const react_1 = require("react");
const cx_1 = require("@/components/utils/cx");
const use_tab_indicator_1 = require("../hooks/use-tab-indicator");
const TabNavigation = ({ sections, activeTab, onTabChange, isInitialMount, onInitialMountComplete, }) => {
    const scrollContainerRef = (0, react_1.useRef)(null);
    const activeIndex = sections.findIndex((s) => s.id === activeTab);
    const isScrollable = sections.length > 4;
    const [canScrollLeft, setCanScrollLeft] = (0, react_1.useState)(false);
    const [canScrollRight, setCanScrollRight] = (0, react_1.useState)(false);
    const { setTabRef, indicatorRef, containerRef } = (0, use_tab_indicator_1.useTabIndicator)({
        activeIndex,
        skipInitialAnimation: isInitialMount,
        onInitialized: onInitialMountComplete,
    });
    const updateScrollState = (0, react_1.useCallback)(() => {
        const container = scrollContainerRef.current;
        if (!container || !isScrollable)
            return;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setCanScrollLeft(scrollLeft > 2);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
    }, [isScrollable]);
    (0, react_1.useEffect)(() => {
        const activeButton = containerRef.current?.querySelector(`[data-tab-index="${activeIndex}"]`);
        const scrollContainer = scrollContainerRef.current;
        if (activeButton && scrollContainer && isScrollable) {
            const containerRect = scrollContainer.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();
            const fadePadding = 24;
            const isOutOfView = buttonRect.left < containerRect.left + fadePadding ||
                buttonRect.right > containerRect.right - fadePadding;
            if (isOutOfView) {
                const buttonCenter = activeButton.offsetLeft + activeButton.offsetWidth / 2;
                const containerCenter = scrollContainer.clientWidth / 2;
                const targetScroll = buttonCenter - containerCenter;
                scrollContainer.scrollTo({
                    left: targetScroll,
                    behavior: isInitialMount ? 'auto' : 'smooth',
                });
            }
        }
    }, [activeIndex, isInitialMount, isScrollable, containerRef]);
    (0, react_1.useEffect)(() => {
        updateScrollState();
    }, [updateScrollState, sections.length]);
    (0, react_1.useEffect)(() => {
        const container = scrollContainerRef.current;
        if (!container || !isScrollable)
            return;
        container.addEventListener('scroll', updateScrollState, { passive: true });
        return () => container.removeEventListener('scroll', updateScrollState);
    }, [isScrollable, updateScrollState]);
    const handleTabClick = (0, react_1.useCallback)((tabId, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        onTabChange(tabId);
    }, [onTabChange]);
    return (<div className="border-secondary bg-primary relative overflow-hidden rounded-t-xl border border-b-0">
      {isScrollable && (<>
          <div className={(0, cx_1.cx)('from-primary pointer-events-none absolute top-0 bottom-0 left-0 z-20 w-6 bg-gradient-to-r to-transparent transition-opacity duration-150', canScrollLeft ? 'opacity-100' : 'opacity-0')}/>
          <div className={(0, cx_1.cx)('from-primary pointer-events-none absolute top-0 right-0 bottom-0 z-20 w-6 bg-gradient-to-l to-transparent transition-opacity duration-150', canScrollRight ? 'opacity-100' : 'opacity-0')}/>
        </>)}

      <div ref={scrollContainerRef} className={(0, cx_1.cx)('relative', isScrollable && 'overflow-x-auto')} style={isScrollable ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : undefined}>
        <div ref={containerRef} className={(0, cx_1.cx)('relative flex items-center p-1.5', isScrollable ? 'inline-flex min-w-full justify-center gap-0.5 px-2' : 'gap-1')}>
          <div ref={indicatorRef} className="bg-secondary ring-secondary pointer-events-none absolute rounded-md ring-1" style={{
            top: '0.375rem',
            bottom: '0.375rem',
            left: 'var(--indicator-left, 0px)',
            width: 'var(--indicator-width, 0px)',
            transition: 'left 200ms ease-out, width 200ms ease-out',
        }}/>

          {sections.map((section, index) => (<button key={section.id} ref={setTabRef(index)} data-tab-index={index} onClick={(e) => handleTabClick(section.id, e)} onMouseDown={(e) => {
                e.preventDefault();
                handleTabClick(section.id, e);
            }} type="button" className={(0, cx_1.cx)('relative z-10 cursor-pointer touch-manipulation rounded-md font-mono font-medium tracking-wider whitespace-nowrap uppercase transition-colors select-none', isScrollable
                ? 'shrink-0 px-2.5 py-1.5 text-[10px]'
                : 'flex-1 px-3 py-2 text-center text-xs', activeTab === section.id
                ? 'text-primary'
                : 'text-secondary hover:text-primary bg-transparent')} style={{ WebkitTapHighlightColor: 'transparent' }}>
              {section.tabLabel}
            </button>))}
        </div>
      </div>
    </div>);
};
exports.TabNavigation = TabNavigation;
//# sourceMappingURL=tab-navigation.js.map