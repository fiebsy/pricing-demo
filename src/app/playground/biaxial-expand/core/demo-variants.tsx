/**
 * Demo Variants for BiaxialExpand Playground
 *
 * Multiple demo configurations showing different use cases.
 */

'use client'

import * as React from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowUp01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon'
import ArrowDown01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon'

import {
  BiaxialExpand,
  useBiaxialExpand,
  type BiaxialExpandConfig,
  type CommandItemAction,
} from '@/components/ui/core/primitives/biaxial-expand'

import type { BiaxialExpandPlaygroundConfig } from '../config/types'
import {
  SAMPLE_COMMANDS,
  SAMPLE_FILTER_OPTIONS,
  SAMPLE_METRICS,
  SAMPLE_PROFILE_OPTIONS,
  type MetricData,
} from '../config/sample-data'

// ============================================================================
// CONFIG TRANSFORMER
// ============================================================================

export function playgroundConfigToBiaxialConfig(
  playgroundConfig: BiaxialExpandPlaygroundConfig
): Partial<BiaxialExpandConfig> {
  // Slow-mo multiplier for debugging animations
  const slowMoMultiplier = playgroundConfig.demo.slowMo ? 5 : 1

  return {
    layout: {
      triggerWidth: playgroundConfig.layout.triggerWidth,
      triggerHeight: playgroundConfig.layout.triggerHeight,
      panelWidth: playgroundConfig.layout.panelWidth,
      maxTopHeight: playgroundConfig.layout.maxTopHeight || undefined,
      maxBottomHeight: playgroundConfig.layout.maxBottomHeight,
      maxLeftWidth: playgroundConfig.layout.maxLeftWidth || undefined,
      maxRightWidth: playgroundConfig.layout.maxRightWidth || undefined,
      borderRadius: playgroundConfig.layout.borderRadius,
      topGap: playgroundConfig.layout.topGap,
      bottomGap: playgroundConfig.layout.bottomGap,
      leftGap: playgroundConfig.layout.leftGap,
      rightGap: playgroundConfig.layout.rightGap,
      backdropTopOffset: playgroundConfig.layout.backdropTopOffset,
      expandOriginX: playgroundConfig.layout.expandOriginX,
      positionMode: playgroundConfig.layout.positionMode,
    },
    animation: {
      duration: playgroundConfig.animation.duration * slowMoMultiplier,
      collapseDuration: playgroundConfig.animation.collapseDuration * slowMoMultiplier,
      contentFadeDuration: playgroundConfig.animation.contentFadeDuration * slowMoMultiplier,
      contentFadeDelay: playgroundConfig.animation.contentFadeDelay * slowMoMultiplier,
      backdropMode: playgroundConfig.animation.backdropMode,
      backdropDelay: playgroundConfig.animation.backdropDelay * slowMoMultiplier,
      backdropDurationOffset: playgroundConfig.animation.backdropDurationOffset * slowMoMultiplier,
      animateSlotContainers: playgroundConfig.animation.animateSlotContainers,
      slotContainerDelay: playgroundConfig.animation.slotContainerDelay * slowMoMultiplier,
      slotContainerDurationOffset: playgroundConfig.animation.slotContainerDurationOffset * slowMoMultiplier,
      expandOrigin: playgroundConfig.animation.expandOrigin,
      topExpandOrigin: playgroundConfig.animation.topExpandOrigin,
      leftExpandOrigin: playgroundConfig.animation.leftExpandOrigin,
      rightExpandOrigin: playgroundConfig.animation.rightExpandOrigin,
    },
    appearance: {
      borderRadius: playgroundConfig.appearance.borderRadius,
      shadow: playgroundConfig.appearance.shadow,
      shine: playgroundConfig.appearance.shine,
      background: playgroundConfig.appearance.background === 'none' ? 'primary' : playgroundConfig.appearance.background,
      gradient: playgroundConfig.appearance.gradient,
      gradientColor: playgroundConfig.appearance.gradientColor,
      squircle: playgroundConfig.appearance.squircle,
    },
    topSlot: {
      enabled: playgroundConfig.topSlot.enabled,
      heightMode: playgroundConfig.topSlot.heightMode,
      height: playgroundConfig.topSlot.height,
      drivesPanelHeight: playgroundConfig.topSlot.drivesPanelHeight ?? false,
      background: playgroundConfig.topSlot.background,
      shine: playgroundConfig.topSlot.shine === 'none' ? undefined : playgroundConfig.topSlot.shine,
      borderRadius: playgroundConfig.topSlot.borderRadius,
      inset: playgroundConfig.topSlot.inset,
      borderWidth: playgroundConfig.topSlot.borderWidth,
      borderColor: playgroundConfig.topSlot.borderColor,
    },
    bottomSlot: {
      enabled: playgroundConfig.bottomSlot.enabled,
      heightMode: playgroundConfig.bottomSlot.heightMode,
      height: playgroundConfig.bottomSlot.height,
      drivesPanelHeight: playgroundConfig.bottomSlot.drivesPanelHeight ?? true,
      background: playgroundConfig.bottomSlot.background,
      shine: playgroundConfig.bottomSlot.shine === 'none' ? undefined : playgroundConfig.bottomSlot.shine,
      borderRadius: playgroundConfig.bottomSlot.borderRadius,
      inset: playgroundConfig.bottomSlot.inset,
      borderWidth: playgroundConfig.bottomSlot.borderWidth,
      borderColor: playgroundConfig.bottomSlot.borderColor,
    },
    leftSlot: {
      enabled: playgroundConfig.leftSlot.enabled,
      drivesPanelHeight: playgroundConfig.leftSlot.drivesPanelHeight ?? false,
      // Pass drivingHeight explicitly for vertical alignment calculations
      drivingHeight: playgroundConfig.leftSlot.drivingHeight ?? 200,
      // Also set height for backwards compatibility
      height: playgroundConfig.leftSlot.drivingHeight ?? 200,
      background: playgroundConfig.leftSlot.background,
      shine: playgroundConfig.leftSlot.shine === 'none' ? undefined : playgroundConfig.leftSlot.shine,
      borderRadius: playgroundConfig.leftSlot.borderRadius,
      inset: playgroundConfig.leftSlot.inset,
      borderWidth: playgroundConfig.leftSlot.borderWidth,
      borderColor: playgroundConfig.leftSlot.borderColor,
      verticalAlign: playgroundConfig.leftSlot.verticalAlign,
    },
    rightSlot: {
      enabled: playgroundConfig.rightSlot.enabled,
      drivesPanelHeight: playgroundConfig.rightSlot.drivesPanelHeight ?? false,
      // Pass drivingHeight explicitly for vertical alignment calculations
      drivingHeight: playgroundConfig.rightSlot.drivingHeight ?? 200,
      // Also set height for backwards compatibility
      height: playgroundConfig.rightSlot.drivingHeight ?? 200,
      background: playgroundConfig.rightSlot.background,
      shine: playgroundConfig.rightSlot.shine === 'none' ? undefined : playgroundConfig.rightSlot.shine,
      borderRadius: playgroundConfig.rightSlot.borderRadius,
      inset: playgroundConfig.rightSlot.inset,
      borderWidth: playgroundConfig.rightSlot.borderWidth,
      borderColor: playgroundConfig.rightSlot.borderColor,
      verticalAlign: playgroundConfig.rightSlot.verticalAlign,
    },
    debug: playgroundConfig.demo.showDebug,
  }
}

