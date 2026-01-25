/**
 * Edit Profile Form Types
 * Based on Delphi.ai edit profile flow
 */

export type ProfileMode = 'view' | 'edit'

export interface ProfileFormData {
  name: string // readonly - cannot be edited
  organization: {
    name: string
    logo?: string
    role: string
  }
  headline: string
  bio: string
  questions: string[] // max 5
  socialLinks: string[]
}

export interface ProfileImageProps {
  src: string
  alt: string
  onUpload?: (file: File) => void
}

export interface FormFieldProps {
  label: string
  optional?: boolean
  children: React.ReactNode
  animationDelay?: number
}

export interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  maxLength?: number
  leftIcon?: React.ReactNode
  rightContent?: React.ReactNode
  className?: string
}

export interface TextareaFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  headerActions?: React.ReactNode
}

export interface QuestionItemProps {
  value: string
  onChange: (value: string) => void
  onRemove: () => void
}

export interface SocialLinkItemProps {
  value: string
  onChange: (value: string) => void
  onRemove: () => void
}
