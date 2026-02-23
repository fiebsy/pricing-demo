/**
 * Asset Renderer Component
 *
 * Renders either a placeholder or coin-stack based on asset configuration.
 * Supports per-stage state transitions with spring animations.
 */

'use client'

import { useMemo } from 'react'
import type { AssetConfig, CoinStackStateId, AssetAlignment } from '../config/types'
import { CoinStack } from '../../coin-stack/core/coin-stack'
import { PRESETS as COIN_STACK_PRESETS } from '../../coin-stack/config/presets'
import type { CoinStackConfig } from '../../coin-stack/config/types'

// ============================================================================
// State ID to Preset Mapping
// ============================================================================

const STATE_PRESET_MAP: Record<CoinStackStateId, string> = {
  1: 'default',
  2: 'arcade-blue-solid',
}

// ============================================================================
// Placeholder Component
// ============================================================================

function AssetPlaceholder({ height, alignment }: { height: number; alignment: AssetAlignment }) {
  return (
    <div
      className={`flex w-full items-center rounded-lg border border-dashed border-tertiary bg-tertiary/30 ${
        alignment === 'left' ? 'justify-start' : 'justify-center'
      }`}
      style={{ height }}
    >
      <span className="text-xs text-quaternary">Asset</span>
    </div>
  )
}

// ============================================================================
// Props
// ============================================================================

interface AssetRendererProps {
  /** Asset configuration */
  config: AssetConfig
  /** Active state ID from current stage */
  activeStateId?: CoinStackStateId
  /** Spring animation duration in seconds */
  duration?: number
  /** Spring animation bounce */
  bounce?: number
}

// ============================================================================
// Main Component
// ============================================================================

export function AssetRenderer({
  config,
  activeStateId = 1,
  duration = 0.4,
  bounce = 0.15,
}: AssetRendererProps) {
  const alignment = config.alignment ?? 'center'

  // Render placeholder if type is not coin-stack
  if (config.type === 'placeholder') {
    return <AssetPlaceholder height={config.height} alignment={alignment} />
  }

  // Get the preset config for the current state
  const presetId = STATE_PRESET_MAP[activeStateId]
  const preset = COIN_STACK_PRESETS.find((p) => p.id === presetId)

  // Build coin stack config by merging preset with custom width
  const coinStackConfig: CoinStackConfig = useMemo(() => {
    const baseConfig = preset?.config ?? COIN_STACK_PRESETS[0].config
    return {
      ...baseConfig,
      size: {
        width: config.coinStackWidth ?? 60,
      },
      demo: {
        ...baseConfig.demo,
        showDebug: false,
      },
    }
  }, [preset, config.coinStackWidth])

  // Transition config
  const transition = useMemo(
    () => ({
      duration,
      bounce,
    }),
    [duration, bounce]
  )

  const offsetX = config.offsetX ?? 0

  return (
    <div
      className={`flex w-full ${alignment === 'left' ? 'justify-start' : 'justify-center'}`}
      style={{ height: config.height }}
    >
      <div
        className="flex w-fit items-center"
        style={{ transform: offsetX !== 0 ? `translateX(${offsetX}px)` : undefined }}
      >
        <CoinStack config={coinStackConfig} transition={transition} />
      </div>
    </div>
  )
}
