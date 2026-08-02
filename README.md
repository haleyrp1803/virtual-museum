# History of Education — Horizontal Course Prototype

## Executive Summary

This repository contains a desktop-first, horizontally progressing public-history course on the history of education. It combines professor-guided interpretation, primary-source encounters, private learning activities, a persistent Field Notebook, and historically differentiated visual design packs that make movement between eras perceptible through typography, color, texture, framing, and layout.

The current build is still a **development prototype**, not a finished course. Its original Colonial-era vertical slice remains the most complete interaction example. Later eras now appear as clearly labeled design-flow samples so Haley and Georga-Kay Whyte can evaluate the full visual sequence before final historical content and lesson architecture are supplied.

## Quick Navigation

- [What the project is](#1-what-the-project-is)
- [Audience and teaching model](#2-audience-and-teaching-model)
- [Current development flow](#3-current-development-flow)
- [Current learner features](#4-current-learner-features)
- [Historical design system](#5-historical-design-system)
- [Privacy and local storage](#6-privacy-and-local-storage)
- [Run locally](#7-run-locally)
- [Current limitations and deferred work](#8-current-limitations-and-deferred-work)
- [Documentation](#9-documentation)
- [Project roles](#10-project-roles)

## Document Role and Boundaries

This README owns public orientation, the current learner-facing workflow, basic local setup, concise limitations, and links to deeper documentation. It does not own exhaustive architecture, implementation contracts, workflow governance, complete teaching guidance, design-token detail, asset provenance, or full development chronology.

Current synchronized implementation checkpoint:

```text
0d0d09d — Add full-course era design flow samples
Branch: main
Status: local and origin/main aligned after the latest sync ritual
```

This documentation refresh was prepared from that synchronized implementation checkpoint. The documentation-only commit that applies this refresh will become the next repository head.

## 1. What the Project Is

The project is a static React/Vite course site hosted on GitHub Pages:

```text
https://haleyrp1803.github.io/virtual-museum/
```

Its defining interaction model is:

> A horizontally progressing historical course in which each era forms a visually coherent learning cluster, the persistent timeline shows historical position and visitor progress, and transitional zones make changes in educational systems perceptible through layout, material, typography, and interaction.

The project began as a virtual-museum prototype. The active direction is a chronological course-module model rather than room-based museum navigation. The old museum metaphor remains part of the development history, but it is not the current product direction.

## 2. Audience and Teaching Model

The intended audience is a general public of intellectually curious adult learners, including people outside formal university settings who want structured opportunities for personal learning.

The course is:

- self-paced;
- professor-guided rather than algorithmically personalized;
- designed for desktop and laptop use;
- chronological but not proportionally scaled by years;
- interactive without requiring accounts;
- private by default;
- non-graded;
- designed to support reflection, source analysis, vocabulary building, and further independent study.

Georga-Kay Whyte supplies the historical sources and makes curatorial, editorial, and pedagogical decisions. Haley designs and manages the digital experience, infrastructure, accessibility workflow, and publication process.

## 3. Current Development Flow

The current application contains nineteen navigable stops:

1. Course Introduction
2. Colonial-era landing
3. Colonial primary-source stop
4. Colonial close-looking stop
5. Colonial guided-media stop
6. Colonial private-response activity
7. Colonial synthesis
8. Colonial Further Study
9. Colonial → Victorian transition
10. Victorian design sample
11. Victorian → Jim Crow transition
12. Jim Crow design sample
13. Jim Crow → World Wars transition
14. World Wars design sample
15. World Wars → Civil Rights transition
16. Civil Rights design sample
17. Civil Rights → Modern schooling transition
18. Modern schooling design sample
19. Course Conclusion design sample

The later era and conclusion stops are **development fixtures**. They demonstrate typography, color, texture, cards, media frames, controls, and transitions; they do not establish final historical claims, source selections, module length, or lesson pedagogy.

The persistent bottom navigation combines:

```text
Previous | clickable historical timeline | Next
```

The active timeline contains eight segments:

```text
Introduction | Colonial | Victorian | Jim Crow | World Wars | Civil Rights | Modern | Conclusion
```

Learners can also navigate with:

- mouse wheel;
- native horizontal trackpad input;
- Left and Right arrow keys;
- Page Up and Page Down;
- Home and End;
- Previous and Next buttons;
- direct timeline selections;
- Course Map nodes inside the Field Notebook;
- notebook backlinks.

The design is intentionally desktop/laptop only. Mobile presentation remains deferred because it requires a separately designed experience.

## 4. Current Learner Features

### Course stops and media

The prototype supports:

- written lesson text;
- text artifacts and transcriptions;
- image artifacts with alternative text and extended description;
- native audio playback with transcripts;
- native video playback with captions and transcripts;
- professor-guidance placeholders;
- source commentary;
- rights and provenance fields;
- private-response activities;
- optional Further Study resources;
- development-only design-sample stops.

Most historical materials and teaching copy remain placeholders used to test interaction, accessibility, and visual continuity.

### Field Notebook

The private Field Notebook has minimized, docked, and full-screen modes. Its permanent sections are:

- Notes
- Glossary
- Activities
- Bookmarks
- Resources
- Course Map

Current notebook capabilities include:

- artifact- and lesson-linked notes;
- note editing and deletion;
- bookmarks and return-to-source links;
- saved activity responses and quiz attempts;
- learner-authored glossary definitions;
- undiscovered glossary terms with lesson-location guidance;
- flashcard study;
- saved Further Study resources with learner-controlled statuses;
- a nineteen-node curving chronological Course Map;
- Markdown export;
- local-data deletion and storage settings.

The Field Notebook is a record of the learner’s particular course journey, not an LMS dashboard, instructor submission tool, or public profile.

## 5. Historical Design System

The course currently defines reusable design packs for:

- Course-neutral Introduction
- 18th century / Colonial era
- Pre–Civil War 19th century / Victorian era
- Post–Civil War 19th century / Jim Crow era
- Early 20th century / World Wars era
- 1960s–1970s / Civil Rights era
- 1980–present / Modern schooling era
- Course-neutral Conclusion

It also defines five curated transition packs:

- Colonial → Victorian
- Victorian → Jim Crow
- Jim Crow → World Wars
- World Wars → Civil Rights
- Civil Rights → Modern schooling

The system includes:

- a centralized era/design-pack registry;
- semantic color tokens;
- period-specific Adobe Fonts typography roles;
- local public-domain or CC0 textures;
- accessible functional color roles distinct from decorative accents;
- reduced-motion, increased-contrast, and forced-colors behavior;
- an internal design preview at `?theme-preview` during local development;
- a development-only Design Preview link that is excluded from production builds.

Exact design rationale and token assignments live in [ERA_THEME_DESIGN_SPECIFICATION.md](design_documentation/ERA_THEME_DESIGN_SPECIFICATION.md). Texture sources and rights information live in [THEME_ASSET_PROVENANCE.md](design_documentation/THEME_ASSET_PROVENANCE.md).

## 6. Privacy and Local Storage

The course does not use accounts, a backend learner database, discussion boards, public submissions, grades, analytics, or instructor tracking.

On first use, the learner chooses between:

- **persistent local storage**, which saves the private workspace in IndexedDB on the current browser and device; or
- **session-only use**, which keeps the complete notebook available for the current browser session without long-term persistence.

The site explains that:

- learner-generated work is not sent to Georga or the project;
- browser data may be lost if the learner clears storage, uses private browsing, or changes devices;
- Markdown export is the current personal-use backup;
- external links and future embedded providers may have separate privacy practices.

Adobe Fonts are currently loaded through an Adobe Web Project. That creates a third-party font request and must remain documented in the publication privacy review.

## 7. Run Locally

### Prerequisites

Install a current version of:

- Node.js
- npm

On Windows PowerShell, use `npm.cmd` because PowerShell may block `npm.ps1`.

### Install dependencies

```powershell
npm.cmd install
```

### Validate architecture

```powershell
npm.cmd run validate:architecture
```

### Start the development server

```powershell
npm.cmd run dev
```

### Build for production

```powershell
npm.cmd run build
```

### Preview the production build

```powershell
npm.cmd run preview
```

### Development design preview

While the Vite development server is running:

```text
http://localhost:5173/virtual-museum/?theme-preview
```

The main course also shows a development-only **Design Preview** link when `SHOW_DESIGN_PREVIEW_LINK` is enabled. It is automatically excluded from production builds.

### GitHub Pages

The Vite base path is:

```text
/virtual-museum/
```

GitHub Actions builds the project and deploys `dist`. GitHub Pages must use GitHub Actions as its source.

## 8. Current Limitations and Deferred Work

- The site is intentionally desktop/laptop only.
- Only the Colonial cluster currently demonstrates a multi-stop lesson architecture.
- Later historical eras are design-flow samples, not completed lessons.
- Most historical claims, sources, videos, audio, readings, dates, and teaching copy remain placeholders.
- External resources still use prototype behavior rather than final links.
- The final public course title and branding are unsettled.
- Markdown export is personal-use output, not a restorable workspace backup.
- Published-module versioning and correction policy remain to be defined.
- Several later-era typography assignments remain provisional until real content is available.
- Civil Rights print texture and Modern schooling textures remain provisional pending continued in-context review.
- Before final publication or the end of development, every Adobe Fonts family needs a tested and documented fallback/backup font plan. This is intentionally low priority during most development because Brown Adobe access is expected to remain available for several more years.
- Adobe-hosted font continuity and third-party privacy disclosure require final publication review.
- Real usability testing with intended public learners and disabled users remains outstanding.

## 9. Documentation

### Core documentation

- [Maintainer’s Guide](core_documentation/MAINTAINERS_GUIDE.md) — current architecture, state contracts, source ownership, design-system implementation, fragile zones, and testing.
- [Lesson Design and Teaching Guide](core_documentation/LESSON_DESIGN_AND_TEACHING_GUIDE.md) — course structure, lesson-authoring requirements, sources, media, glossary, activities, transitions, and publication readiness.
- [Project Workflow Charter](core_documentation/PROJECT_WORKFLOW_CHARTER.md) — source-of-truth, bounded-pass, delivery, testing, recovery, documentation, and decision-governance rules.
- [Changelog](core_documentation/CHANGELOG.md) — synchronized checkpoint, milestone history, redirected approaches, and commit chronology.

### Design documentation

- [Era Theme Design Specification](design_documentation/ERA_THEME_DESIGN_SPECIFICATION.md) — period taxonomy, typography, palettes, textures, component character, accessibility roles, and transition grammar.
- [Theme Asset Provenance](design_documentation/THEME_ASSET_PROVENANCE.md) — local texture filenames, sources, creators, licenses, transformations, and review status.

## 10. Project Roles

### Georga-Kay Whyte

- historical and teaching-content expert;
- source selection;
- curatorial and editorial authority;
- lesson framing;
- commentary;
- activity and reading decisions;
- final approval of historical claims and course materials.

### Haley

- project manager;
- digital-experience designer;
- infrastructure and interaction decisions;
- quality assurance;
- accessibility and workflow oversight;
- repository and publication management.

### ChatGPT

- implementation support;
- technical architecture;
- complete replacement files;
- documentation;
- debugging support;
- design-consequence analysis.

Curatorial authority and authorship of the course’s historical argument remain with Georga and Haley.
