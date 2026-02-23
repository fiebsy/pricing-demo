/**
 * Demo Variants for BiaxialExpand Playground
 *
 * Multiple demo configurations showing different use cases.
 */

'use client'

import * as React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import ArrowUp01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowUp01Icon'
import ArrowDown01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowDown01Icon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'

import {
  BiaxialExpand,
  useBiaxialExpand,
  getBackgroundClass,
  getBorderColorVar,
  type BiaxialExpandConfig,
  type CommandItemAction,
  type BackgroundOption,
} from '@/components/ui/core/primitives/biaxial-expand'

import type {
  BiaxialExpandPlaygroundConfig,
  TextColorOption,
  FontWeightOption,
  FontSizeOption,
  OpacityOption,
  VerticalAlignOption,
  TriggerTypographyConfig,
  ItemTypographyConfig,
  TextSegmentConfig,
  SyncedSubtextConfig,
  MenuItemLabelConfig,
  BadgeColor,
  LabelLayout,
  PricingVariantId,
  TriggerStateStyle,
  VariantBTriggerConfig,
  VariantBBottomSlotConfig,
  VariantBRightSource,
  VariantTransitionConfig,
} from '../config/types'
import {
  SAMPLE_COMMANDS,
  SAMPLE_FILTER_OPTIONS,
  SAMPLE_METRICS,
  SAMPLE_PROFILE_OPTIONS,
  PRICING_TIERS,
  type MetricData,
  type PricingTier,
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
      scrollable: playgroundConfig.bottomSlot.scrollable,
      background: playgroundConfig.bottomSlot.background,
      shine: playgroundConfig.bottomSlot.shine === 'none' ? undefined : playgroundConfig.bottomSlot.shine,
      borderRadius: playgroundConfig.bottomSlot.borderRadius,
      inset: playgroundConfig.bottomSlot.inset,
      borderWidth: playgroundConfig.bottomSlot.borderWidth,
      borderColor: playgroundConfig.bottomSlot.borderColor,
      integrated: playgroundConfig.bottomSlot.integrated,
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
// PRICING SELECT DEMO
// ============================================================================

interface PricingSelectDemoProps {
  config: BiaxialExpandPlaygroundConfig
  autoOpen?: boolean
  pricingVariant?: PricingVariantId
}

interface PricingSelectTriggerProps {
  selectedTier: PricingTier
  showDropdownIcon?: boolean
  dropdownIconRotates?: boolean
  triggerTypography: TriggerTypographyConfig
  syncedSubtext: SyncedSubtextConfig
  /** Trigger padding values */
  triggerPaddingX?: number
  triggerPaddingTop?: number
  triggerPaddingBottom?: number
  /** Trigger styling for collapsed/expanded states */
  triggerStyle?: {
    collapsed: TriggerStateStyle
    expanded: TriggerStateStyle
  }
  /** When true, shows upgrade fee instead of full price, additional credits instead of total */
  upgradeMode?: boolean
}

function PricingSelectTrigger({
  selectedTier,
  showDropdownIcon = true,
  dropdownIconRotates = true,
  triggerTypography,
  syncedSubtext,
  triggerPaddingX = 16,
  triggerPaddingTop = 0,
  triggerPaddingBottom = 0,
  triggerStyle,
  upgradeMode = false,
}: PricingSelectTriggerProps) {
  const { expanded, setExpanded } = useBiaxialExpand()

  const { label, price, priceSuffix, subtext, priceRowAlign, priceRowGap, rowGap } =
    triggerTypography

  // Check if price row has any visible content
  const showPriceRow = price.show || priceSuffix.show

  // Determine if we should show synced subtext or static subtext
  const showSyncedSubtext = syncedSubtext.syncWithSelection
  const showStaticSubtext = !showSyncedSubtext && subtext.show && subtext.text

  // Get current trigger style based on expanded state
  const currentStyle = triggerStyle ? (expanded ? triggerStyle.expanded : triggerStyle.collapsed) : null

  // Build trigger style classes and inline styles
  const triggerClasses = currentStyle ? cn(
    getBackgroundClass(currentStyle.background),
    currentStyle.shine && currentStyle.shine !== 'none' && currentStyle.shine,
  ) : ''

  const triggerInlineStyles: React.CSSProperties = currentStyle ? {
    borderRadius: currentStyle.borderRadius,
    ...(currentStyle.borderWidth > 0 && {
      borderWidth: currentStyle.borderWidth,
      borderStyle: 'solid',
      borderColor: getBorderColorVar(currentStyle.borderColor),
    }),
  } : {}

  return (
    <button
      type="button"
      onClick={() => setExpanded(!expanded)}
      className={cn(
        'flex items-center justify-between w-full h-full text-left transition-all duration-200',
        triggerClasses
      )}
      style={{
        ...triggerInlineStyles,
        paddingLeft: triggerPaddingX,
        paddingRight: triggerPaddingX,
        paddingTop: triggerPaddingTop,
        paddingBottom: triggerPaddingBottom,
      }}
    >
      <div className="flex flex-col items-start" style={{ gap: rowGap }}>
        {/* Label row */}
        {label.show && (
          <span
            className={cn(
              FONT_SIZE_CLASSES[label.fontSize],
              FONT_WEIGHT_CLASSES[label.fontWeight],
              TEXT_COLOR_CLASSES[label.textColor]
            )}
          >
            {label.text}
          </span>
        )}

        {/* Price row (price + suffix) */}
        {showPriceRow && (
          <span
            className={cn('flex', VERTICAL_ALIGN_CLASSES[priceRowAlign])}
            style={{ gap: priceRowGap }}
          >
            {price.show && (
              <span
                className={cn(
                  FONT_SIZE_CLASSES[price.fontSize],
                  FONT_WEIGHT_CLASSES[price.fontWeight],
                  TEXT_COLOR_CLASSES[price.textColor]
                )}
              >
                {price.prefix}
                {upgradeMode ? selectedTier.upgradeFee : selectedTier.price}
              </span>
            )}
            {priceSuffix.show && (
              <span
                className={cn(
                  FONT_SIZE_CLASSES[priceSuffix.fontSize],
                  FONT_WEIGHT_CLASSES[priceSuffix.fontWeight],
                  TEXT_COLOR_CLASSES[priceSuffix.textColor]
                )}
                style={{ opacity: OPACITY_VALUES[priceSuffix.opacity] }}
              >
                {priceSuffix.text}
              </span>
            )}
          </span>
        )}

        {/* Synced subtext row (syncs with selected tier) */}
        {showSyncedSubtext && (
          <span className="flex items-center" style={{ gap: syncedSubtext.gap }}>
            <TextSegment text={selectedTier.planName} config={syncedSubtext.planName} />
            {syncedSubtext.planName.show && syncedSubtext.credits.show && syncedSubtext.separator && (
              <span className="text-tertiary opacity-40">{syncedSubtext.separator}</span>
            )}
            <TextSegment
              text={upgradeMode ? selectedTier.additionalCreditsLabel : selectedTier.creditsLabel}
              config={syncedSubtext.credits}
            />
          </span>
        )}

        {/* Static subtext row (optional third line) */}
        {showStaticSubtext && (
          <span
            className={cn(
              FONT_SIZE_CLASSES[subtext.fontSize],
              FONT_WEIGHT_CLASSES[subtext.fontWeight],
              TEXT_COLOR_CLASSES[subtext.textColor]
            )}
            style={{ opacity: OPACITY_VALUES[subtext.opacity] }}
          >
            {subtext.text}
          </span>
        )}
      </div>
      {showDropdownIcon && (
        <HugeIcon
          icon={ArrowDown01Icon}
          size={16}
          className={cn(
            'shrink-0 text-tertiary transition-transform duration-200',
            dropdownIconRotates && expanded && 'rotate-180'
          )}
        />
      )}
    </button>
  )
}

// Map background option to hover class
const HOVER_BACKGROUND_CLASSES: Record<BackgroundOption, string> = {
  none: '',
  primary: 'hover:bg-primary',
  secondary: 'hover:bg-secondary',
  tertiary: 'hover:bg-tertiary',
  quaternary: 'hover:bg-quaternary',
}

interface PricingSelectOptionsProps {
  tiers: PricingTier[]
  selectedId: string
  onSelect: (tier: PricingTier) => void
  showHeader?: boolean
  headerLabel?: string
  headerTextColor?: TextColorOption
  headerFontWeight?: FontWeightOption
  headerFontSize?: FontSizeOption
  headerOpacity?: OpacityOption
  headerUppercase?: boolean
  headerPaddingBottom?: number
  containerPadding?: number
  itemPaddingX?: number
  itemPaddingY?: number
  itemBorderRadius?: number
  itemGap?: number
  itemHoverBackground?: BackgroundOption
  showSelectedIndicator?: boolean
  itemTypography: ItemTypographyConfig
  menuItemLabel: MenuItemLabelConfig
  /** When true, shows additional credits + upgrade fee instead of total credits + monthly price */
  upgradeMode?: boolean
}

// Map text color option to Tailwind class
const TEXT_COLOR_CLASSES: Record<TextColorOption, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  brand: 'text-brand-primary',
}

