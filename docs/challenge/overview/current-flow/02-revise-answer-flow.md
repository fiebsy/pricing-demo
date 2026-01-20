# Revise Answer Flow

> Documents the current experience for revising a Delphi answer from the chat interface.

---

## Flow Overview

```
Chat Interface → View Answer → Click "Revise" → Modal Opens → Edit Text → Save → Toast Notification
```

**Location:** Chat interface (not Profile page)
**Trigger:** "Revise" button below any Delphi response

---

## Step-by-Step Breakdown

### Step 1: Chat Interface with Answer

![Chat interface with answer](./screenshots/02-revise-01-chat-interface.png)

**What the user sees:**
- Chat header with avatar and name ("Derick Fiebiger")
- Delphi greeting: "Hi I'm Derick's digital mind. How can I help?"
- User's question (orange bubble): "How has your experience co-founding Pickaxe.it shaped your approach to design?"
- Delphi's response (dark bubble with white text)
- Citation marker `[1]` inline in the response

**Available actions below the answer:**
| Action | Icon | Purpose |
|--------|------|---------|
| Revise | Pencil | Edit the answer content |
| Adjust Speaking Style | Speaker/voice | Change tone/style |
| Citations | Quote marks | View sources |
| Read Aloud | Sound waves | Audio playback |

**Pain points identified:**
- Four actions with no hierarchy—unclear which to use
- "Revise" vs "Adjust Speaking Style" distinction is unclear
- No indication of what each action actually does to the system

---

### Step 2: Revise Answer Modal

![Revise answer modal](./screenshots/02-revise-02-modal.png)

**Modal contents:**
- **Title:** "Revise Answer"
- **Subtitle:** "Revising your Delphi's answer will help it learn and improve its responses."
- **Label:** "Improved Answer"
- **Input:** Multi-line textarea pre-filled with current answer
- **Actions:** Cancel (secondary), Save Answer (primary)

**What's good:**
- Clear title
- Helpful subtitle explaining the purpose
- Pre-filled with existing answer (edit, don't rewrite)

**Pain points identified:**
- No indication of *how* this helps Delphi learn
- Unclear if this is question-specific or affects all similar questions
- No preview of what the result will look like
- No way to see the original answer for comparison while editing
- No character limit or formatting guidance

---

### Step 3: Toast Notification (After Save)

![Toast notification](./screenshots/02-revise-03-toast.png)

**Toast message:**
> "Delphi updated! New messages will have improved responses in new conversations after training which can take some time."

**Toast elements:**
- Green checkmark icon
- Dismissible (X button)
- Appears bottom-right of screen

**Critical pain points:**

| Issue | Why it's problematic |
|-------|---------------------|
| "New conversations" | Does this mean the current chat won't show the improvement? |
| "After training" | What training? How long? |
| "Can take some time" | Minutes? Hours? Days? |
| No verification path | How do I check if it worked? |
| Toast disappears | Information is ephemeral, no way to reference later |

---

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  CHAT INTERFACE                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Delphi Answer                                             │  │
│  │ "Co-founding Pickaxe.it since 2022..."                    │  │
│  └───────────────────────────────────────────────────────────┘  │
│  [ Revise ] [ Adjust Speaking Style ] [ Citations ] [ Read ]    │
│       │                                                         │
└───────┼─────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│  REVISE MODAL                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Title: "Revise Answer"                                    │  │
│  │ Subtitle: "Revising your Delphi's answer will help..."    │  │
│  │                                                           │  │
│  │ Improved Answer:                                          │  │
│  │ ┌─────────────────────────────────────────────────────┐   │  │
│  │ │ [Editable textarea with pre-filled answer]         │   │  │
│  │ └─────────────────────────────────────────────────────┘   │  │
│  │                                                           │  │
│  │                      [ Cancel ] [ Save Answer ]           │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
        │
        │ Click "Save Answer"
        ▼
┌─────────────────────────────────────────────────────────────────┐
│  TOAST NOTIFICATION (ephemeral)                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ ✓ Delphi updated! New messages will have improved        │  │
│  │   responses in new conversations after training which     │  │
│  │   can take some time.                                     │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│  ??? (NO NEXT STEP)                                             │
│                                                                 │
│  User is left in the same chat with the SAME answer displayed.  │
│  No way to verify the change. No way to see "before/after".     │
│  No indication of when training completes.                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key UX Problems

### 1. No Verification Loop
The user cannot confirm their revision worked. They must:
- Start a new conversation
- Ask the same question
- Hope the answer is different
- Remember what it said before

### 2. Vague Timing
"Can take some time" provides no mental model:
- Is it seconds? (Can I wait?)
- Is it hours? (Should I check back?)
- Is it days? (Did something break?)

### 3. Scope Ambiguity
Unclear what "improved responses" means:
- Just this exact question?
- Similar questions?
- All responses in this topic area?

### 4. Current Chat Unchanged
The chat they're in still shows the OLD answer. This creates cognitive dissonance—they "fixed" something but it looks the same.

### 5. No Undo/History
If the revised answer turns out worse, there's no way to revert.

---

## Questions for Investigation

- [ ] Does the chat interface answer update after training completes?
- [ ] How long does training actually take?
- [ ] Is there a training status indicator anywhere?
- [ ] Does this create a Q&A pair in the knowledge base?
- [ ] Can you see revision history anywhere?
- [ ] What happens if you revise the same answer multiple times?

---

## Comparison: Revise vs. Other Actions

| Action | What it does | Scope | Feedback |
|--------|--------------|-------|----------|
| **Revise** | Edits answer content | Unclear (this question? similar?) | Toast, then nothing |
| **Adjust Speaking Style** | Changes tone/manner | Unclear (all answers? this one?) | Unknown |
| **Citations** | Shows sources | N/A (read-only) | Unknown |
| **Read Aloud** | Audio playback | N/A (immediate) | Audio plays |

---

## Screenshots Reference

| File | Description |
|------|-------------|
| `02-revise-01-chat-interface.png` | Chat with answer and action buttons |
| `02-revise-02-modal.png` | Revise Answer modal with textarea |
| `02-revise-03-toast.png` | Toast notification after saving |
