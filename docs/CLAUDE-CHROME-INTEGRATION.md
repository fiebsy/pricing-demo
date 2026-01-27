# Claude Chrome Integration Guide

> Integration specification for connecting the Claude Chrome extension to the MCP Browser Bridge.

---

## Overview

This document outlines how **Claude Chrome** extension can integrate with the **MCP Browser Bridge** to enable seamless component inspection and bidirectional communication between the browser and Claude Code.

### What This Enables

1. **Select-to-Inspect**: User clicks a component → Claude Chrome captures it → Claude Code receives the selection
2. **AI-Assisted Editing**: Claude Code edits source → triggers hot reload → user sees changes instantly
3. **Visual Debugging**: Claude Code can highlight elements, scroll to components, and navigate pages

---

## Integration Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Browser                                     │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │  Claude Chrome    │◄──►│  Content Script │◄──►│  React App      │ │
│  │  (Extension)    │    │  (Injected)     │    │  (Page)         │ │
│  └────────┬────────┘    └─────────────────┘    └─────────────────┘ │
│           │                                                          │
└───────────┼──────────────────────────────────────────────────────────┘
            │
            ▼ HTTP (localhost)
┌─────────────────────────────────────────────────────────────────────┐
│  Next.js API Routes (/api/mcp/*)                                    │
│  ├── /selected-component  (POST selection, GET current)             │
│  ├── /actions             (POST from Claude, GET poll for browser)  │
│  └── /state               (GET full bridge state)                   │
└─────────────────────────────────────────────────────────────────────┘
            │
            ▼ File System (~/.app-mcp-bridge/)
┌─────────────────────────────────────────────────────────────────────┐
│  MCP Server (stdio) ◄──► Claude Code                                │
└─────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoints

All endpoints are relative to the app's base URL (default: `http://localhost:3002`).

### 1. POST `/api/mcp/selected-component`

**Purpose**: Send component selection from browser to Claude Code.

**Request Body**:
```json
{
  "name": "Button",
  "filePath": "/Users/dev/project/src/components/Button.tsx",
  "lineNumber": 42,
  "props": {
    "variant": "primary",
    "size": "md",
    "disabled": false
  }
}
```

**Response**:
```json
{ "success": true }
```

**Notes**:
- `filePath` should be absolute path to source file
- `props` should exclude functions (replace with `"[function]"`)
- `lineNumber` is optional but helpful for navigation

---

### 2. GET `/api/mcp/selected-component`

**Purpose**: Retrieve current selection (useful for sync verification).

**Response**:
```json
{
  "name": "Button",
  "filePath": "/Users/dev/project/src/components/Button.tsx",
  "lineNumber": 42,
  "props": { "variant": "primary" },
  "timestamp": 1706185200000
}
```

---

### 3. GET `/api/mcp/actions`

**Purpose**: Poll for pending actions from Claude Code.

**Response**:
```json
[
  {
    "id": "uuid-1234",
    "type": "highlight",
    "payload": { "selector": "[data-testid='submit-btn']" },
    "timestamp": 1706185200000
  }
]
```

**Important**: This endpoint **clears** actions after reading. Each action should only be executed once.

**Action Types**:

| Type | Payload | Browser Action |
|------|---------|----------------|
| `refresh` | `{}` | `window.location.reload()` |
| `navigate` | `{ url: "/path" }` | `window.location.href = url` |
| `highlight` | `{ selector: ".class" }` | Add green outline for 3s |
| `scroll_to` | `{ selector: "#id" }` | `element.scrollIntoView()` |
| `custom` | Any | Pass to extension handler |

---

### 4. GET `/api/mcp/state`

**Purpose**: Get full bridge state (selection + pending actions).

**Response**:
```json
{
  "selectedComponent": {
    "name": "Button",
    "filePath": "...",
    "props": {}
  },
  "pendingActions": [],
  "timestamp": 1706185200000
}
```

---

## React Fiber Inspection

To extract component information from the DOM, Claude Chrome should use React's internal fiber structure:

### Getting the Fiber from DOM Element

```javascript
function getFiberFromElement(element) {
  const key = Object.keys(element).find(
    key => key.startsWith('__reactFiber$') ||
           key.startsWith('__reactInternalInstance$')
  );
  return key ? element[key] : null;
}
```

### Finding User Components (Skip DOM Elements)

```javascript
function findUserComponent(fiber) {
  let current = fiber;

  while (current) {
    // Skip string types (DOM elements like 'div', 'span')
    if (current.type && typeof current.type !== 'string') {
      const name = current.type.displayName || current.type.name;
      if (name && !name.startsWith('_') && name !== 'Fragment') {
        return current;
      }
    }
    current = current.return;
  }

  return null;
}
```

### Extracting Component Info

```javascript
function extractComponentInfo(fiber, element) {
  const type = fiber.type;
  const name = type?.displayName || type?.name || 'Unknown';
  const debugSource = fiber._debugSource;

  return {
    name,
    filePath: debugSource?.fileName || null,
    lineNumber: debugSource?.lineNumber || null,
    props: serializeProps(fiber.memoizedProps || {}),
    // Include element rect for visual feedback
    rect: element.getBoundingClientRect()
  };
}
```

### Props Serialization (Important!)

```javascript
function serializeProps(props, depth = 0, seen = new WeakSet()) {
  if (depth > 5) return '[max depth]';
  if (props === null || props === undefined) return props;
  if (typeof props === 'function') return '[function]';
  if (typeof props === 'symbol') return '[symbol]';

  if (typeof props === 'object') {
    if (seen.has(props)) return '[circular]';
    seen.add(props);

    // Skip React elements
    if (props.$$typeof) return '[React element]';

    if (Array.isArray(props)) {
      return props.slice(0, 10).map(v => serializeProps(v, depth + 1, seen));
    }

    const result = {};
    for (const [key, value] of Object.entries(props).slice(0, 20)) {
      if (key === 'children' || key.startsWith('_')) continue;
      result[key] = serializeProps(value, depth + 1, seen);
    }
    return result;
  }

  return props;
}
```

---

## Integration Checklist

### Phase 1: Basic Connection

- [ ] **Detect MCP-enabled pages**: Check for `/api/mcp/state` endpoint availability
- [ ] **Display connection status**: Show indicator when bridge is available
- [ ] **Implement action polling**: Poll `/api/mcp/actions` every 1000ms when connected

### Phase 2: Component Selection

- [ ] **Add inspection mode toggle**: Keyboard shortcut (suggest `Cmd+Shift+I`)
- [ ] **Implement hover highlighting**: Blue border on hovered components
- [ ] **Implement click selection**: Green border + POST to `/api/mcp/selected-component`
- [ ] **Show selection panel**: Display component name, file path, props

### Phase 3: Action Execution

- [ ] **Handle `refresh` action**: Trigger page reload
- [ ] **Handle `navigate` action**: Navigate to specified URL
- [ ] **Handle `highlight` action**: Add temporary visual highlight
- [ ] **Handle `scroll_to` action**: Scroll element into view
- [ ] **Handle `custom` action**: Pass to extension-specific handler

### Phase 4: Enhanced Features (Optional)

- [ ] **Component tree view**: Show React component hierarchy
- [ ] **Props editing**: Allow editing props and syncing back
- [ ] **State inspection**: Show component state (if accessible)
- [ ] **Performance metrics**: Show render counts, timing

---

## Chrome Extension Permissions

Required permissions in `manifest.json`:

```json
{
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "host_permissions": [
    "http://localhost:*/*",
    "http://127.0.0.1:*/*"
  ],
  "content_scripts": [
    {
      "matches": ["http://localhost:*/*", "http://127.0.0.1:*/*"],
      "js": ["content-script.js"],
      "run_at": "document_idle"
    }
  ]
}
```

---

## Content Script Template

```javascript
// content-script.js

