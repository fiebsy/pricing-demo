"use strict";
/**
 * Button Component
 *
 * Simple button primitive with color variants.
 */
'use client';
/**
 * Button Component
 *
 * Simple button primitive with color variants.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const React = require("react");
const cx_1 = require("@/components/utils/cx");
function Button({ size = 'md', color = 'primary', children, className, disabled, ...props }) {
    const sizeClasses = {
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-base',
    };
    const colorClasses = {
        primary: 'bg-brand-solid text-primary_on-brand hover:bg-brand-solid_hover',
        secondary: 'bg-secondary text-primary border border-primary hover:bg-tertiary',
        tertiary: 'bg-transparent text-secondary hover:text-primary hover:bg-secondary',
    };
    return (<button className={(0, cx_1.cx)('inline-flex items-center justify-center rounded-md font-medium transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand', sizeClasses[size], colorClasses[color], disabled && 'cursor-not-allowed opacity-50', className)} disabled={disabled} {...props}>
      {children}
    </button>);
}
exports.Button = Button;
//# sourceMappingURL=button.js.map