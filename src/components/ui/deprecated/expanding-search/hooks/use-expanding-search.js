"use strict";
/**
 * Expanding Search - Hook
 *
 * Manages state and event handlers for the expanding search component.
 *
 * @module expanding-search/hooks/use-expanding-search
 */
'use client';
/**
 * Expanding Search - Hook
 *
 * Manages state and event handlers for the expanding search component.
 *
 * @module expanding-search/hooks/use-expanding-search
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.useExpandingSearch = void 0;
const react_1 = require("react");
function useExpandingSearch({ value: controlledValue, expanded: controlledExpanded, defaultExpanded, autoFocus, collapseOnBlur, onChange, onSubmit, onExpandedChange, }) {
    // ============================================================================
    // State
    // ============================================================================
    const [internalExpanded, setInternalExpanded] = (0, react_1.useState)(defaultExpanded);
    const [internalValue, setInternalValue] = (0, react_1.useState)('');
    const inputRef = (0, react_1.useRef)(null);
    const containerRef = (0, react_1.useRef)(null);
    const isExpanded = controlledExpanded ?? internalExpanded;
    const inputValue = controlledValue ?? internalValue;
    // ============================================================================
    // Handlers
    // ============================================================================
    const handleExpandedChange = (0, react_1.useCallback)((expanded) => {
        setInternalExpanded(expanded);
        onExpandedChange?.(expanded);
    }, [onExpandedChange]);
    const handleToggle = (0, react_1.useCallback)(() => {
        handleExpandedChange(!isExpanded);
    }, [isExpanded, handleExpandedChange]);
    const handleInputChange = (0, react_1.useCallback)((e) => {
        const newValue = e.target.value;
        setInternalValue(newValue);
        onChange?.(newValue);
    }, [onChange]);
    const handleKeyDown = (0, react_1.useCallback)((e) => {
        if (e.key === 'Enter') {
            onSubmit?.(inputValue);
        }
        else if (e.key === 'Escape') {
            handleExpandedChange(false);
        }
    }, [inputValue, onSubmit, handleExpandedChange]);
    const handleClear = (0, react_1.useCallback)((e) => {
        e.stopPropagation();
        setInternalValue('');
        onChange?.('');
        inputRef.current?.focus();
    }, [onChange]);
    const handleContainerClick = (0, react_1.useCallback)(() => {
        if (!isExpanded) {
            handleExpandedChange(true);
        }
    }, [isExpanded, handleExpandedChange]);
    // ============================================================================
    // Effects
    // ============================================================================
    // Auto-focus when expanded
    (0, react_1.useEffect)(() => {
        if (isExpanded && autoFocus) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isExpanded, autoFocus]);
    // Collapse on outside click/touch
    (0, react_1.useEffect)(() => {
        if (!collapseOnBlur || !isExpanded)
            return;
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                handleExpandedChange(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isExpanded, collapseOnBlur, handleExpandedChange]);
    // ============================================================================
    // Return
    // ============================================================================
    return {
        // Refs
        inputRef,
        containerRef,
        // State
        isExpanded,
        inputValue,
        // Handlers
        handleToggle,
        handleInputChange,
        handleKeyDown,
        handleClear,
        handleContainerClick,
    };
}
exports.useExpandingSearch = useExpandingSearch;
//# sourceMappingURL=use-expanding-search.js.map