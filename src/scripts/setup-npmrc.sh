#!/bin/bash
# Generate .npmrc file from environment variables for Vercel deployment

set -e

# Check if environment variables are set
if [ -z "$UNTITLEDUI_AUTH_TOKEN" ]; then
  echo "⚠️  Warning: UNTITLEDUI_AUTH_TOKEN is not set"
fi

if [ -z "$HUGEICONS_AUTH_TOKEN" ]; then
  echo "⚠️  Warning: HUGEICONS_AUTH_TOKEN is not set"
fi

# Create .npmrc file
cat > .npmrc << EOF
enable-pre-post-scripts=true
auto-install-peers=true
strict-peer-dependencies=false
@untitledui-pro:registry=https://pkg.untitledui.com
//pkg.untitledui.com/:_authToken=${UNTITLEDUI_AUTH_TOKEN}
@hugeicons-pro:registry=https://npm.hugeicons.com/
//npm.hugeicons.com/:_authToken=${HUGEICONS_AUTH_TOKEN}
EOF

echo "✅ .npmrc file created successfully"
echo "📝 Verifying .npmrc contents..."
cat .npmrc

