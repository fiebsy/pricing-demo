/**
 * Orders Page - Mock Data
 *
 * Business-focused order records for table display.
 * Uses seeded PRNG for deterministic data (prevents hydration mismatch).
 *
 * Hierarchy matches nav-stack orders:
 * - active → healthy | at-risk → risk-low/medium/high
 * - closed → completed | clawbacks → clawback-default/chargeback/canceled | declined
 */

import type { OrderRecord, OrderCategory } from '../types'

// =============================================================================
// SEEDED RANDOM (Prevents hydration mismatch)
// =============================================================================

function createSeededRandom(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

const seededRandom = createSeededRandom(42)

function seededRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(seededRandom() * arr.length)]
}

// =============================================================================
// DATA GENERATORS
// =============================================================================

const FIRST_NAMES = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda',
  'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Lisa', 'Daniel', 'Nancy',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
]

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
]

const ROUTES = ['AutoRoute', 'Off'] as const
const PLANS = ['PAC', 'Upfront'] as const

function generateTotal(): number {
  // Generate random total between $1,000 and $15,000
  return Math.round((1000 + seededRandom() * 14000) * 100) / 100
}

// Status configuration matching nav hierarchy
const ACTIVE_STATUSES = ['healthy', 'at-risk'] as const
const RISK_LEVELS = ['risk-low', 'risk-medium', 'risk-high'] as const
const CLOSED_STATUSES = ['completed', 'clawbacks', 'declined'] as const
const CLAWBACK_TYPES = ['clawback-default', 'clawback-chargeback', 'clawback-canceled'] as const

// Display labels
const STATUS_LABELS: Record<string, string> = {
  'healthy': 'Healthy',
  'at-risk': 'At Risk',
  'risk-low': 'Low Risk',
  'risk-medium': 'Medium Risk',
  'risk-high': 'High Risk',
  'completed': 'Completed',
  'clawbacks': 'Clawback',
  'clawback-default': 'Default',
  'clawback-chargeback': 'Chargeback',
  'clawback-canceled': 'Canceled',
  'declined': 'Declined',
}

function generateOrderId(): string {
  // Generate 7-digit order ID between 5500000 and 5700000
  const id = 5500000 + Math.floor(seededRandom() * 200000)
  return String(id)
}

function generateCustomerName(): string {
  return `${seededRandomElement(FIRST_NAMES)} ${seededRandomElement(LAST_NAMES)}`
}

function generateRoute(): 'AutoRoute' | 'Off' {
  // 70% AutoRoute, 30% Off
  return seededRandom() < 0.7 ? 'AutoRoute' : 'Off'
}

function generatePlan(): 'PAC' | 'Upfront' {
  // 60% PAC, 40% Upfront
  return seededRandom() < 0.6 ? 'PAC' : 'Upfront'
}

// =============================================================================
// MOCK DATA GENERATION
// =============================================================================

interface StatusConfig {
  category: OrderCategory
  status: string
  substatus: string | null
  type: string
  displayStatus: string
}

function generateStatusConfig(): StatusConfig {
  // 60% active, 40% closed
  const isActive = seededRandom() < 0.6

  if (isActive) {
    const status = seededRandomElement([...ACTIVE_STATUSES])
    if (status === 'at-risk') {
      const substatus = seededRandomElement([...RISK_LEVELS])
      return {
        category: 'active',
        status,
        substatus,
        type: 'Active',
        displayStatus: STATUS_LABELS[substatus],
      }
    }
    return {
      category: 'active',
      status,
      substatus: null,
      type: 'Active',
      displayStatus: STATUS_LABELS[status],
    }
  } else {
    const status = seededRandomElement([...CLOSED_STATUSES])
    if (status === 'clawbacks') {
      const substatus = seededRandomElement([...CLAWBACK_TYPES])
      return {
        category: 'closed',
        status,
        substatus,
        type: 'Closed',
        displayStatus: STATUS_LABELS[substatus],
      }
    }
    return {
      category: 'closed',
      status,
      substatus: null,
      type: 'Closed',
      displayStatus: STATUS_LABELS[status],
    }
  }
}

function generateOrderRecords(count: number): OrderRecord[] {
  const records: OrderRecord[] = []

  for (let i = 0; i < count; i++) {
    const statusConfig = generateStatusConfig()
    records.push({
      id: `order-${i}`,
      customer: generateCustomerName(),
      order: generateOrderId(),
      route: generateRoute(),
      plan: generatePlan(),
      total: generateTotal(),
      ...statusConfig,
    })
  }

  // Shuffle for realistic ordering (using seeded random)
  for (let i = records.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1))
    ;[records[i], records[j]] = [records[j], records[i]]
  }

  return records
}

// =============================================================================
// EXPORTED DATA
// =============================================================================

export const ORDER_DATA: OrderRecord[] = generateOrderRecords(50)

// =============================================================================
// METRICS CALCULATION
// =============================================================================

export interface OrderMetrics {
  totalOrders: number
  activeOrders: number
  closedOrders: number
  atRiskOrders: number
}

export function calculateMetrics(data: OrderRecord[]): OrderMetrics {
  const totalOrders = data.length
  const activeOrders = data.filter(d => d.category === 'active').length
  const closedOrders = data.filter(d => d.category === 'closed').length
  const atRiskOrders = data.filter(d => d.status === 'at-risk').length

  return {
    totalOrders,
    activeOrders,
    closedOrders,
    atRiskOrders,
  }
}
