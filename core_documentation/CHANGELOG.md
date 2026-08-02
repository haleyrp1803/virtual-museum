# Changelog

## Executive Summary

This Changelog is the authoritative historical record for the History of Education horizontal-course project. Use it to confirm the current synchronized implementation checkpoint, understand major design and architecture shifts, distinguish active direction from superseded prototypes, and trace accepted Git history.

The Changelog owns chronology and milestone interpretation. Current architecture belongs in the Maintainer’s Guide; teaching requirements belong in the Lesson Design and Teaching Guide; process law belongs in the Project Workflow Charter; exact visual decisions and provenance belong in the design documentation.

## Quick Navigation

- [Current synchronized checkpoint](#1-current-synchronized-checkpoint)
- [Recent milestones](#2-recent-milestones-newest-first)
- [Redirected, superseded, removed, and deferred work](#3-redirected-superseded-removed-and-deferred-work)
- [Development history](#4-development-history)

## Document Role and Boundaries

This document owns checkpoint interpretation, milestone chronology, redirected/deferred/rolled-back records, and accepted commit history. It does not own detailed current architecture, lesson-authoring requirements, exact design tokens, asset credits, or mandatory workflow rules.

## 1. Current Synchronized Checkpoint

```text
0d0d09d — Add full-course era design flow samples
Branch: main
Status: local and origin/main aligned after the latest sync ritual
```

This checkpoint establishes the complete development design-flow baseline:

- desktop horizontal course with nineteen stops and eight active timeline segments;
- substantive Colonial interaction slice plus representative later-era design samples;
- all five historical transition stops in chronological sequence;
- reusable era/design-pack registry;
- Adobe typography roles;
- semantic palette tokens and accessible functional color roles;
- public-domain/CC0 local textures and provenance ledger;
- gradual aspect-preserving transition blends;
- development-only design preview;
- nineteen-node Field Notebook Course Map;
- existing local learner workspace, glossary, activities, bookmarks, resources, export, and accessibility contracts.

The current historical content remains largely placeholder material. The later era stops are visual development fixtures, not finished lessons.

## 2. Recent Milestones, Newest First

### Full-course era design-flow samples — 2026-08-01

- Expanded the learner-facing development sequence from ten to nineteen stops.
- Added representative Victorian, Jim Crow, World Wars, Civil Rights, Modern schooling, and Conclusion pages.
- Added all later historical transitions to the live sequence.
- Added reusable `DesignSampleStop` and data-driven transition rendering.
- Expanded the bottom timeline to eight active segments.
- Expanded the Course Map to nineteen synchronized nodes and eighteen complete segments.
- Corrected the Civil Rights transition noise to use a subtle repeat tile rather than a single enlarged patch.
- Accepted commit: **`0d0d09d` — `Add full-course era design flow samples`**.

### Historical texture system and gradual transitions — 2026-08-01

- Added optimized local WebP textures for every era design pack.
- Added a dedicated provenance and license ledger.
- Replaced an initially proposed attribution-required oak image with a CC0 wood texture.
- Replaced the framed Victorian museum-object photograph with a CC0 Hessian 230 material texture.
- Preserved texture aspect ratios in transitions.
- Reworked all transitions from stark split fields into long, subtle, color-led blends with low-opacity overlapping materials.
- Accepted commit: **`a26f4cf` — `Add historical texture system and gradual transitions`**.

### Era design-system QA — 2026-08-01

- Added accessible functional color roles distinct from decorative palette accents.
- Corrected muted-text, accent-text, and action-background contrast.
- Added responsive preview layout for supported desktop widths.
- Added reduced-motion, increased-contrast, and forced-colors behavior.
- Removed tilted cards and made Previous/Next visually symmetric.
- Accepted commit: **`9abaee2` — `Complete era design system QA`**.

### Intentional historical transition packs — 2026-08-01

- Added five reusable transition packs.
- Recorded what persists, fades, emerges, and changes structurally at each threshold.
- Replaced generic blending with historically authored transition logic.
- Applied the Colonial → Victorian threshold to the live course; later transitions were initially preview fixtures.
- Accepted commit: **`a5b5603` — `Add intentional historical transition packs`**.

### Era palettes and future design packs — 2026-08-01

- Added semantic color-token contracts for all historical periods.
- Applied approved Colonial and Victorian palettes to the active slice.
- Added complete preview treatments for Jim Crow, World Wars, Civil Rights, and Modern schooling.
- Accepted commit: **`400b7cf` — `Add era palettes and future design packs`**.

### Historical theme taxonomy, typography, and design preview — 2026-08-01

- Added Adobe Fonts Web Project integration.
- Established Colonial and Victorian typography systems and candidate later-era systems.
- Reorganized preview templates by historical period rather than placeholder module.
- Added a development-only Design Preview link.
- Added the era-theme design specification and approved color/texture/transition direction.
- Accepted commit: **`bde9bfe` — `Add historical theme taxonomy typography and design preview`**.

### Era-theme foundation and preview — 2026-08-01

- Added the reusable era/design-pack registry.
- Added semantic theme metadata to course stops.
- Added development-time theme validation.
- Added the internal theme-preview route.
- Preserved the existing six-layer stylesheet ledger.
- Accepted commit: **`1f1e7cd` — `Add era theme foundation and preview`**.

### Archived prototype removal and architecture safeguards — 2026-07-30

- Removed the tracked `virtual-museum-prototype-pass2/` archive from the active repository.
- Added final architecture validation safeguards.
- Accepted commits: **`bc95e8f` — `Remove archived prototype folder`** and **`4b08438` — `Add final architecture validation safeguards`**.

### Architecture stabilization and documentation synchronization — 2026-07-30

- Added development-time validation for duplicate IDs and broken references.
- Extracted Course Map layout, notebook sections, workspace actions, export, persistence lifecycle, course renderers, navigation, and stylesheet layers into explicit owners.
- Preserved workspace schema, keys, learner data, selectors, and behavior.
- Restored artifact-note and activity save paths found during regression testing.
- Added ownership and compatibility comments.
- Accepted commits: **`2de85f1`**, **`5dc11fd`**, **`828b55c`**, **`804ccd7`**, **`9229162`**, **`8a96c57`**, **`20e6836`**, **`f821d12`**, **`bead569`**, and **`68b2fd4`**.

### Field Notebook redesign and Course Map — 2026-07-30

- Reframed the learner workspace as an academic fieldbook.
- Added Notes, Glossary, Activities, Bookmarks, Resources, and Course Map.
- Added compact master–detail section layouts.
- Added Further Study statuses and a vertically curving map.
- Replaced failed clipped/proportional route rendering with complete discrete segments.
- Accepted commit: **`0a90da2` — `Complete field notebook redesign and course map`**.

### Glossary workflow and flashcard study — 2026-07-30

- Added clickable key terms, learner-authored definitions, undiscovered-term guidance, and flashcard study.
- Corrected notebook anchoring by aligning component classes and CSS selectors.
- Accepted commit: **`87d370e` — `Add glossary workflow and flashcard study mode`**.

### Horizontal course vertical slice — 2026-07-29

- Replaced the active museum-room metaphor with a horizontally progressing course.
- Added Introduction, Early America cluster, Further Study, transition, and Common School landing.
- Added equivalent navigation methods and persistent timeline.
- Accepted commit: **`083b8c6` — `Build horizontal course vertical slice prototype`**.

### Initial museum prototype and aesthetic direction — 2026-07-29

- Built the initial React/Vite/GitHub Pages static prototype.
- Added local notebook storage, notes, bookmarks, activities, quizzes, export, and accessible media placeholders.
- Established the old-classroom/library aesthetic and corrected notebook docking.
- Accepted checkpoint: **`ddc5e0e` — `Refine classroom aesthetic and dock notebook side panel`**.

### GitHub Pages activation and repository initialization — 2026-07-29

- Corrected Pages deployment to GitHub Actions.
- Initialized the local repository and merged initial README history.
- Commits: **`db610e3`**, **`557a4c2`**, **`85f0b96`**, and **`75ec55f`**.

## 3. Redirected, Superseded, Removed, and Deferred Work

### Virtual museum / room model — superseded

The original product concept used museum rooms and artifact stations. It was productive for identifying media, notebook, privacy, and activity requirements but was superseded by the horizontal course at `083b8c6`.

### Separate prototype branch — corrected workflow assumption

The horizontal prototype was briefly placed on a temporary branch because preservation of the museum model was incorrectly inferred. Haley clarified that the new direction belonged on `main`. Future work defaults to `main` unless explicitly requested otherwise.

### Persistent storage-choice banner — removed

The early horizontal prototype displayed storage choice in a persistent banner that obscured timeline navigation. Storage status and settings moved into the Field Notebook.

### Notification-style note count — removed

A note-count bubble resembled an unread notification and was removed because the notebook does not contain updates requiring attention.

### Course Map clipped/proportional path reveal — rejected

Separate partial fragments and clipped continuous-path progress both produced misleading line artifacts. Complete discrete connectors are the accepted model.

### Archived Pass 2 folder — removed

The tracked `virtual-museum-prototype-pass2/` folder was removed at `bc95e8f`. It must no longer be described as present.

### Tilted cards — rejected

Rotated design-sample and transition cards were removed during QA. Accepted cards are level.

### Asymmetric Previous/Next styling — rejected

Previous and Next now share one visual treatment.

### Stark split-screen transitions — rejected

Early texture implementations preserved source proportions but produced visible seams and harsh half-and-half fields. The accepted model uses long feathered overlap, low material opacity, and dominant color progression.

### Stretched transition textures — rejected

Textures must preserve aspect ratio and crop rather than stretch to percentage width and full height.

### Framed Victorian textile photograph — replaced

The initial MET textile photograph included the mounted object and frame. It was first cropped, then replaced by a CC0 Hessian 230 material texture better suited to a repeatable design field.

### Adobe font binaries in GitHub — prohibited under current plan

The current subscription supports Adobe-hosted web use through a Web Project, not repository distribution of downloaded binaries. Self-hosting requires separate licensing.

### Mobile support — deferred

Mobile requires a separately designed experience.

### Real historical content beyond Colonial — deferred

Later-era pages are design fixtures pending Georga’s content and lesson architecture.

### Adobe font fallback plan — deferred but required

Choose, test, and document backup fonts before final publication or the end of development. This remains low priority during most development because Brown Adobe access is expected to continue for several years.

### Explicit activity-skip records — deferred

The notebook derives completed and to-revisit states but does not yet store a true skipped record.

### Provisional assets and type choices — deferred review

Civil Rights print texture, Modern schooling textures, and some later-era typography remain provisional pending real-content review.

## 4. Development History

| Date | Commit | Message | Decoration |
|---|---|---|---|
| 2026-08-01 | `0d0d09d` | Add full-course era design flow samples | HEAD → main, origin/main |
| 2026-08-01 | `a26f4cf` | Add historical texture system and gradual transitions | |
| 2026-08-01 | `9abaee2` | Complete era design system QA | |
| 2026-08-01 | `a5b5603` | Add intentional historical transition packs | |
| 2026-08-01 | `400b7cf` | Add era palettes and future design packs | |
| 2026-08-01 | `bde9bfe` | Add historical theme taxonomy typography and design preview | |
| 2026-08-01 | `1f1e7cd` | Add era theme foundation and preview | |
| 2026-07-30 | `bc95e8f` | Remove archived prototype folder | |
| 2026-07-30 | `4b08438` | Add final architecture validation safeguards | |
| 2026-07-30 | `68b2fd4` | Complete architecture cleanup and documentation sync | |
| 2026-07-30 | `bead569` | Remove obsolete stylesheet compatibility rules | |
| 2026-07-30 | `f821d12` | Decompose stylesheet cascade | |
| 2026-07-30 | `20e6836` | Extract course navigation logic | |
| 2026-07-30 | `8a96c57` | Decompose course stop rendering | |
| 2026-07-30 | `9229162` | Separate workspace persistence lifecycle | |
| 2026-07-30 | `804ccd7` | Complete field notebook section extraction | |
| 2026-07-30 | `828b55c` | Split notebook sections and restore activity saves | |
| 2026-07-30 | `5dc11fd` | Extract workspace logic and notebook model | |
| 2026-07-30 | `2de85f1` | Add architecture safeguards and stabilize artifact notes | |
| 2026-07-30 | `79efc03` | Add core project documentation | |
| 2026-07-30 | `0a90da2` | Complete field notebook redesign and course map | |
| 2026-07-30 | `87d370e` | Add glossary workflow and flashcard study mode | |
| 2026-07-29 | `083b8c6` | Build horizontal course vertical slice prototype | |
| 2026-07-29 | `ddc5e0e` | Refine classroom aesthetic and dock notebook side panel | |
| 2026-07-29 | `db610e3` | Trigger GitHub Pages deployment | |
| 2026-07-29 | `557a4c2` | Merge initial GitHub repository | |
| 2026-07-29 | `85f0b96` | Complete initial virtual museum prototype infrastructure | |
| 2026-07-29 | `75ec55f` | Initial commit | |
