/**
 * Pricing Modal Component
 *
 * Reusable modal layout with fixed dimensions and flow-based content.
 * Sections: Asset, Header (title + subheader), Content A, Content B, Button.
 * Content B supports a fill property to consume remaining vertical space.
 *
 * @status incubating
 */

'use client'

import { Dialog } from '@base-ui/react/dialog'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'
import type { ButtonState, ButtonStateId } from '@/components/ui/core/primitives/fluid-button-layout'

import type { PricingPlaygroundConfig, FlowId, SeparatorConfig, ContentAHeaderConfig } from '../config/types'
import { ButtonSection } from './button-section'
import type { PricingTier } from '@/components/ui/features/pricing-select-menu'
import { ProCard } from './pro-card'
import { PricingSelectSlot } from './pricing-select-slot'
import { ChecklistSlot } from './checklist-slot'
import { CoinStack } from '@/app/playground/coin-stack/core/coin-stack'
import { getPresetById } from '@/app/playground/coin-stack/config/presets'
import {
  buildContainerClasses,
  buildContainerStyles,
  buildAnimationVariants,
  buildSpringTransition,
  buildTitleClasses,
  buildSubheaderClasses,
  buildCloseButtonSizeClasses,
  buildCloseButtonIconSize,
  buildCloseButtonClasses,
  buildFlareStyle,
  getFlareColorValue,
  generateNoiseFilter,
  buildNoiseStyles,
  generateSparklePositions,
  generateStarPath,
  buildSparklesContainerStyles,
  generateRingArc,
  buildRingsContainerStyles,
} from '../utils/class-builders'

// ============================================================================
// Interpolation Helper
// ============================================================================

/**
 * Interpolates tier values into text placeholders.
 * Supports: {price}, {credits}, {planName}, etc.
 */
function interpolate(text: string, tier: PricingTier): string {
  return text
    .replace(/\{price\}/g, tier.priceLabel)
    .replace(/\{credits\}/g, String(tier.credits))
    .replace(/\{additionalCredits\}/g, String(tier.additionalCredits))
    .replace(/\{planName\}/g, tier.planName)
    .replace(/\{planNameShort\}/g, tier.planNameShort)
    .replace(/\{creditsLabel\}/g, tier.creditsLabel)
    .replace(/\{eventsLabel\}/g, tier.eventsLabel)
    .replace(/\{priceFormatted\}/g, tier.priceFormatted)
    .replace(/\{recurringText\}/g, tier.recurringText)
}

// ============================================================================
// Wireframe Placeholder
// ============================================================================

function WireframeLines({
  lineCount,
  lineGap,
  height,
}: {
  lineCount: number
  lineGap: number
  height: number
}) {
  const lineHeights = Array.from({ length: lineCount }, (_, i) => {
    if (i === lineCount - 1) return '60%'
    return '100%'
  })

  return (
    <div
      className="flex w-full flex-col justify-center"
      style={{ height, gap: lineGap }}
    >
      {lineHeights.map((width, i) => (
        <div
          key={i}
          className="h-2 rounded-full bg-quaternary/40"
          style={{ width }}
        />
      ))}
    </div>
  )
}

// ============================================================================
// Debug Wrapper
// ============================================================================

function DebugWrapper({
  children,
  label,
  color,
  show,
}: {
  children: React.ReactNode
  label: string
  color: string
  show: boolean
}) {
  if (!show) return <>{children}</>
  return (
    <div className={cn('relative border-2 border-dashed overflow-visible', color)}>
      <span
        className={cn(
          'absolute -top-3 left-2 px-1 text-[10px] bg-secondary',
          color.replace('border-', 'text-')
        )}
      >
        {label}
      </span>
      {children}
    </div>
  )
}

// ============================================================================
// Content A Header Component
// ============================================================================

function ContentAHeader({ config }: { config: ContentAHeaderConfig }) {
  if (!config.show) return null

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  const weightClasses = {
    '300': 'font-light',
    '400': 'font-normal',
    '500': 'font-medium',
    '600': 'font-semibold',
    '700': 'font-bold',
    '800': 'font-extrabold',
  }

  return (
    <div
      className={cn(sizeClasses[config.size], weightClasses[config.weight], config.color)}
      style={{ opacity: (config.opacity ?? 100) / 100 }}
    >
      {config.text}
    </div>
  )
}

