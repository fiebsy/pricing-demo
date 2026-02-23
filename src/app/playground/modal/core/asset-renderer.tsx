/**
 * Asset Renderer Component
 *
 * Renders either a placeholder or coin-stack based on asset configuration.
 * Supports per-stage state transitions with spring animations.
 *
 * @status incubating
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
  /** Asset configuration from header */
  config: AssetConfig
  /** Active state ID from current stage (overrides default) */
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
  activeStateId,
  duration,
  bounce,
}: AssetRendererProps) {
  const alignment = config.alignment ?? 'center'

  // Render placeholder if type is not coin-stack
  if (config.type === 'placeholder' || !config.coinStack) {
    return <AssetPlaceholder height={config.height} alignment={alignment} />
  }

  const { coinStack } = config

  // Determine active state - per-stage override or default from config
  const effectiveStateId = activeStateId ?? coinStack.stateId

  // Get the preset config for the current state
  const presetId = STATE_PRESET_MAP[effectiveStateId]
  const preset = COIN_STACK_PRESETS.find((p) => p.id === presetId)

  // Build coin stack config by merging preset with custom width
  const coinStackConfig: CoinStackConfig = useMemo(() => {
    const baseConfig = preset?.config ?? COIN_STACK_PRESETS[0].config
    return {
      ...baseConfig,
      size: {
        width: coinStack.width,
      },
      demo: {
        ...baseConfig.demo,
        showDebug: false,
      },
    }
  }, [preset, coinStack.width])

  // Transition config - use provided values or fall back to coin stack config
  // When transitions are disabled, use instant (duration: 0)
  const transition = useMemo(
    () => ({
      duration: coinStack.transitionEnabled ? (duration ?? coinStack.transitionDuration) : 0,
      bounce: coinStack.transitionEnabled ? (bounce ?? coinStack.transitionBounce) : 0,
    }),
    [duration, bounce, coinStack.transitionEnabled, coinStack.transitionDuration, coinStack.transitionBounce]
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
