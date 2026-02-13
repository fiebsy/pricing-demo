/**
 * Clawback Flow Visualization
 *
 * Interactive node map showing all paths for risk-related order terminations
 * and whether they result in Clawback vs Shortfall (no clawback).
 *
 * Route: /clawback-flow
 */

'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/core/primitives/badge'

// =============================================================================
// DATA: Order Termination Flow
// =============================================================================

type OrderType = 'UPFRONT' | 'PAC'
type RiskTrigger = 'DEFAULT' | 'CANCEL' | 'CHARGEBACK'
type Outcome = 'CLAWBACK' | 'SHORTFALL'

interface FlowPath {
  orderType: OrderType
  trigger: RiskTrigger
  hasAdvance: boolean
  advanceEarned: boolean
  outcome: Outcome
  dbStatuses: string[]
  count: number
  description: string
}

// All possible paths derived from database analysis
const FLOW_PATHS: FlowPath[] = [
  // UPFRONT paths
  {
    orderType: 'UPFRONT',
    trigger: 'DEFAULT',
    hasAdvance: true,
    advanceEarned: false,
    outcome: 'CLAWBACK',
    dbStatuses: ['DEFAULTED_PENDING_CLAWBACK', 'CLAWBACK_IN_PROGRESS', 'CLAWBACK_COMPLETE'],
    count: 387 + 29 + 132,
    description: 'Customer stopped paying before advance was covered → Creator owes money back',
  },
  {
    orderType: 'UPFRONT',
    trigger: 'DEFAULT',
    hasAdvance: true,
    advanceEarned: true,
    outcome: 'SHORTFALL',
    dbStatuses: ['DEFAULTED_SETTLED'],
    count: 2391, // FUNDING DEFAULTED_SETTLED
    description: 'Customer stopped paying but had already covered the advance → No clawback needed',
  },
  {
    orderType: 'UPFRONT',
    trigger: 'CANCEL',
    hasAdvance: true,
    advanceEarned: false,
    outcome: 'CLAWBACK',
    dbStatuses: ['CANCELED_PENDING_CLAWBACK'],
    count: 61,
    description: 'Order canceled before advance was covered → Creator owes money back',
  },
  {
    orderType: 'UPFRONT',
    trigger: 'CANCEL',
    hasAdvance: true,
    advanceEarned: true,
    outcome: 'SHORTFALL',
    dbStatuses: ['CANCELED_SETTLED'],
    count: 1248,
    description: 'Order canceled but advance was covered → No clawback needed',
  },
  {
    orderType: 'UPFRONT',
    trigger: 'CHARGEBACK',
    hasAdvance: true,
    advanceEarned: false,
    outcome: 'CLAWBACK',
    dbStatuses: ['CHARGEBACK_PENDING_CLAWBACK'],
    count: 119,
    description: 'Payment reversed before advance covered → Creator owes money back',
  },
  {
    orderType: 'UPFRONT',
    trigger: 'CHARGEBACK',
    hasAdvance: true,
    advanceEarned: true,
    outcome: 'SHORTFALL',
    dbStatuses: ['CHARGEBACK_SETTLED'],
    count: 912,
    description: 'Payment reversed but advance was covered → No clawback needed',
  },
  // PAC paths (no advance = no clawback possible)
  {
    orderType: 'PAC',
    trigger: 'DEFAULT',
    hasAdvance: false,
    advanceEarned: false,
    outcome: 'SHORTFALL',
    dbStatuses: ['DEFAULTED', 'DEFAULTED_SETTLED'],
    count: 446 + 2362,
    description: 'No advance given → Nothing to claw back, only lost future payments',
  },
  {
    orderType: 'PAC',
    trigger: 'CANCEL',
    hasAdvance: false,
    advanceEarned: false,
    outcome: 'SHORTFALL',
    dbStatuses: ['CANCELED_SETTLED'],
    count: 730,
    description: 'No advance given → Nothing to claw back',
  },
  {
    orderType: 'PAC',
    trigger: 'CHARGEBACK',
    hasAdvance: false,
    advanceEarned: false,
    outcome: 'SHORTFALL',
    dbStatuses: ['CHARGEBACK_SETTLED'],
    count: 312,
    description: 'No advance given → Nothing to claw back',
  },
  // Edge case: PAC with legacy advance (rare)
  {
    orderType: 'PAC',
    trigger: 'DEFAULT',
    hasAdvance: true,
    advanceEarned: false,
    outcome: 'CLAWBACK',
    dbStatuses: ['CLAWBACK_COMPLETE'],
    count: 23, // SERVICING CLAWBACK_COMPLETE
    description: 'Legacy PAC order with advance → Rare clawback',
  },
]

