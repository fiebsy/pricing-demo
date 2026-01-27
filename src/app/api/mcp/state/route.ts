import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'

// Block in production - this API is for local development only
const isDev = process.env.NODE_ENV === 'development'
const notAvailable = () => NextResponse.json({ error: 'Not available' }, { status: 404 })

const STATE_DIR = path.join(os.homedir(), '.app-mcp-bridge')
const SELECTED_FILE = path.join(STATE_DIR, 'selected-component.json')
const ACTIONS_FILE = path.join(STATE_DIR, 'actions.json')

export interface BridgeState {
  selectedComponent: unknown
  pendingActions: unknown[]
  timestamp: number
}

export async function GET() {
  if (!isDev) return notAvailable()
  try {
    let selectedComponent = null
    let pendingActions: unknown[] = []

    try {
      const selectedData = await fs.readFile(SELECTED_FILE, 'utf-8')
      selectedComponent = JSON.parse(selectedData)
    } catch {
      // No selection
    }

    try {
      const actionsData = await fs.readFile(ACTIONS_FILE, 'utf-8')
      pendingActions = JSON.parse(actionsData)
    } catch {
      // No pending actions
    }

    const state: BridgeState = {
      selectedComponent,
      pendingActions,
      timestamp: Date.now(),
    }

    return NextResponse.json(state)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get state', details: String(error) },
      { status: 500 }
    )
  }
}
