/**
 * Visual Debug Overlay for Button Animation V3
 * 
 * Provides real-time visual debugging of button positions
 */

'use client'

import { useEffect, useState } from 'react'
import { useStackContext } from '../context'

interface ButtonPosition {
  id: string
  level: number
  left: number
  top: number
  width: number
  height: number
  isAnchored: boolean
  isActive: boolean
  zIndex: number
}

export function PositionDebugOverlay() {
  const { activePath, showDebug } = useStackContext()
  const [positions, setPositions] = useState<ButtonPosition[]>([])
  const [overlaps, setOverlaps] = useState<string[][]>([])
  
  useEffect(() => {
    if (!showDebug) return
    
    // Scan all button elements and extract position data
    const scanPositions = () => {
      const buttons: ButtonPosition[] = []
      
      // Find all animated items
      document.querySelectorAll('[data-button-id]').forEach((element) => {
        const rect = element.getBoundingClientRect()
        const computedStyle = window.getComputedStyle(element)
        const parentElement = element.parentElement as HTMLElement
        
        buttons.push({
          id: element.getAttribute('data-button-id') || 'unknown',
          level: parseInt(element.getAttribute('data-level') || '0'),
          left: parentElement?.offsetLeft || 0,
          top: parentElement?.offsetTop || 0,
          width: rect.width,
          height: rect.height,
          isAnchored: element.getAttribute('data-anchored') === 'true',
          isActive: element.getAttribute('data-active') === 'true',
          zIndex: parseInt(computedStyle.zIndex || '0')
        })
      })
      
      setPositions(buttons)
      
      // Check for overlaps
      const foundOverlaps: string[][] = []
      buttons.forEach((btn1, i) => {
        buttons.forEach((btn2, j) => {
          if (i < j && btn1.isAnchored && btn2.isAnchored) {
            // Check if buttons overlap
            if (Math.abs(btn1.left - btn2.left) < 5) {
              foundOverlaps.push([btn1.id, btn2.id])
            }
          }
        })
      })
      
      setOverlaps(foundOverlaps)
    }
    
    // Initial scan
    scanPositions()
    
    // Rescan on animation frame
    const interval = setInterval(scanPositions, 100)
    
    return () => clearInterval(interval)
  }, [activePath, showDebug])
  
  if (!showDebug) return null
  
  return (
    <>
      {/* Position Grid */}
      <div className="fixed top-20 right-4 z-[9999] bg-black/90 text-white p-4 rounded-lg max-w-sm text-xs font-mono">
        <h3 className="font-bold mb-2 text-yellow-400">Button Positions</h3>
        
        {/* Active Path */}
        <div className="mb-3 pb-2 border-b border-white/20">
          <div className="text-gray-400">Active Path:</div>
          <div className="text-green-400">
            {activePath.length > 0 ? activePath.join(' → ') : 'None'}
          </div>
        </div>
        
        {/* Position Table */}
        <table className="w-full text-[10px]">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left">Button</th>
              <th className="text-right">Level</th>
              <th className="text-right">Left</th>
              <th className="text-right">Z</th>
              <th className="text-center">State</th>
            </tr>
          </thead>
          <tbody>
            {positions
              .sort((a, b) => a.level - b.level || a.left - b.left)
              .map((pos) => (
                <tr 
                  key={pos.id}
                  className={`
                    ${pos.isAnchored ? 'text-blue-400' : ''}
                    ${pos.isActive && !pos.isAnchored ? 'text-green-400' : ''}
                    ${!pos.isActive && !pos.isAnchored ? 'text-gray-400' : ''}
                  `}
                >
                  <td>{pos.id}</td>
                  <td className="text-right">{pos.level}</td>
                  <td className="text-right">{pos.left}px</td>
                  <td className="text-right">{pos.zIndex}</td>
                  <td className="text-center">
                    {pos.isAnchored ? 'A' : pos.isActive ? 'ACT' : 'C'}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        
        {/* Overlap Warnings */}
        {overlaps.length > 0 && (
          <div className="mt-3 pt-2 border-t border-white/20">
            <div className="text-red-400 font-bold">⚠️ Overlaps Detected:</div>
            {overlaps.map((pair, i) => (
              <div key={i} className="text-red-300">
                {pair[0]} ↔ {pair[1]}
              </div>
            ))}
          </div>
        )}
        
        {/* Stats */}
        <div className="mt-3 pt-2 border-t border-white/20 text-gray-400">
          <div>Total Buttons: {positions.length}</div>
          <div>Anchored: {positions.filter(p => p.isAnchored).length}</div>
          <div>Active: {positions.filter(p => p.isActive).length}</div>
        </div>
      </div>
      
      {/* Visual Rulers */}
      <svg 
        className="fixed inset-0 z-[9998] pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Draw position lines for each anchored button */}
        {positions
          .filter(p => p.isAnchored)
          .map((pos, i) => (
            <g key={pos.id}>
              {/* Vertical line at button position */}
              <line
                x1={pos.left}
                y1={0}
                x2={pos.left}
                y2="100%"
                stroke="blue"
                strokeWidth="1"
                strokeDasharray="2,2"
                opacity="0.3"
              />
              {/* Position label */}
              <text
                x={pos.left + 2}
                y={20 + i * 15}
                fill="blue"
                fontSize="10"
                fontFamily="monospace"
              >
                {pos.id}: {pos.left}px
              </text>
            </g>
          ))}
        
        {/* Expected positions based on depth */}
        {activePath.map((_, depth) => {
          const expectedOffset = 8 * depth // Assuming 8px peek offset
          return (
            <line
              key={`expected-${depth}`}
              x1={expectedOffset}
              y1={0}
              x2={expectedOffset}
              y2="100%"
              stroke="green"
              strokeWidth="1"
              strokeDasharray="5,5"
              opacity="0.2"
            />
          )
        })}
      </svg>
      
      {/* Offset Calculator */}
      <div className="fixed bottom-4 right-4 z-[9999] bg-black/90 text-white p-3 rounded-lg text-xs font-mono">
        <h3 className="font-bold mb-2 text-yellow-400">Offset Calculator</h3>
        <div className="space-y-1">
          {activePath.map((id, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-400">Level {index} ({id}):</span>
              <span className="text-blue-400">{8 * index}px</span>
            </div>
          ))}
          {activePath.length > 0 && (
            <div className="border-t border-white/20 pt-1 mt-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Active offset:</span>
                <span className="text-green-400">{8 * activePath.length}px</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}