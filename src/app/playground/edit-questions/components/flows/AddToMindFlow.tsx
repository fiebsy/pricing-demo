/**
 * AddToMindFlow - Content upload flow
 *
 * Allows users to upload files or links with relevant information
 * to help improve the answer.
 *
 * @module playground/edit-questions/components
 */

'use client'

import * as React from 'react'
import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import FolderUploadIcon from '@hugeicons-pro/core-stroke-rounded/FolderUploadIcon'
import Link01Icon from '@hugeicons-pro/core-stroke-rounded/Link01Icon'
import TextIcon from '@hugeicons-pro/core-stroke-rounded/TextIcon'
import Delete01Icon from '@hugeicons-pro/core-stroke-rounded/Delete01Icon'
import type { MindContent } from '../../types'

// =============================================================================
// TYPES
// =============================================================================

export interface AddToMindFlowProps {
  onComplete: (content: MindContent[]) => void
  className?: string
}

// =============================================================================
// UPLOAD OPTION
// =============================================================================

interface UploadOptionProps {
  icon: typeof FolderUploadIcon
  label: string
  description: string
  onClick: () => void
}

function UploadOption({ icon, label, description, onClick }: UploadOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full p-4 rounded-xl text-left',
        'bg-secondary border border-primary',
        'hover:bg-tertiary hover:border-secondary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
        'motion-safe:transition-all motion-safe:duration-150'
      )}
    >
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
          <HugeIcon icon={icon} size="sm" color="brand" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-primary">{label}</h4>
          <p className="text-xs text-tertiary">{description}</p>
        </div>
      </div>
    </button>
  )
}

// =============================================================================
// CONTENT ITEM
// =============================================================================

interface ContentItemProps {
  content: MindContent
  onRemove: () => void
}

function ContentItem({ content, onRemove }: ContentItemProps) {
  const getIcon = () => {
    switch (content.type) {
      case 'file':
        return FolderUploadIcon
      case 'link':
        return Link01Icon
      case 'text':
        return TextIcon
    }
  }

  return (
    <div
      className={cn(
        'flex items-center justify-between p-3 rounded-lg',
        'bg-secondary border border-primary'
      )}
    >
      <div className="flex items-center gap-3">
        <HugeIcon icon={getIcon()} size="sm" color="tertiary" />
        <span className="text-sm text-primary">{content.name}</span>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className={cn(
          'p-1.5 rounded-md',
          'text-tertiary hover:text-error-primary',
          'hover:bg-error-primary/10',
          'motion-safe:transition-colors motion-safe:duration-150'
        )}
      >
        <HugeIcon icon={Delete01Icon} size="xs" color="current" />
      </button>
    </div>
  )
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function AddToMindFlow({ onComplete, className }: AddToMindFlowProps) {
  const [content, setContent] = useState<MindContent[]>([])
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [showTextInput, setShowTextInput] = useState(false)
  const [linkValue, setLinkValue] = useState('')
  const [textValue, setTextValue] = useState('')

  // Generate unique ID
  const generateId = () => `mc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Handle file upload (simulated)
  const handleFileUpload = useCallback(() => {
    // Simulate file selection
    const fileName = `Document_${content.length + 1}.pdf`
    setContent((prev) => [
      ...prev,
      { id: generateId(), type: 'file', name: fileName },
    ])
  }, [content.length])

  // Handle link addition
  const handleAddLink = useCallback(() => {
    if (!linkValue.trim()) return
    setContent((prev) => [
      ...prev,
      { id: generateId(), type: 'link', name: linkValue, url: linkValue },
    ])
    setLinkValue('')
    setShowLinkInput(false)
  }, [linkValue])

  // Handle text addition
  const handleAddText = useCallback(() => {
    if (!textValue.trim()) return
    const preview = textValue.slice(0, 30) + (textValue.length > 30 ? '...' : '')
    setContent((prev) => [
      ...prev,
      { id: generateId(), type: 'text', name: preview, content: textValue },
    ])
    setTextValue('')
    setShowTextInput(false)
  }, [textValue])

  // Handle remove content
  const handleRemove = useCallback((id: string) => {
    setContent((prev) => prev.filter((c) => c.id !== id))
  }, [])

  // Handle complete
  const handleComplete = useCallback(() => {
    onComplete(content)
  }, [content, onComplete])

  return (
    <div className={cn('flex flex-col', className)}>
      <h3 className="text-lg font-semibold text-primary mb-2">Add to Mind</h3>
      <p className="text-sm text-tertiary mb-6">
        Upload files, links, or text that contains relevant information.
      </p>

      {/* Upload options */}
      <div className="space-y-3 mb-6">
        <UploadOption
          icon={FolderUploadIcon}
          label="Upload File"
          description="PDF, DOC, TXT, or images"
          onClick={handleFileUpload}
        />
        <UploadOption
          icon={Link01Icon}
          label="Add Link"
          description="Paste a URL to web content"
          onClick={() => setShowLinkInput(true)}
        />
        <UploadOption
          icon={TextIcon}
          label="Add Text"
          description="Type or paste text directly"
          onClick={() => setShowTextInput(true)}
        />
      </div>

      {/* Link input */}
      {showLinkInput && (
        <div className="mb-4 p-4 rounded-xl bg-secondary border border-primary">
          <input
            type="url"
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            placeholder="https://..."
            className={cn(
              'w-full px-3 py-2 rounded-lg mb-3',
              'bg-primary border border-primary',
              'text-primary placeholder:text-tertiary',
              'focus:outline-none focus:ring-2 focus:ring-brand-primary'
            )}
            autoFocus
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowLinkInput(false)}
              className="px-3 py-1.5 text-xs font-medium text-tertiary hover:text-primary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddLink}
              disabled={!linkValue.trim()}
              className={cn(
                'px-3 py-1.5 rounded-lg',
                'text-xs font-medium text-white',
                'bg-brand-solid hover:bg-brand-solid-hover',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Text input */}
      {showTextInput && (
        <div className="mb-4 p-4 rounded-xl bg-secondary border border-primary">
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Type or paste your text here..."
            rows={4}
            className={cn(
              'w-full px-3 py-2 rounded-lg mb-3 resize-none',
              'bg-primary border border-primary',
              'text-primary placeholder:text-tertiary',
              'focus:outline-none focus:ring-2 focus:ring-brand-primary'
            )}
            autoFocus
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowTextInput(false)}
              className="px-3 py-1.5 text-xs font-medium text-tertiary hover:text-primary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddText}
              disabled={!textValue.trim()}
              className={cn(
                'px-3 py-1.5 rounded-lg',
                'text-xs font-medium text-white',
                'bg-brand-solid hover:bg-brand-solid-hover',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Added content list */}
      {content.length > 0 && (
        <div className="mb-6">
          <h4 className="text-xs font-medium text-tertiary uppercase tracking-wider mb-3">
            Added Content ({content.length})
          </h4>
          <div className="space-y-2">
            {content.map((item) => (
              <ContentItem
                key={item.id}
                content={item}
                onRemove={() => handleRemove(item.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Complete button */}
      <button
        type="button"
        onClick={handleComplete}
        disabled={content.length === 0}
        className={cn(
          'w-full px-4 py-3 rounded-xl',
          'text-sm font-medium text-white',
          'bg-brand-solid hover:bg-brand-solid-hover',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'motion-safe:transition-colors motion-safe:duration-150'
        )}
      >
        {content.length === 0 ? 'Add content to continue' : `Process ${content.length} item${content.length === 1 ? '' : 's'}`}
      </button>
    </div>
  )
}
