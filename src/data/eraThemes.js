/**
 * Authoritative registry for course-era identities and reusable design packs.
 *
 * Course data stores a stable `eraId`. Each course-era record maps that content
 * identity to a period-based `designPackId`, allowing the same visual template
 * to be reused by later modules without naming CSS after placeholder lessons.
 * Actual colors, typography, textures, spacing, and motion values remain CSS
 * custom properties in `styles/horizontal-course.css`.
 */

export const DESIGN_PACKS = [
  {
    id: 'course-neutral-introduction',
    label: 'Course-neutral / Introduction',
    periodLabel: 'Outside a specific historical period',
    purpose: 'Neutral scholarly orientation for introductions and project-level material.',
    status: 'active',
    transitionFamily: 'scholarly',
    variants: { heading: 'scholarly', surface: 'dark-panel', frame: 'restrained' },
    typography: {
      display: 'Shared scholarly serif',
      secondary: 'Shared scholarly serif',
      body: 'Shared scholarly serif',
      label: 'Shared interface sans',
    },
  },
  {
    id: 'colonial-era',
    label: '18th century / Colonial era',
    periodLabel: 'Colonial America and the eighteenth-century Atlantic world',
    purpose: 'Domestic learning, coastal trade, ocean travel, revolution, parchment, wood, and iron-gall ink.',
    status: 'active typography and approved live palette',
    transitionFamily: 'domestic-atlantic',
    variants: { heading: 'manuscript', surface: 'warm-paper', frame: 'domestic' },
    typography: {
      display: 'Antiquarian Scribe Regular',
      secondary: 'ATF Garamond Subhead Medium',
      body: 'Adobe Caslon Pro Regular',
      label: 'ATF Garamond Subhead Medium',
    },
  },
  {
    id: 'victorian-era',
    label: 'Pre–Civil War 19th century / Victorian era',
    periodLabel: 'Industrial expansion, agricultural systems, and common schooling',
    purpose: 'Industrial metal and rust meet cotton linen, cotton-leaf greens, wood type, and increasing institutional order.',
    status: 'active typography and approved live palette',
    transitionFamily: 'industrial-agricultural',
    variants: { heading: 'institutional', surface: 'slate-grid', frame: 'regular' },
    typography: {
      display: 'HWT Slab Columbian',
      secondary: 'Clarendon Text Bold',
      body: 'Clarendon Text Regular',
      label: 'HWT Gothic Round',
      accent: 'Coronette for selected ephemera only',
    },
  },
  {
    id: 'jim-crow-era',
    label: 'Post–Civil War 19th century / Jim Crow era',
    periodLabel: 'Reconstruction, segregation, and imposed division',
    purpose: 'Stark contrast, divided structures, restricted greyscale, institutional forms, and visual hierarchy without decorative spectacle.',
    status: 'preview pack active; typography provisional; live course use deferred',
    designCues: ['hard partitions', 'greyscale institutional paper', 'restricted oxblood emphasis', 'deliberate visual separation'],
    transitionFamily: 'divided-institutional',
    variants: { heading: 'divided', surface: 'institutional-paper', frame: 'partitioned' },
    typography: {
      display: 'Century Gothic candidate',
      secondary: 'Grad candidate',
      body: 'Grad Regular candidate',
      label: 'Century Gothic candidate',
    },
  },
  {
    id: 'world-wars-era',
    label: 'Early 20th century / World Wars era',
    periodLabel: 'World wars, home-front mobilization, and civic schooling',
    purpose: 'Faded patriotic print, victory gardens, wartime classrooms, practical optimism, and public-information design.',
    status: 'preview pack active; typography provisional; live course use deferred',
    designCues: ['faded civic poster color', 'victory-garden greens', 'ration-card paper', 'stamped public-information structure'],
    transitionFamily: 'civic-mobilization',
    variants: { heading: 'poster', surface: 'poster-paper', frame: 'mobilized' },
    typography: {
      display: 'Century Gothic candidate',
      secondary: 'Grad candidate',
      body: 'Grad Regular candidate',
      label: 'Century Gothic candidate',
    },
  },
  {
    id: 'civil-rights-era',
    label: '1960s–1970s / Civil Rights era',
    periodLabel: 'Civil rights, reform, activism, and cultural change',
    purpose: 'Bold public color, movement print, community organizing, strong contrast, and hopeful energy without implying inevitable progress.',
    status: 'preview pack active; typography provisional; live course use deferred',
    designCues: ['screen-print color', 'community-flyer layering', 'bold geometric blocks', 'halftone energy'],
    transitionFamily: 'movement-print',
    variants: { heading: 'vernacular', surface: 'editorial-paper', frame: 'poster' },
    typography: {
      display: 'Goodland Variable',
      secondary: 'Goodland Variable',
      body: 'News Gothic Regular',
      label: 'News Gothic Medium',
    },
  },
  {
    id: 'modern-schooling-era',
    label: '1980–present / Modern schooling era',
    periodLabel: 'Universities, computer labs, educational technology, and contemporary institutions',
    purpose: 'Late twentieth-century campus design, early digital systems, geometric branding, and restrained 1980s–1990s visual language.',
    status: 'preview pack active; typography provisional; live course use deferred',
    designCues: ['campus wayfinding', 'computer beige and laminate', 'geometric institutional branding', 'restrained 1980s–1990s forms'],
    transitionFamily: 'late-modern-institutional',
    variants: { heading: 'faceted', surface: 'technical-paper', frame: 'contemporary' },
    typography: {
      display: 'Centrifuge',
      secondary: 'Aktiv Grotesk Medium',
      body: 'Aktiv Grotesk Regular',
      label: 'Centrifuge tracked capitals',
    },
  },
  {
    id: 'course-neutral-conclusion',
    label: 'Course-neutral / Conclusion',
    periodLabel: 'Course-wide synthesis facing toward the present',
    purpose: 'Echoes the introduction while allowing restrained traces of the historical design systems without implying finality.',
    status: 'approved palette tokens defined; implementation deferred',
    transitionFamily: 'scholarly-synthesis',
    variants: { heading: 'scholarly', surface: 'dark-panel', frame: 'restrained' },
    typography: {
      display: 'Shared scholarly serif',
      secondary: 'Shared scholarly serif',
      body: 'Shared scholarly serif',
      label: 'Shared interface sans',
    },
  },
  {
    id: 'colonial-to-victorian',
    label: 'Transition: Colonial → Victorian',
    periodLabel: 'Curated historical threshold',
    purpose: 'Parchment and domestic manuscript traces persist while iron, cotton, print, and institutional regularity emerge.',
    status: 'active',
    transitionFamily: 'domestic-to-institutional',
    variants: { heading: 'transitional', surface: 'material-shift', frame: 'threshold' },
    typography: {
      display: 'ATF Garamond Subhead Medium → HWT Slab Columbian',
      secondary: 'ATF Garamond Subhead Medium → Clarendon Text',
      body: 'Adobe Caslon Pro → Clarendon Text',
      label: 'ATF Garamond Subhead → HWT Gothic Round',
    },
  },
]

export const ERA_THEMES = [
  {
    id: 'introduction',
    label: 'Introduction',
    designPackId: 'course-neutral-introduction',
  },
  {
    id: 'early-america',
    label: 'Early America',
    designPackId: 'colonial-era',
  },
  {
    id: 'resources',
    label: 'Further Study',
    designPackId: 'colonial-era',
  },
  {
    id: 'transition',
    label: 'Early America to Common School',
    designPackId: 'colonial-to-victorian',
  },
  {
    id: 'common-school',
    label: 'Common School',
    designPackId: 'victorian-era',
  },
]

export const ERA_THEME_IDS = ERA_THEMES.map((theme) => theme.id)

const themesById = new Map(ERA_THEMES.map((theme) => [theme.id, theme]))
const packsById = new Map(DESIGN_PACKS.map((pack) => [pack.id, pack]))

export function getDesignPack(designPackId) {
  return packsById.get(designPackId) ?? null
}

export function getEraTheme(eraId) {
  const eraTheme = themesById.get(eraId) ?? null
  if (!eraTheme) return null

  return {
    ...eraTheme,
    designPack: getDesignPack(eraTheme.designPackId),
  }
}
