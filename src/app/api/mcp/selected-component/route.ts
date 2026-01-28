import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'

// Block in production - this API is for local development only
const isDev = process.env.NODE_ENV === 'development'
const notAvailable = () => NextResponse.json({ error: 'Not available' }, { status: 404 })

const STATE_DIR = path.join(os.homedir(), '.app-mcp-bridge')
const SELECTED_FILE = path.join(STATE_DIR, 'selected-component.json')
const HISTORY_DIR = path.join(STATE_DIR, 'history')
const MAX_HISTORY_FILES = 5 // Keep only last 5 selections

async function ensureStateDir() {
  try {
    await fs.mkdir(STATE_DIR, { recursive: true })
    await fs.mkdir(HISTORY_DIR, { recursive: true })
  } catch {
    // Directories exist
  }
}

// Clean up old history files
async function cleanupHistory() {
  try {
    const files = await fs.readdir(HISTORY_DIR)
    const historyFiles = files
      .filter(f => f.endsWith('.json'))
      .map(f => ({
        name: f,
        path: path.join(HISTORY_DIR, f),
        mtime: 0
      }))
    
    // Get modification times
    for (const file of historyFiles) {
      try {
        const stat = await fs.stat(file.path)
        file.mtime = stat.mtime.getTime()
      } catch {
        // Ignore stat errors
      }
    }
    
    // Sort by modification time (newest first)
    historyFiles.sort((a, b) => b.mtime - a.mtime)
    
    // Delete old files beyond limit
    for (let i = MAX_HISTORY_FILES; i < historyFiles.length; i++) {
      try {
        await fs.unlink(historyFiles[i].path)
      } catch {
        // Ignore deletion errors
      }
    }
  } catch {
    // Ignore cleanup errors
  }
}

export interface ElementBounds {
  x: number
  y: number
  width: number
  height: number
}

export interface SelectedComponent {
  name: string
  filePath: string | null
  lineNumber: number | null
  props: Record<string, unknown>
  bounds: ElementBounds | null
  selector: string | null
  timestamp: number
}

export async function GET() {
  if (!isDev) return notAvailable()
  try {
    await ensureStateDir()
    const data = await fs.readFile(SELECTED_FILE, 'utf-8')
    const component = JSON.parse(data) as SelectedComponent
    return NextResponse.json(component)
  } catch {
    return NextResponse.json(null)
  }
}

export async function POST(request: NextRequest) {
  if (!isDev) return notAvailable()
  try {
    await ensureStateDir()
    const component = await request.json() as SelectedComponent
    component.timestamp = Date.now()
    
    // Save to main file
    await fs.writeFile(SELECTED_FILE, JSON.stringify(component, null, 2))
    
    // Save to history with timestamp
    const historyFile = path.join(HISTORY_DIR, `selection-${component.timestamp}.json`)
    await fs.writeFile(historyFile, JSON.stringify(component, null, 2))
    
    // Clean up old history files
    await cleanupHistory()
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save selection', details: String(error) },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  if (!isDev) return notAvailable()
  try {
    await fs.unlink(SELECTED_FILE)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: true })
  }
}