// Map font weight option to Tailwind class
const FONT_WEIGHT_CLASSES: Record<FontWeightOption, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
}

// Map font size option to Tailwind class
const FONT_SIZE_CLASSES: Record<FontSizeOption, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
}

// Map opacity option to decimal value
const OPACITY_VALUES: Record<OpacityOption, number> = {
  '100': 1,
  '80': 0.8,
  '60': 0.6,
  '40': 0.4,
}

// Map vertical align option to CSS align-items value
const VERTICAL_ALIGN_CLASSES: Record<VerticalAlignOption, string> = {
  baseline: 'items-baseline',
  center: 'items-center',
  bottom: 'items-end',
}

// Map badge color to Tailwind classes
const BADGE_COLOR_CLASSES: Record<BadgeColor, string> = {
  gray: 'bg-quaternary text-secondary',
  brand: 'bg-brand-secondary text-brand-primary',
  success: 'bg-success-secondary text-success-primary',
  warning: 'bg-warning-secondary text-warning-primary',
  error: 'bg-error-secondary text-error-primary',
}

// ============================================================================
// TEXT SEGMENT COMPONENT
// ============================================================================

interface TextSegmentProps {
  text: string
  config: TextSegmentConfig
}

function TextSegment({ text, config }: TextSegmentProps) {
  if (!config.show || !text) return null

  const baseClasses = cn(
    FONT_SIZE_CLASSES[config.fontSize],
    FONT_WEIGHT_CLASSES[config.fontWeight]
  )

  if (config.displayMode === 'badge') {
    return (
      <span
        className={cn(
          baseClasses,
          BADGE_COLOR_CLASSES[config.badgeColor],
          'px-1.5 py-0.5 rounded'
        )}
        style={{ opacity: OPACITY_VALUES[config.opacity] }}
      >
        {text}
      </span>
    )
  }

  return (
    <span
      className={cn(baseClasses, TEXT_COLOR_CLASSES[config.textColor])}
      style={{ opacity: OPACITY_VALUES[config.opacity] }}
    >
      {text}
    </span>
  )
}

