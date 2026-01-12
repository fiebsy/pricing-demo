/**
 * Unified Control Panel
 *
 * Complete control panel component with tabs, sections, and action bar.
 * Supports minimize/expand functionality for better screen real estate management.
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import { cx } from '@/components/utils/cx'

import type { ControlSection, UnifiedControlPanelProps } from './types'
import { PanelProvider, usePanelState, usePanelActions } from './context/panel-context'
import { useScrollSync } from './hooks/use-scroll-sync'
import { TabNavigation } from './components/tab-navigation'
import { SectionRenderer } from './components/section-renderer'
import { ActionBar } from './components/action-bar'
import { MinimizedPill } from './components/minimized-pill'

// -----------------------------------------------------------------------------
// Panel Header with Minimize Button
// -----------------------------------------------------------------------------

interface PanelHeaderProps {
  title?: string
}

const PanelHeader = ({ title }: PanelHeaderProps) => {
  const { toggleMinimize } = usePanelActions()

  return (
    <div className="flex items-center justify-between border-b border-primary px-3 py-2">
      {title && (
        <h3 className="text-primary text-sm font-semibold">{title}</h3>
      )}
      <button
        type="button"
        onClick={toggleMinimize}
        className={cx(
          'ml-auto flex items-center justify-center',
          'size-7 rounded-md',
          'text-secondary hover:text-primary',
          'hover:bg-tertiary',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand'
        )}
        aria-label="Minimize panel"
        title="Minimize panel"
      >
        {/* Minimize icon */}
        <svg
          className="size-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 14 10 14 10 20" />
          <polyline points="20 10 14 10 14 4" />
          <line x1="14" y1="10" x2="21" y2="3" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      </button>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Panel Content (internal)
// -----------------------------------------------------------------------------

interface PanelContentProps<T = unknown> extends UnifiedControlPanelProps<T> {}

const PanelContent = <T,>({
  config,
  onChange,
  onReset,
  onPresetChange,
  getConfigForCopy,
  className,
}: PanelContentProps<T>) => {
  const { sections, showReset, resetLabel, presetConfig, title, minimizedTitle } = config
  // Split context usage for optimal performance
  const { activeTab, isScrollingProgrammatically, isMinimized } = usePanelState()
  const { setActiveTab, scrollToSection, containerRef } = usePanelActions()

  const [isInitialMount, setIsInitialMount] = useState(true)

  // Tab change handler
  const handleTabChange = useCallback(
    (tabId: string) => {
      scrollToSection(tabId)
    },
    [scrollToSection]
  )

  // Scroll sync
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections])
  useScrollSync({
    sectionIds,
    onSectionInView: setActiveTab,
    isDisabled: isScrollingProgrammatically,
    containerRef,
  })

  // Enable toggle handler
  const handleEnableToggle = useCallback(
    (sectionId: string, enabled: boolean) => {
      const section = sections.find((s) => s.id === sectionId)
      if (section?.enableToggle) {
        onChange({
          controlId: section.enableToggle.key,
          sectionId,
          value: enabled,
        })
      }
    },
    [sections, onChange]
  )

  // Position styles
  const positionStyle = useMemo(
    () => ({
      '--panel-top': config.position?.top ?? '80px',
      '--panel-bottom': config.position?.bottom ?? '16px',
      '--panel-right': config.position?.right ?? '16px',
      '--panel-width': config.position?.width ?? '320px',
    }),
    [config.position]
  )

  // Render minimized pill when minimized
  if (isMinimized) {
    return <MinimizedPill title={minimizedTitle ?? title ?? 'Controls'} />
  }

  return (
    <div
      className={cx(
        'pointer-events-auto fixed flex flex-col',
        'bg-secondary rounded-xl shadow-xl',
        // Animation
        'animate-in fade-in slide-in-from-right-4 duration-200',
        'motion-reduce:animate-none',
        className
      )}
      style={{
        top: 'var(--panel-top)',
        bottom: 'var(--panel-bottom)',
        right: 'var(--panel-right)',
        width: 'var(--panel-width)',
        ...positionStyle,
      }}
    >
      {/* Header with minimize button */}
      <PanelHeader title={title} />

      {/* Tabs */}
      <TabNavigation
        sections={sections}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isInitialMount={isInitialMount}
        onInitialMountComplete={() => setIsInitialMount(false)}
      />

      {/* Scrollable Content */}
      <div
        ref={containerRef as React.RefObject<HTMLDivElement>}
        className="flex-1 overflow-y-auto overflow-x-hidden p-3"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="space-y-4">
          {sections.map((section: ControlSection) => (
            <SectionRenderer
              key={section.id}
              section={section}
              onChange={onChange}
              onEnableToggle={handleEnableToggle}
              defaultCollapsed={section.defaultCollapsed}
            />
          ))}
        </div>
      </div>

      {/* Action Bar */}
      <ActionBar
        presetConfig={presetConfig}
        showReset={showReset}
        resetLabel={resetLabel}
        onReset={onReset}
        onPresetChange={onPresetChange}
        getConfigForCopy={getConfigForCopy}
      />
    </div>
  )
}

// -----------------------------------------------------------------------------
// Unified Control Panel (exported)
// -----------------------------------------------------------------------------

export const UnifiedControlPanel = <T,>(props: UnifiedControlPanelProps<T>) => {
  const defaultTab = props.config.defaultActiveTab ?? props.config.sections[0]?.id ?? ''
  const defaultMinimized = props.config.defaultMinimized ?? false

  return (
    <PanelProvider defaultActiveTab={defaultTab} defaultMinimized={defaultMinimized}>
      <PanelContent {...props} />
    </PanelProvider>
  )
}
