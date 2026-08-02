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
    periodLabel: 'Domestic Atlantic learning → industrial and agricultural systems',
    purpose: 'Parchment and domestic manuscript traces persist while iron, cotton, print, and institutional regularity emerge.',
    status: 'active transition pack',
    designCues: ['parchment remains', 'navy recedes', 'rust and cotton green emerge', 'wood becomes iron and textile', 'handwriting yields to print'],
    transitionDetails: {
      persists: ['warm parchment', 'domestic scale', 'book typography'],
      fades: ['ocean navy', 'loose handwritten arrangement', 'wood-dominant framing'],
      emerges: ['rust', 'cotton-leaf green', 'iron rules', 'woven grid'],
      structure: 'Cards straighten and align as manuscript irregularity gives way to institutional print.',
    },
    transitionFamily: 'domestic-to-institutional',
    variants: { heading: 'transitional', surface: 'material-shift', frame: 'threshold' },
    typography: {
      display: 'ATF Garamond Subhead Medium → HWT Slab Columbian',
      secondary: 'ATF Garamond Subhead Medium → Clarendon Text',
      body: 'Adobe Caslon Pro → Clarendon Text',
      label: 'ATF Garamond Subhead → HWT Gothic Round',
    },
  },
  {
    id: 'victorian-to-jim-crow',
    label: 'Transition: Victorian → Jim Crow',
    periodLabel: 'Institutional expansion → imposed separation and hierarchy',
    purpose: 'The print institutions of the Victorian era persist as warmth drains away and partitions harden into a stark divided system.',
    status: 'preview transition pack active',
    designCues: ['Clarendon persists', 'rust and green recede', 'greyscale takes control', 'rules become partitions'],
    transitionDetails: {
      persists: ['institutional print', 'Clarendon body text', 'administrative regularity'],
      fades: ['cotton warmth', 'leaf green', 'rust ornament', 'textile softness'],
      emerges: ['black and white contrast', 'graphite', 'cold paper', 'hard divisions'],
      structure: 'A woven grid tightens into explicit parallel columns and unequal visual compartments.',
    },
    transitionFamily: 'institutional-to-divided',
    variants: { heading: 'drained', surface: 'dividing-paper', frame: 'hardening' },
    typography: {
      display: 'HWT Slab Columbian → Century Gothic candidate',
      secondary: 'Clarendon Text → Grad candidate',
      body: 'Clarendon Text → Grad Regular candidate',
      label: 'HWT Gothic Round → Century Gothic candidate',
    },
  },
  {
    id: 'jim-crow-to-world-wars',
    label: 'Transition: Jim Crow → World Wars',
    periodLabel: 'Divided bureaucracy → civic mobilization and the home front',
    purpose: 'Greyscale bureaucracy remains visible while faded civic blue, red, and garden green turn forms into public-facing mobilization print.',
    status: 'preview transition pack active',
    designCues: ['greyscale remains at the edge', 'faded flag colors enter', 'forms become posters', 'public address replaces closed partitions'],
    transitionDetails: {
      persists: ['newsprint', 'administrative forms', 'institutional typography'],
      fades: ['monochrome dominance', 'sealed compartments', 'static parallel columns'],
      emerges: ['federal blue', 'Rosie red', 'victory green', 'poster stamps'],
      structure: 'Closed partitions open into layered civic notices directed outward toward a mass public.',
    },
    transitionFamily: 'divided-to-mobilized',
    variants: { heading: 'civic-emergence', surface: 'form-to-poster', frame: 'opening' },
    typography: {
      display: 'Century Gothic candidate',
      secondary: 'Grad candidate',
      body: 'Grad Regular candidate',
      label: 'Century Gothic candidate',
    },
  },
  {
    id: 'world-wars-to-civil-rights',
    label: 'Transition: World Wars → Civil Rights',
    periodLabel: 'Civic poster culture → movement organizing and public action',
    purpose: 'Poster language persists as faded patriotic color intensifies into the vivid, participatory print culture of the Civil Rights era.',
    status: 'preview transition pack active',
    designCues: ['poster grammar persists', 'color intensifies', 'teal and orange enter', 'composition becomes participatory'],
    transitionDetails: {
      persists: ['poster paper', 'public messaging', 'screen and offset print logic'],
      fades: ['muted federal palette', 'wartime symmetry', 'official civic voice'],
      emerges: ['vivid orange', 'teal', 'mustard', 'magenta', 'community print'],
      structure: 'Orderly poster blocks break into overlapping, angled, and more participatory visual fields.',
    },
    transitionFamily: 'mobilized-to-movement',
    variants: { heading: 'intensifying', surface: 'poster-to-screenprint', frame: 'activating' },
    typography: {
      display: 'Century Gothic candidate → Goodland Variable',
      secondary: 'Grad candidate → Goodland Variable',
      body: 'Grad Regular candidate → News Gothic Regular',
      label: 'Century Gothic candidate → News Gothic Medium',
    },
  },
  {
    id: 'civil-rights-to-modern-schooling',
    label: 'Transition: Civil Rights → Modern schooling',
    periodLabel: 'Movement print → late twentieth-century educational systems',
    purpose: 'Strong color and teal persist while analog poster texture cools into campus wayfinding, geometric branding, and early digital structure.',
    status: 'preview transition pack active',
    designCues: ['teal carries forward', 'poster grain recedes', 'geometry regularizes', 'analog print becomes institutional digital design'],
    transitionDetails: {
      persists: ['teal', 'strong accent color', 'public-facing graphic confidence'],
      fades: ['halftone grain', 'mustard warmth', 'layered activist flyers', 'irregular registration'],
      emerges: ['university purple', 'computer beige', 'aqua', 'laminate', 'digital grid'],
      structure: 'Overlapping movement graphics settle into modular campus systems and early interface-like geometry.',
    },
    transitionFamily: 'movement-to-late-modern',
    variants: { heading: 'regularizing', surface: 'print-to-digital', frame: 'modular' },
    typography: {
      display: 'Goodland Variable → Centrifuge',
      secondary: 'Goodland Variable → Aktiv Grotesk Medium',
      body: 'News Gothic Regular → Aktiv Grotesk Regular',
      label: 'News Gothic Medium → Centrifuge tracked capitals',
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
