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

## Pass 2.1 correction

The notebook now has two complete operating modes:

- **Persistent mode:** with consent, workspace data is stored in IndexedDB on the current device.
- **Session-only mode:** the full notebook remains available through `sessionStorage` and is cleared when the browser session ends.

Visitors may export Markdown in either mode and may switch a session-only notebook into persistent mode without losing current entries.


## Pass 3: complete notebook workflow

Pass 3 expands the accepted Pass 2.1 storage model without changing consent behavior.

- Notes can be edited or deleted with explicit confirmation.
- Artifacts can be bookmarked from the room, inspection view, or notebook.
- Notes and bookmarks link visitors back to their source artifact.
- Full-screen notebook mode groups notes by module and supports search across note text, module titles, and artifact titles.
- The notebook separates Notes and Bookmarks into accessible tab views.
- Markdown export now includes a privacy statement, bookmarks, module grouping, artifact references, and creation/update times.
- All features work in both persistent IndexedDB mode and session-only mode.


## Pass 3.1 correction

- Corrected a CSS class collision that caused the application shell itself to adopt the fixed side-panel layout when the notebook opened.
- The side notebook now occupies only its intended right-hand panel while the museum remains visible alongside it.
- Pinned the official `@vitejs/plugin-react` development dependency to the current compatible major release instead of the floating `latest` tag.

## Pass 4: learning activities and progress

Pass 4 adds a data-driven learning layer to the accepted Pass 3.1 notebook baseline:

- written-response activities saved privately to the workspace;
- multiple-choice knowledge checks with explanatory feedback;
- compare-your-response activities without reductive right/wrong scoring;
- descriptive module progress for artifacts explored and activities attempted;
- a dedicated Activities section in the field notebook;
- activity responses and quiz attempts in Markdown exports.

The sample activity language remains placeholder content for infrastructure testing. Activity definitions live in `src/data/modules.js` rather than inside display components so curatorial content can later change without rewriting the interaction system.

## Pass 5: media and accessibility layer

Pass 5 adds reusable artifact renderers for text, image, audio, and video material. The included media are locally generated interface-test assets, not historical sources.

Accessibility foundations now include:

- native audio and video controls;
- WebVTT captions for the sample video;
- expandable transcripts for audiovisual and text artifacts;
- concise alternative text plus optional extended image description;
- visible rights and provenance information;
- an external-media privacy disclosure component;
- skip navigation;
- route and artifact focus management;
- keyboard-visible focus states;
- reduced-motion and forced-colors support;
- responsive media and notebook behavior.

Before publication, each real artifact should be reviewed for accurate alt text, extended description where useful, complete captions/transcripts, rights language, source provenance, and external-provider privacy implications.
