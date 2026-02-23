// =============================================================================
// Section Renderer
// =============================================================================
// Renders active section content with collapsible groups.
// Uses CSS grid animation for smooth height transitions.
// =============================================================================

'use client'

import { useState, useId } from 'react'
import { cx } from '../utils'
import { ControlGrid, ControlRenderer } from './controls'
import type { ControlGroup, Section } from '../types'

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
  children: React.ReactNode
  /** Nesting depth for visual indentation */
  depth?: number
}

function CollapsibleGroup({
  title,
  description,
  defaultOpen = true,
  children,
  depth = 0,
}: CollapsibleGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentId = useId()

  // If no title, render children directly without collapse wrapper
  if (!title) {
    return <>{children}</>
  }

  const isNested = depth > 0

  return (
    <div className={cx(isNested && 'ml-3 border-l-2 border-secondary')}>
      {/* Title header with secondary background */}
      <div className={cx('bg-secondary px-3 py-2', isNested && 'bg-tertiary')}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between text-left"
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <div>
            <h5
              className={cx(
                'text-xs font-medium',
                isNested ? 'text-quaternary' : 'text-tertiary'
              )}
            >
              {title}
            </h5>
            {description && (
              <p className="text-tertiary mt-0.5 text-[10px]">{description}</p>
            )}
          </div>
          <AnimatedPlusMinus isOpen={isOpen} size={isNested ? 10 : 12} />
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
  /** Nesting depth for visual indentation */
  depth?: number
}

function ControlGroupRenderer({
  group,
  sectionId,
  onChange,
  depth = 0,
}: ControlGroupRendererProps) {
  const {
    title,
    description,
    controls,
    columns = 1,
    defaultCollapsed = false,
    nestedGroups,
  } = group

  return (
    <CollapsibleGroup
      title={title}
      description={description}
      defaultOpen={!defaultCollapsed}
      depth={depth}
    >
      {/* Inline controls (e.g., Title field) */}
      {controls.length > 0 && (
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
      )}

      {/* Nested groups */}
      {nestedGroups && nestedGroups.length > 0 && (
        <div className="space-y-1">
          {nestedGroups.map((nestedGroup, index) => (
            <ControlGroupRenderer
              key={`${sectionId}-nested-${index}`}
              group={nestedGroup}
              sectionId={sectionId}
              onChange={onChange}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
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