// ============================================================================
// HORIZONTAL SLOT CONTENT
// ============================================================================

function HorizontalSlotContent({ side }: { side: 'left' | 'right' }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="uppercase text-[10px] font-semibold tracking-widest text-tertiary mb-2">
        {side} slot
      </div>
      <div className="w-12 h-1 rounded-full bg-quaternary" />
    </div>
  )
}

// ============================================================================
// COMMAND MENU DEMO
// ============================================================================

interface CommandMenuDemoProps {
  config: BiaxialExpandPlaygroundConfig
  autoOpen?: boolean
}

export function CommandMenuDemo({ config, autoOpen }: CommandMenuDemoProps) {
  const [filter, setFilter] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const handleSelect = (item: CommandItemAction) => {
    console.log('Selected:', item.label)
  }

  const biaxialConfig = playgroundConfigToBiaxialConfig(config)

  return (
    <BiaxialExpand.Root config={biaxialConfig} expanded={autoOpen || undefined}>
      <BiaxialExpand.Backdrop />

      <BiaxialExpand.Content>
        {/* TopSlot inside ContentLayer for unified clipping */}
        {config.topSlot.enabled && (
          <BiaxialExpand.TopSlot>
            <BiaxialExpand.FilterBar
              options={SAMPLE_FILTER_OPTIONS}
              value={activeFilter}
              onChange={setActiveFilter}
            />
          </BiaxialExpand.TopSlot>
        )}

        {/* Horizontal slots inside ContentLayer for unified clipping */}
        {config.leftSlot.enabled && (
          <BiaxialExpand.LeftSlot>
            <HorizontalSlotContent side="left" />
          </BiaxialExpand.LeftSlot>
        )}

        {config.rightSlot.enabled && (
          <BiaxialExpand.RightSlot>
            <HorizontalSlotContent side="right" />
          </BiaxialExpand.RightSlot>
        )}

        <BiaxialExpand.Trigger>
          <BiaxialExpand.SearchInput
            placeholder="Search commands..."
            value={filter}
            onValueChange={setFilter}
          />
        </BiaxialExpand.Trigger>

        {config.bottomSlot.enabled && (
          <BiaxialExpand.ContentWrapper>
            <BiaxialExpand.BottomSlot>
              <BiaxialExpand.MenuContent
                groups={SAMPLE_COMMANDS}
                filter={filter}
                onSelect={handleSelect}
              />
            </BiaxialExpand.BottomSlot>
          </BiaxialExpand.ContentWrapper>
        )}
      </BiaxialExpand.Content>
    </BiaxialExpand.Root>
  )
}

