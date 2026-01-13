"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indicatorDisabledStyles = exports.indicatorVisibleStyles = exports.indicatorCommonStyles = exports.boxFocusStyles = exports.boxDisabledStyles = exports.boxCheckedStyles = exports.boxCommonStyles = exports.hintTextSizeStyles = exports.labelTextSizeStyles = exports.textWrapperSizeStyles = exports.labelContainerSizeStyles = exports.checkIconSizeStyles = exports.iconSizeStyles = exports.boxSizeStyles = void 0;
/**
 * Checkbox box size styles
 */
exports.boxSizeStyles = {
    sm: 'size-4 rounded-md',
    md: 'size-5 rounded-lg',
};
/**
 * Indicator icon size styles
 */
exports.iconSizeStyles = {
    sm: 'h-3 w-2.5',
    md: 'size-3.5',
};
/**
 * Check icon size styles (slightly different from indeterminate)
 */
exports.checkIconSizeStyles = {
    sm: 'size-3',
    md: 'size-3.5',
};
/**
 * Label/hint container size styles
 */
exports.labelContainerSizeStyles = {
    sm: 'gap-2',
    md: 'gap-3',
};
/**
 * Text wrapper size styles
 */
exports.textWrapperSizeStyles = {
    sm: '',
    md: 'gap-0.5',
};
/**
 * Label text size styles
 */
exports.labelTextSizeStyles = {
    sm: 'text-sm font-medium',
    md: 'text-md font-medium',
};
/**
 * Hint text size styles
 */
exports.hintTextSizeStyles = {
    sm: 'text-sm',
    md: 'text-md',
};
/**
 * Common box styles (unchecked state)
 */
exports.boxCommonStyles = [
    'relative flex shrink-0 cursor-pointer appearance-none items-center justify-center',
    'bg-primary ring-1 ring-primary ring-inset corner-squircle',
].join(' ');
/**
 * Box checked/indeterminate styles
 */
exports.boxCheckedStyles = 'bg-brand-solid ring-brand-solid';
/**
 * Box disabled styles
 */
exports.boxDisabledStyles = 'cursor-not-allowed bg-disabled_subtle ring-disabled';
/**
 * Box focus visible styles
 */
exports.boxFocusStyles = 'outline-2 outline-offset-2 outline-focus-ring';
/**
 * Common indicator icon styles
 */
exports.indicatorCommonStyles = [
    'pointer-events-none absolute text-fg-white',
    'opacity-0',
].join(' ');
/**
 * Indicator visible styles
 */
exports.indicatorVisibleStyles = 'opacity-100';
/**
 * Indicator disabled styles
 */
exports.indicatorDisabledStyles = 'text-fg-disabled_subtle';
//# sourceMappingURL=config.js.map