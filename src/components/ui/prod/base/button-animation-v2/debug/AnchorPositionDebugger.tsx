/**
 * ButtonAnimation V2 - Anchor Position Debugger
 *
 * Comprehensive debug overlay for visualizing anchor positioning,
 * offset calculations, and button state transitions in real-time.
 *
 * @module prod/base/button-animation-v2/debug
 */

'use client'

import * as React from 'react'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/core/primitives/icon'
import Target01Icon from '@hugeicons-pro/core-stroke-rounded/Target01Icon'
import Layers01Icon from '@hugeicons-pro/core-stroke-rounded/Layers01Icon'
import ArrowRight01Icon from '@hugeicons-pro/core-stroke-rounded/ArrowRight01Icon'
import RulerIcon from '@hugeicons-pro/core-stroke-rounded/RulerIcon'

import { useStackContextOptional } from '../context'
import { ButtonState, STATE_METADATA } from '../core/state-machine'
import { usePositionCalculator } from '../core/position-calculator'
import type { StyleConfig } from '../types'

// ============================================================================
// TYPES
// ============================================================================

interface ButtonPosition {
  id: string
  label: string
  level: number
  state: ButtonState
  position: { x: number; y: number }
  offset: { x: number; y: number }
  isAnchored: boolean
  anchorIndex?: number
}

interface DebugOverlayProps {
  enabled?: boolean
  showGrid?: boolean
  showRulers?: boolean
  showConnections?: boolean
  showOffsetCalculations?: boolean
  opacity?: number
}

// ============================================================================
// POSITION TRACKER HOOK
// ============================================================================

function usePositionTracker() {
  const [positions, setPositions] = useState<Map<string, ButtonPosition>>(new Map())
  const observerRef = useRef<MutationObserver | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const updatePositions = () => {
      const newPositions = new Map<string, ButtonPosition>()
      
      // Find all animated buttons in the DOM
      const buttons = document.querySelectorAll('[data-state][data-id]')
      
      buttons.forEach((button) => {
        const element = button as HTMLElement
        const id = element.dataset.id!
        const state = element.dataset.state as ButtonState
        const level = parseInt(element.dataset.level || '0')
        const rect = element.getBoundingClientRect()
        
        // Get computed transform to extract offset
        const transform = window.getComputedStyle(element).transform
        let offsetX = 0
        let offsetY = 0
        
        if (transform && transform !== 'none') {
          const matrix = new DOMMatrix(transform)
          offsetX = matrix.m41
          offsetY = matrix.m42
        }
        
        // Check if element has absolute positioning
        const computedStyle = window.getComputedStyle(element)
        const isAbsolute = computedStyle.position === 'absolute'
        const left = parseFloat(computedStyle.left) || 0
        
        newPositions.set(id, {
          id,
          label: element.textContent?.trim() || id,
          level,
          state,
          position: { x: rect.left, y: rect.top },
          offset: { x: isAbsolute ? left : offsetX, y: offsetY },
          isAnchored: STATE_METADATA[state]?.anchored || false,
        })
      })
      
      setPositions(newPositions)
    }
    
    // Initial update
    updatePositions()
    
    // Set up mutation observer to track DOM changes
    observerRef.current = new MutationObserver(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updatePositions)
    })
    
    observerRef.current.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-state', 'style', 'class'],
    })
    
    // Also update on animation frames for smooth tracking
    const interval = setInterval(updatePositions, 100)
    
    return () => {
      observerRef.current?.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      clearInterval(interval)
    }
  }, [])
  
  return positions
}

// ============================================================================
// ANCHOR POSITION DEBUGGER COMPONENT
// ============================================================================

/**
 * Comprehensive debug overlay for anchor positioning.
 * Shows real-time position tracking, offset calculations, and state visualization.
 */
