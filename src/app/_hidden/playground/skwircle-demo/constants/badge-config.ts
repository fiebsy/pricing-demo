/**
 * Badge Configuration Constants
 */

import type { BadgeConfig } from '../types'

export const DEFAULT_BADGE_CONFIG: BadgeConfig = {
  type: 'badge',
  size: 'md',
  color: 'brand',
  roundness: 'rounded',
  label: 'Badge',
  showIcon: true,
}

export const BADGE_TYPE_OPTIONS = [
  { label: 'Badge', value: 'badge' },
  { label: 'Pill', value: 'pill' },
]

export const BADGE_SIZE_OPTIONS = [
  { label: 'XS', value: 'xs' },
  { label: 'SM', value: 'sm' },
  { label: 'MD', value: 'md' },
  { label: 'LG', value: 'lg' },
]

export const BADGE_COLOR_OPTIONS = [
  { label: 'Gray', value: 'gray', color: 'var(--color-fg-quaternary)' },
  { label: 'Brand', value: 'brand', color: 'var(--color-brand-primary)' },
  { label: 'Success', value: 'success', color: 'var(--color-success-primary)' },
  { label: 'Warning', value: 'warning', color: 'var(--color-warning-primary)' },
  { label: 'Error', value: 'error', color: 'var(--color-error-primary)' },
  { label: 'Blue', value: 'blue', color: '#3b82f6' },
  { label: 'Indigo', value: 'indigo', color: '#6366f1' },
  { label: 'Purple', value: 'purple', color: '#8b5cf6' },
  { label: 'Orange', value: 'orange', color: '#f97316' },
]
