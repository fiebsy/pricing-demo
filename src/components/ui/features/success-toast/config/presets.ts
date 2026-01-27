import type { SuccessToastPresetMeta, SuccessToastConfig } from './types'

/**
 * SuccessToast Presets
 *
 * Preset categories:
 * - default: Standard starting point
 * - minimal: Clean, understated
 * - elevated: Premium, with depth effects
 * - brand: Uses brand colors and effects
 */

export const DEFAULT_SUCCESS_TOAST_CONFIG: SuccessToastConfig = {
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 32,
    background: 'secondary',
    shine: 'shine-1',
    shineIntensity: '-subtle',
    cornerShape: 'squircle',
  },
  icon: {
    containerSize: 28,
    iconSize: 20,
    containerBackground: 'tertiary',
    iconColor: 'secondary',
    containerBorderRadius: 10,
  },
  typography: {
    titleSize: 'text-sm',
    titleWeight: 'font-medium',
    titleColor: 'primary',
    subtitleSize: 'text-xs',
    subtitleWeight: 'font-normal',
    subtitleColor: 'tertiary',
  },
  progress: {
    height: 3,
    background: 'tertiary/20',
    fillColor: 'brand-primary',
    borderRadius: 0,
  },
  behavior: {
    duration: 5500,
    animationDuration: 250,
    animationDirection: 'right',
  },
  content: {
    title: 'Changes saved',
    subtitle: 'Your profile has been updated',
  },
}

export const SUCCESS_TOAST_PRESETS: SuccessToastPresetMeta[] = [
  {
    id: 'default',
    name: 'Default',
    category: 'default',
    description: 'Standard success toast',
    data: DEFAULT_SUCCESS_TOAST_CONFIG,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    category: 'minimal',
    description: 'Clean, no effects',
    data: {
      ...DEFAULT_SUCCESS_TOAST_CONFIG,
      container: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 8,
        background: 'primary',
        shine: 'none',
        shineIntensity: '',
        cornerShape: 'round',
      },
      icon: {
        containerSize: 28,
        iconSize: 16,
        containerBackground: 'tertiary',
        iconColor: 'success-primary',
        containerBorderRadius: 6,
      },
      progress: {
        height: 2,
        background: 'tertiary/10',
        fillColor: 'primary',
        borderRadius: 0,
      },
    },
  },
  {
    id: 'elevated',
    name: 'Elevated',
    category: 'elevated',
    description: 'Premium with depth',
    data: {
      ...DEFAULT_SUCCESS_TOAST_CONFIG,
      container: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        background: 'secondary',
        shine: 'shine-2',
        shineIntensity: '',
        cornerShape: 'squircle',
      },
      icon: {
        containerSize: 40,
        iconSize: 24,
        containerBackground: 'success-primary/20',
        iconColor: 'success-primary',
        containerBorderRadius: 12,
      },
      progress: {
        height: 4,
        background: 'tertiary/20',
        fillColor: 'success-primary',
        borderRadius: 2,
      },
    },
  },
  {
    id: 'brand',
    name: 'Brand',
    category: 'brand',
    description: 'Brand-colored accents',
    data: {
      ...DEFAULT_SUCCESS_TOAST_CONFIG,
      container: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 16,
        background: 'secondary',
        shine: 'shine-brand',
        shineIntensity: '-subtle',
        cornerShape: 'squircle',
      },
      icon: {
        containerSize: 32,
        iconSize: 20,
        containerBackground: 'brand-primary/10',
        iconColor: 'brand-primary',
        containerBorderRadius: 8,
      },
      progress: {
        height: 3,
        background: 'tertiary/20',
        fillColor: 'brand-primary',
        borderRadius: 0,
      },
    },
  },
]

export const getPresetById = (id: string): SuccessToastPresetMeta | undefined =>
  SUCCESS_TOAST_PRESETS.find((p) => p.id === id)

export const getPresetsByCategory = (category: string): SuccessToastPresetMeta[] =>
  SUCCESS_TOAST_PRESETS.filter((p) => p.category === category)
