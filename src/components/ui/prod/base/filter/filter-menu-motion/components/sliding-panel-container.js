"use strict";
/**
 * SlidingPanelContainer - Animated height and slide container
 *
 * Manages the complex height animation and horizontal slide
 * for panel transitions. Supports two transition modes:
 * - 'slide': Both panels in a strip, slides horizontally
 * - 'popLayout': AnimatePresence with popLayout for exit animations
 *
 * @module prod/base/filter/filter-menu-motion/components/sliding-panel-container
 */
'use client';
/**
 * SlidingPanelContainer - Animated height and slide container
 *
 * Manages the complex height animation and horizontal slide
 * for panel transitions. Supports two transition modes:
 * - 'slide': Both panels in a strip, slides horizontally
 * - 'popLayout': AnimatePresence with popLayout for exit animations
 *
 * @module prod/base/filter/filter-menu-motion/components/sliding-panel-container
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlidingPanelContainer = void 0;
const react_1 = require("react");
const react_2 = require("motion/react");
const animation_config_1 = require("../animation-config");
// ============================================================================
// HEIGHT MEASUREMENT HOOK
// ============================================================================
function useHeightMeasurement(isOpen, inSubmenu, submenuKey, debug) {
    const rootRef = (0, react_1.useRef)(null);
    const submenuRef = (0, react_1.useRef)(null);
    const [rootHeight, setRootHeight] = (0, react_1.useState)('auto');
    const [submenuHeight, setSubmenuHeight] = (0, react_1.useState)('auto');
    const measurePanels = (0, react_1.useCallback)(() => {
        if (rootRef.current) {
            const h = rootRef.current.scrollHeight;
            if (debug)
                console.log('[Panel] 📏 Root height:', h);
            setRootHeight(h);
        }
        if (submenuRef.current) {
            const h = submenuRef.current.scrollHeight;
            if (debug)
                console.log('[Panel] 📏 Submenu height:', h);
            setSubmenuHeight(h);
        }
    }, [debug]);
    (0, react_1.useLayoutEffect)(() => {
        if (!isOpen)
            return;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => measurePanels());
        });
    }, [isOpen, measurePanels]);
    (0, react_1.useEffect)(() => {
        if (!isOpen || !inSubmenu)
            return;
        if (debug)
            console.log('[Panel] 🔄 Submenu changed:', submenuKey);
        const timeoutId = setTimeout(measurePanels, 50);
        return () => clearTimeout(timeoutId);
    }, [isOpen, inSubmenu, submenuKey, measurePanels, debug]);
    (0, react_1.useEffect)(() => {
        if (!isOpen)
            return;
        const observer = new ResizeObserver(measurePanels);
        if (rootRef.current)
            observer.observe(rootRef.current);
        if (submenuRef.current)
            observer.observe(submenuRef.current);
        return () => observer.disconnect();
    }, [isOpen, measurePanels]);
    return { rootRef, submenuRef, rootHeight, submenuHeight };
}
// ============================================================================
// SLIDE MODE
// ============================================================================
function SlideMode({ inSubmenu, animationConfig, rootPanel, submenuPanel, rootRef, submenuRef, targetHeight, }) {
    // slideOffset controls overlap: 50 = no overlap, <50 = overlap, >50 = gap
    const { slideOffset, stripWidth } = animationConfig;
    // Overlap mode needs different handling - panels stack instead of side-by-side
    const useOverlap = slideOffset < 50;
    if (useOverlap) {
        // Stacked panels with translate for overlap effect
        return (<react_2.motion.div className="relative" initial={false} animate={{ height: animationConfig.animateHeight ? targetHeight : 'auto' }} transition={{ duration: animationConfig.heightDuration / 1000, ease: animation_config_1.EASE_OUT_EXPO }}>
        {/* Root panel - slides out to left */}
        <react_2.motion.div ref={rootRef} initial={false} animate={{
                x: inSubmenu ? `${-100 + (50 - slideOffset)}%` : '0%',
                opacity: inSubmenu ? 0 : 1,
            }} transition={(0, animation_config_1.getSlideTransition)(animationConfig)} className="absolute inset-0 p-1" style={{ zIndex: inSubmenu ? 0 : 1 }}>
          {rootPanel}
        </react_2.motion.div>
        {/* Submenu panel - slides in from right */}
        <react_2.motion.div ref={submenuRef} initial={false} animate={{
                x: inSubmenu ? '0%' : `${100 - (50 - slideOffset)}%`,
                opacity: inSubmenu ? 1 : 0,
            }} transition={(0, animation_config_1.getSlideTransition)(animationConfig)} className="p-1" style={{ zIndex: inSubmenu ? 1 : 0 }}>
          {submenuPanel}
        </react_2.motion.div>
      </react_2.motion.div>);
    }
    // Standard side-by-side strip mode
    const panelWidthPercent = 100 / stripWidth * 100; // Each panel as % of strip
    return (<react_2.motion.div className="relative overflow-hidden" initial={false} animate={{ height: animationConfig.animateHeight ? targetHeight : 'auto' }} transition={{ duration: animationConfig.heightDuration / 1000, ease: animation_config_1.EASE_OUT_EXPO }}>
      <react_2.motion.div initial={false} animate={{ x: inSubmenu ? `${-slideOffset}%` : '0%' }} transition={(0, animation_config_1.getSlideTransition)(animationConfig)} className="flex items-start" style={{ width: `${stripWidth}%` }}>
        <div ref={rootRef} className="flex-shrink-0 p-1" style={{ width: `${panelWidthPercent}%` }}>
          {rootPanel}
        </div>
        <div ref={submenuRef} className="flex-shrink-0 p-1" style={{ width: `${panelWidthPercent}%` }}>
          {submenuPanel}
        </div>
      </react_2.motion.div>
    </react_2.motion.div>);
}
// ============================================================================
// POPLAYOUT MODE
// ============================================================================
function PopLayoutMode({ inSubmenu, animationConfig, rootPanel, submenuPanel, rootRef, submenuRef, targetHeight, submenuKey, }) {
    const { slideDuration, panelExitScale, panelEnterScale, panelScaleOrigin, enableCrossfade } = animationConfig;
    const duration = slideDuration / 1000;
    const transformOrigin = animation_config_1.SCALE_ORIGIN_MAP[panelScaleOrigin];
    const rootVariants = {
        initial: { scale: panelEnterScale, opacity: enableCrossfade ? 0 : 1, x: -20 },
        animate: { scale: 1, opacity: 1, x: 0 },
        exit: { scale: panelExitScale, opacity: enableCrossfade ? 0 : 1, x: -20 },
    };
    const submenuVariants = {
        initial: { scale: panelEnterScale, opacity: enableCrossfade ? 0 : 1, x: 20 },
        animate: { scale: 1, opacity: 1, x: 0 },
        exit: { scale: panelExitScale, opacity: enableCrossfade ? 0 : 1, x: 20 },
    };
    const transition = {
        duration,
        ease: animation_config_1.EASE_OUT_EXPO,
    };
    return (<react_2.motion.div className="relative overflow-hidden" initial={false} animate={{ height: animationConfig.animateHeight ? targetHeight : 'auto' }} transition={{ duration: animationConfig.heightDuration / 1000, ease: animation_config_1.EASE_OUT_EXPO }}>
      <react_2.AnimatePresence mode="popLayout" initial={false}>
        {inSubmenu ? (<react_2.motion.div key={`submenu-${submenuKey}`} ref={submenuRef} variants={submenuVariants} initial="initial" animate="animate" exit="exit" transition={transition} style={{ transformOrigin }} className="p-1">
            {submenuPanel}
          </react_2.motion.div>) : (<react_2.motion.div key="root" ref={rootRef} variants={rootVariants} initial="initial" animate="animate" exit="exit" transition={transition} style={{ transformOrigin }} className="p-1">
            {rootPanel}
          </react_2.motion.div>)}
      </react_2.AnimatePresence>
    </react_2.motion.div>);
}
// ============================================================================
// MAIN COMPONENT
// ============================================================================
/**
 * SlidingPanelContainer - Manages panel transition animations.
 *
 * Supports two transition modes:
 * - 'slide': Horizontal sliding strip with configurable width and offset
 * - 'popLayout': AnimatePresence with scale/fade transitions
 */
