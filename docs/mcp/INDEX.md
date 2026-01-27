# MCP AppBridge Documentation

> Model Context Protocol integration for browser-to-Claude communication with component inspection and screenshot capabilities.

---

## Overview

The **AppBridge MCP** enables bidirectional communication between Claude Code and the browser, allowing:

- **Component Inspection**: Select React components in the browser, get their info in Claude
- **Screenshot Capture**: Take pixel-accurate screenshots of components, elements, or pages
- **Browser Control**: Trigger refreshes, navigation, and visual highlighting from Claude
- **Source Access**: Read component source files directly from selections

---

## Quick Start

### 1. Start Chrome with Remote Debugging

```bash
# Required for screenshot capability
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9222 \
  --user-data-dir="$HOME/.chrome-debug-profile"
```

Add to `~/.zshrc` for convenience:
```bash
alias chrome-debug='"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222 --user-data-dir="$HOME/.chrome-debug-profile"'
```

### 2. Start the Dev Server

```bash
pnpm dev
```

### 3. Open Browser and Enable Dev Mode

1. Navigate to http://localhost:3002
2. Press `Cmd+Option+I` or click the Dev Mode button (bottom-left)
3. Click on any component to select it

### 4. Use in Claude Code

```
"Take a screenshot of the selected component"
"What component is selected?"
"Show me the source code"
```

---

## MCP Tools Reference

### Screenshot Tools

#### `take_screenshot`

Captures a screenshot from the connected browser.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `scope` | enum | `'selected'` | What to capture |
| `selector` | string | - | CSS selector (for `scope: 'element'`) |
| `padding` | number | `8` | Pixels around element |
| `filename` | string | auto | Custom filename |

**Scope Options:**
- `'selected'` - Currently selected component (via Dev Mode)
- `'element'` - Specific CSS selector
- `'viewport'` - Visible browser area
- `'fullpage'` - Entire scrollable page

**Returns:** `{ path, width, height }` - Use Read tool to view the image.

**Examples:**
```
// Screenshot of selected component
take_screenshot({ scope: 'selected' })

// Screenshot of specific element
take_screenshot({ scope: 'element', selector: '#main-nav', padding: 16 })

// Full page screenshot
take_screenshot({ scope: 'fullpage' })
```

#### `get_browser_connection`

Checks if Chrome is connected via CDP (Chrome DevTools Protocol).

**Returns:**
```json
{
  "connected": true,
  "url": "ws://localhost:9222/devtools/browser/...",
  "message": "Chrome is connected via CDP. Ready to take screenshots."
}
```

---

### Component Inspection Tools

#### `get_selected_component`

Returns the currently selected component from the browser Dev Mode inspector.

**Returns:**
```json
{
  "name": "Button",
  "filePath": "/path/to/Button.tsx",
  "lineNumber": 42,
  "props": { "variant": "primary", "size": "md" },
  "bounds": { "x": 100, "y": 200, "width": 120, "height": 40 },
  "selector": "button.primary:nth-of-type(1)",
  "timestamp": 1706185200000
}
```

#### `get_component_source`

Reads the source code file for a component.

| Parameter | Type | Description |
|-----------|------|-------------|
| `filePath` | string (optional) | Specific file path. If omitted, uses selected component path. |

---

### Browser Control Tools

#### `send_to_browser`

Sends an action to the browser for execution.

| Parameter | Type | Description |
|-----------|------|-------------|
| `actionType` | enum | `'refresh'`, `'navigate'`, `'highlight'`, `'scroll_to'`, `'custom'` |
| `payload` | object | Action-specific data |

**Action Types:**

| Action | Payload | Effect |
|--------|---------|--------|
| `refresh` | `{}` | Reloads the page |
| `navigate` | `{ url: "/path" }` | Navigates to URL |
| `highlight` | `{ selector: ".class" }` | Green outline for 3s |
| `scroll_to` | `{ selector: "#id" }` | Scrolls element into view |

#### `sync_from_browser`

Pulls the latest state from the browser including selected component and pending actions.

