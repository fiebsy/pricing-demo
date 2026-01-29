/**
 * ButtonAnimation V3 - Anchor Position Debugger
 *
 * Comprehensive debug overlay for visualizing anchor positioning,
 * offset calculations, and button state transitions in real-time.
 * Specifically designed for V3's simpler state model.
 *
 * @module prod/base/button-animation-v3/debug
 */

'use client'

import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Target01Icon from '@hugeicons-pro/core-stroke-rounded/Target01Icon'
import Layers01Icon from '@hugeicons-pro/core-stroke-rounded/Layers01Icon'
import RulerIcon from '@hugeicons-pro/core-stroke-rounded/RulerIcon'
import Bug02Icon from '@hugeicons-pro/core-stroke-rounded/Bug02Icon'
import GridIcon from '@hugeicons-pro/core-stroke-rounded/GridIcon'

// ============================================================================
// TYPES
// ============================================================================

interface ButtonInfo {
  id: string
  label: string
  level: number
  state: 'idle' | 'active' | 'anchored' | 'child' | 'promoting'
  position: { x: number; y: number }
  computedOffset: number
  expectedOffset: number
  isAnchored: boolean
  anchorDepth?: number
  element: HTMLElement
}

interface DebuggerProps {
  enabled?: boolean
  showGrid?: boolean
  showRulers?: boolean
  showConnections?: boolean
  showCalculations?: boolean
  showPositionOverlays?: boolean
  opacity?: number
  activePath: string[]
  styleConfig: {
    peekOffset: number
    anchoredOpacity: number
  }
}

// ============================================================================
// POSITION TRACKER HOOK
// ============================================================================

function useButtonTracker() {
  const [buttons, setButtons] = useState<Map<string, ButtonInfo>>(new Map())
  const observerRef = useRef<MutationObserver | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const updateButtons = () => {
      const newButtons = new Map<string, ButtonInfo>()
      
      // Find all button elements with our data attributes
      const elements = document.querySelectorAll('[data-button-id]')
      
      elements.forEach((element) => {
        const el = element as HTMLElement
        const id = el.dataset.buttonId!
        const label = el.dataset.buttonLabel || id
        const level = parseInt(el.dataset.buttonLevel || '0')
        const state = el.dataset.buttonState as ButtonInfo['state'] || 'idle'
        const isAnchored = el.dataset.buttonAnchored === 'true'
        const anchorDepth = el.dataset.buttonAnchorDepth 
          ? parseInt(el.dataset.buttonAnchorDepth) 
          : undefined
        
        const rect = el.getBoundingClientRect()
        const parentRect = el.offsetParent?.getBoundingClientRect() || { left: 0, top: 0 }
        
        // Get computed position
        const computedStyle = window.getComputedStyle(el.parentElement!)
        const computedOffset = parseFloat(computedStyle.left) || 0
        
        // Get expected offset from data attribute
        const expectedOffset = parseFloat(el.dataset.buttonExpectedOffset || '0')
        
        newButtons.set(id, {
          id,
          label,
          level,
          state,
          position: { 
            x: rect.left, 
            y: rect.top 
          },
          computedOffset,
          expectedOffset,
          isAnchored,
          anchorDepth,
          element: el,
        })
      })
      
      setButtons(newButtons)
    }
    
    // Initial update
    updateButtons()
    
    // Set up mutation observer
    observerRef.current = new MutationObserver(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateButtons)
    })
    
    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [
        'data-button-id', 
        'data-button-state', 
        'data-button-anchored',
        'style',
        'class'
      ],
    })
    
    // Update on animation frames
    const interval = setInterval(updateButtons, 100)
    
    return () => {
      observerRef.current?.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      clearInterval(interval)
    }
  }, [])
  
  return buttons
}

// ============================================================================
// MAIN DEBUGGER COMPONENT
// ============================================================================

