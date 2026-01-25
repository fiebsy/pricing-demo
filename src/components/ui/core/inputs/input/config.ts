import type { InputSize } from './types'

// ============================================================================
// SIZE STYLES
// ============================================================================

/**
 * Input padding styles by size
 */
export const inputPaddingStyles: Record<InputSize, string> = {
  sm: 'px-3 py-2',
  md: 'px-3.5 py-2.5',
}

/**
 * Input padding with trailing icon
 */
export const inputPaddingWithTrailingStyles: Record<InputSize, string> = {
  sm: 'pr-9',
  md: 'pr-9.5',
}

/**
 * Input padding with leading icon
 */
export const inputPaddingWithLeadingStyles: Record<InputSize, string> = {
  sm: 'pl-10',
  md: 'pl-10.5',
}

/**
 * Leading icon position by size
 */
export const leadingIconPositionStyles: Record<InputSize, string> = {
  sm: 'left-3',
  md: 'left-3.5',
}

/**
 * Trailing icon position by size
 */
export const trailingIconPositionStyles: Record<InputSize, string> = {
  sm: 'right-3',
  md: 'right-3.5',
}

/**
 * Shortcut badge padding by size
 */
export const shortcutPaddingStyles: Record<InputSize, string> = {
  sm: 'pr-2.5',
  md: 'pr-3',
}

/**
 * Prefix text padding by size
 */
export const prefixPaddingStyles: Record<InputSize, string> = {
  sm: 'px-3 py-2',
  md: 'py-2.5 pr-3 pl-3.5',
}

/**
 * Prefix leading text padding by size
 */
export const prefixLeadingPaddingStyles: Record<InputSize, string> = {
  sm: 'pl-3',
  md: 'pl-3.5',
}

// ============================================================================
// WRAPPER/GROUP STYLES
// ============================================================================

/**
 * Common wrapper styles
 */
export const wrapperCommonStyles = [
  'bg-primary ring-primary relative flex w-full flex-row place-content-center place-items-center',
  'rounded-xl ring-1 shadow-xs ring-inset corner-squircle',
  'transition-all duration-100 ease-linear',
  'motion-reduce:transition-none',
].join(' ')

/**
 * Wrapper focus styles
 */
export const wrapperFocusStyles = 'outline-2 outline-brand outline-offset-0'

/**
 * Wrapper disabled styles
 */
export const wrapperDisabledStyles = 'bg-disabled_subtle ring-disabled cursor-not-allowed'

/**
 * Wrapper invalid styles
 */
export const wrapperInvalidStyles = 'ring-error_subtle'

/**
 * Wrapper invalid + focus styles
 */
export const wrapperInvalidFocusStyles = 'outline-2 outline-error outline-offset-0'

// ============================================================================
// INPUT ELEMENT STYLES
// ============================================================================

/**
 * Common input element styles
 */
export const inputCommonStyles = [
  'text-md text-primary placeholder:text-placeholder autofill:text-primary',
  'm-0 w-full bg-transparent ring-0 outline-hidden autofill:rounded-xl',
].join(' ')

/**
 * Input disabled styles
 */
export const inputDisabledStyles = 'text-disabled cursor-not-allowed'

// ============================================================================
// ICON STYLES
// ============================================================================

/**
 * Common icon styles
 */
export const iconCommonStyles = 'text-fg-quaternary pointer-events-none absolute size-5'

/**
 * Icon disabled styles
 */
export const iconDisabledStyles = 'text-fg-disabled'

// ============================================================================
// LABEL STYLES
// ============================================================================

/**
 * Label common styles
 */
export const labelCommonStyles = 'flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary'

/**
 * Required indicator styles
 */
export const requiredIndicatorStyles = 'text-brand-tertiary'

// ============================================================================
// HINT TEXT STYLES
// ============================================================================

/**
 * Hint text common styles
 */
export const hintTextCommonStyles = 'text-sm text-tertiary'

/**
 * Hint text invalid styles
 */
export const hintTextInvalidStyles = 'text-error-primary'

// ============================================================================
// SHORTCUT STYLES
// ============================================================================

/**
 * Shortcut container styles
 */
export const shortcutContainerStyles = [
  'to-bg-primary pointer-events-none absolute inset-y-0.5 right-0.5 z-10',
  'flex items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-40% pl-8',
].join(' ')

/**
 * Shortcut badge styles
 */
export const shortcutBadgeStyles = [
  'text-quaternary ring-secondary pointer-events-none rounded px-1 py-px',
  'text-xs font-medium ring-1 ring-inset select-none',
].join(' ')

/**
 * Shortcut disabled styles
 */
export const shortcutDisabledStyles = 'text-disabled bg-transparent'

// ============================================================================
// PREFIX STYLES
// ============================================================================

/**
 * Input prefix common styles
 */
export const prefixCommonStyles = [
  'flex text-md text-tertiary shadow-xs',
  'ring-1 ring-border-primary ring-inset',
].join(' ')

/**
 * Prefix leading position styles
 */
export const prefixLeadingStyles = '-mr-px rounded-l-xl'

/**
 * Prefix trailing position styles
 */
export const prefixTrailingStyles = '-ml-px rounded-r-xl'

/**
 * Prefix disabled styles
 */
export const prefixDisabledStyles = 'border-disabled bg-disabled_subtle text-tertiary'

// ============================================================================
// INPUT GROUP STYLES
// ============================================================================

/**
 * Input group container common styles
 */
export const inputGroupContainerStyles = [
  'group relative flex h-max w-full flex-row justify-center rounded-xl',
  'bg-primary transition-all duration-100 ease-linear corner-squircle',
].join(' ')

/**
 * Input group wrapper styles for removing rounded corners
 */
export const inputGroupWrapperLeadingStyles = 'rounded-l-none'

/**
 * Input group wrapper styles for removing rounded corners
 */
export const inputGroupWrapperTrailingStyles = 'rounded-r-none'

// ============================================================================
// TOOLTIP TRIGGER STYLES
// ============================================================================

/**
 * Tooltip trigger common styles
 */
export const tooltipTriggerStyles = [
  'text-fg-quaternary hover:text-fg-quaternary_hover focus:text-fg-quaternary_hover',
  'absolute cursor-pointer transition duration-200',
].join(' ')

// ============================================================================
// INVALID ICON STYLES
// ============================================================================

/**
 * Invalid/error icon styles
 */
export const invalidIconStyles = 'text-fg-error-secondary pointer-events-none absolute'
