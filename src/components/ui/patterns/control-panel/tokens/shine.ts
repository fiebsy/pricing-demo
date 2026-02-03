// =============================================================================
// Shine Effect Token Constants
// =============================================================================
// Shine preset and intensity options for control panel dropdowns.
// =============================================================================

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface ShinePresetOption {
  label: string
  value: string
  /** Base class name (without intensity) */
  className: string
}

export interface ShineIntensityOption {
  label: string
  value: 'subtle' | 'normal' | 'intense'
  /** Suffix to append to shine class */
  suffix: string
}

export interface ShineShadowOption {
  label: string
  value: string
  /** Shadow class name */
  className: string
}

// -----------------------------------------------------------------------------
// Shine Preset Options
// -----------------------------------------------------------------------------

export const SHINE_PRESET_OPTIONS: ShinePresetOption[] = [
  { label: 'None', value: 'none', className: '' },
  { label: 'Shine 1', value: '1', className: 'shine-1' },
  { label: 'Shine 2', value: '2', className: 'shine-2' },
  { label: 'Shine 3', value: '3', className: 'shine-3' },
  { label: 'Brand', value: 'brand', className: 'shine-brand' },
  { label: 'Success', value: 'success', className: 'shine-success' },
  { label: 'Warning', value: 'warning', className: 'shine-warning' },
  { label: 'Error', value: 'error', className: 'shine-error' },
]

// -----------------------------------------------------------------------------
// Shine Intensity Options
// -----------------------------------------------------------------------------

export const SHINE_INTENSITY_OPTIONS: ShineIntensityOption[] = [
  { label: 'Subtle', value: 'subtle', suffix: '-subtle' },
  { label: 'Normal', value: 'normal', suffix: '' },
  { label: 'Intense', value: 'intense', suffix: '-intense' },
]

// -----------------------------------------------------------------------------
// Shadow Options (often paired with shine)
// -----------------------------------------------------------------------------

export const SHINE_SHADOW_OPTIONS: ShineShadowOption[] = [
  { label: 'None', value: 'none', className: '' },
  { label: 'XS', value: 'xs', className: 'shadow-xs' },
  { label: 'SM', value: 'sm', className: 'shadow-sm' },
  { label: 'MD', value: 'md', className: 'shadow-md' },
  { label: 'LG', value: 'lg', className: 'shadow-lg' },
  { label: 'XL', value: 'xl', className: 'shadow-xl' },
]

// -----------------------------------------------------------------------------
// Depth Gradient Options (alternative to shine)
// -----------------------------------------------------------------------------

export interface DepthGradientOption {
  label: string
  value: string
  className: string
}

export const DEPTH_GRADIENT_OPTIONS: DepthGradientOption[] = [
  { label: 'None', value: 'none', className: '' },
  { label: 'Depth 1', value: '1', className: 'depth-gradient-1' },
  { label: 'Depth 2', value: '2', className: 'depth-gradient-2' },
  { label: 'Depth 3', value: '3', className: 'depth-gradient-3' },
]

// -----------------------------------------------------------------------------
// Utility Functions
// -----------------------------------------------------------------------------

/**
 * Build the complete shine class name from preset and intensity
 */
export function getShineClassName(
  preset: string,
  intensity: 'subtle' | 'normal' | 'intense' = 'normal'
): string {
  if (preset === 'none' || !preset) return ''

  const presetOption = SHINE_PRESET_OPTIONS.find((p) => p.value === preset)
  if (!presetOption || !presetOption.className) return ''

  const intensityOption = SHINE_INTENSITY_OPTIONS.find((i) => i.value === intensity)
  const suffix = intensityOption?.suffix ?? ''

  return `${presetOption.className}${suffix}`
}

/**
 * Build combined shine and shadow class string
 */
export function getShineWithShadow(
  preset: string,
  intensity: 'subtle' | 'normal' | 'intense' = 'normal',
  shadow?: string
): string {
  const shineClass = getShineClassName(preset, intensity)
  const shadowOption = SHINE_SHADOW_OPTIONS.find((s) => s.value === shadow)
  const shadowClass = shadowOption?.className ?? ''

  return [shineClass, shadowClass].filter(Boolean).join(' ')
}

/** Convert shine options to select control format */
export function toSelectOptions<T extends { label: string; value: string }>(options: T[]) {
  return options.map((o) => ({
    label: o.label,
    value: o.value,
  }))
}