// ============================================================================
// Separator Component
// ============================================================================

function Separator({ config }: { config: SeparatorConfig }) {
  if (!config.show) return null

  const colorValue =
    config.color === 'transparent'
      ? 'transparent'
      : `var(--color-${config.color})`

  return (
    <div
      style={{
        height: config.thickness,
        backgroundColor: colorValue,
        marginLeft: config.fullWidth ? 0 : config.insetAmount,
        marginRight: config.fullWidth ? 0 : config.insetAmount,
      }}
    />
  )
}

// ============================================================================
// Types
// ============================================================================

interface PricingModalProps {
  config: PricingPlaygroundConfig
  open: boolean
  onOpenChange: (open: boolean) => void
  activeFlow: FlowId
  /** Selected pricing tier (lifted state for flow continuity) */
  selectedTier: PricingTier
  /** Tier selection handler (lifted state for flow continuity) */
  onTierSelect: (tier: PricingTier) => void
  /** Button state ID from flow orchestration */
  buttonStateId: ButtonStateId
  /** Complete button state with derived values */
  buttonState: ButtonState
  /** Whether secondary button should be visible */
  showSecondary: boolean
  /** Primary button click handler */
  onPrimaryClick: () => void
  /** Back button click handler */
  onBackClick: () => void
}

// ============================================================================
// Modal Component
// ============================================================================

