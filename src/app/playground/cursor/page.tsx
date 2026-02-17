/**
 * Cursor Playground
 *
 * Core component: ./core/cursor-preview.tsx
 * Migration target: src/components/ui/prod/features/cursor
 *
 * Features:
 * - Replace or follow cursor modes
 * - Magnetic snapping to interactive elements
 * - Spring physics animation
 * - State-aware variants (pointer, pressed, text)
 * - Mix blend modes for creative effects
 *
 * @package motion-plus
 */

'use client'

import { useCallback, useMemo, useState, useRef } from 'react'
import { motion } from 'motion/react'
import { useMagneticPull } from 'motion-plus/react'
import {
  UnifiedControlPanel,
  PlaygroundLayout,
  type ControlChangeEvent,
} from '@/components/ui/patterns/control-panel'

import { CursorPreview } from './core/cursor-preview'
import type { CursorConfig } from './config/types'
import { DEFAULT_CURSOR_CONFIG, CURSOR_PRESETS } from './config/presets'
import { buildCursorPanelConfig } from './panels/panel-config'

// ============================================================================
// Utility: Deep set nested value
// ============================================================================

function setNestedValue<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.')
  const result = structuredClone(obj) as Record<string, unknown>
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {}
    } else {
      current[key] = { ...(current[key] as Record<string, unknown>) }
    }
    current = current[key] as Record<string, unknown>
  }

  current[keys[keys.length - 1]] = value
  return result as T
}

// ============================================================================
// Magnetic Pull Button Component
// ============================================================================

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength: number
  enabled: boolean
}

function MagneticButton({ children, className, strength, enabled }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const pull = useMagneticPull(ref, enabled ? strength : 0)

  return (
    <motion.button
      ref={ref}
      className={className}
      whileTap="pressed"
    >
      <motion.span
        className="flex items-center justify-center gap-2"
        variants={{ pressed: { scale: 0.95 } }}
        style={pull}
      >
        {children}
      </motion.span>
    </motion.button>
  )
}

// ============================================================================
// Magnetic Pull Link Component
// ============================================================================

interface MagneticLinkProps {
  children: React.ReactNode
  className?: string
  strength: number
  enabled: boolean
}

function MagneticLink({ children, className, strength, enabled }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const pull = useMagneticPull(ref, enabled ? strength : 0)

  return (
    <motion.a
      ref={ref}
      href="#"
      className={className}
      onClick={(e) => e.preventDefault()}
    >
      <motion.span style={pull}>{children}</motion.span>
    </motion.a>
  )
}

// ============================================================================
// Demo Content
// ============================================================================

interface DemoContentProps {
  pullEnabled: boolean
  pullStrength: number
}

