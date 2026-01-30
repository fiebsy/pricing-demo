/**
 * EditableProfilePanel Component
 *
 * Profile panel with inline-editable text fields.
 * Click any text field to edit it directly. Autosaves on blur.
 * No layout shift when switching between view/edit modes.
 *
 * @module b/profile-v3/components/editable-profile
 */

'use client'

import * as React from 'react'
import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { ProfileAvatar } from '../../../profile-v2/components/profile-panel/ProfileAvatar'
import { EditableText } from './EditableText'
import { ButtonUtility } from '@/components/ui/core/primitives/button-utility'
import { Badge } from '@/components/ui/core/primitives/badge'
import RefreshIcon from '@hugeicons-pro/core-stroke-rounded/RefreshIcon'
import Diamond01Icon from '@hugeicons-pro/core-stroke-rounded/Diamond01Icon'

// =============================================================================
// TYPES
// =============================================================================

export interface EditableProfilePanelProps {
  name: string
  avatarUrl: string
  bio: string
  role?: string
  company?: string
  isVerified?: boolean
  onNameChange?: (value: string) => void
  onRoleChange?: (value: string) => void
  onCompanyChange?: (value: string) => void
  onBioChange?: (value: string) => void
  className?: string
}

// =============================================================================
// COMPONENT
// =============================================================================

// Sample AI-generated bios (max 30 words each)
const AI_BIOS = [
  'Building delightful interfaces that users love. Passionate about clean code and pixel-perfect design.',
  'Turning complex problems into simple, elegant solutions. Always learning, always shipping.',
  'Crafting digital experiences with intention and care. Design systems enthusiast.',
  'Making software feel human. Obsessed with details that matter.',
  'Creating interfaces that spark joy. Believer in the power of good design.',
]

export function EditableProfilePanel({
  name,
  avatarUrl,
  bio,
  role,
  company,
  isVerified = false,
  onNameChange,
  onRoleChange,
  onCompanyChange,
  onBioChange,
  className,
}: EditableProfilePanelProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateBio = useCallback(async () => {
    setIsGenerating(true)

    // Pick a random bio
    const randomBio = AI_BIOS[Math.floor(Math.random() * AI_BIOS.length)]

    // Clear existing bio
    onBioChange?.('')

    // Small initial delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    // Typewriter effect - type character by character
    for (let i = 0; i <= randomBio.length; i++) {
      onBioChange?.(randomBio.slice(0, i))
      await new Promise((resolve) => setTimeout(resolve, 20))
    }

    setIsGenerating(false)
  }, [onBioChange])

  return (
    <div
      className={cn(
        'flex flex-col items-start',
        className
      )}
    >
      {/* Avatar - not editable */}
      <ProfileAvatar
        name={name}
        avatarUrl={avatarUrl}
        isVerified={isVerified}
        className="size-[60px] xl:size-[72px]"
      />

      {/* Editable name + bio */}
      <div className="mt-4 max-w-[500px]">
        {/* Name */}
        <EditableText
          value={name}
          onChange={onNameChange}
          className="text-3xl font-medium leading-tight tracking-tight text-primary"
          placeholder="Your name"
          minWidth={120}
        />

        {/* Tier and Rank Badges */}
        <div className="flex items-center gap-2 mt-2">
          <Badge
            size="sm"
            shape="squircle"
            iconLeading={Diamond01Icon}
            className="badge-blue"
          >
            Diamond Tier
          </Badge>
          <Badge
            color="gray"
            size="sm"
            shape="squircle"
          >
            #113 in Design
          </Badge>
        </div>

        {/* Bio with AI generate button on hover */}
        <div className="group/bio mt-4">
          <EditableText
            value={bio}
            onChange={onBioChange}
            className="text-lg leading-relaxed text-tertiary"
            placeholder="Write a short bio..."
            multiline
          />

          {/* AI Generate Bio Button - visible on hover */}
          <div className="mt-2 opacity-0 group-hover/bio:opacity-100 transition-opacity duration-150">
            <ButtonUtility
              icon={RefreshIcon}
              tooltip={isGenerating ? 'Generating...' : 'Generate bio'}
              onClick={handleGenerateBio}
              isDisabled={isGenerating}
              color="tertiary"
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
