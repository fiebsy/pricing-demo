/**
 * Button Audit Playground
 *
 * Interactive testing environment for auditing button variants, sizes, colors,
 * and padding. Supports single button view and grid visualizations.
 *
 * Core component: src/components/ui/prod/base/button
 *
 * @module playground/button-audit
 */

'use client'

import * as React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { Breadcrumbs } from '@/components/ui/deprecated/nav'
import {
  UnifiedControlPanel,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'
import { Button } from '@/components/ui/core/primitives/button'
import type { ButtonVariant, ButtonSize, ButtonRoundness } from '@/components/ui/core/primitives/button'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import Add01Icon from '@hugeicons-pro/core-stroke-rounded/Add01Icon'

import type { ButtonAuditConfig, ContentMode } from './config/types'
import {
  DEFAULT_BUTTON_AUDIT_CONFIG,
  BUTTON_AUDIT_PRESETS,
  getPresetConfig,
  ALL_VARIANTS,
  ALL_SIZES,
  STANDARD_VARIANTS,
  DESTRUCTIVE_VARIANTS,
} from './config'
import { buildButtonAuditPanelConfig } from './panels'

// =============================================================================
// HELPERS
// =============================================================================

function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const result = structuredClone(obj) as Record<string, unknown>
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    if (!(keys[i] in current)) {
      current[keys[i]] = {}
    }
    current = current[keys[i]] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result as T
}

function getBackgroundClass(bg: string): string {
  switch (bg) {
    case 'primary':
      return 'bg-primary'
    case 'secondary':
      return 'bg-secondary'
    case 'tertiary':
      return 'bg-tertiary'
    case 'brand-solid':
      return 'bg-brand-solid'
    default:
      return 'bg-primary'
  }
}

function getVariantLabel(variant: ButtonVariant): string {
  const labels: Record<ButtonVariant, string> = {
    primary: 'Primary',
    secondary: 'Secondary',
    tertiary: 'Tertiary',
    reentry: 'Reentry',
    shine: 'Shine',
    'link-gray': 'Link Gray',
    'link-color': 'Link Color',
    'primary-destructive': 'Primary Dest.',
    'secondary-destructive': 'Secondary Dest.',
    'tertiary-destructive': 'Tertiary Dest.',
    'link-destructive': 'Link Dest.',
    'primary-success': 'Primary Success',
    'secondary-success': 'Secondary Success',
    'tertiary-success': 'Tertiary Success',
    tab: 'Tab',
  }
  return labels[variant] || variant
}

function getSizeLabel(size: ButtonSize): string {
  return size.toUpperCase()
}

// =============================================================================
// PADDING COLOR OVERLAY
// =============================================================================

/**
 * Color-mapped padding overlay for debugging.
 * Shows different colors for each padding side:
 * - Red: Left padding
 * - Blue: Right padding
 * - Green: Top padding
 * - Yellow: Bottom padding
 */
