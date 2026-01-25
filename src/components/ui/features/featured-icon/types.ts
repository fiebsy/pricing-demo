import type { FC, ReactNode, Ref } from 'react'

/**
 * FeaturedIcon size variants
 */
export type FeaturedIconSize = 'sm' | 'md' | 'lg' | 'xl'

/**
 * FeaturedIcon color variants
 */
export type FeaturedIconColor = 'brand' | 'gray' | 'success' | 'warning' | 'error'

/**
 * FeaturedIcon theme variants
 * - light: Soft background with colored icon
 * - gradient: Two-layer gradient with solid inner circle
 * - dark: Solid background with white icon and skeumorphic shadow
 * - modern: White background with ring border and shadow
 * - modern-neue: Elevated card style with inset shadow
 * - outline: Icon with concentric ring outlines
 */
export type FeaturedIconTheme = 'light' | 'gradient' | 'dark' | 'outline' | 'modern' | 'modern-neue'

/**
 * FeaturedIcon props
 */
export interface FeaturedIconProps {
  ref?: Ref<HTMLDivElement>
  children?: ReactNode
  className?: string
  /**
   * Icon component - can be:
   * - HugeIcon array (from @hugeicons-pro/*)
   * - React function component (FC)
   * - React element (ReactNode)
   */
  icon?: FC<{ className?: string }> | ReactNode | any
  /**
   * Size of the featured icon container
   * @default 'sm'
   */
  size?: FeaturedIconSize
  /**
   * Color scheme
   */
  color: FeaturedIconColor
  /**
   * Visual theme variant
   * @default 'light'
   */
  theme?: FeaturedIconTheme
}