function DemoContent({ pullEnabled, pullStrength }: DemoContentProps) {
  return (
    <div className="flex flex-col items-center gap-8 select-none">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-display-sm font-display text-primary">
          Cursor Playground
        </h1>
        <p className="text-secondary mt-2 text-sm">
          {pullEnabled
            ? `Magnetic pull active (${(pullStrength * 100).toFixed(0)}%) - hover buttons to see them pull toward cursor`
            : 'Move your cursor around to see the effect'
          }
        </p>
      </div>

      {/* Interactive Demo Elements with Magnetic Pull */}
      <div className="flex flex-wrap justify-center gap-4 max-w-xl">
        <MagneticButton
          className="px-6 py-3 rounded-xl bg-brand-primary text-on-brand font-medium"
          strength={pullStrength}
          enabled={pullEnabled}
        >
          Primary Button
        </MagneticButton>
        <MagneticButton
          className="px-6 py-3 rounded-xl bg-secondary border border-primary text-primary font-medium"
          strength={pullStrength}
          enabled={pullEnabled}
        >
          Secondary Button
        </MagneticButton>
        <MagneticLink
          className="px-6 py-3 text-brand underline underline-offset-4"
          strength={pullStrength}
          enabled={pullEnabled}
        >
          Link Example
        </MagneticLink>
      </div>

      {/* Text Selection Demo */}
      <div className="max-w-md text-center">
        <p className="text-secondary select-text cursor-text">
          This text is selectable. Hover over it to see the cursor adapt to text
          selection mode. The cursor should become a vertical line matching the
          font size.
        </p>
      </div>

      {/* Magnetic Pull Icon Buttons */}
      <div className="flex gap-6 mt-4">
        <div className="flex flex-col items-center gap-2">
          <MagneticButton
            className="w-14 h-14 rounded-full bg-brand-primary text-on-brand flex items-center justify-center font-bold text-xl"
            strength={pullStrength}
            enabled={pullEnabled}
          >
            +
          </MagneticButton>
          <span className="text-xs text-tertiary">
            {pullEnabled ? 'Pull active' : 'Icon button'}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MagneticButton
            className="w-14 h-14 rounded-xl bg-secondary border border-primary flex items-center justify-center"
            strength={pullStrength}
            enabled={pullEnabled}
          >
            <span className="text-primary text-lg">A</span>
          </MagneticButton>
          <span className="text-xs text-tertiary">
            {pullEnabled ? 'Pull active' : 'Icon button'}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MagneticButton
            className="w-14 h-14 rounded-xl bg-tertiary border border-secondary flex items-center justify-center"
            strength={pullStrength}
            enabled={pullEnabled}
          >
            <ChevronIcon />
          </MagneticButton>
          <span className="text-xs text-tertiary">
            {pullEnabled ? 'Pull active' : 'Icon button'}
          </span>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Icons
// ============================================================================

function ChevronIcon() {
  return (
    <svg
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
      className="text-primary"
    >
      <path
        d="M10 2L2 10L10 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ============================================================================
// Page Component
// ============================================================================

export default function CursorPlayground() {
  const [config, setConfig] = useState<CursorConfig>(DEFAULT_CURSOR_CONFIG)
  const [activePresetId, setActivePresetId] = useState<string | null>('default')

  // Handle control changes
  const handleChange = useCallback((event: ControlChangeEvent) => {
    setConfig((prev) => setNestedValue(prev, event.controlId, event.value))
    setActivePresetId(null)
  }, [])

  // Handle preset selection
  const handlePresetChange = useCallback((presetId: string) => {
    const preset = CURSOR_PRESETS.find((p) => p.id === presetId)
    if (preset) {
      setConfig(preset.data)
      setActivePresetId(presetId)
    }
  }, [])

  // Handle reset
  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CURSOR_CONFIG)
    setActivePresetId('default')
  }, [])

  // Build panel configuration
  const panelConfig = useMemo(
    () => buildCursorPanelConfig(config, CURSOR_PRESETS, activePresetId),
    [config, activePresetId]
  )

  return (
    <PlaygroundLayout
      className="bg-primary"
      controlPanel={
        <UnifiedControlPanel
          config={panelConfig}
          onChange={handleChange}
          onPresetChange={handlePresetChange}
          onReset={handleReset}
          getConfigForCopy={() => config}
        />
      }
    >
      {/* Cursor Component */}
      <CursorPreview config={config} />

      {/* Demo Content with Magnetic Pull */}
      <DemoContent
        pullEnabled={config.magneticPull.enabled}
        pullStrength={config.magneticPull.strength}
      />

      {/* Config Display */}
      <div className="mt-12 rounded-lg bg-secondary/50 p-4 text-xs text-tertiary max-w-md">
        <p className="font-medium text-secondary mb-2">Current Config:</p>
        <p>
          Custom Cursor: <span className="text-primary">{config.showCursor ? 'On' : 'Off (native)'}</span>
          {config.showCursor && (
            <>
              {' · '}
              Mode: <span className="text-primary">{config.mode}</span>
              {' · '}
              Size: <span className="text-primary">{config.style.width}×{config.style.height}</span>
            </>
          )}
        </p>
        <p className="mt-1">
          Element Pull: <span className="text-primary">{config.magneticPull.enabled ? 'On' : 'Off'}</span>
          {config.magneticPull.enabled && (
            <>
              {' · '}
              Strength: <span className="text-primary">{(config.magneticPull.strength * 100).toFixed(0)}%</span>
            </>
          )}
        </p>
        {config.showCursor && (
          <p className="mt-1">
            Cursor Snap: <span className="text-primary">{config.magnetic.enabled ? 'On' : 'Off'}</span>
            {config.magnetic.enabled && (
              <>
                {' · '}
                Snap: <span className="text-primary">{(config.magnetic.snap * 100).toFixed(0)}%</span>
              </>
            )}
          </p>
        )}
      </div>
    </PlaygroundLayout>
  )
}
