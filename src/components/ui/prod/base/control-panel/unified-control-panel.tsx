// =============================================================================
// Unified Control Panel
// =============================================================================
// Optimized control panel with:
// - Minimize/expand functionality
// - React Aria Tabs for proper tab panel routing
// - Cleaner structure and API
// - Preset management and copy functionality
// =============================================================================

'use client'

import { useCallback } from 'react'
import { cx } from '@/components/utils/cx'
import { Tabs as AriaTabs, TabList, Tab, TabPanel } from 'react-aria-components'

import { PanelProvider, usePanelContext } from './context'
import { ActiveSectionContent } from './components/section-renderer'
import { ActionBar } from './components/action-bar'
import { MinimizedHeader } from './components/minimized-header'
import { ScrollableTabList, TabTrigger, MinimizeButton } from './components/tab-navigation'

import type { ControlChangeEvent, UnifiedControlPanelProps } from './types'

// Default position values
const DEFAULT_POSITION = {
  top: '90px',
  bottom: '90px',
  right: '16px',
  width: '320px',
}

// -----------------------------------------------------------------------------
// Panel Inner Component (uses context)
// -----------------------------------------------------------------------------

interface PanelInnerProps<T> extends Omit<UnifiedControlPanelProps<T>, 'config' | 'defaultMinimized' | 'minimized' | 'onMinimizedChange'> {
  sections: UnifiedControlPanelProps<T>['config']['sections']
  position: typeof DEFAULT_POSITION
  title: string
  minimizedTitle: string
  showReset: boolean
  resetLabel: string
  presetConfig?: UnifiedControlPanelProps<T>['config']['presetConfig']
}

function PanelInner<T>({
  sections,
  position,
  title,
  minimizedTitle,
  showReset,
  resetLabel,
  presetConfig,
  className,
  onChange,
  onReset,
  onPresetChange,
  getConfigForCopy,
}: PanelInnerProps<T>) {
  const { isMinimized, activeTab, setActiveTab, toggleMinimized } = usePanelContext()

  // Handle control changes
  const handleControlChange = useCallback(
    (controlId: string, value: unknown) => {
      // Find which section this control belongs to
      // Support both 'groups' and legacy 'subsections' naming
      const section = sections.find((s) => {
        const groups = s.groups || s.subsections || []
        return groups.some((g) => g.controls.some((c) => c.id === controlId))
      })
      const sectionId = section?.id || ''

      const event: ControlChangeEvent = {
        controlId,
        sectionId,
        value,
      }
      onChange(event)
    },
    [sections, onChange]
  )

  const hasPresets = presetConfig && presetConfig.presets.length > 0
  const showCopyButton = presetConfig?.showCopyButton !== false && getConfigForCopy
  const showActionBar = hasPresets || showCopyButton || (showReset && onReset)

  const cssVariables: React.CSSProperties = {
    '--panel-top': position.top,
    '--panel-bottom': position.bottom,
    '--panel-right': position.right,
    '--panel-width': position.width,
  } as React.CSSProperties

  // Minimized state - show just a button
  if (isMinimized) {
    return (
      <div
        className={cx('fixed z-30', className)}
        style={{
          ...cssVariables,
          top: 'var(--panel-top, 90px)',
          right: 'var(--panel-right, 16px)',
        }}
      >
        <MinimizedHeader title={minimizedTitle} />
      </div>
    )
  }

  const isScrollable = sections.length > 4

  // Expanded state - full panel with true tab routing
  return (
    <div
      className={cx(
        'fixed z-30',
        'flex flex-col',
        'overflow-hidden rounded-xl shadow-xl',
        className
      )}
      style={{
        ...cssVariables,
        top: 'var(--panel-top, 90px)',
        bottom: 'var(--panel-bottom, 90px)',
        right: 'var(--panel-right, 16px)',
        width: 'var(--panel-width, 320px)',
      }}
    >
      <AriaTabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        className="flex min-h-0 flex-1 flex-col"
      >
        {/* Tab Navigation - Fixed Height */}
        <div className="bg-quaternary border-primary flex h-10 shrink-0 items-center rounded-t-xl border px-1">
          <ScrollableTabList activeTabId={activeTab} isScrollable={isScrollable}>
            <TabList aria-label="Control sections" className="flex items-center gap-0.5">
              {sections.map((section) => (
                <Tab
                  key={section.id}
                  id={section.id}
                  data-key={section.id}
                  className="group cursor-pointer outline-none"
                >
                  {({ isSelected }) => (
                    <TabTrigger
                      label={section.label || section.tabLabel || section.title}
                      isSelected={isSelected}
                      isScrollable={isScrollable}
                    />
                  )}
                </Tab>
              ))}
            </TabList>
          </ScrollableTabList>

          {/* Minimize button */}
          <MinimizeButton onClick={toggleMinimized} />
        </div>

        {/* Tab Panels - Only active section rendered */}
        {sections.map((section) => (
          <TabPanel
            key={section.id}
            id={section.id}
            className="bg-tertiary border-primary min-h-0 flex-1 overscroll-contain border-x scrollbar-overlay focus:outline-none"
          >
            <div className="pt-2 pb-2.5 pl-2.5 pr-0">
              <ActiveSectionContent
                section={section}
                onChange={handleControlChange}
              />
            </div>
          </TabPanel>
        ))}
      </AriaTabs>

      {/* Action Bar */}
      {showActionBar && (
        <ActionBar
          presetConfig={presetConfig}
          showReset={showReset}
          resetLabel={resetLabel}
          onReset={onReset}
          onPresetChange={onPresetChange}
          getConfigForCopy={getConfigForCopy}
        />
      )}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Main Component
// -----------------------------------------------------------------------------

export function UnifiedControlPanel<T>({
  config,
  onChange,
  onReset,
  onPresetChange,
  getConfigForCopy,
  className,
  defaultMinimized = false,
  minimized,
  onMinimizedChange,
}: UnifiedControlPanelProps<T>) {
  const {
    sections,
    defaultActiveTab,
    position,
    title = 'Controls',
    minimizedTitle = 'Controls',
    showReset = true,
    resetLabel = 'Reset',
    presetConfig,
  } = config

  if (!sections || sections.length === 0) {
    console.warn('UnifiedControlPanel: No sections provided')
    return null
  }

  const pos = { ...DEFAULT_POSITION, ...position }
  const initialTab = defaultActiveTab || sections[0]?.id || ''

  return (
    <PanelProvider
      defaultActiveTab={initialTab}
      defaultMinimized={defaultMinimized}
      minimized={minimized}
      onMinimizedChange={onMinimizedChange}
    >
      <PanelInner
        sections={sections}
        position={pos}
        title={title}
        minimizedTitle={minimizedTitle}
        showReset={showReset}
        resetLabel={resetLabel}
        presetConfig={presetConfig}
        className={className}
        onChange={onChange}
        onReset={onReset}
        onPresetChange={onPresetChange}
        getConfigForCopy={getConfigForCopy}
      />
    </PanelProvider>
  )
}
