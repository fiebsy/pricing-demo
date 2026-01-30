// =============================================================================
// Unified Control Panel
// =============================================================================
// Control panel with sidebar navigation that expands on hover.
//
// Features:
// - Sidebar navigation that slides out on hover
// - Section icons/labels for quick navigation
// - Minimize/expand functionality with smooth animations
// - Preset management and copy functionality
// - Base UI ScrollArea for zero layout shift scrolling
// - Unified toggle button that morphs between + and - states
// =============================================================================

'use client'

import { useCallback, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ScrollArea } from '@base-ui/react/scroll-area'
import { cx } from '@/components/utils/cx'

import { PanelProvider, usePanelContext } from './context'
import { ActiveSectionContent } from './components/section-renderer'
import { ActionBar } from './components/action-bar'
import { PanelToggleButton } from './components/panel-toggle-button'
import { SidebarNavigation } from './components/sidebar-navigation'

import type { ControlChangeEvent, UnifiedControlPanelProps } from './types'

// Default position values
const DEFAULT_POSITION = {
  top: '90px',
  bottom: '90px',
  right: '16px',
  width: '260px',
}

// Layout constants - single source of truth for header alignment
const PANEL_HEADER_HEIGHT = 36 // h-9 = 36px

// -----------------------------------------------------------------------------
// Section Slide Animation Variants
// -----------------------------------------------------------------------------
// Slides content up or down based on navigation direction

const SLIDE_DISTANCE = 12 // pixels to slide

const sectionSlideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? SLIDE_DISTANCE : -SLIDE_DISTANCE,
    scale: 0.97,
    opacity: 0,
  }),
  center: {
    y: 0,
    scale: 1,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? -8 : 8,
    opacity: 0,
    transition: { duration: 0.075, ease: 'easeIn' as const },
  }),
}

const sectionSlideTransition = {
  y: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  scale: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  opacity: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
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
  const { isMinimized, activeTab, setActiveTab, toggleMinimized, direction } = usePanelContext()

  // Handle control changes
  const handleControlChange = useCallback(
    (controlId: string, value: unknown) => {
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

  // Panel hover state with delayed collapse
  const [isPanelHovered, setIsPanelHovered] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsPanelHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsPanelHovered(false)
    }, 300) // 300ms delay before collapse
  }, [])

  const hasPresets = presetConfig && presetConfig.presets.length > 0
  const showCopyButton = presetConfig?.showCopyButton !== false && getConfigForCopy
  const showActionBar = hasPresets || showCopyButton || (showReset && onReset)

  // Find active section for header display
  const activeSection = sections.find((s) => s.id === activeTab) || sections[0]

  const cssVariables: React.CSSProperties = {
    '--panel-top': position.top,
    '--panel-bottom': position.bottom,
    '--panel-right': position.right,
    '--panel-width': position.width,
    '--panel-header-height': `${PANEL_HEADER_HEIGHT}px`,
  } as React.CSSProperties

  // Calculate available height for panel content
  const panelMaxHeight = `calc(100vh - var(--panel-top, 90px) - var(--panel-bottom, 90px) - 48px)` // 48px for toggle button row

  // Unified layout - toggle button is ALWAYS in the same spot (top-right of container)
  // Panel content expands/collapses below it
  return (
    <div
      className={cx('fixed z-30', className)}
      style={{
        ...cssVariables,
        top: 'var(--panel-top, 90px)',
        right: 'var(--panel-right, 16px)',
      }}
      onMouseEnter={!isMinimized ? handleMouseEnter : undefined}
      onMouseLeave={!isMinimized ? handleMouseLeave : undefined}
    >
      {/* Toggle Button Row - Always in same position (top-right) */}
      <div className="flex items-center justify-end gap-2 mb-2">
        {/* Breadcrumb (only when expanded) */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5 text-xs"
            >
              <span className="text-tertiary">Controls</span>
              <span className="text-quaternary">/</span>
              <span className="text-primary font-medium truncate max-w-[120px]">
                {activeSection?.title || activeSection?.label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <PanelToggleButton
          isExpanded={!isMinimized}
          onClick={toggleMinimized}
          title={isMinimized ? minimizedTitle : 'Minimize panel'}
          variant="standalone"
        />
      </div>

      {/* Panel Content - Expands below the toggle button */}
      {!isMinimized && (
        <div
          className={cx(
            'relative bg-tertiary rounded-xl overflow-hidden shadow-xl',
            'animate-in fade-in slide-in-from-top-1 duration-200'
          )}
          style={{
            width: 'var(--panel-width, 260px)',
            maxHeight: panelMaxHeight,
          }}
        >
          {/* Sidebar Navigation - Slides out from behind panel */}
          <AnimatePresence>
            {isPanelHovered && (
              <motion.div
                initial={{ x: 140 }}
                animate={{ x: 8 }}
                exit={{ x: 140 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute right-full top-0 bottom-0 z-[-1]"
              >
                <SidebarNavigation
                  sections={sections}
                  activeTabId={activeTab}
                  onTabChange={setActiveTab}
                  forceExpanded
                  headerOffset={0}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Section Content - Auto height, scrolls when needed */}
          <ScrollArea.Root className="max-h-[inherit] overflow-hidden">
            <ScrollArea.Viewport className="max-h-[inherit] overscroll-contain">
              <ScrollArea.Content>
                <div className="p-2.5">
                  <AnimatePresence mode="wait" initial={false} custom={direction}>
                    {activeSection && (
                      <motion.div
                        key={activeSection.id}
                        custom={direction}
                        variants={sectionSlideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={sectionSlideTransition}
                      >
                        <ActiveSectionContent
                          section={activeSection}
                          onChange={handleControlChange}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            
            {/* Scrollbar */}
            <ScrollArea.Scrollbar
              orientation="vertical"
              className={cx(
                'absolute top-1 right-0.5 bottom-1 flex w-1.5',
                'touch-none select-none rounded-full p-px',
                'opacity-0 transition-opacity duration-150',
                'data-[hovering]:opacity-100 data-[scrolling]:opacity-100'
              )}
            >
              <ScrollArea.Thumb 
                className={cx(
                  'relative flex-1 rounded-full',
                  'bg-fg-quaternary hover:bg-fg-quaternary_hover',
                  'transition-colors duration-150'
                )}
              />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>

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
  // Extract section IDs for direction calculation
  const sectionOrder = sections.map((s) => s.id)

  return (
    <PanelProvider
      defaultActiveTab={initialTab}
      defaultMinimized={defaultMinimized}
      minimized={minimized}
      onMinimizedChange={onMinimizedChange}
      sectionOrder={sectionOrder}
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
