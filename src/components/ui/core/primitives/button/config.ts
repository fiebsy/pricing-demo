import type { ButtonRoundness, ButtonSize, ButtonVariant } from './types'

/**
 * Button size configurations
 * Note: Roundness (rounded-*, corner-squircle) is handled by roundnessStyles
 */
export const sizeStyles: Record<ButtonSize, string> = {
  xs: 'gap-0.5 px-2 py-1.5 text-xs font-semibold',
  sm: 'gap-1 px-3 py-2 text-sm font-semibold',
  md: 'gap-1 px-3.5 py-2.5 text-sm font-semibold',
  lg: 'gap-1.5 px-4 py-2.5 text-md font-semibold',
  xl: 'gap-1.5 px-4.5 py-3 text-md font-semibold',
}

/**
 * Button roundness configurations
 * - default: rounded-xl with corner squircle
 * - pill: fully rounded, no corner squircle
 * - squircle: fully rounded with corner squircle
 */
export const roundnessStyles: Record<ButtonRoundness, string> = {
  default: 'rounded-xl corner-squircle before:rounded-[calc(0.75rem-1px)] before:corner-squircle',
  pill: 'rounded-full before:rounded-full',
  squircle: 'rounded-full corner-squircle before:rounded-full before:corner-squircle',
}

/**
 * Icon-only button sizes (square)
 * Note: Must explicitly set px-* to override the px-* values from sizeStyles
 */
export const iconOnlySizeStyles: Record<ButtonSize, string> = {
  xs: 'px-1.5 py-1.5',
  sm: 'px-2 py-2',
  md: 'px-2.5 py-2.5',
  lg: 'px-3 py-3',
  xl: 'px-3.5 py-3.5',
}

/**
 * Button variant configurations
 * Matches source styling from untitled-ui/base/buttons/button.tsx
 */