const MCP_POLL_INTERVAL = 1000;
let isInspecting = false;
let mcpAvailable = false;

// Check if MCP bridge is available
async function checkMCPAvailability() {
  try {
    const response = await fetch('/api/mcp/state');
    mcpAvailable = response.ok;
    return mcpAvailable;
  } catch {
    mcpAvailable = false;
    return false;
  }
}

// Send component selection
async function sendSelection(componentInfo) {
  if (!mcpAvailable) return;

  try {
    await fetch('/api/mcp/selected-component', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(componentInfo)
    });
  } catch (error) {
    console.error('Failed to send selection:', error);
  }
}

// Poll for actions
async function pollActions() {
  if (!mcpAvailable) return;

  try {
    const response = await fetch('/api/mcp/actions');
    const actions = await response.json();

    for (const action of actions) {
      executeAction(action);
    }
  } catch {
    // Ignore poll errors
  }
}

// Execute action from Claude Code
function executeAction(action) {
  switch (action.type) {
    case 'refresh':
      window.location.reload();
      break;
    case 'navigate':
      if (action.payload?.url) {
        window.location.href = action.payload.url;
      }
      break;
    case 'highlight':
      highlightElement(action.payload?.selector);
      break;
    case 'scroll_to':
      scrollToElement(action.payload?.selector);
      break;
    case 'custom':
      // Send to extension popup/background for handling
      chrome.runtime.sendMessage({ type: 'custom_action', action });
      break;
  }
}

