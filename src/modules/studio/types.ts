/**
 * Studio Module - Type Definitions
 *
 * Types for the Delphi AI Studio Audience Tab dashboard.
 */

// =============================================================================
// AUDIENCE USER TYPE
// =============================================================================

export type AccessGroup = 'Public' | 'Insiders' | 'Invited' | 'Revoked'

export type UserStatus = 'Active' | 'Invited' | 'Revoked'

export interface AudienceUser extends Record<string, unknown> {
  /** Unique identifier */
  id: number
  /** User display name */
  name: string
  /** User email address */
  email: string
  /** Avatar image URL */
  avatarUrl?: string | null
  /** Total message count */
  messageCount: number
  /** User tags (VIP, Lead-Coaching, etc.) */
  tags: string[]
  /** Last interaction timestamp */
  lastInteracted: Date
  /** Access group classification */
  accessGroup: AccessGroup
  /** User status */
  status: UserStatus
}

// =============================================================================
// METRIC TYPES
// =============================================================================

export type AudienceMetricId = 'totalActive' | 'totalMessages' | 'avgMessages' | 'mostEngaged'

export type ChangeType = 'positive' | 'negative' | 'neutral'

export interface AudienceMetrics {
  totalActiveUsers: number
  totalMessages: number
  avgMessagesPerUser: number
  mostEngagedUsers: number
  // 30-day change values
  activeUsersChange: number
  messagesChange: number
  avgMessagesChange: number
  engagedUsersChange: number
}

// =============================================================================
// FILTER TYPES
// =============================================================================

export type AudienceFilterId =
  // Status filters
  | 'status-active'
  | 'status-invited'
  | 'status-revoked'
  // Last Interacted filters
  | 'last-7d'
  | 'last-30d'
  | 'last-90d'
  // Message range filters
  | 'messages-0-10'
  | 'messages-11-50'
  | 'messages-51-100'
  | 'messages-101-500'
  | 'messages-500+'
  | 'messages-51+' // Combined: 51+ messages (for Most Engaged metric)
  // Tag filters
  | 'tag-vip'
  | 'tag-lead'
  | 'tag-client'
  | 'tag-cohort'
  | 'tag-inactive'

export type FilterCategory = 'Status' | 'Last Interacted' | 'Messages' | 'Tags'

export interface ActiveFilter {
  id: AudienceFilterId
  label: string
  value: string
  category: FilterCategory
}

export type FilterPredicate = (item: AudienceUser) => boolean

// =============================================================================
// SORT TYPES
// =============================================================================

export type AudienceSortField =
  | 'NAME'
  | 'MESSAGES'
  | 'LAST_INTERACTED'

export type AudienceSortOrder = 'ASC' | 'DESC'
