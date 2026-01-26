# MCP Browser Bridge

> Connect Claude Code to your browser for real-time component inspection and bidirectional communication.

---

## Purpose & Objectives

This MCP (Model Context Protocol) server creates a **bridge between Claude Code and your browser**, enabling:

1. **Component Selection Sync**: Click on any React component in the browser, and Claude Code instantly knows which component you selected, including its file path, props, and source location.

2. **Source Code Access**: Claude Code can read the source file of any selected component without you needing to specify the file path.

3. **Browser Control**: Claude Code can trigger actions in the browser (refresh, navigate, highlight elements) for a seamless development workflow.

4. **Real-time Collaboration**: The bidirectional connection allows for workflows like "click this button" → Claude sees it → edits the code → triggers hot reload → you see the change.

---

## Architecture

```
Browser (React App)          Next.js API Routes           MCP Server (stdio)
┌─────────────────┐         ┌─────────────────┐          ┌─────────────────┐
│ DevInspectorUI  │◄───────►│ /api/mcp/*      │◄────────►│ mcp/server.ts   │
│ useInspector    │  POST   │ - selected-comp │  HTTP    │ Tools:          │
│ useMCPActions   │  GET    │ - actions       │  GET/POST│ - get_selected  │
└─────────────────┘         │ - state         │          │ - read_source   │
                            └─────────────────┘          │ - browser_action│
                                    │                    └─────────────────┘
                                    ▼                            │
                            ~/.app-mcp-bridge/                   │
                            selected-component.json              │
                            actions.json                    Claude Code
```

### Data Flow

1. **Browser → Claude Code**:
   - User clicks component in Dev Mode
   - React fiber inspection extracts component info
   - POST to `/api/mcp/selected-component`
   - Writes to `~/.app-mcp-bridge/selected-component.json`
   - Claude Code reads via `get_selected_component` tool

2. **Claude Code → Browser**:
   - Claude Code calls `send_to_browser` or `trigger_hot_reload`
   - POST to `/api/mcp/actions`
   - Browser polls `/api/mcp/actions` every second
   - Executes action (refresh, navigate, highlight)

---

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start the Dev Server

**Recommended: Start with Claude Code screenshot support**

```bash
pnpm dev:claude
```

This command:
- Launches Chrome with CDP (Chrome DevTools Protocol) enabled on port 9222
- Uses a separate Chrome profile (`~/.chrome-cdp-profile`) to avoid disrupting your main browser
- Opens the app automatically at `http://localhost:3002`
- Starts the Next.js dev server

**Alternative: Standard dev server (no screenshot support)**

```bash
pnpm dev
```

The app runs on `http://localhost:3002` by default.

### 3. Connect Claude Code

The `.mcp.json` file in the project root auto-configures the MCP server. Claude Code will detect it when you open a conversation in this directory.

Verify connection:
```
/mcp
```

You should see `app-bridge` listed as a connected server.

### 4. Enable Dev Mode in Browser

- Click the **"Dev Mode"** button (bottom-left corner), or
- Press `Cmd+Shift+I` (Mac) / `Ctrl+Shift+I` (Windows/Linux)

### 5. Select a Component

Click on any React component. You'll see:
- **Blue border** on hover (inspection mode)
- **Green border** on selection
- **Info panel** showing component name, file path, and props

### 6. Ask Claude Code

Try these prompts:
- "What component is selected?"
- "Show me the source code of the selected component"
- "Trigger a hot reload"

---

## MCP Tools Reference

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_selected_component` | Returns the currently selected component from browser | None |
| `get_component_source` | Reads source file for selected (or specified) component | `filePath?` (optional) |
| `send_to_browser` | Sends an action to the browser | `actionType`, `payload?` |
| `sync_from_browser` | Pulls latest state from browser | None |
| `trigger_hot_reload` | Triggers a browser refresh | None |

### Action Types for `send_to_browser`

| Type | Payload | Description |
|------|---------|-------------|
| `refresh` | None | Reloads the page |
| `navigate` | `{ url: string }` | Navigates to URL |
| `highlight` | `{ selector: string }` | Highlights element (3s) |
| `scroll_to` | `{ selector: string }` | Scrolls element into view |
| `custom` | Any | Handled by `onAction` callback |

---

## Configuration

### Environment Variables

The MCP server uses these env vars (set in `.mcp.json`):

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_URL` | `http://localhost:3002` | Base URL of the Next.js app |
| `PROJECT_ROOT` | `.` | Project root for file path resolution |

### Customizing the Port

If your app runs on a different port, update `.mcp.json`:

```json
{
  "mcpServers": {
    "app-bridge": {
      "command": "npx",
      "args": ["tsx", "mcp/server.ts"],
      "env": {
        "APP_URL": "http://localhost:YOUR_PORT",
        "PROJECT_ROOT": "."
      }
    }
  }
}
```

---

## File Structure

```
mcp/
├── README.md           # This file
└── server.ts           # MCP server implementation

src/
├── app/api/mcp/        # API routes for browser-server communication
│   ├── selected-component/route.ts
│   ├── state/route.ts
│   └── actions/route.ts
├── components/mcp-bridge/
│   ├── DevInspectorOverlay.tsx  # Visual inspector UI
│   ├── MCPProvider.tsx          # React context provider
│   ├── types.ts                 # TypeScript types
│   └── index.ts                 # Public exports
└── hooks/mcp/
    ├── useComponentInspector.ts # React fiber inspection
    ├── useMCPActions.ts         # Action polling & execution
    └── index.ts                 # Hook exports
```

---

## Troubleshooting

### MCP server not connecting

1. Check that the dev server is running: `pnpm dev` or `pnpm dev:claude`
2. Verify `.mcp.json` is in the project root
3. Run `/mcp` in Claude Code to see connection status

### Screenshots not working

If Claude Code can't take screenshots:

1. **Use `pnpm dev:claude`** instead of `pnpm dev` - this automatically starts Chrome with CDP
2. **Verify CDP is running**: `curl http://localhost:9222/json/version`
3. **Manual Chrome launch** (if automatic fails):
   ```bash
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
     --remote-debugging-port=9222 \
     --user-data-dir="$HOME/.chrome-cdp-profile"
   ```
4. **Check for port conflicts**: Another process may be using port 9222
   ```bash
   lsof -i :9222
   ```

### Component selection not syncing

1. Ensure Dev Mode is enabled (green button)
2. Check browser console for errors
3. Verify the API route is accessible: `curl http://localhost:3002/api/mcp/state`

### File path not found

The MCP server resolves paths relative to `PROJECT_ROOT`. If components show `null` for filePath, ensure:
1. Source maps are enabled in development
2. Components have `displayName` set (for anonymous components)

---

## Security Notes

- **Dev Mode Only**: The DevInspectorOverlay only renders when `NODE_ENV === 'development'`
- **Path Validation**: File reads are restricted to the project directory
- **No Network Exposure**: The MCP server uses stdio, not network sockets
- **Props Sanitization**: Functions and circular references are stripped from props

---

## License

MIT
