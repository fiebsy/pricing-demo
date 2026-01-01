/**
 * Input Configuration Constants
 */

import type { InputConfig } from '../types'

export const DEFAULT_INPUT_CONFIG: InputConfig = {
  roundness: 'moderate',
  state: 'default',
  placeholder: 'Enter your email...',
  value: '',
  showIcon: true,
  ring: false,
  ringColor: 'outline-color-brand',
  ringWidth: 2,
}

export const INPUT_STATE_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Focused', value: 'focused' },
  { label: 'Error', value: 'error' },
  { label: 'Disabled', value: 'disabled' },
]

export const RING_COLOR_OPTIONS = [
  { label: 'Brand', value: 'outline-color-brand', color: 'var(--color-brand-primary)' },
  { label: 'Error', value: 'outline-color-error', color: 'var(--color-error-primary)' },
  { label: 'Success', value: 'outline-color-success', color: 'var(--color-success-primary)' },
]