function PaddingColorOverlay() {
  return (
    <>
      {/* Left padding - Red */}
      <div
        className="absolute left-0 top-0 bottom-0 bg-red-500/40 pointer-events-none"
        style={{
          width: 'var(--padding-left, 0)',
          // Use CSS to measure actual padding
        }}
      />
      {/* Right padding - Blue */}
      <div
        className="absolute right-0 top-0 bottom-0 bg-blue-500/40 pointer-events-none"
        style={{ width: 'var(--padding-right, 0)' }}
      />
      {/* Top padding - Green */}
      <div
        className="absolute top-0 left-0 right-0 bg-green-500/40 pointer-events-none"
        style={{ height: 'var(--padding-top, 0)' }}
      />
      {/* Bottom padding - Yellow */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-yellow-500/40 pointer-events-none"
        style={{ height: 'var(--padding-bottom, 0)' }}
      />
    </>
  )
}

/**
 * Wrapper that measures and displays padding as colored overlays
 */
function PaddingDebugWrapper({
  children,
  showOverlay
}: {
  children: React.ReactNode
  showOverlay: boolean
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [padding, setPadding] = React.useState({ top: 0, right: 0, bottom: 0, left: 0 })

  React.useEffect(() => {
    if (showOverlay && ref.current) {
      const button = ref.current.querySelector('button')
      if (button) {
        const styles = window.getComputedStyle(button)
        setPadding({
          top: parseFloat(styles.paddingTop),
          right: parseFloat(styles.paddingRight),
          bottom: parseFloat(styles.paddingBottom),
          left: parseFloat(styles.paddingLeft),
        })
      }
    }
  }, [showOverlay])

  return (
    <div ref={ref} className="relative">
      {children}
      {showOverlay && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {/* Left padding - Red */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-red-500/50"
            style={{ width: `${padding.left}px` }}
          />
          {/* Right padding - Blue */}
          <div
            className="absolute right-0 top-0 bottom-0 bg-blue-500/50"
            style={{ width: `${padding.right}px` }}
          />
          {/* Top padding - Green */}
          <div
            className="absolute top-0 bg-green-500/50"
            style={{
              height: `${padding.top}px`,
              left: `${padding.left}px`,
              right: `${padding.right}px`,
            }}
          />
          {/* Bottom padding - Yellow */}
          <div
            className="absolute bottom-0 bg-yellow-500/50"
            style={{
              height: `${padding.bottom}px`,
              left: `${padding.left}px`,
              right: `${padding.right}px`,
            }}
          />
        </div>
      )}
      {showOverlay && (
        <div className="absolute -bottom-5 left-0 right-0 text-[9px] text-center text-tertiary whitespace-nowrap">
          L:{padding.left} R:{padding.right} T:{padding.top} B:{padding.bottom}
        </div>
      )}
    </div>
  )
}

// =============================================================================
// BUTTON CELL COMPONENT
// =============================================================================

interface ButtonCellProps {
  variant: ButtonVariant
  size: ButtonSize
  roundness: ButtonRoundness
  text: string
  iconOnly?: boolean
  showIconLeading: boolean
  showIconTrailing: boolean
  isLoading: boolean
  showTextWhileLoading: boolean
  disabled: boolean
  showLabel: boolean
  showPaddingOverlay: boolean
  showMeasurements: boolean
  label?: string
}

function ButtonCell({
  variant,
  size,
  roundness,
  text,
  iconOnly = false,
  showIconLeading,
  showIconTrailing,
  isLoading,
  showTextWhileLoading,
  disabled,
  showLabel,
  showPaddingOverlay,
  label,
}: ButtonCellProps) {
  const buttonElement = iconOnly ? (
    <Button
      variant={variant}
      size={size}
      roundness={roundness}
      iconLeading={Add01Icon}
      isLoading={isLoading}
      showTextWhileLoading={showTextWhileLoading}
      disabled={disabled}
    />
  ) : (
    <Button
      variant={variant}
      size={size}
      roundness={roundness}
      iconLeading={showIconLeading ? Add01Icon : undefined}
      iconTrailing={showIconTrailing ? ArrowRight01Icon : undefined}
      isLoading={isLoading}
      showTextWhileLoading={showTextWhileLoading}
      disabled={disabled}
    >
      {text}
    </Button>
  )

  return (
    <div className="flex flex-col items-center gap-2 pb-5">
      <PaddingDebugWrapper showOverlay={showPaddingOverlay}>
        {buttonElement}
      </PaddingDebugWrapper>

      {showLabel && label && (
        <span className="text-xs text-tertiary text-center">{label}</span>
      )}
    </div>
  )
}

// =============================================================================
// DUAL BUTTON CELL (for "both" content mode)
// =============================================================================

interface DualButtonCellProps {
  variant: ButtonVariant
  size: ButtonSize
  roundness: ButtonRoundness
  text: string
  isLoading: boolean
  showTextWhileLoading: boolean
  disabled: boolean
  showLabel: boolean
  showPaddingOverlay: boolean
  label?: string
}

function DualButtonCell({
  variant,
  size,
  roundness,
  text,
  isLoading,
  showTextWhileLoading,
  disabled,
  showLabel,
  showPaddingOverlay,
  label,
}: DualButtonCellProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        {/* Text button */}
        <div className="relative">
          <Button
            variant={variant}
            size={size}
            roundness={roundness}
            isLoading={isLoading}
            showTextWhileLoading={showTextWhileLoading}
            disabled={disabled}
          >
            {text}
          </Button>
          {showPaddingOverlay && (
            <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-error-primary/50 rounded-xl" />
          )}
        </div>

        {/* Icon-only button */}
        <div className="relative">
          <Button
            variant={variant}
            size={size}
            roundness={roundness}
            iconLeading={Add01Icon}
            isLoading={isLoading}
            showTextWhileLoading={showTextWhileLoading}
            disabled={disabled}
          />
          {showPaddingOverlay && (
            <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-error-primary/50 rounded-xl" />
          )}
        </div>
      </div>

      {showLabel && label && (
        <span className="text-xs text-tertiary text-center">{label}</span>
      )}
    </div>
  )
}

// =============================================================================
// GRID DISPLAYS
// =============================================================================

interface GridDisplayProps {
  config: ButtonAuditConfig
}

function SingleButtonDisplay({ config }: GridDisplayProps) {
  const { button, display } = config
  const isIconOnly = display.contentMode === 'icon-only'
  const isBoth = display.contentMode === 'both'

  if (isBoth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <DualButtonCell
          variant={button.variant}
          size={button.size}
          roundness={button.roundness}
          text={button.text}
          isLoading={button.isLoading}
          showTextWhileLoading={button.showTextWhileLoading}
          disabled={button.disabled}
          showLabel={display.showLabels}
          showPaddingOverlay={display.showPaddingOverlay}
          label={`${getVariantLabel(button.variant)} / ${getSizeLabel(button.size)}`}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <ButtonCell
        variant={button.variant}
        size={button.size}
        roundness={button.roundness}
        text={button.text}
        iconOnly={isIconOnly}
        showIconLeading={button.showIconLeading}
        showIconTrailing={button.showIconTrailing}
        isLoading={button.isLoading}
        showTextWhileLoading={button.showTextWhileLoading}
        disabled={button.disabled}
        showLabel={display.showLabels}
        showPaddingOverlay={display.showPaddingOverlay}
        showMeasurements={display.showMeasurements}
        label={`${getVariantLabel(button.variant)} / ${getSizeLabel(button.size)}${isIconOnly ? ' (icon)' : ''}`}
      />
    </div>
  )
}

function GridVariantsDisplay({ config }: GridDisplayProps) {
  const { button, display, grid } = config
  const isIconOnly = display.contentMode === 'icon-only'
  const isBoth = display.contentMode === 'both'

  const renderVariantCell = (variant: ButtonVariant) => {
    if (isBoth) {
      return (
        <DualButtonCell
          key={variant}
          variant={variant}
          size={button.size}
          roundness={button.roundness}
          text={button.text}
          isLoading={button.isLoading}
          showTextWhileLoading={button.showTextWhileLoading}
          disabled={button.disabled}
          showLabel={display.showLabels}
          showPaddingOverlay={display.showPaddingOverlay}
          label={getVariantLabel(variant)}
        />
      )
    }

    return (
      <ButtonCell
        key={variant}
        variant={variant}
        size={button.size}
        roundness={button.roundness}
        text={button.text}
        iconOnly={isIconOnly}
        showIconLeading={button.showIconLeading}
        showIconTrailing={button.showIconTrailing}
        isLoading={button.isLoading}
        showTextWhileLoading={button.showTextWhileLoading}
        disabled={button.disabled}
        showLabel={display.showLabels}
        showPaddingOverlay={display.showPaddingOverlay}
        showMeasurements={display.showMeasurements}
        label={getVariantLabel(variant)}
      />
    )
  }

  return (
    <div className="space-y-8">
      {/* Standard Variants */}
      <div>
        <h3 className="text-sm font-medium text-secondary mb-4">Standard Variants</h3>
        <div
          className="grid items-end"
          style={{
            gridTemplateColumns: `repeat(${grid.columns}, minmax(0, 1fr))`,
            gap: `${grid.gap}px`,
          }}
        >
          {STANDARD_VARIANTS.map(renderVariantCell)}
        </div>
      </div>

      {/* Destructive Variants */}
      <div>
        <h3 className="text-sm font-medium text-secondary mb-4">Destructive Variants</h3>
        <div
          className="grid items-end"
          style={{
            gridTemplateColumns: `repeat(${grid.columns}, minmax(0, 1fr))`,
            gap: `${grid.gap}px`,
          }}
        >
          {DESTRUCTIVE_VARIANTS.map(renderVariantCell)}
        </div>
      </div>
    </div>
  )
}

function GridSizesDisplay({ config }: GridDisplayProps) {
  const { button, display, grid } = config
  const isIconOnly = display.contentMode === 'icon-only'
  const isBoth = display.contentMode === 'both'

  if (isBoth) {
    return (
      <div
        className="grid items-end justify-items-center"
        style={{
          gridTemplateColumns: `repeat(${Math.min(grid.columns, ALL_SIZES.length)}, minmax(0, 1fr))`,
          gap: `${grid.gap}px`,
        }}
      >
        {ALL_SIZES.map((size) => (
          <DualButtonCell
            key={size}
            variant={button.variant}
            size={size}
            roundness={button.roundness}
            text={button.text}
            isLoading={button.isLoading}
            showTextWhileLoading={button.showTextWhileLoading}
            disabled={button.disabled}
            showLabel={display.showLabels}
            showPaddingOverlay={display.showPaddingOverlay}
            label={getSizeLabel(size)}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className="grid items-end justify-items-center"
      style={{
        gridTemplateColumns: `repeat(${Math.min(grid.columns, ALL_SIZES.length)}, minmax(0, 1fr))`,
        gap: `${grid.gap}px`,
      }}
    >
      {ALL_SIZES.map((size) => (
        <ButtonCell
          key={size}
          variant={button.variant}
          size={size}
          roundness={button.roundness}
          text={button.text}
          iconOnly={isIconOnly}
          showIconLeading={button.showIconLeading}
          showIconTrailing={button.showIconTrailing}
          isLoading={button.isLoading}
          showTextWhileLoading={button.showTextWhileLoading}
          disabled={button.disabled}
          showLabel={display.showLabels}
          showPaddingOverlay={display.showPaddingOverlay}
          showMeasurements={display.showMeasurements}
          label={getSizeLabel(size)}
        />
      ))}
    </div>
  )
}

function GridAllDisplay({ config }: GridDisplayProps) {
  const { button, display, grid } = config
  const isIconOnly = display.contentMode === 'icon-only'
  const isBoth = display.contentMode === 'both'

  const renderButton = (variant: ButtonVariant, size: ButtonSize) => {
    if (isBoth) {
      return (
        <div className="flex items-center justify-center gap-1">
          <Button
            variant={variant}
            size={size}
            roundness={button.roundness}
            isLoading={button.isLoading}
            showTextWhileLoading={button.showTextWhileLoading}
            disabled={button.disabled}
          >
            {button.text}
          </Button>
          <Button
            variant={variant}
            size={size}
            roundness={button.roundness}
            iconLeading={Add01Icon}
            isLoading={button.isLoading}
            showTextWhileLoading={button.showTextWhileLoading}
            disabled={button.disabled}
          />
        </div>
      )
    }

    if (isIconOnly) {
      return (
        <Button
          variant={variant}
          size={size}
          roundness={button.roundness}
          iconLeading={Add01Icon}
          isLoading={button.isLoading}
          showTextWhileLoading={button.showTextWhileLoading}
          disabled={button.disabled}
        />
      )
    }

    return (
      <Button
        variant={variant}
        size={size}
        roundness={button.roundness}
        iconLeading={button.showIconLeading ? Add01Icon : undefined}
        iconTrailing={button.showIconTrailing ? ArrowRight01Icon : undefined}
        isLoading={button.isLoading}
        showTextWhileLoading={button.showTextWhileLoading}
        disabled={button.disabled}
      >
        {button.text}
      </Button>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header row with size labels */}
      <div
        className="grid items-center"
        style={{
          gridTemplateColumns: `120px repeat(${ALL_SIZES.length}, minmax(0, 1fr))`,
          gap: `${grid.gap}px`,
        }}
      >
        <div /> {/* Empty corner cell */}
        {ALL_SIZES.map((size) => (
          <div key={size} className="text-xs font-medium text-secondary text-center">
            {getSizeLabel(size)}
          </div>
        ))}
      </div>

      {/* Variant rows */}
      {ALL_VARIANTS.map((variant) => (
        <div
          key={variant}
          className="grid items-center"
          style={{
            gridTemplateColumns: `120px repeat(${ALL_SIZES.length}, minmax(0, 1fr))`,
            gap: `${grid.gap}px`,
          }}
        >
          {/* Variant label */}
          <div className="text-xs text-tertiary truncate pr-2">
            {getVariantLabel(variant)}
          </div>

          {/* Buttons for each size */}
          {ALL_SIZES.map((size) => (
            <div key={`${variant}-${size}`} className="flex justify-center">
              {renderButton(variant, size)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function ButtonAuditPlayground() {
  // Config state
  const [config, setConfig] = useState<ButtonAuditConfig>(DEFAULT_BUTTON_AUDIT_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  // Build panel configuration
  const panelConfig = useMemo(
    () => buildButtonAuditPanelConfig(config, BUTTON_AUDIT_PRESETS, activePresetId),
    [config, activePresetId]
  )

  // Handle control changes
  const handleControlChange = useCallback((event: ControlChangeEvent) => {
    const { controlId, value } = event
    setActivePresetId(null)
    setConfig((prev) => setNestedValue(prev, controlId, value))
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const presetConfig = getPresetConfig(presetId)
    setConfig(presetConfig)
    setActivePresetId(presetId)
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_BUTTON_AUDIT_CONFIG)
    setActivePresetId('default')
  }, [])

  // Get config for copy button
  const getConfigForCopy = useCallback(() => {
    return config
  }, [config])

  // Render the appropriate display based on mode
  const renderDisplay = () => {
    switch (config.display.mode) {
      case 'single':
        return <SingleButtonDisplay config={config} />
      case 'grid-variants':
        return <GridVariantsDisplay config={config} />
      case 'grid-sizes':
        return <GridSizesDisplay config={config} />
      case 'grid-all':
        return <GridAllDisplay config={config} />
      default:
        return <SingleButtonDisplay config={config} />
    }
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Breadcrumbs */}
      <div className="nav-clearance px-6">
        <div className="flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: 'Playground', href: '/playground' },
              { label: 'Button Audit' },
            ]}
          />
          <div className="text-xs text-tertiary">
            {activePresetId ? `Preset: ${activePresetId}` : 'Custom config'}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="pr-[352px] pb-24 md:pb-0">
        <div className="flex flex-col min-h-[calc(100vh-120px)] p-8">
          {/* Description */}
          <div className="mb-8 max-w-2xl">
            <h1 className="text-2xl font-semibold text-primary mb-2">
              Button Audit
            </h1>
            <p className="text-tertiary">
              Audit and visualize button variants, sizes, colors, and padding.
              Use the grid views to compare all variants and sizes at once.
              Toggle padding overlays and measurements for debugging.
            </p>
          </div>

          {/* Size Reference */}
          <div className="mb-6 flex flex-wrap items-center gap-4 text-xs text-quaternary">
            <span className="font-medium text-tertiary">Size reference:</span>
            <span>XS: gap-0.5 px-2 py-1.5 text-xs</span>
            <span>SM: gap-1 px-3 py-2 text-sm</span>
            <span>MD: gap-1 px-3.5 py-2.5 text-sm</span>
            <span>LG: gap-1.5 px-4 py-2.5 text-md</span>
            <span>XL: gap-1.5 px-4.5 py-3 text-md</span>
          </div>

          {/* Component Preview */}
          <div
            className={`rounded-2xl p-8 mb-6 transition-colors ${getBackgroundClass(config.display.backgroundColor)}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-primary">
                Component Preview
              </span>
              <div className="text-xs text-tertiary flex gap-3">
                <span>Mode: {config.display.mode}</span>
                <span>Content: {config.display.contentMode}</span>
              </div>
            </div>

            {renderDisplay()}
          </div>

          {/* Current Config Display */}
          <div className="bg-tertiary rounded-xl p-4">
            <div className="text-xs font-mono text-tertiary">
              <div className="mb-2 text-secondary font-medium">
                Current Config (for copy):
              </div>
              <pre className="text-xs overflow-auto max-h-48">
                {JSON.stringify(getConfigForCopy(), null, 2)}
              </pre>
            </div>
          </div>

          {/* Feature Indicator */}
          <div className="mt-6 text-xs text-quaternary">
            <p>
              <strong>Variants:</strong> primary, secondary, tertiary, shine,
              link-gray, link-color, and destructive variants
            </p>
            <p className="mt-1">
              <strong>Sizes:</strong> xs (new), sm, md, lg, xl
            </p>
            <p className="mt-1">
              <strong>Features:</strong> Loading states, disabled states, icon support,
              roundness options (default, pill, squircle)
            </p>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <UnifiedControlPanel
        config={panelConfig}
        onChange={handleControlChange}
        onPresetChange={handlePresetChange}
        onReset={handleReset}
        getConfigForCopy={getConfigForCopy}
      />
    </div>
  )
}
