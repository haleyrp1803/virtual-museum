# Lesson Design and Teaching Guide

## Executive Summary

This guide is the authoritative pedagogical and curatorial reference for designing course modules, lesson stops, sources, media, key terms, activities, transitions, and Further Study materials. It translates the current nineteen-stop development architecture and historical design-pack system into requirements for Georga and future lesson designers.

The guide distinguishes teaching decisions from technical implementation. It does not prescribe Georga’s historical argument or select sources on her behalf. It records what information and decisions the site needs to turn curated material into a coherent, accessible, self-paced course experience.

## Quick Navigation

- [Teaching model and audience](#1-teaching-model-and-audience)
- [Course-level structure](#2-course-level-structure)
- [Current design-flow prototype](#3-current-design-flow-prototype)
- [Module and stop design](#4-module-and-stop-design)
- [Professor guidance](#5-professor-guidance)
- [Sources and artifacts](#6-sources-and-artifacts)
- [Key terms and glossary](#7-key-terms-and-glossary)
- [Learning activities](#8-learning-activities)
- [Further Study](#9-further-study)
- [Historical design packs and transitions](#10-historical-design-packs-and-transitions)
- [Accessibility, privacy, and learner autonomy](#11-accessibility-privacy-and-learner-autonomy)
- [Publication-readiness checklist](#12-publication-readiness-checklist)

## Document Role and Boundaries

This document owns lesson-design principles, audience, course/module structure, curatorial inputs, source and media requirements, glossary and activity decisions, visual-transition rationale, and publication-readiness expectations. It does not own React implementation, browser storage mechanics, Git workflow, exact CSS values, font licensing detail, or complete development history.

Current synchronized implementation checkpoint:

```text
0d0d09d — Add full-course era design flow samples
Branch: main
Status: local and origin/main aligned after the latest sync ritual
```

## 1. Teaching Model and Audience

### Intended learners

The course is designed primarily for intellectually curious adults outside formal university settings. Many may have completed some college or hold degrees but feel they are missing sustained opportunities for guided learning.

Do not assume:

- current university enrollment;
- specialist historical knowledge;
- familiarity with historiography;
- access to subscription databases;
- comfort with academic jargon;
- a desire for grades, competition, or completion metrics.

### Teaching relationship

The course is self-paced but intellectually structured.

- Georga frames questions, selects evidence, and makes interpretive claims.
- Learners control pace, review, note-taking, and optional depth.
- The site does not replace Georga with adaptive algorithms.
- The Field Notebook records the learner’s private encounter with the course.
- Optional material should enrich rather than repair an incomplete core lesson.

### Public-history standard

The course should be rigorous enough to teach historical method while remaining readable to a general audience. Concision must not erase complexity, uncertainty, disagreement, source limitations, or the difference between evidence and interpretation.

## 2. Course-Level Structure

The current historical design taxonomy is:

```text
Introduction
→ 18th century / Colonial era
→ Pre–Civil War 19th century / Victorian era
→ Post–Civil War 19th century / Jim Crow era
→ Early 20th century / World Wars era
→ 1960s–1970s / Civil Rights era
→ 1980–present / Modern schooling era
→ Conclusion
```

This taxonomy is a design and orientation framework. Georga’s final module boundaries, titles, dates, and arguments may refine it.

The sequence is chronological but not a literal proportional timeline. Screen width reflects pedagogical pacing and content density, not the number of years represented.

### Introduction

The introduction may include:

- Georga’s welcome video;
- transcript and captions;
- course purpose;
- recurring themes;
- explanation of horizontal navigation;
- explanation of private local storage and the Field Notebook;
- approximate course structure;
- low-stakes navigation practice;
- Begin Course control.

It should orient rather than front-load substantive historical content.

### Conclusion

The conclusion should echo the introduction visually and structurally while facing the learner toward the present rather than implying historical finality.

It may include:

- Georga’s closing video;
- course-wide synthesis;
- final reflection;
- review of notes, glossary, activities, bookmarks, and resources;
- full export;
- course-wide further reading;
- acknowledgments and credits;
- return routes to earlier modules.

## 3. Current Design-Flow Prototype

The current application contains a complete visual journey across all approved periods, but it is not a complete historical course.

### Substantive interaction slice

The Colonial cluster currently demonstrates:

```text
Era landing
→ text artifact
→ image artifact
→ guided audio/video
→ private response
→ synthesis
→ Further Study
```

### Development-only design samples

Victorian, Jim Crow, World Wars, Civil Rights, Modern schooling, and Conclusion currently use generic `design-sample` stops. These fixtures exist to test:

- period typography;
- palettes and textures;
- source and media framing;
- response fields and controls;
- transitions between eras;
- timeline and Course Map continuity.

They do not establish:

- final historical claims;
- source choices;
- module length;
- lesson sequence;
- activity design;
- final dates or period labels.

When real content replaces a design sample, preserve the approved design-pack logic but let teaching needs determine the number and types of stops.

## 4. Module and Stop Design

A module is a visually and thematically coherent cluster within the course timeline.

Recommended module flow:

```text
Era landing
→ source encounter
→ source encounter
→ guided media
→ activity
→ synthesis
→ Further Study
→ historical transition
```

This is a template, not a requirement that every module contain the same number of stops.

### Stop design principle

Each stop should have one primary purpose. Avoid combining a long lecture, several artifacts, a quiz, and extensive reading on one screen.

A stop should answer:

- Why is the learner here?
- What is the primary object or action?
- What must remain visible without page-level vertical scrolling?
- What optional material belongs in a bounded disclosure or internal panel?
- What notebook action is relevant?

### Viewport constraint

The horizontal model depends on each stop fitting comfortably between the header and bottom timeline.

Prefer:

- concise framing;
- one principal media object;
- short commentary;
- optional expandable transcript or description;
- one clear action.

Long required readings should be divided across stops or supplied as Further Study.

### Recommended route versus free movement

The timeline and Previous/Next controls provide a recommended sequence. Learners may revisit earlier stops through the timeline, Course Map, and notebook backlinks.

Do not lock ordinary progress behind opening every artifact or completing every activity unless Georga identifies a specific pedagogical reason.

### Stable identifiers

Each published stop, artifact, glossary term, activity, and resource needs a stable internal ID. These IDs connect navigation, notebook records, Course Map nodes, validation, and export context.

## 5. Professor Guidance

Georga’s presence may appear in several modes:

### Orientation

Introduces an era, question, or source set.

### Attention direction

Asks learners to notice something before interpretation is revealed.

### Historical-context explanation

Provides necessary chronology, institutions, vocabulary, or stakes.

### Source criticism

Explains provenance, genre, audience, silence, mediation, editorial intervention, or uncertainty.

### Interpretive challenge

Complicates an easy conclusion or contrasts sources.

### Synthesis

Names patterns, unresolved questions, and connections to the next era.

Professor commentary may be text, audio, video, or a combination, but complete text alternatives must be available.

## 6. Sources and Artifacts

### Curatorial selection

Every artifact should have a clear teaching function. Do not add material solely because it is visually attractive or available.

For each artifact, Georga should provide or approve:

- stable internal title;
- artifact type;
- creator;
- date or date range;
- collection/institution;
- provenance;
- rights statement;
- concise description;
- historical context;
- interpretive commentary;
- transcription where applicable;
- image alternative text;
- extended visual description where close looking matters;
- audio/video transcript;
- captions;
- content notice where appropriate;
- related key terms;
- related activity references;
- module and stop placement.

### Distinguish evidence from interpretation

The interface should let learners distinguish:

- the historical source;
- catalog/provenance information;
- Georga’s commentary;
- reconstruction or design intervention;
- uncertainty or contestation.

Historical textures and period styling are interpretive framing, not evidence. Do not present recreated sound, composite imagery, decorative texture, or staged design as direct historical documentation.

### Text sources

Provide:

- readable excerpt;
- full transcription where appropriate;
- indication of omissions or editorial intervention;
- source citation;
- provenance;
- accessible formatting.

### Images

Provide:

- concise alt text;
- caption;
- extended description when close looking matters;
- zoom or enlarged view if necessary;
- rights and collection information.

### Audio and video

Provide:

- native playback controls;
- captions for video;
- complete transcript;
- speaker identification;
- duration;
- rights/consent information;
- independent access to text alternatives.

External platforms require explicit disclosure that the learner is leaving the course or loading third-party content.

## 7. Key Terms and Glossary

### Selecting key terms

Use a key term when the learner needs a concept to:

- understand the current lesson;
- follow recurring analysis;
- distinguish a historical institution or practice;
- recognize a methodological concept;
- name an important contested category.

Do not mark every unfamiliar noun.

### In-lesson presentation

Key terms are visually distinct, underlined, clickable, and identifiable without color alone.

When clicked, the learner may:

- write a personal definition;
- add the term without a definition;
- cancel.

### Glossary catalog

All planned terms appear in the notebook from the beginning, grouped alphabetically by module.

States:

- Not encountered
- Added without definition
- Defined

Undiscovered entries should tell the learner where the term appears without revealing a supplied answer.

### Learner authorship

Definitions belong to the learner. Any future compare-with-course-definition feature must preserve the learner’s original text and distinguish voices clearly.

### Flashcard study

Study mode uses only terms the learner has added. It is private review, not scored assessment.

## 8. Learning Activities

### Purpose

Activities should produce historical attention or reasoning rather than prove that the learner clicked through.

Appropriate families include:

- close looking;
- primary-source observation;
- compare two sources;
- chronology or sequence;
- identify missing voices;
- distinguish policy from practice;
- read against the grain;
- short interpretation;
- revisit and revise an earlier response;
- knowledge check for genuinely necessary context.

### Current technical forms

The current live slice supports a written response. Earlier prototype work also established multiple-choice and compare-your-response concepts, but new renderers should be added only for concrete teaching needs.

### Feedback

Feedback should:

- explain reasoning;
- point back to evidence;
- avoid shaming language;
- distinguish factual correction from interpretive disagreement;
- allow revision where useful.

### Completion language

Use descriptive states such as attempted, saved, revised, to revisit, and skipped. Avoid grades, stars, streaks, mastery scores, or reward loops.

A true persistent skipped state remains deferred.

## 9. Further Study

Every historical module may end with a Further Study section.

Possible resource types:

- books;
- articles;
- public-history essays;
- documentaries;
- videos;
- podcasts;
- archives;
- digital projects;
- primary-source collections.

For each resource, Georga should supply:

- title;
- author/creator;
- resource type;
- short annotation explaining why it matters;
- access information;
- link;
- approximate time/length where useful;
- free-access status;
- caption/transcript status for audiovisual material where known.

Further Study is optional. It should feel like a deliberate departure table rather than hidden required coursework.

Learners may privately mark saved resources as Saved, Started, or Finished.

## 10. Historical Design Packs and Transitions

Visual design is part of the teaching architecture, but it must remain subordinate to historical interpretation and readability.

### Course-neutral framing

Introduction and Conclusion remain outside a specific period. The conclusion may carry restrained traces of earlier eras but should not become a decorative collage or imply historical closure.

### Colonial era

Teaching atmosphere:

- domestic learning;
- Atlantic movement and coastal trade;
- parchment, wood, ink, and maritime blues;
- intimate scale and looser arrangement.

### Victorian era

Teaching atmosphere:

- industrial North and agricultural South;
- iron, rust, cotton, linen, and leaf green;
- expansion of print, regulation, and institutional order.

### Jim Crow era

Teaching atmosphere:

- imposed division and unequal hierarchy;
- stark black/white/greyscale contrast;
- cold institutional forms and hard partitions.

Do not turn racial oppression into decorative spectacle. Styling must not substitute for explicit historical explanation.

### World Wars era

Teaching atmosphere:

- civic mobilization;
- home-front labor;
- wartime classrooms;
- victory gardens;
- faded red, blue, cream, and green;
- public-information print.

### Civil Rights era

Teaching atmosphere:

- bold public color;
- movement organizing;
- community print;
- hopeful energy without implying inevitable progress.

### Modern schooling era

Teaching atmosphere:

- universities and school systems;
- campus wayfinding;
- computer labs and educational technology;
- late twentieth-century institutional branding;
- restrained 1980s–1990s geometry.

### Transition zones

Every transition must:

- cap the prior module;
- name what changes;
- preserve what persists;
- introduce the visual logic of the next era gradually;
- carry forward a question rather than claim clean replacement.

Transitions are not flat palette averages. For each one, lesson designers should decide:

- what historical structure persists;
- what language, material, or institution recedes;
- what emerges;
- how the learner should feel the change in layout, density, source type, and professor commentary.

Current approved transition logic is documented in the Era Theme Design Specification.

### Design and source ethics

- Period styling should orient, not authenticate.
- Decorative textures must not be mistaken for source reproductions.
- Historical photographs should not be used as casual backgrounds.
- Fonts and visual motifs should be tied to interpretive rationale.
- The learner must be able to understand the historical shift even if textures, color, or motion are unavailable.

## 11. Accessibility, Privacy, and Learner Autonomy

### Accessibility is not an alternate version

Every learner should have equivalent access through:

- captions;
- transcripts;
- alt text;
- extended descriptions;
- keyboard controls;
- visible focus;
- reduced motion;
- non-color status labels;
- readable contrast;
- forced-colors compatibility.

Texture, period color, or typographic atmosphere must never carry essential information alone.

### Private notebook

Learner writing remains on the learner’s device or current session. Georga does not see notes, definitions, activity responses, bookmarks, resource status, or navigation history.

Activities must not imply submission to an instructor.

### External resources and providers

External links and embeds must disclose that:

- the learner is leaving the course or loading another provider;
- the provider may have different privacy practices;
- availability may change.

Adobe Fonts currently creates an external request. This should be disclosed accurately before publication.

### Sensitive material

For material involving violence, racism, disability discrimination, abuse, or other difficult histories, Georga should determine:

- whether a content notice is appropriate;
- where it appears;
- what detail it provides;
- whether the learner can defer or bypass the material without losing orientation.

## 12. Publication-Readiness Checklist

### Module structure

- [ ] Module title and date framing are final.
- [ ] Every stop has one primary purpose.
- [ ] The stop sequence fits the horizontal model.
- [ ] The transition into and out of the module is designed.
- [ ] Further Study is curated.
- [ ] Development-only design-sample text has been removed.

### Historical content

- [ ] All claims are reviewed by Georga.
- [ ] Sources have stable provenance.
- [ ] Rights are confirmed.
- [ ] Uncertainty and disagreement are represented accurately.
- [ ] Placeholder text and media are removed.
- [ ] Decorative period styling is not presented as evidence.

### Media accessibility

- [ ] Images have alt text.
- [ ] Close-looking images have extended descriptions.
- [ ] Audio has transcripts.
- [ ] Video has captions and transcripts.
- [ ] External-provider disclosures are present.
- [ ] Content notices are included where needed.

### Glossary

- [ ] Key terms are selective and necessary.
- [ ] Each term has a stable ID and lesson location.
- [ ] Module grouping is correct.
- [ ] Term styling is legible and clearly interactive.

### Activities

- [ ] Every activity has a clear learning purpose.
- [ ] Feedback is evidence-based and non-punitive.
- [ ] Interpretive questions are not falsely reduced to one answer.
- [ ] Required versus optional status is explicit.

### Design pack

- [ ] Typography has been tested against real content.
- [ ] Normal text and action contrast pass.
- [ ] Textures remain subordinate and readable.
- [ ] Reduced-motion and forced-colors behavior is equivalent.
- [ ] Transition logic is historically meaningful.
- [ ] Asset sources and licenses are recorded.
- [ ] Adobe Fonts fallback plan is complete before final publication.

### Experience and QA

- [ ] Every stop fits the supported desktop viewport.
- [ ] All navigation methods work.
- [ ] Notebook backlinks return correctly.
- [ ] Course Map nodes match stop IDs.
- [ ] Storage language is accurate.
- [ ] Keyboard-only testing is complete.
- [ ] Reduced-motion and forced-colors testing are complete.
- [ ] Georga has approved the module as a designed experience.

Published modules should be treated as stable, polished lessons. Factual corrections, accessibility repairs, broken links, rights changes, and provider changes still require a documented correction pathway.
