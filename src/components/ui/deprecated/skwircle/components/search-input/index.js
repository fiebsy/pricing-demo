"use strict";
/**
 * SearchInput Component
 *
 * A search input component built on Skwircle primitive.
 * Includes search icon and optional clear button.
 *
 * @example Basic
 * ```tsx
 * <SearchInput placeholder="Search..." value={query} onChange={handleChange} />
 * ```
 *
 * @example With Clear
 * ```tsx
 * <SearchInput
 *   placeholder="Search..."
 *   value={query}
 *   onChange={handleChange}
 *   onClear={() => setQuery('')}
 * />
 * ```
 */
'use client';
/**
 * SearchInput Component
 *
 * A search input component built on Skwircle primitive.
 * Includes search icon and optional clear button.
 *
 * @example Basic
 * ```tsx
 * <SearchInput placeholder="Search..." value={query} onChange={handleChange} />
 * ```
 *
 * @example With Clear
 * ```tsx
 * <SearchInput
 *   placeholder="Search..."
 *   value={query}
 *   onChange={handleChange}
 *   onClear={() => setQuery('')}
 * />
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchInput = void 0;
const React = require("react");
const __1 = require("../..");
const icon_1 = require("@/components/ui/prod/base/icon");
const core_stroke_rounded_1 = require("@hugeicons-pro/core-stroke-rounded");
const SIZE_CONFIGS = {
    sm: {
        height: 32,
        paddingX: 10,
        iconSize: 14,
        textClass: 'text-sm',
        gap: 6,
    },
    md: {
        height: 40,
        paddingX: 12,
        iconSize: 16,
        textClass: 'text-sm',
        gap: 8,
    },
};
// =============================================================================
// COMPONENT
// =============================================================================
const SearchInput = ({ value = '', placeholder = 'Search...', size = 'md', disabled = false, readOnly = false, onChange, onClear, className = '', }) => {
    const config = SIZE_CONFIGS[size];
    const showClear = value.length > 0 && onClear;
    return (<__1.Skwircle variant="input" intent="default" roundness="rounded" borderWidth={1} backgroundColor="background-primary" borderColor="border-primary" disabled={disabled} className={`w-full ${className}`}>
      <div className="flex items-center w-full" style={{
            height: config.height,
            paddingLeft: config.paddingX,
            paddingRight: config.paddingX,
            gap: config.gap,
        }}>
        {/* Search Icon */}
        <span className="text-quaternary flex-shrink-0">
          <icon_1.HugeIcon icon={core_stroke_rounded_1.Search01Icon} size={config.iconSize} strokeWidth={2}/>
        </span>

        {/* Input */}
        <input type="text" value={value} placeholder={placeholder} disabled={disabled} readOnly={readOnly} onChange={onChange} className={`
            flex-1 min-w-0 bg-transparent border-none outline-none
            text-primary placeholder:text-quaternary
            ${config.textClass}
          `}/>

        {/* Clear Button */}
        {showClear && (<button type="button" onClick={onClear} className="text-quaternary hover:text-tertiary flex-shrink-0 transition-colors" aria-label="Clear search">
            <icon_1.HugeIcon icon={core_stroke_rounded_1.Cancel01Icon} size={config.iconSize} strokeWidth={2}/>
          </button>)}
      </div>
    </__1.Skwircle>);
};
exports.SearchInput = SearchInput;
//# sourceMappingURL=index.js.map