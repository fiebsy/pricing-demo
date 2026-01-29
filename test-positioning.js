#!/usr/bin/env node

/**
 * Test script to verify button positioning
 * Run this in the browser console while on the playground page
 */

// Copy and paste this entire script into the browser console

(function testButtonPositioning() {
  console.clear();
  console.log('🔬 ButtonAnimation V2 Positioning Test');
  console.log('=====================================\n');
  
  // Check if we're using the enhanced version
  const isEnhanced = document.querySelector('[data-enhanced="true"]');
  console.log('✅ Using Enhanced Version:', isEnhanced ? 'YES' : 'NO');
  
  // Find all buttons with positioning data
  const buttons = document.querySelectorAll('[data-state][data-id]');
  console.log(`📊 Found ${buttons.length} buttons\n`);
  
  // Analyze each button's position
  const analysis = [];
  buttons.forEach(button => {
    const id = button.dataset.id;
    const state = button.dataset.state;
    const level = button.dataset.level || '0';
    const rect = button.getBoundingClientRect();
    const computed = window.getComputedStyle(button);
    const parent = button.parentElement;
    const parentComputed = window.getComputedStyle(parent);
    
    // Check if button or parent has absolute positioning
    const isAbsolute = computed.position === 'absolute' || 
                      parentComputed.position === 'absolute';
    
    // Get transform values
    let translateX = 0;
    if (computed.transform && computed.transform !== 'none') {
      const matrix = new DOMMatrix(computed.transform);
      translateX = matrix.m41;
    }
    
    // Get left value if absolute
    const leftValue = parseFloat(computed.left) || 0;
    const parentLeft = parseFloat(parentComputed.left) || 0;
    
    analysis.push({
      ID: id,
      State: state,
      Level: level,
      Position: isAbsolute ? 'absolute' : 'relative',
      'Left (px)': isAbsolute ? leftValue || parentLeft : 0,
      'Transform X': translateX,
      'Actual X': rect.left,
      'Expected': getExpectedPosition(id, state, level)
    });
  });
  
  console.table(analysis);
  
  // Check active path
  console.log('\n📍 Current Navigation State:');
  const activePath = getActivePath();
  console.log('Active Path:', activePath.join(' → ') || '(none)');
  console.log('Anchored Count:', Math.max(0, activePath.length - 1));
  console.log('Expected Child Offset:', Math.max(0, activePath.length - 1) * 8, 'px');
  
  // Identify issues
  console.log('\n⚠️  Issues Found:');
  const issues = [];
  
  analysis.forEach(item => {
    const expected = parseFloat(item.Expected);
    const actual = item['Left (px)'] || item['Transform X'];
    
    if (Math.abs(expected - actual) > 1) {
      issues.push({
        button: item.ID,
        expected: `${expected}px`,
        actual: `${actual}px`,
        difference: `${actual - expected}px`
      });
    }
  });
  
  if (issues.length > 0) {
    console.table(issues);
  } else {
    console.log('✅ All buttons positioned correctly!');
  }
  
  // Helper functions
  function getActivePath() {
    const path = [];
    buttons.forEach(button => {
      const state = button.dataset.state;
      if (state === 'parent-anchored' || state === 'parent-active' || state === 'child-active') {
        path.push(button.dataset.id);
      }
    });
    return path;
  }
  
  function getExpectedPosition(id, state, level) {
    if (state === 'collapsed' || state === 'collapsed-idle') return 0;
    
    if (state === 'parent-anchored') {
      // Anchored items should stack at 8px intervals
      const anchorIndex = getActivePath().indexOf(id);
      if (anchorIndex >= 0) {
        return (anchorIndex + 1) * 8;
      }
    }
    
    if (state === 'child-idle' || state === 'child-active') {
      // Children should appear after all anchored items
      const anchoredCount = Math.max(0, getActivePath().length - 1);
      return anchoredCount * 8;
    }
    
    return 0;
  }
  
  // Export function for debugging
  console.log('\n💾 To export this data, run:');
  console.log('copy(JSON.stringify(' + JSON.stringify(analysis) + ', null, 2))');
  
  return analysis;
})();