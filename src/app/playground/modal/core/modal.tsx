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
import { Button } from '@/components/ui/core/primitives/button'
import { FluidButtonGroup } from '@/components/ui/core/primitives/fluid-button-group'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'

import type { ModalPlaygroundConfig, StageContentConfig, StageId } from '../config/types'
import { CrossfadeText } from './crossfade-text'
import { ContentSlot } from './content-slot'
import {
  buildContainerClasses,
  buildContainerStyles,
  buildAnimationVariants,
  buildSpringTransition,
  buildTitleClasses,
  buildButtonLayoutClasses,
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
}

// ============================================================================
// Wireframe Placeholders
// ============================================================================

function AssetPlaceholder({ height }: { height: number }) {
  return (
    <div
      className="flex w-full items-center justify-center rounded-lg border border-dashed border-tertiary bg-tertiary/30"
      style={{ height }}
    >
      <span className="text-xs text-quaternary">Asset</span>
    </div>
  )
}

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
    <div className={cn('relative border-2 border-dashed', color)}>
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

export function PlaygroundModal({ config, open, onOpenChange, activeStage = 1 }: PlaygroundModalProps) {
  const { backdrop, animation, textTransition, closeButton, header, contentTop, contentBottom, buttons, demo, stages } =
    config

  // Get stage content from config
  const stageContent = stages[activeStage]
  const effectiveTitle = stageContent.headerTitle
  const effectiveContentA = stageContent.contentA
  const effectiveContentB = stageContent.contentB
  const effectiveButtons = stageContent.buttons

  // In autoOpen mode, override backdrop to be transparent and non-dismissable
  const effectiveBackdrop = demo.autoOpen
    ? { ...backdrop, opacity: 0, blur: 0, dismissable: false }
    : backdrop

  // Build animation variants
  const variants = buildAnimationVariants(animation)
  const transition = buildSpringTransition(animation, demo.slowMo)

  // Content transition settings (derived from animation config)
  const slowMoMultiplier = demo.slowMo ? 4 : 1
  const contentDuration = (animation.duration / 1000) * slowMoMultiplier
  const contentBounce = animation.bounce

  // Text transition settings
  const textDuration = (textTransition.duration / 1000) * slowMoMultiplier
  const textYOffset = textTransition.yOffset
  const textMode = textTransition.mode
  const textEasing = textTransition.easing

  // Build classes
  const containerClasses = buildContainerClasses(config)
  const containerStyles = buildContainerStyles(config)
  const titleClasses = buildTitleClasses(config)
  const buttonLayoutClasses = buildButtonLayoutClasses(config)

  // Calculate button radius if sync mode
  const buttonRadiusStyle =
    buttons.buttonRadius === 'sync'
      ? { borderRadius: Math.max(0, config.container.borderRadius - config.container.padding) }
      : undefined

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
                    layout
                    initial={variants.initial}
                    animate={variants.animate}
                    exit={variants.exit}
                    transition={{
                      ...transition,
                      layout: {
                        type: 'spring',
                        duration: 0.4,
                        bounce: 0.1,
                      },
                    }}
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
                          <motion.div layout="position" className="flex flex-col" style={{ gap: config.container.gap / 2 }}>
                            {/* Asset Placeholder */}
                            {header.showAsset && <AssetPlaceholder height={header.assetHeight} />}

                            {/* Title - text crossfades within persistent element */}
                            <Dialog.Title className={titleClasses}>
                              <CrossfadeText
                                text={effectiveTitle}
                                duration={textEasing === 'spring' ? contentDuration : textDuration}
                                bounce={contentBounce}
                                yOffset={textYOffset}
                                mode={textMode}
                                easing={textEasing}
                                useSpring={textEasing === 'spring'}
                              />
                            </Dialog.Title>
                          </motion.div>
                        </DebugWrapper>

                        {/* Content Top Section - height morphs, content animates */}
                        {contentTop.show && (
                          <DebugWrapper
                            label="Content A"
                            color="border-green-500"
                            show={demo.showContainerOutlines}
                          >
                            <ContentSlot
                              config={effectiveContentA}
                              lineGap={contentTop.lineGap}
                              duration={contentDuration}
                              bounce={contentBounce}
                              textMode={textMode}
                              textEasing={textEasing}
                              textYOffset={textYOffset}
                            />
                          </DebugWrapper>
                        )}

                        {/* Content Bottom Section - height morphs, content animates */}
                        {contentBottom.show && (
                          <DebugWrapper
                            label="Content B"
                            color="border-yellow-500"
                            show={demo.showContainerOutlines}
                          >
                            <ContentSlot
                              config={effectiveContentB}
                              lineGap={contentBottom.lineGap}
                              duration={contentDuration}
                              bounce={contentBounce}
                              textMode={textMode}
                              textEasing={textEasing}
                              textYOffset={textYOffset}
                            />
                          </DebugWrapper>
                        )}

                        {/* Spacer to push buttons to bottom */}
                        {config.container.pushButtonsToBottom && (
                          <DebugWrapper
                            label="Spacer (flex-1)"
                            color="border-red-500"
                            show={demo.showContainerOutlines}
                          >
                            <div className="flex-1" />
                          </DebugWrapper>
                        )}

                        {/* Button Section - text crossfades, buttons stay in place */}
                        <DebugWrapper
                          label="Buttons"
                          color="border-purple-500"
                          show={demo.showContainerOutlines}
                        >
                          <motion.div layout="position" className={buttonLayoutClasses} style={{ gap: buttons.gap }}>
                            {buttons.buttonCount === 2 && buttons.layout !== 'horizontal-reverse' && (
                              <Button
                                variant={buttons.secondary.variant}
                                size={buttons.secondary.size}
                                onClick={handleSecondaryClick}
                                className={cn('flex-1', !buttons.cornerSquircle && 'corner-round')}
                                style={buttonRadiusStyle}
                              >
                                <CrossfadeText
                                  text={effectiveButtons.secondary ?? ''}
                                  duration={textEasing === 'spring' ? contentDuration : textDuration}
                                  bounce={contentBounce}
                                  yOffset={textYOffset}
                                  mode={textMode}
                                  easing={textEasing}
                                  useSpring={textEasing === 'spring'}
                                />
                              </Button>
                            )}

                            <Button
                              variant={buttons.primary.variant}
                              size={buttons.primary.size}
                              onClick={handlePrimaryClick}
                              className={cn('flex-1', !buttons.cornerSquircle && 'corner-round')}
                              style={buttonRadiusStyle}
                            >
                              <CrossfadeText
                                text={effectiveButtons.primary}
                                duration={textEasing === 'spring' ? contentDuration : textDuration}
                                bounce={contentBounce}
                                yOffset={textYOffset}
                                mode={textMode}
                                easing={textEasing}
                                useSpring={textEasing === 'spring'}
                              />
                            </Button>

                            {buttons.buttonCount === 2 && buttons.layout === 'horizontal-reverse' && (
                              <Button
                                variant={buttons.secondary.variant}
                                size={buttons.secondary.size}
                                onClick={handleSecondaryClick}
                                className={cn('flex-1', !buttons.cornerSquircle && 'corner-round')}
                                style={buttonRadiusStyle}
                              >
                                <CrossfadeText
                                  text={effectiveButtons.secondary ?? ''}
                                  duration={textEasing === 'spring' ? contentDuration : textDuration}
                                  bounce={contentBounce}
                                  yOffset={textYOffset}
                                  mode={textMode}
                                  easing={textEasing}
                                  useSpring={textEasing === 'spring'}
                                />
                              </Button>
                            )}
                          </motion.div>
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