// ============================================================================
// DASHBOARD METRIC DEMO
// ============================================================================

interface DashboardMetricDemoProps {
  config: BiaxialExpandPlaygroundConfig
  autoOpen?: boolean
}

function MetricTrigger({ metric }: { metric: MetricData }) {
  const { expanded, setExpanded } = useBiaxialExpand()
  const Icon = metric.icon

  return (
    <button
      type="button"
      onClick={() => setExpanded(!expanded)}
      className="flex items-center gap-3 w-full h-full px-4 text-left"
    >
      <div className="w-10 h-10 rounded-xl bg-brand-secondary flex items-center justify-center">
        <HugeIcon icon={Icon} size={20} className="text-brand-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-tertiary">{metric.label}</div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-primary">{metric.value}</span>
          <span
            className={cn(
              'flex items-center text-xs font-medium',
              metric.changeType === 'positive' && 'text-success-primary',
              metric.changeType === 'negative' && 'text-error-primary',
              metric.changeType === 'neutral' && 'text-tertiary'
            )}
          >
            <HugeIcon
              icon={metric.changeType === 'negative' ? ArrowDown01Icon : ArrowUp01Icon}
              size={12}
              className="mr-0.5"
            />
            {metric.change}
          </span>
        </div>
      </div>
    </button>
  )
}

function MetricDetails({ metric }: { metric: MetricData }) {
  return (
    <div className="flex flex-col gap-2 p-3">
      <div className="text-xs font-medium text-tertiary uppercase tracking-wider mb-1">
        Details
      </div>
      {metric.details.map((detail) => (
        <div key={detail.label} className="flex items-center justify-between">
          <span className="text-sm text-secondary">{detail.label}</span>
          <span className="text-sm font-medium text-primary">{detail.value}</span>
        </div>
      ))}
    </div>
  )
}

export function DashboardMetricDemo({ config, autoOpen }: DashboardMetricDemoProps) {
  const metric = SAMPLE_METRICS[0]
  const biaxialConfig = playgroundConfigToBiaxialConfig(config)

  return (
    <BiaxialExpand.Root config={biaxialConfig} expanded={autoOpen || undefined}>
      <BiaxialExpand.Backdrop />

      <BiaxialExpand.Content>
        {/* Horizontal slots inside ContentLayer for unified clipping */}
        {config.leftSlot.enabled && (
          <BiaxialExpand.LeftSlot>
            <HorizontalSlotContent side="left" />
          </BiaxialExpand.LeftSlot>
        )}

        {config.rightSlot.enabled && (
          <BiaxialExpand.RightSlot>
            <HorizontalSlotContent side="right" />
          </BiaxialExpand.RightSlot>
        )}

        <BiaxialExpand.Trigger>
          <MetricTrigger metric={metric} />
        </BiaxialExpand.Trigger>

        {config.bottomSlot.enabled && (
          <BiaxialExpand.ContentWrapper>
            <BiaxialExpand.BottomSlot>
              <MetricDetails metric={metric} />
            </BiaxialExpand.BottomSlot>
          </BiaxialExpand.ContentWrapper>
        )}
      </BiaxialExpand.Content>
    </BiaxialExpand.Root>
  )
}

