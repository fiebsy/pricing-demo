"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidIconStyles = exports.tooltipTriggerStyles = exports.inputGroupWrapperTrailingStyles = exports.inputGroupWrapperLeadingStyles = exports.inputGroupContainerStyles = exports.prefixDisabledStyles = exports.prefixTrailingStyles = exports.prefixLeadingStyles = exports.prefixCommonStyles = exports.shortcutDisabledStyles = exports.shortcutBadgeStyles = exports.shortcutContainerStyles = exports.hintTextInvalidStyles = exports.hintTextCommonStyles = exports.requiredIndicatorStyles = exports.labelCommonStyles = exports.iconDisabledStyles = exports.iconCommonStyles = exports.inputDisabledStyles = exports.inputCommonStyles = exports.wrapperInvalidFocusStyles = exports.wrapperInvalidStyles = exports.wrapperDisabledStyles = exports.wrapperFocusStyles = exports.wrapperCommonStyles = exports.prefixLeadingPaddingStyles = exports.prefixPaddingStyles = exports.shortcutPaddingStyles = exports.trailingIconPositionStyles = exports.leadingIconPositionStyles = exports.inputPaddingWithLeadingStyles = exports.inputPaddingWithTrailingStyles = exports.inputPaddingStyles = void 0;
// ============================================================================
// SIZE STYLES
// ============================================================================
/**
 * Input padding styles by size
 */
exports.inputPaddingStyles = {
    sm: 'px-3 py-2',
    md: 'px-3.5 py-2.5',
};
/**
 * Input padding with trailing icon
 */
exports.inputPaddingWithTrailingStyles = {
    sm: 'pr-9',
    md: 'pr-9.5',
};
/**
 * Input padding with leading icon
 */
exports.inputPaddingWithLeadingStyles = {
    sm: 'pl-10',
    md: 'pl-10.5',
};
/**
 * Leading icon position by size
 */
exports.leadingIconPositionStyles = {
    sm: 'left-3',
    md: 'left-3.5',
};
/**
 * Trailing icon position by size
 */
exports.trailingIconPositionStyles = {
    sm: 'right-3',
    md: 'right-3.5',
};
/**
 * Shortcut badge padding by size
 */
exports.shortcutPaddingStyles = {
    sm: 'pr-2.5',
    md: 'pr-3',
};
/**
 * Prefix text padding by size
 */
exports.prefixPaddingStyles = {
    sm: 'px-3 py-2',
    md: 'py-2.5 pr-3 pl-3.5',
};
/**
 * Prefix leading text padding by size
 */
exports.prefixLeadingPaddingStyles = {
    sm: 'pl-3',
    md: 'pl-3.5',
};
// ============================================================================
// WRAPPER/GROUP STYLES
// ============================================================================
/**
 * Common wrapper styles
 */
exports.wrapperCommonStyles = [
    'bg-primary ring-primary relative flex w-full flex-row place-content-center place-items-center',
    'rounded-xl ring-1 shadow-xs ring-inset corner-squircle',
    'transition-all duration-100 ease-linear',
    'motion-reduce:transition-none',
].join(' ');
/**
 * Wrapper focus styles
 */
exports.wrapperFocusStyles = 'outline-2 outline-brand outline-offset-0';
/**
 * Wrapper disabled styles
 */
exports.wrapperDisabledStyles = 'bg-disabled_subtle ring-disabled cursor-not-allowed';
/**
 * Wrapper invalid styles
 */
exports.wrapperInvalidStyles = 'ring-error_subtle';
/**
 * Wrapper invalid + focus styles
 */
exports.wrapperInvalidFocusStyles = 'outline-2 outline-error outline-offset-0';
// ============================================================================
// INPUT ELEMENT STYLES
// ============================================================================
/**
 * Common input element styles
 */
exports.inputCommonStyles = [
    'text-md text-primary placeholder:text-placeholder autofill:text-primary',
    'm-0 w-full bg-transparent ring-0 outline-hidden autofill:rounded-xl',
].join(' ');
/**
 * Input disabled styles
 */
exports.inputDisabledStyles = 'text-disabled cursor-not-allowed';
// ============================================================================
// ICON STYLES
// ============================================================================
/**
 * Common icon styles
 */
exports.iconCommonStyles = 'text-fg-quaternary pointer-events-none absolute size-5';
/**
 * Icon disabled styles
 */
exports.iconDisabledStyles = 'text-fg-disabled';
// ============================================================================
// LABEL STYLES
// ============================================================================
/**
 * Label common styles
 */
exports.labelCommonStyles = 'flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary';
/**
 * Required indicator styles
 */
exports.requiredIndicatorStyles = 'text-brand-tertiary';
// ============================================================================
// HINT TEXT STYLES
// ============================================================================
/**
 * Hint text common styles
 */
exports.hintTextCommonStyles = 'text-sm text-tertiary';
/**
 * Hint text invalid styles
 */
exports.hintTextInvalidStyles = 'text-error-primary';
// ============================================================================
// SHORTCUT STYLES
// ============================================================================
/**
 * Shortcut container styles
 */
exports.shortcutContainerStyles = [
    'to-bg-primary pointer-events-none absolute inset-y-0.5 right-0.5 z-10',
    'flex items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-40% pl-8',
].join(' ');
/**
 * Shortcut badge styles
 */
exports.shortcutBadgeStyles = [
    'text-quaternary ring-secondary pointer-events-none rounded px-1 py-px',
    'text-xs font-medium ring-1 ring-inset select-none',
].join(' ');
/**
 * Shortcut disabled styles
 */
exports.shortcutDisabledStyles = 'text-disabled bg-transparent';
// ============================================================================
// PREFIX STYLES
// ============================================================================
/**
 * Input prefix common styles
 */
exports.prefixCommonStyles = [
    'flex text-md text-tertiary shadow-xs',
    'ring-1 ring-border-primary ring-inset',
].join(' ');
/**
 * Prefix leading position styles
 */
exports.prefixLeadingStyles = '-mr-px rounded-l-xl';
/**
 * Prefix trailing position styles
 */
exports.prefixTrailingStyles = '-ml-px rounded-r-xl';
/**
 * Prefix disabled styles
 */
exports.prefixDisabledStyles = 'border-disabled bg-disabled_subtle text-tertiary';
// ============================================================================
// INPUT GROUP STYLES
// ============================================================================
/**
 * Input group container common styles
 */
exports.inputGroupContainerStyles = [
    'group relative flex h-max w-full flex-row justify-center rounded-xl',
    'bg-primary transition-all duration-100 ease-linear corner-squircle',
].join(' ');
/**
 * Input group wrapper styles for removing rounded corners
 */
exports.inputGroupWrapperLeadingStyles = 'rounded-l-none';
/**
 * Input group wrapper styles for removing rounded corners
 */
exports.inputGroupWrapperTrailingStyles = 'rounded-r-none';
// ============================================================================
// TOOLTIP TRIGGER STYLES
// ============================================================================
/**
 * Tooltip trigger common styles
 */
exports.tooltipTriggerStyles = [
    'text-fg-quaternary hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover',
    'absolute cursor-pointer transition duration-200',
].join(' ');
// ============================================================================
// INVALID ICON STYLES
// ============================================================================
/**
 * Invalid/error icon styles
 */
exports.invalidIconStyles = 'text-fg-error-secondary pointer-events-none absolute';
//# sourceMappingURL=config.js.map