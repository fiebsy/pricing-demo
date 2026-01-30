/**
 * Dashboard Preview Component
 *
 * Renders a 2x2 grid of metric tiles.
 */

'use client'

import React from 'react'
import type { DashboardConfig } from '../types'
import { Skwircle } from '@/components/ui/deprecated/skwircle/skwircle'
import type { SkwircleBackgroundGradient } from '@/components/ui/deprecated/skwircle/types'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowUp01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon'
import ArrowDown01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon'

interface DashboardPreviewProps {
  config: DashboardConfig
}

// Sample metric data
const METRIC_TILES = [
  {
    id: 'revenue',
    label: 'Total revenue',
    value: '$45,231',
    change: '+12.5%',
    positive: true,
    period: 'vs last month',
  },
  {
    id: 'orders',
    label: 'Active orders',
    value: '1,284',
    change: '+8.2%',
    positive: true,
    period: 'vs last week',
  },
  {
    id: 'contracts',
    label: 'Open contracts',
    value: '342',
    change: '-2.4%',
    positive: false,
    period: 'vs last month',
  },
  {
    id: 'conversion',
    label: 'Conversion rate',
    value: '24.8%',
    change: '+1.2%',
    positive: true,
    period: 'vs last quarter',
  },
]

const getDepthPreset = (intensity: string, direction: string): SkwircleBackgroundGradient | undefined => {
  if (intensity === 'none') return undefined
  return `depth-${intensity}-${direction}` as SkwircleBackgroundGradient
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({ config }) => {
  const depthPreset = getDepthPreset(config.depthIntensity, config.depthDirection)

  return (
    <div className="p-8">
      <div className="grid grid-cols-2 gap-4">
        {METRIC_TILES.map((tile) => (
          <Skwircle.Card
            key={tile.id}
            intent={config.intent}
            elevation={config.elevation}
            roundness={config.roundness}
            fillMode={config.fillMode}
            backgroundGradient={depthPreset}
            borderColor={config.borderColor ?? undefined}
            borderWidth={config.borderWidth}
            ring={config.ring}
            ringColor={config.ringColor}
            ringWidth={config.ringWidth}
            ringOpacity={config.ringOpacity}
          >
            <div className="p-4">
              <p className="text-xs text-tertiary">{tile.label}</p>
              <p className="mt-1 text-xl font-semibold text-primary">{tile.value}</p>
              <div className="mt-2 flex items-center gap-1">
                <span className={tile.positive ? 'text-success-primary' : 'text-error-primary'}>
                  <HugeIcon
                    icon={tile.positive ? ArrowUp01Icon : ArrowDown01Icon}
                    size={12}
                    strokeWidth={2}
                  />
                </span>
                <span
                  className={`text-xs font-medium ${tile.positive ? 'text-success-primary' : 'text-error-primary'}`}
                >
                  {tile.change}
                </span>
                <span className="text-xs text-quaternary">{tile.period}</span>
              </div>
            </div>
          </Skwircle.Card>
        ))}
      </div>
    </div>
  )
}
