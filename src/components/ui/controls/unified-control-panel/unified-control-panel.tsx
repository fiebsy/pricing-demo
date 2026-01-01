/**
 * Unified Control Panel
 *
 * Complete control panel component with tabs, sections, and action bar
 */

'use client'

import { useCallback, useMemo, useState } from 'react'
import { cx } from '@/components/utils/cx'

import type { ControlSection, UnifiedControlPanelProps } from './types'
import { PanelProvider, usePanelContext } from './context/panel-context'
import { useScrollSync } from './hooks/use-scroll-sync'
import { TabNavigation } from './components/tab-navigation'
import { SectionRenderer } from './components/section-renderer'
import { ActionBar } from './components/action-bar'

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
  const { sections, showReset, resetLabel, presetConfig } = config
  const {
    activeTab,
    isScrollingProgrammatically,
    setActiveTab,
    scrollToSection,
    containerRef,
  } = usePanelContext()

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

  return (
    <div
      className={cx(
        'pointer-events-auto fixed flex flex-col',
        'bg-secondary rounded-xl shadow-xl',
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

  return (
    <PanelProvider defaultActiveTab={defaultTab}>
      <PanelContent {...props} />
    </PanelProvider>
  )
}
