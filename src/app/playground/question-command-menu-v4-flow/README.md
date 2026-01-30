# Question Command Menu V4 - Flow System

A production-ready question/answer flow with state management, confidence indicators, and typewriter streaming.

## Live Demo

```
http://localhost:3002/playground/question-command-menu-v4-flow
```

---

## Flow States

```
┌─────────┐
│  IDLE   │ ← Collapsed, placeholder shown
└────┬────┘
     │ user focuses/types
     ▼
┌─────────┐
│ ADDING  │ ← User typing question, slots hidden
└────┬────┘
     │ Enter / click Add
     ▼
┌──────────┐
│PROCESSING│ ← AI generating, typewriter streaming
└────┬─────┘
     │ response complete
     ▼
┌─────────┐
│RESPONSE │ ← Answer shown, Edit/Delete available
└────┬────┘
     │ click Edit
     ▼
┌─────────┐
│ EDITING │ ← User editing question
└─────────┘
     │ Save → PROCESSING
     │ Cancel/Escape → RESPONSE
     │ Delete → IDLE
```

---

## Key Files

| File | Purpose |
|------|---------|
| `page.tsx` | Main playground with flow orchestration |
| `flow-config.ts` | State-based UI overrides (buttons, slots) |
| `default-config.ts` | Base V4 configuration |

### Shared Components (question-command-menu-v4/)

| File | Purpose |
|------|---------|
| `state/context.tsx` | V4Provider and useV4Context hook |
| `state/reducer.ts` | Flow state machine actions |
| `components/Preview.tsx` | Main preview wrapper |
| `components/UnifiedTrigger.tsx` | Trigger with input/display modes |
| `components/TriggerDisplay.tsx` | Read-only display with alert icon |
| `content/ChatContent.tsx` | Chat messages with confidence badge |

---

## Quick Start Integration

### 1. Basic Setup

```tsx
import { V4Provider } from '../question-command-menu-v4/state'
import { Preview } from '../question-command-menu-v4/components'
import { FLOW_DEFAULT_CONFIG } from './default-config'
import { CUSTOM_FLOW_CONFIG } from './flow-config'

// Merge flow config into base config
const config = {
  ...FLOW_DEFAULT_CONFIG,
  flowConfigs: CUSTOM_FLOW_CONFIG,
}

function MyComponent() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isChatTyping, setIsChatTyping] = useState(false)

  return (
    <V4Provider config={config}>
      <Preview
        config={config}
        chatMessages={chatMessages}
        isChatTyping={isChatTyping}
        onChatSend={handleChatSend}
        onDelete={handleDelete}
        skipProvider // Already wrapped in V4Provider
      />
    </V4Provider>
  )
}
```

### 2. Handling Submissions with Typewriter

```tsx
function ContentWithActions() {
  const {
    flowStateId,
    startAdding,
    submitQuestion,
    receiveResponse,
    deleteQuestion,
  } = useV4Context()

  const handleChatSend = useCallback((message: string) => {
    // Detect confidence (your logic here)
    const confidence = analyzeConfidence(message)

    // Transition states
    if (flowStateId === 'idle') startAdding()
    submitQuestion(confidence)

    // Show streaming placeholder
    const ts = Date.now()
    setChatMessages([
      { id: `user-${ts}`, role: 'user', content: message },
      { id: `assistant-${ts}`, role: 'assistant', content: '', isStreaming: true },
    ])
    setIsChatTyping(true)

    // Fetch AI response, then typewriter it
    fetchAIResponse(message).then(({ response, confidence }) => {
      // Start typewriter after brief delay
      setTimeout(() => {
        let charIndex = 0
        const typeSpeed = 15 // ms per character

        const interval = setInterval(() => {
          charIndex++
          const currentText = response.slice(0, charIndex)

          setChatMessages([
            { id: `user-${ts}`, role: 'user', content: message },
            { id: `assistant-${ts}`, role: 'assistant', content: currentText, isStreaming: charIndex < response.length },
          ])

          if (charIndex >= response.length) {
            clearInterval(interval)
            setChatMessages([
              { id: `user-${ts}`, role: 'user', content: message },
              { id: `assistant-${ts}`, role: 'assistant', content: response, confidence },
            ])
            receiveResponse(response)
            setIsChatTyping(false)
          }
        }, typeSpeed)
      }, 500)
    })
  }, [flowStateId, startAdding, submitQuestion, receiveResponse])
}
```

---

## Confidence System

### Setting Confidence

```tsx
// When submitting a question
submitQuestion(0.85) // 85% confidence
submitQuestion(0)    // 0% = low confidence (triggers error styling)
```

### Visual Indicators (confidence ≤ 10%)

| Indicator | Location | Description |
|-----------|----------|-------------|
| Error gradient | Backdrop surface | Subtle red gradient overlay |
| "Needs improvement" badge | Below AI response | Red xs squircle badge |
| Alert icon | Collapsed trigger | Red stroke alert icon |

### Test Low Confidence

Type `test low` as your question to trigger the low confidence flow.

### Customizing Threshold

