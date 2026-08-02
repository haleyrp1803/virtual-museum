# Project Workflow Charter

## Executive Summary

This Charter is the controlling process document for safely changing the History of Education horizontal-course project. It defines source-of-truth continuity, bounded-pass planning, full-file review, delivery and testing safeguards, recovery procedure, documentation governance, dependency constraints, and the durable human–AI division of labor.

Use it before every implementation or documentation pass. The [Maintainer’s Guide](MAINTAINERS_GUIDE.md) governs current architecture, the [Lesson Design and Teaching Guide](LESSON_DESIGN_AND_TEACHING_GUIDE.md) governs pedagogical and curatorial requirements, the design documentation governs exact visual choices and provenance, and the [Changelog](CHANGELOG.md) governs chronology.

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

This Charter owns mandatory process rules, source-of-truth continuity, delivery/recovery protocol, commit discipline, documentation preservation, tooling constraints, and decision governance. It does not own full architecture, lesson-authoring detail, exact theme values, asset credits, public orientation, or commit history.

Current synchronized implementation checkpoint:

```text
0d0d09d — Add full-course era design flow samples
Branch: main
Status: local and origin/main aligned after the latest sync ritual
```

## 1. Non-Negotiable Operating Rules

### 1.1 Source of truth and applied-file continuity

At the start of every pass, establish one authoritative source:

- the local project folder;
- a specific uploaded full project;
- or a synchronized Git commit confirmed through the latest sync ritual.

Current project source of truth:

```text
C:\Users\haley\OneDrive\Desktop\virtual-museum\
```

Do not treat generated ZIPs, extraction folders, previous uploads, live GitHub Pages output, and GitHub source as co-equal authorities during one pass.

After Haley applies and tests an uncommitted replacement, the resulting local file becomes authoritative for that file. Before later changing it, obtain the exact current file or reconstruct it only when continuity is complete and explicit.

A fresh repository ZIP is **not required for every consecutive pass**. Continue from the accepted current state when:

- the assistant has the full prior source;
- every intervening replacement file is known;
- Haley made no additional manual edits to affected files;
- the commit/checkpoint is confirmed.

Request a fresh source package when there is a genuine continuity gap, unknown local edit, conflicting upload, or newly affected file whose current contents are unavailable.

### 1.2 Main-branch default

The normal project line is `main`. Do not create an experimental branch merely because design direction changes. Use a branch only when Haley explicitly requests one or a clearly stated high-risk experiment requires isolation.

### 1.3 Bounded-pass rule

Before implementation, state:

- change type;
- goal;
- in-scope files or systems;
- out-of-scope systems;
- plain-language acceptance test;
- expected artifact.

Do not combine unrelated behavior, visual redesign, structural cleanup, and documentation synchronization unless Haley explicitly chooses that scope.

### 1.4 Full-file review

Before editing, read the complete current affected files from the real source of truth.

This is mandatory for fragile files including:

- `src/App.jsx`
- `src/main.jsx`
- `src/components/Notebook.jsx`
- `src/components/CourseStop.jsx`
- `src/components/ThemePreview.jsx`
- `src/hooks/useCourseNavigation.js`
- `src/hooks/useLocalWorkspace.js`
- `src/hooks/useWorkspacePersistence.js`
- `src/data/course.js`
- `src/data/eraThemes.js`
- `src/data/courseMapLayout.js`
- `src/data/validateCourseData.js`
- `src/styles/global.css` and every affected imported layer.

Do not patch from remembered snippets or an older archive.

Small targeted edits are allowed only after full-file review and when the anchor is unique, the edit is local, stale code cannot be reintroduced, and risk is lower than complete replacement.

### 1.5 Ordered stylesheet safeguard

`src/styles/global.css` is an import ledger for six ordered CSS layers. Source order is a high-risk shared dependency.

For styling work:

