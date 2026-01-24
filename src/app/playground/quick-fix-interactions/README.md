# Quick Fix Interactions Playground

Universal configuration system for improvement flows—a Tinder-style interaction pattern for improving AI-generated answers through user feedback.

---

## Overview

This playground provides a **universally configurable** system for two primary integration targets:

| Solution | Location | Key Feature |
|----------|----------|-------------|
| **Edit Questions** | `/playground/edit-questions` | Modal-based Q&A editing |
| **Profile V3** | `/b/profile-v3` | Category-aware with impact scoring |

### Solution Variants

**Solution A (Edit Questions)**
- All 3 flows enabled: Quick Fix, Add to Mind, Manual Fix
- Generic AddToMind: file/link/text upload interface
- Modal-first architecture with nested dialogs

**Solution B (Profile V3)**
- All 3 flows enabled with category awareness
- Category-Aware AddToMind: upload suggestions ranked by impact score (1-10)
- "High Impact" badges for scores >= 9
- Dynamic header: "Improve {category}"

---

## Quick Start

### 1. Choose Your Preset

```typescript
import { EDIT_QUESTIONS_PRESET, PROFILE_PRESET } from './config/presets'

// For Solution A (Edit Questions)
const preset = EDIT_QUESTIONS_PRESET

// For Solution B (Profile)
const preset = PROFILE_PRESET
```

### 2. Use FlowSelector with Preset

```typescript
import { FlowSelector } from './core/FlowSelector'

<FlowSelector
  onSelect={handleFlowSelect}
  config={preset.baseConfig.flowOptions}
  flowDefinitions={preset.flowRegistry.flows}
/>
```

### 3. Handle Flow Selection

The `flowDefinitions` include a `variant` property for Add to Mind:
- `'generic'` → Render file/link/text upload
- `'category-aware'` → Render impact-ranked suggestions

---

## Architecture

```
quick-fix-interactions/
├── page.tsx                 # Playground page
├── config/
│   ├── types.ts             # All TypeScript interfaces
│   ├── presets.ts           # Default config + solution presets
│   └── options.ts           # Dropdown options for control panel
├── panels/
│   └── panel-config.ts      # UnifiedControlPanel configuration
├── core/                    # Reusable components
│   ├── SwipeableCard.tsx    # Tinder-style swipeable card
│   ├── ActionButtons.tsx    # True/False buttons
│   ├── FlowSelector.tsx     # Method selection (configurable)
│   ├── CompletionState.tsx  # Success screen
│   ├── Toast.tsx            # Success notification
│   ├── ProgressBar.tsx      # Progress indicator
│   └── StatusIsland.tsx     # Status bar
└── constants/
    └── mock-data.ts         # Sample data
```

---

## Solution A: Edit Questions Integration

### Files
- `src/app/playground/edit-questions/components/flows/AddToMindFlow.tsx`
- `src/app/playground/edit-questions/components/flows/ManualFixFlow.tsx`

### Integration Example

```typescript
// In RevisionFlowModal.tsx
import { FlowSelector } from '@/app/playground/quick-fix-interactions/core'
import { EDIT_QUESTIONS_PRESET } from '@/app/playground/quick-fix-interactions/config/presets'

export function RevisionFlowModal({ isOpen, onClose }) {
  const [selectedFlow, setSelectedFlow] = useState<FlowType | null>(null)
  const preset = EDIT_QUESTIONS_PRESET

  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalHeader
        title={preset.integration.headerTitle}
        showBackButton={preset.integration.showBackButton && !!selectedFlow}
        showCloseButton={preset.integration.showCloseButton}
      />

      {!selectedFlow ? (
        <FlowSelector
          onSelect={setSelectedFlow}
          config={preset.baseConfig.flowOptions}
          flowDefinitions={preset.flowRegistry.flows}
        />
      ) : (
        <FlowContent
          flow={selectedFlow}
          variant={getFlowVariant(selectedFlow, preset.flowRegistry.flows)}
          onComplete={handleComplete}
        />
      )}
    </Modal>
  )
}

// Helper to get variant from flow definitions
function getFlowVariant(flowId: FlowId, flows: FlowDefinition[]) {
  return flows.find(f => f.id === flowId)?.variant
}
```

### AddToMind Variant (Generic)

```typescript
// Uses: file/link/text upload interface
const flow = preset.flowRegistry.flows.find(f => f.id === 'add-to-mind')
// flow.variant === 'generic'

<AddToMindFlow
  onComplete={handleComplete}
  styleConfig={{
    shine: preset.baseConfig.flowOptions.shine,
    cornerShape: preset.baseConfig.flowOptions.cornerShape,
  }}
/>
```

---

## Solution B: Profile V3 Integration

### Files
- `src/app/b/profile/components/RevisionModal.tsx` (reference implementation)
- `src/app/b/profile-v3/components/modals/RevisionModal.tsx` (to replace)

### Integration Example

