'use client'

import { useEffect, useState } from 'react'
import ArrowUp01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import { Badge } from '@/components/ui/prod/base/badge'
import { Button } from '@/components/ui/core/primitives/button'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import { cn } from '@/lib/utils'
import { useMCP } from './MCPProvider'

// Only render in development
const isDev = process.env.NODE_ENV === 'development'

export function DevInspectorOverlay() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isDev || !mounted) return null

  return <InspectorUI />
}

// Highlight component using Tailwind classes
function Highlight({
  rect,
  variant,
}: {
  rect: DOMRect
  variant: 'hover' | 'selected'
}) {
  return (
    <div
      className={cn(
        'pointer-events-none fixed z-[9998] rounded transition-all duration-100 ease-out',
        variant === 'hover' && 'bg-brand-primary/5 ring-1 ring-brand-primary/40',
        variant === 'selected' && 'bg-success-primary/5 ring-1 ring-success-primary/40'
      )}
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }}
    />
  )
}

function InspectorUI() {
  const {
    isInspectorActive,
    toggleInspector,
    hoveredComponent,
    selectedComponent,
    clearSelection,
    syncStatus,
  } = useMCP()

  // Calculate highlight positions
  const [hoverRect, setHoverRect] = useState<DOMRect | null>(null)
  const [selectRect, setSelectRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (hoveredComponent?.element) {
      setHoverRect(hoveredComponent.element.getBoundingClientRect())
    } else {
      setHoverRect(null)
    }
  }, [hoveredComponent])

  useEffect(() => {
    if (selectedComponent?.element) {
      setSelectRect(selectedComponent.element.getBoundingClientRect())
    } else {
      setSelectRect(null)
    }
  }, [selectedComponent])

  // Update highlight positions on scroll/resize
  useEffect(() => {
    const updateRects = () => {
      if (hoveredComponent?.element) {
        setHoverRect(hoveredComponent.element.getBoundingClientRect())
      }
      if (selectedComponent?.element) {
        setSelectRect(selectedComponent.element.getBoundingClientRect())
      }
    }

    window.addEventListener('scroll', updateRects, true)
    window.addEventListener('resize', updateRects)

    return () => {
      window.removeEventListener('scroll', updateRects, true)
      window.removeEventListener('resize', updateRects)
    }
  }, [hoveredComponent, selectedComponent])

  const syncStatusStyles = {
    idle: 'text-quaternary',
    syncing: 'text-warning-primary',
    synced: 'text-success-primary',
    error: 'text-error-primary',
  }

  const syncStatusText = {
    idle: 'Ready',
    syncing: 'Syncing...',
    synced: 'Synced',
    error: 'Error',
  }

  return (
    <>
      {/* Hover highlight */}
      {isInspectorActive && hoverRect && !selectedComponent && (
        <Highlight rect={hoverRect} variant="hover" />
      )}

      {/* Selection highlight */}
      {selectRect && <Highlight rect={selectRect} variant="selected" />}

      {/* Toggle button with shortcut badge and on/off indicator */}
      <Button
        data-mcp-inspector
        onClick={toggleInspector}
        size="xs"
        variant="tertiary"
        className={cn(
          'fixed bottom-4 left-4 z-[9999] font-mono transition-colors',
          isInspectorActive && 'bg-brand-primary/10 ring-1 ring-brand-primary/30'
        )}
      >
        <span
          className={cn(
            'mr-1.5 size-1.5 rounded-full transition-colors',
            isInspectorActive ? 'bg-success-primary' : 'bg-quaternary'
          )}
        />
        Claude
        <Badge
          size="xs"
          color={isInspectorActive ? 'brand' : 'gray'}
          shape="rounded"
          className="ml-1.5 font-mono"
        >
          {isInspectorActive ? 'On' : 'Off'}
        </Badge>
      </Button>

      {/* Info panel */}
      {selectedComponent && (
        <div
          data-mcp-inspector
          className="fixed bottom-4 left-28 z-[9999] max-w-sm rounded-xl bg-primary font-mono text-xs text-primary shadow-lg shine-1-subtle"
        >
          <div className="flex items-center justify-between gap-3 px-3 pt-3 pb-2">
            <span className="font-semibold text-brand-primary">
              {selectedComponent.name}
            </span>
            <div className="flex items-center gap-2">
              {/* Sync status */}
              <span className={cn('flex items-center gap-1 text-[10px]', syncStatusStyles[syncStatus])}>
                <span className="size-1.5 rounded-full bg-current" />
                {syncStatusText[syncStatus]}
              </span>
              {/* Close button */}
              <button
                onClick={clearSelection}
                className="cursor-pointer rounded p-0.5 text-quaternary transition-colors hover:bg-secondary hover:text-secondary"
              >
                <HugeIcon icon={Cancel01Icon} size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {selectedComponent.filePath && (
            <div className="break-all px-3 pb-2 text-[11px] text-tertiary">
              {selectedComponent.filePath}
              {selectedComponent.lineNumber && `:${selectedComponent.lineNumber}`}
            </div>
          )}

          {Object.keys(selectedComponent.props).length > 0 && (
            <div className="mx-3 mb-3 max-h-24 overflow-auto border-t border-primary pt-2">
              <div className="mb-1 text-tertiary">Props:</div>
              <pre className="whitespace-pre-wrap text-[10px] text-secondary">
                {JSON.stringify(selectedComponent.props, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Hover tooltip */}
      {isInspectorActive && hoveredComponent && !selectedComponent && hoverRect && (
        <div
          data-mcp-inspector
          className="pointer-events-none fixed z-[9999] whitespace-nowrap rounded-md bg-brand-solid px-2 py-1 font-mono text-[11px] font-medium text-white shadow-md"
          style={{
            top: hoverRect.top - 28,
            left: hoverRect.left,
          }}
        >
          {hoveredComponent.name}
        </div>
      )}
    </>
  )
}