- read `global.css` and complete affected layers;
- identify later overriding layers;
- verify selectors against current markup;
- preserve import order unless the pass explicitly changes cascade architecture;
- prefer narrow source-verified edits;
- do not move rules merely for thematic neatness;
- do not assume repeated selectors are duplicates.

### 1.6 Theme-system safeguard

Before changing a design pack or transition:

- read `src/data/eraThemes.js`;
- read the relevant `horizontal-course.css` sections;
- read `ERA_THEME_DESIGN_SPECIFICATION.md`;
- read `THEME_ASSET_PROVENANCE.md` when assets are involved;
- verify live course and preview behavior;
- distinguish decorative colors from accessible functional roles;
- test adjacent transitions, not only the target era.

Do not treat transitions as flat palette averages. Preserve the documented persists/fades/emerges/structure logic.

### 1.7 Human-readable comments

Comments should explain ownership, non-obvious data flow, fragile coupling, compatibility paths, and decision rationale. Do not add comments that merely restate syntax.

### 1.8 Most-recent-upload rule

When current files are uploaded, the newest upload is authoritative unless Haley states otherwise. Do not assume same-name files already present in temporary storage are current.

### 1.9 Fragile-zone preflight

Before touching a fragile zone, state:

- what could break;
- what is deliberately out of scope;
- how the result will be verified.

### 1.10 Diagnose before repair

When Haley asks why something is broken, explain the concrete implementation cause before repairing it. Do not stack speculative fixes.

## 2. Delivery, Testing, and Commit Protocol

### 2.1 Assistant responsibility

The assistant prepares code edits and replacement files. Do not instruct Haley to manually edit source except in an explicitly agreed emergency.

### 2.2 Delivery format

Default implementation delivery:

- complete uniquely versioned replacement ZIP for multi-file passes;
- complete individual replacement files for narrow work;
- exact PowerShell extraction/copy commands;
- local validation/build/run commands;
- explicit QA sequence;
- known residual risks.

Do not reuse replacement filenames. Do not add a separate manifest when the chat can state the changed files directly.

On Windows PowerShell use:

```powershell
npm.cmd run dev
npm.cmd run build
npm.cmd run validate:architecture
```

### 2.3 Testing before commit

A replacement is not accepted merely because it was generated.

Haley tests locally. The assistant provides a bounded acceptance sequence.

Typical pre-commit checks:

```powershell
npm.cmd run validate:architecture
npm.cmd run build
```

Feature-specific QA follows the Maintainer’s Guide regression matrix.

### 2.4 Commit and sync ritual

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

### 2.5 Checkpoint versus commit

- **Checkpoint:** tested recoverable state that may still be revised immediately.
- **Commit:** coherent completed outcome.

Use meaningful commits after accepted feature groups. Do not force a commit after every minor visual adjustment unless recoverability requires it.

### 2.6 Git object warnings

A transient permission warning from a OneDrive-hosted `.git` object should be verified with:

```powershell
git fsck --full
```

A successful fsck with only dangling unreachable objects does not indicate repository corruption. Reclone only if errors persist or reachable objects are missing.

### 2.7 GitHub Pages

Pushing to `main` triggers GitHub Actions deployment. GitHub Pages must use GitHub Actions, not branch/Jekyll deployment. Do not add `.nojekyll` as a speculative fix when the Vite pipeline is correct.

## 3. Recovery Protocol

When something goes wrong:

1. Stop further edits.
2. Identify the current source of truth.
3. Inspect the browser console early.
4. Restore or verify the last accepted checkpoint.
5. Restate the goal in one sentence.
6. Diagnose the actual implementation cause.
7. Make one bounded correction.
8. Rerun the acceptance test.

Do not stack speculative fixes.

For asset/display regressions, distinguish among:

- wrong source asset;
- wrong crop;
- wrong `background-size`;
- wrong repeat behavior;
- wrong opacity;
- wrong mask/blend geometry;
- contrast overlay failure.

## 4. Documentation Governance

### 4.1 Documentation set

