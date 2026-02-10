'use client'

import { cn } from '@/lib/utils'
import { SectionTabBar } from './section-tab-bar'
import { useNavigation, useCurrentSection, useHasTabs } from './nav-context'
import type { TitleSize } from './nav-config'

const TITLE_SIZE_CLASSES: Record<TitleSize, string> = {
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
}

interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  const { config } = useNavigation()
  const section = useCurrentSection()
  const hasTabs = useHasTabs()

  const { pageHeader, tabBar } = config
  const { topSpacing, bottomSpacing, titleSize, showTitle, showDescription, tabBarPosition } = pageHeader

  // Only show tabs in header when position is 'above-metrics'
  const showTabsHere = hasTabs && section && tabBarPosition === 'above-metrics'

  // If no title and no tabs here, don't render anything
  if (!showTitle && !showTabsHere) {
    return null
  }

  return (
    <div
      className="space-y-4"
      style={{
        paddingTop: topSpacing,
        paddingBottom: bottomSpacing,
      }}
    >
      {/* Title and description (conditional) */}
      {showTitle && (
        <div className="space-y-1">
          <h1
            className={cn(
              'font-semibold text-primary',
              TITLE_SIZE_CLASSES[titleSize]
            )}
          >
            {title}
          </h1>
          {showDescription && description && (
            <p className="text-sm text-secondary">{description}</p>
          )}
        </div>
      )}

      {/* Tab bar (only when position is above-metrics) */}
      {showTabsHere && (
        <SectionTabBar section={section} config={tabBar} />
      )}
    </div>
  )
}
