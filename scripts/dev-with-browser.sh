#!/bin/bash

# =============================================================================
# dev-with-browser.sh
# =============================================================================
# Launches Chrome with CDP (Chrome DevTools Protocol) enabled and starts the
# Next.js dev server. This enables Claude Code to take automatic screenshots
# via the MCP browser bridge without manual browser configuration.
#
# Usage:
#   pnpm dev:claude
#   ./scripts/dev-with-browser.sh
# =============================================================================

set -e

# Configuration
CDP_PORT=9222
APP_PORT=3002
APP_URL="http://localhost:$APP_PORT"
CHROME_PROFILE="$HOME/.chrome-cdp-profile"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Chrome paths for different platforms
get_chrome_path() {
  case "$(uname -s)" in
    Darwin)
      echo "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      ;;
    Linux)
      # Try common Linux Chrome locations
      for path in \
        "/usr/bin/google-chrome" \
        "/usr/bin/google-chrome-stable" \
        "/usr/bin/chromium" \
        "/usr/bin/chromium-browser"; do
        if [ -f "$path" ]; then
          echo "$path"
          return
        fi
      done
      echo ""
      ;;
    *)
      echo ""
      ;;
  esac
}

# Check if CDP is already available
check_cdp() {
  curl -s "http://localhost:$CDP_PORT/json/version" > /dev/null 2>&1
}

# Launch Chrome with CDP
launch_chrome() {
  local chrome_path
  chrome_path=$(get_chrome_path)

  if [ -z "$chrome_path" ] || [ ! -f "$chrome_path" ]; then
    echo -e "${YELLOW}⚠️  Chrome not found. Screenshots will not be available.${NC}"
    echo -e "${YELLOW}   Install Chrome or start it manually with:${NC}"
    echo -e "${YELLOW}   --remote-debugging-port=$CDP_PORT${NC}"
    return 1
  fi

  echo -e "${BLUE}🚀 Launching Chrome with CDP on port $CDP_PORT...${NC}"

  # Launch Chrome in background with CDP enabled
  # Using a separate profile to avoid interfering with the user's main browser
  "$chrome_path" \
    --remote-debugging-port=$CDP_PORT \
    --user-data-dir="$CHROME_PROFILE" \
    --no-first-run \
    --no-default-browser-check \
    "$APP_URL" \
    > /dev/null 2>&1 &

  # Wait for CDP to become available (up to 10 seconds)
  echo -e "${BLUE}⏳ Waiting for CDP connection...${NC}"
  for i in {1..10}; do
    if check_cdp; then
      echo -e "${GREEN}✅ Chrome CDP ready on port $CDP_PORT${NC}"
      return 0
    fi
    sleep 1
  done

  echo -e "${YELLOW}⚠️  Chrome started but CDP not responding yet${NC}"
  echo -e "${YELLOW}   Screenshots may not work until CDP is ready${NC}"
  return 0
}

# Cleanup function for graceful shutdown
cleanup() {
  echo ""
  echo -e "${BLUE}👋 Shutting down...${NC}"
  # Note: We don't kill Chrome here to let the user continue browsing if desired
  exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Main
echo ""
echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     🔌 MCP Browser Bridge - Development Environment       ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if CDP is already available
if check_cdp; then
  echo -e "${GREEN}✅ Chrome CDP already running on port $CDP_PORT${NC}"
else
  launch_chrome
fi

echo ""
echo -e "${BLUE}📋 Available MCP tools:${NC}"
echo -e "   • ${GREEN}get_selected_component${NC} - Get info on selected component"
echo -e "   • ${GREEN}get_component_source${NC}   - Read component source file"
echo -e "   • ${GREEN}trigger_hot_reload${NC}     - Refresh the browser"
echo -e "   • ${GREEN}send_to_browser${NC}        - Navigate, highlight, scroll"
echo ""
echo -e "${BLUE}🌐 Starting Next.js dev server on port $APP_PORT...${NC}"
echo ""

# Start the Next.js dev server (exec replaces this script process)
exec pnpm next dev -p $APP_PORT