#### `trigger_hot_reload`

Shortcut to trigger a page refresh in the browser.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │ Chrome CDP   │◄──►│ React App    │◄──►│ Dev Mode     │      │
│  │ (port 9222)  │    │ (port 3002)  │    │ Inspector    │      │
│  └──────┬───────┘    └──────┬───────┘    └──────────────┘      │
└─────────┼───────────────────┼───────────────────────────────────┘
          │                   │
          │ WebSocket         │ HTTP
          │                   │
┌─────────┴───────────────────┴───────────────────────────────────┐
│                      MCP Server                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │ Puppeteer    │    │ API Client   │    │ File System  │      │
│  │ Bridge       │    │ (HTTP)       │    │ (~/.app-mcp) │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
└─────────────────────────────────────────────────────────────────┘
          │
          │ stdio
          ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Claude Code                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Component Selection:**
   - User enables Dev Mode (`Cmd+Option+I`)
   - User clicks component → bounds + selector captured
   - Data saved to `~/.app-mcp-bridge/selected-component.json`
   - Claude retrieves via `get_selected_component`

2. **Screenshot Capture:**
   - Claude calls `take_screenshot`
   - MCP server connects to Chrome via CDP (ws://localhost:9222)
   - Puppeteer captures screenshot at element bounds
   - Image saved to `~/.app-mcp-bridge/screenshots/`
   - Claude uses Read tool to view the image

---

## File Locations

| Path | Purpose |
|------|---------|
| `~/.app-mcp-bridge/` | MCP state directory |
| `~/.app-mcp-bridge/selected-component.json` | Current component selection |
| `~/.app-mcp-bridge/screenshots/` | Screenshot storage (auto-cleaned) |
| `~/.chrome-debug-profile/` | Chrome debug profile data |

Screenshots are automatically cleaned up:
- Files older than 24 hours are deleted
- Maximum 50 screenshots kept

---

## Configuration

### `.mcp.json`

```json
{
  "mcpServers": {
    "app-bridge": {
      "command": "npx",
      "args": ["tsx", "mcp/server.ts"],
      "env": {
        "APP_URL": "http://localhost:3002",
        "PROJECT_ROOT": ".",
        "CDP_URL": "http://localhost:9222"
      }
    }
  }
}
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_URL` | `http://localhost:3002` | Next.js dev server URL |
| `PROJECT_ROOT` | `.` | Project root for file path resolution |
| `CDP_URL` | `http://localhost:9222` | Chrome DevTools Protocol URL |

---

## Troubleshooting

### Screenshot Issues

**"Chrome not connected"**
```bash
# Verify Chrome is running with CDP
curl http://localhost:9222/json/version

# If not, start Chrome with:
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9222 \
  --user-data-dir="$HOME/.chrome-debug-profile"
```

**"No active page found"**
- Open a page in the Chrome debug instance
- Navigate to http://localhost:3002

**"Selected component has no selector or bounds"**
- Re-select a component in Dev Mode
- Ensure Dev Mode is enabled (green indicator)

### Component Selection Issues

**"No component selected"**
- Enable Dev Mode (`Cmd+Option+I`)
- Click directly on a component, not empty space

**"filePath is null"**
- Component may be third-party without source maps
- Select a component defined in this project
- Ensure running in development mode

### MCP Connection Issues

**"MCP server not found"**
- Check `.mcp.json` exists in project root
- Run `pnpm install` to ensure dependencies
- Test manually: `npx tsx mcp/server.ts`

**Tools not appearing after code changes**
- Restart Claude Code to reload MCP server

---

## Related Documentation

| Topic | Location |
|-------|----------|
| Test Plan | `docs/MCP-BRIDGE-TEST-PLAN.md` |
| Chrome Extension Guide | `docs/CLAUDE-CHROME-INTEGRATION.md` |
| API Routes | `src/app/api/mcp/` |
| MCP Server | `mcp/server.ts` |
| Puppeteer Bridge | `mcp/puppeteer-bridge.ts` |

---

*Last Updated: January 2025*