In `ChatContent.tsx`:
```tsx
message.confidence !== undefined && message.confidence <= 0.1
```

In `TriggerDisplay.tsx`:
```tsx
const showCautionIcon = !expanded &&
  flowStateId === 'response' &&
  storedConfidence !== null &&
  storedConfidence <= 0.1
```

---

## Multiple Questions

To support multiple questions that inherit this flow:

### 1. Question State Interface

```tsx
interface Question {
  id: string
  text: string
  response: string | null
  confidence: number | null
  status: 'idle' | 'adding' | 'processing' | 'response' | 'editing'
}

interface MultiQuestionState {
  questions: Question[]
  activeQuestionId: string | null
}
```

### 2. Question List Component

```tsx
function QuestionList({ questions, activeId, onSelect, onAdd }) {
  return (
    <div className="space-y-2">
      {questions.map((q) => (
        <QuestionRow
          key={q.id}
          question={q}
          isActive={q.id === activeId}
          onClick={() => onSelect(q.id)}
          showWarning={q.confidence !== null && q.confidence <= 0.1}
        />
      ))}
      <button onClick={onAdd}>+ Add Question</button>
    </div>
  )
}
```

### 3. Per-Question Flow Instance

Each question gets its own V4Provider:

```tsx
function MultiQuestionFlow() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  const activeQuestion = questions.find(q => q.id === activeId)

  return (
    <div className="flex gap-4">
      {/* Question List */}
      <QuestionList
        questions={questions}
        activeId={activeId}
        onSelect={setActiveId}
        onAdd={() => {
          const newId = crypto.randomUUID()
          setQuestions(prev => [...prev, {
            id: newId,
            text: '',
            response: null,
            confidence: null,
            status: 'idle',
          }])
          setActiveId(newId)
        }}
      />

      {/* Active Question Flow */}
      {activeQuestion && (
        <V4Provider
          key={activeQuestion.id}
          config={{ ...FLOW_DEFAULT_CONFIG, flowConfigs: CUSTOM_FLOW_CONFIG }}
        >
          <SingleQuestionFlow
            question={activeQuestion}
            onUpdate={(updated) => {
              setQuestions(prev => prev.map(q =>
                q.id === updated.id ? updated : q
              ))
            }}
          />
        </V4Provider>
      )}
    </div>
  )
}
```

### 4. Single Question Flow Wrapper

```tsx
function SingleQuestionFlow({ question, onUpdate }) {
  const { submitQuestion, receiveResponse } = useV4Context()
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])

  // Initialize from question state
  useEffect(() => {
    if (question.response) {
      setChatMessages([
        { id: 'user', role: 'user', content: question.text },
        { id: 'assistant', role: 'assistant', content: question.response, confidence: question.confidence },
      ])
    }
  }, [question.id])

  const handleSend = useCallback((message: string) => {
    // ... typewriter logic from above ...

    // Update parent state when complete
    onUpdate({
      ...question,
      text: message,
      response: aiResponse,
      confidence: aiConfidence,
      status: 'response',
    })
  }, [question, onUpdate])

  return (
    <Preview
      chatMessages={chatMessages}
      onChatSend={handleSend}
      skipProvider
    />
  )
}
```

### 5. Sync Flow State to Question Status

```tsx
// In SingleQuestionFlow, sync V4 flow state to question status
const { flowStateId } = useV4Context()

useEffect(() => {
  if (flowStateId !== question.status) {
    onUpdate({ ...question, status: flowStateId })
  }
}, [flowStateId])
```

---

## Flow Config Reference

### Slot Overrides

```tsx
slots: {
  top: { enabled: boolean, minHeight?: number, maxHeight?: number },
  bottom: { enabled: boolean, minHeight?: number, maxHeight?: number },
}
```

### Button Overrides

```tsx
// Bottom slot action buttons
buttons: [
  { id: 'btn1', label?: string, enabled?: boolean, isLoading?: boolean, disabled?: boolean },
]

// Trigger row buttons
triggerButtons: [
  { id: 'send', enabled?: boolean },
  { id: 'add-button', enabled?: boolean, label?: string },
  { id: 'edit-small', enabled?: boolean },
  { id: 'delete-expanded', enabled?: boolean },
  { id: 'plus-collapsed', enabled?: boolean },
  { id: 'arrow-collapsed', enabled?: boolean },
]
```

### Complete Single Button Flow Config

