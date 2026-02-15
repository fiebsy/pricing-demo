'use client'

import { useState } from 'react'
import { Reorder, useDragControls } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { NavConfig } from './types'

// Nav item metadata for built-in items
const NAV_ITEM_LABELS: Record<string, string> = {
  overview: 'Overview',
  sales: 'Sales',
  orders: 'Orders',
  products: 'Products',
  payouts: 'Payouts',
  payments: 'Payments',
  collections: 'Collections',
  risk: 'Risk',
  documents: 'Documents',
  team: 'Team',
  agreements: 'Agreements',
  webhooks: 'Webhooks',
}

// Visibility key mapping for built-in items
type NavVisibilityKey =
  | 'showOverviewNav'
  | 'showSales'
  | 'showOrders'
  | 'showProducts'
  | 'showPayouts'
  | 'showPayments'
  | 'showCollections'
  | 'showRisk'
  | 'showDocuments'
  | 'showTeam'
  | 'showAgreements'
  | 'showWebhooks'

const NAV_VISIBILITY_MAP: Record<string, NavVisibilityKey> = {
  overview: 'showOverviewNav',
  sales: 'showSales',
  orders: 'showOrders',
  products: 'showProducts',
  payouts: 'showPayouts',
  payments: 'showPayments',
  collections: 'showCollections',
  risk: 'showRisk',
  documents: 'showDocuments',
  team: 'showTeam',
  agreements: 'showAgreements',
  webhooks: 'showWebhooks',
}

interface ReorderableNavItemsProps {
  config: NavConfig
  onOrderChange: (newOrder: string[]) => void
  onVisibilityChange: (itemId: string, visible: boolean) => void
  onAddCustomItem: (label: string) => void
  onUpdateCustomItem: (itemId: string, label: string) => void
  onRemoveCustomItem: (itemId: string) => void
  onToggleCustomItem: (itemId: string, visible: boolean) => void
  onSaveAsPreset: (name: string) => void
}

interface DraggableItemProps {
  itemId: string
  label: string
  isVisible: boolean
  isCustom?: boolean
  onVisibilityChange: (visible: boolean) => void
  onLabelChange?: (label: string) => void
  onRemove?: () => void
}

function DraggableItem({
  itemId,
  label,
  isVisible,
  isCustom,
  onVisibilityChange,
  onLabelChange,
  onRemove,
}: DraggableItemProps) {
  const dragControls = useDragControls()
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(label)

  const handleSaveEdit = () => {
    if (editValue.trim() && onLabelChange) {
      onLabelChange(editValue.trim())
    }
    setIsEditing(false)
  }

  return (
    <Reorder.Item
      value={itemId}
      dragListener={false}
      dragControls={dragControls}
      className={cn(
        'flex items-center gap-2 px-2 py-1.5 rounded-md',
        'bg-tertiary/50 border border-primary/50',
        'select-none',
        isCustom && 'border-dashed border-fg-brand-primary/30'
      )}
      whileDrag={{
        scale: 1.02,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 50,
      }}
    >
      {/* Drag handle */}
      <button
        type="button"
        onPointerDown={(e) => dragControls.start(e)}
        className="touch-none cursor-grab active:cursor-grabbing p-0.5 -ml-0.5 text-tertiary hover:text-secondary"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <circle cx="3" cy="3" r="1.5" />
          <circle cx="9" cy="3" r="1.5" />
          <circle cx="3" cy="9" r="1.5" />
          <circle cx="9" cy="9" r="1.5" />
        </svg>
      </button>

      {/* Toggle */}
      <button
        type="button"
        onClick={() => onVisibilityChange(!isVisible)}
        className={cn(
          'relative w-7 h-4 rounded-full transition-colors flex-shrink-0',
          isVisible ? 'bg-fg-brand-primary' : 'bg-quaternary'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform',
            isVisible ? 'left-3.5' : 'left-0.5'
          )}
        />
      </button>

      {/* Label */}
      {isCustom && isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSaveEdit()
            if (e.key === 'Escape') {
              setEditValue(label)
              setIsEditing(false)
            }
          }}
          className="text-xs flex-1 bg-transparent border-b border-primary outline-none text-primary"
          autoFocus
        />
      ) : (
        <span
          className={cn(
            'text-xs flex-1',
            isVisible ? 'text-primary' : 'text-tertiary',
            isCustom && 'cursor-text'
          )}
          onClick={() => isCustom && setIsEditing(true)}
        >
          {label}
          {isCustom && (
            <span className="text-tertiary/50 ml-1 text-[10px]">(custom)</span>
          )}
        </span>
      )}

      {/* Remove button for custom items */}
      {isCustom && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="p-0.5 text-tertiary hover:text-error-500 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </button>
      )}
    </Reorder.Item>
  )
}

