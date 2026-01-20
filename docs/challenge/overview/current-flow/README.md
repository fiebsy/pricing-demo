# Current Flow Documentation

> Screenshot-based documentation of the existing Delphi experience for the design challenge.

---

## Priority Analysis

Based on the challenge brief, these are the flows ranked by importance for understanding the **broken improvement loop**:

### Critical Priority (Must Document)

| Flow | Why It Matters | Screenshots Needed |
|------|----------------|-------------------|
| **Question → Answer Preview** | This is the anchor point. How does clicking a question show the answer? | Entry state, loading state, answer displayed |
| **Answer Revision Flow** | Direct editing path. Unclear if it adds to knowledge base. | Edit modal, confirmation, result |
| **Q&A Training Flow** | The "proper" way to train. Shows the disconnect. | Add Q&A button, training progress, completion feedback |
| **Feedback Loop (or lack thereof)** | Core problem: users don't know if changes worked. | Before/after states, any confirmation UI |

### High Priority (Should Document)

| Flow | Why It Matters | Screenshots Needed |
|------|----------------|-------------------|
| **Profile Overview** | Context for where questions live. Shows bio/topics/questions hierarchy. | Full profile view, topic sections |
| **Question List States** | Entry point for the loop. What can users do from here? | Empty state, populated state, hover/active states |
| **Mind Settings** | Where users end up but shouldn't. Document to show what to avoid. | Settings panel, options available |

### Medium Priority (Nice to Have)

| Flow | Why It Matters | Screenshots Needed |
|------|----------------|-------------------|
| **Published Profile View** | Visitor experience. Shows what creators are building toward. | Public profile, question interactions |
| **Knowledge Base Sources** | How content feeds the system. | Upload UI, interview flow |
| **Topic Management** | Secondary to questions but part of the hierarchy. | Add/edit topics |

---

## Screenshot Checklist

### 1. Question → Answer Preview (CRITICAL)

```
current-flow/
├── 01-question-answer-preview/
│   ├── 01-profile-questions-list.png
│   ├── 02-question-hover-state.png
│   ├── 03-question-clicked.png
│   ├── 04-answer-loading.png
│   ├── 05-answer-displayed.png
│   └── 06-answer-no-info.png (when Delphi doesn't know)
```

**Key moments to capture:**
- What does the user see when they first land on questions?
- What happens on hover?
- What happens on click?
- How does the answer appear? (Modal? Inline? New page?)
- What if Delphi doesn't have info?

---

### 2. Answer Revision Flow (CRITICAL)

```
current-flow/
├── 02-answer-revision/
│   ├── 01-revise-button-location.png
│   ├── 02-revision-interface.png
│   ├── 03-editing-in-progress.png
│   ├── 04-save-confirmation.png
│   └── 05-result-unclear.png (what feedback do they get?)
```

**Key moments to capture:**
- Where is the "revise" action?
- What does the editing interface look like?
- What feedback after saving?
- **CRITICAL:** Is it clear this goes to knowledge base?

---

### 3. Q&A Training Flow (CRITICAL)

```
current-flow/
├── 03-qa-training/
│   ├── 01-plus-button-location.png
│   ├── 02-add-qa-interface.png
│   ├── 03-training-triggered.png
│   ├── 04-training-progress.png
│   ├── 05-training-complete.png
│   └── 06-answer-updated.png
```

**Key moments to capture:**
- Where is the "add Q&A" action?
- What happens when you submit?
- How is training progress shown?
- How do you know training is done?
- **CRITICAL:** How is the updated answer shown?

---

### 4. Feedback Loop Gaps (CRITICAL)

```
current-flow/
├── 04-feedback-gaps/
│   ├── 01-no-confirmation.png
│   ├── 02-unclear-status.png
│   ├── 03-no-before-after.png
│   └── 04-user-confusion-points.png
```

**Document the absence:**
- Where do users lack feedback?
- What confirmations are missing?
- Where does the flow just... end?

---

### 5. Profile Overview (HIGH)

```
current-flow/
├── 05-profile-overview/
│   ├── 01-full-profile-view.png
│   ├── 02-bio-section.png
│   ├── 03-topics-section.png
│   └── 04-questions-section.png
```

---

### 6. Mind Settings (HIGH)

```
current-flow/
├── 06-mind-settings/
│   ├── 01-how-users-get-here.png
│   ├── 02-settings-overview.png
│   ├── 03-speaking-style.png
│   └── 04-custom-instructions.png
```

**Why document this:** Users shouldn't end up here, but they do. Show why it's confusing.

---

## Documentation Format

For each screenshot, create a companion `.md` file with:

```markdown
# [Screen Name]

**URL:** [if applicable]
**Previous:** [what screen came before]
**Next:** [what screens can follow]

## What the user sees
[Description]

## Available actions
- Action 1 → leads to...
- Action 2 → leads to...

## Pain points
- [What's confusing here]
- [What's unclear]

## Questions to answer
- [Things to investigate]
```

---

## Recommended Capture Order

1. **Start at Profile** - Get the full context
2. **Click a question** - Follow the primary path
3. **Try to improve an answer** - Both revision and Q&A training
4. **Document the gaps** - Where feedback is missing
5. **Visit Mind Settings** - Show the "wrong" destination

---

## Notes

Add observations as you capture:

- [ ] How long does training take?
- [ ] Is there any loading state during preview?
- [ ] What happens if you edit then navigate away?
- [ ] Are there keyboard shortcuts?
- [ ] Mobile experience differences?