// ============================================================================
// PRICING SELECT B - CONFIGURABLE TRIGGER COMPONENT
// ============================================================================

interface PricingSelectBTriggerProps {
  selectedTier: PricingTier
  variantBConfig: VariantBTriggerConfig
  /** Trigger styling for collapsed/expanded states */
  triggerStyle?: {
    collapsed: TriggerStateStyle
    expanded: TriggerStateStyle
  }
}

/**
 * Configurable trigger for Pricing Select B variant.
 * Displays ONLY the plan row in the trigger area.
 * Syncs with the tier selected in Variant A.
 *
 * Layout (Trigger only):
 * - Row 1: Plan name (left) + events/price info (right)
 *
 * Due row and subtext are now in PricingSelectBBottomContent.
 */
function PricingSelectBTrigger({
  selectedTier,
  variantBConfig,
  triggerStyle,
}: PricingSelectBTriggerProps) {
  const { expanded } = useBiaxialExpand()
  const { planRow, paddingX, paddingTop, paddingBottom } = variantBConfig

  // Get right text based on source
  const getRightText = (source: VariantBRightSource): string => {
    switch (source) {
      case 'planName':
        return selectedTier.planName
      case 'events':
        return selectedTier.eventsLabel
      case 'price':
        return selectedTier.priceFormatted
      case 'recurringPrice':
        return `$${selectedTier.monthlyPrice}/mo`
      case 'additionalCredits':
        return selectedTier.additionalCreditsLabel
      case 'upgradeFee':
        return selectedTier.upgradeFeeFormatted
      default:
        return ''
    }
  }

  // Get current trigger style based on expanded state
  const currentStyle = triggerStyle
    ? expanded
      ? triggerStyle.expanded
      : triggerStyle.collapsed
    : null

  // Build trigger style classes and inline styles (same pattern as PricingSelectTrigger)
  const triggerClasses = currentStyle
    ? cn(
        getBackgroundClass(currentStyle.background),
        currentStyle.shine && currentStyle.shine !== 'none' && currentStyle.shine
      )
    : ''

  const triggerInlineStyles: React.CSSProperties = currentStyle
    ? {
        borderRadius: currentStyle.borderRadius,
        ...(currentStyle.borderWidth > 0 && {
          borderWidth: currentStyle.borderWidth,
          borderStyle: 'solid',
          borderColor: getBorderColorVar(currentStyle.borderColor),
        }),
      }
    : {}

  return (
    <div
      className={cn('flex flex-col w-full h-full', triggerClasses)}
      style={{
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingTop,
        paddingBottom,
        ...triggerInlineStyles,
      }}
    >
      <div className="flex flex-col justify-center h-full">
        {/* Plan Row (Row 1) - ONLY row in trigger */}
        {planRow.show && (
          <div className="flex items-center justify-between">
            <span
              className={cn(
                FONT_SIZE_CLASSES[planRow.leftFontSize],
                FONT_WEIGHT_CLASSES[planRow.leftFontWeight],
                TEXT_COLOR_CLASSES[planRow.leftTextColor]
              )}
              style={{ opacity: OPACITY_VALUES[planRow.leftOpacity] }}
            >
              {planRow.leftText || selectedTier.planName}
            </span>
            <span
              className={cn(
                FONT_SIZE_CLASSES[planRow.rightFontSize],
                FONT_WEIGHT_CLASSES[planRow.rightFontWeight],
                TEXT_COLOR_CLASSES[planRow.rightTextColor]
              )}
              style={{ opacity: OPACITY_VALUES[planRow.rightOpacity] }}
            >
              {getRightText(planRow.rightSource)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Bottom slot content for Pricing Select B variant.
 * Displays the due row and subtext that were moved from the trigger.
 *
 * Layout (Bottom Slot):
 * - Row 2: "Due today" label (left) + price (right)
 * - Row 3: Recurring text subtext
 */
interface PricingSelectBBottomContentProps {
  selectedTier: PricingTier
  bottomSlotConfig: VariantBBottomSlotConfig
}

function PricingSelectBBottomContent({
  selectedTier,
  bottomSlotConfig,
}: PricingSelectBBottomContentProps) {
  const { dueRow, subtext, rowGap, paddingX, paddingTop, paddingBottom } = bottomSlotConfig

  // Get right text based on source
  const getRightText = (source: VariantBRightSource): string => {
    switch (source) {
      case 'planName':
        return selectedTier.planName
      case 'events':
        return selectedTier.eventsLabel
      case 'price':
        return selectedTier.priceFormatted
      case 'recurringPrice':
        return `$${selectedTier.monthlyPrice}/mo`
      case 'additionalCredits':
        return selectedTier.additionalCreditsLabel
      case 'upgradeFee':
        return selectedTier.upgradeFeeFormatted
      default:
        return ''
    }
  }

  // Process subtext template
  const processedSubtext = subtext.template
    .replace('{price}', `$${selectedTier.monthlyPrice}`)
    .replace('{planName}', selectedTier.planName)

  return (
    <div style={{ paddingLeft: paddingX, paddingRight: paddingX, paddingTop, paddingBottom }}>
      <div className="flex flex-col" style={{ gap: rowGap }}>
        {/* Due Row (Row 2) */}
        {dueRow.show && (
          <div className="flex items-center justify-between">
            <span
              className={cn(
                FONT_SIZE_CLASSES[dueRow.leftFontSize],
                FONT_WEIGHT_CLASSES[dueRow.leftFontWeight],
                TEXT_COLOR_CLASSES[dueRow.leftTextColor]
              )}
              style={{ opacity: OPACITY_VALUES[dueRow.leftOpacity] }}
            >
              {dueRow.leftText}
            </span>
            <span
              className={cn(
                FONT_SIZE_CLASSES[dueRow.rightFontSize],
                FONT_WEIGHT_CLASSES[dueRow.rightFontWeight],
                TEXT_COLOR_CLASSES[dueRow.rightTextColor]
              )}
              style={{ opacity: OPACITY_VALUES[dueRow.rightOpacity] }}
            >
              {getRightText(dueRow.rightSource)}
            </span>
          </div>
        )}

        {/* Subtext Row (Row 3) */}
        {subtext.show && (
          <span
            className={cn(
              FONT_SIZE_CLASSES[subtext.fontSize],
              FONT_WEIGHT_CLASSES[subtext.fontWeight],
              TEXT_COLOR_CLASSES[subtext.textColor]
            )}
            style={{ opacity: OPACITY_VALUES[subtext.opacity] }}
          >
            {processedSubtext}
          </span>
        )}
      </div>
    </div>
  )
}

/**
 * Animated slot wrapper that crossfades between A and B content.
 * Uses AnimatePresence with popLayout mode for smooth overlapping transitions.
 * The container uses layout animation for smooth height morphing.
 * Can be disabled via transition.enabled to skip animation entirely.
 */
function AnimatedSlotContent({
  variantKey,
  children,
  transition,
}: {
  variantKey: string
  children: React.ReactNode
  transition?: VariantTransitionConfig
}) {
  // Default transition values if not provided
  const {
    enabled = true,
    type = 'spring',
    duration = 0.35,
    bounce = 0.1,
    yOffset = 6,
  } = transition || {}

  // If animation is disabled, render children directly without wrapper
  if (!enabled) {
    return <div className="w-full">{children}</div>
  }

  // Build motion transition config
  const motionTransition =
    type === 'spring'
      ? { type: 'spring' as const, duration, bounce }
      : { type: 'tween' as const, duration, ease: 'easeInOut' as const }

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={variantKey}
        initial={{ opacity: 0, y: yOffset }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -yOffset }}
        transition={motionTransition}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function PricingSelectOptions({
  tiers,
  selectedId,
  onSelect,
  showHeader = false,
  headerLabel = 'Select plan',
  headerTextColor = 'tertiary',
  headerFontWeight = 'medium',
  headerFontSize = 'xs',
  headerOpacity = '100',
  headerUppercase = false,
  headerPaddingBottom = 8,
  containerPadding = 4,
  itemPaddingX = 12,
  itemPaddingY = 12,
  itemBorderRadius = 8,
  itemGap = 2,
  itemHoverBackground = 'quaternary',
  showSelectedIndicator = false,
  itemTypography,
  menuItemLabel,
  upgradeMode = false,
}: PricingSelectOptionsProps) {
  const { setExpanded } = useBiaxialExpand()

  const isStacked = menuItemLabel.layout === 'stacked'

  return (
    <div style={{ padding: containerPadding }}>
      {showHeader && (
        <div
          className={cn(
            TEXT_COLOR_CLASSES[headerTextColor],
            FONT_WEIGHT_CLASSES[headerFontWeight],
            FONT_SIZE_CLASSES[headerFontSize],
            headerUppercase && 'uppercase tracking-wider'
          )}
          style={{
            paddingLeft: itemPaddingX,
            paddingRight: itemPaddingX,
            paddingTop: 8,
            paddingBottom: headerPaddingBottom,
            opacity: OPACITY_VALUES[headerOpacity],
          }}
        >
          {headerLabel}
        </div>
      )}
      <div className="flex flex-col" style={{ gap: itemGap }}>
        {tiers.map((tier) => {
          const isSelected = selectedId === tier.id
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => {
                onSelect(tier)
                setExpanded(false)
              }}
              className={cn(
                'flex items-center justify-between',
                'transition-colors duration-150',
                HOVER_BACKGROUND_CLASSES[itemHoverBackground],
                isSelected && 'text-brand-primary'
              )}
              style={{
                paddingLeft: itemPaddingX,
                paddingRight: itemPaddingX,
                paddingTop: itemPaddingY,
                paddingBottom: itemPaddingY,
                borderRadius: itemBorderRadius,
              }}
            >
              {/* Label content - uses new menuItemLabel config */}
              <span
                className={cn('flex', isStacked ? 'flex-col items-start' : 'items-center')}
                style={{ gap: isStacked ? 2 : menuItemLabel.gap }}
              >
                <TextSegment text={tier.planName} config={menuItemLabel.planName} />
                {!isStacked && menuItemLabel.planName.show && menuItemLabel.credits.show && menuItemLabel.separator && (
                  <span className="text-tertiary opacity-40">{menuItemLabel.separator}</span>
                )}
                <TextSegment
                  text={upgradeMode ? tier.additionalCreditsLabel : tier.creditsLabel}
                  config={menuItemLabel.credits}
                />
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    FONT_SIZE_CLASSES[itemTypography.price.fontSize],
                    FONT_WEIGHT_CLASSES[itemTypography.price.fontWeight],
                    TEXT_COLOR_CLASSES[itemTypography.price.textColor]
                  )}
                  style={{ opacity: OPACITY_VALUES[itemTypography.price.opacity] }}
                >
                  {upgradeMode ? tier.upgradeFeeLabel : tier.priceLabel}
                </span>
                {showSelectedIndicator && isSelected && (
                  <HugeIcon icon={Tick01Icon} size={16} className="text-brand-primary" />
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function PricingSelectDemo({ config, autoOpen, pricingVariant = 'A' }: PricingSelectDemoProps) {
  // Filter tiers by availableTiers config and upgradeMode
  const availableTiers = React.useMemo(() => {
    const tierIds = config.selectMenu.availableTiers
    const upgradeMode = config.selectMenu.upgradeMode
    return PRICING_TIERS.filter((tier) => {
      if (!tierIds.includes(tier.id)) return false
      // In upgrade mode, hide Pro base tier (tier-100)
      if (upgradeMode && tier.id === 'tier-100') return false
      return true
    })
  }, [config.selectMenu.availableTiers, config.selectMenu.upgradeMode])

  // Initialize with first available tier
  const [selectedTier, setSelectedTier] = useState(() => availableTiers[0] || PRICING_TIERS[0])

  // Ensure selected tier stays valid when available tiers change
  React.useEffect(() => {
    if (!availableTiers.find((t) => t.id === selectedTier.id)) {
      setSelectedTier(availableTiers[0] || PRICING_TIERS[0])
    }
  }, [availableTiers, selectedTier.id])

  const isVariantA = pricingVariant === 'A'

  // Transform playground config to biaxial config
  const baseConfig = playgroundConfigToBiaxialConfig(config)

  // Both variants use overlay mode with dynamic height - layout values differ per variant
  // Variant B uses layout.triggerHeightB and layout.maxBottomHeightB
  // This eliminates positioning complexity and clipping issues
  const effectiveConfig = React.useMemo((): Partial<BiaxialExpandConfig> => {
    if (!isVariantA && baseConfig.layout) {
      // Variant B: use triggerHeightB and maxBottomHeightB
      return {
        ...baseConfig,
        layout: {
          ...baseConfig.layout,
          triggerHeight: config.layout.triggerHeightB,
          maxBottomHeight: config.layout.maxBottomHeightB,
        },
      } as Partial<BiaxialExpandConfig>
    }
    // Variant A: use config as-is
    return baseConfig
  }, [baseConfig, isVariantA, config.layout.triggerHeightB, config.layout.maxBottomHeightB])

  // Compute effective expanded state:
  // - Variant B: always expanded (like a static card)
  // - Variant A: normal expand/collapse behavior
  // - autoOpen: playground debug setting to keep expanded
  const effectiveExpanded = !isVariantA ? true : autoOpen ? true : undefined

  return (
    <BiaxialExpand.Root config={effectiveConfig} expanded={effectiveExpanded}>
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
          <AnimatedSlotContent
            variantKey={pricingVariant === 'A' ? 'trigger-a' : 'trigger-b'}
            transition={config.variantB.transition}
          >
            {isVariantA ? (
              <PricingSelectTrigger
                selectedTier={selectedTier}
                showDropdownIcon={config.selectMenu.showDropdownIcon}
                dropdownIconRotates={config.selectMenu.dropdownIconRotates}
                triggerTypography={config.selectMenu.triggerTypography}
                syncedSubtext={config.selectMenu.syncedSubtext}
                triggerPaddingX={config.selectMenu.triggerPaddingX}
                triggerPaddingTop={config.selectMenu.triggerPaddingTop}
                triggerPaddingBottom={config.selectMenu.triggerPaddingBottom}
                triggerStyle={config.trigger}
                upgradeMode={config.selectMenu.upgradeMode}
              />
            ) : (
              <PricingSelectBTrigger
                selectedTier={selectedTier}
                variantBConfig={config.variantB.trigger}
                triggerStyle={config.trigger}
              />
            )}
          </AnimatedSlotContent>
        </BiaxialExpand.Trigger>

        {config.bottomSlot.enabled && (
          <BiaxialExpand.ContentWrapper>
            <BiaxialExpand.BottomSlot>
              <AnimatedSlotContent
                variantKey={pricingVariant === 'A' ? 'bottom-a' : 'bottom-b'}
                transition={config.variantB.transition}
              >
                {isVariantA ? (
                  <PricingSelectOptions
                    tiers={availableTiers}
                    selectedId={selectedTier.id}
                    onSelect={setSelectedTier}
                    showHeader={config.selectMenu.showHeader}
                    headerLabel={config.selectMenu.headerLabel}
                    headerTextColor={config.selectMenu.headerTextColor}
                    headerFontWeight={config.selectMenu.headerFontWeight}
                    headerFontSize={config.selectMenu.headerFontSize}
                    headerOpacity={config.selectMenu.headerOpacity}
                    headerUppercase={config.selectMenu.headerUppercase}
                    headerPaddingBottom={config.selectMenu.headerPaddingBottom}
                    containerPadding={config.selectMenu.containerPadding}
                    itemPaddingX={config.selectMenu.itemPaddingX}
                    itemPaddingY={config.selectMenu.itemPaddingY}
                    itemBorderRadius={config.selectMenu.itemBorderRadius}
                    itemGap={config.selectMenu.itemGap}
                    itemHoverBackground={config.selectMenu.itemHoverBackground}
                    showSelectedIndicator={config.selectMenu.showSelectedIndicator}
                    itemTypography={config.selectMenu.itemTypography}
                    menuItemLabel={config.selectMenu.menuItemLabel}
                    upgradeMode={config.selectMenu.upgradeMode}
                  />
                ) : (
                  <PricingSelectBBottomContent
                    selectedTier={selectedTier}
                    bottomSlotConfig={config.variantB.bottomSlot}
                  />
                )}
              </AnimatedSlotContent>
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
  pricingVariant?: PricingVariantId
}

export function DemoSwitcher({ config, autoOpen, pricingVariant }: DemoSwitcherProps) {
  switch (config.demo.variant) {
    case 'command-menu':
      return <CommandMenuDemo config={config} autoOpen={autoOpen} />
    case 'dashboard-metric':
      return <DashboardMetricDemo config={config} autoOpen={autoOpen} />
    case 'pricing-select':
      return <PricingSelectDemo config={config} autoOpen={autoOpen} pricingVariant={pricingVariant} />
    case 'custom':
      return <CustomDemo config={config} autoOpen={autoOpen} />
    default:
      return <CommandMenuDemo config={config} autoOpen={autoOpen} />
  }
}
