# Virtual Museum — Horizontal Course Prototype V1

This branch of the prototype tests a new interaction model: a horizontally progressing history-of-education course rather than a room-based virtual museum.

## Vertical slice

The prototype includes:

1. Course introduction with a placeholder welcome video and navigation tutorial
2. Early America module landing
3. Text and image primary-source stops
4. Audio and video guidance stops
5. Private written-response activity
6. Module synthesis
7. Homework, further reading, and resources section
8. A visual transition into the common-school era
9. Common School module landing

## Navigation

Visitors can move through the course using:

- mouse wheel or trackpad
- left/right arrow keys
- Page Up/Page Down
- Home/End
- Previous/Next buttons
- clickable persistent timeline segments

The prototype targets desktop and laptop screens. It intentionally does not provide a mobile course layout at this stage.

## Private workspace

The accepted notebook and consent infrastructure remains in place. Visitors may choose persistent IndexedDB storage or session-only storage. Notes, bookmarks, activity responses, export, and deletion remain private to the visitor.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

## Deployment

The repository is configured for GitHub Pages deployment through GitHub Actions. Vite's base path remains `/virtual-museum/`.

## Horizontal course QA pass 1

- Removed the persistent storage-status banner from the course canvas.
- Moved notebook storage status, retry, and storage-choice controls into the notebook.
- Reduced stop-heading scale and constrained each timeline stop to the available course viewport.
- Long optional material now scrolls within its own component rather than forcing page-level vertical scrolling.
- Repositioned the minimized notebook launcher above the fixed navigation bar so it cannot cover Next.
- Removed the notification-style notebook count badge.
- Uses burgundy text on light surfaces and reserves dusty rose for dark backgrounds.


## Prototype V1.2 — integrated timeline navigation

- Moves the clickable historical timeline into the fixed bottom navigation bar.
- Keeps Previous on the left and Next on the right.
- Removes the redundant “x of 10” and stop-title status block.
- Expands the usable course viewport upward after removing the standalone timeline bar.


## Horizontal Course Prototype V1.3 — Glossary

Adds clickable in-lesson key terms, visitor-authored glossary definitions stored in the private workspace, alphabetized module-grouped glossary discovery states, notebook navigation back to lesson locations, Markdown glossary export, and a separate flashcard study screen.


## V1.4 glossary QA

- Corrects the notebook component/CSS class mismatch so side mode docks to the right between the fixed header and integrated bottom timeline.
- Adds an accessible two-sided flashcard with a 3D turning animation and reduced-motion fallback.
