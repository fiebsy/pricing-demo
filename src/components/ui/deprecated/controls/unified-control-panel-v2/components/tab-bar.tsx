/**
 * Tab Bar
 *
 * Navigation tabs using Base UI Tabs primitive.
 * Provides smooth animated indicator and scroll support.
 */

'use client'

import { Tabs } from '@base-ui/react/tabs'
import { cx } from '@/components/utils/cx'
import type { Section } from '../types'

interface TabBarProps {
  sections: Section[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TabBar({ sections, activeTab, onTabChange }: TabBarProps) {
  const isScrollable = sections.length > 4

  return (
    <Tabs.Root value={activeTab} onValueChange={onTabChange}>
      <Tabs.List
        className={cx(
          'border-secondary bg-primary relative flex items-center overflow-hidden border-b',
          isScrollable && 'overflow-x-auto scrollbar-none'
        )}
      >
        {/* Animated indicator */}
        <Tabs.Indicator
          className={cx(
            'bg-brand absolute bottom-0 h-0.5',
            'transition-all duration-200 ease-out'
          )}
        />

        {sections.map((section) => (
          <Tabs.Tab
            key={section.id}
            value={section.id}
            className={cx(
              'relative z-10 cursor-pointer select-none whitespace-nowrap',
              'px-4 py-3 font-mono text-xs font-medium uppercase tracking-wider',
              'transition-colors duration-150',
              // State styles
              'text-secondary hover:text-primary',
              'data-[selected]:text-primary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset',
              // Size
              isScrollable ? 'shrink-0' : 'flex-1 text-center'
            )}
          >
            {section.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.Root>
  )
}
