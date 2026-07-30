# Maintainer’s Guide

## Executive Summary

This guide is the authoritative current architecture and maintenance reference for the History of Education horizontal-course prototype. It documents the active source tree, course and Field Notebook architecture, learner-state model, storage boundaries, accessibility/privacy contracts, fragile systems, regression expectations, and current technical backlog.

Use this guide before changing source code. For mandatory process rules, use the [Project Workflow Charter](PROJECT_WORKFLOW_CHARTER.md). For lesson-authoring and pedagogical guidance, use the [Lesson Design and Teaching Guide](LESSON_DESIGN_AND_TEACHING_GUIDE.md). For chronology, use the [Changelog](CHANGELOG.md).

## Quick Navigation

- [Current architecture snapshot](#1-current-architecture-snapshot)
- [Application and navigation model](#2-application-and-navigation-model)
- [Course content model](#3-course-content-model)
- [Field Notebook architecture](#4-field-notebook-architecture)
- [Learner workspace and storage](#5-learner-workspace-and-storage)
- [Media and activities](#6-media-and-activities)
- [Accessibility and privacy](#7-accessibility-and-privacy)
- [Styling and visual transitions](#8-styling-and-visual-transitions)
- [Module ownership index](#9-module-ownership-index)
- [Fragile zones and regression matrix](#10-fragile-zones-and-regression-matrix)
- [Active technical backlog](#11-active-technical-backlog)
- [Archived and compatibility paths](#12-archived-and-compatibility-paths)
- [Fresh-chat handoff essentials](#13-fresh-chat-handoff-essentials)

## Document Role and Boundaries

This document owns current architecture, source/module ownership, state and data contracts, accessibility/privacy implementation, fragile-zone descriptions, regression matrices, compatibility paths, and active technical backlog. It does not own the complete teaching rationale, mandatory workflow law, public orientation, or full commit chronology.

Current synchronized checkpoint:

```text
0a90da2 — Complete field notebook redesign and course map
Branch: main
Status: local and origin/main aligned after the latest sync ritual
```

For detailed checkpoint interpretation and complete history, see [CHANGELOG.md](CHANGELOG.md).

## 1. Current Architecture Snapshot

The active application is a static, client-side React application built with Vite and deployed to GitHub Pages. It has no backend, authentication, remote learner database, public posting surface, or instructor dashboard.

### Technology

| Layer | Current implementation |
|---|---|
| UI | React 19 |
| Build system | Vite 8 |
| Styling | One shared stylesheet: `src/styles/global.css` |
| Persistence | IndexedDB or session storage |
| Deployment | GitHub Actions → GitHub Pages |
| Routing | Stateful single-page course; no external router |
| Media | Native HTML audio/video and local static assets |
| Export | Browser-generated Markdown download |

### Current source context

- Local source of truth: `C:\Users\haley\OneDrive\Desktop\virtual-museum\`
- Active branch: `main`
- Repository: `https://github.com/haleyrp1803/virtual-museum`
- Live site: `https://haleyrp1803.github.io/virtual-museum/`
- Active checkpoint: `0a90da2`

### Application-boundary inventory

| System | Primary owner | Core responsibility | Sensitive coupling | Minimum regression check |
|---|---|---|---|---|
| Top-level course orchestration | `src/App.jsx` | course position, wheel/keyboard navigation, stop rendering, Field Notebook mode, glossary dialog, study mode | horizontal viewport, bottom timeline, notebook context | traverse every stop by all navigation methods |
| Course structure | `src/data/course.js` | ordered stops, timeline segments, Further Study catalog | Course Map IDs, notebook backlinks, visual era classes | every stop/timeline/map link resolves |
| Field Notebook | `src/components/Notebook.jsx` | six-section fieldbook, master–detail views, settings, Course Map | workspace schema, current context, focus trap, global CSS | minimized/docked/full, all tabs, all actions |
| Learner workspace hook | `src/hooks/useLocalWorkspace.js` | persistence mode, CRUD operations, progress, export | IndexedDB, session storage, data shape | persistent and session-only complete workflows |
| IndexedDB adapter | `src/storage/workspaceDb.js` | database open/read/write/delete and schema normalization | browser support, blocked tabs, schema compatibility | reopen, save, delete, error/retry |
| Glossary study | `GlossaryStudy.jsx` and glossary components | learner definitions and flashcards | glossary IDs, module IDs, lesson backlinks | add, define, edit, study, return |
| Media | `ArtifactMedia.jsx` | text/image/audio/video rendering and alternatives | asset paths, transcripts, captions | each media type and accessibility alternative |
| Activities | `LearningActivities.jsx` | written responses, quizzes, compare response | workspace responses and quiz attempts | save, revise, feedback, notebook display |
| Styling | `src/styles/global.css` | full visual system and layout | course viewport, notebook docking, timeline height, high-contrast rules | full course and notebook visual regression |

## 2. Application and Navigation Model

### Active course model

The site is one horizontally scrolling course canvas. `App.jsx` renders `courseStops` in order and tracks `activeStopIndex`.

The active prototype sequence is:

```text
Introduction
→ Early America landing
→ Text artifact
→ Image artifact
→ Audio/video pair
→ Activity
→ Synthesis
→ Further Study
→ Transition
→ Common School landing
```

### Navigation inputs

`App.jsx` supports:

- wheel-to-next/previous translation;
- native horizontal trackpad input;
- Arrow Left / Arrow Right;
- Page Up / Page Down;
- Home / End;
- Previous / Next buttons;
- timeline segment buttons;
- Course Map node navigation;
- notebook backlinks.

The active stop is also derived with `IntersectionObserver`. Every stop ID must remain stable because several systems reference the same ID.

### Desktop-only contract

The design assumes a computer viewport. It is intentionally not translated into a mobile course. Do not silently add a compressed mobile mode without a dedicated design pass.

### Navigation acceptance contract

After any course-shell change, verify:

1. each input method moves predictably;
2. focusable fields do not trigger course-level key navigation while being edited;
3. reduced-motion mode uses direct movement;
4. the current timeline segment updates;
5. the notebook launcher does not cover Previous or Next;
6. Course Map and artifact backlinks restore the correct stop;
7. no stop requires page-level vertical scrolling at the accepted desktop viewport.

## 3. Course Content Model

### `courseStops`

`src/data/course.js` owns ordered stop records. Current fields include:

| Field | Purpose |
|---|---|
| `id` | stable navigation and notebook-backlink key |
| `eraId` | visual and contextual grouping |
| `timelineLabel` | compact bottom-timeline label |
| `eyebrow` | stop-level orientation label |
| `title` | stop heading |
| `dateLabel` | historical orientation text |
| `type` | renderer choice |
| `summary` | contextual or transition copy |
| `artifactId` / `artifactIds` | related artifact references |

Current stop types:

- `introduction`
- `era-intro`
- `artifact`
- `media-pair`
- `activity`
- `synthesis`
- `resources`
- `transition`
- `next-era`

### `timelineSegments`

The persistent bottom timeline is not a proportional historical scale. It is a navigational and contextual index. Segments may point to a stop or remain disabled placeholders for later modules.

### Artifact model

`src/data/modules.js` currently contains artifact records used by the vertical slice. Common fields include:

| Field | Purpose |
|---|---|
| `id` | stable source key |
| `moduleId` | module ownership |
| `type` | Text, Image, Audio, or Video |
| `title` | learner-facing title |
| `description` | concise source summary |
| `rights` | rights status or required statement |
| `provenance` | collection/source origin |
| `commentary` | Georga’s interpretive guidance |
| `media` | type-specific payload |

Type-specific `media` fields include text excerpts/transcriptions, image source/alt/caption/long description, audio/video paths, MIME type, captions, transcripts, source type, and external-provider disclosure.

### Glossary model

`src/data/glossary.js` defines the complete course vocabulary catalog, including undiscovered terms. Each term needs:

- stable `id`;
- visible `term`;
- `moduleId`;
- `moduleTitle`;
- `stopId`;
- `stopTitle`;
- optional occurrence/context guidance.

Learner-authored definitions are stored separately in the workspace.

### Resource model

`placeholderResources` in `src/data/course.js` currently includes:

- `id`
- `moduleId`
- `moduleTitle`
- `type`
- `title`
- `creator`
- `access`
- `note`

Saved status belongs to the learner workspace, not the catalog.

## 4. Field Notebook Architecture

### Three presentation modes

The Field Notebook supports:

```text
minimized
→ side
→ full
```

- **Minimized:** persistent closed-book launcher.
- **Side:** docked quick-use fieldbook bounded below the header and above the bottom timeline.
- **Full:** modal fieldbook with focus containment and Escape-to-dock behavior.

The component must render both `notebook` and `notebook-panel` classes. Earlier anchoring defects occurred when CSS expected `.notebook-panel.notebook-side` but the component omitted `notebook-panel`.

### Permanent sections

`NOTEBOOK_SECTIONS` defines:

1. Notes
2. Glossary
3. Activities
4. Bookmarks
5. Resources
6. Course Map

Their order and IDs are stable navigation contracts.

### Notes

The notebook uses a master–detail model:

- compact index;
- module filter;
- text search;
- sort order;
- selected-note detail;
- edit;
- delete;
- return to lesson;
- quick composer.

### Activities

Activity records combine written responses and quiz attempts into a journal-like index. Current states are derived rather than independently stored:

- completed;
- to revisit.

A true skipped state is not implemented because lesson activities do not yet create explicit skip records.

### Bookmarks

Bookmarks operate as a saved-evidence shelf. They can be grouped by module or media type, opened, converted into a targeted note, or removed.

### Glossary

The notebook merges the fixed glossary catalog with learner entries. States are:

- Not encountered
- Added without definition
- Defined

State meaning must not rely on color alone. Undiscovered terms provide a route to their lesson location. Added terms support definition editing.

### Resources

The Resources section merges the fixed catalog with saved learner-state records. Learners may assign:

- saved;
- started;
- finished.

These are private, self-reported states and are not verified.

### Course Map

The Course Map uses fixed node coordinates and discrete complete SVG segments. Each segment changes wholesale between:

- solid green visited;
- dotted grey unvisited.

Do not restore path clipping or percentage-based progressive reveal. Those approaches produced partial line artifacts and were rejected.

The current map is a vertically curving chronological route. Node IDs must match course stop IDs exactly.

## 5. Learner Workspace and Storage

### Workspace schema

`src/storage/workspaceDb.js` defines schema version 1:

```js
{
  schemaVersion: 1,
  notes: [],
  bookmarks: [],
  progress: {},
  responses: [],
  quizAttempts: [],
  glossaryEntries: [],
  resources: [],
  preferences: {}
}
```

`normalizeWorkspace()` must remain additive. Missing arrays or objects are replaced with safe defaults so older saved work can load after new fields are added.

### Storage modes

#### Persistent mode

- Consent is stored in `localStorage`.
- Workspace data is stored in IndexedDB:
  - database: `virtual-museum-workspace`
  - store: `workspace`
  - key: `primary`

#### Session-only mode

- Mode and workspace are stored in browser session storage.
- The Field Notebook remains fully functional.
- Closing the session removes the learner’s work.

### Storage status states

The UI handles:

- opening;
- saving;
- saved;
- disabled/session-only;
- unavailable;
- error.

Error states must allow retry. Storage choice must remain available inside notebook settings, not in a persistent page banner.

### Workspace operations

`useLocalWorkspace.js` owns:

- consent selection;
- loading;
- retry;
- note CRUD;
- bookmarking;
- artifact viewed state;
- activity attempted state;
- written responses;
- quiz attempts;
- glossary entries;
- saved resources and status;
- clear-all;
- Markdown export.

All writes must go through this hook rather than directly mutating browser storage.

### Markdown export

Export is human-readable and personal-use. It includes the learner’s saved material, contextual source information, activity records, glossary definitions, bookmarks, and resources. It is not a complete workspace restore format.

## 6. Media and Activities

### Media component

`ArtifactMedia.jsx` owns type-specific presentation and alternatives.

Minimum requirements:

- text: excerpt and full transcription;
- image: concise alt text, caption, extended description;
- audio: native controls and full transcript;
- video: native controls, captions, and full transcript;
- external providers: explicit privacy/source disclosure.

Do not make transcript access dependent on media playback.

### Activities

`LearningActivities.jsx` supports:

- written response;
- multiple choice;
- compare-your-response.

Activity definitions live in data, not component code. The component receives saved workspace records and callbacks.

Current quiz behavior records attempts and provides explanatory feedback. Interpretive prompts should not be forced into binary grading.

## 7. Accessibility and Privacy

### Accessibility contract

The current implementation includes:

- semantic buttons and form controls;
- visible focus states;
- skip-to-content support;
- keyboard course navigation;
- keyboard notebook-section navigation;
- full-screen focus trap;
- focus restoration;
- Escape-to-dock;
- reduced-motion behavior;
- forced-colors and increased-contrast CSS;
- text alternatives for media;
- non-color state labels;
- screen-reader announcements for notebook-section changes.

After any custom interaction change, test with keyboard only.

### Course viewport contract

Because horizontal navigation conflicts with page-level vertical scrolling, each stop must fit between the header and bottom timeline. Long optional content may scroll inside a bounded panel, but the main course page must not develop routine vertical scrolling.

### Privacy contract

The application must not claim that no network request occurs at all: GitHub Pages serves the site, and future external media providers may collect data. The accurate claim is that learner-generated notebook data is not sent to the project.

Do not add:

- analytics;
- authentication;
- public comments;
- learner uploads;
- instructor dashboards;
- external form submissions;
- embedded third-party media

without an explicit privacy/security review.

## 8. Styling and Visual Transitions

### Shared stylesheet

`src/styles/global.css` currently owns the complete design system and all component styling. At more than two thousand lines, it is a high-risk shared file.

Before editing:

- read the complete current file;
- verify selectors against current component markup;
- avoid full-file replacement from a stale pass;
- preserve course layout, notebook docking, Course Map, flashcard animation, contrast modes, and reduced-motion rules.

A future stylesheet decomposition may be appropriate, but it must be a dedicated structural pass.

### Era transitions

The visual system uses era classes and gradients to make historical movement perceptible:

- introduction: neutral scholarly framing;
- Early America: warm paper/domestic cues;
- transition: gradual material and color shift;
- Common School: more regular, slate-like institutional language.

Aesthetic differences carry pedagogical meaning. They should be documented in the Lesson Design and Teaching Guide and should not become decorative theme changes detached from historical rationale.

## 9. Module Ownership Index

### `src/App.jsx`

Top-level orchestration. Owns:

- active stop;
- navigation;
- `IntersectionObserver`;
- wheel-lock timing;
- notebook mode;
- glossary dialog;
- flashcard screen;
- active note context;
- course-stop rendering;
- Further Study save actions.

This file is already concentrated. Do not casually add more feature systems without considering extraction.

### `src/components/Notebook.jsx`

Largest component and primary Field Notebook owner. It contains:

- section vocabulary;
- Course Map node and segment definitions;
- full-screen focus trap;
- section navigation;
- all section master–detail views;
- settings;
- export/delete controls.

This is a fragile file. New section-level work should be bounded, and future decomposition is likely warranted.

### `src/hooks/useLocalWorkspace.js`

Single learner-state authority. It should remain the only normal path for workspace mutations.

### `src/storage/workspaceDb.js`

Pure persistence adapter and schema normalizer.

### `src/components/GlossaryStudy.jsx`

Full-screen flashcard study experience, filters, keyboard controls, and card-flip state.

### `src/components/GlossaryTermDialog.jsx`

Encounter-time definition prompt.

### `src/components/KeyTerm.jsx`

Inline lesson-term trigger.

### `src/components/LearningActivities.jsx`

Activity renderers and save/submit behavior.

### `src/components/ArtifactMedia.jsx`

Artifact media and accessibility alternatives.

### `src/components/ConsentDialog.jsx`

First-use storage consent.

### `src/components/StorageStatus.jsx`

Legacy status component. The active horizontal-course interface moved persistent storage controls into the Field Notebook. Confirm active usage before changing or removing this file.

### `src/data/course.js`

Active horizontal course structure and Further Study catalog.

### `src/data/glossary.js`

Fixed vocabulary catalog.

### `src/data/modules.js`

Current placeholder artifact and activity catalog. Its earlier module-array structures reflect prototype ancestry; confirm actual imports before assuming every export is active.

### `src/styles/global.css`

Shared visual and layout contract.

## 10. Fragile Zones and Regression Matrix

| Fragile zone | Typical regression | Minimum test |
|---|---|---|
| Horizontal navigation | skipped stops, repeated wheel moves, input-field key conflict | wheel, trackpad, arrows, Page keys, Home/End, buttons |
| Viewport sizing | vertical page scroll or clipped controls | every stop at accepted desktop viewport |
| Bottom timeline | notebook overlap or unreadable segment | all stops, Previous/Next, disabled future segments |
| Notebook anchoring | side panel falls into document flow or covers timeline | open from multiple stops; side/full/minimized |
| Full-screen focus | focus escapes dialog or fails to restore | Tab cycle, Escape, return focus |
| Workspace persistence | session mode loses functionality or persistent mode fails reload | both modes, refresh, close/reopen |
| Glossary | missing catalog term, wrong module grouping, broken backlink | encounter, skip definition, define, edit, navigate |
| Flashcards | wrong filter/card index, animation inaccessible | flip by card/button/keyboard; reduced motion |
| Course Map | line fragments, incorrect node state, bad backlink | every current stop, visited/unvisited segments |
| Resources | catalog/saved state mismatch | save, status change, remove, export |
| Markdown export | missing learner records or invalid context | populate every section and export |
| `global.css` | unrelated accepted style silently overwritten | full-course visual audit after any CSS pass |

## 11. Active Technical Backlog

1. Replace placeholder historical and teaching content with one real module.
2. Define the complete course structure beyond the current vertical slice.
3. Finalize public title and branding.
4. Decide whether to remove the tracked `virtual-museum-prototype-pass2/` archive.
5. Consider decomposing `Notebook.jsx` and `global.css` after concrete maintenance pressure justifies it.
6. Add explicit activity-skip records if the teaching design requires them.
7. Add a machine-readable workspace backup/import format if personal continuity across devices becomes a priority.
8. Establish published-lesson stability, correction, and versioning policy.
9. Review external media providers individually before embedding.
10. Perform usability testing with intended public learners and disabled users.
11. Revisit desktop minimum viewport and browser support statement.
12. Add automated validation for course stop IDs, artifact references, glossary locations, captions, transcripts, rights, and alt text.

## 12. Archived and Compatibility Paths

### Museum-model interface

Commits before `083b8c6` preserve the earlier room/module museum metaphor. It is superseded by the horizontal-course direction but remains part of the project history.

### Tracked Pass 2 folder

`virtual-museum-prototype-pass2/` is tracked inside the repository. The active app uses root-level `src/`, `public/`, and configuration files. Treat the nested folder as an archival snapshot, not a second source of truth.

### `StorageStatus.jsx`

This component remains present from the earlier persistent-banner implementation. The active design moved storage messaging into the Field Notebook. Verify whether it is imported before deletion.

### Mobile CSS ancestry

Some early responsive rules remain in `global.css`, but the current product decision is desktop-only. Do not treat those rules as a supported mobile contract.

## 13. Fresh-Chat Handoff Essentials

A future chat should begin with:

```text
Source of truth: C:\Users\haley\OneDrive\Desktop\virtual-museum\
Branch: main
Checkpoint: 0a90da2 — Complete field notebook redesign and course map
```

It should also be told:

- the current direction is a horizontally progressing desktop course, not a virtual museum;
- Georga owns historical and teaching decisions;
- the active prototype ends at the Common School landing;
- the bottom bar combines Previous, timeline, and Next;
- all course stop IDs are shared navigation contracts;
- learner data remains local and private;
- session-only use retains full notebook functionality;
- the Field Notebook has Notes, Glossary, Activities, Bookmarks, Resources, and Course Map;
- Course Map connectors use discrete complete solid/dotted segments;
- `Notebook.jsx` and `global.css` are fragile;
- the nested Pass 2 folder is archival, not active;
- documentation is additive and exhaustive by default.

Before source work, read the current affected files in full. Before documentation work, read all four core documents and the root README in full.