```typescript
// Replace RevisionModal.tsx with configurable flow
import { FlowSelector } from '@/app/playground/quick-fix-interactions/core'
import { PROFILE_PRESET } from '@/app/playground/quick-fix-interactions/config/presets'

export function RevisionModal({ isOpen, targetCategory, onClose, onComplete }) {
  const [selectedFlow, setSelectedFlow] = useState<FlowType | null>(null)
  const preset = PROFILE_PRESET
  const category = getCategoryById(targetCategory)

  // Dynamic header title: "Improve {category}" → "Improve Communication"
  const headerTitle = preset.integration.headerTitle?.replace(
    '{category}',
    category?.label || 'Profile'
  )

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Popup>
        <ModalHeader
          title={headerTitle}
          showBackButton={preset.integration.showBackButton && !!selectedFlow}
          showCloseButton={preset.integration.showCloseButton}
        />

        {!selectedFlow ? (
          <FlowSelector
            onSelect={setSelectedFlow}
            config={preset.baseConfig.flowOptions}
            flowDefinitions={preset.flowRegistry.flows}
          />
        ) : (
          <FlowContent
            flow={selectedFlow}
            variant={getFlowVariant(selectedFlow, preset.flowRegistry.flows)}
            categoryId={targetCategory}
            onComplete={() => {
              if (preset.integration.onCompleteAction === 'toast') {
                showToast('Profile updated')
              }
              onComplete()
            }}
          />
        )}
      </Dialog.Popup>
    </Dialog.Root>
  )
}
```

### AddToMind Variant (Category-Aware)

```typescript
// Uses: impact-ranked suggestions by category
const flow = preset.flowRegistry.flows.find(f => f.id === 'add-to-mind')
// flow.variant === 'category-aware'

<CategoryAwareAddToMind
  categoryId={targetCategory}
  categoryLabel={category.label}
  onComplete={handleComplete}
/>

// Renders suggestions like:
// - LinkedIn Profile (Impact: 10/10) [High Impact]
// - Performance Review (Impact: 9/10) [High Impact]
// - Portfolio Link (Impact: 7/10)
```

---

## Configuration Reference

### FlowDefinition

```typescript
interface FlowDefinition {
  id: 'quick-fix' | 'add-to-mind' | 'manual-fix'
  enabled: boolean        // Show/hide this flow
  label: string          // Display name
  description: string    // Subtitle text
  icon: string           // Icon name (e.g., 'SparklesIcon')
  variant?: 'generic' | 'category-aware'  // For Add to Mind
}
```

### IntegrationConfig

```typescript
interface IntegrationConfig {
  mode: 'modal' | 'inline' | 'panel'
  showHeader: boolean
  showBackButton: boolean
  showCloseButton: boolean
  headerTitle?: string    // Use {category} for substitution
  showStepIndicator: boolean
  onCompleteAction: 'close' | 'toast' | 'callback'
}
```

### SolutionPreset

```typescript
interface SolutionPreset {
  id: string
  name: string
  solution: 'edit-questions' | 'profile-v3' | 'standalone'
  description: string
  baseConfig: QuickFixInteractionsConfig
  flowRegistry: FlowRegistry
  integration: IntegrationConfig
}
```

---

## Customization

### Creating a Custom Preset

```typescript
import { DEFAULT_QUICK_FIX_CONFIG } from './config/presets'
import type { SolutionPreset } from './config/types'

const MY_CUSTOM_PRESET: SolutionPreset = {
  id: 'my-custom',
  name: 'My Custom Flow',
  solution: 'standalone',
  description: 'Custom configuration',
  baseConfig: {
    ...DEFAULT_QUICK_FIX_CONFIG,
    card: {
      ...DEFAULT_QUICK_FIX_CONFIG.card,
      width: 300,
      cornerShape: 'squircle',
    },
  },
  flowRegistry: {
    flows: [
      // Only enable Quick Fix and Manual Fix
      { id: 'quick-fix', enabled: true, label: 'Quick Fix', description: 'Fast verification', icon: 'SparklesIcon' },
      { id: 'add-to-mind', enabled: false, label: 'Add to Mind', description: '', icon: 'Brain01Icon' },
      { id: 'manual-fix', enabled: true, label: 'Write It', description: 'Type your answer', icon: 'Edit01Icon' },
    ],
    defaultFlow: 'quick-fix', // Auto-select Quick Fix
  },
  integration: {
    mode: 'inline',
    showHeader: true,
    showBackButton: false,
    showCloseButton: false,
    showStepIndicator: true,
    onCompleteAction: 'callback',
  },
}
```

### Styling Patterns

All flows inherit styling from `flowOptions`:

```typescript
styleConfig={{
  shine: config.flowOptions.shine,           // e.g., 'shine-3'
  shineIntensity: config.flowOptions.shineIntensity,
  cornerShape: config.flowOptions.cornerShape,  // 'squircle'
  borderRadius: config.flowOptions.cardBorderRadius,
  iconCircleSize: config.flowOptions.iconCircleSize,
}}
```

---

## Control Panel

The playground control panel includes:

1. **Solution** - Select integration target (Edit Questions, Profile, Standalone)
2. **Preview** - Choose preview mode
3. **Card** - Swipeable card appearance
4. **Swipe** - Animation physics
5. **Buttons** - Action button styling
6. **Progress** - Progress indicator
7. **Complete** - Completion state
8. **Toast** - Notification styling
9. **Island** - Status bar
10. **Options** - Flow selector styling

---

## Migration Target

When refinement is complete:

```
src/components/ui/prod/features/quick-fix/
├── QuickFixModal.tsx
├── SwipeableCard.tsx
├── ActionButtons.tsx
├── FlowSelector.tsx
├── CompletionState.tsx
├── Toast.tsx
├── types.ts
└── index.ts
```

---

**Last Updated**: January 2025
