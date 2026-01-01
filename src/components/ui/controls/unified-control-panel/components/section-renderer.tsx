/**
 * Section Renderer
 *
 * Renders individual sections with collapsible behavior
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import { cx } from '@/components/utils/cx'
import { Checkbox } from '@/components/ui/primitives/checkbox'

import type { CollapseConfig, ControlSection } from '../types'
import { usePanelContext } from '../context/panel-context'
import { NestedSubsection } from './nested-subsection'

// -----------------------------------------------------------------------------
// Default Configuration
// -----------------------------------------------------------------------------

const DEFAULT_EXPAND_BUTTON = {
  show: true,
  text: 'See all',
  textColorClass: 'text-secondary',
  showIcon: true,
  position: 'center' as const,
  bottomOffset: 4,
  showBorder: true,
  borderColorClass: 'border-primary',
  showShadow: false,
}

const DEFAULT_COLLAPSE_BUTTON = {
  show: false,
  text: 'Show less',
  textColorClass: 'text-secondary',
  showIcon: true,
  position: 'center' as const,
  showBorder: false,
  borderColorClass: 'border-primary',
  showShadow: false,
}

const DEFAULT_GRADIENT = {
  enabled: true,
  height: 80,
  intensity: 100,
}

// -----------------------------------------------------------------------------
// Chevron Icon
// -----------------------------------------------------------------------------

const ChevronIcon = ({ isExpanded, className }: { isExpanded: boolean; className?: string }) => (
  <svg
    className={cx(
      'size-4 transition-transform duration-200 ease-out',
      isExpanded ? 'rotate-0' : '-rotate-90',
      className
    )}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// -----------------------------------------------------------------------------
// Section Header
// -----------------------------------------------------------------------------

interface SectionHeaderProps {
  title: string
  isExpanded: boolean
  onToggleExpand: () => void
  enableToggle?: {
    enabled: boolean
    key: string
  }
  onEnableChange?: (enabled: boolean) => void
}

const SectionHeader = ({
  title,
  isExpanded,
  onToggleExpand,
  enableToggle,
  onEnableChange,
}: SectionHeaderProps) => {
  return (
    <div className="border-secondary border-b pb-3">
      <button
        type="button"
        onClick={onToggleExpand}
        className="group flex w-full items-center justify-between text-left transition-opacity duration-150 hover:opacity-80"
      >
        <h4 className="text-primary text-sm font-semibold">{title}</h4>

        <div className="flex items-center gap-2">
          {enableToggle && (
            <div
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <Checkbox
                size="sm"
                isSelected={enableToggle.enabled}
                onChange={(enabled: boolean) => onEnableChange?.(enabled)}
              />
            </div>
          )}

          <div className="text-tertiary flex size-6 items-center justify-center">
            <ChevronIcon isExpanded={isExpanded} />
          </div>
        </div>
      </button>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Action Button Component
// -----------------------------------------------------------------------------

interface ActionButtonProps {
  onClick: () => void
  text: string
  textColorClass: string
  showIcon: boolean
  position: 'center' | 'left' | 'right'
  bottomOffset?: number
  showBorder?: boolean
  borderColorClass?: string
  showShadow?: boolean
  iconDirection: 'down' | 'up'
  ariaLabel: string
}

const ActionButton = ({
  onClick,
  text,
  textColorClass,
  showIcon,
  position,
  bottomOffset = 0,
  showBorder = false,
  borderColorClass = 'border-primary',
  showShadow = false,
  iconDirection,
  ariaLabel,
}: ActionButtonProps) => {
  const positionClass = {
    center: 'justify-center',
    left: 'justify-start pl-4',
    right: 'justify-end pr-4',
  }[position]

  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'absolute right-0 left-0 z-20 flex h-8 cursor-pointer items-center rounded-b-lg',
        'transition-opacity duration-150 hover:opacity-80 active:opacity-60',
        positionClass
      )}
      style={{ bottom: `${bottomOffset}px` }}
      aria-label={ariaLabel}
    >
      <span
        className={cx(
          'bg-primary/80 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm',
          'transition-transform duration-150 hover:scale-105 active:scale-95',
          textColorClass,
          showBorder && 'border',
          showBorder && borderColorClass,
          showShadow && 'shadow-sm'
        )}
      >
        <span>{text}</span>
        {showIcon && (
          <svg
            className={cx('size-3', iconDirection === 'up' && 'rotate-180')}
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
    </button>
  )
}

// -----------------------------------------------------------------------------
// Gradient Overlay Component
// -----------------------------------------------------------------------------

interface GradientOverlayProps {
  config: NonNullable<CollapseConfig['gradient']>
  isVisible: boolean
}

const GradientOverlay = ({ config, isVisible }: GradientOverlayProps) => {
  const { enabled = true, height = 80, intensity = 100 } = config

  if (!enabled || !isVisible) return null

  const alpha = intensity / 100

  return (
    <>
      <div
        className={cx(
          'pointer-events-none absolute right-0 bottom-0 left-0 dark:hidden',
          'transition-opacity duration-200',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          height: `${height}px`,
          background: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,${alpha * 0.8}) 40%, rgba(255,255,255,${alpha}) 100%)`,
        }}
      />
      <div
        className={cx(
          'pointer-events-none absolute right-0 bottom-0 left-0 hidden dark:block',
          'transition-opacity duration-200',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{
          height: `${height}px`,
          background: `linear-gradient(to bottom, rgba(23,23,23,0) 0%, rgba(23,23,23,${alpha * 0.8}) 40%, rgba(23,23,23,${alpha}) 100%)`,
        }}
      />
    </>
  )
}

// -----------------------------------------------------------------------------
// Section Renderer
// -----------------------------------------------------------------------------

interface SectionRendererProps {
  section: ControlSection
  onChange: (event: { controlId: string; sectionId: string; value: unknown }) => void
  onEnableToggle?: (sectionId: string, enabled: boolean) => void
  defaultCollapsed?: boolean
}

export const SectionRenderer = ({
  section,
  onChange,
  onEnableToggle,
  defaultCollapsed = false,
}: SectionRendererProps) => {
  const { id, title, enableToggle, subsections, collapseConfig } = section
  const { registerSection } = usePanelContext()
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(!defaultCollapsed)
  const [contentHeight, setContentHeight] = useState<number | null>(null)

  const isEnabled = enableToggle ? enableToggle.enabled : true

  const config = {
    collapsedHeight: collapseConfig?.collapsedHeight ?? 100,
    expandButton: {
      ...DEFAULT_EXPAND_BUTTON,
      ...collapseConfig?.expandButton,
    },
    collapseButton: {
      ...DEFAULT_COLLAPSE_BUTTON,
      ...collapseConfig?.collapseButton,
    },
    gradient: {
      ...DEFAULT_GRADIENT,
      ...collapseConfig?.gradient,
    },
    animationDuration: collapseConfig?.animationDuration ?? 300,
  }

  useEffect(() => {
    if (contentRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContentHeight(entry.contentRect.height)
        }
      })
      observer.observe(contentRef.current)
      return () => observer.disconnect()
    }
  }, [])

  useEffect(() => {
    registerSection(id, sectionRef.current)
    return () => registerSection(id, null)
  }, [id, registerSection])

  const handleEnableChange = (enabled: boolean) => {
    onEnableToggle?.(id, enabled)
  }

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  const maxHeight = isExpanded
    ? (contentHeight ? `${contentHeight}px` : '2000px')
    : `${config.collapsedHeight}px`

  return (
    <section
      ref={sectionRef}
      id={id}
      data-section-id={id}
      className="scroll-mt-32"
    >
      <div className="bg-primary border-primary overflow-hidden rounded-lg border">
        <div className="p-4 pb-0">
          <SectionHeader
            title={title}
            isExpanded={isExpanded}
            onToggleExpand={handleToggleExpand}
            enableToggle={enableToggle}
            onEnableChange={handleEnableChange}
          />
        </div>

        <div className="relative">
          <div
            className="overflow-hidden transition-[max-height] ease-out"
            style={{
              maxHeight,
              transitionDuration: `${config.animationDuration}ms`,
            }}
          >
            <div ref={contentRef}>
              {isEnabled && (
                <div className="space-y-6 p-4 pt-4">
                  {subsections.map((subsection, index) => (
                    <NestedSubsection
                      key={`${id}-subsection-${index}`}
                      subsection={subsection}
                      sectionId={id}
                      onChange={onChange}
                      depth={subsection.depth || 0}
                    />
                  ))}
                </div>
              )}

              {!isEnabled && (
                <div className="p-4 pt-4">
                  <p className="text-tertiary text-center text-xs italic">
                    Section disabled
                  </p>
                </div>
              )}
            </div>
          </div>

          <GradientOverlay
            config={config.gradient}
            isVisible={!isExpanded}
          />

          {!isExpanded && config.expandButton.show && (
            <ActionButton
              onClick={handleToggleExpand}
              text={config.expandButton.text}
              textColorClass={config.expandButton.textColorClass}
              showIcon={config.expandButton.showIcon}
              position={config.expandButton.position}
              bottomOffset={config.expandButton.bottomOffset}
              showBorder={config.expandButton.showBorder}
              borderColorClass={config.expandButton.borderColorClass}
              showShadow={config.expandButton.showShadow}
              iconDirection="down"
              ariaLabel="Expand section"
            />
          )}

          {isExpanded && config.collapseButton.show && (
            <ActionButton
              onClick={handleToggleExpand}
              text={config.collapseButton.text}
              textColorClass={config.collapseButton.textColorClass}
              showIcon={config.collapseButton.showIcon}
              position={config.collapseButton.position}
              bottomOffset={0}
              showBorder={config.collapseButton.showBorder}
              borderColorClass={config.collapseButton.borderColorClass}
              showShadow={config.collapseButton.showShadow}
              iconDirection="up"
              ariaLabel="Collapse section"
            />
          )}
        </div>
      </div>
    </section>
  )
}
