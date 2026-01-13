"use strict";
/**
 * Badge Configuration Constants
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BADGE_COLOR_OPTIONS = exports.BADGE_SIZE_OPTIONS = exports.BADGE_TYPE_OPTIONS = exports.DEFAULT_BADGE_CONFIG = void 0;
exports.DEFAULT_BADGE_CONFIG = {
    type: 'badge',
    size: 'md',
    color: 'brand',
    roundness: 'rounded',
    label: 'Badge',
    showIcon: true,
};
exports.BADGE_TYPE_OPTIONS = [
    { label: 'Badge', value: 'badge' },
    { label: 'Pill', value: 'pill' },
];
exports.BADGE_SIZE_OPTIONS = [
    { label: 'XS', value: 'xs' },
    { label: 'SM', value: 'sm' },
    { label: 'MD', value: 'md' },
    { label: 'LG', value: 'lg' },
];
exports.BADGE_COLOR_OPTIONS = [
    { label: 'Gray', value: 'gray', color: 'var(--color-fg-quaternary)' },
    { label: 'Brand', value: 'brand', color: 'var(--color-brand-primary)' },
    { label: 'Success', value: 'success', color: 'var(--color-success-primary)' },
    { label: 'Warning', value: 'warning', color: 'var(--color-warning-primary)' },
    { label: 'Error', value: 'error', color: 'var(--color-error-primary)' },
    { label: 'Blue', value: 'blue', color: '#3b82f6' },
    { label: 'Indigo', value: 'indigo', color: '#6366f1' },
    { label: 'Purple', value: 'purple', color: '#8b5cf6' },
    { label: 'Orange', value: 'orange', color: '#f97316' },
];
//# sourceMappingURL=badge-config.js.map