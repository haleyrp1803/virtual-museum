# Project Workflow Charter

## Executive Summary

This Charter is the controlling process document for safely changing the History of Education horizontal-course project. It defines source-of-truth continuity, bounded-pass planning, full-file review, delivery and testing safeguards, recovery procedure, documentation governance, dependency constraints, and the durable human–AI division of labor.

Use it before every implementation or documentation pass. The [Maintainer’s Guide](MAINTAINERS_GUIDE.md) governs current architecture, the [Lesson Design and Teaching Guide](LESSON_DESIGN_AND_TEACHING_GUIDE.md) governs pedagogical/curatorial requirements, and the [Changelog](CHANGELOG.md) governs chronology.

## Quick Navigation

- [Non-negotiable operating rules](#1-non-negotiable-operating-rules)
- [Delivery, testing, and commit protocol](#2-delivery-testing-and-commit-protocol)
- [Recovery protocol](#3-recovery-protocol)
- [Documentation governance](#4-documentation-governance)
- [Dependency and tooling freeze](#5-dependency-and-tooling-freeze)
- [Project-specific cautions](#6-project-specific-cautions)
- [Decision records](#7-decision-records)
- [Handoff and completion template](#8-handoff-and-completion-template)

## Document Role and Boundaries

This Charter owns mandatory process rules, source-of-truth continuity, delivery/recovery protocol, commit discipline, documentation preservation, tooling constraints, and decision governance. It does not own the full architecture, lesson-authoring manual, public workflow, or commit history.

Current synchronized checkpoint:

```text
bead569 — Remove obsolete stylesheet compatibility rules
Branch: main
Status: local and origin/main aligned after the latest sync ritual
```

## 1. Non-Negotiable Operating Rules

### 1.1 Source of truth and applied-file continuity

At the start of every pass, establish one authoritative source:

- the local project folder;
- a specific uploaded full project;
- or a synchronized Git commit confirmed through the user’s latest sync ritual.

Current project source of truth:

```text
C:\Users\haley\OneDrive\Desktop\virtual-museum\
```

Do not treat generated ZIPs, temporary extraction folders, prior uploads, the live GitHub Pages build, and GitHub source as co-equal authorities during one pass.

After Haley applies and tests an uncommitted replacement, the resulting local file becomes authoritative for that file. Before later changing it:

- obtain the exact current file; or
- work from a newly committed synchronized state.

Do not regenerate broad replacements from an older pass package.

### 1.2 Main-branch default

The normal project line is `main`.

Do not create an experimental branch merely because a design direction is changing. Use a branch only when Haley explicitly requests one or when a clearly stated high-risk experiment needs isolation.

The horizontal-course prototype was briefly placed on a separate branch because preservation of the prior museum model was incorrectly inferred as a requirement. That assumption was corrected; `main` is authoritative.

### 1.3 Bounded-pass rule

Before implementation, state:

- change type: behavior, visual, structural, or documentation;
- goal;
- in-scope files or systems;
- out-of-scope systems;
- plain-language acceptance test;
- expected artifact.

Do not combine unrelated feature work, visual redesign, structural cleanup, and documentation synchronization unless Haley explicitly chooses that scope.

### 1.4 Full-file review

Before editing, read the complete current affected files from the real source of truth.

This is mandatory for fragile files including:

- `src/App.jsx`
- `src/components/Notebook.jsx`
- `src/components/CourseStop.jsx`
- `src/hooks/useCourseNavigation.js`
- `src/hooks/useLocalWorkspace.js`
- `src/hooks/useWorkspacePersistence.js`
- `src/styles/global.css` and the affected imported stylesheet layer
- `src/data/course.js`
- `src/data/validateCourseData.js`

Do not patch from remembered snippets or an older prototype archive.

Small targeted edits are allowed only after full-file review and only when:

- the anchor is unique;
- the edit is truly local;
- stale code cannot be reintroduced;
- risk is lower than a complete replacement.

### 1.5 Ordered stylesheet safeguard

`src/styles/global.css` is an import ledger for six ordered plain-CSS layers. The import order is a high-risk shared dependency because later layers intentionally preserve accepted overrides.

For a styling correction:

- read `global.css` and the complete affected layer;
- identify which later layers may override the same selectors;
- verify selectors against current component markup;
- preserve the import order unless the pass explicitly changes cascade architecture;
- prefer a narrow source-verified edit;
- do not copy rules into a different layer merely for thematic neatness;
- do not assume repeated selectors are duplicates—many are partial historical overrides.

Earlier notebook anchoring defects were caused by class/selector mismatch. Pass 6B also confirmed that most repeated selectors could not be deleted safely. Inspect both markup and all relevant cascade layers before changing docking or viewport behavior.

### 1.6 Human-readable comments

Code comments should explain:

- ownership boundaries;
- non-obvious data flow;
- fragile coupling;
- compatibility paths;
- why a decision exists.

Do not add comments that merely restate syntax. Update nearby comments when a route, component role, or workflow changes.

### 1.7 Most-recent-upload rule

When current files are uploaded for a pass, the newest upload is authoritative unless Haley states otherwise.

Do not assume same-name files already present in `/mnt/data` are current.

### 1.8 Fragile-zone preflight

Before touching a fragile zone, state:

- what could break;
- what is deliberately out of scope;
- how the result will be verified.

The detailed regression matrix belongs in the Maintainer’s Guide.

## 2. Delivery, Testing, and Commit Protocol

### 2.1 Assistant responsibility

The assistant prepares code edits and replacement files. Do not instruct Haley to manually edit source code except in an explicitly agreed emergency.

### 2.2 Delivery format

Default implementation delivery:

- complete, uniquely versioned replacement ZIP for broad multi-file passes when Haley requests or accepts ZIP workflow;
- complete individual replacement files for narrow work;
- exact PowerShell extraction/copy commands;
- local run command;
- explicit QA sequence.

Do not reuse a prior replacement filename.

On Windows PowerShell use:

```powershell
npm.cmd run dev
```

rather than `npm run dev` when execution policy blocks `npm.ps1`.

### 2.3 Testing before commit

A replacement is not accepted merely because it was generated.

Haley tests locally. The assistant should provide a bounded acceptance sequence.

After acceptance:

```powershell
git status
git add .
git commit -m "<coherent outcome>"
git push origin main
git status
git log -3 --oneline
```

A clean final ritual aligned with `origin/main` establishes the new synchronized source.

### 2.4 Checkpoint versus commit

- **Checkpoint:** tested recoverable state that may still be revised immediately.
- **Commit:** coherent completed pass with one clear outcome.

Use meaningful commits after accepted feature groups. Do not force a commit after every cosmetic adjustment unless recoverability or handoff requires it.

### 2.5 GitHub Pages

Pushing to `main` triggers GitHub Actions deployment. GitHub Pages must use GitHub Actions, not branch/Jekyll deployment.

Do not add `.nojekyll` as a speculative fix when the Vite Actions pipeline is configured correctly.

## 3. Recovery Protocol

When something goes wrong:

1. Stop further edits.
2. Identify the current source of truth.
3. Inspect the browser console early for runtime errors.
4. Restore or verify the last accepted checkpoint.
5. Restate the goal in one sentence.
6. Diagnose the actual implementation cause.
7. Make one bounded correction.
8. Rerun the acceptance test.

Do not stack speculative fixes.

When Haley asks why something is broken, explain the concrete cause before repairing it. The notebook docking correction established this expectation: identify selector/class or layout-state failures rather than blindly moving CSS.

## 4. Documentation Governance

### 4.1 Core documents

The core documentation set is:

- root `README.md`
- `core_documentation/MAINTAINERS_GUIDE.md`
- `core_documentation/LESSON_DESIGN_AND_TEACHING_GUIDE.md`
- `core_documentation/PROJECT_WORKFLOW_CHARTER.md`
- `core_documentation/CHANGELOG.md`

### 4.2 Required front matter

Each core document begins with:

1. Title
2. Executive Summary
3. Quick Navigation
4. Document Role and Boundaries
5. Current Synchronized Checkpoint

Only the Changelog expands the current checkpoint into a milestone narrative.

### 4.3 Primary ownership

| Information | Primary home |
|---|---|
| Public purpose and learner workflow | README |
| Current architecture and technical implementation | Maintainer’s Guide |
| Pedagogy, curation, lesson structure, source requirements | Lesson Design and Teaching Guide |
| Mandatory process and decision governance | Project Workflow Charter |
| Milestones, redirected work, commit chronology | Changelog |

Use concise cross-references instead of maintaining competing copies.

### 4.4 Additive preservation rule

Core documentation is additive and exhaustive by default.

Before removing or condensing information, identify where the following will remain available:

- decision rationale;
- historical redirections;
- rollback lessons;
- fragile-zone cautions;
- privacy and data policy;
- accessibility contracts;
- accepted interface models;
- file references;
- test expectations.

Reorganization is not permission to delete project knowledge.

### 4.5 What may be revised normally

Normal maintenance may revise:

- Executive Summaries;
- Quick Navigation;
- role/boundary statements;
- checkpoint blocks;
- headings and section order;
- cross-references;
- clear duplication;
- demonstrably obsolete or misleading claims.

Historical material should be labeled:

- Current
- Historical
- Archived
- Deferred
- Rolled back
- Superseded
- Compatibility path
- Experimental

### 4.6 Documentation preflight

Before a core-documentation pass:

1. read all five current documents in full;
2. confirm the clean synchronized checkpoint;
3. inspect the current source files affected by documented claims;
4. classify each new fact by primary home;
5. identify what must be preserved;
6. state the documentation-pass boundary.

### 4.7 Documentation completion

Before delivery:

- verify the checkpoint in all documents;
- verify links and paths;
- verify no stale current-state claim remains;
- preserve redirected and rejected approaches;
- add the documentation milestone to the Changelog;
- provide complete replacement files and exact copy commands.

## 5. Dependency and Tooling Freeze

Do not change:

- React or Vite versions;
- package manager files;
- build scripts;
- GitHub Actions;
- Vite base path;
- filenames;
- folder structure;
- lint/format tooling

unless the pass is explicitly about tooling or architecture.

The current package declares React 19.2.8, React DOM 19.2.8, Vite 8.1.5, and `@vitejs/plugin-react` 6.0.4.

## 6. Project-Specific Cautions

### Horizontal course viewport

Routine vertical page scrolling conflicts with the chosen interaction model. Preserve stop-level viewport containment.

### Notebook anchoring

The side notebook must:

- dock on the right;
- begin below the header;
- end above the bottom timeline;
- remain outside ordinary document flow.

Component classes and CSS docking selectors must agree.

### Course Map

The accepted Course Map uses complete discrete SVG segments switched between dotted and solid states. Do not restore clipped-progress or path-length interpolation without an explicit replacement design.

### Learner privacy

Do not introduce external storage, analytics, authentication, or learner submission without a dedicated privacy/security decision.

### Published lessons

The intended product direction treats modules as fully designed and polished before publication. Future corrections still need a formal versioning policy.

### Active versus archival source

Root-level source is active. The tracked `virtual-museum-prototype-pass2/` folder is archival and must not be used as an implementation baseline.

## 7. Decision Records

### 7.1 Product model

**Decision:** Use a horizontal historical course rather than a virtual museum.

**Context:** The project needed a stronger interaction sequence and a clearer relationship between chronology, module grouping, and learner progress.

**Chosen approach:** A horizontally progressing course with visually coherent eras, persistent timeline navigation, and transition zones.

**Rejected alternative:** A set of virtual museum rooms organized around free artifact exploration.

**Reason:** The course model better supports Georga’s guided teaching, chronological movement, and modular lesson design.

**Maintenance consequence:** New features should reinforce course stops, era clusters, and historical transitions rather than reintroducing room-navigation architecture.

### 7.2 Learner data

**Decision:** Keep learner work private and local.

**Chosen approach:** IndexedDB after consent or fully functional session-only storage.

**Rejected alternative:** Accounts, remote database, discussion boards, public submissions.

**Reason:** The team does not want to assume cybersecurity, moderation, and student-data responsibilities.

**Maintenance consequence:** Every learner feature must work without a backend.

### 7.3 Field Notebook

**Decision:** Present learner records as a game-inspired academic fieldbook.

**Chosen approach:** Minimized, docked, and full modes with stable Notes, Glossary, Activities, Bookmarks, Resources, and Course Map sections.

**Rejected alternative:** Generic LMS dashboard and notification-driven journal.

**Reason:** The fieldbook should model what the learner has encountered and support retrieval without gamified compliance.

**Maintenance consequence:** Avoid alert bubbles, points, streaks, and completion rewards.

### 7.4 Course Map

**Decision:** Use a vertically curving chronological route inside the notebook.

**Chosen approach:** Fixed nodes and complete discrete connector segments.

**Rejected alternatives:** Straight horizontal timeline compressed into the notebook; clipped continuous path; percentage-based path reveal.

**Reason:** Curving fits the vertical page while discrete states avoid rendering artifacts.

**Maintenance consequence:** Stop IDs, node IDs, and segments must remain synchronized.

### 7.5 Accessibility scope

**Decision:** Support multiple equivalent desktop navigation methods rather than drag-only or wheel-only movement.

**Chosen approach:** wheel, trackpad, keyboard, buttons, timeline, and Course Map.

**Maintenance consequence:** Every navigation change must be keyboard-tested and provide reduced-motion behavior.

### 7.6 Mobile

**Decision:** Do not support mobile during the current design phase.

**Reason:** Translating the horizontal, viewport-contained course and docked fieldbook would require a distinct experience rather than a simple responsive compression.

**Maintenance consequence:** Do not claim mobile support based on residual CSS.

## 8. Handoff and Completion Template

Every implementation pass ends with:

- change type;
- what changed;
- exact files changed;
- acceptance test;
- whether it is a checkpoint or commit;
- exact extraction/copy/run commands;
- known residual risks.

A fresh-chat handoff should include:

```text
Source: C:\Users\haley\OneDrive\Desktop\virtual-museum\
Branch: main
Checkpoint: bead569 — Remove obsolete stylesheet compatibility rules
```

It should also include the narrow current task and the affected current source files. Before development, read the root README and all four core documents.
