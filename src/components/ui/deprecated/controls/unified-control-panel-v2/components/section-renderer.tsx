/**
 * Section Renderer
 *
 * Renders a section with collapsible content using Base UI Collapsible.
 */

'use client'

import { Collapsible } from '@base-ui/react/collapsible'
import { cx } from '@/components/utils/cx'
import { ControlRenderer, ControlGroup } from './control-renderer'
import type { Section, ControlGroup as ControlGroupType, ControlChangeEvent } from '../types'

// =============================================================================
// Section Header
// =============================================================================

interface SectionHeaderProps {
  title: string
  isOpen: boolean
}

function SectionHeader({ title, isOpen }: SectionHeaderProps) {
  return (
    <Collapsible.Trigger
      className={cx(
        'group flex w-full items-center justify-between py-3 text-left',
        'transition-opacity duration-150 hover:opacity-80'
      )}
    >
      <h4 className="text-primary text-sm font-semibold">{title}</h4>
      <ChevronIcon isOpen={isOpen} />
    </Collapsible.Trigger>
  )
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={cx(
        'text-tertiary size-4 transition-transform duration-200 ease-out',
        isOpen ? 'rotate-0' : '-rotate-90'
      )}
      viewBox="0 0 16 16"
      fill="none"
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
}

// =============================================================================
// Control Group Renderer
// =============================================================================

interface GroupRendererProps {
  group: ControlGroupType
  sectionId: string
  onChange: (event: ControlChangeEvent) => void
}

function GroupRenderer({ group, sectionId, onChange }: GroupRendererProps) {
  const { title, description, controls, columns = 1 } = group

  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columns]

  return (
    <div className="space-y-4">
      {title && (
        <div className="border-secondary -mx-4 border-b px-4 pb-2">
          <h5 className="text-secondary font-mono text-xs font-semibold uppercase tracking-wider">
            {title}
          </h5>
          {description && (
            <p className="text-tertiary mt-1 text-xs">{description}</p>
          )}
        </div>
      )}

      <div className={cx('grid gap-4', gridClass)}>
        {controls.map((control) => (
          <ControlGroup
            key={control.id}
            label={control.label}
            description={control.description}
          >
            <ControlRenderer
              control={control}
              onChange={(value) =>
                onChange({
                  controlId: control.id,
                  sectionId,
                  value,
                })
              }
            />
          </ControlGroup>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// Section Renderer
// =============================================================================

interface SectionRendererProps {
  section: Section
  onChange: (event: ControlChangeEvent) => void
  defaultCollapsed?: boolean
}

export function SectionRenderer({
  section,
  onChange,
  defaultCollapsed = false,
}: SectionRendererProps) {
  const { id, title, groups } = section
  const sectionTitle = title || section.label

  return (
    <section id={id} data-section-id={id} className="scroll-mt-32">
      <div className="bg-primary border-primary overflow-hidden rounded-lg border">
        <Collapsible.Root defaultOpen={!defaultCollapsed}>
          {/* Header */}
          <div className="border-secondary border-b px-4">
            <SectionHeader title={sectionTitle} isOpen={!defaultCollapsed} />
          </div>

          {/* Collapsible content */}
          <Collapsible.Panel
            className={cx(
              'overflow-hidden',
              'transition-[height] duration-300 ease-out',
              'data-[closed]:h-0'
            )}
            style={{
              height: 'var(--collapsible-panel-height)',
            }}
          >
            <div className="space-y-6 p-4">
              {groups.map((group, index) => (
                <GroupRenderer
                  key={`${id}-group-${index}`}
                  group={group}
                  sectionId={id}
                  onChange={onChange}
                />
              ))}
            </div>
          </Collapsible.Panel>
        </Collapsible.Root>
      </div>
    </section>
  )
}