export function ReorderableNavItems({
  config,
  onOrderChange,
  onVisibilityChange,
  onAddCustomItem,
  onUpdateCustomItem,
  onRemoveCustomItem,
  onToggleCustomItem,
  onSaveAsPreset,
}: ReorderableNavItemsProps) {
  const { navItemOrder, customNavItems } = config
  const [newItemLabel, setNewItemLabel] = useState('')
  const [presetName, setPresetName] = useState('')
  const [showSavePreset, setShowSavePreset] = useState(false)

  // Combine built-in items with custom items for ordering
  const allItemIds = [
    ...navItemOrder,
    ...customNavItems.map((item) => item.id),
  ]

  const handleAddItem = () => {
    if (newItemLabel.trim()) {
      onAddCustomItem(newItemLabel.trim())
      setNewItemLabel('')
    }
  }

  const handleSavePreset = () => {
    if (presetName.trim()) {
      onSaveAsPreset(presetName.trim())
      setPresetName('')
      setShowSavePreset(false)
    }
  }

  return (
    <div className="space-y-2">
      <Reorder.Group
        axis="y"
        values={allItemIds}
        onReorder={onOrderChange}
        className="space-y-1"
      >
        {/* Built-in nav items */}
        {navItemOrder.map((itemId) => {
          const visibilityKey = NAV_VISIBILITY_MAP[itemId]
          const isVisible = visibilityKey ? config[visibilityKey] : false

          return (
            <DraggableItem
              key={itemId}
              itemId={itemId}
              label={NAV_ITEM_LABELS[itemId] || itemId}
              isVisible={isVisible}
              onVisibilityChange={(visible) => onVisibilityChange(itemId, visible)}
            />
          )
        })}

        {/* Custom nav items */}
        {customNavItems.map((item) => (
          <DraggableItem
            key={item.id}
            itemId={item.id}
            label={item.label}
            isVisible={item.visible}
            isCustom
            onVisibilityChange={(visible) => onToggleCustomItem(item.id, visible)}
            onLabelChange={(label) => onUpdateCustomItem(item.id, label)}
            onRemove={() => onRemoveCustomItem(item.id)}
          />
        ))}
      </Reorder.Group>

      {/* Add new item */}
      <div className="flex gap-1 pt-1">
        <input
          type="text"
          value={newItemLabel}
          onChange={(e) => setNewItemLabel(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
          placeholder="New item..."
          className="flex-1 text-xs px-2 py-1 bg-secondary rounded border border-primary/30 outline-none focus:border-fg-brand-primary text-primary placeholder:text-tertiary"
        />
        <button
          type="button"
          onClick={handleAddItem}
          disabled={!newItemLabel.trim()}
          className={cn(
            'px-2 py-1 text-xs rounded transition-colors',
            newItemLabel.trim()
              ? 'bg-fg-brand-primary text-white hover:bg-fg-brand-primary/90'
              : 'bg-quaternary text-tertiary cursor-not-allowed'
          )}
        >
          +
        </button>
      </div>

      {/* Save as preset */}
      <div className="pt-2 border-t border-primary/20">
        {showSavePreset ? (
          <div className="flex gap-1">
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSavePreset()}
              placeholder="Preset name..."
              className="flex-1 text-xs px-2 py-1 bg-secondary rounded border border-primary/30 outline-none focus:border-fg-brand-primary text-primary placeholder:text-tertiary"
              autoFocus
            />
            <button
              type="button"
              onClick={handleSavePreset}
              disabled={!presetName.trim()}
              className={cn(
                'px-2 py-1 text-xs rounded transition-colors',
                presetName.trim()
                  ? 'bg-fg-brand-primary text-white'
                  : 'bg-quaternary text-tertiary cursor-not-allowed'
              )}
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setShowSavePreset(false)
                setPresetName('')
              }}
              className="px-2 py-1 text-xs rounded bg-quaternary text-tertiary hover:text-secondary"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowSavePreset(true)}
            className="w-full text-xs py-1.5 rounded border border-dashed border-primary/30 text-tertiary hover:text-secondary hover:border-primary/50 transition-colors"
          >
            Save as Preset
          </button>
        )}
      </div>
    </div>
  )
}
