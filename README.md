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
