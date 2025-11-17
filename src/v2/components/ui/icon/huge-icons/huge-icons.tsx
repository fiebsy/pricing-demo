import { HugeiconsIcon } from '@hugeicons/react'
import type { ComponentProps } from 'react'

interface HugeIconProps extends Omit<ComponentProps<typeof HugeiconsIcon>, 'icon'> {
  icon: any
  className?: string
}

/**
 * Hugeicons PRO wrapper - use ONLY when Untitled UI lacks the specific icon.
 * Maintains consistency with V2 semantic design tokens.
 *
 * @example
 * ```tsx
 * import { HugeIcon } from '@/modules/design-system/v2/components/ui/custom/migrated/huge-icon'
 * import { Blockchain01Icon } from '@hugeicons-pro/core-stroke-rounded'
 *
 * // Using Hugeicons - Untitled UI lacks blockchain icon
 * <HugeIcon icon={Blockchain01Icon} className="text-brand-primary" />
 * ```
 *
 * @see https://hugeicons.com/docs - Browse 40,000+ icons
 */
export function HugeIcon({
  icon,
  size = 20,
  strokeWidth = 1.5,
  className,
  ...props
}: HugeIconProps) {
  // Handle edge cases: null, undefined, or invalid icon
  if (!icon) {
    console.warn('HugeIcon: icon prop is missing or invalid', icon)
    return null
  }

  // Handle default export if icon is wrapped in default property
  // Individual file imports from @hugeicons-pro/core-stroke-rounded export arrays as default
  let iconData = icon?.default || icon

  // The icon should be an array of SVG element definitions
  // Example: [["circle", {...}], ["path", {...}]]
  // @hugeicons/react expects this array format and spreads it: [...currentIcon]
  
  // Ensure iconData is an array (which is what @hugeicons/react expects)
  if (!Array.isArray(iconData)) {
    // If it's not an array, try to extract it from nested properties
    if (typeof iconData === 'object' && iconData !== null) {
      // Check for common nested structures
      if ('icon' in iconData && Array.isArray(iconData.icon)) {
        iconData = iconData.icon
      } else if ('default' in iconData && Array.isArray(iconData.default)) {
        iconData = iconData.default
      } else {
        console.warn('HugeIcon: icon data is not an array format', { 
          icon, 
          iconData, 
          iconType: typeof icon, 
          iconDataType: typeof iconData,
          isArray: Array.isArray(iconData),
          keys: Object.keys(iconData || {})
        })
        return null
      }
    } else {
      console.warn('HugeIcon: icon data is not in expected format (array)', { 
        icon, 
        iconData, 
        iconType: typeof icon 
      })
      return null
    }
  }

  // Validate array structure - should be array of [tag, attrs] tuples
  if (iconData.length > 0 && !Array.isArray(iconData[0])) {
    console.warn('HugeIcon: icon array has invalid structure', { 
      iconData: iconData.slice(0, 2), 
      firstElementType: typeof iconData[0] 
    })
    return null
  }

  try {
    return (
      <HugeiconsIcon
        icon={iconData}
        size={size}
        color="currentColor"  // Inherits from Tailwind semantic tokens
        strokeWidth={strokeWidth}
        className={className}
        {...props}
      />
    )
  } catch (error) {
    console.error('HugeIcon: Error rendering icon', { 
      error, 
      icon, 
      iconData, 
      iconType: typeof icon, 
      iconDataType: typeof iconData,
      isArray: Array.isArray(iconData),
      iconDataLength: Array.isArray(iconData) ? iconData.length : 'N/A'
    })
    return null
  }
}
