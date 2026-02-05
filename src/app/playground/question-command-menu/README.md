# Question Command Menu Playground

## Purpose

Exploration playground for experimenting with different **top stack** and **bottom stack** content combinations in the Question Command Menu component.

## Current Architecture Evaluation

### How It Works Now

```
QuestionCommandMenuV4Config
├── content: ContentInstance[]         // Maps content types → slot positions
│   ├── { id, type: 'chat', slot: 'top' }
│   └── { id, type: 'buttons', slot: 'bottom' }
├── slots: SlotsConfig
│   ├── top: UnifiedSlotConfig         // Appearance, animation, height for top
│   └── bottom: UnifiedSlotConfig      // Appearance, animation, height for bottom
└── contentConfigs: ContentConfigs     // Settings for each content TYPE
    ├── questions: QuestionsConfig
    ├── buttons: ButtonsConfig
    ├── chat: ChatConfig
    ├── suggestions: SuggestionsConfig
    └── filters: FiltersConfig
```

### Current Flow

1. **Config defines mapping**: `content[]` array maps content types to slot positions
2. **UniversalSlot** queries context for content: `getContentForSlot(position)`
3. **ContentRenderer** renders the appropriate content component
4. **Slot configs** control appearance/animation per position (not per content type)

### Problems Identified

1. **Content-Slot Coupling**: Changing what renders where requires modifying the `content[]` array
2. **Config Scattered**: Content type settings (`contentConfigs`) are separate from where they render (`content` + `slots`)
3. **State Confusion**: Slot enabled state can conflict with content assignment (slot enabled but no content mapped)
4. **No Composition**: Can't easily mix content types within a single slot or create complex layouts

### Potential Universal Slot Solutions

#### Option A: Slot-Agnostic Content Containers

```tsx
// Content containers that work in any slot
<UniversalContainer position="any">
  <ContentRenderer type="chat" />
  <ContentRenderer type="buttons" />  // Multiple in one slot
</UniversalContainer>
```

#### Option B: Content-First Architecture

```tsx
// Content declares its preferred behaviors, slot just provides position
interface ContentDeclaration {
  type: ContentTypeId
  heightBehavior: 'fixed' | 'dynamic' | 'auto'
  appearance: SlotAppearanceConfig  // Content brings its own appearance
}
```

#### Option C: Unified Slot Component

```tsx
// Single UnifiedSlot that handles all content types with composition
<UnifiedSlot>
  <UnifiedSlot.Header>  {/* Fixed height area */}
    <Filters />
  </UnifiedSlot.Header>
  <UnifiedSlot.Content> {/* Scrollable area */}
    <Chat />
  </UnifiedSlot.Content>
  <UnifiedSlot.Footer>  {/* Fixed height area */}
    <Buttons />
  </UnifiedSlot.Footer>
</UnifiedSlot>
```

## Stack Variants in This Playground

| Variant | Top Content | Bottom Content | Use Case |
|---------|-------------|----------------|----------|
| Questions + Buttons | questions | buttons | Default Q&A flow |
| Chat + Buttons | chat | buttons | AI response with actions |
| Chat + Suggestions | chat | suggestions | AI with autocomplete |
| Suggestions + Buttons | suggestions | buttons | Quick selection |
| Questions + Suggestions | questions | suggestions | Browse + autocomplete |
| Filters + Questions | filters | questions | Filtered question list |
| Chat Only | chat | (disabled) | Minimal AI response |
| Buttons + Chat | buttons | chat | Inverted layout test |

## Exploration Goals

1. **Test all content combinations** - See which make sense UX-wise
2. **Identify appearance conflicts** - Some content types may need different slot appearances
3. **Document height mode needs** - Which content types need fixed/dynamic/auto
4. **Find composition patterns** - Can we combine multiple content types in one slot?

## Next Steps

After exploration:
1. Document which stack variants are production-viable
2. Identify patterns for a universal slot component
3. Consider if content types should declare their slot preferences
4. Evaluate if slots and content configs should be merged

---

**Status**: Incubating
**Migration Target**: Depends on exploration outcomes