```tsx
export const CUSTOM_FLOW_CONFIG: FlowConfigs = {
  idle: {
    slots: { top: { enabled: false }, bottom: { enabled: false } },
    triggerButtons: [
      { id: 'send', enabled: false },
      { id: 'add-button', enabled: true },
      { id: 'edit-small', enabled: false },
      { id: 'delete-expanded', enabled: false },
      { id: 'plus-collapsed', enabled: true },
      { id: 'arrow-collapsed', enabled: false },
    ],
  },

  adding: {
    slots: { top: { enabled: false }, bottom: { enabled: false } },
    triggerButtons: [
      { id: 'send', enabled: false },
      { id: 'add-button', enabled: true },
      { id: 'edit-small', enabled: false },
      { id: 'delete-expanded', enabled: false },
      { id: 'plus-collapsed', enabled: true },
      { id: 'arrow-collapsed', enabled: false },
    ],
    placeholder: 'Type your question...',
  },

  processing: {
    slots: { top: { enabled: true }, bottom: { enabled: true } },
    buttons: [
      { id: 'btn1', label: 'Generating...', isLoading: false, enabled: true, disabled: true },
      { id: 'btn2', enabled: false },
      { id: 'btn3', enabled: false },
      { id: 'btn4', enabled: false },
    ],
    triggerButtons: [
      { id: 'plus-collapsed', enabled: false },
      { id: 'arrow-collapsed', enabled: true },
    ],
    placeholder: 'Your question',
  },

  response: {
    slots: { top: { enabled: true }, bottom: { enabled: true } },
    buttons: [
      { id: 'btn1', label: 'Improve answer', enabled: true, isLoading: false },
      { id: 'btn2', enabled: false },
      { id: 'btn3', enabled: false },
      { id: 'btn4', enabled: false },
    ],
    triggerButtons: [
      { id: 'send', enabled: false },
      { id: 'add-button', enabled: false },
      { id: 'edit-small', enabled: true },
      { id: 'delete-expanded', enabled: true },
      { id: 'plus-collapsed', enabled: false },
      { id: 'arrow-collapsed', enabled: true },
    ],
  },

  editing: {
    slots: { top: { enabled: true }, bottom: { enabled: false } },
    buttons: [
      { id: 'btn1', label: 'Improve answer', enabled: true, isLoading: false },
      { id: 'btn2', enabled: false },
      { id: 'btn3', enabled: false },
      { id: 'btn4', enabled: false },
    ],
    triggerButtons: [
      { id: 'send', enabled: false },
      { id: 'add-button', enabled: true, label: 'Save' },
      { id: 'edit-small', enabled: false },
      { id: 'delete-expanded', enabled: true },
      { id: 'plus-collapsed', enabled: false },
      { id: 'arrow-collapsed', enabled: true },
    ],
    placeholder: 'Edit your question...',
  },
}
```

---

## Styling Reference

### Error State Gradient

In `menu/config.ts` - `getGradientStyles()`:
```tsx
if (isLowConfidence) {
  const errorRgb = '239, 68, 68'
  return {
    backgroundImage: `linear-gradient(to bottom, rgba(${errorRgb}, 0.04) 0%, rgba(${errorRgb}, 0.12) 100%)`,
  }
}
```

### Alert Icon

In `TriggerDisplay.tsx`:
```tsx
import Alert02Icon from '@hugeicons-pro/core-stroke-rounded/Alert02Icon'

{showCautionIcon && (
  <HugeIcon icon={Alert02Icon} size={16} strokeWidth={2} className="text-error-primary" />
)}
```

### Needs Improvement Badge

In `ChatContent.tsx`:
```tsx
import { Badge } from '@/components/ui/core/primitives/badge'

{message.confidence !== undefined && message.confidence <= 0.1 && (
  <div className="mt-2">
    <Badge color="error" size="xs" shape="squircle">
      Needs improvement
    </Badge>
  </div>
)}
```

---

## Testing

### Test Scenarios

| Test | Action | Expected |
|------|--------|----------|
| Normal flow | Type "What is 2+2?" → Enter | Typewriter response, 85% confidence |
| Low confidence | Type "test low" → Enter | Error gradient, badge, alert icon |
| Edit | Click Edit → Change text → Save | Re-processes with new text |
| Delete | Click trash icon | Returns to idle, clears all |
| Escape | Press Escape during editing | Cancels edit, returns to response |
| Collapse | Click outside | Collapses panel |

### Debug Mode

In `ChatContent.tsx`:
```tsx
const DEBUG_COLORS = true
// Red = outer container
// Green = scroll viewport
// Blue = content container
```

---

## State Actions Reference

```tsx
const {
  // Flow state
  flowStateId,        // 'idle' | 'adding' | 'processing' | 'response' | 'editing'
  storedQuestion,     // The submitted question text
  storedResponse,     // The AI response text
  storedConfidence,   // Confidence level (0-1 or null)

  // Actions
  startAdding,        // idle → adding
  submitQuestion,     // (confidence?: number) adding → processing
  receiveResponse,    // (response: string) processing → response
  startEditing,       // response → editing
  cancelEditing,      // editing → response
  deleteQuestion,     // any → idle
} = useV4Context()
```

---

## Common Issues

### Slots not appearing
- Check `effectiveTopEnabled`/`effectiveBottomEnabled` from `useFlowConfig()`
- Verify flow config has correct `slots` override for current state

### Buttons not showing
- Check `enabled` in flow config's `triggerButtons`
- Check `showWhen` matches current state (e.g., `'expanded'` requires panel open)

### Confidence styling not showing
- Ensure `flowStateId === 'response'` (only shows after response)
- Check `storedConfidence` is set when calling `submitQuestion(confidence)`

### Typewriter not working
- Ensure `isStreaming: true` is set during typing
- Check interval is cleared when complete