Core documents:

- root `README.md`
- `core_documentation/MAINTAINERS_GUIDE.md`
- `core_documentation/LESSON_DESIGN_AND_TEACHING_GUIDE.md`
- `core_documentation/PROJECT_WORKFLOW_CHARTER.md`
- `core_documentation/CHANGELOG.md`

Design documents:

- `design_documentation/ERA_THEME_DESIGN_SPECIFICATION.md`
- `design_documentation/THEME_ASSET_PROVENANCE.md`

### 4.2 Required front matter

Each core document begins with:

1. Title
2. Executive Summary
3. Quick Navigation
4. Document Role and Boundaries
5. Current synchronized implementation checkpoint

Only the Changelog expands the checkpoint into milestone narrative.

### 4.3 Primary ownership

| Information | Primary home |
|---|---|
| Public purpose and learner workflow | README |
| Current architecture and implementation contracts | Maintainer’s Guide |
| Pedagogy, curation, lesson structure, source requirements | Lesson Design and Teaching Guide |
| Mandatory process and decision governance | Project Workflow Charter |
| Milestones, redirected work, commit chronology | Changelog |
| Exact theme taxonomy, type, color, texture, transition rationale | Era Theme Design Specification |
| Asset source, creator, license, transformation, status | Theme Asset Provenance |

Use cross-references instead of competing copies.

### 4.4 Additive preservation rule

Documentation is additive and exhaustive by default.

Before removing or condensing information, identify where the following remain available:

- decision rationale;
- historical redirections;
- rollback lessons;
- fragile-zone cautions;
- privacy and data policy;
- accessibility contracts;
- accepted interface models;
- file references;
- test expectations;
- design provenance and licensing.

Reorganization is not permission to delete project knowledge.

### 4.5 Historical labels

Use explicit labels:

- Current
- Historical
- Archived
- Removed
- Deferred
- Rolled back
- Superseded
- Compatibility path
- Experimental
- Development fixture
- Provisional

### 4.6 Documentation preflight

Before a full documentation pass:

1. read all five core documents in full;
2. read both design documents in full when theme work is involved;
3. confirm the clean synchronized checkpoint;
4. inspect current source files supporting documented claims;
5. classify each fact by primary home;
6. identify preserved rationale and historical records;
7. state the pass boundary.

### 4.7 Documentation completion

Before delivery:

- verify checkpoint language;
- verify links and paths;
- verify no stale current-state claim remains;
- preserve redirected and rejected approaches;
- update the Changelog;
- update design provenance where applicable;
- provide complete replacement files and exact copy commands.

Because a documentation commit’s hash cannot be known before it is created, documents may identify the synchronized **implementation checkpoint** used as their source and state that the documentation-only commit follows it.

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

Current declarations:

- React 19.2.8
- React DOM 19.2.8
- Vite 8.1.5
- `@vitejs/plugin-react` 6.0.4

Do not add a dependency merely to solve a problem already handled by platform APIs or existing architecture.

## 6. Project-Specific Cautions

### Horizontal course viewport

Routine vertical page scrolling conflicts with the chosen interaction model. Preserve stop-level containment.

### Full-course design samples

Later-era samples are development fixtures. Do not let generic copy become de facto historical content. Real modules should replace or expand them only after Georga supplies lesson architecture and sources.

### Notebook anchoring

The side notebook must dock on the right, begin below the header, end above the timeline, and remain outside document flow. Component classes and CSS selectors must agree.

### Course Map

The current map contains 19 nodes and complete discrete segments. Keep stop IDs, node IDs, segment endpoints, and map height synchronized.

### Era design packs

Course-era identities and design-pack identities are separate. New course modules should point to existing reusable packs where appropriate rather than creating CSS named after lesson placeholders.

### Transitions

Transitions must be gradual and historically intentional. Preserve aspect ratio, long overlap, low texture opacity, and documented logic. Do not create stark half-and-half screens or visible seams.

