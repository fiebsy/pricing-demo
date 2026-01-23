/**
 * BentoProfileLayout Component
 *
 * CSS Grid orchestrator for the Bento-style profile layout.
 * - Left panel: Profile info (fixed, sticky)
 * - Right panel: Scrollable Bento grid of question cards
 *
 * Emulates the bento.me style with generous spacing and clean aesthetics.
 *
 * @module b/profile-v2/components/layout
 */

'use client'

import * as React from 'react'
import { useState, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import { LAYOUT_CONFIG } from '../../config'
import type { BentoProfileLayoutProps } from '../../types'

// =============================================================================
// DRAGGABLE SECTION COMPONENT
// =============================================================================

type SectionId = 'avatar' | 'name' | 'role' | 'bio' | 'overallScore' | 'subScores' | 'video' | 'questions'

interface DraggableSectionProps {
  id: SectionId
  label: string
  children: React.ReactNode
  position: { x: number; y: number }
  onPositionChange: (id: SectionId, pos: { x: number; y: number }) => void
  className?: string
}

function DraggableSection({
  id,
  label,
  children,
  position,
  onPositionChange,
  className,
}: DraggableSectionProps) {
  const [isDragging, setIsDragging] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDragging(true)
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }

    const handleMouseMove = (e: MouseEvent) => {
      onPositionChange(id, {
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      console.log(`${label} position: { x: ${position.x}, y: ${position.y} }`)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [id, label, position, onPositionChange])

  return (
    <div
      className={cn(
        'fixed z-50 cursor-grab',
        isDragging && 'cursor-grabbing',
        className
      )}
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  )
}

// =============================================================================
// RESIZABLE SECTION COMPONENT (for video)
// =============================================================================

interface ResizableSectionProps {
  id: SectionId
  label: string
  children: React.ReactNode
  position: { x: number; y: number }
  size: { width: number; height: number }
  aspectRatio?: number // width / height ratio to lock
  onPositionChange: (id: SectionId, pos: { x: number; y: number }) => void
  onSizeChange: (id: SectionId, size: { width: number; height: number }) => void
  className?: string
}

function ResizableSection({
  id,
  label,
  children,
  position,
  size,
  aspectRatio,
  onPositionChange,
  onSizeChange,
  className,
}: ResizableSectionProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ width: 0, height: 0, mouseX: 0, mouseY: 0 })

  // Drag handling
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isResizing) return
    e.stopPropagation()
    setIsDragging(true)
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }

    const handleMouseMove = (e: MouseEvent) => {
      onPositionChange(id, {
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [id, position, onPositionChange, isResizing])

  // Resize handling with optional aspect ratio lock
  const handleResizeMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResizing(true)
    resizeStart.current = {
      width: size.width,
      height: size.height,
      mouseX: e.clientX,
      mouseY: e.clientY,
    }

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStart.current.mouseX
      const deltaY = e.clientY - resizeStart.current.mouseY

      if (aspectRatio) {
        // Lock aspect ratio - use the larger delta to drive the resize
        const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY * aspectRatio
        const newWidth = Math.max(200, resizeStart.current.width + delta)
        const newHeight = newWidth / aspectRatio
        onSizeChange(id, { width: newWidth, height: newHeight })
      } else {
        onSizeChange(id, {
          width: Math.max(200, resizeStart.current.width + deltaX),
          height: Math.max(150, resizeStart.current.height + deltaY),
        })
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      console.log(`${label} size: { width: ${size.width}, height: ${size.height} }`)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [id, label, size, aspectRatio, onSizeChange])

  return (
    <div
      className={cn(
        'fixed z-50',
        isDragging ? 'cursor-grabbing' : 'cursor-grab',
        className
      )}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="relative w-full h-full overflow-hidden rounded-3xl">
        {children}
      </div>

      {/* Resize handle - bottom right corner */}
      <div
        className={cn(
          'absolute bottom-0 right-0 w-6 h-6 cursor-se-resize',
          'flex items-center justify-center',
          'bg-white/20 hover:bg-white/40 rounded-tl-lg rounded-br-3xl',
          'transition-colors'
        )}
        onMouseDown={handleResizeMouseDown}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" className="text-white/60">
          <path d="M9 1L1 9M9 5L5 9M9 9L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

// =============================================================================
// COMPONENT
// =============================================================================

// Extended props for granular positioning
interface ExtendedLayoutProps extends BentoProfileLayoutProps {
  // Separated profile components
  avatar?: React.ReactNode
  name?: React.ReactNode
  role?: React.ReactNode
  bio?: React.ReactNode
  // Separated score components
  overallScore?: React.ReactNode
  subScores?: React.ReactNode
  // Video render prop for resizable support
  videoRender?: (size: { width: number; height: number }) => React.ReactNode
}

export function BentoProfileLayout({
  leftPanel,
  rightPanel,
  bottomLeftPanel,
  video,
  questions,
  footer,
  // New granular props
  avatar,
  name,
  role,
  bio,
  overallScore,
  subScores,
  videoRender,
  className,
}: ExtendedLayoutProps) {
  // Positions for all draggable sections
  const [positions, setPositions] = useState<Record<SectionId, { x: number; y: number }>>({
    avatar: { x: 60, y: 80 },
    name: { x: 60, y: 180 },
    role: { x: 60, y: 240 },
    bio: { x: 60, y: 290 },
    overallScore: { x: 60, y: 380 },
    subScores: { x: 60, y: 480 },
    video: { x: 400, y: 80 },
    questions: { x: 400, y: 500 },
  })

  // Sizes for resizable sections
  const [sizes, setSizes] = useState<Record<string, { width: number; height: number }>>({
    video: { width: 400, height: 360 },
  })

  const handlePositionChange = useCallback((id: SectionId, pos: { x: number; y: number }) => {
    setPositions(prev => ({ ...prev, [id]: pos }))
  }, [])

  const handleSizeChange = useCallback((id: SectionId, size: { width: number; height: number }) => {
    setSizes(prev => ({ ...prev, [id]: size }))
  }, [])

  // Log all positions and sizes
  const logAllPositions = useCallback(() => {
    console.log('All positions:', JSON.stringify(positions, null, 2))
    console.log('All sizes:', JSON.stringify(sizes, null, 2))
  }, [positions, sizes])

  return (
    <div
      className={cn(
        'min-h-screen bg-black relative overflow-hidden',
        className
      )}
      style={{
        paddingBottom: `${LAYOUT_CONFIG.bottomPadding}px`,
      }}
    >
      {/* Log button */}
      <button
        onClick={logAllPositions}
        className="fixed top-4 right-4 z-[100] px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono rounded-lg"
      >
        Log All Positions
      </button>

      {/* Avatar Section */}
      {avatar && (
        <DraggableSection
          id="avatar"
          label="Avatar"
          position={positions.avatar}
          onPositionChange={handlePositionChange}
        >
          {avatar}
        </DraggableSection>
      )}

      {/* Name Section */}
      {name && (
        <DraggableSection
          id="name"
          label="Name"
          position={positions.name}
          onPositionChange={handlePositionChange}
          className="w-[280px]"
        >
          {name}
        </DraggableSection>
      )}

      {/* Role Section */}
      {role && (
        <DraggableSection
          id="role"
          label="Role"
          position={positions.role}
          onPositionChange={handlePositionChange}
          className="w-[280px]"
        >
          {role}
        </DraggableSection>
      )}

      {/* Bio Section */}
      {bio && (
        <DraggableSection
          id="bio"
          label="Bio"
          position={positions.bio}
          onPositionChange={handlePositionChange}
          className="w-[280px]"
        >
          {bio}
        </DraggableSection>
      )}

      {/* Overall Score Section */}
      {overallScore && (
        <DraggableSection
          id="overallScore"
          label="Overall Score"
          position={positions.overallScore}
          onPositionChange={handlePositionChange}
          className="w-[280px]"
        >
          {overallScore}
        </DraggableSection>
      )}

      {/* Sub-Scores Section */}
      {subScores && (
        <DraggableSection
          id="subScores"
          label="Sub-Scores"
          position={positions.subScores}
          onPositionChange={handlePositionChange}
          className="w-[280px]"
        >
          {subScores}
        </DraggableSection>
      )}

      {/* Legacy: Profile Section (fallback if granular props not used) */}
      {!avatar && !name && !role && !bio && leftPanel && (
        <DraggableSection
          id="avatar"
          label="Profile"
          position={positions.avatar}
          onPositionChange={handlePositionChange}
          className="w-[280px]"
        >
          {leftPanel}
        </DraggableSection>
      )}

      {/* Legacy: Edit Panel Section (fallback if granular props not used) */}
      {!overallScore && !subScores && bottomLeftPanel && (
        <DraggableSection
          id="overallScore"
          label="Edit Panel"
          position={positions.overallScore}
          onPositionChange={handlePositionChange}
          className="w-[280px]"
        >
          {bottomLeftPanel}
        </DraggableSection>
      )}

      {/* Video Section (Resizable) */}
      {videoRender ? (
        <ResizableSection
          id="video"
          label="Video"
          position={positions.video}
          size={sizes.video}
          onPositionChange={handlePositionChange}
          onSizeChange={handleSizeChange}
        >
          {videoRender(sizes.video)}
        </ResizableSection>
      ) : video ? (
        <ResizableSection
          id="video"
          label="Video"
          position={positions.video}
          size={sizes.video}
          onPositionChange={handlePositionChange}
          onSizeChange={handleSizeChange}
        >
          {video}
        </ResizableSection>
      ) : rightPanel ? (
        /* Fallback: use rightPanel which contains both video and questions */
        <DraggableSection
          id="video"
          label="Content"
          position={positions.video}
          onPositionChange={handlePositionChange}
          className="w-[500px]"
        >
          {rightPanel}
        </DraggableSection>
      ) : null}

      {/* Questions Section */}
      {questions && (
        <DraggableSection
          id="questions"
          label="Questions"
          position={positions.questions}
          onPositionChange={handlePositionChange}
          className="w-[500px]"
        >
          {questions}
        </DraggableSection>
      )}

      {/* Footer (Chat Overlay) */}
      {footer}
    </div>
  )
}
