import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'

// Block in production - this API is for local development only
const isDev = process.env.NODE_ENV === 'development'
const notAvailable = () => NextResponse.json({ error: 'Not available' }, { status: 404 })

const STATE_DIR = path.join(os.homedir(), '.app-mcp-bridge')
const ACTIONS_FILE = path.join(STATE_DIR, 'actions.json')

async function ensureStateDir() {
  try {
    await fs.mkdir(STATE_DIR, { recursive: true })
  } catch {
    // Directory exists
  }
}

export interface BrowserAction {
  id: string
  type: 'refresh' | 'navigate' | 'highlight' | 'scroll_to' | 'custom'
  payload?: Record<string, unknown>
  timestamp: number
}

async function readActions(): Promise<BrowserAction[]> {
  try {
    const data = await fs.readFile(ACTIONS_FILE, 'utf-8')
    return JSON.parse(data) as BrowserAction[]
  } catch {
    return []
  }
}

async function writeActions(actions: BrowserAction[]) {
  await ensureStateDir()
  await fs.writeFile(ACTIONS_FILE, JSON.stringify(actions, null, 2))
}

// GET - Poll for pending actions (browser calls this)
export async function GET() {
  if (!isDev) return notAvailable()
  try {
    const actions = await readActions()
    // Clear actions after reading (consumed by browser)
    await writeActions([])
    return NextResponse.json(actions)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get actions', details: String(error) },
      { status: 500 }
    )
  }
}

// POST - Add new action (MCP server calls this via HTTP)
export async function POST(request: NextRequest) {
  if (!isDev) return notAvailable()
  try {
    await ensureStateDir()
    const action = await request.json() as Omit<BrowserAction, 'id' | 'timestamp'>

    const fullAction: BrowserAction = {
      id: crypto.randomUUID(),
      ...action,
      timestamp: Date.now(),
    }

    const actions = await readActions()
    actions.push(fullAction)
    await writeActions(actions)

    return NextResponse.json({ success: true, actionId: fullAction.id })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add action', details: String(error) },
      { status: 500 }
    )
  }
}

// DELETE - Clear all pending actions
export async function DELETE() {
  if (!isDev) return notAvailable()
  try {
    await writeActions([])
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: true })
  }
}
