/**
 * AddToMindSheet - Content upload flow sheet
 *
 * Allows users to upload files, links, or text to improve their profile.
 * Supports both generic and category-aware variants.
 *
 * @module playground/quick-fix-modal/flows
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { HugeIcon } from '@/components/ui/prod/base/icon'
import { Button } from '@/components/ui/prod/base/button'
import FolderUploadIcon from '@hugeicons-pro/core-stroke-rounded/FolderUploadIcon'
import Link01Icon from '@hugeicons-pro/core-stroke-rounded/Link01Icon'
import TextIcon from '@hugeicons-pro/core-stroke-rounded/TextIcon'
import Delete01Icon from '@hugeicons-pro/core-stroke-rounded/Delete01Icon'
import type { SheetContentProps } from '../config/types'

// =============================================================================
// TYPES
// =============================================================================

interface MindContent {
  id: string
  type: 'file' | 'link' | 'text'
  name: string
  url?: string
  content?: string
}

export interface AddToMindSheetProps extends SheetContentProps {
  /** Variant: 'generic' or 'category-aware' */
  variant?: 'generic' | 'category-aware'
  /** Category name for category-aware variant */
  categoryName?: string
  /** Callback when content is added */
  onContentAdded?: (content: MindContent[]) => void
  /** Additional className */
  className?: string
}

// =============================================================================
// UPLOAD OPTION COMPONENT
// =============================================================================

interface UploadOptionProps {
  icon: typeof FolderUploadIcon
  label: string
  description: string
  onClick: () => void
  config: SheetContentProps['config']['flowOptions']
}

function UploadOption({ icon, label, description, onClick, config }: UploadOptionProps) {
  const shineClass = config.shine !== 'none'
    ? `${config.shine}${config.shineIntensity}`
    : ''
  const cornerClass = config.cornerShape === 'squircle' ? 'corner-squircle' : ''

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full p-4 text-left',
        'bg-secondary border border-primary',
        'hover:bg-tertiary hover:border-secondary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
        'motion-safe:transition-all motion-safe:duration-150',
        shineClass,
        cornerClass
      )}
      style={{ borderRadius: config.cardBorderRadius }}
    >
      <div className="flex items-center gap-3">
        <div
          className="rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0"
          style={{
            width: config.iconCircleSize,
            height: config.iconCircleSize,
          }}
        >
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
// CONTENT ITEM COMPONENT
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
    <div className="flex items-center justify-between p-3 rounded-lg bg-secondary border border-primary">
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

/**
 * AddToMindSheet Component
 *
 * Sheet content for uploading content to improve profile.
 */
export function AddToMindSheet({
  onNavigate,
  onComplete,
  onClose,
  config,
  variant = 'generic',
  categoryName = '',
  onContentAdded,
  className,
}: AddToMindSheetProps) {
  const [content, setContent] = React.useState<MindContent[]>([])
  const [showLinkInput, setShowLinkInput] = React.useState(false)
  const [showTextInput, setShowTextInput] = React.useState(false)
  const [linkValue, setLinkValue] = React.useState('')
  const [textValue, setTextValue] = React.useState('')

  // Generate unique ID
  const generateId = () => `mc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Handle file upload (simulated)
  const handleFileUpload = React.useCallback(() => {
    const fileName = `Document_${content.length + 1}.pdf`
    setContent((prev) => [
      ...prev,
      { id: generateId(), type: 'file', name: fileName },
    ])
  }, [content.length])

  // Handle link addition
  const handleAddLink = React.useCallback(() => {
    if (!linkValue.trim()) return
    setContent((prev) => [
      ...prev,
      { id: generateId(), type: 'link', name: linkValue, url: linkValue },
    ])
    setLinkValue('')
    setShowLinkInput(false)
  }, [linkValue])

  // Handle text addition
  const handleAddText = React.useCallback(() => {
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
  const handleRemove = React.useCallback((id: string) => {
    setContent((prev) => prev.filter((c) => c.id !== id))
  }, [])

  // Handle complete
  const handleComplete = React.useCallback(() => {
    onContentAdded?.(content)
    onComplete()
  }, [content, onContentAdded, onComplete])

  const cornerClass = config.flowOptions.cornerShape === 'squircle' ? 'corner-squircle' : ''

  return (
    <div className={cn('flex flex-col p-6', className)}>
      {/* Header */}
      <h3 className="text-lg font-semibold text-primary mb-2">
        {variant === 'category-aware' && categoryName
          ? `Add to ${categoryName}`
          : 'Add to Mind'}
      </h3>
      <p className="text-sm text-tertiary mb-6">
        {variant === 'category-aware'
          ? 'Upload content ranked by impact score.'
          : 'Upload files, links, or text that contains relevant information.'}
      </p>

      {/* Upload options */}
      <div className="space-y-3 mb-6">
        <UploadOption
          icon={FolderUploadIcon}
          label="Upload File"
          description="PDF, DOC, TXT, or images"
          onClick={handleFileUpload}
          config={config.flowOptions}
        />
        <UploadOption
          icon={Link01Icon}
          label="Add Link"
          description="Paste a URL to web content"
          onClick={() => setShowLinkInput(true)}
          config={config.flowOptions}
        />
        <UploadOption
          icon={TextIcon}
          label="Add Text"
          description="Type or paste text directly"
          onClick={() => setShowTextInput(true)}
          config={config.flowOptions}
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
      <Button
        variant="primary"
        size="lg"
        roundness={config.flowOptions.cornerShape === 'squircle' ? 'squircle' : 'default'}
        onClick={handleComplete}
        disabled={content.length === 0}
        className="w-full"
      >
        {content.length === 0
          ? 'Add content to continue'
          : `Process ${content.length} item${content.length === 1 ? '' : 's'}`}
      </Button>
    </div>
  )
}

// =============================================================================
// SHEET DEFINITION FACTORY
// =============================================================================

/**
 * Create an AddToMindSheet definition for use with SheetStack.
 */
export function createAddToMindSheet(
  variant: 'generic' | 'category-aware' = 'generic',
  categoryName?: string,
  title = 'Add to Mind'
) {
  return {
    id: 'add-to-mind',
    title,
    component: AddToMindSheet,
    componentProps: { variant, categoryName },
    canPop: true,
  }
}