### Adobe Fonts

Do not commit downloaded Adobe font files. Use the licensed Web Project mechanism. Fallback-font selection is deferred but mandatory before final publication.

### Texture licensing

Verify the operative license on the actual source page. Do not infer public-domain status from filename, metadata fragments, or search snippets. Record creator, source, license, and transformations.

### Learner privacy

Do not introduce remote learner storage, analytics, authentication, public submissions, or instructor tracking without a dedicated privacy/security decision.

### Published lessons

Published modules should be fully designed and polished before release. Future corrections still require a versioning and correction policy.

## 7. Decision Records

### 7.1 Product model

**Decision:** Use a horizontal historical course rather than virtual museum rooms.

**Reason:** The course model better supports Georga’s guided teaching, chronological movement, module grouping, and transitions.

**Maintenance consequence:** New features should reinforce course stops, era clusters, and historical thresholds rather than restore room navigation.

### 7.2 Learner data

**Decision:** Keep learner work private and local.

**Chosen approach:** IndexedDB after consent or fully functional session-only storage.

**Maintenance consequence:** Every learner feature must work without a backend.

### 7.3 Field Notebook

**Decision:** Present learner records as a game-inspired academic fieldbook.

**Chosen approach:** minimized, docked, and full modes with Notes, Glossary, Activities, Bookmarks, Resources, and Course Map.

**Maintenance consequence:** Avoid alerts, points, streaks, and completion rewards.

### 7.4 Course Map

**Decision:** Use a vertically curving chronological route with fixed nodes and complete discrete segments.

**Rejected:** clipped continuous paths and percentage reveal.

**Maintenance consequence:** IDs and geometry must remain synchronized.

### 7.5 Historical design packs

**Decision:** Use reusable period design packs rather than module-specific stylesheets.

**Chosen approach:** content `eraId` → registry `designPackId` → semantic CSS tokens and variants.

**Maintenance consequence:** New content should reuse or explicitly extend the registry; component structure remains shared.

### 7.6 Transition design

**Decision:** Treat transitions as authored historical thresholds.

**Chosen approach:** explicit persists/fades/emerges/structure logic; color-led gradual blends; low-opacity aspect-preserving materials.

**Rejected:** abrupt theme switches, simple color averaging, stark split screens, stretched textures.

### 7.7 Fonts

**Decision:** Prototype with Adobe Fonts through a Web Project.

**Constraint:** Adobe font binaries are not committed or self-hosted under the current subscription model.

**Deferred requirement:** choose and document backup fonts before development ends.

### 7.8 Texture assets

**Decision:** Prefer local public-domain/CC0 material textures with provenance records.

**Reason:** historical character without a large rights-management burden or live external image dependency.

### 7.9 Accessibility scope

**Decision:** Support equivalent desktop navigation methods and nonvisual/contrast alternatives rather than drag-only, wheel-only, color-only, or texture-dependent interaction.

### 7.10 Mobile

**Decision:** Do not support mobile during the current design phase.

**Reason:** the horizontal course and docked fieldbook require a distinct mobile experience.

### 7.11 Full-course design-flow fixtures

**Decision:** Place representative pages for all eras on the main development course before final documentation and real-content integration.

**Reason:** sequence-level review reveals transition and continuity problems that isolated theme previews cannot.

**Maintenance consequence:** fixtures remain explicitly generic and temporary.

## 8. Handoff and Completion Template

Every implementation pass ends with:

- change type;
- what changed;
- exact files changed;
- acceptance test;
- checkpoint or commit status;
- exact extraction/copy/run commands;
- known residual risks.

A fresh-chat handoff should include:

```text
Source: C:\Users\haley\OneDrive\Desktop\virtual-museum\
Branch: main
Implementation checkpoint: 0d0d09d — Add full-course era design flow samples
```

It should also include the narrow current task and affected files. Before development, read the README, all four core documents, and relevant design documentation in full.
