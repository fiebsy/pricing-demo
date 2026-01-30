/**
 * SectionTabs Component
 *
 * Mind/Voice tabs with animated sliding indicator.
 *
 * @module b/profile-v2/components/edit-panel
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Brain01Icon from '@hugeicons-pro/core-stroke-rounded/Brain01Icon'
import Mic01Icon from '@hugeicons-pro/core-stroke-rounded/Mic01Icon'
import { TabIndicator } from './TabIndicator'
import type { SectionTabsV2Props, EditPanelSection } from '../../types'

// =============================================================================
// TABS CONFIG
// =============================================================================

interface TabConfig {
  id: EditPanelSection
  label: string
  icon: typeof Brain01Icon
}

const TABS: TabConfig[] = [
  { id: 'mind', label: 'Mind', icon: Brain01Icon },
  { id: 'voice', label: 'Voice', icon: Mic01Icon },
]

// =============================================================================
// COMPONENT
// =============================================================================

export function SectionTabs({
  activeSection,
  onSectionChange,
  className,
}: SectionTabsV2Props) {
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])
  const [indicatorStyle, setIndicatorStyle] = React.useState({ left: 0, width: 0 })

  // Update indicator position when active tab changes
  React.useEffect(() => {
    const activeIndex = TABS.findIndex((tab) => tab.id === activeSection)
    const activeTab = tabRefs.current[activeIndex]
    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      })
    }
  }, [activeSection])

  return (
    <div
      className={cn(
        'relative flex items-center gap-6 border-b border-white/10',
        className
      )}
    >
      {/* Tab buttons */}
      {TABS.map((tab, index) => {
        const isActive = activeSection === tab.id
        const Icon = tab.icon

        return (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[index] = el }}
            type="button"
            onClick={() => onSectionChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2',
              'pb-3 px-1',
              'text-sm font-medium',
              'motion-safe:transition-colors motion-safe:duration-150',
              'motion-reduce:transition-none',
              isActive
                ? 'text-primary'
                : 'text-secondary hover:text-primary'
            )}
          >
            <HugeIcon
              icon={Icon}
              size={16}
              strokeWidth={2}
            />
            <span>{tab.label}</span>
          </button>
        )
      })}

      {/* Animated underline indicator */}
      <span
        className="absolute -bottom-px h-[3px] bg-quaternary rounded-full motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out motion-reduce:transition-none"
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />
    </div>
  )
}