// Visual feedback helpers
function highlightElement(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  const originalOutline = el.style.outline;
  el.style.outline = '3px solid #22c55e';
  el.style.outlineOffset = '2px';

  setTimeout(() => {
    el.style.outline = originalOutline;
    el.style.outlineOffset = '';
  }, 3000);
}

function scrollToElement(selector) {
  const el = document.querySelector(selector);
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Initialize
async function init() {
  const available = await checkMCPAvailability();

  if (available) {
    console.log('[Claude Chrome] MCP bridge detected');
    setInterval(pollActions, MCP_POLL_INTERVAL);

    // Notify extension popup
    chrome.runtime.sendMessage({ type: 'mcp_available', available: true });
  }
}

init();
```

---

## Testing the Integration

### 1. Verify API Endpoints

```bash
# Check state endpoint
curl http://localhost:3002/api/mcp/state

# Post a test selection
curl -X POST http://localhost:3002/api/mcp/selected-component \
  -H "Content-Type: application/json" \
  -d '{"name":"TestComponent","filePath":"/test/path.tsx","props":{}}'

# Verify selection
curl http://localhost:3002/api/mcp/selected-component

# Post a test action
curl -X POST http://localhost:3002/api/mcp/actions \
  -H "Content-Type: application/json" \
  -d '{"type":"highlight","payload":{"selector":"body"}}'

# Poll actions (should return and clear)
curl http://localhost:3002/api/mcp/actions
```

### 2. Test with Claude Code

1. Open Claude Code in the project directory
2. Run `/mcp` to verify `app-bridge` is connected
3. Say "Get the selected component" - should return current selection
4. Say "Trigger a hot reload" - browser should refresh

### 3. Full Workflow Test

1. Enable Claude Chrome inspection mode
2. Click on a component
3. Verify selection appears in Claude Code
4. Ask Claude Code to modify the component
5. Verify hot reload triggers
6. See changes in browser

---

## Troubleshooting

### "MCP bridge not detected"

- Ensure the Next.js app is running (`pnpm dev`)
- Check that the app is on the expected port (default: 3002)
- Verify CORS isn't blocking requests (shouldn't be an issue on localhost)

### "Component filePath is null"

- React DevTools must be in development mode
- Some components (anonymous functions) don't have debug info
- Check that source maps are enabled

### "Actions not executing"

- Verify polling is running (check network tab for `/api/mcp/actions` calls)
- Check that actions aren't being consumed by another client
- Ensure the action type handler is implemented

---

## Contact & Support

For questions about this integration:
- **Skwircle Repo**: Issues/discussions in the demo-repo
- **MCP Documentation**: https://modelcontextprotocol.io

---

*Last Updated: January 2025*
