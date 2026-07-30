# Virtual Museum — Notebook Redesign Pass 5

This pass completes the planned Field Notebook redesign by visually integrating all notebook sections and auditing the full-screen and docked experiences for keyboard, focus, motion, contrast, storage-state, and empty-state behavior.

## Pass 5 changes

- Unified fieldbook materials, binding, tabs, paper, controls, selected states, scrollbars, and empty states.
- Improved contrast of notebook header controls and disabled controls.
- Added keyboard navigation across the vertical section tabs with Arrow keys, Home, and End.
- Added an announced section-change status for screen-reader users.
- Added a full-screen focus trap, Escape-to-dock behavior, and focus restoration.
- Added explicit region labeling between the selected notebook tab and its content panel.
- Expanded focus styling to inputs, selects, textareas, links, buttons, and disclosure controls.
- Added compact-height behavior, increased-contrast behavior, and forced-colors support.
- Added an explicit non-color “Current” label to the active Course Map node.
- Preserved the Pass 4.2 discrete Course Map connector states.
- Preserved IndexedDB and session-only storage, notes, activities, bookmarks, glossary definitions, flashcard study, resources, Course Map navigation, and Markdown export.

## Run locally

```powershell
npm.cmd run dev
```
