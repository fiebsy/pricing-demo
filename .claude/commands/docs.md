---
description: Create comprehensive documentation with progressive disclosure structure
argument-hint: [topic] (e.g., "sticky-data-table", "control-panel", "animation system")
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Documentation Generator: **$ARGUMENTS**

Create structured, progressive disclosure documentation for the specified topic.

---

## Philosophy: Hick-Hyman Law Documentation

Documentation must be **agent-navigable** and **human-scannable**. This means:

1. **Progressive Disclosure**: Start broad, drill down for detail
2. **4-Option Maximum**: Each folder/section has ≤4 sub-items (except final leaf lists)
3. **Complete Coverage**: Every segment MUST have documentation - no gaps
4. **Index Files**: Every directory has an `init.md` as entry point

---

## Demo Repo Documentation Structure

```
docs/[category]/
├── init.md                    # Entry point - max 4 sections linked
├── [section-1]/
│   ├── init.md                # Section overview - max 4 sub-topics
│   ├── [topic-a].md           # Detailed topic doc
│   └── [topic-b].md
└── [section-2]/
    └── ...
```

**Existing documentation locations:**
- `docs/` - Project-level documentation
- `src/docs/base-ui/` - Base UI component docs
- `src/docs/motion-dev/` - Motion.dev reference
- `src/styles/docs/` - Style system documentation

---

## Step 1: Analyze the Topic

Before writing, gather context:

1. **Identify Scope**: What are the boundaries of this documentation?
2. **Find Existing Code/Docs**: Search for related files in demo-repo
3. **Map Dependencies**: What does this topic connect to?
4. **Determine Audience**: Who will read this? (devs, agents, both)

```bash
# Search for topic in demo-repo
grep -r "$ARGUMENTS" src/ --include="*.ts" --include="*.tsx" | head -20
find docs src/docs -name "*.md" | xargs grep -l "$ARGUMENTS" 2>/dev/null
```

---

## Step 2: Create the Hierarchy (Max 4 Rule)

### Level 1: Root `init.md`
- Maximum 4 major sections
- Each section = one folder with its own `init.md`
- Quick reference table for common operations

### Level 2: Section `init.md`
- Maximum 4 sub-topics per section
- Links to detailed topic files
- Section-specific quick reference

### Level 3: Topic Files (`[topic].md`)
- Full detail on specific topics
- Can have unlimited sub-sections within the file
- Code examples, API references, edge cases

**If a section needs >4 sub-topics, regroup into categories.**

---

## Step 3: Write the Root `init.md`

```markdown
# [Topic Title]

[One sentence description of what this documentation covers.]

**Location**: `src/[path-to-component]/`

---

## [Section 1 Name]

- [Sub-topic A](./section-1/topic-a.md): One-line description
- [Sub-topic B](./section-1/topic-b.md): One-line description

---

## [Section 2 Name]

- [Sub-topic A](./section-2/topic-a.md): One-line description
- ...

---

## Quick Reference

### [Most Common Operation]
```code
// Minimal example from demo-repo
```

---

## Related Documentation

| Topic | Location |
|-------|----------|
| [Related 1] | `docs/path/to/doc.md` |
| [Related 2] | `src/docs/path/to/other.md` |
```

---

## Step 4: Write Section & Topic Files

Follow the same patterns as the root, with section-specific content.

**Topic file structure:**
```markdown
# [Topic Title]

[Brief description]

## Overview
## Basic Usage
## [Core Concepts]
## Common Patterns
## API Reference
## Edge Cases & Gotchas
## Related
```

---

## Step 5: Completeness Checklist

### Structure
- [ ] Root `init.md` has ≤4 top-level sections
- [ ] Each section folder has its own `init.md`
- [ ] Each `init.md` has ≤4 links (except final topic lists)
- [ ] All links are valid relative paths

### Content
- [ ] Every section has documentation (no empty folders)
- [ ] Every topic file has: Overview, Basic Usage, Examples
- [ ] Code examples are copy-pasteable from demo-repo
- [ ] Quick reference tables at each level

### Navigation
- [ ] Agent can reach any detail in ≤3 file reads
- [ ] Cross-links between related topics
- [ ] "Related" section in each topic file

---

## Step 6: Output Summary

After creating documentation, output:

```
## Documentation Created: [Topic]

### Structure
docs/[category]/
├── init.md
├── [section-1]/
│   ├── init.md
│   └── [topic-a].md
└── [section-2]/
    └── ...

### Files Created
- `docs/[category]/init.md` - Entry point
- ...

### Navigation Test
1. Start: init.md → See 4 sections
2. Drill: section-1/init.md → See 4 topics
3. Detail: section-1/topic-a.md → Full implementation

### Next Steps
- [ ] Review and test code examples
- [ ] Update CLAUDE.md Documentation table if needed
```

---

## Demo Repo Specific References

### Component Documentation Pattern

For documenting components in `src/components/ui/prod/`:

```
docs/design-system/[component-name]/
├── init.md                    # Overview, API, Styling, Examples
├── api/
│   ├── init.md
│   ├── props.md
│   └── types.md
├── styling/
│   ├── init.md
│   └── customization.md
└── examples/
    ├── init.md
    └── basic-usage.md
```

### Style Documentation Pattern

For documenting utilities in `src/styles/`:

```
src/styles/docs/[category]/
├── init.md
└── [utility].md
```

---

## Anti-Patterns to Avoid

1. **Flat dumps**: Don't put everything in one massive file
2. **Empty sections**: Every folder MUST have content
3. **Deep nesting**: Max 3 levels deep (root → section → topic)
4. **Missing examples**: Every topic needs working code from demo-repo
5. **Orphan files**: Every file must be linked from an `init.md`
6. **Frontend paths**: Don't reference PAYVA frontend paths - keep demo-repo self-contained

---

## Start Now

1. Analyze the topic: **$ARGUMENTS**
2. Search demo-repo for existing code and docs
3. Determine the appropriate location in `docs/` or `src/docs/`
4. Create the hierarchical structure
5. Write each file with complete content
6. Verify all links and navigation
7. Output the summary
