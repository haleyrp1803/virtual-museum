# Virtual Museum

A static, self-paced virtual museum about the history of education. The first prototype establishes a React/Vite application shell, four provisional chronological rooms, explicit consent for browser-local storage, and a dual-mode private field notebook.

## Prototype features

- Entrance hall with four provisional modules
- One functional placeholder room
- Text, image, and audiovisual artifact placeholders
- Persistent notebook launcher
- Side-panel and full-screen notebook modes
- Artifact-linked notes stored only in the visitor's browser
- Markdown notebook export
- Local-data deletion
- GitHub Pages deployment workflow
- Responsive and keyboard-accessible baseline

## Local setup

```powershell
npm install
npm run dev
```

Vite will print the local development address in the terminal.

## Production build

```powershell
npm run build
```

## GitHub Pages

The included workflow builds and deploys the `dist` directory whenever `main` is updated. In the repository settings, set **Pages → Source** to **GitHub Actions**.

The Vite base path is configured for:

```text
https://haleyrp1803.github.io/virtual-museum/
```

## Current storage implementation

The prototype uses browser `localStorage` for its small initial workspace. This is intentional for Pass 1 simplicity. A later persistence pass can migrate substantive notebook records to IndexedDB behind the same application-level interface.

## Content status

All historical content is placeholder language. The prototype is intended to test infrastructure and interaction patterns without making curatorial decisions on Georga-Kay Whyte's behalf.

## Pass 2: consent and private browser persistence

Pass 2 replaces the provisional localStorage notebook record with a structured IndexedDB workspace.

- Visitors explicitly choose whether to enable local saving.
- Declining consent leaves museum content available but disables notebook persistence.
- Notebook records are stored only in the visitor's current browser and device.
- A visible status line reports loading, saving, ready, disabled, unavailable, and error states.
- Visitors can retry a failed database connection, reconsider consent, export notes as Markdown, or permanently delete all local workspace data.
- Consent records remain in localStorage; substantive visitor work is stored in IndexedDB.
