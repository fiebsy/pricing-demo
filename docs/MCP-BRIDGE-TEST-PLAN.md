# MCP Browser Bridge Test Plan

> Verification steps for the MCP Browser Bridge implementation.

---

## Prerequisites

```bash
cd /Users/derickfiebiger/Payva-Repos/other-repos/demo-repo
pnpm dev --port 3002
```

Wait for "Ready" message before proceeding.

---

## Test Matrix

| Test | Component | Expected | Status |
|------|-----------|----------|--------|
| 1 | API: State endpoint | Returns JSON with selectedComponent | |
| 2 | API: POST selection | Returns `{"success": true}` | |
| 3 | API: POST action | Returns `{"success": true, "actionId": "..."}` | |
| 4 | API: Poll actions | Returns array, then clears | |
| 5 | Browser: Dev Mode toggle | Green button activates | |
| 6 | Browser: Hover highlight | Blue border on hover | |
| 7 | Browser: Click selection | Green border, info panel | |
| 8 | Browser: Sync status | Shows "Synced" after selection | |
| 9 | MCP: Connection | `/mcp` shows `app-bridge` | |
| 10 | MCP: Get selection | Returns component info | |
| 11 | MCP: Read source | Returns file contents | |
| 12 | MCP: Trigger reload | Browser refreshes | |
| 13 | E2E: Full workflow | Select → Edit → Reload → See change | |

---

## Test 1: API State Endpoint

**Command:**
```bash
curl http://localhost:3002/api/mcp/state
```

**Expected Response:**
```json
{
  "selectedComponent": { ... } | null,
  "pendingActions": [],
  "timestamp": 1234567890
}
```

**Pass Criteria:** Returns valid JSON with all fields.

---

## Test 2: API POST Selection

**Command:**
```bash
curl -X POST http://localhost:3002/api/mcp/selected-component \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TestComponent",
    "filePath": "/path/to/file.tsx",
    "lineNumber": 42,
    "props": {"variant": "primary"}
  }'
```

**Expected Response:**
```json
{"success": true}
```

**Verify:**
```bash
curl http://localhost:3002/api/mcp/selected-component
# Should return the posted component
```

---

## Test 3: API POST Action

**Command:**
```bash
curl -X POST http://localhost:3002/api/mcp/actions \
  -H "Content-Type: application/json" \
  -d '{"type": "highlight", "payload": {"selector": "body"}}'
```

**Expected Response:**
```json
{"success": true, "actionId": "uuid-here"}
```

---

## Test 4: API Poll Actions

**Command:**
```bash
# First poll returns actions
curl http://localhost:3002/api/mcp/actions

# Second poll returns empty (actions consumed)
curl http://localhost:3002/api/mcp/actions
```

**Expected:** First returns array (possibly empty if browser consumed), second returns `[]`.

---

## Test 5: Browser Dev Mode Toggle

**Steps:**
1. Open http://localhost:3002 in browser
2. Look for "Dev Mode" button (bottom-left corner)
3. Click the button or press `Cmd+Shift+I`

**Expected:**
- Button turns green when active
- Keyboard shortcut works

**Screenshot checkpoint:** [Dev Mode button visible]

---

## Test 6: Browser Hover Highlight

**Steps:**
1. Enable Dev Mode
2. Hover over any component

**Expected:**
- Blue border appears around component
- Tooltip shows component name above element

**Screenshot checkpoint:** [Hover highlight visible]

---

## Test 7: Browser Click Selection

**Steps:**
1. Enable Dev Mode
2. Click on any component

**Expected:**
- Green border appears (replaces blue)
- Info panel shows in bottom-left:
  - Component name
  - File path (if available)
  - Props summary

**Screenshot checkpoint:** [Selection panel visible]

---

## Test 8: Browser Sync Status

**Steps:**
1. Select a component (Test 7)
2. Watch the sync status indicator in info panel

**Expected:**
- Shows "Syncing..." briefly (yellow dot)
- Then shows "Synced" (green dot)

**Verify via API:**
```bash
curl http://localhost:3002/api/mcp/selected-component
# Should return the selected component
```

---

## Test 9: MCP Connection

**Steps:**
1. Open Claude Code in the project directory
2. Run `/mcp`

**Expected:**
```
MCP Servers:
- app-bridge (connected)
  Tools: get_selected_component, get_component_source, send_to_browser, sync_from_browser, trigger_hot_reload
```

**Troubleshooting:**
- If not connected, check `.mcp.json` exists
- Verify `tsx` is installed: `pnpm add -D tsx`
- Check server logs: `npx tsx mcp/server.ts` (manual run)

