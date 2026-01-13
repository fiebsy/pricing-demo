"use strict";
/**
 * Button Configuration Constants
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUTTON_SIZE_OPTIONS = exports.BUTTON_INTENT_OPTIONS = exports.DEFAULT_BUTTON_CONFIG = void 0;
exports.DEFAULT_BUTTON_CONFIG = {
    intent: 'primary',
    size: 'md',
    roundness: 'moderate',
    label: 'Button',
    showIcon: true,
    iconOnly: false,
    ring: false,
    ringOpacity: 100,
    borderWidth: 0,
};
exports.BUTTON_INTENT_OPTIONS = [
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Ghost', value: 'ghost' },
    { label: 'Error', value: 'error' },
];
exports.BUTTON_SIZE_OPTIONS = [
    { label: 'XS', value: 'xs' },
    { label: 'SM', value: 'sm' },
    { label: 'MD', value: 'md' },
    { label: 'LG', value: 'lg' },
    { label: 'XL', value: 'xl' },
];
//# sourceMappingURL=button-config.js.map