export function PricingModal({
  config,
  open,
  onOpenChange,
  activeFlow,
  selectedTier,
  onTierSelect,
  buttonStateId,
  buttonState,
  showSecondary,
  onPrimaryClick,
  onBackClick,
}: PricingModalProps) {
  const { asset, closeButton, header, separator, contentA, contentB, button, animation, demo, proCard, flows, pricingSelect, radialFlare, decorations } = config

  // Get flow-specific content
  const flowContent = flows[activeFlow]
  const effectiveTitle = interpolate(flowContent.headerTitle, selectedTier)
  const effectiveSubheader = interpolate(flowContent.headerSubheader, selectedTier)
  const effectiveContentA = { ...contentA, ...flowContent.contentA }
  const effectiveContentB = { ...contentB, ...flowContent.contentB }
  const effectiveContentAHeader = flowContent.contentAHeader

  // Coin stack configuration
  const showCoinStack = flowContent.asset?.showCoinStack ?? asset.coinStack.enabled
  const effectivePresetId = flowContent.asset?.coinStackPresetId ?? asset.coinStack.presetId
  const coinStackPreset = getPresetById(effectivePresetId)
  const coinStackConfig = coinStackPreset
    ? {
        ...coinStackPreset.config,
        size: { width: asset.coinStack.width },
      }
    : null

  // Backdrop settings (respect autoOpen mode)
  const { backdrop } = config
  const effectiveBackdropOpacity = demo.autoOpen ? 0 : backdrop.opacity
  const effectiveBackdropBlur = demo.autoOpen ? 0 : backdrop.blur
  const effectiveBackdropDismissable = demo.autoOpen ? false : backdrop.dismissable
  const backdropColorMap = {
    black: '0, 0, 0',
    white: '255, 255, 255',
    gray: '107, 114, 128',
  }
  const backdropRgb = backdropColorMap[backdrop.color]

  // Build animation variants
  const variants = buildAnimationVariants(animation)
  const transition = buildSpringTransition(animation)

  // Build classes
  const containerClasses = buildContainerClasses(config)
  const containerStyles = buildContainerStyles(config)
  const titleClasses = buildTitleClasses(config)
  const subheaderClasses = buildSubheaderClasses(config)

  // Calculate container width for pricing-select (content area width)
  const contentWidth = config.container.width - (config.container.padding * 2)

  // Render content section based on type
  const renderContent = (
    sectionConfig: typeof effectiveContentA,
    sectionHeight: number,
    lineCount: number,
    lineGap: number,
    fill?: boolean
  ) => {
    if (sectionConfig.type === 'pricing-select') {
      return (
        <PricingSelectSlot
          activeFlow={activeFlow}
          selectedTier={selectedTier}
          onTierSelect={onTierSelect}
          containerWidth={contentWidth}
          upgradeMode={true}
          pricingSelectConfig={pricingSelect}
        />
      )
    }

    if (sectionConfig.type === 'pro-card') {
      return <ProCard config={proCard} height={sectionHeight} fill={fill} />
    }

    if (sectionConfig.type === 'checklist') {
      // Use flow-specific items if provided, otherwise use global checklist config
      const checklistItems = flowContent.checklistItems ?? config.checklist.items
      return (
        <ChecklistSlot
          items={checklistItems}
          styleConfig={config.checklist}
          selectedTier={selectedTier}
        />
      )
    }

    return (
      <WireframeLines
        lineCount={lineCount}
        lineGap={lineGap}
        height={sectionHeight}
      />
    )
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal={false}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal keepMounted>
            {/* Backdrop */}
            <Dialog.Backdrop
              render={
                <motion.div
                  className={cn(
                    'fixed inset-0 z-40',
                    demo.autoOpen && 'pointer-events-none'
                  )}
                  style={{
                    backgroundColor: `rgba(${backdropRgb}, ${effectiveBackdropOpacity / 100})`,
                    backdropFilter: effectiveBackdropBlur > 0 ? `blur(${effectiveBackdropBlur}px)` : undefined,
                    WebkitBackdropFilter: effectiveBackdropBlur > 0 ? `blur(${effectiveBackdropBlur}px)` : undefined,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={
                    effectiveBackdropDismissable ? () => onOpenChange(false) : undefined
                  }
                />
              }
            />

            {/* Popup Container */}
            <Dialog.Popup
              render={
                <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
                  <motion.div
                    className={cn(
                      'pointer-events-auto relative flex flex-col',
                      containerClasses
                    )}
                    style={containerStyles}
                    initial={variants.initial}
                    animate={variants.animate}
                    exit={variants.exit}
                    transition={transition}
                  >
                    {/* Radial Flare Effects */}
                    {radialFlare.enabled && (
                      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
                        {radialFlare.flare1.enabled && (
                          <div style={buildFlareStyle(radialFlare.flare1) ?? undefined} />
                        )}
                        {radialFlare.flare2.enabled && (
                          <div style={buildFlareStyle(radialFlare.flare2) ?? undefined} />
                        )}
                        {radialFlare.flare3.enabled && (
                          <div style={buildFlareStyle(radialFlare.flare3) ?? undefined} />
                        )}
                      </div>
                    )}

                    {/* Decorations Layer */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
                      {/* Noise Texture */}
                      {decorations.noise.enabled && (
                        <>
                          <svg className="absolute h-0 w-0">
                            <defs dangerouslySetInnerHTML={{ __html: generateNoiseFilter('noiseFilter', decorations.noise.scale) }} />
                          </svg>
                          <div
                            className="absolute inset-0"
                            style={{
                              ...buildNoiseStyles(decorations.noise),
                              filter: 'url(#noiseFilter)',
                              backgroundColor: 'white',
                            }}
                          />
                        </>
                      )}

                      {/* Sparkles */}
                      {decorations.sparkles.enabled && (
                        <div style={buildSparklesContainerStyles(decorations.sparkles)}>
                          <svg
                            width="100%"
                            height="100%"
                            viewBox={`0 0 ${decorations.sparkles.spread * 2} ${decorations.sparkles.spread * 2}`}
                          >
                            {generateSparklePositions(
                              decorations.sparkles.count,
                              decorations.sparkles.spread,
                              decorations.sparkles.sizeVariation,
                              decorations.sparkles.size
                            ).map((sparkle, i) => (
                              <path
                                key={i}
                                d={generateStarPath(sparkle.size)}
                                fill={getFlareColorValue(decorations.sparkles.color)}
                                transform={`translate(${decorations.sparkles.spread + sparkle.x - sparkle.size / 2}, ${decorations.sparkles.spread + sparkle.y - sparkle.size / 2}) rotate(${sparkle.rotation}, ${sparkle.size / 2}, ${sparkle.size / 2})`}
                              />
                            ))}
                          </svg>
                        </div>
                      )}

                      {/* Rings */}
                      {decorations.rings.enabled && (
                        <div style={buildRingsContainerStyles(decorations.rings)}>
                          <svg width="100%" height="100%">
                            {Array.from({ length: decorations.rings.count }).map((_, i) => {
                              const radius = decorations.rings.startRadius + i * decorations.rings.gap
                              const maxRadius = decorations.rings.startRadius + (decorations.rings.count - 1) * decorations.rings.gap
                              const containerSize = (maxRadius + decorations.rings.strokeWidth) * 2 + 20
                              const center = containerSize / 2
                              return (
                                <path
                                  key={i}
                                  d={generateRingArc(radius, decorations.rings.arcAngle)}
                                  fill="none"
                                  stroke={getFlareColorValue(decorations.rings.color)}
                                  strokeWidth={decorations.rings.strokeWidth}
                                  strokeLinecap="round"
                                  transform={`translate(${center - radius}, ${center - radius})`}
                                />
                              )
                            })}
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Close Button */}
                    {closeButton.show && (
                      <Dialog.Close
                        className={cn(
                          'absolute z-10 flex items-center justify-center transition-colors',
                          buildCloseButtonSizeClasses(closeButton.size),
                          buildCloseButtonClasses(closeButton),
                          closeButton.position === 'top-right' ? 'right-0 top-0' : 'left-0 top-0'
                        )}
                        style={{
                          [closeButton.position === 'top-right' ? 'right' : 'left']:
                            closeButton.offset,
                          top: closeButton.offset,
                        }}
                      >
                        <HugeIcon
                          icon={Cancel01Icon}
                          size={buildCloseButtonIconSize(closeButton.size)}
                          strokeWidth={closeButton.iconStrokeWidth}
                          className={closeButton.iconColor}
                        />
                      </Dialog.Close>
                    )}

                    {/* Modal Content */}
                    <div className="flex flex-1 flex-col" style={{ gap: config.container.gap }}>
                      {/* Asset Section */}
                      {asset.show && (
                        <DebugWrapper
                          label="Asset"
                          color="border-blue-500"
                          show={demo.showOutlines}
                        >
                          <div
                            className={cn(
                              'flex w-full items-center rounded-lg',
                              asset.coinStack.alignment === 'center' ? 'justify-center' : 'justify-start',
                              asset.background === 'primary' && 'bg-primary/30',
                              asset.background === 'secondary' && 'bg-secondary/30',
                              asset.background === 'tertiary' && 'bg-tertiary/30'
                              // 'none' = no background class applied
                            )}
                            style={{
                              height: asset.height,
                              marginLeft: asset.xOffset !== 0 ? asset.xOffset : undefined,
                            }}
                          >
                            {showCoinStack && asset.coinStack.enabled && coinStackConfig ? (
                              <div
                                className={cn(
                                  asset.coinStack.showBackground && 'flex items-center justify-center',
                                  // Background color
                                  asset.coinStack.showBackground && asset.coinStack.background === 'primary' && 'bg-primary',
                                  asset.coinStack.showBackground && asset.coinStack.background === 'secondary' && 'bg-secondary',
                                  asset.coinStack.showBackground && asset.coinStack.background === 'tertiary' && 'bg-tertiary',
                                  // Corner shape
                                  asset.coinStack.showBackground && asset.coinStack.cornerShape === 'squircle' && 'corner-squircle',
                                  asset.coinStack.showBackground && asset.coinStack.cornerShape === 'bevel' && 'corner-bevel',
                                  asset.coinStack.showBackground && asset.coinStack.cornerShape === 'scoop' && 'corner-scoop',
                                  // Shine
                                  asset.coinStack.showBackground && asset.coinStack.shine !== 'none' && asset.coinStack.shine,
                                  // Depth
                                  asset.coinStack.showBackground && asset.coinStack.depth !== 'none' && asset.coinStack.depth,
                                  // Shadow
                                  asset.coinStack.showBackground && asset.coinStack.shadow !== 'none' && `shadow-${asset.coinStack.shadow}`,
                                  // Full radius
                                  asset.coinStack.showBackground && asset.coinStack.backgroundRadius === 'full' && 'rounded-full'
                                )}
                                style={
                                  asset.coinStack.showBackground
                                    ? asset.coinStack.sizeMode === 'fixed'
                                      ? {
                                          width: asset.coinStack.fixedSize,
                                          height: asset.coinStack.fixedSize,
                                          borderRadius: asset.coinStack.backgroundRadius === 'full' ? '50%' : asset.coinStack.backgroundRadius,
                                        }
                                      : {
                                          borderRadius: asset.coinStack.backgroundRadius === 'full' ? undefined : asset.coinStack.backgroundRadius,
                                          padding: asset.coinStack.backgroundPadding,
                                        }
                                    : undefined
                                }
                              >
                                <CoinStack config={coinStackConfig} />
                              </div>
                            ) : (
                              <span className="text-xs text-quaternary">Asset</span>
                            )}
                          </div>
                        </DebugWrapper>
                      )}

                      {/* Header Section */}
                      <DebugWrapper
                        label="Header"
                        color="border-green-500"
                        show={demo.showOutlines}
                      >
                        <div
                          className={cn(
                            'flex flex-col',
                            header.textAlign === 'center' && 'text-center'
                          )}
                          style={{
                            gap: header.gap,
                            marginTop: header.topOffset !== 0 ? header.topOffset : undefined,
                          }}
                        >
                          <Dialog.Title className={titleClasses}>
                            {effectiveTitle}
                          </Dialog.Title>
                          {header.showSubheader && effectiveSubheader && (
                            <Dialog.Description className={subheaderClasses}>
                              {effectiveSubheader}
                            </Dialog.Description>
                          )}
                        </div>
                      </DebugWrapper>

                      {/* Separator after header */}
                      {separator.position === 'after-header' && (
                        <Separator config={separator} />
                      )}

                      {/* Content A Section */}
                      {effectiveContentA.show && (
                        <DebugWrapper
                          label="Content A"
                          color="border-yellow-500"
                          show={demo.showOutlines}
                        >
                          <div className="flex flex-col" style={{ gap: effectiveContentAHeader?.show ? 8 : 0 }}>
                            {effectiveContentAHeader && (
                              <ContentAHeader config={effectiveContentAHeader} />
                            )}
                            {renderContent(
                              effectiveContentA,
                              effectiveContentA.height,
                              effectiveContentA.lineCount,
                              contentA.lineGap
                            )}
                          </div>
                        </DebugWrapper>
                      )}

                      {/* Separator after content A */}
                      {separator.position === 'after-content-a' && effectiveContentA.show && (
                        <Separator config={separator} />
                      )}

                      {/* Content B Section - supports fill */}
                      {effectiveContentB.show && (
                        <DebugWrapper
                          label="Content B"
                          color="border-purple-500"
                          show={demo.showOutlines}
                        >
                          <div className={cn(
                            contentB.fill && 'flex flex-1 flex-col',
                            // Apply centering when checklist layout is centered
                            effectiveContentB.type === 'checklist' && contentB.checklistLayout?.centered && 'items-center',
                            // Allow overflow
                            effectiveContentB.type === 'checklist' && contentB.checklistLayout?.overflow && 'overflow-visible',
                            // No text wrap
                            effectiveContentB.type === 'checklist' && contentB.checklistLayout?.noWrap && 'whitespace-nowrap'
                          )}>
                            {effectiveContentB.type === 'checklist' && contentB.checklistLayout?.maxWidth > 0 ? (
                              <div
                                className={cn(
                                  contentB.checklistLayout?.overflow && 'overflow-visible',
                                  contentB.checklistLayout?.noWrap && 'whitespace-nowrap'
                                )}
                                style={{ maxWidth: contentB.checklistLayout.maxWidth, width: '100%' }}
                              >
                                {renderContent(
                                  effectiveContentB,
                                  effectiveContentB.height,
                                  effectiveContentB.lineCount,
                                  contentB.lineGap,
                                  contentB.fill
                                )}
                              </div>
                            ) : (
                              renderContent(
                                effectiveContentB,
                                effectiveContentB.height,
                                effectiveContentB.lineCount,
                                contentB.lineGap,
                                contentB.fill
                              )
                            )}
                          </div>
                        </DebugWrapper>
                      )}

                      {/* Separator after content B */}
                      {separator.position === 'after-content-b' && effectiveContentB.show && (
                        <Separator config={separator} />
                      )}

                      {/* Button Section */}
                      <DebugWrapper
                        label="Button"
                        color="border-red-500"
                        show={demo.showOutlines}
                      >
                        <ButtonSection
                          stateId={buttonStateId}
                          state={buttonState}
                          showSecondary={showSecondary}
                          buttonConfig={button}
                          slowMo={demo.slowMo ?? false}
                          onPrimaryClick={onPrimaryClick}
                          onBackClick={onBackClick}
                        />
                      </DebugWrapper>
                    </div>
                  </motion.div>
                </div>
              }
            />
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
