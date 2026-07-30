# Changelog

## Executive Summary

This Changelog is the authoritative historical record for the History of Education horizontal-course project. Use it to confirm the current synchronized checkpoint, understand major design and architecture shifts, distinguish active direction from superseded prototypes, and trace the complete Git history.

The Changelog owns chronology and milestone interpretation. Current architecture belongs in the Maintainer’s Guide; teaching requirements belong in the Lesson Design and Teaching Guide; process law belongs in the Project Workflow Charter.

## Quick Navigation

- [Current synchronized checkpoint](#1-current-synchronized-checkpoint)
- [Recent milestones](#2-recent-milestones-newest-first)
- [Redirected, superseded, and deferred work](#3-redirected-superseded-and-deferred-work)
- [Full development history](#4-full-development-history)

## Document Role and Boundaries

This document owns the detailed current checkpoint, milestone chronology, redirected/deferred/rolled-back records, and complete commit history. It does not own detailed current architecture, lesson-authoring requirements, or mandatory workflow rules.

## 1. Current Synchronized Checkpoint

```text
0a90da2 — Complete field notebook redesign and course map
Branch: main
Status: local and origin/main aligned after the latest sync ritual
```

This checkpoint establishes the accepted Field Notebook and horizontal-course baseline:

- horizontally progressing desktop course;
- combined bottom Previous / timeline / Next navigation;
- introduction through Common School landing vertical slice;
- consent-based IndexedDB or session-only learner workspace;
- redesigned Field Notebook with Notes, Glossary, Activities, Bookmarks, Resources, and Course Map;
- glossary discovery, learner-authored definitions, and flashcard study;
- saved Further Study resources;
- vertically curving Course Map with discrete complete solid/dotted route segments;
- accessibility and visual integration pass for notebook focus, keyboard, contrast, motion, and empty states.

## 2. Recent Milestones, Newest First

### Field Notebook redesign and Course Map — 2026-07-30

- Reframed the learner workspace as an academic fieldbook informed by game notebooks and quest logs.
- Added stable section navigation for Notes, Glossary, Activities, Bookmarks, Resources, and Course Map.
- Converted notes, activities, bookmarks, glossary, and resources to compact master–detail views.
- Added saved Further Study resources with private Saved / Started / Finished states.
- Added a vertically curving chronological Course Map.
- Replaced unsuccessful clipped/proportional route rendering with complete discrete visited/unvisited SVG connectors.
- Completed visual integration and accessibility audit for full-screen and docked notebook modes.
- Accepted commit: **`0a90da2` — `Complete field notebook redesign and course map`**.

### Glossary workflow and flashcard study — 2026-07-30

- Added underlined clickable key terms inside lesson text.
- Added a learner-authored Glossary section with discovered, added-without-definition, and defined states.
- Added lesson-location guidance for undiscovered terms.
- Added separate flashcard study mode with card flipping and keyboard controls.
- Corrected a notebook anchoring selector mismatch by aligning component classes and course-aware docking CSS.
- Accepted commit: **`87d370e` — `Add glossary workflow and flashcard study mode`**.

### Horizontal course vertical slice — 2026-07-29

- Replaced the active museum-room metaphor with a horizontally progressing course.
- Added Introduction, Early America cluster, Further Study, transition, and Common School landing.
- Added several equivalent navigation methods and a persistent course timeline.
- Used color, texture, typography, and spatial order to make movement between eras perceptible.
- Accepted commit: **`083b8c6` — `Build horizontal course vertical slice prototype`**.

### Initial museum prototype and aesthetic direction — 2026-07-29

- Built the initial React/Vite/GitHub Pages static prototype.
- Added local-only notebook storage, consent, notes, bookmarks, activities, quizzes, Markdown export, and accessible media placeholders.
- Added an old-classroom/library visual direction using wood, parchment, academic green, burgundy, dusty rose, and brass cues.
- Corrected the notebook side-panel behavior so it docked rather than entering document flow.
- Accepted aesthetic checkpoint: **`ddc5e0e` — `Refine classroom aesthetic and dock notebook side panel`**.

### GitHub Pages activation — 2026-07-29

- Corrected Pages source from branch/Jekyll deployment to GitHub Actions.
- Confirmed the Vite workflow builds and deploys `dist`.
- Trigger commit: **`db610e3` — `Trigger GitHub Pages deployment`**.

### Repository initialization and initial infrastructure — 2026-07-29

- Initialized the previously non-Git local folder.
- Merged the repository’s initial README history.
- Established the first synchronized baseline.
- Commits: **`557a4c2`**, **`85f0b96`**, and **`75ec55f`**.

## 3. Redirected, Superseded, and Deferred Work

### Virtual museum / room model — superseded

The initial product concept used modules as museum rooms with artifact stations and professor guidance. This direction was productive for identifying artifact, notebook, media, privacy, and activity requirements, but it was superseded by the horizontal-course model at `083b8c6`.

Do not treat room navigation as the active interaction architecture.

### Separate prototype branch — corrected workflow assumption

The horizontal-course prototype was initially committed to a temporary branch because preserving the museum model was interpreted as a requirement. Haley clarified that the new direction belonged on `main`. The branch was fast-forwarded into `main` and deleted locally and remotely.

Future work defaults to `main` unless a branch is explicitly requested.

### Persistent notebook-choice banner — removed

The early horizontal prototype displayed storage choice in a persistent banner that obscured timeline navigation. Storage status and settings were moved into the Field Notebook.

### Notification-style note-count bubble — removed

The notebook launcher briefly displayed a note count that resembled an unread notification. It was removed because the notebook does not contain updates requiring learner attention.

### Course Map path-reveal approaches — rejected

Two route implementations were rejected:

1. separate partial solid/dotted fragments;
2. one continuous path with clipped or percentage-based progress overlay.

Both produced misleading partial line artifacts. The accepted implementation uses complete connector segments switched wholesale between visited and unvisited states.

### Mobile support — deferred by product decision

The current course is explicitly desktop/laptop only. Mobile requires a separately designed experience.

### Real historical content — deferred

The prototype intentionally uses placeholder text, image, audio, video, activities, resources, and commentary. Content integration begins after interaction architecture and documentation are stable.

### Explicit activity-skip records — deferred

The Field Notebook can classify completed and to-revisit activity records. It does not yet create a persistent skipped state.

## 4. Full Development History

| Date | Commit | Message | Decoration |
|---|---|---|---|
| 2026-07-30 | `0a90da2` | Complete field notebook redesign and course map | HEAD → main, origin/main |
| 2026-07-30 | `87d370e` | Add glossary workflow and flashcard study mode | |
| 2026-07-29 | `083b8c6` | Build horizontal course vertical slice prototype | |
| 2026-07-29 | `ddc5e0e` | Refine classroom aesthetic and dock notebook side panel | |
| 2026-07-29 | `db610e3` | Trigger GitHub Pages deployment | |
| 2026-07-29 | `557a4c2` | Merge initial GitHub repository | |
| 2026-07-29 | `85f0b96` | Complete initial virtual museum prototype infrastructure | |
| 2026-07-29 | `75ec55f` | Initial commit | |
