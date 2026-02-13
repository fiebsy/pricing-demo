/**
 * Clawback Tree - Order Outcome Hierarchy
 *
 * Visual tree matching the whiteboard structure:
 * - Active (Healthy / At Risk)
 * - Closed (Completed / Settled / Declined)
 *
 * With focus on the Settled → Clawback vs Lost (no clawback) distinction.
 *
 * Route: /status-organization/clawback-tree
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/core/primitives/badge'

// =============================================================================
// DATA: Database counts from production
// =============================================================================

const DB_COUNTS = {
  // Active > Healthy
  inRepayment: { funding: 5813, servicing: 1560, legacy: 14 },
  modifiedPayment: { funding: 64, servicing: 33 },
  onHold: { funding: 31 + 11, servicing: 29 },

  // Active > At Risk
  inCollections: { funding: 272 + 48, servicing: 210 }, // includes risk_of_clawback
  pendingClawback: {
    default: { funding: 387, servicing: 0 },
    cancel: { funding: 61, servicing: 14 },
    chargeback: { funding: 119, servicing: 75 },
  },
  clawbackInProgress: { funding: 29, servicing: 2 },

  // Closed > Completed
  paidInFull: 3374,

  // Closed > Settled (with clawback)
  clawbackComplete: { funding: 132, servicing: 23 },

  // Closed > Lost (no clawback) - KEY INSIGHT
  settled: {
    default: { funding: 2391, servicing: 2362 + 446 }, // servicing includes DEFAULTED
    cancel: { funding: 1248, servicing: 730 },
    chargeback: { funding: 912, servicing: 312 },
  },

  // Closed > Declined
  declined: 8639,
  duplicate: 812,
}

// =============================================================================
// TREE NODE COMPONENT
// =============================================================================

interface TreeNodeProps {
  label: string
  sublabel?: string
  count?: number
  color: 'blue' | 'teal' | 'amber' | 'red' | 'gray' | 'emerald' | 'purple'
  level: number
  isLast?: boolean
  children?: React.ReactNode
  expanded?: boolean
  onToggle?: () => void
  highlight?: boolean
  tooltip?: string
}

function TreeNode({
  label,
  sublabel,
  count,
  color,
  level,
  isLast,
  children,
  expanded = true,
  onToggle,
  highlight,
  tooltip,
}: TreeNodeProps) {
  const colorStyles = {
    blue: 'bg-blue-500/15 border-blue-500/40 text-blue-400',
    teal: 'bg-teal-500/15 border-teal-500/40 text-teal-400',
    amber: 'bg-amber-500/15 border-amber-500/40 text-amber-400',
    red: 'bg-red-500/15 border-red-500/40 text-red-400',
    gray: 'bg-gray-500/15 border-gray-500/40 text-gray-400',
    emerald: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400',
    purple: 'bg-purple-500/15 border-purple-500/40 text-purple-400',
  }

  const indent = level * 24

  return (
    <div className="relative">
      {/* Connector lines */}
      {level > 0 && (
        <>
          <div
            className="absolute top-0 h-5 w-px bg-gray-600"
            style={{ left: indent - 12 }}
          />
          <div
            className="absolute top-5 h-px bg-gray-600"
            style={{ left: indent - 12, width: 12 }}
          />
          {!isLast && (
            <div
              className="absolute top-5 h-full w-px bg-gray-600"
              style={{ left: indent - 12 }}
            />
          )}
        </>
      )}

      {/* Node */}
      <div
        className={`
          relative inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm
          ${colorStyles[color]}
          ${highlight ? 'ring-2 ring-yellow-500/50' : ''}
          ${onToggle ? 'cursor-pointer hover:opacity-80' : ''}
        `}
        style={{ marginLeft: indent }}
        onClick={onToggle}
        title={tooltip}
      >
        {onToggle && (
          <span className="text-xs opacity-60">{expanded ? '▼' : '▶'}</span>
        )}
        <span className="font-medium">{label}</span>
        {sublabel && <span className="text-xs opacity-70">({sublabel})</span>}
        {count !== undefined && (
          <span className="text-xs opacity-60 tabular-nums ml-1">
            {count.toLocaleString()}
          </span>
        )}
      </div>

      {/* Children */}
      {expanded && children && <div className="mt-2">{children}</div>}
    </div>
  )
}

// =============================================================================
// LEGEND
// =============================================================================

