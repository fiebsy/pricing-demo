/**
 * Button Configuration Constants
 */

import type { ButtonConfig } from '../types'

export const DEFAULT_BUTTON_CONFIG: ButtonConfig = {
  intent: 'primary',
  size: 'md',
  roundness: 'moderate',
  label: 'Button',
  showIcon: true,
  iconOnly: false,
  ring: false,
  ringOpacity: 100,
  borderWidth: 0,
}

export const BUTTON_INTENT_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Ghost', value: 'ghost' },
  { label: 'Error', value: 'error' },
]

export const BUTTON_SIZE_OPTIONS = [
  { label: 'XS', value: 'xs' },
  { label: 'SM', value: 'sm' },
  { label: 'MD', value: 'md' },
  { label: 'LG', value: 'lg' },
  { label: 'XL', value: 'xl' },
]