function SlidingPanelContainer({ inSubmenu, isOpen, animationConfig, rootPanel, submenuPanel, submenuKey, debug = false, }) {
    const { rootRef, submenuRef, rootHeight, submenuHeight } = useHeightMeasurement(isOpen, inSubmenu, submenuKey, debug);
    const targetHeight = inSubmenu ? submenuHeight : rootHeight;
    if (debug && isOpen) {
        console.log('[Panel] 🎯 Target height:', targetHeight, { inSubmenu, rootHeight, submenuHeight });
    }
    if (animationConfig.panelTransitionMode === 'popLayout') {
        return (<PopLayoutMode inSubmenu={inSubmenu} animationConfig={animationConfig} rootPanel={rootPanel} submenuPanel={submenuPanel} rootRef={rootRef} submenuRef={submenuRef} targetHeight={targetHeight} submenuKey={submenuKey}/>);
    }
    return (<SlideMode inSubmenu={inSubmenu} animationConfig={animationConfig} rootPanel={rootPanel} submenuPanel={submenuPanel} rootRef={rootRef} submenuRef={submenuRef} targetHeight={targetHeight}/>);
}
exports.SlidingPanelContainer = SlidingPanelContainer;
SlidingPanelContainer.displayName = 'SlidingPanelContainer';
//# sourceMappingURL=sliding-panel-container.js.map