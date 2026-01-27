/**
 * Question Command Menu V3 - Status Badge Configuration
 *
 * Icons and styles for status badges.
 */

import AlertCircleIcon from '@hugeicons-pro/core-stroke-rounded/AlertCircleIcon'
import Tick01Icon from '@hugeicons-pro/core-stroke-rounded/Tick01Icon'
import Loading01Icon from '@hugeicons-pro/core-stroke-rounded/Loading01Icon'
import Cancel01Icon from '@hugeicons-pro/core-stroke-rounded/Cancel01Icon'

export const STATUS_CONFIG = {
  approved: {
    icon: Tick01Icon,
    className: 'bg-success-primary/10 text-success-primary border-success-primary/20',
  },
  'needs-revision': {
    icon: AlertCircleIcon,
    className: 'bg-warning-primary/10 text-warning-primary border-warning-primary/20',
  },
  pending: {
    icon: Loading01Icon,
    className: 'bg-tertiary text-tertiary border-primary',
  },
  rejected: {
    icon: Cancel01Icon,
    className: 'bg-error-primary/10 text-error-primary border-error-primary/20',
  },
} as const