export function AnchorPositionDebugger({
  enabled = true,
  showGrid = true,
  showRulers = true,
  showConnections = true,
  showOffsetCalculations = true,
  opacity = 0.9,
}: DebugOverlayProps) {
  if (!enabled) return null
  
  const context = useStackContextOptional()
  const positionCalculator = usePositionCalculator()
  const positions = usePositionTracker()
  
  // Use default values if context is not available
  const activePath = context?.activePath || []
  const styleConfig = context?.styleConfig || { 
    peekOffset: 8, 
    childGap: 12,
    gap: 'md' as const,
    size: 'md' as const,
    roundness: 'xl' as const,
    anchoredOpacity: 0.6,
    offsetTarget: 'incoming' as const,
    expandedVariant: 'shine' as const,
    childVariant: 'tertiary' as const,
    selectedVariant: 'primary' as const,
    anchoredVariant: 'secondary' as const,
    collapsedVariant: 'tertiary' as const,
  }
  
  // Calculate anchor stack
  const anchorStack = React.useMemo(() => {
    const stack: ButtonPosition[] = []
    
    // Build anchor stack from active path
    activePath.forEach((id, index) => {
      const pos = positions.get(id)
      if (pos && index < activePath.length - 1) {
        // This item has a child selected, so it's anchored
        stack.push({ ...pos, anchorIndex: index })
      }
    })
    
    return stack
  }, [activePath, positions])
  
  // Get active (non-anchored) items
  const activeItems = React.useMemo(() => {
    const items: ButtonPosition[] = []
    
    positions.forEach((pos) => {
      if (!pos.isAnchored && pos.state !== ButtonState.COLLAPSED) {
        items.push(pos)
      }
    })
    
    return items
  }, [positions])
  
  // ============================================================================
  // RENDER HELPERS
  // ============================================================================
  
  const renderGrid = () => {
    if (!showGrid) return null
    
    const gridSize = Math.abs(styleConfig.peekOffset) || 8
    const lines = []
    
    // Vertical lines at peek offset intervals
    for (let i = 0; i < 20; i++) {
      const x = i * gridSize
      lines.push(
        <line
          key={`v-${i}`}
          x1={x}
          y1="0"
          x2={x}
          y2="100%"
          stroke="rgb(59, 130, 246)"
          strokeOpacity="0.1"
          strokeWidth="1"
          strokeDasharray={i % 5 === 0 ? '0' : '2 4'}
        />
      )
    }
    
    return lines
  }
  
  const renderRulers = () => {
    if (!showRulers) return null
    
    return (
      <>
        {/* Horizontal ruler showing offsets */}
        <div className="fixed top-20 left-0 right-0 h-8 bg-black/20 backdrop-blur-sm z-[10000] pointer-events-none">
          <div className="relative h-full">
            {anchorStack.map((item, index) => {
              const offset = (item.anchorIndex! + 1) * styleConfig.peekOffset
              return (
                <div
                  key={item.id}
                  className="absolute top-0 h-full flex items-center"
                  style={{ left: `${offset}px` }}
                >
                  <div className="w-px h-full bg-yellow-500/50" />
                  <div className="ml-1 px-1 py-0.5 bg-yellow-500/20 rounded text-xs font-mono text-yellow-300">
                    {offset}px
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
  
  const renderConnections = () => {
    if (!showConnections) return null
    
    const connections: React.ReactNode[] = []
    
    // Draw connections between anchored items
    anchorStack.forEach((item, index) => {
      if (index > 0) {
        const prevItem = anchorStack[index - 1]
        connections.push(
          <line
            key={`${prevItem.id}-${item.id}`}
            x1={prevItem.position.x + 50}
            y1={prevItem.position.y + 20}
            x2={item.position.x}
            y2={item.position.y + 20}
            stroke="rgb(234, 179, 8)"
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        )
      }
    })
    
    return connections
  }
  
  const renderOffsetCalculations = () => {
    if (!showOffsetCalculations) return null
    
    return (
      <div className="fixed top-32 left-4 z-[10001] pointer-events-none">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-white/20">
          <div className="flex items-center gap-2 mb-2">
            <HugeIcon icon={RulerIcon} size={14} className="text-blue-400" />
            <span className="text-xs font-semibold text-white">Offset Calculations</span>
          </div>
          
          {/* Active Path */}
          <div className="mb-2">
            <div className="text-xs text-gray-400 mb-1">Active Path:</div>
            <div className="flex items-center gap-1 text-xs font-mono text-blue-300">
              {activePath.length > 0 ? activePath.join(' → ') : 'None'}
            </div>
          </div>
          
          {/* Anchor Stack */}
          <div className="mb-2">
            <div className="text-xs text-gray-400 mb-1">Anchor Stack ({anchorStack.length}):</div>
            <div className="space-y-1">
              {anchorStack.map((item, index) => (
                <div key={item.id} className="flex items-center gap-2 text-xs">
                  <span className="text-yellow-400 font-mono">{index}:</span>
                  <span className="text-white">{item.label}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-green-400 font-mono">
                    {(index + 1) * styleConfig.peekOffset}px
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Expected Child Position */}
          <div>
            <div className="text-xs text-gray-400 mb-1">Expected Child Offset:</div>
            <div className="text-xs font-mono text-green-400">
              {anchorStack.length * styleConfig.peekOffset}px
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  const renderPositionOverlays = () => {
    const overlays: React.ReactNode[] = []
    
    positions.forEach((pos) => {
      const isInActivePath = activePath.includes(pos.id)
      const color = pos.isAnchored 
        ? 'bg-yellow-500' 
        : isInActivePath 
          ? 'bg-green-500' 
          : 'bg-blue-500'
      
      overlays.push(
        <div
          key={pos.id}
          className="absolute pointer-events-none"
          style={{
            left: `${pos.position.x}px`,
            top: `${pos.position.y}px`,
            zIndex: 10002,
          }}
        >
          {/* Position marker */}
          <div className={cn('w-2 h-2 rounded-full', color)} style={{ opacity }} />
          
          {/* Label */}
          <div className="absolute -top-5 left-2 whitespace-nowrap">
            <div className="px-1 py-0.5 bg-black/80 rounded text-xs font-mono text-white">
              {pos.label}
              <span className="ml-1 text-gray-400">L{pos.level}</span>
              {pos.offset.x !== 0 && (
                <span className="ml-1 text-green-400">+{pos.offset.x}px</span>
              )}
            </div>
          </div>
          
          {/* State indicator */}
          <div className="absolute top-5 left-2">
            <div className="px-1 py-0.5 bg-black/60 rounded text-xs text-gray-300">
              {pos.state}
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
      {/* SVG Overlay for grid and connections */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-[9998]"
        style={{ opacity: opacity * 0.5 }}
      >
        {renderGrid()}
        {renderConnections()}
      </svg>
      
      {/* Rulers */}
      {renderRulers()}
      
      {/* Offset Calculations Panel */}
      {renderOffsetCalculations()}
      
      {/* Position Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[10002]">
        {renderPositionOverlays()}
      </div>
      
      {/* Legend */}
      <div className="fixed bottom-4 right-[360px] z-[10001] pointer-events-none">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 border border-white/20">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-white">Anchored</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-white">Active</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-white">Child</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// ============================================================================
// MINI POSITION TRACKER
// ============================================================================

/**
 * Compact position tracker showing just the anchor count and offset.
 */
export function MiniPositionTracker() {
  const context = useStackContextOptional()
  const activePath = context?.activePath || []
  const styleConfig = context?.styleConfig || { peekOffset: 8 }
  const anchorCount = Math.max(0, activePath.length - 1)
  const expectedChildOffset = anchorCount * styleConfig.peekOffset
  
  return (
    <div className="fixed top-4 right-[360px] z-[10001]">
      <div className="bg-black/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <HugeIcon icon={Layers01Icon} size={12} className="text-yellow-400" />
            <span className="text-white font-mono">{anchorCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <HugeIcon icon={Target01Icon} size={12} className="text-green-400" />
            <span className="text-white font-mono">{expectedChildOffset}px</span>
          </div>
        </div>
      </div>
    </div>
  )
}