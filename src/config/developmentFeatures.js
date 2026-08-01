/**
 * Temporary development-only interface controls.
 *
 * Keep feature switches centralized so project-development surfaces can be
 * removed without hunting through learner-facing components. Vite also gates
 * the preview entry point behind `import.meta.env.DEV`, so it never appears in
 * the production GitHub Pages build.
 */

export const SHOW_DESIGN_PREVIEW_LINK = true
