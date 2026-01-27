#!/bin/bash

# Test PDF Export Script for Payva Deck
# Tests both normal and debug modes

echo "🎯 Testing Payva Deck PDF Export..."
echo "=================================="

# Set output directory
OUTPUT_DIR="$HOME/Desktop/payva-pdf-tests"
mkdir -p "$OUTPUT_DIR"

# Generate timestamp for unique filenames
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")

# Test 1: Normal PDF Export
echo "📄 Exporting normal PDF..."
curl -s -X GET "http://localhost:3000/api/payva-deck/export-pdf" \
  -o "$OUTPUT_DIR/payva-deck-normal-$TIMESTAMP.pdf"

if [ $? -eq 0 ]; then
  echo "✅ Normal PDF exported: $OUTPUT_DIR/payva-deck-normal-$TIMESTAMP.pdf"
else
  echo "❌ Failed to export normal PDF"
fi

# Test 2: Debug PDF Export (with boundaries)
echo "🔍 Exporting debug PDF with boundaries..."
curl -s -X GET "http://localhost:3000/api/payva-deck/export-pdf?debug=true" \
  -o "$OUTPUT_DIR/payva-deck-debug-$TIMESTAMP.pdf"

if [ $? -eq 0 ]; then
  echo "✅ Debug PDF exported: $OUTPUT_DIR/payva-deck-debug-$TIMESTAMP.pdf"
else
  echo "❌ Failed to export debug PDF"
fi

# Check file sizes
echo ""
echo "📊 Export Results:"
echo "------------------"
ls -lh "$OUTPUT_DIR"/*.pdf 2>/dev/null | tail -2

# Open both PDFs for comparison (macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
  echo ""
  echo "📖 Opening PDFs for review..."
  open "$OUTPUT_DIR/payva-deck-normal-$TIMESTAMP.pdf"
  open "$OUTPUT_DIR/payva-deck-debug-$TIMESTAMP.pdf"
fi

echo ""
echo "✨ Test complete! Check the PDFs for:"
echo "  1. Text sizing relative to card containers"
echo "  2. Arrow icon proportions in stat cards"
echo "  3. Debug boundaries (in debug version)"
echo "  4. Overall visual hierarchy"