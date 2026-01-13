"use strict";
/**
 * Search Input
 *
 * The text input field that slides in when the search is expanded.
 * Supports children for additional controls (like clear button).
 *
 * @module expanding-search/components/search-input
 */
'use client';
/**
 * Search Input
 *
 * The text input field that slides in when the search is expanded.
 * Supports children for additional controls (like clear button).
 *
 * @module expanding-search/components/search-input
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = void 0;
const react_1 = require("react");
const utils_1 = require("@/lib/utils");
const SearchInput = ({ inputRef, isExpanded, value, placeholder, collapsedWidth, contentOpacity, contentTransition, onChange, onKeyDown, children, }) => {
    return (<div className="absolute top-0 bottom-0 right-0 flex items-center gap-2 pr-3" style={{
            left: collapsedWidth,
            opacity: contentOpacity,
            transition: contentTransition,
            pointerEvents: isExpanded ? 'auto' : 'none',
        }}>
      <input ref={inputRef} type="text" value={value} onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder} className={(0, utils_1.cn)('flex-1 min-w-0 bg-transparent border-none outline-none', 'text-primary text-sm', 'placeholder:text-tertiary')} aria-label="Search input" tabIndex={isExpanded ? 0 : -1}/>
      {children}
    </div>);
};
exports.SearchInput = SearchInput;
exports.SearchInput.displayName = 'SearchInput';
//# sourceMappingURL=search-input.js.map