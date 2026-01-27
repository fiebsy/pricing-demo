/**
 * SuccessToast Configuration Types
 *
 * @status incubating
 * @migration-target src/components/ui/prod/features/success-toast
 */

export interface SuccessToastConfig {
  // Container styling
  container: {
    paddingTop: number
    paddingBottom: number
    paddingLeft: number
    paddingRight: number
    borderRadius: number
    background: string
    shine: string
    shineIntensity: string
    cornerShape: 'round' | 'squircle' | 'bevel' | 'scoop'
  }

  // Icon styling
  icon: {
    containerSize: number
    iconSize: number
    containerBackground: string
    iconColor: string
    containerBorderRadius: number
  }

  // Typography
  typography: {
    titleSize: string
    titleWeight: string
    titleColor: string
    subtitleSize: string
    subtitleWeight: string
    subtitleColor: string
  }

  // Progress bar
  progress: {
    height: number
    background: string
    fillColor: string
    borderRadius: number
  }

  // Behavior
  behavior: {
    duration: number
    animationDuration: number
    animationDirection: 'left' | 'right' | 'up' | 'down'
  }

  // Content (for preview)
  content: {
    title: string
    subtitle: string
    /** Optional icon type override - defaults to 'checkmark' */
    iconType?: 'checkmark' | 'party' | 'sparkles' | 'arrow-up'
  }
}

export interface SuccessToastPresetMeta {
  id: string
  name: string
  description?: string
  category?: 'default' | 'minimal' | 'elevated' | 'brand' | 'custom'
  data: SuccessToastConfig
}