function Legend() {
  return (
    <div className="bg-secondary rounded-xl p-4 mb-6">
      <h3 className="text-secondary text-xs font-medium mb-3">Legend</h3>
      <div className="flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500/50" />
          <span className="text-tertiary">No Clawback (Shortfall)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500/30 border border-red-500/50" />
          <span className="text-tertiary">Has Clawback</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded ring-2 ring-yellow-500/50" />
          <span className="text-tertiary">Key insight (PAC = no clawback)</span>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// SUMMARY INSIGHT
// =============================================================================

function SummaryInsight() {
  const totalClawbacks =
    DB_COUNTS.clawbackComplete.funding +
    DB_COUNTS.clawbackComplete.servicing +
    DB_COUNTS.pendingClawback.default.funding +
    DB_COUNTS.pendingClawback.cancel.funding +
    DB_COUNTS.pendingClawback.cancel.servicing +
    DB_COUNTS.pendingClawback.chargeback.funding +
    DB_COUNTS.pendingClawback.chargeback.servicing

  const totalSettledNoClawback =
    DB_COUNTS.settled.default.funding +
    DB_COUNTS.settled.default.servicing +
    DB_COUNTS.settled.cancel.funding +
    DB_COUNTS.settled.cancel.servicing +
    DB_COUNTS.settled.chargeback.funding +
    DB_COUNTS.settled.chargeback.servicing

  return (
    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 mb-6">
      <h3 className="text-emerald-400 font-semibold mb-3">
        Risk Terminations WITHOUT Clawback
      </h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-3xl font-bold text-emerald-400 tabular-nums">
            {totalSettledNoClawback.toLocaleString()}
          </div>
          <div className="text-tertiary text-sm mt-1">
            Orders settled without clawback (shortfall)
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-red-400 tabular-nums">
            {totalClawbacks.toLocaleString()}
          </div>
          <div className="text-tertiary text-sm mt-1">
            Orders with clawback (pending or complete)
          </div>
        </div>
      </div>
      <p className="text-sm text-secondary mt-4">
        <strong>Why no clawback?</strong> Either PAC order (no advance given) or Upfront order
        where the customer paid enough to cover the advance before the risk event.
      </p>
    </div>
  )
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function ClawbackTreePage() {
  const [expandedSections, setExpandedSections] = useState({
    active: true,
    healthy: true,
    atRisk: true,
    closed: true,
    completed: true,
    settled: true,
    lost: true,
    declined: true,
  })

  const toggle = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="bg-secondary_alt min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/status-organization"
              className="text-tertiary hover:text-secondary text-sm"
            >
              ← Status Organization
            </Link>
          </div>
          <h1 className="text-primary mb-2 text-2xl font-semibold">
            Order Outcome Tree
          </h1>
          <p className="text-secondary text-sm">
            Complete hierarchy of order states with focus on clawback vs no-clawback outcomes.
          </p>
        </div>

        <Legend />
        <SummaryInsight />

        {/* The Tree */}
        <div className="bg-secondary rounded-2xl p-6 space-y-4">
          {/* ACTIVE */}
          <TreeNode
            label="ACTIVE"
            sublabel="in progress"
            color="blue"
            level={0}
            expanded={expandedSections.active}
            onToggle={() => toggle('active')}
          >
            {/* Healthy */}
            <TreeNode
              label="Healthy"
              count={DB_COUNTS.inRepayment.funding + DB_COUNTS.inRepayment.servicing}
              color="teal"
              level={1}
              expanded={expandedSections.healthy}
              onToggle={() => toggle('healthy')}
            >
              <TreeNode
                label="In Repayment"
                sublabel="FUNDING"
                count={DB_COUNTS.inRepayment.funding}
                color="teal"
                level={2}
              />
              <TreeNode
                label="In Repayment"
                sublabel="PAC"
                count={DB_COUNTS.inRepayment.servicing}
                color="teal"
                level={2}
              />
              <TreeNode
                label="Modified Payment"
                count={DB_COUNTS.modifiedPayment.funding + DB_COUNTS.modifiedPayment.servicing}
                color="teal"
                level={2}
              />
              <TreeNode
                label="On Hold / Paused"
                count={DB_COUNTS.onHold.funding + DB_COUNTS.onHold.servicing}
                color="teal"
                level={2}
                isLast
              />
            </TreeNode>

            {/* At Risk */}
            <TreeNode
              label="At Risk"
              color="amber"
              level={1}
              expanded={expandedSections.atRisk}
              onToggle={() => toggle('atRisk')}
              isLast
            >
              <TreeNode
                label="Low Health"
                sublabel="In Collections"
                count={DB_COUNTS.inCollections.funding + DB_COUNTS.inCollections.servicing}
                color="amber"
                level={2}
                tooltip="15-day rescue window"
              />
              <TreeNode
                label="Critical"
                sublabel="Pending Clawback"
                count={
                  DB_COUNTS.pendingClawback.default.funding +
                  DB_COUNTS.pendingClawback.cancel.funding +
                  DB_COUNTS.pendingClawback.cancel.servicing +
                  DB_COUNTS.pendingClawback.chargeback.funding +
                  DB_COUNTS.pendingClawback.chargeback.servicing
                }
                color="red"
                level={2}
                tooltip="72-hour last chance"
              />
              <TreeNode
                label="Clawback In Progress"
                count={DB_COUNTS.clawbackInProgress.funding + DB_COUNTS.clawbackInProgress.servicing}
                color="red"
                level={2}
                isLast
              />
            </TreeNode>
          </TreeNode>

          {/* CLOSED */}
          <TreeNode
            label="CLOSED"
            sublabel="settled"
            color="gray"
            level={0}
            expanded={expandedSections.closed}
            onToggle={() => toggle('closed')}
          >
            {/* Completed */}
            <TreeNode
              label="Completed"
              sublabel="Paid in Full"
              count={DB_COUNTS.paidInFull}
              color="emerald"
              level={1}
            />

            {/* Settled */}
            <TreeNode
              label="Settled"
              sublabel="Risk-terminated"
              color="purple"
              level={1}
              expanded={expandedSections.settled}
              onToggle={() => toggle('settled')}
            >
              {/* Clawback */}
              <TreeNode
                label="Clawback"
                sublabel="money recovered"
                count={DB_COUNTS.clawbackComplete.funding + DB_COUNTS.clawbackComplete.servicing}
                color="red"
                level={2}
              >
                <TreeNode
                  label="Canceled"
                  sublabel="FUNDING"
                  color="red"
                  level={3}
                  tooltip="Creator owed refund for unearned advance"
                />
                <TreeNode
                  label="Defaulted"
                  sublabel="FUNDING"
                  color="red"
                  level={3}
                  tooltip="Customer stopped paying, advance not covered"
                />
                <TreeNode
                  label="Chargeback"
                  sublabel="FUNDING"
                  color="red"
                  level={3}
                  isLast
                  tooltip="Payment reversed, advance not covered"
                />
              </TreeNode>

              {/* Lost (NO Clawback) */}
              <TreeNode
                label="Lost"
                sublabel="no clawback"
                count={
                  DB_COUNTS.settled.default.funding +
                  DB_COUNTS.settled.default.servicing +
                  DB_COUNTS.settled.cancel.funding +
                  DB_COUNTS.settled.cancel.servicing +
                  DB_COUNTS.settled.chargeback.funding +
                  DB_COUNTS.settled.chargeback.servicing
                }
                color="emerald"
                level={2}
                expanded={expandedSections.lost}
                onToggle={() => toggle('lost')}
                isLast
              >
                <TreeNode
                  label="Canceled"
                  sublabel="PAC"
                  count={DB_COUNTS.settled.cancel.servicing}
                  color="emerald"
                  level={3}
                  highlight
                  tooltip="PAC = No advance given = Nothing to claw back"
                />
                <TreeNode
                  label="Canceled"
                  sublabel="FUNDING earned"
                  count={DB_COUNTS.settled.cancel.funding}
                  color="emerald"
                  level={3}
                  tooltip="Advance was covered by payments"
                />
                <TreeNode
                  label="Defaulted"
                  sublabel="PAC"
                  count={DB_COUNTS.settled.default.servicing}
                  color="emerald"
                  level={3}
                  highlight
                  tooltip="PAC = No advance given = Nothing to claw back"
                />
                <TreeNode
                  label="Defaulted"
                  sublabel="FUNDING earned"
                  count={DB_COUNTS.settled.default.funding}
                  color="emerald"
                  level={3}
                  tooltip="Advance was covered by payments"
                />
                <TreeNode
                  label="Chargeback"
                  sublabel="PAC"
                  count={DB_COUNTS.settled.chargeback.servicing}
                  color="emerald"
                  level={3}
                  highlight
                  tooltip="PAC = No advance given = Nothing to claw back"
                />
                <TreeNode
                  label="Chargeback"
                  sublabel="FUNDING earned"
                  count={DB_COUNTS.settled.chargeback.funding}
                  color="emerald"
                  level={3}
                  isLast
                  tooltip="Advance was covered by payments"
                />
              </TreeNode>
            </TreeNode>

            {/* Declined */}
            <TreeNode
              label="Declined"
              sublabel="never started"
              color="gray"
              level={1}
              expanded={expandedSections.declined}
              onToggle={() => toggle('declined')}
              isLast
            >
              <TreeNode
                label="Rejected"
                count={DB_COUNTS.declined}
                color="gray"
                level={2}
              />
              <TreeNode
                label="Duplicate"
                count={DB_COUNTS.duplicate}
                color="gray"
                level={2}
                isLast
              />
            </TreeNode>
          </TreeNode>
        </div>

        {/* Key Takeaway */}
        <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-blue-400 font-semibold mb-2">
            How to display &quot;Lost (No Clawback)&quot;
          </h3>
          <div className="text-secondary text-sm space-y-2">
            <p>
              <strong className="text-emerald-400">Shortfall</strong> = Risk termination where
              no money is taken back from the creator.
            </p>
            <p>Use this distinction in the UI:</p>
            <ul className="list-disc list-inside text-tertiary text-sm space-y-1 ml-2">
              <li>
                <code className="bg-gray-700/50 px-1 rounded">Lost → Clawback</code> = Money
                recovered (red badge)
              </li>
              <li>
                <code className="bg-gray-700/50 px-1 rounded">Lost → Shortfall</code> = No
                recovery needed (neutral badge)
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="text-tertiary mt-6 text-xs">
          <p>
            <strong className="text-secondary">Data source:</strong> Production database
            (2026-02-12)
          </p>
          <p>
            <Link href="/clawback-flow" className="text-blue-400 hover:underline">
              View flow diagram →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
