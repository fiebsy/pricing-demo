"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skeleton = void 0;
/**
 * Simple Skeleton Component
 *
 * A basic animated skeleton loading placeholder.
 */
const cx_1 = require("@/components/utils/cx");
function Skeleton({ className, width, height, rounded = 'md', style, }) {
    const roundedClasses = {
        none: '',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    };
    return (<div className={(0, cx_1.cx)('animate-pulse bg-tertiary/20', roundedClasses[rounded], className)} style={{
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,
            ...style,
        }}/>);
}
exports.Skeleton = Skeleton;
//# sourceMappingURL=index.js.map