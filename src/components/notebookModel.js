/**
 * Pure Field Notebook vocabulary and display selectors.
 *
 * This module contains no React state and no browser access. `Notebook.jsx`
 * imports these stable section definitions and formatting helpers so the shell
 * does not also own reusable notebook-domain rules.
 */

export const NOTEBOOK_SECTIONS = [
  { id: 'notes', label: 'Notes', icon: '✎' },
  { id: 'glossary', label: 'Glossary', icon: 'A–Z' },
  { id: 'activities', label: 'Activities', icon: '✓' },
  { id: 'bookmarks', label: 'Bookmarks', icon: '◆' },
  { id: 'resources', label: 'Resources', icon: '▤' },
  { id: 'course-map', label: 'Course Map', icon: '↝' },
]

/** Return the most specific human-readable source label available for a note. */
export function getNoteContextLabel(note = {}) {
  return note.artifactTitle || note.moduleTitle || 'General observation'
}

/** Locate a learner-authored glossary record without duplicating lookup logic. */
export function findGlossaryEntry(glossaryEntries, termId) {
  return glossaryEntries.find((entry) => entry.termId === termId)
}
