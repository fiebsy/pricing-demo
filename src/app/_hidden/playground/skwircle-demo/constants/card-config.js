"use strict";
/**
 * Card Configuration Constants
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEPTH_DIRECTION_OPTIONS = exports.DEPTH_INTENSITY_OPTIONS = exports.CARD_INTENT_OPTIONS = exports.DEFAULT_CARD_CONFIG = void 0;
exports.DEFAULT_CARD_CONFIG = {
    intent: 'default',
    elevation: 'xs',
    roundness: 'rounded',
    fillMode: false,
    depthIntensity: 'none',
    depthDirection: 'bottom-right',
    backgroundColor: null,
    backgroundColorHover: null,
    borderColor: null,
    borderWidth: 1,
    ring: false,
    ringColor: 'border-brand',
    ringWidth: 2,
    ringOpacity: 100,
};
exports.CARD_INTENT_OPTIONS = [
    { label: 'Default', value: 'default' },
    { label: 'Primary', value: 'primary' },
    { label: 'Success', value: 'success' },
    { label: 'Warning', value: 'warning' },
    { label: 'Error', value: 'error' },
];
exports.DEPTH_INTENSITY_OPTIONS = [
    { label: 'None', value: 'none' },
    { label: '3%', value: '3' },
    { label: '5%', value: '5' },
    { label: '10%', value: '10' },
    { label: '15%', value: '15' },
    { label: '20%', value: '20' },
    { label: '25%', value: '25' },
    { label: '30%', value: '30' },
];
exports.DEPTH_DIRECTION_OPTIONS = [
    { label: 'Top', value: 'top' },
    { label: 'Top Right', value: 'top-right' },
    { label: 'Right', value: 'right' },
    { label: 'Bottom Right', value: 'bottom-right' },
    { label: 'Bottom', value: 'bottom' },
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Left', value: 'left' },
    { label: 'Top Left', value: 'top-left' },
];
//# sourceMappingURL=card-config.js.map