'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  AnimatedCreditsBadge,
  DemoPricingWrapper,
  CaretLeftIcon,
  CaretDownIcon,
  PlusIcon,
  AiLoadIcon,
  VideoIcon,
  CommandIcon,
} from './components'

// ============================================================================
// Capture Mode Types
// ============================================================================

type FlowState = 'demo' | 'A-collapsed' | 'A-expanded' | 'B1' | 'B2' | 'C1' | 'C2' | 'post-upgrade' | 'credits-animation'

interface CaptureState {
  enabled: boolean
  slowMo: boolean
  pauseCredits: boolean
  forceDropdownExpanded: boolean
  currentFlow: FlowState
}

// ============================================================================
// Capture Debug Panel Component
// ============================================================================

function CaptureDebugPanel({
  state,
  onStateChange,
  onSetFlow,
}: {
  state: CaptureState
  onStateChange: (updates: Partial<CaptureState>) => void
  onSetFlow: (flow: FlowState) => void
}) {
  const flowStates: FlowState[] = ['demo', 'A-collapsed', 'A-expanded', 'B1', 'B2', 'C1', 'C2', 'post-upgrade', 'credits-animation']

  return (
    <div className="fixed bottom-4 right-4 z-[1000] bg-gray-900 text-white rounded-lg shadow-2xl p-4 min-w-[280px] font-mono text-xs">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
        <span className="text-lg">📸</span>
        <span className="font-semibold text-sm">Capture Mode</span>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-1 rounded">
          <input
            type="checkbox"
            checked={state.slowMo}
            onChange={(e) => onStateChange({ slowMo: e.target.checked })}
            className="accent-blue-500"
          />
          <span>SlowMo transitions (5x)</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-1 rounded">
          <input
            type="checkbox"
            checked={state.pauseCredits}
            onChange={(e) => onStateChange({ pauseCredits: e.target.checked })}
            className="accent-blue-500"
          />
          <span>Pause credit animation</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-1 rounded">
          <input
            type="checkbox"
            checked={state.forceDropdownExpanded}
            onChange={(e) => onStateChange({ forceDropdownExpanded: e.target.checked })}
            className="accent-blue-500"
          />
          <span>Force dropdown expanded</span>
        </label>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-700">
        <div className="text-gray-400 mb-2">Flow State:</div>
        <div className="flex flex-wrap gap-1">
          {flowStates.map((flow) => (
            <button
              key={flow}
              onClick={() => onSetFlow(flow)}
              className={`px-2 py-1 rounded text-[10px] transition-colors ${
                state.currentFlow === flow
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {flow}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-gray-700 text-gray-500 text-[10px]">
        URL param: ?capture=true
      </div>
    </div>
  )
}

export default function DemoPage() {
  // Credit state
  const [credits, setCredits] = useState(20)
  const [previousCredits, setPreviousCredits] = useState(20)
  const [isAnimating, setIsAnimating] = useState(false)
  const [generateReady, setGenerateReady] = useState(false)
  const hadEnoughCredits = useRef(false)

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)

  // Capture mode state
  const [captureState, setCaptureState] = useState<CaptureState>({
    enabled: false,
    slowMo: false,
    pauseCredits: false,
    forceDropdownExpanded: false,
    currentFlow: 'demo',
  })

  // Check for capture mode URL param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('capture') === 'true') {
      setCaptureState((prev) => ({ ...prev, enabled: true }))
    }
  }, [])

  // Handle flow state changes from debug panel
  const handleSetFlow = useCallback((flow: FlowState) => {
    setCaptureState((prev) => ({ ...prev, currentFlow: flow }))

    switch (flow) {
      case 'demo':
        setModalOpen(false)
        setCredits(20)
        setPreviousCredits(20)
        setIsAnimating(false)
        break
      case 'A-collapsed':
        setModalOpen(true)
        setCaptureState((prev) => ({ ...prev, forceDropdownExpanded: false }))
        break
      case 'A-expanded':
        setModalOpen(true)
        setCaptureState((prev) => ({ ...prev, forceDropdownExpanded: true }))
        break
      case 'B1':
      case 'B2':
      case 'C1':
      case 'C2':
        setModalOpen(true)
        setCaptureState((prev) => ({ ...prev, forceDropdownExpanded: false }))
        // Note: Actual flow state changes need to be triggered through modal interaction
        break
      case 'post-upgrade':
        setModalOpen(false)
        setCredits(500)
        setPreviousCredits(500)
        setIsAnimating(false)
        break
      case 'credits-animation':
        setModalOpen(false)
        setCredits(500)
        setPreviousCredits(20)
        setIsAnimating(true)
        break
    }
  }, [])

  const hasEnoughCredits = credits >= 100

  // Handle Generate button click
  const handleGenerateClick = () => {
    if (!hasEnoughCredits) {
      setModalOpen(true)
    } else {
      // Future: actual generate action
      console.log('Generating with', credits, 'credits')
    }
  }

  // Handle upgrade completion from modal
  const handleUpgradeComplete = (newCredits: number) => {
    setPreviousCredits(credits)
    setCredits(newCredits) // Set to selected tier's credits
    setIsAnimating(true)
  }

  const handleAnimationComplete = () => {
    setIsAnimating(false)
    setPreviousCredits(credits)

    // Trigger generate button animation when crossing threshold
    if (hasEnoughCredits && !hadEnoughCredits.current) {
      hadEnoughCredits.current = true
      setGenerateReady(true)
      setTimeout(() => setGenerateReady(false), 1000)
    }
  }

  // Track threshold crossing
  useEffect(() => {
    if (!hasEnoughCredits) {
      hadEnoughCredits.current = false
    }
  }, [hasEnoughCredits])

  return (
    <div className="min-h-screen w-full font-normal bg-primary">
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center w-6 h-6 shrink-0 bg-primary rounded-full shadow-md hover:bg-secondary transition-all">
            <CaretLeftIcon />
          </button>
          <div className="flex w-px h-5 bg-quaternary shrink-0"></div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-md border border-primary bg-success-primary w-5 h-5 shrink-0 shadow-sm">
              <VideoIcon />
            </div>
            <span className="font-semibold text-sm text-primary">Video</span>
            <AnimatedCreditsBadge
              value={credits}
              previousValue={previousCredits}
              isAnimating={isAnimating}
              onAnimationComplete={handleAnimationComplete}
              pauseAtProgress={captureState.pauseCredits ? 0.5 : undefined}
            />
          </div>
        </div>
        <div className="text-xs text-tertiary">
          Demo: Credits = {credits}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-[980px]:flex-row flex-col px-14 pt-[76px] pb-[140px] w-full min-h-[calc(100vh-64px)] min-[980px]:justify-center justify-start min-[980px]:items-stretch items-start min-[980px]:gap-12 gap-8 text-sm">
        {/* Left Sidebar */}
        <div className="flex flex-col gap-5 min-[980px]:w-[304px] w-full shrink-0 justify-between relative z-1 min-h-[620px]">
          <div className="flex flex-col gap-5 relative z-1">
            {/* Prompt Section */}
            <div className="flex flex-col">
              <label className="mb-2 block text-sm font-medium text-primary">
                Prompt
              </label>
              <div className="relative">
                <textarea
                  suppressHydrationWarning
                  placeholder="Describe your video or drop your script and assets here..."
                  className="text-primary placeholder:text-secondary h-40 w-full resize-none rounded-lg bg-secondary p-3 focus:outline-none hover:bg-tertiary focus:bg-tertiary transition-colors flex items-center justify-between"
                />
                <button className="absolute left-2 bottom-2 text-primary w-[28px] h-[28px] flex items-center justify-center rounded-full transition-all bg-transparent shadow-none hover:bg-primary hover:shadow-sm">
                  <PlusIcon />
                </button>
              </div>
            </div>

            {/* Brand Kit Section */}
            <div className="flex flex-col">
              <label className="mb-2 block text-sm font-medium text-primary">
                Brand Kit
              </label>
              <button className="w-full rounded-lg bg-secondary p-2 pr-3 h-14 hover:bg-tertiary transition-colors flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 w-full min-w-0">
                  <div className="h-10 shrink-0 relative aspect-3/2 overflow-hidden rounded-lg bg-[#50BFFF] text-white text-sm font-bold flex items-center justify-center">
                    Aa
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-primary">
                      Dovetail
                    </div>
                    <div className="text-xs text-secondary">
                      Recently updated
                    </div>
                  </div>
                </div>
                <CaretDownIcon />
              </button>
            </div>

            {/* Length Section */}
            <div className="flex flex-col">
              <label className="mb-2 block text-sm font-medium text-primary">
                Length
              </label>
              <button className="w-full h-9 rounded-lg p-2 pl-3 pr-3 transition-colors bg-secondary hover:bg-tertiary flex items-center justify-between gap-4">
                <span className="text-sm text-primary">~ 1 minute</span>
                <CaretDownIcon />
              </button>
            </div>
          </div>
          {/* Generate Button */}
          <motion.button
            onClick={handleGenerateClick}
            animate={
              generateReady
                ? { scale: [1, 1.02, 1] }
                : {}
            }
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full shrink-0 text-sm font-semibold cursor-pointer rounded-lg transition-colors no-animation focus:outline-none bg-brand-solid border border-brand text-white shadow-md hover:opacity-90 active:opacity-100 active:shadow-none !h-9 px-4 text-sm relative"
          >
            Generate
            <AnimatePresence>
              {!hasEnoughCredits && (
                <motion.span
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0 }}
                  className="px-[5px] py-0.5 bg-primary rounded-lg inline-flex justify-start items-center gap-0.5 overflow-hidden ml-2 shadow-sm text-primary text-xs font-semibold"
                >
                  <CommandIcon />
                  100
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Right Preview Area */}
        <div className="flex min-[980px]:flex-1 flex-initial w-full min-w-0 min-h-[620px]">
          <div className="flex flex-col gap-2 h-full w-full items-center justify-center select-none bg-secondary_subtle rounded-2xl border-8 border-white shadow-[0px_0px_0px_1px_rgba(17,24,39,0.08)]">
            <AiLoadIcon className="mb-3" />
            <p className="text-sm text-gray-400">Ready when you are</p>
            <p className="text-sm text-gray-300">
              Adjust settings on the left panel to begin
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Modal */}
      <DemoPricingWrapper
        open={modalOpen}
        onOpenChange={setModalOpen}
        onUpgradeComplete={handleUpgradeComplete}
        slowMo={captureState.slowMo}
        forceDropdownExpanded={captureState.forceDropdownExpanded}
      />

      {/* Capture Mode Debug Panel */}
      {captureState.enabled && (
        <CaptureDebugPanel
          state={captureState}
          onStateChange={(updates) => setCaptureState((prev) => ({ ...prev, ...updates }))}
          onSetFlow={handleSetFlow}
        />
      )}
    </div>
  )
}
