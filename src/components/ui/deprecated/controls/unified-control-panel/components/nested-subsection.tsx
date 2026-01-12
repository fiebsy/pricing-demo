/**
 * Nested Subsection
 *
 * Renders subsections with support for nesting depth and gradient fade
 */

'use client'

import { useState, memo, useCallback } from 'react'
import { cx } from '@/components/utils/cx'

import type {
  ControlConfig,
  ControlSubsection,
  GradientFadeConfig,
} from '../types'
import {
  ControlGroup,
  ControlGrid,
  ControlRenderer,
  SectionHeader,
} from './control-primitives'

// -----------------------------------------------------------------------------
// Gradient Fade Overlay
// -----------------------------------------------------------------------------

interface GradientFadeOverlayProps {
  config: GradientFadeConfig
  className?: string
}

export const GradientFadeOverlay = memo(({ config, className }: GradientFadeOverlayProps) => {
  if (!config.enabled) return null

  const {
    direction = 'to-b',
    from = 'transparent',
    to = 'var(--color-background-secondary)',
    opacity = 50,
  } = config

  const directionToCss: Record<string, string> = {
    'to-t': 'to top',
    'to-b': 'to bottom',
    'to-l': 'to left',
    'to-r': 'to right',
    'to-br': 'to bottom right',
    'to-bl': 'to bottom left',
    'to-tr': 'to top right',
    'to-tl': 'to top left',
  }

  return (
    <div
      className={cx('pointer-events-none absolute inset-0 rounded-md', className)}
      style={{
        background: `linear-gradient(${directionToCss[direction] || 'to bottom'}, ${from}, ${to})`,
        opacity: opacity / 100,
      }}
    />
  )
})
GradientFadeOverlay.displayName = 'GradientFadeOverlay'

// -----------------------------------------------------------------------------
// Nested Inset Wrapper
// -----------------------------------------------------------------------------

interface NestedInsetProps {
  depth: number
  gradientFade?: GradientFadeConfig
  children: React.ReactNode
  className?: string
}

export const NestedInset = memo(({ depth, gradientFade, children, className }: NestedInsetProps) => {
  const depthStyles = {
    1: 'bg-secondary/50 border-secondary/50',
    2: 'bg-tertiary/50 border-tertiary/50',
    3: 'bg-quaternary/50 border-quaternary/50',
  }

  const bgClass = depthStyles[Math.min(depth, 3) as keyof typeof depthStyles] || depthStyles[1]

  return (
    <div
      className={cx(
        'relative overflow-hidden rounded-md border p-3',
        bgClass,
        className
      )}
    >
      {gradientFade?.enabled && <GradientFadeOverlay config={gradientFade} />}
      <div className="relative z-10">{children}</div>
    </div>
  )
})
NestedInset.displayName = 'NestedInset'

export const NestedCard = NestedInset

// -----------------------------------------------------------------------------
// Nested Subsection Renderer
// -----------------------------------------------------------------------------

interface NestedSubsectionProps {
  subsection: ControlSubsection
  sectionId: string
  onChange: (event: { controlId: string; sectionId: string; value: unknown }) => void
  depth?: number
}

export const NestedSubsection = memo(({
  subsection,
  sectionId,
  onChange,
  depth = 0,
}: NestedSubsectionProps) => {
  const {
    title,
    description,
    controls,
    columns = 1,
    collapsible = false,
    defaultCollapsed = false,
    gradientFade,
    children,
  } = subsection

  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  const handleControlChange = useCallback(
    (controlId: string) => (value: unknown) => {
      onChange({ controlId, sectionId, value })
    },
    [onChange, sectionId]
  )

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  const renderControl = (control: ControlConfig) => {
    if (!control || !control.id) {
      console.warn('NestedSubsection: Invalid control detected', control)
      return null
    }

    if (control.type === 'inline-toggle') {
      return (
        <ControlRenderer
          key={control.id}
          config={control}
          onChange={handleControlChange(control.id)}
        />
      )
    }

    if (control.type === 'custom') {
      return (
        <div key={control.id}>
          {control.label && <SectionHeader title={control.label} />}
          {control.render()}
        </div>
      )
    }

    if (control.type === 'color-array') {
      return (
        <div key={control.id}>
          <SectionHeader title={control.label} />
          <ControlRenderer config={control} onChange={handleControlChange(control.id)} />
        </div>
      )
    }

    return (
      <ControlGroup key={control.id} label={control.label} description={control.description}>
        <ControlRenderer config={control} onChange={handleControlChange(control.id)} />
      </ControlGroup>
    )
  }

  const validControls = controls.filter((control) => control != null)

  const content = (
    <div className="space-y-4">
      {title && (
        collapsible ? (
          <button
            type="button"
            onClick={toggleCollapse}
            className="flex w-full items-center justify-between text-left hover:opacity-80"
          >
            <div>
              <h5 className="text-secondary text-xs font-semibold uppercase tracking-wider">
                {title}
              </h5>
              {description && (
                <p className="text-tertiary mt-0.5 text-[11px]">{description}</p>
              )}
            </div>
            <span
              className={cx(
                'text-tertiary text-xs transition-transform duration-200',
                isCollapsed ? '-rotate-90' : 'rotate-0'
              )}
            >
              ▼
            </span>
          </button>
        ) : (
          <div>
            <h5 className="text-secondary text-xs font-semibold uppercase tracking-wider">
              {title}
            </h5>
            {description && (
              <p className="text-tertiary mt-0.5 text-[11px]">{description}</p>
            )}
          </div>
        )
      )}

      {(!collapsible || !isCollapsed) && (
        <>
          {validControls.length > 0 && (
            columns === 1 ? (
              <div className="space-y-4">{validControls.map(renderControl)}</div>
            ) : (
              <ControlGrid columns={columns}>{validControls.map(renderControl)}</ControlGrid>
            )
          )}

          {children && children.length > 0 && (
            <div className="mt-3 space-y-3">
              {children.map((child, index) => (
                <NestedSubsection
                  key={`${sectionId}-nested-${index}`}
                  subsection={child}
                  sectionId={sectionId}
                  onChange={onChange}
                  depth={(child.depth ?? depth) + 1}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )

  const shouldWrap = depth > 0 || gradientFade?.enabled

  if (shouldWrap) {
    return (
      <NestedInset depth={depth} gradientFade={gradientFade}>
        {content}
      </NestedInset>
    )
  }

  return content
})
NestedSubsection.displayName = 'NestedSubsection'
