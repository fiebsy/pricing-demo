'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ProfileFormData } from '../types'
import { FormField } from './form-field'
import { TextInput, DisabledNameField } from './text-input'
import { TextareaField, BioActionButton } from './textarea-field'
import { ProfileImage } from './profile-image'
import { QuestionsList } from './questions-list'
import { SocialLinks } from './social-links'

interface EditProfileFormProps {
  initialData: ProfileFormData
  onSave?: (data: ProfileFormData) => void
  onCancel?: () => void
}

/**
 * Main edit profile form component
 * Uses semantic design tokens
 */
export function EditProfileForm({
  initialData,
  onSave,
  onCancel,
}: EditProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>(initialData)
  const [isDirty, setIsDirty] = useState(false)

  const updateField = <K extends keyof ProfileFormData>(
    field: K,
    value: ProfileFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setIsDirty(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave?.(formData)
  }

  return (
    <div className="relative z-10">
      {/* Header actions - Cancel/Save buttons */}
      <div className="absolute right-0 top-0">
        <div
          className="flex items-center gap-3"
          style={{
            opacity: 1,
            transform: 'none',
            transformOrigin: '100% 50% 0px',
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            className={cn(
              'cursor-pointer select-none',
              'flex items-center justify-center',
              'px-3 py-1.5 gap-1.5',
              'rounded-full',
              'text-base font-[450]',
              'backdrop-blur-sm',
              'bg-quaternary',
              'text-primary',
              'hover:text-primary',
              'hover:bg-quaternary',
              'active:bg-quaternary',
              'transition-colors',
              'border border-transparent'
            )}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-profile-form"
            className={cn(
              'cursor-pointer select-none',
              'flex items-center justify-center',
              'px-3 py-1.5 gap-1.5',
              'rounded-full',
              'text-base font-[450]',
              'backdrop-blur-sm',
              'bg-brand-solid',
              'text-white',
              'hover:bg-brand-solid_hover',
              'active:bg-brand-solid_hover',
              'transition-colors',
              'border border-transparent'
            )}
          >
            Save
          </button>
        </div>
      </div>

      {/* Profile image */}
      <ProfileImage
        src="/skwircle-kid.png"
        alt={`${formData.name}'s profile`}
        onUpload={(file) => {
          console.log('Upload file:', file.name)
        }}
      />

      {/* Form */}
      <form
        id="edit-profile-form"
        className="mt-4 flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        {/* Name (disabled) */}
        <FormField label="Name" animationDelay={0}>
          <DisabledNameField name={formData.name} />
        </FormField>

        {/* Organization */}
        <FormField label="Organization" optional animationDelay={60}>
          <div className="flex gap-2">
            <div className="relative flex-1">
              {/* Org logo */}
              {formData.organization.logo && (
                <div
                  className="absolute left-[9px] top-1/2 z-10 flex size-[22px] -translate-y-1/2 items-center justify-center"
                >
                  <div
                    className="flex items-center justify-center"
                    style={{ opacity: 1, transform: 'none' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt={formData.organization.name}
                      src={formData.organization.logo}
                      className="size-[22px] rounded-[6px] object-contain transition-[filter] duration-200"
                    />
                  </div>
                </div>
              )}
              <TextInput
                value={formData.organization.name}
                onChange={(value) =>
                  updateField('organization', {
                    ...formData.organization,
                    name: value,
                  })
                }
                placeholder="Organization"
                className={formData.organization.logo ? 'pl-10' : ''}
              />
            </div>
            <div className="flex-1">
              <TextInput
                value={formData.organization.role}
                onChange={(value) =>
                  updateField('organization', {
                    ...formData.organization,
                    role: value,
                  })
                }
                placeholder="Role"
              />
            </div>
          </div>
        </FormField>

        {/* Headline */}
        <FormField label="Headline" optional animationDelay={120}>
          <TextInput
            value={formData.headline}
            onChange={(value) => updateField('headline', value)}
            placeholder="e.g. Building the future of AI"
            maxLength={60}
          />
        </FormField>

        {/* Bio */}
        <div
          className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4"
          style={{
            animationDelay: '180ms',
            animationDuration: '500ms',
            animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            animationFillMode: 'backwards',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <label className="ml-4 text-sm font-medium text-primary">
                Bio
              </label>
            </div>
            <div className="mr-2 flex items-center gap-1">
              <BioActionButton
                icon={<HighlightIcon />}
                disabled
              >
                Highlight
              </BioActionButton>
              <BioActionButton
                icon={<SparklesIcon />}
              >
                Generate Bio
              </BioActionButton>
            </div>
          </div>
          <TextareaField
            value={formData.bio}
            onChange={(value) => updateField('bio', value)}
            placeholder="Tell us about yourself"
          />
        </div>

        {/* Pinned Questions */}
        <div
          className="animate-in fade-in slide-in-from-bottom-4"
          style={{
            animationDelay: '300ms',
            animationDuration: '500ms',
            animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            animationFillMode: 'backwards',
          }}
        >
          <QuestionsList
            questions={formData.questions}
            onChange={(questions) => updateField('questions', questions)}
          />
        </div>

        {/* Social Links */}
        <div
          className="animate-in fade-in slide-in-from-bottom-4"
          style={{
            animationDelay: '240ms',
            animationDuration: '500ms',
            animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            animationFillMode: 'backwards',
          }}
        >
          <SocialLinks
            links={formData.socialLinks}
            onChange={(links) => updateField('socialLinks', links)}
          />
        </div>

        {/* Divider */}
        <hr
          className="mx-6 animate-in fade-in slide-in-from-bottom-4 border-secondary"
          style={{
            animationDelay: '360ms',
            animationDuration: '500ms',
            animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            animationFillMode: 'backwards',
          }}
        />
      </form>
    </div>
  )
}

// Bio action icons
function HighlightIcon() {
  return (
    <svg
      className="size-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20.2076 3.79375C18.9882 2.57428 17.011 2.57429 15.7915 3.79376L13.7854 5.7999C10.3895 3.79033 6.33541 3.44233 3.88873 5.88901C2.31808 7.45966 1.90595 9.73378 2.33048 11.9979C2.75608 14.2678 4.03118 16.6381 6.01005 18.6169C7.20752 19.8144 8.49446 20.6457 9.55254 21.1799C10.0821 21.4472 10.5625 21.6443 10.9562 21.7769C11.3068 21.895 11.6967 21.9999 11.9996 21.9999C12.5519 21.9999 12.9996 21.5522 12.9996 21C12.9996 20.4477 12.5519 19.9999 11.9996 19.9999C12.0179 19.9999 12.0158 19.9995 11.991 19.9941C11.9443 19.984 11.8169 19.9564 11.5946 19.8815C11.2978 19.7815 10.905 19.6222 10.4539 19.3945C9.5506 18.9385 8.4463 18.2247 7.42426 17.2027C5.69316 15.4716 4.63839 13.4542 4.29622 11.6293C3.95298 9.79872 4.33519 8.27098 5.30294 7.30322C6.72865 5.87752 9.46289 5.73491 12.3189 7.26643L11.1712 8.41415C10.4211 9.16429 9.99964 10.1817 9.99964 11.2426V12.9999C9.99964 13.5522 10.4474 13.9999 10.9996 13.9999H12.7721C13.8347 13.9999 14.8537 13.5771 15.6041 12.8248L16.9919 11.4336C18.0283 12.7604 18.718 14.0186 18.9981 15.0882C19.3215 16.3234 19.0807 17.1544 18.3749 17.7191C17.9278 18.0768 17.4104 18.1038 16.7273 17.8216C16.0153 17.5275 15.2921 16.9506 14.7117 16.39C14.3145 16.0063 13.6814 16.0173 13.2977 16.4146C12.914 16.8118 12.925 17.4449 13.3222 17.8286C13.9666 18.451 14.9054 19.2329 15.9638 19.6701C17.0511 20.1193 18.4127 20.2501 19.6243 19.2808C21.1329 18.074 21.3883 16.3207 20.9328 14.5815C20.545 13.1007 19.631 11.5277 18.4141 10.0078L20.2104 8.20707C21.4272 6.98716 21.426 5.01214 20.2076 3.79375Z"
        fill="currentColor"
      />
    </svg>
  )
}

function SparklesIcon() {
  return (
    <svg
      className="size-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M8 16C8 16.5523 8.44772 17 9 17C9.55228 17 10 16.5523 10 16C10 13.6915 10.5108 12.2576 11.3842 11.3842C12.2576 10.5108 13.6915 10 16 10C16.5523 10 17 9.55228 17 9C17 8.44772 16.5523 8 16 8C13.6915 8 12.2576 7.48919 11.3842 6.61581C10.5108 5.74243 10 4.30849 10 2C10 1.44772 9.55228 1 9 1C8.44772 1 8 1.44772 8 2C8 4.30849 7.48919 5.74243 6.61581 6.61581C5.74243 7.48919 4.30849 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10C4.30849 10 5.74243 10.5108 6.61581 11.3842C7.48919 12.2576 8 13.6915 8 16Z"
        fill="currentColor"
      />
      <path
        d="M16.5 22C16.5 22.5523 16.9477 23 17.5 23C18.0523 23 18.5 22.5523 18.5 22C18.5 20.5596 18.8198 19.7506 19.2852 19.2852C19.7506 18.8198 20.5596 18.5 22 18.5C22.5523 18.5 23 18.0523 23 17.5C23 16.9477 22.5523 16.5 22 16.5C20.5596 16.5 19.7506 16.1802 19.2852 15.7148C18.8198 15.2494 18.5 14.4404 18.5 13C18.5 12.4477 18.0523 12 17.5 12C16.9477 12 16.5 12.4477 16.5 13C16.5 14.4404 16.1802 15.2494 15.7148 15.7148C15.2494 16.1802 14.4404 16.5 13 16.5C12.4477 16.5 12 16.9477 12 17.5C12 18.0523 12.4477 18.5 13 18.5C14.4404 18.5 15.2494 18.8198 15.7148 19.2852C16.1802 19.7506 16.5 20.5596 16.5 22Z"
        fill="currentColor"
      />
    </svg>
  )
}