export const variantStyles: Record<ButtonVariant, string> = {
  // Primary - brand colored solid button with inner gradient border
  primary: [
    'bg-brand-solid text-white shadow-xs-skeumorphic ring-1 ring-transparent ring-inset',
    // Inner border gradient (skeuomorphic effect)
    'before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0% before:corner-squircle',
    'hover:bg-brand-solid_hover',
    'data-[pressed]:bg-brand-solid_hover data-[pressed]:scale-[0.98]',
    'data-[disabled]:bg-disabled data-[disabled]:text-fg-disabled data-[disabled]:shadow-xs data-[disabled]:ring-disabled_subtle',
    '[&_[data-icon]]:text-button-primary-icon hover:[&_[data-icon]]:text-button-primary-icon_hover',
  ].join(' '),

  // Secondary - outlined/subtle button with skeuomorphic shadow
  secondary: [
    'bg-primary text-secondary shadow-xs-skeumorphic ring-1 ring-primary ring-inset',
    'hover:bg-primary_hover hover:text-secondary_hover',
    'data-[pressed]:bg-primary_hover data-[pressed]:scale-[0.98]',
    'data-[disabled]:shadow-xs data-[disabled]:ring-disabled_subtle data-[disabled]:text-fg-disabled',
    '[&_[data-icon]]:text-fg-quaternary hover:[&_[data-icon]]:text-fg-quaternary_hover',
  ].join(' '),

  // Tertiary - minimal, no background
  tertiary: [
    'text-tertiary',
    'hover:bg-primary_hover hover:text-tertiary_hover',
    'data-[pressed]:bg-primary_hover data-[pressed]:scale-[0.98]',
    'data-[disabled]:text-fg-disabled',
    '[&_[data-icon]]:text-fg-quaternary hover:[&_[data-icon]]:text-fg-quaternary_hover',
  ].join(' '),

  // Shine - subtle button with shine gradient effect (used for filter triggers, etc.)
  shine: [
    'bg-primary text-secondary shine-0-intense',
    'hover:bg-tertiary hover:text-primary',
    'data-[pressed]:bg-tertiary data-[pressed]:scale-[0.98]',
    'data-[disabled]:text-fg-disabled',
    '[&_[data-icon]]:text-fg-quaternary hover:[&_[data-icon]]:text-fg-tertiary',
  ].join(' '),

  // Link gray - gray text link with underline
  'link-gray': [
    'justify-normal rounded p-0! text-tertiary',
    'hover:text-tertiary_hover',
    'data-[disabled]:text-fg-disabled',
    '[&_[data-text]]:underline [&_[data-text]]:decoration-transparent [&_[data-text]]:underline-offset-2',
    'hover:[&_[data-text]]:decoration-current',
    '[&_[data-icon]]:text-fg-quaternary hover:[&_[data-icon]]:text-fg-quaternary_hover',
  ].join(' '),

  // Link color - brand text link with underline
  'link-color': [
    'justify-normal rounded p-0! text-brand-secondary',
    'hover:text-brand-secondary_hover',
    'data-[disabled]:text-fg-disabled',
    '[&_[data-text]]:underline [&_[data-text]]:decoration-transparent [&_[data-text]]:underline-offset-2',
    'hover:[&_[data-text]]:decoration-current',
    '[&_[data-icon]]:text-fg-brand-secondary_alt hover:[&_[data-icon]]:text-fg-brand-secondary_hover',
  ].join(' '),

  // Primary destructive - error solid with inner gradient border
  'primary-destructive': [
    'bg-error-solid text-white shadow-xs-skeumorphic ring-1 ring-transparent ring-inset outline-error',
    // Inner border gradient (skeuomorphic effect)
    'before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0% before:corner-squircle',
    'hover:bg-error-solid_hover',
    'data-[pressed]:bg-error-solid_hover data-[pressed]:scale-[0.98]',
    'data-[disabled]:bg-disabled data-[disabled]:text-fg-disabled data-[disabled]:shadow-xs data-[disabled]:ring-disabled_subtle',
    '[&_[data-icon]]:text-button-destructive-primary-icon hover:[&_[data-icon]]:text-button-destructive-primary-icon_hover',
  ].join(' '),

  // Secondary destructive - outlined error
  'secondary-destructive': [
    'bg-primary text-error-primary shadow-xs-skeumorphic ring-1 ring-error_subtle ring-inset outline-error',
    'hover:bg-error-primary hover:text-error-primary_hover',
    'data-[pressed]:bg-error-primary data-[pressed]:scale-[0.98]',
    'data-[disabled]:bg-primary data-[disabled]:shadow-xs data-[disabled]:ring-disabled_subtle data-[disabled]:text-fg-disabled',
    '[&_[data-icon]]:text-fg-error-secondary hover:[&_[data-icon]]:text-fg-error-primary',
  ].join(' '),

  // Tertiary destructive - text error
  'tertiary-destructive': [
    'text-error-primary outline-error',
    'hover:bg-error-primary hover:text-error-primary_hover',
    'data-[pressed]:bg-error-primary data-[pressed]:scale-[0.98]',
    'data-[disabled]:text-fg-disabled',
    '[&_[data-icon]]:text-fg-error-secondary hover:[&_[data-icon]]:text-fg-error-primary',
  ].join(' '),

  // Link destructive - error text link
  'link-destructive': [
    'justify-normal rounded p-0! text-error-primary outline-error',
    'hover:text-error-primary_hover',
    'data-[disabled]:text-fg-disabled',
    '[&_[data-text]]:underline [&_[data-text]]:decoration-transparent [&_[data-text]]:underline-offset-2',
    'hover:[&_[data-text]]:decoration-current',
    '[&_[data-icon]]:text-fg-error-secondary hover:[&_[data-icon]]:text-fg-error-primary',
  ].join(' '),

  // Primary success - success solid with inner gradient border
  'primary-success': [
    'bg-success-solid text-white shadow-xs-skeumorphic ring-1 ring-transparent ring-inset outline-success',
    // Inner border gradient (skeuomorphic effect)
    'before:absolute before:inset-px before:border before:border-white/12 before:mask-b-from-0% before:corner-squircle',
    'hover:bg-success-solid_hover',
    'data-[pressed]:bg-success-solid_hover data-[pressed]:scale-[0.98]',
    'data-[disabled]:bg-disabled data-[disabled]:text-fg-disabled data-[disabled]:shadow-xs data-[disabled]:ring-disabled_subtle',
    '[&_[data-icon]]:text-white hover:[&_[data-icon]]:text-white',
  ].join(' '),

  // Secondary success - outlined success
  'secondary-success': [
    'bg-primary text-success-primary shadow-xs-skeumorphic ring-1 ring-success_subtle ring-inset outline-success',
    'hover:bg-success-primary hover:text-success-primary_hover',
    'data-[pressed]:bg-success-primary data-[pressed]:scale-[0.98]',
    'data-[disabled]:bg-primary data-[disabled]:shadow-xs data-[disabled]:ring-disabled_subtle data-[disabled]:text-fg-disabled',
    '[&_[data-icon]]:text-fg-success-secondary hover:[&_[data-icon]]:text-fg-success-primary',
  ].join(' '),

  // Tertiary success - text success
  'tertiary-success': [
    'text-success-primary outline-success',
    'hover:bg-success-primary hover:text-success-primary_hover',
    'data-[pressed]:bg-success-primary data-[pressed]:scale-[0.98]',
    'data-[disabled]:text-fg-disabled',
    '[&_[data-icon]]:text-fg-success-secondary hover:[&_[data-icon]]:text-fg-success-primary',
  ].join(' '),
}

/**
 * Common styles applied to all buttons
 * Note: corner-squircle is handled by roundnessStyles
 */
export const commonStyles = [
  // Layout
  'group relative inline-flex h-max items-center justify-center',
  'whitespace-nowrap',
  'cursor-pointer',
  // Before pseudo-element setup (used by inner gradient borders)
  'before:absolute',
  // Focus
  'outline-brand',
  'focus-visible:outline-2 focus-visible:outline-offset-2',
  // Transitions
  'transition duration-100 ease-linear',
  'motion-reduce:transition-none',
  // Disabled cursor
  'data-[disabled]:cursor-not-allowed',
  // Icon transition inheritance
  '[&_[data-icon]]:pointer-events-none [&_[data-icon]]:size-5 [&_[data-icon]]:shrink-0 [&_[data-icon]]:transition-inherit-all',
  'data-[disabled]:[&_[data-icon]]:text-fg-disabled_subtle',
].join(' ')

/**
 * Icon styles
 */
export const iconStyles = 'size-5 shrink-0 pointer-events-none'

/**
 * Loading spinner styles
 */
export const loadingStyles = {
  spinner: 'size-5 shrink-0',
  overlay: 'absolute inset-0 flex items-center justify-center',
}
