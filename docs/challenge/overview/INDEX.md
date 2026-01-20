# Delphi Design Challenge

> **Time:** 5-6 hours
> **Presentation:** 45 min with team (25 min walkthrough, 20 min discussion)
> **Deadline:** 3 days from receipt → Submit to basten@delphi.ai

---

## Table of Contents

1. [Context](#1-context)
2. [Current Product Architecture](#2-current-product-architecture)
3. [The Problem](#3-the-problem)
4. [The Challenge](#4-the-challenge)
5. [Deliverables](#5-deliverables)
6. [Evaluation Criteria](#6-evaluation-criteria)
7. [Key Insights from Loom Walkthrough](#7-key-insights-from-loom-walkthrough)
8. [Supplemental Materials](#8-supplemental-materials)

---

## 1. Context

### What is Delphi?

Delphi lets people create digital versions of themselves—an AI that talks, thinks, and responds the way you do. It handles repetitive conversations and FAQs on your behalf, so you only come in when the conversation gets interesting.

### User's Primary Goal

**Become "share-ready" in one sitting and feel confident that their Delphi answers questions well.**

### Entry Point

- **Product URL:** https://studio.delphi.ai/identity
- **Login:** Use the email the instructions were sent to

---

## 2. Current Product Architecture

### Profile Elements (Connected System)

| Element | Description | Level |
|---------|-------------|-------|
| **Bio** | Who you are, what you're known for | Profile |
| **Topics** | Areas of expertise highlighted in bio (optional) | Profile |
| **Questions** | Suggested questions users would likely get asked | Profile-level FAQs OR Topic-specific |
| **Answers** | How your Delphi responds (AI-generated, shaped by training data + style settings) | Per question |

### How Elements Connect

```
Bio
 └── Topics (highlighted in bio)
      └── Questions (belong to topics OR profile overall)
           └── Answers (respond to specific questions)
```

### Knowledge Base Sources

Users can add content to their "mind" via:

- Files (upload)
- Interviews (topic-specific Q&A format)
- Website links
- YouTube videos / channels
- Notion, Evernote, Google Drive connections

### Mind Settings (Technical Controls)

| Setting | Description |
|---------|-------------|
| Purpose | Prompt for the Delphi |
| Custom Instructions | e.g., "never use bullets", "keep it short and concise" |
| Fallback Behavior | How Delphi communicates when it doesn't have an answer |
| Response Length | Controls verbosity |
| Creativity | How strict/creative responses are |
| Speaking Style | Tone and manner of response |

**Note:** Creators often end up in Mind Settings but we don't want them there—it's too technical.

---

## 3. The Problem

### Current State Assessment

| Area | Status |
|------|--------|
| Bio ↔ Topics ↔ Questions | Somewhat connected. Could be better, but functional. |
| Questions ↔ Answers ↔ Preview/Train/Steer | **Disconnected from each other** |

### Core Issue

**A broken improvement loop:**

Users can't clearly:
1. **See** how their Delphi answers a question
2. **Take action** to improve it
3. **Verify** that the change worked

### Fragmented Experience

When a user clicks on a question to see how their Delphi would answer:

- Previewing the answer
- Editing it
- Training for better answers
- Giving feedback

...are all **disconnected flows**. It's unclear what each action does or whether it worked.

### Result

Users complete setup but:
- Can't form a mental model of how to improve their Delphi
- Leave before it's share-ready
- Those who succeed do so through trial and error + clicking around

---

## 4. The Challenge

### Anchor Point

**Profile → Questions list → Click a question**

You may reference other parts of the product, but this is the primary entry point.

---

### Solution A: Constrained

**Engineering time:** 1-3 weeks

**Objective:** Highest-leverage improvement to help users understand and improve how their Delphi answers a question.

**Focus:** One key interaction that meaningfully improves the **preview → improve → verify** loop.

**Required in addition to design:**
1. What user behavior you expect to change if this ships
2. One or two signals you'd look at to know if it worked

---

### Solution B: Unconstrained

**Engineering time:** No constraints

**Objective:** Design the ideal experience for a user to:
- Understand how their Delphi answers questions
- Improve it
- See how their Delphi profile looks

**Demonstrate:** Full loop of **preview → steer/train → verify**

---

## 5. Deliverables

### Format Options (Pick ONE for both solutions)

| Format | Maximum |
|--------|---------|
| Loom or video | 12 minutes |
| PDF with visuals or written doc | 6 pages |
| Slides | 12 slides |

### Required for Each Solution

1. **What you focused on and why**
   - What's the opportunity?
   - Why start here?

2. **The design** (show the flow, not just a concept)
   - How does the user get here?
   - What do they see?
   - What actions can they take?
   - What happens after?
   - What are the key states?

3. **How this improves the experience**
   - What changes for the user?
   - What's now possible that wasn't before?

### Fidelity Guidance

- Breadboards, wireframes, static frames, prototypes—whatever communicates fastest
- Don't match Delphi's design system
- **Show depth:** user flows, key states, how pieces connect
- A one-page concept sketch won't cut it

### Solution A Specific Guidance

**Zoom in on one key moment.** Pick the most critical interaction and show:
- What does the user see?
- What can they do?
- What feedback do they get?
- What are the edge cases?

This is where they want to see **design craft**.

### Compatibility Note

Solutions should work with the current product. If removing features, explain why they're not needed.

---

## 6. Evaluation Criteria

| Dimension | What they're looking for |
|-----------|--------------------------|
| **Problem Identification** | Did you find a real, acute pain point? |
| **UX Depth** | Is the thinking thorough? User flows, states, edge cases. Low fidelity is fine. Shallow thinking isn't. |
| **System Thinking** | Do you understand how the pieces connect? Solutions should work with the existing system. |
| **Constrained Judgment** | Can you scope to 1-2 weeks while still being meaningful? |
| **Unconstrained Vision** | How do you showcase your best ideas with limited time? |
| **Communication** | Is your thinking and communication clear and concise within the format caps? |

### Key Quote

> "We're not looking for one 'right answer.' We want to see how you identify opportunities, design systems, make tradeoffs, and communicate your thinking."

---

## 7. Key Insights from Loom Walkthrough

### User Journey Observed

1. Creator completes onboarding → lands on Delphi profile page
2. Profile shows: bio, suggested questions, topics with corresponding questions
3. Published profile = exact visitor experience
4. Visitors can: read bio, click topics, see questions, get on a call, ask open-ended questions, or click suggested questions

### Training Loop Example (Where did you grow up?)

1. User adds question "Where did you grow up?"
2. Saves and sees it on profile
3. Clicks to test → Delphi doesn't have that info
4. **Option A:** Revise answer directly (unclear if this adds to knowledge base)
5. **Option B:** Add Q&A pair via plus button → triggers training loop → answer updates after learning completes

### Answer Editing Motivations

| Type | Description |
|------|-------------|
| **Substance** | Answer is wrong or incomplete |
| **Style** | Don't like how Delphi sounds/speaks (e.g., "I don't want bulleted answers") |

### Style Editing Pain Points

- Users don't know what "speaking style" means
- Unclear if changes are universal or question-specific
- Unclear if Delphi will remember and maintain the change

### Design Goal (from Mel)

> "What would be a loop, a training and steering loop, that would be a complete experience where a creator with very little context—who has not watched this video and doesn't know how any of this works—can come in, see the value immediately, see an answer, edit that for all the various ways, and then get a feedback loop where they understand or get a confirmation of what just happened."

---

## 8. Supplemental Materials

*Add additional notes, current onboarding format, and other reference materials below.*

---

## Directory Structure

```
docs/challenge/
├── INDEX.md                        # This document (core framework)
├── sources/
│   ├── loom-transcript.md          # Raw transcript from Mel's walkthrough
│   └── challenge-brief.md          # Original challenge document
└── notes/                          # Your supplemental notes (create as needed)
    ├── onboarding-flow.md
    ├── product-observations.md
    └── ...
```

### Source Documents

| File | Description |
|------|-------------|
| [sources/loom-transcript.md](./sources/loom-transcript.md) | Full timestamped transcript of Mel's Loom walkthrough |
| [sources/challenge-brief.md](./sources/challenge-brief.md) | Original challenge document as provided |

### Supplemental Notes

*(Add your notes here)*

---

## Quick Reference

### The Loop to Fix

```
CURRENT (Broken):
Preview → ??? → Edit → ??? → Train → ??? → Did it work?

GOAL:
Preview → Improve → Verify (clear, connected, confident)
```

### Key Questions to Answer

1. How does a user **see** their Delphi's answer?
2. How do they **improve** it (substance or style)?
3. How do they **verify** the improvement worked?
4. How do they **understand** what they just did?

### Success State

User becomes **share-ready in one sitting** with **confidence** their Delphi answers well.
