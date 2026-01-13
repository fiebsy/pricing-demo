"use strict";
/**
 * Expanding Search Input
 *
 * A search input that expands horizontally from a compact icon state.
 * The icon stays fixed at the left while the input slides in.
 *
 * @module expanding-search
 */
'use client';
/**
 * Expanding Search Input
 *
 * A search input that expands horizontally from a compact icon state.
 * The icon stays fixed at the left while the input slides in.
 *
 * @module expanding-search
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandingSearch = void 0;
const react_1 = require("react");
const config_1 = require("./config");
const use_expanding_search_1 = require("./hooks/use-expanding-search");
const animation_1 = require("./utils/animation");
const components_1 = require("./components");
// ============================================================================
// Component
// ============================================================================
const ExpandingSearch = ({ placeholder = config_1.DEFAULT_PROPS.placeholder, value, onChange, onSubmit, onExpandedChange, defaultExpanded = config_1.DEFAULT_PROPS.defaultExpanded, expanded, collapsedWidth = config_1.DEFAULT_PROPS.collapsedWidth, expandedWidth = config_1.DEFAULT_PROPS.expandedWidth, height = config_1.DEFAULT_PROPS.height, duration = config_1.DEFAULT_PROPS.duration, collapseDuration = 75, revealMode = 'immediate', hideMode = 'fade', className, autoFocus = config_1.DEFAULT_PROPS.autoFocus, collapseOnBlur = config_1.DEFAULT_PROPS.collapseOnBlur, iconSize = 18, iconStrokeWidth = 2, iconOpacity = 65, }) => {
    // ============================================================================
    // State & Handlers
    // ============================================================================
    const { inputRef, containerRef, isExpanded, inputValue, handleToggle, handleInputChange, handleKeyDown, handleClear, handleContainerClick, } = (0, use_expanding_search_1.useExpandingSearch)({
        value,
        expanded,
        defaultExpanded,
        autoFocus,
        collapseOnBlur,
        onChange,
        onSubmit,
        onExpandedChange,
    });
    // ============================================================================
    // Animation State
    // ============================================================================
    // For 'sync' mode: track when container animation completes
    const [animationComplete, setAnimationComplete] = (0, react_1.useState)(defaultExpanded);
    // Reset animationComplete when collapsing
    (0, react_1.useEffect)(() => {
        if (!isExpanded) {
            setAnimationComplete(false);
        }
    }, [isExpanded]);
    // Handle container transitionend for sync mode
    const handleTransitionEnd = (0, react_1.useCallback)((e) => {
        if (e.propertyName === 'width' && e.target === containerRef.current) {
            if (isExpanded) {
                setAnimationComplete(true);
            }
        }
    }, [isExpanded, containerRef]);
    // ============================================================================
    // Animation Calculations
    // ============================================================================
    const animationState = { isExpanded, animationComplete };
    const animationConfig = { duration, collapseDuration, revealMode, hideMode };
    const contentOpacity = (0, animation_1.getContentOpacity)(animationState, revealMode);
    const contentTransition = (0, animation_1.getContentTransition)(animationState, animationConfig);
    // ============================================================================
    // Render
    // ============================================================================
    return (<components_1.SearchContainer ref={containerRef} isExpanded={isExpanded} collapsedWidth={collapsedWidth} expandedWidth={expandedWidth} height={height} duration={duration} revealMode={revealMode} hideMode={hideMode} collapseDuration={collapseDuration} className={className} onClick={handleContainerClick} onTransitionEnd={handleTransitionEnd}>
      <components_1.SearchIconButton isExpanded={isExpanded} collapsedWidth={collapsedWidth} iconSize={iconSize} iconStrokeWidth={iconStrokeWidth} iconOpacity={iconOpacity} onClick={handleToggle}/>

      <components_1.SearchInput inputRef={inputRef} isExpanded={isExpanded} value={inputValue} placeholder={placeholder} collapsedWidth={collapsedWidth} contentOpacity={contentOpacity} contentTransition={contentTransition} onChange={handleInputChange} onKeyDown={handleKeyDown}>
        <components_1.ClearButton visible={!!inputValue && isExpanded} onClick={handleClear}/>
      </components_1.SearchInput>
    </components_1.SearchContainer>);
};
exports.ExpandingSearch = ExpandingSearch;
exports.ExpandingSearch.displayName = 'ExpandingSearch';
//# sourceMappingURL=expanding-search.js.map