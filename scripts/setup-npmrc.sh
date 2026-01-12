#!/bin/bash

# Setup .npmrc auth tokens for premium packages (Hugeicons PRO, Untitled UI)
# This script runs before pnpm install on Vercel

set -e

NPMRC_FILE=".npmrc"

if [ ! -f "$NPMRC_FILE" ]; then
  echo "Error: .npmrc file not found"
  exit 1
fi

# Portable sed in-place editing
sed_inplace() {
  local pattern="$1"
  local file="$2"
  local tmp_file="${file}.tmp"
  sed "$pattern" "$file" > "$tmp_file" && mv "$tmp_file" "$file"
}

# Update Hugeicons auth token if set
if [ -n "$HUGEICONS_AUTH_TOKEN" ]; then
  sed_inplace "s|//npm.hugeicons.com/:_authToken=.*|//npm.hugeicons.com/:_authToken=${HUGEICONS_AUTH_TOKEN}|" "$NPMRC_FILE"
  echo "Updated Hugeicons auth token"
else
  echo "Warning: HUGEICONS_AUTH_TOKEN not set"
fi

# Update Untitled UI auth token if set
if [ -n "$UNTITLEDUI_AUTH_TOKEN" ]; then
  sed_inplace "s|//pkg.untitledui.com/:_authToken=.*|//pkg.untitledui.com/:_authToken=${UNTITLEDUI_AUTH_TOKEN}|" "$NPMRC_FILE"
  echo "Updated Untitled UI auth token"
else
  echo "Warning: UNTITLEDUI_AUTH_TOKEN not set"
fi

echo "npmrc setup complete"
