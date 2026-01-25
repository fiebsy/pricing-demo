// =============================================================================
// Section Renderer
// =============================================================================
// Renders active section content with collapsible groups.
// Uses CSS grid animation for smooth height transitions.
// =============================================================================

'use client'

import { useState, useId } from 'react'
import { cx } from '@/components/utils/cx'
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
}

function CollapsibleGroup({ title, description, defaultOpen = true, children }: CollapsibleGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentId = useId()

  // If no title, render children directly without collapse wrapper
  if (!title) {
    return <div className="space-y-4">{children}</div>
  }

  return (
    <div>
      {/* Title header with secondary background and bottom border */}
      <div className="-mx-3 -mt-3 border-b border-primary bg-secondary px-3 py-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between text-left"
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <div>
            <h5 className="text-tertiary text-[10px] font-medium uppercase tracking-wider">
              {title}
            </h5>
            {description && (
              <p className="text-tertiary mt-0.5 text-[10px]">{description}</p>
            )}
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
        <div className="overflow-hidden">
          <div className="space-y-4 pt-3">{children}</div>
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
  const { title, description, controls, columns = 1, defaultCollapsed = false } = group

  return (
    <CollapsibleGroup
      title={title}
      description={description}
      defaultOpen={!defaultCollapsed}
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
  const { id, title } = section
  // Support both 'groups' and legacy 'subsections' naming
  const groups = section.groups || section.subsections || []

  return (
    <div className="space-y-2">
      {/* Section Header */}
      <h4 className="text-tertiary px-1 text-[10px] font-medium uppercase tracking-wider">{title}</h4>

      {/* Control Groups - Each group is its own card */}
      <div className="space-y-2">
        {groups.map((group, index) => (
          <div
            key={`${id}-group-${index}`}
            className="bg-primary overflow-hidden rounded-lg border border-primary p-3 shadow-sm"
          >
            <ControlGroupRenderer
              group={group}
              sectionId={id}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
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