---

## Test 10: MCP Get Selection

**Steps:**
1. Select a component in browser (Test 7)
2. In Claude Code, say: "What component is selected?"

**Expected:** Claude responds with component info:
```json
{
  "name": "ComponentName",
  "filePath": "/path/to/file.tsx",
  "lineNumber": 42,
  "props": { ... },
  "timestamp": 1234567890
}
```

---

## Test 11: MCP Read Source

**Steps:**
1. Select a component with a valid file path
2. In Claude Code, say: "Show me the source code of the selected component"

**Expected:** Claude reads and displays the file content.

**Fallback Test:**
- If filePath is null, say: "Read the source at src/components/ui/core/primitives/button/Button.tsx"

---

## Test 12: MCP Trigger Reload

**Steps:**
1. Have the browser open to any page
2. In Claude Code, say: "Trigger a hot reload in the browser"

**Expected:**
- Claude confirms action was sent
- Browser page refreshes

---

## Test 13: End-to-End Workflow

**Scenario:** User wants Claude to modify a button component.

**Steps:**
1. **Browser:** Enable Dev Mode, click on a Button component
2. **Claude Code:** "What component did I select?"
3. **Claude Code:** "Change the button's border radius to 12px"
4. **Claude Code:** "Trigger a hot reload"
5. **Browser:** Verify the change

**Expected:**
- Claude identifies the Button component
- Claude edits the correct file
- Browser refreshes automatically
- Change is visible

---

## Automated Test Script

Save and run this script:

```bash
#!/bin/bash
# mcp-bridge-test.sh

BASE_URL="http://localhost:3002"
PASS=0
FAIL=0

test_endpoint() {
  local name=$1
  local cmd=$2
  local expected=$3

  result=$(eval "$cmd" 2>/dev/null)
  if echo "$result" | grep -q "$expected"; then
    echo "✓ $name"
    ((PASS++))
  else
    echo "✗ $name"
    echo "  Expected: $expected"
    echo "  Got: $result"
    ((FAIL++))
  fi
}

echo "=== MCP Bridge API Tests ==="
echo ""

# Test 1: State endpoint
test_endpoint "State endpoint returns JSON" \
  "curl -s $BASE_URL/api/mcp/state" \
  "timestamp"

# Test 2: POST selection
test_endpoint "POST selection succeeds" \
  "curl -s -X POST $BASE_URL/api/mcp/selected-component -H 'Content-Type: application/json' -d '{\"name\":\"Test\",\"filePath\":\"/test.tsx\",\"props\":{}}'" \
  "success"

# Test 3: GET selection
test_endpoint "GET selection returns posted data" \
  "curl -s $BASE_URL/api/mcp/selected-component" \
  "Test"

# Test 4: POST action
test_endpoint "POST action succeeds" \
  "curl -s -X POST $BASE_URL/api/mcp/actions -H 'Content-Type: application/json' -d '{\"type\":\"highlight\",\"payload\":{}}'" \
  "actionId"

# Test 5: State file exists
test_endpoint "State file exists" \
  "cat ~/.app-mcp-bridge/selected-component.json" \
  "name"

# Test 6: DELETE clears selection
curl -s -X DELETE $BASE_URL/api/mcp/selected-component > /dev/null
test_endpoint "DELETE clears selection" \
  "curl -s $BASE_URL/api/mcp/selected-component" \
  "null"

echo ""
echo "=== Results: $PASS passed, $FAIL failed ==="
```

---

## Known Limitations

1. **File paths may be null**: React production builds strip debug info. Ensure you're running in development mode.

2. **Anonymous components**: Components without `displayName` or `name` show as "Unknown".

3. **Action consumption race**: If browser polls before you check, actions appear consumed.

4. **MCP restart required**: After changing `.mcp.json`, restart Claude Code session.

---

## Troubleshooting

### "No component selected"
- Ensure Dev Mode is enabled (green button)
- Click directly on a component, not empty space

### "filePath is null"
- Component may be a built-in or third-party without source maps
- Try selecting a component you defined in this project

### "MCP server not found"
- Check `.mcp.json` exists in project root
- Run `pnpm install` to ensure `tsx` is installed
- Try manual run: `npx tsx mcp/server.ts`

### "Action not executing"
- Check browser console for errors
- Verify polling is happening (Network tab, `/api/mcp/actions`)
- Ensure MCPProvider wraps your app

---

*Last Updated: January 2025*