// ============================================================================
// CUSTOM DEMO
// ============================================================================

interface CustomDemoProps {
  config: BiaxialExpandPlaygroundConfig
  autoOpen?: boolean
}

function CustomTrigger() {
  const { expanded, setExpanded } = useBiaxialExpand()

  return (
    <button
      type="button"
      onClick={() => setExpanded(!expanded)}
      className="flex items-center justify-center w-full h-full px-4 text-sm font-medium text-primary hover:text-secondary transition-colors"
    >
      {expanded ? 'Click to Collapse' : 'Click to Expand'}
    </button>
  )
}

function CustomTopContent() {
  return (
    <div className="flex items-center justify-center h-full px-4">
      <div className="text-sm text-tertiary">Top Slot Content</div>
    </div>
  )
}

function CustomBottomContent() {
  const { setExpanded } = useBiaxialExpand()

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="text-sm text-tertiary mb-2">Bottom Slot Content</div>
      {SAMPLE_PROFILE_OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => {
            console.log('Selected:', option.label)
            setExpanded(false)
          }}
          className={cn(
            'flex items-center gap-3 p-3 rounded-xl',
            'hover:bg-tertiary transition-colors duration-150',
            'text-left'
          )}
        >
          <HugeIcon icon={option.icon} size={18} className="text-tertiary" />
          <div>
            <div className="text-sm font-medium text-primary">{option.label}</div>
            <div className="text-xs text-tertiary">{option.description}</div>
          </div>
        </button>
      ))}
    </div>
  )
}

export function CustomDemo({ config, autoOpen }: CustomDemoProps) {
  const biaxialConfig = playgroundConfigToBiaxialConfig(config)

  return (
    <BiaxialExpand.Root config={biaxialConfig} expanded={autoOpen || undefined}>
      <BiaxialExpand.Backdrop />

      <BiaxialExpand.Content>
        {/* TopSlot inside ContentLayer for unified clipping */}
        {config.topSlot.enabled && (
          <BiaxialExpand.TopSlot>
            <CustomTopContent />
          </BiaxialExpand.TopSlot>
        )}

        {/* Horizontal slots inside ContentLayer for unified clipping */}
        {config.leftSlot.enabled && (
          <BiaxialExpand.LeftSlot>
            <HorizontalSlotContent side="left" />
          </BiaxialExpand.LeftSlot>
        )}

        {config.rightSlot.enabled && (
          <BiaxialExpand.RightSlot>
            <HorizontalSlotContent side="right" />
          </BiaxialExpand.RightSlot>
        )}

        <BiaxialExpand.Trigger>
          <CustomTrigger />
        </BiaxialExpand.Trigger>

        {config.bottomSlot.enabled && (
          <BiaxialExpand.ContentWrapper>
            <BiaxialExpand.BottomSlot>
              <CustomBottomContent />
            </BiaxialExpand.BottomSlot>
          </BiaxialExpand.ContentWrapper>
        )}
      </BiaxialExpand.Content>
    </BiaxialExpand.Root>
  )
}

// ============================================================================
// DEMO SWITCHER
// ============================================================================

interface DemoSwitcherProps {
  config: BiaxialExpandPlaygroundConfig
  autoOpen?: boolean
}

export function DemoSwitcher({ config, autoOpen }: DemoSwitcherProps) {
  switch (config.demo.variant) {
    case 'command-menu':
      return <CommandMenuDemo config={config} autoOpen={autoOpen} />
    case 'dashboard-metric':
      return <DashboardMetricDemo config={config} autoOpen={autoOpen} />
    case 'custom':
      return <CustomDemo config={config} autoOpen={autoOpen} />
    default:
      return <CommandMenuDemo config={config} autoOpen={autoOpen} />
  }
}
