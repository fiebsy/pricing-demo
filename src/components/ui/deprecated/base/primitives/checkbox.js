"use strict";
/**
 * Checkbox Component
 *
 * Simple checkbox primitive with size variants.
 */
'use client';
/**
 * Checkbox Component
 *
 * Simple checkbox primitive with size variants.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = void 0;
const React = require("react");
const cx_1 = require("@/components/utils/cx");
function Checkbox({ isSelected, onChange, isDisabled = false, isIndeterminate = false, size = 'md', className, onClick, 'aria-label': ariaLabel, }) {
    const sizeClasses = {
        sm: 'size-4',
        md: 'size-5',
    };
    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
        if (!isDisabled) {
            onChange(!isSelected);
        }
    };
    return (<button type="button" role="checkbox" aria-checked={isIndeterminate ? 'mixed' : isSelected} aria-label={ariaLabel} onClick={handleClick} disabled={isDisabled} className={(0, cx_1.cx)('shrink-0 rounded border transition-colors', sizeClasses[size], isSelected || isIndeterminate
            ? 'bg-brand-solid border-brand text-primary_on-brand'
            : 'bg-secondary border-primary hover:border-secondary_hover', isDisabled && 'cursor-not-allowed opacity-50', className)}>
      {isIndeterminate ? (<svg className="size-full p-0.5" viewBox="0 0 16 16" fill="none">
          <path d="M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>) : isSelected ? (<svg className="size-full p-0.5" viewBox="0 0 16 16" fill="none">
          <path d="M13 4L6 12L3 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>) : null}
    </button>);
}
exports.Checkbox = Checkbox;
//# sourceMappingURL=checkbox.js.map