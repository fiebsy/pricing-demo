/**
 * Style Mappers
 *
 * Tailwind class mappings for playground styling options.
 */

import type {
  FontSizeOption,
  FontWeightOption,
  TextColorOption,
  OpacityOption,
  PageBackground,
  BackgroundOption,
  BorderColorOption,
} from '../config/types'

// ============================================================================
// PAGE BACKGROUND
// ============================================================================

const PAGE_BACKGROUND_MAP: Record<PageBackground, string> = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
}

export function getPageBackgroundClass(bg: PageBackground): string {
  return PAGE_BACKGROUND_MAP[bg] ?? 'bg-primary'
}

// ============================================================================
// TEXT STYLES
// ============================================================================

const TEXT_COLOR_MAP: Record<TextColorOption, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  brand: 'text-brand',
}

export function getTextColorClass(color: TextColorOption): string {
  return TEXT_COLOR_MAP[color] ?? 'text-primary'
}

const FONT_SIZE_MAP: Record<FontSizeOption, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
}

export function getFontSizeClass(size: FontSizeOption): string {
  return FONT_SIZE_MAP[size] ?? 'text-sm'
}

const FONT_WEIGHT_MAP: Record<FontWeightOption, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
}

export function getFontWeightClass(weight: FontWeightOption): string {
  return FONT_WEIGHT_MAP[weight] ?? 'font-normal'
}

const OPACITY_MAP: Record<OpacityOption, string> = {
  '100': 'opacity-100',
  '80': 'opacity-80',
  '60': 'opacity-60',
  '40': 'opacity-40',
}

export function getOpacityClass(opacity: OpacityOption): string {
  return OPACITY_MAP[opacity] ?? 'opacity-100'
}

// ============================================================================
// BACKGROUND
// ============================================================================

const BACKGROUND_MAP: Record<BackgroundOption, string> = {
  none: '',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  tertiary: 'bg-tertiary',
  quaternary: 'bg-quaternary',
}

export function getBackgroundClass(bg: BackgroundOption): string {
  return BACKGROUND_MAP[bg] ?? 'bg-secondary'
}

// ============================================================================
// BORDER COLOR
// ============================================================================

const BORDER_COLOR_MAP: Record<BorderColorOption, string> = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  tertiary: 'border-tertiary',
  quaternary: 'border-quaternary',
  brand: 'border-brand',
}

export function getBorderColorClass(color: BorderColorOption): string {
  return BORDER_COLOR_MAP[color] ?? 'border-primary'
}