// =============================================================================
// SUMMARY STATS
// =============================================================================

const SUMMARY_STATS = {
  totalRiskOrders: FLOW_PATHS.reduce((sum, p) => sum + p.count, 0),
  totalClawbacks: FLOW_PATHS.filter(p => p.outcome === 'CLAWBACK').reduce((sum, p) => sum + p.count, 0),
  totalShortfalls: FLOW_PATHS.filter(p => p.outcome === 'SHORTFALL').reduce((sum, p) => sum + p.count, 0),
  upfrontClawbacks: FLOW_PATHS.filter(p => p.orderType === 'UPFRONT' && p.outcome === 'CLAWBACK').reduce((sum, p) => sum + p.count, 0),
  pacShortfalls: FLOW_PATHS.filter(p => p.orderType === 'PAC' && p.outcome === 'SHORTFALL').reduce((sum, p) => sum + p.count, 0),
}

// =============================================================================
// NODE COMPONENTS
// =============================================================================

interface NodeProps {
  label: string
  sublabel?: string
  color: 'blue' | 'teal' | 'amber' | 'red' | 'gray' | 'emerald'
  size?: 'sm' | 'md' | 'lg'
  count?: number
  isActive?: boolean
  onClick?: () => void
}

function Node({ label, sublabel, color, size = 'md', count, isActive, onClick }: NodeProps) {
  const colorStyles = {
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    teal: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    red: 'bg-red-500/10 border-red-500/30 text-red-400',
    gray: 'bg-gray-500/10 border-gray-500/30 text-gray-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  }

  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center rounded-xl border-2 transition-all
        ${colorStyles[color]} ${sizeStyles[size]}
        ${isActive ? 'ring-2 ring-white/20 scale-105' : 'hover:scale-102'}
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
      `}
    >
      <span className="font-semibold">{label}</span>
      {sublabel && <span className="text-xs opacity-70">{sublabel}</span>}
      {count !== undefined && (
        <span className="mt-1 text-xs opacity-60 tabular-nums">{count.toLocaleString()}</span>
      )}
    </button>
  )
}

// =============================================================================
// CONNECTOR LINE
// =============================================================================

function Connector({ direction = 'down', label }: { direction?: 'down' | 'right' | 'split'; label?: string }) {
  if (direction === 'split') {
    return (
      <div className="flex items-center justify-center gap-1 py-2">
        <div className="h-8 w-px bg-gray-600" />
        <span className="text-tertiary text-xs px-2">{label}</span>
        <div className="h-8 w-px bg-gray-600" />
      </div>
    )
  }

  if (direction === 'right') {
    return (
      <div className="flex items-center gap-1 px-2">
        <div className="h-px w-8 bg-gray-600" />
        {label && <span className="text-tertiary text-xs">{label}</span>}
        <div className="h-px w-8 bg-gray-600" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center py-1">
      <div className="h-6 w-px bg-gray-600" />
      {label && <span className="text-tertiary text-xs">{label}</span>}
    </div>
  )
}

// =============================================================================
// FLOW DIAGRAM
// =============================================================================

function FlowDiagram({ selectedPath, onSelectPath }: {
  selectedPath: FlowPath | null
  onSelectPath: (path: FlowPath | null) => void
}) {
  return (
    <div className="bg-secondary rounded-2xl p-8">
      {/* Level 1: Order Types */}
      <div className="flex justify-center gap-32 mb-2">
        <Node label="Order in Repayment" color="blue" size="lg" />
      </div>

      <Connector />

      {/* Level 2: Risk Event */}
      <div className="flex justify-center gap-8 mb-2">
        <Node label="Risk Event" sublabel="Payment stops" color="amber" />
      </div>

      <div className="flex items-center justify-center gap-1 py-2">
        <span className="text-tertiary text-xs px-4">triggers one of</span>
      </div>

      {/* Level 3: Risk Triggers */}
      <div className="flex justify-center gap-6 mb-2">
        <Node label="Default" sublabel="Stops paying" color="red" size="sm" />
        <Node label="Cancel" sublabel="Order terminated" color="amber" size="sm" />
        <Node label="Chargeback" sublabel="Payment reversed" color="red" size="sm" />
      </div>

      <Connector />

      {/* Level 4: The Key Decision Point */}
      <div className="flex justify-center mb-2">
        <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-4 text-center">
          <span className="text-secondary text-sm font-medium">Decision Point</span>
          <p className="text-xs text-tertiary mt-1">Was there an unearned advance?</p>
        </div>
      </div>

      {/* Split into two paths */}
      <div className="flex justify-center gap-16 mt-4">
        {/* Path A: Clawback */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-tertiary mb-2">YES - Advance not fully covered</div>
          <div className="h-4 w-px bg-red-500/50" />
          <Node
            label="CLAWBACK"
            sublabel="Money taken back"
            color="red"
            size="lg"
            count={SUMMARY_STATS.totalClawbacks}
          />
          <div className="mt-4 text-xs text-tertiary text-center max-w-40">
            <p className="font-medium text-red-400">When:</p>
            <p>Upfront order with unearned advance</p>
          </div>
        </div>

        {/* Path B: Shortfall */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-tertiary mb-2">NO - Advance was covered OR no advance</div>
          <div className="h-4 w-px bg-emerald-500/50" />
          <Node
            label="SHORTFALL"
            sublabel="No clawback"
            color="emerald"
            size="lg"
            count={SUMMARY_STATS.totalShortfalls}
          />
          <div className="mt-4 text-xs text-tertiary text-center max-w-40">
            <p className="font-medium text-emerald-400">When:</p>
            <p>PAC order (no advance)</p>
            <p>OR Upfront with advance covered</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// MATRIX VIEW
// =============================================================================

function OutcomeMatrix() {
  return (
    <div className="bg-secondary rounded-2xl p-6">
      <h3 className="text-primary text-sm font-semibold mb-4">Outcome Matrix</h3>

      <div className="overflow-hidden rounded-lg border border-gray-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800/50">
              <th className="px-4 py-3 text-left text-tertiary font-medium">Trigger</th>
              <th className="px-4 py-3 text-center text-tertiary font-medium">
                <div>Upfront</div>
                <div className="text-xs font-normal">Unearned Advance</div>
              </th>
              <th className="px-4 py-3 text-center text-tertiary font-medium">
                <div>Upfront</div>
                <div className="text-xs font-normal">Advance Covered</div>
              </th>
              <th className="px-4 py-3 text-center text-tertiary font-medium">
                <div>PAC</div>
                <div className="text-xs font-normal">No Advance</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {(['DEFAULT', 'CANCEL', 'CHARGEBACK'] as RiskTrigger[]).map((trigger) => (
              <tr key={trigger} className="border-t border-gray-700">
                <td className="px-4 py-3 font-medium text-primary">{trigger}</td>
                <td className="px-4 py-3 text-center">
                  <Badge color="error" size="xs">CLAWBACK</Badge>
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge color="success" size="xs">SHORTFALL</Badge>
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge color="success" size="xs">SHORTFALL</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-tertiary text-xs mt-4">
        <strong className="text-secondary">Key insight:</strong> Clawbacks only occur when there&apos;s an unearned advance to recover.
        PAC orders and Upfront orders with sufficient pay progress result in shortfalls (no clawback).
      </p>
    </div>
  )
}

// =============================================================================
// PATH DETAIL LIST
// =============================================================================

function PathDetailList({ paths }: { paths: FlowPath[] }) {
  return (
    <div className="bg-secondary rounded-2xl p-6">
      <h3 className="text-primary text-sm font-semibold mb-4">All Paths by Count</h3>
      <div className="space-y-3">
        {paths.sort((a, b) => b.count - a.count).map((path, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30">
            <Badge
              color={path.outcome === 'CLAWBACK' ? 'error' : 'success'}
              size="xs"
            >
              {path.outcome}
            </Badge>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-primary text-sm font-medium">
                  {path.orderType} + {path.trigger}
                </span>
                <span className="text-tertiary text-xs">
                  ({path.count.toLocaleString()} orders)
                </span>
              </div>
              <p className="text-tertiary text-xs mt-1">{path.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {path.dbStatuses.map((status) => (
                  <code key={status} className="text-xs bg-gray-700/50 px-1.5 py-0.5 rounded text-blue-300">
                    {status}
                  </code>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// STATS CARDS
// =============================================================================

function StatsCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-secondary rounded-xl p-4">
        <div className="text-tertiary text-xs mb-1">Total Risk Orders</div>
        <div className="text-primary text-2xl font-semibold tabular-nums">
          {SUMMARY_STATS.totalRiskOrders.toLocaleString()}
        </div>
      </div>
      <div className="bg-secondary rounded-xl p-4">
        <div className="text-tertiary text-xs mb-1">Clawbacks</div>
        <div className="text-red-400 text-2xl font-semibold tabular-nums">
          {SUMMARY_STATS.totalClawbacks.toLocaleString()}
        </div>
        <div className="text-tertiary text-xs mt-1">
          {((SUMMARY_STATS.totalClawbacks / SUMMARY_STATS.totalRiskOrders) * 100).toFixed(1)}% of risk
        </div>
      </div>
      <div className="bg-secondary rounded-xl p-4">
        <div className="text-tertiary text-xs mb-1">Shortfalls (No Clawback)</div>
        <div className="text-emerald-400 text-2xl font-semibold tabular-nums">
          {SUMMARY_STATS.totalShortfalls.toLocaleString()}
        </div>
        <div className="text-tertiary text-xs mt-1">
          {((SUMMARY_STATS.totalShortfalls / SUMMARY_STATS.totalRiskOrders) * 100).toFixed(1)}% of risk
        </div>
      </div>
      <div className="bg-secondary rounded-xl p-4">
        <div className="text-tertiary text-xs mb-1">PAC Default (Pure Shortfall)</div>
        <div className="text-teal-400 text-2xl font-semibold tabular-nums">
          {SUMMARY_STATS.pacShortfalls.toLocaleString()}
        </div>
        <div className="text-tertiary text-xs mt-1">Never has clawback</div>
      </div>
    </div>
  )
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function ClawbackFlowPage() {
  const [selectedPath, setSelectedPath] = useState<FlowPath | null>(null)
  const [viewMode, setViewMode] = useState<'diagram' | 'matrix'>('diagram')

  return (
    <div className="bg-secondary_alt min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-primary mb-2 text-2xl font-semibold">
            Clawback Flow Visualization
          </h1>
          <p className="text-secondary text-sm">
            All paths for risk-related order terminations: when do they result in a clawback vs shortfall?
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <StatsCards />
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setViewMode('diagram')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'diagram'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-gray-800/50 text-tertiary hover:text-secondary'
            }`}
          >
            Flow Diagram
          </button>
          <button
            onClick={() => setViewMode('matrix')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'matrix'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-gray-800/50 text-tertiary hover:text-secondary'
            }`}
          >
            Matrix View
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            {viewMode === 'diagram' ? (
              <FlowDiagram selectedPath={selectedPath} onSelectPath={setSelectedPath} />
            ) : (
              <OutcomeMatrix />
            )}
          </div>
          <div>
            <PathDetailList paths={FLOW_PATHS} />
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-blue-400 font-semibold mb-2">Key Takeaway</h3>
          <div className="text-secondary text-sm space-y-2">
            <p>
              <strong className="text-primary">Clawback</strong> = Money taken back from creator (unearned advance must be returned)
            </p>
            <p>
              <strong className="text-primary">Shortfall</strong> = Lost expected revenue, but no money taken back
            </p>
            <p className="text-tertiary text-xs mt-4">
              PAC orders never have clawbacks (no advance given). Upfront orders only have clawbacks
              if the customer hadn&apos;t paid enough to cover the advance before the risk event.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-tertiary mt-6 text-xs">
          <p><strong className="text-secondary">Data source:</strong> Production database (contracts table)</p>
          <p><strong className="text-secondary">Related doc:</strong> /docs/temp/order-status-unification/INDEX.md</p>
        </div>
      </div>
    </div>
  )
}
