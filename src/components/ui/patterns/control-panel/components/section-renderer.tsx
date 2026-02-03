// =============================================================================
// Section Renderer
// =============================================================================
// Renders active section content with collapsible groups.
// Uses CSS grid animation for smooth height transitions.
// =============================================================================

'use client'

import { useState, useId } from 'react'
import { cx } from '@/components/utils/cx'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import type { HugeIconData } from '@/components/ui/core/primitives/icon'
import { ControlGrid, ControlRenderer } from './controls'
import { getSectionIcon } from '../icons'
import type { ControlGroup, Section, SectionType } from '../types'

// -----------------------------------------------------------------------------
// Animated Plus/Minus Icon
// -----------------------------------------------------------------------------

interface AnimatedPlusMinusProps {
  isOpen: boolean
  size?: number
}

function AnimatedPlusMinus({ isOpen, size = 12 }: AnimatedPlusMinusProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      className={cx(
        'text-quaternary transition-transform duration-200 ease-out',
        'motion-reduce:transition-none',
        isOpen && 'rotate-180'
      )}
    >
      {/* Horizontal line (always visible) */}
      <line
        x1="2"
        y1="6"
        x2="10"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Vertical line (animates rotation) */}
      <line
        x1="6"
        y1="2"
        x2="6"
        y2="10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={cx(
          'origin-center transition-transform duration-150 ease-out',
          'motion-reduce:transition-none'
        )}
        style={{ transform: isOpen ? 'rotate(-90deg)' : 'rotate(0deg)' }}
      />
    </svg>
  )
}

// -----------------------------------------------------------------------------
// Collapsible Group with Smooth Animation
// -----------------------------------------------------------------------------

interface CollapsibleGroupProps {
  title?: string
  description?: string
  defaultOpen?: boolean
  /** Section type for automatic icon mapping */
  groupType?: SectionType
  /** Override icon for this group header */
  icon?: HugeIconData
  children: React.ReactNode
}

function CollapsibleGroup({
  title,
  description,
  defaultOpen = true,
  groupType,
  icon,
  children,
}: CollapsibleGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentId = useId()

  // If no title, render children directly without collapse wrapper
  if (!title) {
    return <>{children}</>
  }

  // Resolve icon: explicit icon > groupType mapping > none
  const resolvedIcon = icon ?? (groupType ? getSectionIcon(groupType) : undefined)

  return (
    <div>
      {/* Title header with secondary background */}
      <div className="bg-secondary px-3 py-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between text-left"
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <div className="flex items-center gap-1.5">
            {resolvedIcon && (
              <HugeIcon
                icon={resolvedIcon}
                size="xs"
                color="tertiary"
                className="shrink-0"
              />
            )}
            <div>
              <h5 className="text-tertiary text-xs font-medium">{title}</h5>
              {description && (
                <p className="text-tertiary mt-0.5 text-[10px]">{description}</p>
              )}
            </div>
          </div>
          <AnimatedPlusMinus isOpen={isOpen} />
        </button>
      </div>

      {/* Animated content wrapper using CSS grid */}
      <div
        id={contentId}
        className={cx(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          'motion-reduce:transition-none',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Control Group Renderer
// -----------------------------------------------------------------------------

interface ControlGroupRendererProps {
  group: ControlGroup
  sectionId: string
  onChange: (controlId: string, value: unknown) => void
}

function ControlGroupRenderer({ group, sectionId, onChange }: ControlGroupRendererProps) {
  const {
    title,
    description,
    controls,
    columns = 1,
    defaultCollapsed = false,
    groupType,
    icon,
  } = group

  return (
    <CollapsibleGroup
      title={title}
      description={description}
      defaultOpen={!defaultCollapsed}
      groupType={groupType}
      icon={icon}
    >
      <ControlGrid columns={columns}>
        {controls.map((control) => (
          <ControlRenderer
            key={control.id}
            control={control}
            sectionId={sectionId}
            onChange={onChange}
          />
        ))}
      </ControlGrid>
    </CollapsibleGroup>
  )
}

// -----------------------------------------------------------------------------
// Active Section Content - Renders a single section's groups
// -----------------------------------------------------------------------------

interface ActiveSectionContentProps {
  section: Section
  onChange: (controlId: string, value: unknown) => void
}

export function ActiveSectionContent({ section, onChange }: ActiveSectionContentProps) {
  const { id } = section
  // Support both 'groups' and legacy 'subsections' naming
  const groups = section.groups || section.subsections || []

  // Section title - same priority as sidebar: label > tabLabel > title
  const sectionTitle = section.label || section.tabLabel || section.title

  return (
    <div className="space-y-2">
      {/* Section Title */}
      {sectionTitle && (
        <h4 className="text-tertiary px-1 text-sm font-medium">{sectionTitle}</h4>
      )}

      {/* Control Groups - Each group is its own card */}
      {groups.map((group, index) => (
        <div
          key={`${id}-group-${index}`}
          className="bg-primary overflow-hidden rounded-lg border border-primary"
        >
          <ControlGroupRenderer group={group} sectionId={id} onChange={onChange} />
        </div>
      ))}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Section Renderer - Renders all sections
// -----------------------------------------------------------------------------

interface SectionRendererProps {
  sections: Section[]
  onChange: (controlId: string, value: unknown) => void
}

export function SectionRenderer({ sections, onChange }: SectionRendererProps) {
  return (
    <div className="space-y-2">
      {sections.map((section) => (
        <ActiveSectionContent
          key={section.id}
          section={section}
          onChange={onChange}
        />
      ))}
    </div>
  )
}
