/**
 * Status Transitions - Static Data
 *
 * All unique status transitions from production database.
 * Generated from contract_audit_logs table.
 * Last updated: 2026-02-15
 *
 * Total transitions: 214
 * Total frequency: 53,951+
 */

import type { TransitionEntry, UsageTier, CoverageType } from '../config/types'
import { getStatusCategory } from '../config/status-categories'
import { resolveTranslation } from '../utils/translation-resolver'

// =============================================================================
// RAW DATABASE DATA
// =============================================================================

interface RawTransition {
  fromStatus: string
  toStatus: string
  frequency: number
  lastOccurred: string
}

const RAW_TRANSITIONS: RawTransition[] = [
  { fromStatus: 'FUNDING_PARTICIPATION_PENDING', toStatus: 'FUNDING_ENTER_FIRST_PAYMENT', frequency: 3184, lastOccurred: '2026-02-10T15:04:22.179Z' },
  { fromStatus: 'FUNDING_ENTER_FIRST_PAYMENT', toStatus: 'FUNDED', frequency: 2881, lastOccurred: '2026-02-10T14:41:57.288Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'FUNDING_IN_COLLECTIONS', frequency: 2770, lastOccurred: '2026-02-10T14:10:51.968Z' },
  { fromStatus: 'FUNDING_TO_BE_SENT', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 2550, lastOccurred: '2026-02-09T15:38:55.502Z' },
  { fromStatus: 'FUNDED', toStatus: 'FUNDING_TO_BE_SENT', frequency: 2532, lastOccurred: '2026-02-05T22:27:21.930Z' },
  { fromStatus: 'MANUAL_REVIEW', toStatus: 'FUNDING_PARTICIPATION_PENDING', frequency: 2492, lastOccurred: '2026-02-10T15:41:39.754Z' },
  { fromStatus: 'FUNDING_ENTER_FIRST_PAYMENT', toStatus: 'MANUAL_REVIEW', frequency: 2435, lastOccurred: '2026-02-10T15:41:39.002Z' },
  { fromStatus: 'FAILED_PAYMENT', toStatus: 'FUNDING_IN_COLLECTIONS', frequency: 2276, lastOccurred: '2026-02-10T16:03:34.602Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 1765, lastOccurred: '2026-02-10T15:33:39.588Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS', toStatus: 'FAILED_PAYMENT', frequency: 1617, lastOccurred: '2026-02-10T16:02:41.845Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS', toStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', frequency: 1430, lastOccurred: '2026-02-10T15:32:40.298Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'SERVICING_IN_COLLECTIONS', frequency: 1303, lastOccurred: '2026-02-09T23:45:12.167Z' },
  { fromStatus: 'SERVICING_PARTICIPATION_PENDING', toStatus: 'FUNDED', frequency: 1252, lastOccurred: '2026-02-10T15:52:52.709Z' },
  { fromStatus: 'FAILED_PAYMENT', toStatus: 'SERVICING_IN_COLLECTIONS', frequency: 1211, lastOccurred: '2026-02-10T15:39:24.065Z' },
  { fromStatus: 'FUNDED', toStatus: 'SERVICING_IN_REPAYMENT', frequency: 1200, lastOccurred: '2026-02-10T15:53:01.461Z' },
  { fromStatus: 'MANUAL_REVIEW', toStatus: 'SERVICING_PARTICIPATION_PENDING', frequency: 1110, lastOccurred: '2026-02-10T15:38:46.267Z' },
  { fromStatus: 'SERVICING_ENTER_FIRST_PAYMENT', toStatus: 'MANUAL_REVIEW', frequency: 1087, lastOccurred: '2026-02-10T15:38:45.685Z' },
  { fromStatus: 'FUNDED', toStatus: 'FUNDING_PARTICIPATION_PENDING', frequency: 1056, lastOccurred: '2026-02-10T15:48:45.244Z' },
  { fromStatus: 'SERVICING_IN_COLLECTIONS', toStatus: 'FAILED_PAYMENT', frequency: 1031, lastOccurred: '2026-02-10T15:39:18.644Z' },
  { fromStatus: 'FUNDING_PARTICIPATION_PENDING', toStatus: 'FUNDED', frequency: 1027, lastOccurred: '2026-01-30T04:23:00.425Z' },
  { fromStatus: 'SERVICING_IN_COLLECTIONS', toStatus: 'SERVICING_IN_REPAYMENT', frequency: 871, lastOccurred: '2026-02-10T15:37:03.438Z' },
  { fromStatus: 'CLAWBACK_COMPLETE', toStatus: 'DEFAULTED_SETTLED', frequency: 810, lastOccurred: '2026-02-09T21:40:00.440Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', toStatus: 'DEFAULTED_PENDING_CLAWBACK', frequency: 761, lastOccurred: '2026-02-09T22:16:37.951Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'PAID_IN_FULL', frequency: 671, lastOccurred: '2026-02-10T06:37:51.051Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'FAILED_PAYMENT', frequency: 550, lastOccurred: '2026-02-09T22:35:48.615Z' },
  { fromStatus: 'SERVICING_IN_COLLECTIONS', toStatus: 'DEFAULTED_SETTLED', frequency: 473, lastOccurred: '2026-02-06T01:13:39.291Z' },
  { fromStatus: 'FUNDING_MODIFIED_PAYMENT', toStatus: 'FUNDING_IN_COLLECTIONS', frequency: 441, lastOccurred: '2026-02-09T15:10:40.699Z' },
  { fromStatus: 'DEFAULTED_PENDING_CLAWBACK', toStatus: 'CLAWBACK_COMPLETE', frequency: 438, lastOccurred: '2026-02-10T14:49:40.144Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS', toStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', frequency: 414, lastOccurred: '2026-02-10T14:18:02.327Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS', toStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', frequency: 388, lastOccurred: '2026-02-09T23:58:30.316Z' },
  { fromStatus: 'CLAWBACK_COMPLETE', toStatus: 'CANCELED_SETTLED', frequency: 386, lastOccurred: '2026-02-09T04:30:07.927Z' },
  { fromStatus: 'FUNDED', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 379, lastOccurred: '2026-02-10T14:42:05.109Z' },
  { fromStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', toStatus: 'FUNDING_IN_COLLECTIONS', frequency: 359, lastOccurred: '2026-02-10T15:49:50.312Z' },
  { fromStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', toStatus: 'FUNDING_IN_COLLECTIONS', frequency: 358, lastOccurred: '2026-02-09T19:22:30.246Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS', toStatus: 'FUNDING_MODIFIED_PAYMENT', frequency: 347, lastOccurred: '2026-02-09T23:40:44.421Z' },
  { fromStatus: 'SERVICING_MODIFIED_PAYMENT', toStatus: 'SERVICING_IN_COLLECTIONS', frequency: 334, lastOccurred: '2026-02-06T20:24:42.649Z' },
  { fromStatus: 'CLAWBACK_COMPLETE', toStatus: 'CHARGEBACK_SETTLED', frequency: 333, lastOccurred: '2026-02-09T04:33:52.722Z' },
  { fromStatus: 'CLAWBACK_IN_PROGRESS', toStatus: 'CLAWBACK_COMPLETE', frequency: 325, lastOccurred: '2026-02-06T15:51:20.273Z' },
  { fromStatus: 'SERVICING_IN_COLLECTIONS', toStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', frequency: 322, lastOccurred: '2026-02-09T23:42:14.072Z' },
  { fromStatus: 'SERVICING_IN_COLLECTIONS', toStatus: 'SERVICING_MODIFIED_PAYMENT', frequency: 319, lastOccurred: '2026-02-09T19:58:36.150Z' },
  { fromStatus: 'CANCELED_PENDING_CLAWBACK', toStatus: 'CLAWBACK_COMPLETE', frequency: 301, lastOccurred: '2026-02-10T14:51:11.804Z' },
  { fromStatus: 'DEFAULTED_PENDING_CLAWBACK', toStatus: 'CLAWBACK_IN_PROGRESS', frequency: 297, lastOccurred: '2026-02-06T22:15:53.867Z' },
  { fromStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', toStatus: 'SERVICING_IN_COLLECTIONS', frequency: 287, lastOccurred: '2026-02-10T14:18:06.163Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 283, lastOccurred: '2026-02-09T22:53:32.961Z' },
  { fromStatus: 'SERVICING_IN_COLLECTIONS', toStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', frequency: 277, lastOccurred: '2026-02-10T00:08:24.134Z' },
  { fromStatus: 'FUNDING_ENTER_FIRST_PAYMENT', toStatus: 'FUNDING_PARTICIPATION_PENDING', frequency: 248, lastOccurred: '2026-02-10T14:11:55.290Z' },
  { fromStatus: 'CHARGEBACK_PENDING_CLAWBACK', toStatus: 'CLAWBACK_COMPLETE', frequency: 237, lastOccurred: '2026-02-10T14:55:10.289Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'FAILED_PAYMENT', frequency: 224, lastOccurred: '2026-02-05T15:27:17.237Z' },
  { fromStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', toStatus: 'SERVICING_IN_COLLECTIONS', frequency: 203, lastOccurred: '2026-02-10T15:52:45.157Z' },
  { fromStatus: 'SERVICING_ENTER_FIRST_PAYMENT', toStatus: 'SERVICING_PARTICIPATION_PENDING', frequency: 202, lastOccurred: '2026-02-10T09:34:16.318Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'PAID_IN_FULL', frequency: 173, lastOccurred: '2026-02-09T19:00:19.415Z' },
  { fromStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 172, lastOccurred: '2026-02-10T15:49:08.950Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'CHARGEBACK_PENDING_CLAWBACK', frequency: 165, lastOccurred: '2026-02-09T18:01:26.813Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'CANCELED_PENDING_CLAWBACK', frequency: 159, lastOccurred: '2026-02-10T15:40:28.639Z' },
  { fromStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', toStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', frequency: 152, lastOccurred: '2026-02-09T22:34:23.114Z' },
  { fromStatus: 'REQUESTING_CANCELLATION', toStatus: 'CANCELED_PENDING_CLAWBACK', frequency: 149, lastOccurred: '2026-02-09T21:00:51.018Z' },
  { fromStatus: 'REQUESTING_CANCELLATION', toStatus: 'FUNDING_IN_COLLECTIONS', frequency: 146, lastOccurred: '2026-02-09T20:17:08.025Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', toStatus: 'FAILED_PAYMENT', frequency: 145, lastOccurred: '2026-02-10T15:32:32.490Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'REQUESTING_CANCELLATION', frequency: 143, lastOccurred: '2026-02-09T23:26:10.785Z' },
  { fromStatus: 'CANCELED_PENDING_CANCELLATION', toStatus: 'CANCELED_SETTLED', frequency: 136, lastOccurred: '2026-02-09T22:04:47.980Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS', toStatus: 'DEFAULTED_PENDING_CLAWBACK', frequency: 130, lastOccurred: '2026-02-09T21:52:56.428Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS', toStatus: 'REQUESTING_CANCELLATION', frequency: 126, lastOccurred: '2026-02-06T19:10:42.411Z' },
  { fromStatus: 'FUNDING_ENTER_FIRST_PAYMENT', toStatus: 'FUNDING_TO_BE_SENT', frequency: 126, lastOccurred: '2026-02-03T13:22:21.406Z' },
  { fromStatus: 'APPROVED', toStatus: 'DECLINED', frequency: 124, lastOccurred: '2025-12-11T20:43:06.607Z' },
  { fromStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', toStatus: 'SERVICING_IN_REPAYMENT', frequency: 116, lastOccurred: '2026-02-10T15:51:11.875Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS', toStatus: 'FUNDING_PAUSED_PAYMENT', frequency: 114, lastOccurred: '2026-02-09T20:17:11.535Z' },
  { fromStatus: 'CHARGEBACK_PENDING_CLAWBACK', toStatus: 'CLAWBACK_IN_PROGRESS', frequency: 110, lastOccurred: '2026-02-06T21:30:50.988Z' },
  { fromStatus: 'FUNDING_PAUSED_PAYMENT', toStatus: 'FUNDING_IN_COLLECTIONS', frequency: 109, lastOccurred: '2026-02-09T17:48:45.083Z' },
  { fromStatus: 'CLAWBACK_IN_PROGRESS', toStatus: 'DEFAULTED_SETTLED', frequency: 103, lastOccurred: '2025-12-24T17:27:08.786Z' },
  { fromStatus: 'DEFAULTED_PENDING_CLAWBACK', toStatus: 'DEFAULTED_SETTLED', frequency: 100, lastOccurred: '2026-02-06T22:05:32.276Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'FUNDING_MODIFIED_PAYMENT', frequency: 95, lastOccurred: '2026-02-09T20:41:47.045Z' },
  { fromStatus: 'REQUESTING_CANCELLATION', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 93, lastOccurred: '2026-02-09T21:19:28.888Z' },
  { fromStatus: 'CANCELED_PENDING_CLAWBACK', toStatus: 'CLAWBACK_IN_PROGRESS', frequency: 88, lastOccurred: '2026-02-06T18:40:15.499Z' },
  { fromStatus: 'FUNDING_ENTER_FIRST_PAYMENT', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 87, lastOccurred: '2026-02-10T14:14:19.865Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', toStatus: 'FUNDING_MODIFIED_PAYMENT', frequency: 81, lastOccurred: '2026-02-09T21:15:41.908Z' },
  { fromStatus: 'SERVICING_IN_COLLECTIONS', toStatus: 'SERVICING_PAUSED_PAYMENT', frequency: 77, lastOccurred: '2026-02-09T18:42:30.840Z' },
  { fromStatus: 'SERVICING_PAUSED_PAYMENT', toStatus: 'SERVICING_IN_COLLECTIONS', frequency: 75, lastOccurred: '2026-02-09T18:03:16.761Z' },
  { fromStatus: 'FUNDING_PARTICIPATION_PENDING', toStatus: 'DUPLICATE', frequency: 71, lastOccurred: '2026-02-02T17:27:21.716Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS', toStatus: 'PAID_IN_FULL', frequency: 69, lastOccurred: '2026-02-10T13:33:42.475Z' },
  { fromStatus: 'CHARGEBACK_SETTLED', toStatus: 'CHARGEBACK_PENDING_CLAWBACK', frequency: 68, lastOccurred: '2026-02-04T17:26:09.531Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', toStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', frequency: 64, lastOccurred: '2026-02-10T00:01:38.716Z' },
  { fromStatus: 'CANCELED_PENDING_CLAWBACK', toStatus: 'CANCELED_SETTLED', frequency: 62, lastOccurred: '2026-02-04T16:46:28.238Z' },
  { fromStatus: 'CANCELED_SETTLED', toStatus: 'SUBSCRIPTION_CANCELED', frequency: 59, lastOccurred: '2026-02-09T17:59:57.237Z' },
  { fromStatus: 'REQUESTING_CANCELLATION', toStatus: 'SERVICING_IN_COLLECTIONS', frequency: 56, lastOccurred: '2026-02-09T19:24:45.711Z' },
  { fromStatus: 'CHARGEBACK_PENDING_CLAWBACK', toStatus: 'CHARGEBACK_SETTLED', frequency: 53, lastOccurred: '2026-02-09T18:03:53.470Z' },
  { fromStatus: 'SERVICING_PARTICIPATION_PENDING', toStatus: 'SERVICING_IN_REPAYMENT', frequency: 53, lastOccurred: '2026-02-09T18:03:46.762Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'FUNDING_PAUSED_PAYMENT', frequency: 53, lastOccurred: '2026-02-09T16:26:41.002Z' },
  { fromStatus: 'FUNDING_MODIFIED_PAYMENT', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 52, lastOccurred: '2026-02-09T19:35:58.481Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 52, lastOccurred: '2026-02-10T15:02:18.417Z' },
  { fromStatus: 'FUNDING_PAUSED_PAYMENT', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 48, lastOccurred: '2026-02-09T20:07:06.835Z' },
  { fromStatus: 'DEFAULTED_PENDING_CLAWBACK', toStatus: 'FUNDING_IN_COLLECTIONS', frequency: 47, lastOccurred: '2026-02-06T20:39:07.166Z' },
  { fromStatus: 'SERVICING_IN_COLLECTIONS', toStatus: 'REQUESTING_CANCELLATION', frequency: 47, lastOccurred: '2026-02-09T22:31:02.494Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'SERVICING_MODIFIED_PAYMENT', frequency: 47, lastOccurred: '2026-02-09T22:44:57.499Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', toStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', frequency: 43, lastOccurred: '2026-02-09T17:19:42.263Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'CHARGEBACK_PENDING_CLAWBACK', frequency: 42, lastOccurred: '2026-02-09T18:03:50.644Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'REQUESTING_CANCELLATION', frequency: 40, lastOccurred: '2026-02-09T22:58:08.653Z' },
  { fromStatus: 'SUBSCRIPTION_CANCELED', toStatus: 'CANCELED_PENDING_CLAWBACK', frequency: 39, lastOccurred: '2026-01-28T14:04:14.159Z' },
  { fromStatus: 'DEFAULTED_SETTLED', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 38, lastOccurred: '2026-02-09T22:04:43.773Z' },
  { fromStatus: 'FUNDING_TO_BE_SENT', toStatus: 'REQUESTING_CANCELLATION', frequency: 38, lastOccurred: '2026-02-06T17:46:51.633Z' },
  { fromStatus: 'FAILED_PAYMENT', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 37, lastOccurred: '2026-02-09T22:35:51.510Z' },
  { fromStatus: 'CLAWBACK_IN_PROGRESS', toStatus: 'CHARGEBACK_PENDING_CLAWBACK', frequency: 37, lastOccurred: '2026-02-09T03:34:51.844Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', toStatus: 'FUNDING_PAUSED_PAYMENT', frequency: 35, lastOccurred: '2026-02-06T17:03:59.526Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS', toStatus: 'CHARGEBACK_PENDING_CLAWBACK', frequency: 34, lastOccurred: '2026-02-04T17:18:08.115Z' },
  { fromStatus: 'FUNDED', toStatus: 'SERVICING_PARTICIPATION_PENDING', frequency: 34, lastOccurred: '2026-02-05T21:09:36.120Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'FUNDED', frequency: 33, lastOccurred: '2026-02-10T15:03:51.039Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', toStatus: 'REQUESTING_CANCELLATION', frequency: 32, lastOccurred: '2026-02-06T21:34:56.042Z' },
  { fromStatus: 'FUNDED', toStatus: 'DUPLICATE', frequency: 32, lastOccurred: '2026-02-03T15:37:40.678Z' },
  { fromStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', toStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', frequency: 31, lastOccurred: '2026-02-09T22:34:28.631Z' },
  { fromStatus: 'FUNDING_TO_BE_SENT', toStatus: 'FUNDED', frequency: 30, lastOccurred: '2026-01-29T15:08:10.684Z' },
  { fromStatus: 'CANCELED_PENDING_CANCELLATION', toStatus: 'SERVICING_IN_COLLECTIONS', frequency: 30, lastOccurred: '2026-02-05T22:28:45.610Z' },
  { fromStatus: 'CLAWBACK_COMPLETE', toStatus: 'CLAWBACK_IN_PROGRESS', frequency: 29, lastOccurred: '2026-02-09T03:34:48.591Z' },
  { fromStatus: 'SERVICING_IN_COLLECTIONS', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 28, lastOccurred: '2026-02-09T19:24:50.275Z' },
  { fromStatus: 'REQUESTING_CANCELLATION', toStatus: 'SERVICING_IN_REPAYMENT', frequency: 26, lastOccurred: '2026-02-06T17:46:55.169Z' },
  { fromStatus: 'DEFAULTED_SETTLED', toStatus: 'DEFAULTED_PENDING_CLAWBACK', frequency: 26, lastOccurred: '2026-02-09T17:45:38.366Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS', toStatus: 'CANCELED_PENDING_CLAWBACK', frequency: 25, lastOccurred: '2026-02-10T15:47:11.114Z' },
  { fromStatus: 'CANCELED_PENDING_REFUND', toStatus: 'CANCELED_PENDING_CLAWBACK', frequency: 25, lastOccurred: '2026-02-06T20:37:52.977Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'SERVICING_PAUSED_PAYMENT', frequency: 24, lastOccurred: '2026-02-06T18:46:31.972Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'CANCELED_PENDING_CLAWBACK', frequency: 23, lastOccurred: '2026-02-05T13:54:59.276Z' },
  { fromStatus: 'FAILED_PAYMENT', toStatus: 'SERVICING_IN_REPAYMENT', frequency: 23, lastOccurred: '2026-02-05T21:24:11.953Z' },
  { fromStatus: 'FUNDING_PARTICIPATION_PENDING', toStatus: 'REQUESTING_CANCELLATION', frequency: 22, lastOccurred: '2026-02-09T15:17:19.869Z' },
  { fromStatus: 'CLAWBACK_IN_PROGRESS', toStatus: 'DEFAULTED_PENDING_CLAWBACK', frequency: 22, lastOccurred: '2026-02-02T19:26:08.657Z' },
  { fromStatus: 'SERVICING_MODIFIED_PAYMENT', toStatus: 'SERVICING_IN_REPAYMENT', frequency: 21, lastOccurred: '2026-02-06T23:26:21.467Z' },
  { fromStatus: 'REQUESTING_CANCELLATION', toStatus: 'CHARGEBACK_PENDING_CLAWBACK', frequency: 21, lastOccurred: '2026-02-07T15:05:53.693Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'FUNDING_TO_BE_SENT', frequency: 21, lastOccurred: '2026-01-30T18:59:32.389Z' },
  { fromStatus: 'SERVICING_IN_COLLECTIONS', toStatus: 'PAID_IN_FULL', frequency: 19, lastOccurred: '2026-02-09T20:18:42.743Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 19, lastOccurred: '2026-02-09T17:32:56.841Z' },
  { fromStatus: 'CANCELED_PENDING_CANCELLATION', toStatus: 'CANCELED_PENDING_CLAWBACK', frequency: 19, lastOccurred: '2026-02-03T22:34:53.362Z' },
  { fromStatus: 'CLAWBACK_IN_PROGRESS', toStatus: 'CHARGEBACK_SETTLED', frequency: 19, lastOccurred: '2026-02-04T19:47:47.614Z' },
  { fromStatus: 'SERVICING_PAUSED_PAYMENT', toStatus: 'SERVICING_IN_REPAYMENT', frequency: 18, lastOccurred: '2026-02-04T23:02:31.498Z' },
  { fromStatus: 'FAILED_PAYMENT', toStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', frequency: 18, lastOccurred: '2026-02-03T21:40:04.503Z' },
  { fromStatus: 'CANCELED_PENDING_CLAWBACK', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 17, lastOccurred: '2026-02-09T18:21:07.157Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', toStatus: 'PAID_IN_FULL', frequency: 16, lastOccurred: '2026-01-26T20:56:20.351Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', frequency: 16, lastOccurred: '2026-01-22T15:47:43.541Z' },
  { fromStatus: 'SUBSCRIPTION_CANCELED', toStatus: 'CHARGEBACK_PENDING_CLAWBACK', frequency: 15, lastOccurred: '2026-02-09T18:00:00.949Z' },
  { fromStatus: 'FUNDING_TO_BE_SENT', toStatus: 'FUNDING_PARTICIPATION_PENDING', frequency: 15, lastOccurred: '2026-01-30T18:59:47.882Z' },
  { fromStatus: 'FUNDING_ENTER_FIRST_PAYMENT', toStatus: 'REQUESTING_CANCELLATION', frequency: 14, lastOccurred: '2026-02-09T16:52:00.166Z' },
  { fromStatus: 'PAID_IN_FULL', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 14, lastOccurred: '2026-02-04T16:30:07.313Z' },
  { fromStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 14, lastOccurred: '2026-01-16T15:43:58.614Z' },
  { fromStatus: 'DEFAULTED_SETTLED', toStatus: 'CHARGEBACK_PENDING_CLAWBACK', frequency: 13, lastOccurred: '2026-02-03T14:16:24.365Z' },
  { fromStatus: 'FUNDING_PAUSED_PAYMENT', toStatus: 'FUNDING_MODIFIED_PAYMENT', frequency: 13, lastOccurred: '2026-02-06T21:29:51.126Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'CANCELED_PENDING_REFUND', frequency: 13, lastOccurred: '2026-01-26T17:00:35.510Z' },
  { fromStatus: 'SERVICING_IN_COLLECTIONS', toStatus: 'CHARGEBACK_PENDING_CLAWBACK', frequency: 13, lastOccurred: '2026-02-04T17:32:08.767Z' },
  { fromStatus: 'FUNDING_PAUSED_PAYMENT', toStatus: 'REQUESTING_CANCELLATION', frequency: 13, lastOccurred: '2026-02-05T00:26:07.643Z' },
  { fromStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', toStatus: 'SERVICING_IN_REPAYMENT', frequency: 11, lastOccurred: '2026-01-26T23:05:50.943Z' },
  { fromStatus: 'FUNDING_TO_BE_SENT', toStatus: 'FUNDING_IN_COLLECTIONS', frequency: 11, lastOccurred: '2026-01-29T20:46:40.207Z' },
  { fromStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', toStatus: 'PAID_IN_FULL', frequency: 10, lastOccurred: '2026-02-09T22:02:10.198Z' },
  { fromStatus: 'CLAWBACK_IN_PROGRESS', toStatus: 'CANCELED_PENDING_CLAWBACK', frequency: 10, lastOccurred: '2026-02-03T14:28:01.257Z' },
  { fromStatus: 'FUNDING_PAUSED_PAYMENT', toStatus: 'CANCELED_PENDING_CLAWBACK', frequency: 10, lastOccurred: '2026-02-09T15:19:50.968Z' },
  { fromStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', toStatus: 'FAILED_PAYMENT', frequency: 10, lastOccurred: '2026-02-02T15:28:57.220Z' },
  { fromStatus: 'CLAWBACK_IN_PROGRESS', toStatus: 'CANCELED_SETTLED', frequency: 9, lastOccurred: '2025-12-22T14:44:39.846Z' },
  { fromStatus: 'FUNDING_ENTER_FIRST_PAYMENT', toStatus: 'FUNDING_ON_HOLD', frequency: 9, lastOccurred: '2026-01-29T18:56:34.560Z' },
  { fromStatus: 'FUNDING_ON_HOLD', toStatus: 'FUNDING_IN_COLLECTIONS', frequency: 9, lastOccurred: '2026-02-04T15:06:14.076Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', toStatus: 'CANCELED_PENDING_CLAWBACK', frequency: 9, lastOccurred: '2026-01-05T17:28:32.880Z' },
  { fromStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', toStatus: 'PAID_IN_FULL', frequency: 9, lastOccurred: '2026-02-07T11:30:45.914Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', frequency: 8, lastOccurred: '2026-02-09T19:40:42.088Z' },
  { fromStatus: 'DEFAULTED_PENDING_CLAWBACK', toStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', frequency: 8, lastOccurred: '2026-02-09T17:45:45.578Z' },
  { fromStatus: 'IN_UNDERWRITING', toStatus: 'FUNDING_PARTICIPATION_PENDING', frequency: 8, lastOccurred: '2026-02-08T17:17:37.758Z' },
  { fromStatus: 'REQUESTING_CANCELLATION', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 8, lastOccurred: '2026-02-06T18:47:18.872Z' },
  { fromStatus: 'SERVICING_MODIFIED_PAYMENT', toStatus: 'SERVICING_PAUSED_PAYMENT', frequency: 7, lastOccurred: '2026-01-21T18:46:17.201Z' },
  { fromStatus: 'FUNDING_MODIFIED_PAYMENT', toStatus: 'FUNDING_PAUSED_PAYMENT', frequency: 7, lastOccurred: '2026-02-06T22:36:05.066Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 7, lastOccurred: '2026-01-28T15:38:51.005Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', toStatus: 'CHARGEBACK_PENDING_CLAWBACK', frequency: 7, lastOccurred: '2026-01-13T23:19:29.809Z' },
  { fromStatus: 'SERVICING_PAUSED_PAYMENT', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 7, lastOccurred: '2026-02-09T18:27:55.665Z' },
  { fromStatus: 'MANUAL_REVIEW', toStatus: 'DUPLICATE', frequency: 7, lastOccurred: '2026-02-03T19:35:43.276Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'DUPLICATE', frequency: 7, lastOccurred: '2026-02-06T15:44:55.525Z' },
  { fromStatus: 'FUNDING_TO_BE_SENT', toStatus: 'FUNDING_ON_HOLD', frequency: 6, lastOccurred: '2026-01-30T04:23:35.045Z' },
  { fromStatus: 'DEFAULTED_SETTLED', toStatus: 'PAID_IN_FULL', frequency: 6, lastOccurred: '2026-02-06T16:04:51.966Z' },
  { fromStatus: 'CHARGEBACK_PENDING_CLAWBACK', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 6, lastOccurred: '2026-01-29T19:08:33.894Z' },
  { fromStatus: 'FUNDING_ON_HOLD', toStatus: 'FUNDING_PARTICIPATION_PENDING', frequency: 6, lastOccurred: '2025-12-29T16:09:01.436Z' },
  { fromStatus: 'FUNDING_PAUSED_PAYMENT', toStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', frequency: 5, lastOccurred: '2026-01-28T19:40:21.600Z' },
  { fromStatus: 'SERVICING_PARTICIPATION_PENDING', toStatus: 'REQUESTING_CANCELLATION', frequency: 5, lastOccurred: '2026-02-04T14:25:06.133Z' },
  { fromStatus: 'SERVICING_PAUSED_PAYMENT', toStatus: 'SERVICING_MODIFIED_PAYMENT', frequency: 5, lastOccurred: '2026-02-05T00:55:39.730Z' },
  { fromStatus: 'FAILED_PAYMENT', toStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', frequency: 5, lastOccurred: '2026-01-30T19:56:24.811Z' },
  { fromStatus: 'FUNDING_ENTER_FIRST_PAYMENT', toStatus: 'CHARGEBACK_PENDING_CLAWBACK', frequency: 5, lastOccurred: '2025-12-07T03:02:51.615Z' },
  { fromStatus: 'SERVICING_PARTICIPATION_PENDING', toStatus: 'MANUAL_REVIEW', frequency: 5, lastOccurred: '2026-01-23T20:08:19.423Z' },
  { fromStatus: 'FUNDING_PARTICIPATION_PENDING', toStatus: 'PAID_IN_FULL', frequency: 5, lastOccurred: '2026-02-02T04:33:52.102Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS', toStatus: 'CANCELED_PENDING_REFUND', frequency: 5, lastOccurred: '2026-02-09T16:52:10.213Z' },
  { fromStatus: 'IN_UNDERWRITING', toStatus: 'SERVICING_PARTICIPATION_PENDING', frequency: 5, lastOccurred: '2026-01-02T18:09:31.288Z' },
  { fromStatus: 'CANCELED_PENDING_CANCELLATION', toStatus: 'CANCELED_PENDING_REFUND', frequency: 5, lastOccurred: '2026-02-03T23:04:00.035Z' },
  { fromStatus: 'FUNDING_TO_BE_SENT', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 5, lastOccurred: '2026-01-21T14:15:20.020Z' },
  { fromStatus: 'REQUESTING_CANCELLATION', toStatus: 'DEFAULTED_PENDING_CLAWBACK', frequency: 5, lastOccurred: '2026-01-23T03:34:20.709Z' },
  { fromStatus: 'SERVICING_PAUSED_PAYMENT', toStatus: 'REQUESTING_CANCELLATION', frequency: 4, lastOccurred: '2026-01-28T19:24:55.922Z' },
  { fromStatus: 'DUPLICATE', toStatus: 'IN_UNDERWRITING', frequency: 4, lastOccurred: '2025-12-29T15:15:02.036Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'FUNDED', frequency: 4, lastOccurred: '2026-02-03T18:36:12.600Z' },
  { fromStatus: 'SERVICING_PARTICIPATION_PENDING', toStatus: 'DUPLICATE', frequency: 4, lastOccurred: '2025-12-09T14:13:03.281Z' },
  { fromStatus: 'FUNDING_MODIFIED_PAYMENT', toStatus: 'PAID_IN_FULL', frequency: 4, lastOccurred: '2026-02-03T12:03:40.153Z' },
  { fromStatus: 'FUNDING_PAUSED_PAYMENT', toStatus: 'PAID_IN_FULL', frequency: 4, lastOccurred: '2026-01-14T19:36:54.998Z' },
  { fromStatus: 'FUNDING_PARTICIPATION_PENDING', toStatus: 'IN_UNDERWRITING', frequency: 4, lastOccurred: '2026-01-02T18:09:25.582Z' },
  { fromStatus: 'CANCELED_PENDING_CANCELLATION', toStatus: 'FUNDING_IN_COLLECTIONS', frequency: 4, lastOccurred: '2026-01-08T16:16:13.869Z' },
  { fromStatus: 'PAID_IN_FULL', toStatus: 'SERVICING_IN_REPAYMENT', frequency: 4, lastOccurred: '2026-02-09T20:18:52.944Z' },
  { fromStatus: 'IN_UNDERWRITING', toStatus: 'DUPLICATE', frequency: 4, lastOccurred: '2026-02-03T19:37:42.431Z' },
  { fromStatus: 'SERVICING_ENTER_FIRST_PAYMENT', toStatus: 'FUNDING_PARTICIPATION_PENDING', frequency: 4, lastOccurred: '2025-11-21T22:55:29.254Z' },
  { fromStatus: 'FUNDING_PARTICIPATION_PENDING', toStatus: 'MANUAL_REVIEW', frequency: 4, lastOccurred: '2025-12-10T21:57:09.166Z' },
  { fromStatus: 'CANCELED_PENDING_CLAWBACK', toStatus: 'DEFAULTED_PENDING_CLAWBACK', frequency: 4, lastOccurred: '2026-01-30T14:21:50.529Z' },
  { fromStatus: 'CANCELED_PENDING_REFUND', toStatus: 'CANCELED_SETTLED', frequency: 4, lastOccurred: '2026-02-03T18:49:18.388Z' },
  { fromStatus: 'SERVICING_PARTICIPATION_PENDING', toStatus: 'IN_UNDERWRITING', frequency: 4, lastOccurred: '2026-02-03T19:37:36.512Z' },
  { fromStatus: 'FUNDING_TO_BE_SENT', toStatus: 'PAID_IN_FULL', frequency: 3, lastOccurred: '2026-01-05T17:07:31.203Z' },
  { fromStatus: 'FUNDING_PAUSED_PAYMENT', toStatus: 'IN_COLLECTIONS_PENDING_PAYMENT', frequency: 3, lastOccurred: '2026-01-20T23:00:27.477Z' },
  { fromStatus: 'CANCELED_PENDING_CANCELLATION', toStatus: 'SERVICING_IN_REPAYMENT', frequency: 3, lastOccurred: '2026-01-19T23:09:24.155Z' },
  { fromStatus: 'FUNDING_ENTER_FIRST_PAYMENT', toStatus: 'SERVICING_PARTICIPATION_PENDING', frequency: 3, lastOccurred: '2026-02-09T17:33:27.291Z' },
  { fromStatus: 'SERVICING_IN_COLLECTIONS', toStatus: 'CANCELED_PENDING_REFUND', frequency: 3, lastOccurred: '2026-02-06T20:35:54.111Z' },
  { fromStatus: 'DEFAULTED_PENDING_CLAWBACK', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 3, lastOccurred: '2026-01-28T19:12:29.700Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'IN_UNDERWRITING', frequency: 3, lastOccurred: '2026-01-09T14:07:37.705Z' },
  { fromStatus: 'CANCELED_SETTLED', toStatus: 'CLAWBACK_COMPLETE', frequency: 3, lastOccurred: '2025-11-18T14:10:04.786Z' },
  { fromStatus: 'CHARGEBACK_SETTLED', toStatus: 'CLAWBACK_COMPLETE', frequency: 3, lastOccurred: '2025-11-18T14:10:25.082Z' },
  { fromStatus: 'CANCELED_SETTLED', toStatus: 'CANCELED_PENDING_CLAWBACK', frequency: 2, lastOccurred: '2026-02-09T15:07:24.480Z' },
  { fromStatus: 'CHARGEBACK_PENDING_CLAWBACK', toStatus: 'SERVICING_IN_REPAYMENT', frequency: 2, lastOccurred: '2026-01-27T16:25:48.667Z' },
  { fromStatus: 'SERVICING_IN_COLLECTIONS', toStatus: 'CANCELED_SETTLED', frequency: 2, lastOccurred: '2025-11-20T00:05:37.766Z' },
  { fromStatus: 'SUBSCRIPTION_CANCELED', toStatus: 'FUNDING_IN_COLLECTIONS', frequency: 2, lastOccurred: '2026-02-04T17:48:41.670Z' },
  { fromStatus: 'FAILED_PAYMENT', toStatus: 'FUNDING_PAUSED_PAYMENT', frequency: 2, lastOccurred: '2026-01-16T16:56:00.049Z' },
  { fromStatus: 'MANUAL_REVIEW', toStatus: 'FUNDED', frequency: 2, lastOccurred: '2026-02-04T23:15:53.908Z' },
  { fromStatus: 'SERVICING_ENTER_FIRST_PAYMENT', toStatus: 'SERVICING_IN_REPAYMENT', frequency: 2, lastOccurred: '2025-12-19T16:53:58.728Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'DEFAULTED_PENDING_CLAWBACK', frequency: 2, lastOccurred: '2026-01-05T16:58:39.028Z' },
  { fromStatus: 'CANCELED_PENDING_REFUND', toStatus: 'FUNDING_PAUSED_PAYMENT', frequency: 2, lastOccurred: '2026-01-20T22:02:27.920Z' },
  { fromStatus: 'FUNDING_PARTICIPATION_PENDING', toStatus: 'SERVICING_PARTICIPATION_PENDING', frequency: 2, lastOccurred: '2025-11-21T23:30:15.879Z' },
  { fromStatus: 'FUNDING_ON_HOLD', toStatus: 'REQUESTING_CANCELLATION', frequency: 2, lastOccurred: '2026-01-28T18:45:48.677Z' },
  { fromStatus: 'SERVICING_PARTICIPATION_PENDING', toStatus: 'FUNDING_PARTICIPATION_PENDING', frequency: 2, lastOccurred: '2025-12-09T14:12:48.127Z' },
  { fromStatus: 'FAILED_PAYMENT', toStatus: 'SERVICING_PAUSED_PAYMENT', frequency: 2, lastOccurred: '2026-01-28T19:11:12.325Z' },
  { fromStatus: 'FUNDING_ENTER_FIRST_PAYMENT', toStatus: 'DUPLICATE', frequency: 2, lastOccurred: '2025-12-04T04:00:57.615Z' },
  { fromStatus: 'SERVICING_MODIFIED_PAYMENT', toStatus: 'PAID_IN_FULL', frequency: 2, lastOccurred: '2026-01-29T22:02:12.322Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'FUNDING_PARTICIPATION_PENDING', frequency: 2, lastOccurred: '2026-01-07T22:36:43.710Z' },
  { fromStatus: 'FAILED_PAYMENT', toStatus: 'PAID_IN_FULL', frequency: 2, lastOccurred: '2026-01-19T17:42:42.772Z' },
  { fromStatus: 'SERVICING_MODIFIED_PAYMENT', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 2, lastOccurred: '2026-01-23T00:03:43.310Z' },
  { fromStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', toStatus: 'REQUESTING_CANCELLATION', frequency: 2, lastOccurred: '2025-12-26T15:55:08.232Z' },
  { fromStatus: 'CLAWBACK_IN_PROGRESS', toStatus: 'MANUAL_REVIEW', frequency: 2, lastOccurred: '2025-12-04T22:00:51.157Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'CANCELED_PENDING_REFUND', frequency: 2, lastOccurred: '2026-01-26T22:21:06.042Z' },
  { fromStatus: 'FUNDED', toStatus: 'FUNDING_ENTER_FIRST_PAYMENT', frequency: 2, lastOccurred: '2026-01-29T18:56:27.386Z' },
  { fromStatus: 'PAID_IN_FULL', toStatus: 'CANCELED_SETTLED', frequency: 2, lastOccurred: '2026-02-04T17:48:16.714Z' },
  { fromStatus: 'FAILED_PAYMENT', toStatus: 'IN_REPAYMENT', frequency: 2, lastOccurred: '2026-02-02T15:06:40.900Z' },
  { fromStatus: 'FUNDED', toStatus: 'FUNDING_ON_HOLD', frequency: 2, lastOccurred: '2026-01-28T18:27:22.936Z' },
  { fromStatus: 'FUNDING_PAUSED_PAYMENT', toStatus: 'CANCELED_PENDING_REFUND', frequency: 2, lastOccurred: '2026-02-02T16:04:45.480Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', toStatus: 'FUNDING_IN_COLLECTIONS', frequency: 2, lastOccurred: '2026-01-16T22:58:02.613Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'IN_UNDERWRITING', frequency: 2, lastOccurred: '2026-02-08T17:17:28.530Z' },
  { fromStatus: 'FUNDING_PARTICIPATION_PENDING', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 1, lastOccurred: '2025-12-05T14:00:31.306Z' },
  { fromStatus: 'UNKNOWN', toStatus: 'FUNDING_ENTER_FIRST_PAYMENT', frequency: 1, lastOccurred: '2025-12-26T15:53:15.134Z' },
  { fromStatus: 'DECLINED', toStatus: 'APPROVED', frequency: 1, lastOccurred: '2025-12-11T22:05:34.854Z' },
  { fromStatus: 'FUNDING_PAUSED_PAYMENT', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 1, lastOccurred: '2025-12-30T14:43:57.076Z' },
  { fromStatus: 'SUBSCRIPTION_CANCELED', toStatus: 'DUPLICATE', frequency: 1, lastOccurred: '2025-11-21T20:27:59.822Z' },
  { fromStatus: 'REQUESTING_CANCELLATION', toStatus: 'PAID_IN_FULL', frequency: 1, lastOccurred: '2025-11-20T20:54:16.104Z' },
  { fromStatus: 'CANCELED_PENDING_CANCELLATION', toStatus: 'FUNDING_ENTER_FIRST_PAYMENT', frequency: 1, lastOccurred: '2026-01-05T14:59:16.946Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 1, lastOccurred: '2026-02-03T21:42:09.291Z' },
  { fromStatus: 'DUPLICATE', toStatus: 'REQUESTING_CANCELLATION', frequency: 1, lastOccurred: '2026-02-05T15:17:33.929Z' },
  { fromStatus: 'MANUAL_REVIEW', toStatus: 'CLAWBACK_COMPLETE', frequency: 1, lastOccurred: '2025-12-04T22:01:47.802Z' },
  { fromStatus: 'FUNDING_PAUSED_PAYMENT', toStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', frequency: 1, lastOccurred: '2026-01-21T14:16:32.601Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'SUBSCRIPTION_CANCELED', frequency: 1, lastOccurred: '2025-12-17T20:16:26.417Z' },
  { fromStatus: 'SUBSCRIPTION_CANCELED', toStatus: 'CANCELED_PENDING_CANCELLATION', frequency: 1, lastOccurred: '2026-01-02T13:50:12.387Z' },
  { fromStatus: 'MANUAL_REVIEW', toStatus: 'CLAWBACK_IN_PROGRESS', frequency: 1, lastOccurred: '2025-12-04T21:57:48.877Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', frequency: 1, lastOccurred: '2026-01-15T16:17:31.685Z' },
  { fromStatus: 'SERVICING_PAUSED_PAYMENT', toStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', frequency: 1, lastOccurred: '2025-12-02T19:49:08.339Z' },
  { fromStatus: 'DEFAULTED_PENDING_CLAWBACK', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 1, lastOccurred: '2025-12-12T19:30:39.026Z' },
  { fromStatus: 'SERVICING_PARTICIPATION_PENDING', toStatus: 'SERVICING_ENTER_FIRST_PAYMENT', frequency: 1, lastOccurred: '2025-12-12T15:46:26.769Z' },
  { fromStatus: 'FUNDING_TO_BE_SENT', toStatus: 'CANCELED_PENDING_REFUND', frequency: 1, lastOccurred: '2026-02-03T14:17:25.655Z' },
  { fromStatus: 'CLAWBACK_IN_PROGRESS', toStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', frequency: 1, lastOccurred: '2025-12-11T19:58:32.641Z' },
  { fromStatus: 'FUNDING_TO_BE_SENT', toStatus: 'MANUAL_REVIEW', frequency: 1, lastOccurred: '2025-12-02T15:37:38.210Z' },
  { fromStatus: 'FUNDING_IN_REPAYMENT', toStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', frequency: 1, lastOccurred: '2026-01-22T15:08:08.123Z' },
  { fromStatus: 'DEFAULTED_SETTLED', toStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', frequency: 1, lastOccurred: '2026-01-14T19:57:30.200Z' },
  { fromStatus: 'CHARGEBACK_SETTLED', toStatus: 'PAID_IN_FULL', frequency: 1, lastOccurred: '2025-12-02T22:04:42.989Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'CANCELED_SETTLED', frequency: 1, lastOccurred: '2026-01-28T20:11:57.896Z' },
  { fromStatus: 'DEFAULTED_SETTLED', toStatus: 'CLAWBACK_COMPLETE', frequency: 1, lastOccurred: '2025-11-18T14:10:22.482Z' },
  { fromStatus: 'SERVICING_IN_COLLECTIONS', toStatus: 'DEFAULTED_PENDING_CLAWBACK', frequency: 1, lastOccurred: '2025-12-12T21:22:47.450Z' },
  { fromStatus: 'FAILED_PAYMENT', toStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', frequency: 1, lastOccurred: '2026-01-19T21:47:07.967Z' },
  { fromStatus: 'UNKNOWN', toStatus: 'DUPLICATE', frequency: 1, lastOccurred: '2025-11-29T13:47:03.421Z' },
  { fromStatus: 'SUBSCRIPTION_CANCELED', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 1, lastOccurred: '2026-01-08T18:28:46.327Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'DUPLICATE', frequency: 1, lastOccurred: '2025-11-28T14:38:56.299Z' },
  { fromStatus: 'PAID_IN_FULL', toStatus: 'FAILED_PAYMENT', frequency: 1, lastOccurred: '2025-12-08T18:26:30.749Z' },
  { fromStatus: 'FUNDING_TO_BE_SENT', toStatus: 'UNKNOWN', frequency: 1, lastOccurred: '2025-12-26T15:53:05.580Z' },
  { fromStatus: 'SERVICING_ENTER_FIRST_PAYMENT', toStatus: 'FUNDED', frequency: 1, lastOccurred: '2026-01-16T14:57:34.512Z' },
  { fromStatus: 'DECLINED', toStatus: 'WENT_DARK', frequency: 1, lastOccurred: '2025-12-11T21:00:52.149Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'DEFAULTED_PENDING_CLAWBACK', frequency: 1, lastOccurred: '2026-01-28T19:12:18.005Z' },
  { fromStatus: 'IN_REPAYMENT', toStatus: 'FAILED_PAYMENT', frequency: 1, lastOccurred: '2026-01-14T20:22:29.778Z' },
  { fromStatus: 'FUNDING_MODIFIED_PAYMENT', toStatus: 'REQUESTING_CANCELLATION', frequency: 1, lastOccurred: '2026-01-26T18:29:33.977Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', frequency: 1, lastOccurred: '2026-01-15T18:43:33.850Z' },
  { fromStatus: 'FUNDING_PARTICIPATION_PENDING', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 1, lastOccurred: '2025-12-04T21:42:39.100Z' },
  { fromStatus: 'CLAWBACK_COMPLETE', toStatus: 'CHARGEBACK_PENDING_CLAWBACK', frequency: 1, lastOccurred: '2025-12-16T14:05:45.843Z' },
  { fromStatus: 'FUNDED', toStatus: 'SERVICING_IN_COLLECTIONS', frequency: 1, lastOccurred: '2026-01-06T23:20:09.375Z' },
  { fromStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', toStatus: 'SERVICING_IN_COLLECTIONS', frequency: 1, lastOccurred: '2026-01-13T14:39:25.519Z' },
  { fromStatus: 'CANCELED_PENDING_CANCELLATION', toStatus: 'SERVICING_MODIFIED_PAYMENT', frequency: 1, lastOccurred: '2025-12-09T22:11:21.282Z' },
  { fromStatus: 'SUBSCRIPTION_CANCELED', toStatus: 'CANCELED_SETTLED', frequency: 1, lastOccurred: '2025-12-11T21:47:25.054Z' },
  { fromStatus: 'PAID_IN_FULL', toStatus: 'FUNDING_PAUSED_PAYMENT', frequency: 1, lastOccurred: '2025-12-23T21:52:23.400Z' },
  { fromStatus: 'DUPLICATE', toStatus: 'FUNDING_PARTICIPATION_PENDING', frequency: 1, lastOccurred: '2025-12-04T02:52:18.819Z' },
  { fromStatus: 'DEFAULTED_PENDING_CLAWBACK', toStatus: 'PAID_IN_FULL', frequency: 1, lastOccurred: '2026-02-04T17:43:29.006Z' },
  { fromStatus: 'CLAWBACK_COMPLETE', toStatus: 'DEFAULTED_PENDING_CLAWBACK', frequency: 1, lastOccurred: '2025-12-16T14:06:50.210Z' },
  { fromStatus: 'IN_COLLECTIONS_FUTURE_PAYMENT', toStatus: 'FUNDING_IN_COLLECTIONS_RISK_OF_CLAWBACK', frequency: 1, lastOccurred: '2026-01-21T19:40:40.240Z' },
  { fromStatus: 'IN_REPAYMENT', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 1, lastOccurred: '2026-02-02T15:06:47.571Z' },
  { fromStatus: 'FUNDING_ENTER_FIRST_PAYMENT', toStatus: 'CANCELED_PENDING_CLAWBACK', frequency: 1, lastOccurred: '2026-01-14T14:38:32.383Z' },
  { fromStatus: 'MANUAL_REVIEW', toStatus: 'WENT_DARK', frequency: 1, lastOccurred: '2026-02-03T19:07:08.142Z' },
  { fromStatus: 'SERVICING_IN_REPAYMENT', toStatus: 'FUNDING_IN_REPAYMENT', frequency: 1, lastOccurred: '2025-11-19T19:05:39.593Z' },
  { fromStatus: 'CHARGEBACK_SETTLED', toStatus: 'REQUESTING_CANCELLATION', frequency: 1, lastOccurred: '2025-11-20T10:20:24.415Z' },
]

// =============================================================================
// USAGE TIER HELPER
// =============================================================================

function getUsageTier(frequency: number): UsageTier {
  if (frequency >= 1000) return 'high'
  if (frequency >= 100) return 'medium'
  if (frequency >= 10) return 'low'
  return 'stale'
}

// =============================================================================
// PROCESS RAW DATA
// =============================================================================

function processTransitions(): TransitionEntry[] {
  return RAW_TRANSITIONS.map((raw, index) => {
    const translation = resolveTranslation(raw.fromStatus, raw.toStatus)
    return {
      id: `transition-${index}`,
      fromStatus: raw.fromStatus,
      toStatus: raw.toStatus,
      frequency: raw.frequency,
      lastOccurred: raw.lastOccurred,
      condensed: translation.condensed,
      tooltip: translation.tooltip,
      coverage: translation.source,
      fromCategory: getStatusCategory(raw.fromStatus),
      toCategory: getStatusCategory(raw.toStatus),
      usageTier: getUsageTier(raw.frequency),
    }
  })
}

// =============================================================================
// EXPORTS
// =============================================================================

export const TRANSITION_DATA: TransitionEntry[] = processTransitions()

export function getTotalFrequency(): number {
  return TRANSITION_DATA.reduce((sum, t) => sum + t.frequency, 0)
}

export function getCoverageCounts(): Record<CoverageType, number> {
  const counts: Record<CoverageType, number> = {
    specific: 0,
    semantic: 0,
    fallback: 0,
  }
  for (const t of TRANSITION_DATA) {
    counts[t.coverage]++
  }
  return counts
}

export function getUsageTierCounts(): Record<UsageTier, number> {
  const counts: Record<UsageTier, number> = {
    high: 0,
    medium: 0,
    low: 0,
    stale: 0,
  }
  for (const t of TRANSITION_DATA) {
    counts[t.usageTier]++
  }
  return counts
}
