# Lesson Design and Teaching Guide

## Executive Summary

This guide is the authoritative pedagogical and curatorial reference for designing course modules, lesson stops, sources, media, key terms, activities, transitions, and Further Study materials. It translates the current interaction architecture into requirements for Georga and any future lesson designer.

The guide distinguishes teaching decisions from technical implementation. It does not prescribe Georga’s historical argument or select sources on her behalf. Instead, it records what information and decisions the site needs in order to turn a curated lesson into a coherent, accessible, self-paced course experience.

## Quick Navigation

- [Teaching model and audience](#1-teaching-model-and-audience)
- [Course-level structure](#2-course-level-structure)
- [Module and stop design](#3-module-and-stop-design)
- [Professor guidance](#4-professor-guidance)
- [Sources and artifacts](#5-sources-and-artifacts)
- [Key terms and glossary](#6-key-terms-and-glossary)
- [Learning activities](#7-learning-activities)
- [Further Study](#8-further-study)
- [Historical and visual transitions](#9-historical-and-visual-transitions)
- [Accessibility, privacy, and learner autonomy](#10-accessibility-privacy-and-learner-autonomy)
- [Publication-readiness checklist](#11-publication-readiness-checklist)

## Document Role and Boundaries

This document owns lesson-design principles, course/module structure, curatorial inputs, source and media requirements, glossary and activity decisions, visual-transition rationale, and publication-readiness expectations. It does not own React implementation, browser storage, Git workflow, or full development history.

Current synchronized checkpoint:

```text
0a90da2 — Complete field notebook redesign and course map
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
- Learners control pace, review, note-taking, and depth of optional exploration.
- The site does not replace Georga with adaptive algorithms.
- The Field Notebook records the learner’s private encounter with the course.
- Optional material should enrich the course without making the core lesson feel incomplete.

### Public-history standard

The course should be rigorous enough to teach historical method while remaining readable to a general audience. Concision must not erase complexity, uncertainty, disagreement, or source limitations.

## 2. Course-Level Structure

The planned course frame is:

```text
Introduction
→ Early America
→ Common School / Nineteenth Century
→ Twentieth Century
→ Civil Rights and Beyond
→ Conclusion
```

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

## 3. Module and Stop Design

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
- What should remain visible without vertical page scrolling?
- What optional material can be placed in a bounded disclosure or internal panel?
- What notebook action is relevant?

### Viewport constraint

The desktop horizontal model depends on each stop fitting comfortably between the header and bottom timeline.

Lesson designers should therefore prefer:

- concise framing;
- one principal media object;
- short commentary;
- optional expandable transcript or description;
- one clear action.

Long required readings should be divided into several stops or provided as external Further Study material.

### Recommended-route versus free movement

The timeline and Previous/Next controls provide a recommended sequence. Learners may revisit earlier stops. Course Map nodes and notebook backlinks support recovery and review.

Do not lock ordinary progress behind opening every artifact or completing every activity unless Georga identifies a specific pedagogical reason.

## 4. Professor Guidance

Georga’s presence may appear in several modes:

### Orientation

Introduces an era, question, or source set.

### Attention direction

Asks learners to notice something before interpretation is revealed.

### Historical-context explanation

Provides necessary chronology, institutions, vocabulary, or stakes.

### Source criticism

Explains provenance, genre, audience, silence, mediation, or uncertainty.

### Interpretive challenge

Complicates an easy conclusion or contrasts sources.

### Synthesis

Names patterns, unresolved questions, and connections to the next era.

Professor commentary may be text, audio, video, or a combination, but complete text alternatives must be available.

## 5. Sources and Artifacts

### Curatorial selection

Every artifact should have a clear teaching function. Avoid adding material only because it is visually attractive or available.

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
- extended visual description where needed;
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

Do not present recreated sound, composite imagery, or interpretive staging as direct historical evidence.

### Text sources

Text should provide:

- readable excerpt;
- access to full transcription when appropriate;
- indication of omissions or editorial intervention;
- source citation;
- provenance;
- accessible formatting.

### Images

Images should provide:

- concise alt text;
- caption;
- extended description when close looking matters;
- zoom or enlarged view if necessary;
- rights and collection information.

### Audio and video

Audio/video should provide:

- native playback controls;
- captions for video;
- complete transcript;
- speaker identification;
- duration;
- rights/consent information;
- independent access to text alternatives.

External platforms require an explicit disclosure that the learner is leaving the course or loading third-party content.

## 6. Key Terms and Glossary

### Selecting key terms

Use a key term when the learner needs a concept to:

- understand the current lesson;
- follow recurring analysis across modules;
- distinguish a historical institution or practice;
- recognize a methodological concept;
- name an important contested category.

Do not mark every unfamiliar noun. A crowded glossary weakens the signal.

### In-lesson presentation

Key terms are:

- visually distinct;
- underlined;
- clearly clickable;
- identifiable without color alone.

When clicked, the learner may:

- write a personal definition;
- add the term without a definition;
- cancel.

### Glossary catalog

All planned terms appear in the notebook from the beginning, grouped alphabetically by module.

States:

- **Not encountered**
- **Added without definition**
- **Defined**

Undiscovered entries should tell the learner where they will encounter the term without exposing a supplied answer.

### Learner authorship

Definitions belong to the learner. The current design does not automatically replace them with Georga’s definitions.

A future feature may add optional compare-with-course-definition behavior, but it should preserve the learner’s original definition and clearly distinguish the two voices.

### Flashcard study

Study mode uses only terms the learner has added. It may filter by module or definition status. It is a private review tool, not a scored assessment.

## 7. Learning Activities

### Purpose

Activities should produce historical attention or reasoning rather than merely prove that the learner clicked through the course.

Appropriate activity families include:

- close looking;
- primary-source observation;
- compare two sources;
- chronology or sequence;
- identify missing voices;
- distinguish policy from practice;
- read against the grain;
- write a short interpretation;
- revisit and revise an earlier response;
- knowledge check for genuinely necessary context.

### Current technical forms

The prototype currently supports:

- written response;
- multiple choice;
- compare-your-response.

Additional forms should be added only after a concrete teaching need is identified.

### Feedback

Feedback should:

- explain reasoning;
- point back to evidence;
- avoid shaming language;
- distinguish factual correction from interpretive disagreement;
- allow revision where useful.

### Completion language

Use descriptive states such as:

- attempted;
- saved;
- revised;
- to revisit;
- skipped.

Avoid:

- grades;
- stars;
- streaks;
- mastery scores;
- celebratory reward loops;
- completion percentages presented as the purpose of learning.

The current implementation does not yet create explicit skipped records.

## 8. Further Study

Every historical module may end with a Further Study section.

Possible resource types:

- books;
- articles;
- public-history essays;
- documentaries;
- YouTube videos;
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
- whether it is freely available;
- caption/transcript status for audiovisual materials where known.

Further Study is optional. It should feel like a deliberate departure table rather than hidden required coursework.

Learners may privately mark saved resources as:

- Saved
- Started
- Finished

These statuses are self-reported and not monitored.

## 9. Historical and Visual Transitions

Visual transitions are part of the teaching design.

The course should allow learners to feel changes in educational systems through:

- palette;
- texture;
- typography;
- spatial order;
- document framing;
- density;
- media type;
- rhythm;
- professor commentary.

Examples in the current direction:

### Introduction

Neutral, scholarly, and outside a specific historical era.

### Early America

Warm paper, domestic materials, handwriting, intimate scale, and looser arrangement.

### Common School

Slate, print, grids, administrative regularity, and institutional scale.

### Transition zones

Transition zones should:

- cap the prior module;
- name what is changing;
- preserve what persists;
- introduce the visual logic of the next era gradually;
- carry forward a question rather than claim that one system cleanly replaced another.

A transition should not be an empty decorative gradient. It needs a teaching function.

## 10. Accessibility, Privacy, and Learner Autonomy

### Accessibility is not an alternate version

Every learner should have access to equivalent course content through:

- captions;
- transcripts;
- alt text;
- extended descriptions;
- keyboard controls;
- visible focus;
- reduced motion;
- non-color status labels;
- readable contrast.

Disability history as course content and accessibility of the course interface are related but distinct responsibilities.

### Private notebook

Learner writing remains on the learner’s device or current session. Georga does not see notes, definitions, activity responses, quiz attempts, bookmarks, or resource status.

Activities must not imply submission to an instructor.

### External resources

External links and embeds must disclose that:

- the learner is leaving the course or loading another provider;
- the provider may have different privacy practices;
- availability may change.

### Sensitive material

For material involving violence, racism, disability discrimination, abuse, or other difficult histories, Georga should determine:

- whether a content notice is appropriate;
- where it appears;
- what detail it provides;
- whether the learner can bypass or defer the material without losing orientation.

## 11. Publication-Readiness Checklist

### Module structure

- [ ] Module title and date framing are final.
- [ ] Every stop has one primary purpose.
- [ ] The complete stop sequence fits the horizontal model.
- [ ] The transition into and out of the module is designed.
- [ ] Further Study is curated.

### Historical content

- [ ] All claims are reviewed by Georga.
- [ ] Sources have stable provenance.
- [ ] Rights are confirmed.
- [ ] Uncertainty and disagreement are represented accurately.
- [ ] Placeholder text and media are removed.

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
- [ ] Interpretive questions are not falsely reduced to one correct answer.
- [ ] Required versus optional status is explicit.

### Experience and QA

- [ ] Every stop fits the supported desktop viewport.
- [ ] All navigation methods work.
- [ ] Notebook backlinks return correctly.
- [ ] Course Map nodes match stop IDs.
- [ ] Storage language is accurate.
- [ ] Keyboard-only testing is complete.
- [ ] Reduced-motion testing is complete.
- [ ] Georga has approved the complete module as a designed experience.

Published modules should be treated as stable, polished lessons. Factual corrections, accessibility repairs, broken links, and rights changes still require a documented correction pathway.
