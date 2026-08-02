# Maintainer’s Guide

## Executive Summary

This guide is the authoritative current architecture and maintenance reference for the History of Education horizontal-course prototype. It documents the active source tree, course and Field Notebook architecture, learner-state model, storage boundaries, historical design-pack system, accessibility/privacy contracts, fragile systems, regression expectations, and current technical backlog.

Use this guide before changing source code. For mandatory process rules, use the [Project Workflow Charter](PROJECT_WORKFLOW_CHARTER.md). For lesson-authoring and pedagogical guidance, use the [Lesson Design and Teaching Guide](LESSON_DESIGN_AND_TEACHING_GUIDE.md). For chronology, use the [Changelog](CHANGELOG.md). For exact visual decisions, use the design documentation.

## Quick Navigation

- [Current architecture snapshot](#1-current-architecture-snapshot)
- [Application and navigation model](#2-application-and-navigation-model)
- [Course content model](#3-course-content-model)
- [Historical design-pack architecture](#4-historical-design-pack-architecture)
- [Field Notebook architecture](#5-field-notebook-architecture)
- [Learner workspace and storage](#6-learner-workspace-and-storage)
- [Media and activities](#7-media-and-activities)
- [Accessibility, privacy, and third parties](#8-accessibility-privacy-and-third-parties)
- [Styling and asset ownership](#9-styling-and-asset-ownership)
- [Module ownership index](#10-module-ownership-index)
- [Fragile zones and regression matrix](#11-fragile-zones-and-regression-matrix)
- [Active technical backlog](#12-active-technical-backlog)
- [Historical and compatibility paths](#13-historical-and-compatibility-paths)
- [Fresh-chat handoff essentials](#14-fresh-chat-handoff-essentials)

## Document Role and Boundaries

This document owns current architecture, source/module ownership, state and data contracts, accessibility/privacy implementation, design-system implementation, fragile-zone descriptions, regression matrices, compatibility paths, and the active technical backlog. It does not own the complete teaching rationale, mandatory workflow law, public orientation, detailed design rationale, asset credit ledger, or full commit chronology.

Current synchronized implementation checkpoint:

```text
0d0d09d — Add full-course era design flow samples
Branch: main
Status: local and origin/main aligned after the latest sync ritual
```

This documentation refresh was prepared from that synchronized implementation checkpoint.

## 1. Current Architecture Snapshot

The active application is a static, client-side React application built with Vite and deployed to GitHub Pages. It has no backend, authentication, remote learner database, public posting surface, analytics layer, or instructor dashboard.

### Technology

| Layer | Current implementation |
|---|---|
| UI | React 19 |
| Build system | Vite 8 |
| Styling | Ordered plain-CSS layers imported by `src/styles/global.css` |
| Persistence | IndexedDB after consent or session storage |
| Deployment | GitHub Actions → GitHub Pages |
| Routing | Stateful single-page course; query-based development preview; no external router |
| Media | Native HTML audio/video and local static assets |
| Fonts | Adobe Fonts Web Project plus CSS fallback stacks |
| Theme assets | Local optimized WebP textures under `public/assets/themes/textures/` |
| Export | Browser-generated Markdown download |

### Current source context

```text
Local source of truth: C:\Users\haley\OneDrive\Desktop\virtual-museum\
Active branch: main
Repository: https://github.com/haleyrp1803/virtual-museum
Live site: https://haleyrp1803.github.io/virtual-museum/
Implementation checkpoint: 0d0d09d
```

### Application-boundary inventory

| System | Primary owner | Core responsibility | Sensitive coupling | Minimum regression check |
|---|---|---|---|---|
| Top-level composition | `src/App.jsx` | screen mode, notebook coordination, glossary/study flows, workspace callbacks, header and bottom navigation | course shell, notebook context, preview feature flag | traverse all screens and notebook entry points |
| Browser entry | `src/main.jsx` | global CSS, development validation, normal app vs. query preview | `?theme-preview`, development-only validation | normal course and preview both mount |
| Development feature switches | `src/config/developmentFeatures.js` | centralized temporary development controls | Vite `import.meta.env.DEV` behavior | preview link absent from production build |
| Course navigation | `src/hooks/useCourseNavigation.js` | active stop, refs, wheel/keyboard movement, observer synchronization | stable stop IDs, focus-field exclusions, reduced motion | every navigation method and form-field protection |
| Course-stop dispatch | `src/components/CourseStop.jsx` | shared wrapper, era/design metadata, stop-type dispatch | section IDs/classes/refs, theme registry | every stop type renders and remains observable |
| Stop renderers | `src/components/courseStops/` | type-specific presentation, including reusable design samples and transitions | course data fields, callbacks | every stop type and action path |
| Course structure | `src/data/course.js` | 19 ordered stops, 8 timeline segments, resources and artifacts | Course Map IDs, theme IDs, backlinks | validation passes and every target resolves |
| Theme registry | `src/data/eraThemes.js` | maps course-era identities to reusable period design packs | CSS `data-era-theme` selectors, preview metadata | every `eraId` resolves; all packs preview correctly |
| Course and architecture validation | `src/data/validateCourseData.js`, `scripts/validate-architecture.mjs` | browser-time shared-ID checks plus source/import/cascade/storage validation | shared IDs, source graph, stylesheet ledger | app starts cleanly and architecture script passes |
| Theme preview | `src/components/ThemePreview.jsx` | internal period-pack fixture and transition comparison surface | theme registry and CSS sample selectors | every pack, swatch, state, and transition renders |
| Course Map | `src/components/CourseMap.jsx`, `src/data/courseMapLayout.js` | 19-node route and complete connector geometry | course stop IDs, visited semantics | every node and complete segment |
| Field Notebook shell | `src/components/Notebook.jsx` | modes, focus, section navigation, shared notebook state | section contracts, workspace API, docking CSS | minimized/docked/full, focus, all sections |
| Notebook sections | `src/components/notebookSections/` | Notes, Glossary, Activities, Bookmarks, Resources, Course Map | shell-owned filters/selections, callbacks | each section’s full workflow |
| Workspace facade | `src/hooks/useLocalWorkspace.js` | stable UI-facing learner action API and IDs/timestamps | pure actions, persistence hook, export | all returned API properties and workflows |
| Persistence lifecycle | `src/hooks/useWorkspacePersistence.js` | consent, load/save effects, storage states, retry, clearing | IndexedDB adapter and compatibility keys | persistent/session/upgrade/error paths |
| Pure workspace actions | `src/storage/workspaceActions.js` | immutable domain transformations | workspace schema and action metadata | notes, bookmarks, activities, glossary, resources |
| Workspace export | `src/storage/workspaceExport.js` | Markdown construction and browser download | workspace record shapes and learner terminology | populated export audit |
| IndexedDB adapter | `src/storage/workspaceDb.js` | schema normalization and database mechanics | compatibility identifiers and blocked-tab behavior | reopen, save, delete, error/retry |
| Styling | `src/styles/global.css` plus six imported layers | documented cascade, course viewport, theme packs, notebook | import order, docking, viewport, accessibility overrides | full visual regression after stylesheet change |
| Texture assets | `public/assets/themes/textures/` | local decorative material fields | stable filenames and CSS paths | asset load, fallback, contrast modes |
| Design documentation | `design_documentation/` | exact theme rationale and provenance | source metadata and CSS implementation | update after accepted design changes |

## 2. Application and Navigation Model

### Active course model

The site is one horizontally scrolling course canvas. `App.jsx` composes the course, while `useCourseNavigation.js` owns `activeStopIndex`, course refs, and movement/observer synchronization. `CourseStop.jsx` preserves shared section markup and applies both content-era and design-pack metadata before dispatching to type-specific renderers.

The current nineteen-stop development sequence is:

```text
Introduction
→ Colonial landing
→ Colonial text artifact
→ Colonial image artifact
→ Colonial audio/video pair
→ Colonial activity
→ Colonial synthesis
→ Colonial Further Study
→ Colonial–Victorian transition
→ Victorian design sample
→ Victorian–Jim Crow transition
→ Jim Crow design sample
→ Jim Crow–World Wars transition
→ World Wars design sample
→ World Wars–Civil Rights transition
→ Civil Rights design sample
→ Civil Rights–Modern schooling transition
→ Modern schooling design sample
→ Conclusion design sample
```

Only the Colonial cluster currently demonstrates a multi-stop lesson. Later stops are development fixtures for visual review.

### Navigation inputs

`useCourseNavigation.js` supports:

- wheel-to-next/previous translation;
- native horizontal trackpad input;
- Arrow Left / Arrow Right;
- Page Up / Page Down;
- Home / End;
- Previous / Next buttons;
- eight timeline segment buttons;
- Course Map node navigation;
- notebook backlinks.

The active stop is also derived with `IntersectionObserver`. Every stop ID is a cross-system contract.

### Bottom timeline

The timeline is a navigational and contextual index, not a proportional chronological scale. Its eight active segments point to representative stops for Introduction, Colonial, Victorian, Jim Crow, World Wars, Civil Rights, Modern schooling, and Conclusion. Transition stops inherit the neighboring historical context through active-stop logic rather than receiving their own persistent segment.

Previous and Next use the same visual treatment; position and arrow direction distinguish them.

### Desktop-only contract

The design assumes a computer viewport. Do not silently add a compressed mobile mode without a dedicated product and design pass.

### Navigation acceptance contract

After any course-shell change, verify:

1. each input method moves predictably;
2. focusable fields do not trigger course-level key navigation while edited;
3. reduced-motion mode uses direct movement;
4. the current timeline segment updates;
5. the notebook launcher does not cover navigation;
6. Course Map and backlinks restore the correct stop;
7. Previous and Next remain visually symmetric;
8. no stop requires routine page-level vertical scrolling.

## 3. Course Content Model

### `courseStops`

`src/data/course.js` owns ordered stop records. Current fields include:

| Field | Purpose |
|---|---|
| `id` | stable navigation and notebook-backlink key |
| `eraId` | content-era identity resolved through `ERA_THEMES` |
| `timelineLabel` | compact orientation label |
| `eyebrow` | stop-level label |
| `title` | stop heading |
| `dateLabel` | historical orientation text |
| `type` | renderer choice |
| `summary` | contextual or transition copy |
| `artifactId` / `artifactIds` | related artifact references |
| `transition` | from/to labels, terms, and explanatory note |
| `moduleId` / `moduleTitle` | notebook context for design-sample stops |
| `sample` | generic design-fixture content |

Current stop types:

- `introduction`
- `era-intro`
- `artifact`
- `media-pair`
- `activity`
- `synthesis`
- `resources`
- `transition`
- `design-sample`

`next-era` remains implemented as a renderer but is not used by the current sequence.

### Design-sample contract

`DesignSampleStop.jsx` provides one reusable fixture containing representative:

- heading and label hierarchy;
- body copy;
- source/artifact card;
- caption and provenance line;
- media frame;
- private response field;
- primary and secondary actions.

Design samples must remain explicitly labeled. They test the visual system and must not be mistaken for final course content.

### Timeline segments

`timelineSegments` contains eight active entries. Each points to a stable course stop. The validator checks that every target resolves.

### Artifact model

`src/data/modules.js` contains the placeholder artifacts used by the Colonial vertical slice. Common fields include:

- stable `id`;
- `moduleId`;
- media `type`;
- title and description;
- rights and provenance;
- professor commentary;
- type-specific media payload.

### Glossary model

`src/data/glossary.js` defines the complete vocabulary catalog. Each term needs a stable ID, visible term, module ownership, stop location, and optional occurrence/context guidance. Learner definitions remain separate workspace records.

### Resource model

`placeholderResources` remains a fixed catalog. Learner save/status records remain in the workspace.

## 4. Historical Design-Pack Architecture

### Identity separation

Course data uses stable content-era IDs. `ERA_THEMES` maps each content era to a reusable `designPackId`. `DESIGN_PACKS` owns human-readable period labels, purpose, status, variant names, typography metadata, transition logic, and preview guidance.

This separation prevents CSS and future content from being named after temporary module titles.

### Current design packs

- Course-neutral Introduction
- Colonial era
- Victorian era
- Jim Crow era
- World Wars era
- Civil Rights era
- Modern schooling era
- Course-neutral Conclusion

### Current transition packs

- Colonial → Victorian
- Victorian → Jim Crow
- Jim Crow → World Wars
- World Wars → Civil Rights
- Civil Rights → Modern schooling

### Semantic color layers

The design system distinguishes:

- approved palette roles (`--pack-*`);
- live component-consumption roles (`--era-*`);
- functional accessible colors such as `--pack-accent-text` and `--pack-action-bg`;
- decorative accents that may not be suitable for small text or button backgrounds.

Core semantic roles include page, surface, raised surface, deep surface, text, muted text, primary/secondary/tertiary accents, hover, border, focus, accent contrast, accessible accent text, and accessible action background.

### Typography

Adobe Fonts are loaded once through the Web Project stylesheet in `index.html`. The repository contains CSS family names and fallback stacks, not Adobe font binaries.

Current principal roles include:

- Colonial: Antiquarian Scribe, ATF Garamond Subhead, Adobe Caslon Pro;
- Victorian: HWT Slab Columbian, HWT Gothic Round, Clarendon Text;
- Civil Rights: Goodland Variable and News Gothic;
- Modern schooling: Centrifuge and Aktiv Grotesk;
- Jim Crow and World Wars: provisional Century Gothic / Grad direction.

Before final publication, choose, test, and document fallback or replacement fonts for every Adobe family.

### Transition grammar

Transitions are curated thresholds rather than color averages. Every transition records:

- what persists;
- what fades;
- what emerges;
- how structure changes.

Texture fields preserve aspect ratio, overlap across most of the viewport, and use long feathered masks. Color progression carries the main shift; textures remain low-opacity material cues. The Civil Rights noise is a repeatable tiled field, not a cover image.

### Development preview

`ThemePreview.jsx` is mounted when the query string contains `theme-preview`. The preview includes:

- period-based selector;
- typography roles;
- representative component states;
- approved semantic swatches;
- design cues;
- transition logic;
- accessibility-oriented functional colors.

`SHOW_DESIGN_PREVIEW_LINK` is centralized in `src/config/developmentFeatures.js`, and `App.jsx` also gates the visible link behind `import.meta.env.DEV`. The link must not appear in production.

## 5. Field Notebook Architecture

### Three presentation modes

```text
minimized → side → full
```

- **Minimized:** persistent closed-book launcher.
- **Side:** docked quick-use fieldbook below the header and above the timeline.
- **Full:** modal fieldbook with focus containment and Escape-to-dock behavior.

The component must render both `notebook` and `notebook-panel` classes. Earlier anchoring defects resulted from class/selector mismatch.

### Permanent sections

`NOTEBOOK_SECTIONS` defines:

1. Notes
2. Glossary
3. Activities
4. Bookmarks
5. Resources
6. Course Map

Their order and IDs are stable navigation contracts.

### Notes, activities, bookmarks, glossary, resources

The notebook uses compact master–detail patterns. Persistence remains callback-driven through the workspace facade. Learner states are private and descriptive rather than graded or gamified.

### Course Map

The Course Map now contains nineteen fixed nodes and eighteen complete SVG connector segments. Every node ID must match a course stop ID exactly.

Each complete segment switches wholesale between:

- solid visited;
- dotted unvisited.

Do not restore clipped path reveal or percentage-length interpolation.

## 6. Learner Workspace and Storage

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

`normalizeWorkspace()` must remain additive.

### Storage modes

#### Persistent mode

- consent in `localStorage`;
- workspace data in IndexedDB;
- database: `virtual-museum-workspace`;
- store: `workspace`;
- key: `primary`.

#### Session-only mode

- mode and workspace in session storage;
- full notebook functionality;
- closing the session removes work.

### Storage states

The UI handles opening, saving, saved, session-only, unavailable, and error states. Error states must allow retry. Storage choice remains inside notebook settings after first use.

### Workspace operations

All UI writes go through `useLocalWorkspace.js`. Pure transformations belong in `workspaceActions.js`; browser lifecycle belongs in `useWorkspacePersistence.js`; IndexedDB mechanics belong in `workspaceDb.js`.

### Markdown export

Export is human-readable personal-use output, not a complete restorable backup format.

## 7. Media and Activities

### Media component

`ArtifactMedia.jsx` owns type-specific presentation and alternatives.

Minimum requirements:

- text: excerpt and full transcription;
- image: concise alt text, caption, extended description;
- audio: native controls and transcript;
- video: native controls, captions, transcript;
- external providers: explicit privacy/source disclosure.

Transcript access must not depend on playback.

### Activities

`ActivityStop.jsx` currently supports the Pause and Respond workflow and delegates persistence through the workspace facade. Additional activity forms should be added only for concrete teaching needs. Interpretive prompts must not be reduced falsely to binary grading.

## 8. Accessibility, Privacy, and Third Parties

### Accessibility contract

The implementation includes:

- semantic controls;
- visible focus;
- skip-to-content support;
- keyboard course navigation;
- keyboard notebook navigation;
- full-screen focus trap and restoration;
- Escape-to-dock;
- reduced-motion behavior;
- increased-contrast and forced-colors CSS;
- text alternatives for media;
- non-color status labels;
- screen-reader announcements.

Theme QA additionally requires:

- no bright decorative color used automatically for normal-sized text;
- accessible action backgrounds;
- texture suppression in contrast modes;
- no tilted cards;
- readable typography at supported viewport widths.

### Course viewport contract

Each stop must fit between the header and bottom timeline. Long optional content may scroll inside bounded panels; the main course page must not develop routine vertical scrolling.

### Privacy contract

The accurate claim is that learner-generated notebook data is not sent to the project. Do not claim that the site makes no network requests: GitHub Pages serves the application and Adobe currently serves web fonts.

Do not add analytics, authentication, public comments, learner uploads, instructor dashboards, external submissions, or embedded third-party media without explicit review.

### Adobe Fonts

The licensed implementation uses an Adobe Fonts Web Project. Do not commit downloaded Adobe font binaries to the repository. Before final publication:

- confirm durable project ownership of the Web Project;
- disclose the third-party request accurately;
- choose and test fallback fonts;
- document replacement behavior if Adobe access ends.

### Texture assets

Texture assets are local WebP derivatives selected from public-domain, CC0, or no-known-restrictions sources. Exact provenance belongs in `THEME_ASSET_PROVENANCE.md`.

## 9. Styling and Asset Ownership

### Ordered stylesheet layers

`src/styles/global.css` imports six layers in this exact order:

```css
@import './foundation.css';
@import './classroom-aesthetic.css';
@import './horizontal-course.css';
@import './horizontal-course-qa.css';
@import './glossary-study.css';
@import './field-notebook.css';
```

Ownership:

- `foundation.css`: reset, base elements, early shared component rules;
- `classroom-aesthetic.css`: paper/wood visual system and desktop docking ancestry;
- `horizontal-course.css`: viewport, stops, theme tokens, preview, transitions, timeline;
- `horizontal-course-qa.css`: accepted containment and navigation corrections;
- `glossary-study.css`: key terms, dialog/study, flashcards;
- `field-notebook.css`: notebook shell, sections, Course Map, final accessibility refinements.

Do not reorder imports casually. Repeated selectors are often intentional partial overrides.

### Texture asset paths

Theme textures live under:

```text
public/assets/themes/textures/
```

Stable local filenames are implementation contracts. If an asset changes but keeps the same role, preserve the filename where practical and update provenance.

### Design documentation

Exact colors, typography, textures, status, and transition rationale belong in:

```text
design_documentation/ERA_THEME_DESIGN_SPECIFICATION.md
design_documentation/THEME_ASSET_PROVENANCE.md
```

## 10. Module Ownership Index

### `src/App.jsx`

Top-level composition and cross-feature coordination. Owns notebook mode/context, glossary dialog, study screen, activity draft state, workspace callbacks, header, preview link, and course/timeline composition.

### `src/main.jsx`

Loads global CSS, runs development-time validation, and mounts either `App` or `ThemePreview` based on the query string.

### `src/config/developmentFeatures.js`

Central owner of temporary development-only feature switches.

### `src/hooks/useCourseNavigation.js`

Single owner of active stop, refs, bounded navigation, stable-ID navigation, input handling, observer synchronization, wheel locking, reduced motion, and form-field exclusions.

### `src/components/CourseStop.jsx`

Preserves shared stop markup, IDs, classes, refs, theme metadata, headings, and dispatch.

### `src/components/courseStops/`

Presentational renderers. `DesignSampleStop.jsx` and `TransitionStop.jsx` are current design-system fixtures; they must not acquire persistence or navigation ownership.

### `src/components/ThemePreview.jsx`

Internal style gallery for period packs, tokens, typography, component states, and transition logic.

### `src/data/course.js`

Authoritative stop order, timeline segments, artifact exposure, and Further Study catalog.

### `src/data/eraThemes.js`

Authoritative mapping between content-era IDs and reusable design packs.

### `src/data/courseMapLayout.js`

Fixed nineteen-node Course Map geometry and complete connector segments.

### `src/data/validateCourseData.js`

Development-time validation of unique IDs and cross-file references, including era-theme resolution.

### `scripts/validate-architecture.mjs`

Dependency-free repository validation for imports, reachability, cycles, stylesheet ledger, compatibility identifiers, and data contracts.

### Workspace and notebook owners

Ownership remains as documented in Sections 5 and 6. Do not bypass the workspace facade or move section persistence into renderers.

## 11. Fragile Zones and Regression Matrix

| Fragile zone | Typical regression | Minimum test |
|---|---|---|
| Horizontal navigation | skipped stops, repeated wheel moves, input-field key conflict | wheel, trackpad, arrows, Page keys, Home/End, buttons |
| Nineteen-stop sequence | broken target, wrong order, stale timeline | traverse all stops and direct timeline targets |
| Viewport sizing | vertical page scroll or clipped controls | every stop at accepted desktop viewport |
| Bottom timeline | wrong active era, notebook overlap | all stops and all transitions |
| Notebook anchoring | side panel enters flow or covers timeline | open from multiple stops; side/full/minimized |
| Full-screen focus | focus escapes or fails to restore | Tab cycle, Escape, return focus |
| Course Map | bad ID, wrong connector, insufficient height | all 19 nodes and 18 complete segments |
| Theme registry | missing mapping or wrong pack | validation plus preview every pack |
| Theme preview | production exposure or overflow | local query, development link, production build |
| Adobe Fonts | missing family or external failure | network load and fallback-stack test |
| Texture assets | 404, stretching, seam, excessive contrast | every era and transition; blocked-image fallback |
| Civil Rights transition texture | single enlarged rectangle | both adjacent transitions tile subtle noise |
| Contrast modes | texture still visible or controls disappear | reduced motion, increased contrast, forced colors |
| Workspace persistence | session mode loses functionality or reload fails | both modes, refresh, close/reopen |
| Glossary | wrong catalog/backlink state | encounter, add, define, edit, navigate |
| Resources | catalog/saved mismatch | save, status, remove, export |
| Markdown export | missing records/context | populate all sections and export |
| Stylesheet order | accepted override lost | ledger check and visual audit |

## 12. Active Technical Backlog

1. Replace design-sample stops with real modules after Georga finalizes lesson architecture.
2. Replace placeholder Colonial content with one fully curated publication-quality module.
3. Finalize the complete course structure and module lengths.
4. Finalize public title and branding.
5. Review provisional Jim Crow and World Wars typography against real content.
6. Reassess provisional Civil Rights print and Modern schooling texture assets.
7. Choose, test, and document fallback fonts for every Adobe family before development ends.
8. Confirm durable Adobe Web Project ownership and final privacy disclosure.
9. Add explicit activity-skip records if teaching design requires them.
10. Add machine-readable workspace backup/import if cross-device continuity becomes a priority.
11. Establish published-lesson correction and versioning policy.
12. Review external media providers individually before embedding.
13. Perform usability testing with intended public learners and disabled users.
14. Revisit minimum desktop viewport and browser support statement.
15. Extend publication validation to captions, transcripts, rights, alt text, and content notices.
16. Remove or disable development-only design-flow fixtures and preview entry point before publication if they are no longer needed.

## 13. Historical and Compatibility Paths

### Museum-model interface — superseded

Commits before `083b8c6` preserve the earlier room/module museum metaphor. It is historical, not active architecture.

### Archived prototype folder — removed

The former `virtual-museum-prototype-pass2/` folder was removed at commit `bc95e8f`. It is no longer an active or tracked path. Historical references should identify it as removed, not present.

### Removed standalone storage status

`StorageStatus.jsx` and dead `.storage-status` CSS were removed after import audit. Workspace storage state remains active through notebook settings.

### Mobile CSS ancestry

Residual responsive ancestry does not constitute supported mobile behavior.

### Compatibility-sensitive storage identifiers

Existing `virtual-museum-*` storage names, database names, store names, and keys must not be renamed without explicit migration.

## 14. Fresh-Chat Handoff Essentials

A future chat should begin with:

```text
Source of truth: C:\Users\haley\OneDrive\Desktop\virtual-museum\
Branch: main
Implementation checkpoint: 0d0d09d — Add full-course era design flow samples
```

It should also be told:

- the current direction is a horizontally progressing desktop course;
- the current live sequence has 19 stops and 8 timeline segments;
- only the Colonial cluster is a multi-stop lesson; later eras are design samples;
- Georga owns historical and teaching decisions;
- learner data remains local and private;
- the Field Notebook has six permanent sections and a 19-node Course Map;
- era IDs map to reusable design packs through `eraThemes.js`;
- the design preview is development-only;
- Adobe Fonts are externally hosted and binaries must not be committed;
- theme textures are local and provenance-tracked;
- transitions use gradual color-led blends with low-opacity, aspect-preserving materials;
- navigation, notebook shell, workspace persistence, Course Map IDs, theme registry, and stylesheet order are fragile contracts;
- documentation is additive and exhaustive by default.

Before source work, read the current affected files in full. Before documentation work, read the root README, all four core documents, and both design-documentation files in full.
