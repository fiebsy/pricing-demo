#!/usr/bin/env node

/**
 * Script to capture debug logs from ButtonAnimation V2
 * Run this after reproducing the positioning issue
 */

const fs = require('fs');
const path = require('path');

console.log('📋 ButtonAnimation V2 Debug Log Capture\n');

// Instructions for the user
console.log('To capture logs, follow these steps:\n');
console.log('1. Open http://localhost:3000/playground/button-animation-v2 in Chrome');
console.log('2. Open Chrome DevTools (F12)');
console.log('3. Navigate through the buttons to reproduce the issue');
console.log('4. In the Console, run: window.exportPositionLog()');
console.log('5. A JSON file will be downloaded with the position data\n');

console.log('Additionally, in the Console you will see:');
console.log('  - 🎯 Position updates with tables showing button states');
console.log('  - Active path and anchored count for each interaction');
console.log('  - Expected vs actual offsets\n');

console.log('To share the logs:');
console.log('  1. Copy the console output');
console.log('  2. Save the exported JSON file');
console.log('  3. Take a screenshot showing the issue\n');

// Create a debug info file
const debugInfo = {
  timestamp: new Date().toISOString(),
  environment: {
    node: process.version,
    platform: process.platform,
    cwd: process.cwd()
  },
  instructions: {
    console_commands: [
      'window.exportPositionLog() - Export position data',
      'window.clearPositionLog() - Clear stored logs'
    ],
    expected_behavior: {
      anchoring: 'Each anchored button should stack at peekOffset intervals (8px by default)',
      children: 'Children should appear after all anchored items',
      formula: 'childOffset = anchoredCount * peekOffset'
    }
  },
  files_to_check: [
    'src/components/ui/prod/base/button-animation-v2/core/position-calculator.ts',
    'src/components/ui/prod/base/button-animation-v2/components/AnimatedButton.tsx',
    'src/components/ui/prod/base/button-animation-v2/components/EnhancedStackLevel.tsx'
  ]
};

const outputPath = path.join(__dirname, 'debug-info.json');
fs.writeFileSync(outputPath, JSON.stringify(debugInfo, null, 2));

console.log(`\n✅ Debug info saved to: ${outputPath}`);
console.log('\n---\n');
console.log('Quick Debug Checklist:');
console.log('  ☐ Dev server running on http://localhost:3000');
console.log('  ☐ Chrome DevTools open');
console.log('  ☐ Debug overlay enabled in control panel');
console.log('  ☐ Console showing position updates');
console.log('  ☐ Screenshot captured');
console.log('\n');