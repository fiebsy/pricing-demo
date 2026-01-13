"use strict";
/**
 * Input Configuration Constants
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RING_COLOR_OPTIONS = exports.INPUT_STATE_OPTIONS = exports.DEFAULT_INPUT_CONFIG = void 0;
exports.DEFAULT_INPUT_CONFIG = {
    roundness: 'moderate',
    state: 'default',
    placeholder: 'Enter your email...',
    value: '',
    showIcon: true,
    ring: false,
    ringColor: 'outline-color-brand',
    ringWidth: 2,
};
exports.INPUT_STATE_OPTIONS = [
    { label: 'Default', value: 'default' },
    { label: 'Focused', value: 'focused' },
    { label: 'Error', value: 'error' },
    { label: 'Disabled', value: 'disabled' },
];
exports.RING_COLOR_OPTIONS = [
    { label: 'Brand', value: 'outline-color-brand', color: 'var(--color-brand-primary)' },
    { label: 'Error', value: 'outline-color-error', color: 'var(--color-error-primary)' },
    { label: 'Success', value: 'outline-color-success', color: 'var(--color-success-primary)' },
];
//# sourceMappingURL=input-config.js.map