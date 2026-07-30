# History of Education — Horizontal Course Prototype

## Executive Summary

This repository contains a desktop-first, horizontally progressing digital course on the history of education. The course is designed for a general public audience—especially intellectually curious adult learners outside formal university settings—and combines professor-guided interpretation, primary-source encounters, private learning activities, a persistent Field Notebook, and visually legible transitions between historical eras.

The current public build is a **vertical-slice prototype**, not a finished course. It demonstrates the complete interaction grammar from course introduction through an Early America module cluster, optional Further Study, a historical transition, and the landing for the Common School era. Historical sources, videos, audio, readings, dates, and teaching copy remain placeholders until Georga-Kay Whyte makes the curatorial and pedagogical selections.

## Quick Navigation

- [What the project is](#1-what-the-project-is)
- [Audience and teaching model](#2-audience-and-teaching-model)
- [Current prototype flow](#3-current-prototype-flow)
- [Current learner features](#4-current-learner-features)
- [Privacy and local storage](#5-privacy-and-local-storage)
- [Run locally](#6-run-locally)
- [Current limitations](#7-current-limitations)
- [Documentation](#8-documentation)
- [Project roles](#9-project-roles)

## Document Role and Boundaries

This README owns public orientation, the current learner-facing workflow, basic local setup, concise limitations, and links to deeper documentation. It does not own exhaustive architecture, implementation contracts, workflow governance, complete teaching guidance, or full development chronology.

Current synchronized checkpoint:

```text
0a90da2 — Complete field notebook redesign and course map
Branch: main
Status: local and origin/main aligned after the latest sync ritual
```

For detailed milestone interpretation and complete Git history, see [core_documentation/CHANGELOG.md](core_documentation/CHANGELOG.md).

## 1. What the Project Is

The project is a static React/Vite course site hosted on GitHub Pages:

```text
https://haleyrp1803.github.io/virtual-museum/
```

Its defining interaction model is:

> A horizontally progressing historical course in which each era forms a visually coherent learning cluster, the persistent timeline shows both historical position and visitor progress, and transitional zones make changes in educational systems perceptible through layout, material, and interaction.

The project began as a virtual-museum prototype. The active direction is now a course-module model organized through movement across historical time. The old museum metaphor remains part of the development history, but it is not the current product direction.

## 2. Audience and Teaching Model

The intended audience is a general public of adult learners, including people who have completed some college or hold degrees but want additional structured opportunities for personal learning outside a university.

The course is:

- self-paced;
- professor-guided rather than algorithmically personalized;
- designed for desktop and laptop use;
- organized chronologically but not proportionally;
- interactive without requiring accounts;
- private by default;
- non-graded unless a future teaching context adds an external assessment system;
- designed to support reflection, source analysis, vocabulary building, and further independent study.

Georga-Kay Whyte supplies the historical sources and makes curatorial, editorial, and pedagogical decisions. Haley designs and manages the digital experience.

## 3. Current Prototype Flow

The active vertical slice contains ten course stops:

1. **Course Introduction**
2. **Early America introduction**
3. **Primary-source stop**
4. **Close-looking image stop**
5. **Guided audio/video stop**
6. **Private-response activity**
7. **Module synthesis**
8. **Further Study**
9. **Historical transition**
10. **Common School landing**

The persistent bottom navigation combines:

```text
Previous | clickable historical timeline | Next
```

Learners can also navigate with:

- the mouse wheel;
- trackpad scrolling;
- Left and Right arrow keys;
- Page Up and Page Down;
- Home and End;
- direct course-timeline selections;
- Course Map nodes inside the Field Notebook.

The design is intentionally desktop-first. Mobile presentation is not currently supported.

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
- external-resource cards.

All current historical materials are placeholders used to test interaction and accessibility.

### Field Notebook

The private Field Notebook has minimized, docked, and full-screen modes. Its permanent sections are:

- **Notes**
- **Glossary**
- **Activities**
- **Bookmarks**
- **Resources**
- **Course Map**

Current notebook capabilities include:

- artifact- and lesson-linked notes;
- note editing and deletion;
- bookmarks and return-to-source links;
- saved activity responses and quiz attempts;
- learner-authored glossary definitions;
- faded undiscovered glossary terms with lesson-location guidance;
- flashcard study with a two-sided flipping animation;
- saved Further Study resources with learner-controlled statuses;
- a curving chronological Course Map;
- Markdown export;
- local-data deletion.

The Field Notebook is a record of the learner’s particular course journey, not a learning-management dashboard or public profile.

## 5. Privacy and Local Storage

The course does not use accounts, a backend database, discussion boards, public submissions, grades, or instructor tracking.

On first use, the learner chooses between:

- **persistent local storage**, which saves the private workspace in IndexedDB on the current browser and device; or
- **session-only use**, which keeps the complete notebook available for the current browser session without long-term persistence.

The site explains that:

- work is not sent to Georga or the project;
- browser data may be lost if the learner clears storage, uses private browsing, or changes devices;
- Markdown export is the current personal-use backup;
- externally embedded or linked media may have separate privacy practices and must be disclosed when added.

## 6. Run Locally

### Prerequisites

Install a current version of:

- Node.js
- npm

On Windows PowerShell, this project uses `npm.cmd` because PowerShell may block `npm.ps1`.

### Install dependencies

```powershell
npm.cmd install
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

### GitHub Pages

The Vite base path is:

```text
/virtual-museum/
```

The GitHub Actions workflow builds the project and deploys the generated `dist` directory. GitHub Pages must use **GitHub Actions** as its source.

## 7. Current Limitations

- The site is intentionally desktop/laptop only.
- The current build is a vertical slice, not a complete multi-module course.
- Most historical and pedagogical content is placeholder material.
- Introduction and synthesis videos are placeholders.
- External resources use prototype alerts rather than live links.
- The final course title and public branding are not yet settled.
- Markdown export is intended for personal use; workspace re-import is not currently exposed.
- Published-module versioning and correction policy have not yet been implemented.
- The repository contains a tracked historical folder named `virtual-museum-prototype-pass2/`. It is not part of the active application and should be treated as an archival snapshot until a dedicated cleanup pass decides whether to remove it.

## 8. Documentation

- [Maintainer’s Guide](core_documentation/MAINTAINERS_GUIDE.md) — current architecture, state contracts, source ownership, accessibility/privacy implementation, fragile zones, and testing.
- [Lesson Design and Teaching Guide](core_documentation/LESSON_DESIGN_AND_TEACHING_GUIDE.md) — course structure, lesson-authoring requirements, source and media preparation, glossary, activities, transitions, and publication readiness.
- [Project Workflow Charter](core_documentation/PROJECT_WORKFLOW_CHARTER.md) — source-of-truth, bounded-pass, delivery, testing, recovery, and documentation governance rules.
- [Changelog](core_documentation/CHANGELOG.md) — current checkpoint, milestone history, redirected approaches, and complete Git history.

## 9. Project Roles

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