export function AnchorPositionDebugger({
  enabled = true,
  showGrid = true,
  showRulers = true,
  showConnections = true,
  showCalculations = true,
  showPositionOverlays = true,
  opacity = 0.9,
  activePath,
  styleConfig,
}: DebuggerProps) {
  if (!enabled) return null
  
  const buttons = useButtonTracker()
  const peekOffset = Math.abs(styleConfig.peekOffset)
  
  // Build anchor stack from active path
  const anchorStack = React.useMemo(() => {
    const stack: ButtonInfo[] = []
    
    // Check if "All" button is anchored (exists and something else selected)
    const allButton = buttons.get('all')
    if (allButton && activePath[0] !== 'all' && activePath.length > 0) {
      stack.push({
        ...allButton,
        anchorDepth: 0,
        isAnchored: true,
      })
    }
    
    // All items in activePath except the last are anchored
    activePath.slice(0, -1).forEach((id, index) => {
      const button = buttons.get(id)
      if (button) {
        const depth = (allButton && activePath[0] !== 'all') ? index + 1 : index
        stack.push({
          ...button,
          anchorDepth: depth,
          isAnchored: true,
        })
      }
    })
    
    return stack
  }, [activePath, buttons])
  
  // Get active (non-anchored) buttons
  const activeButtons = React.useMemo(() => {
    const items: ButtonInfo[] = []
    
    buttons.forEach((button) => {
      if (!button.isAnchored && button.state !== 'idle') {
        items.push(button)
      }
    })
    
    return items
  }, [buttons])
  
  // Calculate expected positions
  const expectedChildOffset = anchorStack.length * peekOffset
  
  // Find position discrepancies
  const discrepancies = React.useMemo(() => {
    const issues: Array<{
      id: string
      label: string
      expected: number
      actual: number
      diff: number
    }> = []
    
    buttons.forEach((button) => {
      if (button.expectedOffset !== 0 || button.computedOffset !== 0) {
        const diff = Math.abs(button.computedOffset - button.expectedOffset)
        if (diff > 1) { // Allow 1px tolerance
          issues.push({
            id: button.id,
            label: button.label,
            expected: button.expectedOffset,
            actual: button.computedOffset,
            diff,
          })
        }
      }
    })
    
    return issues
  }, [buttons])
  
  // ============================================================================
  // RENDER HELPERS
  // ============================================================================
  
  const renderGrid = () => {
    if (!showGrid) return null
    
    const lines = []
    const maxLines = 30
    
    // Vertical lines at peek offset intervals
    for (let i = 0; i <= maxLines; i++) {
      const x = i * peekOffset
      const isMainLine = i % 5 === 0
      
      lines.push(
        <line
          key={`v-${i}`}
          x1={x}
          y1="0"
          x2={x}
          y2="100%"
          stroke="rgb(59, 130, 246)"
          strokeOpacity={isMainLine ? "0.2" : "0.1"}
          strokeWidth={isMainLine ? "1" : "0.5"}
          strokeDasharray={isMainLine ? "0" : "2 4"}
        />
      )
      
      // Add labels for main lines
      if (isMainLine && i > 0) {
        lines.push(
          <text
            key={`label-${i}`}
            x={x}
            y="20"
            fill="rgb(59, 130, 246)"
            fillOpacity="0.5"
            fontSize="10"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {x}px
          </text>
        )
      }
    }
    
    return lines
  }
  
  const renderRulers = () => {
    if (!showRulers) return null
    
    return (
      <div className="fixed top-24 left-0 w-full h-8 bg-black/30 backdrop-blur-sm z-[10000] pointer-events-none border-y border-white/10">
        <div className="relative h-full">
          {/* Anchor position markers */}
          {anchorStack.map((button, index) => {
            const offset = index * peekOffset
            return (
              <div
                key={button.id}
                className="absolute top-0 h-full flex items-center"
                style={{ left: `${offset}px` }}
              >
                <div className="w-px h-full bg-yellow-500/70" />
                <div className="ml-1 px-1.5 py-0.5 bg-yellow-500/20 backdrop-blur-sm rounded text-[10px] font-mono text-yellow-300 whitespace-nowrap">
                  A{index}: {button.label} ({offset}px)
                </div>
              </div>
            )
          })}
          
          {/* Expected child position */}
          <div
            className="absolute top-0 h-full flex items-center"
            style={{ left: `${expectedChildOffset}px` }}
          >
            <div className="w-px h-full bg-green-500/70" />
            <div className="ml-1 px-1.5 py-0.5 bg-green-500/20 backdrop-blur-sm rounded text-[10px] font-mono text-green-300 whitespace-nowrap">
              Children: {expectedChildOffset}px
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  const renderConnections = () => {
    if (!showConnections) return null
    
    const connections: React.ReactNode[] = []
    
    // Draw connections between anchored items
    anchorStack.forEach((button, index) => {
      if (index > 0) {
        const prevButton = anchorStack[index - 1]
        connections.push(
          <line
            key={`${prevButton.id}-${button.id}`}
            x1={prevButton.position.x + 80}
            y1={prevButton.position.y + 20}
            x2={button.position.x}
            y2={button.position.y + 20}
            stroke="rgb(234, 179, 8)"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeDasharray="4 2"
            markerEnd="url(#arrowhead)"
          />
        )
      }
    })
    
    // Draw connection from last anchor to active items
    if (anchorStack.length > 0 && activeButtons.length > 0) {
      const lastAnchor = anchorStack[anchorStack.length - 1]
      activeButtons.forEach((button) => {
        connections.push(
          <line
            key={`${lastAnchor.id}-${button.id}`}
            x1={lastAnchor.position.x + 80}
            y1={lastAnchor.position.y + 20}
            x2={button.position.x}
            y2={button.position.y + 20}
            stroke="rgb(34, 197, 94)"
            strokeOpacity="0.3"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        )
      })
    }
    
    return (
      <>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="rgb(234, 179, 8)"
              fillOpacity="0.4"
            />
          </marker>
        </defs>
        {connections}
      </>
    )
  }
  
  const renderCalculations = () => {
    if (!showCalculations) return null
    
    return (
      <div className="fixed top-32 left-4 z-[10001] pointer-events-none">
        <div className="bg-black/85 backdrop-blur-sm rounded-lg p-4 border border-white/20 max-w-sm">
          <div className="flex items-center gap-2 mb-3">
            <HugeIcon icon={RulerIcon} size={16} className="text-blue-400" />
            <span className="text-sm font-semibold text-white">Position Calculations</span>
          </div>
          
          {/* Active Path */}
          <div className="mb-3">
            <div className="text-xs text-gray-400 mb-1">Active Path:</div>
            <div className="text-xs font-mono text-blue-300">
              {activePath.length > 0 ? activePath.join(' → ') : '(root)'}
            </div>
          </div>
          
          {/* Anchor Stack Analysis */}
          <div className="mb-3">
            <div className="text-xs text-gray-400 mb-1">Anchor Stack ({anchorStack.length}):</div>
            {anchorStack.length > 0 ? (
              <div className="space-y-1">
                {anchorStack.map((button, index) => (
                  <div key={button.id} className="flex items-center gap-2 text-xs">
                    <span className="text-yellow-400 font-mono w-8">A{index}:</span>
                    <span className="text-white flex-1">{button.label}</span>
                    <span className="text-green-400 font-mono">
                      {index * peekOffset}px
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-500">No anchored items</div>
            )}
          </div>
          
          {/* Expected Positions */}
          <div className="mb-3">
            <div className="text-xs text-gray-400 mb-1">Expected Offsets:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-500">Next Anchor:</span>
                <span className="text-yellow-400 font-mono ml-1">
                  {anchorStack.length * peekOffset}px
                </span>
              </div>
              <div>
                <span className="text-gray-500">Children:</span>
                <span className="text-green-400 font-mono ml-1">
                  {expectedChildOffset}px
                </span>
              </div>
            </div>
          </div>
          
          {/* Position Discrepancies */}
          {discrepancies.length > 0 && (
            <div className="border-t border-white/10 pt-2">
              <div className="text-xs text-red-400 mb-1">⚠️ Position Issues:</div>
              <div className="space-y-1">
                {discrepancies.slice(0, 3).map((issue) => (
                  <div key={issue.id} className="text-xs">
                    <span className="text-white">{issue.label}:</span>
                    <span className="text-red-400 font-mono ml-1">
                      {issue.actual}px
                    </span>
                    <span className="text-gray-500 mx-1">→</span>
                    <span className="text-green-400 font-mono">
                      {issue.expected}px
                    </span>
                    <span className="text-orange-400 ml-1">
                      (Δ{issue.diff}px)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
  
  const renderPositionOverlays = () => {
    if (!showPositionOverlays) return null
    
    const overlays: React.ReactNode[] = []
    
    buttons.forEach((button) => {
      const isInPath = activePath.includes(button.id)
      const isActive = button.id === activePath[activePath.length - 1]
      const hasDiscrepancy = Math.abs(button.computedOffset - button.expectedOffset) > 1
      
      let color = 'bg-gray-500'
      let label = 'Idle'
      
      if (button.isAnchored) {
        color = 'bg-yellow-500'
        label = 'Anchored'
      } else if (isActive) {
        color = 'bg-green-500'
        label = 'Active'
      } else if (button.state === 'child') {
        color = 'bg-blue-500'
        label = 'Child'
      } else if (button.state === 'promoting') {
        color = 'bg-purple-500'
        label = 'Promoting'
      }
      
      overlays.push(
        <div
          key={button.id}
          className="absolute pointer-events-none"
          style={{
            left: `${button.position.x}px`,
            top: `${button.position.y}px`,
            zIndex: 10002,
          }}
        >
          {/* Position dot with error indication */}
          <div 
            className={cn(
              'w-3 h-3 rounded-full border-2',
              hasDiscrepancy ? 'border-red-500 bg-red-500' : 'border-white/20',
              color
            )} 
            style={{ opacity: opacity * 0.8 }} 
          />
          
          {/* Enhanced info label */}
          <div className="absolute -top-8 left-4 whitespace-nowrap">
            <div className={cn(
              'px-2 py-1 backdrop-blur-sm rounded text-[10px] font-mono border',
              hasDiscrepancy ? 'bg-red-500/90 text-white border-red-600' : 'bg-black/85 text-white border-white/20'
            )}>
              <div className="font-semibold">{button.label}</div>
              <div className="flex items-center gap-2 text-[8px] mt-0.5">
                <span>L{button.level}</span>
                {button.computedOffset !== 0 && (
                  <span className="text-yellow-300">
                    {button.computedOffset}px
                  </span>
                )}
                {hasDiscrepancy && (
                  <span className="text-red-300">
                    ⚠️ Expected: {button.expectedOffset}px
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* State label */}
          <div className="absolute top-8 left-4">
            <div className={cn(
              'px-1 py-0.5 rounded text-[8px] text-white',
              color.replace('bg-', 'bg-opacity-20 border border-').replace('500', '400')
            )}>
              {label}
            </div>
          </div>
        </div>
      )
    })
    
    return overlays
  }
  
  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <>
      {/* SVG Grid and Connections */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-[9998]"
        style={{ opacity: opacity * 0.4 }}
      >
        {renderGrid()}
        {renderConnections()}
      </svg>
      
      {/* Rulers */}
      {renderRulers()}
      
      {/* Calculations Panel */}
      {renderCalculations()}
      
      {/* Position Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[10002]">
        {renderPositionOverlays()}
      </div>
      
      {/* Enhanced Legend */}
      <div className="fixed bottom-4 right-[360px] z-[10001] pointer-events-none">
        <div className="bg-black/85 backdrop-blur-sm rounded-lg p-2.5 border border-white/20">
          <div className="text-xs font-semibold text-white mb-2 flex items-center gap-1">
            <HugeIcon icon={Bug02Icon} size={14} className="text-purple-400" />
            V3 Debug States
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-white">Anchored (A)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-white">Active (S)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-white">Expanded (E)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-gray-500" />
              <span className="text-white">Child (C)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-white">Promoting (P)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500 border border-red-600" />
              <span className="text-red-300">Position Error</span>
            </div>
          </div>
          <div className="text-[8px] text-gray-400 mt-2 border-t border-white/10 pt-2">
            Badge shows: STATE / Level / Depth (if anchored)
          </div>
        </div>
      </div>
      
      {/* Mini Stats */}
      <div className="fixed top-4 right-[360px] z-[10001] pointer-events-none">
        <div className="bg-black/85 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <HugeIcon icon={Layers01Icon} size={12} className="text-yellow-400" />
              <span className="text-white font-mono">{anchorStack.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <HugeIcon icon={Target01Icon} size={12} className="text-green-400" />
              <span className="text-white font-mono">{expectedChildOffset}px</span>
            </div>
            <div className="flex items-center gap-1">
              <HugeIcon icon={GridIcon} size={12} className="text-blue-400" />
              <span className="text-white font-mono">{peekOffset}px</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ============================================================================
// EXPORTS
// ============================================================================

export default AnchorPositionDebugger