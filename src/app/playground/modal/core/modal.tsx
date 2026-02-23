/**
 * Playground Modal Component
 *
 * Base UI Dialog + Motion integration with configurable styling.
 * Uses non-modal mode to keep control panel accessible.
 *
 * @status incubating
 * @migration-target src/components/ui/core/primitives/modal
 */

'use client'

import { Dialog } from '@base-ui/react/dialog'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'

import type { ModalPlaygroundConfig, StageId } from '../config/types'
import type { PricingTier } from '@/components/ui/features/pricing-select-menu'
import { CrossfadeText } from './crossfade-text'
import { ContentSlot } from './content-slot'
import { ModalButtonSection } from './modal-button-section'
import { AssetRenderer } from './asset-renderer'
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
} from '../utils/class-builders'

// ============================================================================
// Types
// ============================================================================

interface PlaygroundModalProps {
  config: ModalPlaygroundConfig
  open: boolean
  onOpenChange: (open: boolean) => void
  activeStage?: StageId
  /** Currently selected pricing tier (passed to pricing-select content) */
  selectedTier?: PricingTier
  /** Handler for tier selection (passed to pricing-select content) */
  onTierSelect?: (tier: PricingTier) => void
}

// ============================================================================
// Wireframe Placeholders
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
  // Calculate line heights to fill the container
  const lineHeights = Array.from({ length: lineCount }, (_, i) => {
    // Last line is shorter to simulate truncated text
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
// Modal Component
// ============================================================================

export function PlaygroundModal({ config, open, onOpenChange, activeStage = 1, selectedTier, onTierSelect }: PlaygroundModalProps) {
  const { backdrop, animation, textTransition, closeButton, header, contentTop, contentBottom, buttons, demo, proCard, checklist, pricingSelect, stages } =
    config

  // Get stage content from config
  const stageContent = stages[activeStage]
  const effectiveTitle = stageContent.headerTitle
  const effectiveSubheader = stageContent.headerSubheader ?? header.subheaderContent
  const effectiveContentA = stageContent.contentA
  const effectiveContentB = stageContent.contentB
  const effectiveButtons = stageContent.buttons
  // Per-stage override for pushButtonsToBottom (undefined = use global)
  const effectivePushButtonsToBottom = stageContent.pushButtonsToBottom ?? config.container.pushButtonsToBottom

  // In autoOpen mode, override backdrop to be transparent and non-dismissable
  const effectiveBackdrop = demo.autoOpen
    ? { ...backdrop, opacity: 0, blur: 0, dismissable: false }
    : backdrop

  // Build animation variants
  const variants = buildAnimationVariants(animation)
  const transition = buildSpringTransition(animation, demo.slowMo)

  // Determine if we're using synced timing
  const isSynced = animation.syncMode === 'synced'
  const slowMoMultiplier = demo.slowMo ? 4 : 1

  // Effective timing - unified when synced, independent otherwise
  const effectiveTiming = isSynced
    ? {
        layoutDuration: animation.master.duration * slowMoMultiplier,
        layoutBounce: animation.master.bounce,
        contentDuration: animation.master.duration * slowMoMultiplier,
        contentBounce: animation.master.bounce,
        stagger: animation.master.stagger,
      }
    : {
        layoutDuration: animation.layout.duration * slowMoMultiplier,
        layoutBounce: animation.layout.bounce,
        contentDuration: (animation.duration / 1000) * slowMoMultiplier,
        contentBounce: animation.bounce,
        stagger: 0.03,
      }

  // Text transition settings
  const textEnabled = textTransition.enabled
  const textDuration = isSynced
    ? effectiveTiming.contentDuration
    : (textTransition.duration / 1000) * slowMoMultiplier
  const textYOffset = textTransition.yOffset
  const textMode = textTransition.mode
  const textEasing = isSynced ? 'spring' : textTransition.easing

  // Build classes
  const containerClasses = buildContainerClasses(config)
  const containerStyles = buildContainerStyles(config)
  const titleClasses = buildTitleClasses(config)
  const subheaderClasses = buildSubheaderClasses(config)

  // Calculate button radius if sync mode
  const buttonRadiusStyle =
    buttons.buttonRadius === 'sync'
      ? { borderRadius: Math.max(0, config.container.borderRadius - config.container.padding) }
      : undefined

  // Calculate content area width for pricing-select 'fill' mode
  const contentAreaWidth = config.container.width - (2 * config.container.padding)

  // Handle button click
  const handlePrimaryClick = () => {
    onOpenChange(false)
  }

  const handleSecondaryClick = () => {
    onOpenChange(false)
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
                    backgroundColor: `rgba(0, 0, 0, ${effectiveBackdrop.opacity / 100})`,
                    backdropFilter:
                      effectiveBackdrop.blur > 0 ? `blur(${effectiveBackdrop.blur}px)` : 'none',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={
                    effectiveBackdrop.dismissable ? () => onOpenChange(false) : undefined
                  }
                />
              }
            />

            {/* Popup Container - Centers the modal */}
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
                    {/* Close Button */}
                    {closeButton.show && (
                      <Dialog.Close
                        className={cn(
                          'absolute flex items-center justify-center transition-colors',
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

                    {/* Stage Content - content morphs within persistent blocks */}
                    <LayoutGroup>
                      <motion.div
                        className="flex flex-col"
                        style={{ gap: config.container.gap }}
                      >
                        {/* Header Section */}
                        <DebugWrapper
                          label="Header"
                          color="border-blue-500"
                          show={demo.showContainerOutlines}
                        >
                          <div className="flex flex-col" style={{ gap: config.container.gap / 2 }}>
                            {/* Asset - placeholder or coin-stack with per-stage transitions */}
                            {header.showAsset && (
                              <AssetRenderer
                                config={header.asset ?? { type: 'placeholder', height: header.assetHeight, alignment: 'center', offsetX: 0 }}
                                activeStateId={stageContent.asset?.coinStackStateId}
                                duration={effectiveTiming.layoutDuration}
                                bounce={effectiveTiming.layoutBounce}
                              />
                            )}

                            {/* Title - text crossfades within persistent element */}
                            <Dialog.Title className={titleClasses}>
                              <CrossfadeText
                                text={effectiveTitle}
                                enabled={textEnabled}
                                duration={textEasing === 'spring' ? effectiveTiming.contentDuration : textDuration}
                                bounce={effectiveTiming.contentBounce}
                                yOffset={textYOffset}
                                mode={textMode}
                                easing={textEasing}
                                useSpring={textEasing === 'spring'}
                              />
                            </Dialog.Title>

                            {/* Subheader - text crossfades within persistent element */}
                            {header.subheader.show && (
                              <Dialog.Description className={subheaderClasses}>
                                <CrossfadeText
                                  text={effectiveSubheader}
                                  enabled={textEnabled}
                                  duration={textEasing === 'spring' ? effectiveTiming.contentDuration : textDuration}
                                  bounce={effectiveTiming.contentBounce}
                                  yOffset={textYOffset}
                                  mode={textMode}
                                  easing={textEasing}
                                  useSpring={textEasing === 'spring'}
                                />
                              </Dialog.Description>
                            )}
                          </div>
                        </DebugWrapper>

                        {/* Content Top Section - height morphs, content animates */}
                        {/* Note: pricing-select needs high z-index when expanded to overlay other sections */}
                        {contentTop.show && effectiveContentA.show !== false && (
                          <div
                            className="relative"
                            style={{
                              zIndex: effectiveContentA.type === 'pricing-select' ? 50 : 'auto',
                              overflow: 'visible',
                            }}
                          >
                            <DebugWrapper
                              label="Content A"
                              color="border-green-500"
                              show={demo.showContainerOutlines}
                            >
                              <ContentSlot
                                config={effectiveContentA}
                                proCardConfig={proCard}
                                checklistConfig={checklist}
                                pricingSelectConfig={pricingSelect}
                                selectedTier={selectedTier}
                                onTierSelect={onTierSelect}
                                lineGap={contentTop.lineGap}
                                duration={effectiveTiming.layoutDuration}
                                bounce={effectiveTiming.layoutBounce}
                                stagger={effectiveTiming.stagger}
                                textMode={textMode}
                                textEasing={textEasing}
                                textYOffset={textYOffset}
                                textEnabled={textEnabled}
                                containerWidth={contentAreaWidth}
                              />
                            </DebugWrapper>
                          </div>
                        )}

                        {/* Content Bottom Section - height morphs, content animates */}
                        {contentBottom.show && effectiveContentB.show !== false && (
                          <DebugWrapper
                            label="Content B"
                            color="border-yellow-500"
                            show={demo.showContainerOutlines}
                          >
                            <ContentSlot
                              config={effectiveContentB}
                              proCardConfig={proCard}
                              checklistConfig={checklist}
                              pricingSelectConfig={pricingSelect}
                              selectedTier={selectedTier}
                              onTierSelect={onTierSelect}
                              lineGap={contentBottom.lineGap}
                              duration={effectiveTiming.layoutDuration}
                              bounce={effectiveTiming.layoutBounce}
                              stagger={effectiveTiming.stagger}
                              textMode={textMode}
                              textEasing={textEasing}
                              textYOffset={textYOffset}
                              textEnabled={textEnabled}
                              containerWidth={contentAreaWidth}
                            />
                          </DebugWrapper>
                        )}

                        {/* Spacer to push buttons to bottom */}
                        {effectivePushButtonsToBottom && (
                          <DebugWrapper
                            label="Spacer (flex-1)"
                            color="border-red-500"
                            show={demo.showContainerOutlines}
                          >
                            <div className="flex-1" />
                          </DebugWrapper>
                        )}

                        {/* Line Separator */}
                        {config.container.showSeparator && (
                          <div className="h-px w-full bg-tertiary" />
                        )}

                        {/* Button Section - fluid layout with animated states */}
                        <DebugWrapper
                          label="Buttons"
                          color="border-purple-500"
                          show={demo.showContainerOutlines}
                        >
                          <div>
                            <ModalButtonSection
                              config={buttons}
                              stageButtons={effectiveButtons}
                              slowMo={demo.slowMo}
                              textDuration={textEasing === 'spring' ? effectiveTiming.contentDuration : textDuration}
                              textBounce={effectiveTiming.contentBounce}
                              textYOffset={textYOffset}
                              textMode={textMode}
                              textEasing={textEasing}
                              buttonRadiusStyle={buttonRadiusStyle}
                              masterDuration={isSynced ? effectiveTiming.layoutDuration : undefined}
                              onPrimaryClick={handlePrimaryClick}
                              onSecondaryClick={handleSecondaryClick}
                            />
                          </div>
                        </DebugWrapper>
                      </motion.div>
                    </LayoutGroup>

                    {/* Debug Overlay */}
                    {demo.showDebug && (
                      <div className="absolute -bottom-8 left-0 right-0 flex justify-center">
                        <span className="rounded-full bg-tertiary px-2 py-0.5 text-[10px] text-quaternary">
                          {animation.preset} • {animation.duration}ms
                          {demo.slowMo && ' (4x slow)'}
                        </span>
                      </div>
                    )}
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
