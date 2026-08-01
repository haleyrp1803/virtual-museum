/**
 * Authoritative registry for visual-era identities.
 *
 * Course data stores only an `eraId`. This registry translates that stable ID
 * into human-readable design intent and a controlled set of component
 * variants. Actual colors, typography, textures, spacing, and motion values
 * remain CSS custom properties in `styles/horizontal-course.css` so the visual
 * cascade stays inspectable without generating styles in JavaScript.
 */

export const ERA_THEMES = [
  {
    id: 'introduction',
    label: 'Introduction',
    purpose: 'Neutral scholarly orientation outside a specific historical era.',
    transitionFamily: 'scholarly',
    variants: { heading: 'scholarly', surface: 'dark-panel', frame: 'restrained' },
  },
  {
    id: 'early-america',
    label: 'Early America',
    purpose: 'Warm paper, domestic materials, intimate scale, and looser arrangement.',
    transitionFamily: 'domestic-paper',
    variants: { heading: 'manuscript', surface: 'warm-paper', frame: 'domestic' },
  },
  {
    id: 'resources',
    label: 'Further Study',
    purpose: 'A bounded scholarly departure table related to the preceding module.',
    transitionFamily: 'reference-paper',
    variants: { heading: 'reference', surface: 'gridded-paper', frame: 'catalog' },
  },
  {
    id: 'transition',
    label: 'Early America to Common School',
    purpose: 'A curated threshold preserving domestic traces while institutional order emerges.',
    transitionFamily: 'domestic-to-institutional',
    variants: { heading: 'transitional', surface: 'material-shift', frame: 'threshold' },
  },
  {
    id: 'common-school',
    label: 'Common School',
    purpose: 'Slate, print, grids, administrative regularity, and institutional scale.',
    transitionFamily: 'institutional-slate',
    variants: { heading: 'institutional', surface: 'slate-grid', frame: 'regular' },
  },
]

export const ERA_THEME_IDS = ERA_THEMES.map((theme) => theme.id)

const themesById = new Map(ERA_THEMES.map((theme) => [theme.id, theme]))

export function getEraTheme(eraId) {
  return themesById.get(eraId) ?? null
}
