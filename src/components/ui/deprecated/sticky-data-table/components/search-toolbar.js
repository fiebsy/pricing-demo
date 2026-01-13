"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchToolbar = void 0;
/**
 * SearchToolbar Component
 *
 * A simple search bar integration for StickyDataTable.
 * Uses the Untitled UI InputBase component for consistent styling.
 *
 * @example
 * ```tsx
 * const [search, setSearch] = useState('')
 *
 * <StickyDataTable
 *   searchToolbar={
 *     <SearchToolbar
 *       value={search}
 *       onChange={setSearch}
 *       placeholder="Search contracts..."
 *     />
 *   }
 * />
 * ```
 */
const React = require("react");
const core_stroke_rounded_1 = require("@hugeicons-pro/core-stroke-rounded");
const cx_1 = require("@/components/utils/cx");
const icon_1 = require("@/components/ui/prod/base/icon");
/**
 * SearchToolbar - Search input designed for StickyDataTable toolbar
 *
 * Features:
 * - Clearable when value exists
 * - Compact size matching toolbar
 * - Optional debouncing
 * - Uses Untitled UI styling
 */
const SearchToolbar = ({ value, onChange, placeholder = 'Search...', debounceMs = 0, onClear, disabled = false, className, width = 220, }) => {
    const [localValue, setLocalValue] = React.useState(value);
    const debounceRef = React.useRef(null);
    const inputRef = React.useRef(null);
    // Sync external value changes
    React.useEffect(() => {
        setLocalValue(value);
    }, [value]);
    const handleChange = React.useCallback((e) => {
        const newValue = e.target.value;
        setLocalValue(newValue);
        if (debounceMs > 0) {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
            debounceRef.current = setTimeout(() => {
                onChange(newValue);
            }, debounceMs);
        }
        else {
            onChange(newValue);
        }
    }, [onChange, debounceMs]);
    const handleClear = React.useCallback(() => {
        setLocalValue('');
        onChange('');
        onClear?.();
        inputRef.current?.focus();
    }, [onChange, onClear]);
    // Cleanup timeout on unmount
    React.useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);
    const showClearButton = localValue.length > 0 && !disabled;
    return (<div className={(0, cx_1.cx)('relative flex items-center', 'bg-primary rounded-xl ring-1 ring-inset ring-primary shadow-xs', 'transition-all duration-100 ease-linear', 'focus-within:outline-2 focus-within:outline-brand focus-within:outline-offset-0', disabled && 'bg-disabled_subtle ring-disabled cursor-not-allowed opacity-50', className)} style={{ width }}>
      {/* Search Icon */}
      <span className="absolute left-3 pointer-events-none text-quaternary">
        <icon_1.HugeIcon icon={core_stroke_rounded_1.Search01Icon} size={16} strokeWidth={1.5}/>
      </span>

      {/* Input */}
      <input ref={inputRef} type="text" value={localValue} onChange={handleChange} placeholder={placeholder} disabled={disabled} className={(0, cx_1.cx)('w-full bg-transparent border-none outline-none', 'text-sm text-primary placeholder:text-placeholder', 'py-2 pl-9', showClearButton ? 'pr-8' : 'pr-3', disabled && 'cursor-not-allowed')}/>

      {/* Clear Button */}
      {showClearButton && (<button type="button" onClick={handleClear} className={(0, cx_1.cx)('absolute right-2 p-1 rounded-md', 'text-quaternary hover:text-secondary hover:bg-secondary', 'transition-colors duration-100')} aria-label="Clear search">
          <icon_1.HugeIcon icon={core_stroke_rounded_1.Cancel01Icon} size={14} strokeWidth={2}/>
        </button>)}
    </div>);
};
exports.SearchToolbar = SearchToolbar;
exports.SearchToolbar.displayName = 'SearchToolbar';
//# sourceMappingURL=search-toolbar.js.map