/**
 * Authoritative horizontal-course sequence and course-level catalogs.
 *
 * `courseStops` defines navigable order and stable stop IDs; timeline segments
 * point into that sequence; artifact and Further Study catalogs are exposed to
 * App and the Field Notebook. Cross-file references are checked by
 * `validateCourseData.js` during development.
 */

import { sampleArtifacts } from './modules.js'

const designSample = ({
  id, label, variant, pageAsset = null, cardAsset = null, cardTreatment = 'solid',
  pageTreatment = 'material', sourceTitle, sourceText, caption, response,
}) => ({
  id, label, variant, pageAsset, cardAsset, cardTreatment, pageTreatment,
  sourceTitle, sourceText, caption, response,
})

export const courseStops = [
  {
    id: 'course-introduction', eraId: 'introduction', timelineLabel: 'Introduction', eyebrow: 'Course orientation',
    title: 'Welcome to the History of Education', dateLabel: 'Begin here', type: 'introduction',
    summary: 'Meet your professor, learn how the course moves through time, and try each navigation method before beginning.',
  },
  {
    id: 'early-america-introduction', eraId: 'early-america', timelineLabel: 'Colonial era', eyebrow: 'Module 1 · Orientation',
    title: 'Learning Before Mass Schooling', dateLabel: '18th century / Colonial era', type: 'era-intro',
    summary: 'A visual and contextual threshold into the first historical cluster. Final framing and dates will be supplied by Georga.',
  },
  {
    id: 'early-america-text', eraId: 'early-america', timelineLabel: 'Primary source', eyebrow: 'Module 1 · Source stop 1',
    title: 'Read a Primary Source', dateLabel: '18th century / Colonial era', type: 'artifact', artifactId: 'family-text-01',
  },
  {
    id: 'early-america-image', eraId: 'early-america', timelineLabel: 'Close looking', eyebrow: 'Module 1 · Source stop 2',
    title: 'Look Closely', dateLabel: '18th century / Colonial era', type: 'artifact', artifactId: 'family-image-01',
  },
  {
    id: 'early-america-media', eraId: 'early-america', timelineLabel: 'Professor guidance', eyebrow: 'Module 1 · Guided media',
    title: 'Listen, Watch, and Annotate', dateLabel: '18th century / Colonial era', type: 'media-pair',
    artifactIds: ['family-audio-01', 'family-video-01'],
  },
  {
    id: 'early-america-activity', eraId: 'early-america', timelineLabel: 'Learning activity', eyebrow: 'Module 1 · Private response',
    title: 'Pause and Respond', dateLabel: '18th century / Colonial era', type: 'activity',
    summary: 'A placeholder written activity tests saving, revising, and exporting work without requiring finalized course content.',
  },
  {
    id: 'early-america-synthesis', eraId: 'early-america', timelineLabel: 'Synthesis', eyebrow: 'Module 1 · Closing perspective',
    title: 'Gather the Module Together', dateLabel: '18th century / Colonial era', type: 'synthesis',
    summary: 'Georga’s concluding commentary will reconnect the sources, name unresolved questions, and prepare students for optional further study.',
  },
  {
    id: 'early-america-resources', eraId: 'resources', timelineLabel: 'Further study', eyebrow: 'Module 1 · Continue learning',
    title: 'Homework, Further Reading, and Resources', dateLabel: 'Beyond the course page', type: 'resources',
    summary: 'A clearly bounded departure table for books, articles, videos, podcasts, archives, and other external resources selected by Georga.',
  },
  {
    id: 'common-school-transition', eraId: 'transition', timelineLabel: 'Transition', eyebrow: 'Historical transition',
    title: 'From Household Learning to Institutional Schooling', dateLabel: 'Colonial → Victorian', type: 'transition',
    summary: 'Parchment and domestic manuscript traces persist while iron, cotton, print, and institutional regularity emerge.',
    transition: {
      fromLabel: 'Colonial era', toLabel: 'Victorian era', from: ['handwritten', 'household', 'local'],
      to: ['printed', 'standardized', 'public'],
      note: 'Domestic learning and Atlantic material culture recede gradually as print institutions, regular grids, and public systems become more prominent.',
    },
  },
  {
    id: 'common-school-landing', eraId: 'common-school', timelineLabel: 'Victorian era', eyebrow: 'Design-flow sample · Framing',
    title: 'Pre–Civil War Schooling', dateLabel: 'Pre–Civil War 19th century / Victorian era', type: 'design-sample',
    moduleId: 'victorian-era', moduleTitle: 'Victorian era design sample',
    summary: 'This fixture tests a cream twill page field with quiet solid cards and ordered institutional typography.',
    sample: designSample({
      id: 'victorian-framing-sample', label: 'Victorian era', variant: 'framing',
      pageAsset: '/virtual-museum/assets/themes/textures/victorian/page-cream-twill.webp',
      cardTreatment: 'solid', sourceTitle: 'Era-framing treatment',
      sourceText: 'Fine cream twill, iron-dark rules, agricultural green, and ordered typography establish the broad material atmosphere.',
      caption: 'A neutral textile field supports solid information cards without repeating the retired Victorian linen texture.',
      response: 'A private response remains legible inside the Victorian framing treatment.',
    }),
  },
  {
    id: 'common-school-source-sample', eraId: 'common-school', timelineLabel: 'Victorian source', eyebrow: 'Design-flow sample · Source',
    title: 'Victorian Textile and Source Study', dateLabel: 'Pre–Civil War 19th century / Victorian era', type: 'design-sample',
    moduleId: 'victorian-era', moduleTitle: 'Victorian era design sample',
    summary: 'This fixture layers natural linen across the page and confines oxidized metal to a source-facing card.',
    sample: designSample({
      id: 'victorian-source-sample', label: 'Victorian era', variant: 'source',
      pageAsset: '/virtual-museum/assets/themes/textures/victorian/page-natural-linen.webp',
      cardAsset: '/virtual-museum/assets/themes/textures/victorian/card-oxidized-metal.webp',
      cardTreatment: 'dark-texture', sourceTitle: 'Document or material source',
      sourceText: 'Industrial metal can frame a bounded source card while natural linen keeps the wider page domestic and agricultural.',
      caption: 'The darker card is deliberately bounded; text remains on a solid inset rather than directly on the metal.',
      response: 'Record a source observation without losing the distinction between evidence and design material.',
    }),
  },
  {
    id: 'common-school-interaction-sample', eraId: 'common-school', timelineLabel: 'Victorian activity', eyebrow: 'Design-flow sample · Interaction',
    title: 'Victorian Activity and Material Study', dateLabel: 'Pre–Civil War 19th century / Victorian era', type: 'design-sample',
    moduleId: 'victorian-era', moduleTitle: 'Victorian era design sample',
    summary: 'This fixture pairs a tight woven page field with one warm-rusted interaction card.',
    sample: designSample({
      id: 'victorian-interaction-sample', label: 'Victorian era', variant: 'interaction',
      pageAsset: '/virtual-museum/assets/themes/textures/victorian/page-tight-weave.webp',
      cardAsset: '/virtual-museum/assets/themes/textures/victorian/card-warm-rust.webp',
      cardTreatment: 'dark-texture', sourceTitle: 'Interactive-state treatment',
      sourceText: 'Regular weave establishes order while a restrained rust field adds industrial contrast to one bounded card.',
      caption: 'Buttons, fields, and long learner writing remain on quiet solid surfaces.',
      response: 'Test longer writing, selected states, and secondary actions here.',
    }),
  },
  {
    id: 'jim-crow-transition', eraId: 'victorian-jim-crow-transition', timelineLabel: 'Transition', eyebrow: 'Historical transition',
    title: 'From Expansion to Imposed Separation', dateLabel: 'Victorian → Jim Crow', type: 'transition',
    summary: 'Institutional print persists as warmth drains away and partitions harden into a divided system.',
    transition: {
      fromLabel: 'Victorian era', toLabel: 'Jim Crow era', from: ['institutional', 'expanding', 'regulated'],
      to: ['divided', 'segregated', 'unequal'],
      note: 'The visual field cools and contracts: textile warmth and rust recede while black-and-white hierarchy and harder partitions emerge.',
    },
  },
  {
    id: 'jim-crow-design-sample', eraId: 'jim-crow', timelineLabel: 'Jim Crow era', eyebrow: 'Design-flow sample · Framing',
    title: 'Post–Civil War Schooling', dateLabel: 'Post–Civil War 19th century / Jim Crow era', type: 'design-sample',
    moduleId: 'jim-crow-era', moduleTitle: 'Jim Crow era design sample',
    summary: 'This fixture uses a soft abstract shadow across the page while keeping all information cards severe and solid.',
    sample: designSample({
      id: 'jim-crow-framing-sample', label: 'Jim Crow era', variant: 'framing',
      pageAsset: '/virtual-museum/assets/themes/textures/jim-crow/page-abstract-shadow.webp',
      cardTreatment: 'solid', sourceTitle: 'Divided institutional field',
      sourceText: 'A softened black-and-white shadow field creates pressure and division without turning a historical system into spectacle.',
      caption: 'Busy background, solid cards: interpretation and historical explanation remain primary.',
      response: 'A private response remains legible inside the divided institutional treatment.',
    }),
  },
  {
    id: 'jim-crow-source-sample', eraId: 'jim-crow', timelineLabel: 'Jim Crow source', eyebrow: 'Design-flow sample · Source',
    title: 'Jim Crow Print and Partition Study', dateLabel: 'Post–Civil War 19th century / Jim Crow era', type: 'design-sample',
    moduleId: 'jim-crow-era', moduleTitle: 'Jim Crow era design sample',
    summary: 'This fixture uses degraded print as the broad field and confines hard geometry to one source card.',
    sample: designSample({
      id: 'jim-crow-source-sample', label: 'Jim Crow era', variant: 'source',
      pageAsset: '/virtual-museum/assets/themes/textures/jim-crow/page-grainy-print.webp',
      cardAsset: '/virtual-museum/assets/themes/textures/jim-crow/card-geometric-blocks.webp',
      cardTreatment: 'high-contrast', sourceTitle: 'Policy or institutional source',
      sourceText: 'Hard geometric blocks can frame imposed separation when confined to a bounded component.',
      caption: 'The page grain is veiled; the patterned card contains a solid reading inset.',
      response: 'Keep source criticism, professor commentary, and learner authorship visibly distinct.',
    }),
  },
  {
    id: 'jim-crow-interaction-sample', eraId: 'jim-crow', timelineLabel: 'Jim Crow activity', eyebrow: 'Design-flow sample · Interaction',
    title: 'Jim Crow Grid and Control Study', dateLabel: 'Post–Civil War 19th century / Jim Crow era', type: 'design-sample',
    moduleId: 'jim-crow-era', moduleTitle: 'Jim Crow era design sample',
    summary: 'This fixture uses a tiled black grid at page scale and a pale patterned card as a colder secondary layer.',
    sample: designSample({
      id: 'jim-crow-interaction-sample', label: 'Jim Crow era', variant: 'interaction',
      pageAsset: '/virtual-museum/assets/themes/textures/jim-crow/page-black-tile-grid.webp',
      cardAsset: '/virtual-museum/assets/themes/textures/jim-crow/card-pale-tile.webp',
      cardTreatment: 'light-texture', sourceTitle: 'Interactive-state treatment',
      sourceText: 'A hard grid and pale institutional tile test unequal compartments without relying on color alone.',
      caption: 'The response field itself remains plain and readable.',
      response: 'Test keyboard focus, saved state, and revision controls here.',
    }),
  },
  {
    id: 'world-wars-transition', eraId: 'jim-crow-world-wars-transition', timelineLabel: 'Transition', eyebrow: 'Historical transition',
    title: 'From Divided Bureaucracy to Civic Mobilization', dateLabel: 'Jim Crow → World Wars', type: 'transition',
    summary: 'Administrative forms remain while faded civic colors and public-facing poster language emerge.',
    transition: {
      fromLabel: 'Jim Crow era', toLabel: 'World Wars era', from: ['restricted', 'bureaucratic', 'separated'],
      to: ['mobilized', 'public information', 'home front'],
      note: 'Closed institutional compartments open gradually into civic notices, wartime classrooms, and home-front mobilization.',
    },
  },
  {
    id: 'world-wars-design-sample', eraId: 'world-wars', timelineLabel: 'World Wars era', eyebrow: 'Design-flow sample · Framing',
    title: 'Schooling and the Home Front', dateLabel: 'Early 20th century / World Wars era', type: 'design-sample',
    moduleId: 'world-wars-era', moduleTitle: 'World Wars era design sample',
    summary: 'This fixture uses one broad, non-repeating blue cloth field rather than a tiled fabric pattern.',
    sample: designSample({
      id: 'world-wars-framing-sample', label: 'World Wars era', variant: 'framing',
      pageAsset: '/virtual-museum/assets/themes/textures/world-wars/page-blue-linen.webp',
      pageTreatment: 'single-cloth', cardTreatment: 'solid', sourceTitle: 'Civic framing treatment',
      sourceText: 'Pale blue cloth, cream paper, faded red, and orderly public-information structure evoke practical mobilization.',
      caption: 'The cloth spans the page once with a stable crop; it does not repeat.',
      response: 'A private response remains legible against the broad cloth field.',
    }),
  },
  {
    id: 'world-wars-source-sample', eraId: 'world-wars', timelineLabel: 'World Wars source', eyebrow: 'Design-flow sample · Source',
    title: 'World Wars Paper and Fabric Study', dateLabel: 'Early 20th century / World Wars era', type: 'design-sample',
    moduleId: 'world-wars-era', moduleTitle: 'World Wars era design sample',
    summary: 'This fixture layers cream natural linen behind one warm paper source card.',
    sample: designSample({
      id: 'world-wars-source-sample', label: 'World Wars era', variant: 'source',
      pageAsset: '/virtual-museum/assets/themes/textures/world-wars/page-natural-linen.webp',
      cardAsset: '/virtual-museum/assets/themes/textures/world-wars/card-warm-paper.webp',
      cardTreatment: 'light-texture', sourceTitle: 'Poster, notice, or classroom source',
      sourceText: 'Cream fabric and warm paper provide a quieter counterpoint to faded civic color.',
      caption: 'The paper texture is bounded to the source card and does not compete with captions.',
      response: 'Keep source metadata and professor commentary distinct from decorative material.',
    }),
  },
  {
    id: 'world-wars-interaction-sample', eraId: 'world-wars', timelineLabel: 'World Wars activity', eyebrow: 'Design-flow sample · Interaction',
    title: 'World Wars Wood and Metal Study', dateLabel: 'Early 20th century / World Wars era', type: 'design-sample',
    moduleId: 'world-wars-era', moduleTitle: 'World Wars era design sample',
    summary: 'This fixture uses wood sparingly as a broad atmospheric field and gray metal on one bounded card.',
    sample: designSample({
      id: 'world-wars-interaction-sample', label: 'World Wars era', variant: 'interaction',
      pageAsset: '/virtual-museum/assets/themes/textures/world-wars/page-rough-wood.webp',
      cardAsset: '/virtual-museum/assets/themes/textures/world-wars/card-gray-metal.webp',
      cardTreatment: 'dark-texture', sourceTitle: 'Interactive-state treatment',
      sourceText: 'Rough wood and oxidized gray metal test practical home-front material without becoming literal evidence.',
      caption: 'Wood is used on only one sample; controls remain on cream solid insets.',
      response: 'Test dense instructions, revision, and saved-state controls here.',
    }),
  },
  {
    id: 'civil-rights-transition', eraId: 'world-wars-civil-rights-transition', timelineLabel: 'Transition', eyebrow: 'Historical transition',
    title: 'From Civic Posters to Movement Print', dateLabel: 'World Wars → Civil Rights', type: 'transition',
    summary: 'Poster language persists as official, faded color intensifies into movement organizing and public action.',
    transition: {
      fromLabel: 'World Wars era', toLabel: 'Civil Rights era', from: ['official', 'mobilized', 'civic'],
      to: ['organized', 'collective', 'public action'],
      note: 'The civic poster remains recognizable while brighter color, community print, and participatory visual energy emerge.',
    },
  },
  {
    id: 'civil-rights-design-sample', eraId: 'civil-rights', timelineLabel: 'Civil Rights era', eyebrow: 'Design-flow sample · Framing',
    title: 'Education, Reform, and Public Action', dateLabel: '1960s–1970s / Civil Rights era', type: 'design-sample',
    moduleId: 'civil-rights-era', moduleTitle: 'Civil Rights era design sample',
    summary: 'This fixture uses a busy warm wave background with complementary solid cards sampled from its palette.',
    sample: designSample({
      id: 'civil-rights-framing-sample', label: 'Civil Rights era', variant: 'framing',
      pageAsset: '/virtual-museum/assets/themes/textures/civil-rights/page-flowing-waves.webp',
      cardTreatment: 'solid-complementary', sourceTitle: 'Movement-print framing treatment',
      sourceText: 'Orange, pink, yellow, and cream create public graphic energy while solid cards protect reading clarity.',
      caption: 'Only the Civil Rights section uses these bright 1960s–1970s patterns.',
      response: 'A private response remains legible on a solid indigo or cream surface.',
    }),
  },
  {
    id: 'civil-rights-source-sample', eraId: 'civil-rights', timelineLabel: 'Civil Rights source', eyebrow: 'Design-flow sample · Source',
    title: 'Civil Rights Patterned Card Study', dateLabel: '1960s–1970s / Civil Rights era', type: 'design-sample',
    moduleId: 'civil-rights-era', moduleTitle: 'Civil Rights era design sample',
    summary: 'This fixture keeps the page simple and confines dense red, orange, and navy geometry to a source card.',
    sample: designSample({
      id: 'civil-rights-source-sample', label: 'Civil Rights era', variant: 'source',
      cardAsset: '/virtual-museum/assets/themes/textures/civil-rights/card-dense-geometry.webp',
      cardTreatment: 'bold-pattern', sourceTitle: 'Community publication or photograph',
      sourceText: 'A dense patterned frame can energize a bounded source card while the page itself remains quiet.',
      caption: 'Simple background, busier card: the source remains on a solid inset.',
      response: 'Keep source, caption, professor commentary, and learner observation clearly separated.',
    }),
  },
  {
    id: 'civil-rights-interaction-sample', eraId: 'civil-rights', timelineLabel: 'Civil Rights activity', eyebrow: 'Design-flow sample · Interaction',
    title: 'Civil Rights Arch and Activity Study', dateLabel: '1960s–1970s / Civil Rights era', type: 'design-sample',
    moduleId: 'civil-rights-era', moduleTitle: 'Civil Rights era design sample',
    summary: 'This fixture uses narrow yellow-and-cream waves on the page and a framed orange arch on one card.',
    sample: designSample({
      id: 'civil-rights-interaction-sample', label: 'Civil Rights era', variant: 'interaction',
      pageAsset: '/virtual-museum/assets/themes/textures/civil-rights/page-narrow-waves.webp',
      cardAsset: '/virtual-museum/assets/themes/textures/civil-rights/card-arch-pattern.webp',
      cardTreatment: 'bold-pattern', sourceTitle: 'Interactive-state treatment',
      sourceText: 'A warm arch frame adds graphic interest while indigo, cream, and orange solid surfaces preserve contrast.',
      caption: 'The bold card pattern remains bounded and is not reused in other eras.',
      response: 'Test revision, comparison, and return-to-evidence workflows here.',
    }),
  },
  {
    id: 'modern-schooling-transition', eraId: 'civil-rights-modern-transition', timelineLabel: 'Transition', eyebrow: 'Historical transition',
    title: 'From Movement Print to Educational Systems', dateLabel: 'Civil Rights → Modern schooling', type: 'transition',
    summary: 'Strong color and teal persist while analog poster texture cools into campus systems and early digital structure.',
    transition: {
      fromLabel: 'Civil Rights era', toLabel: 'Modern schooling era', from: ['movement print', 'community', 'public action'],
      to: ['campus systems', 'digital', 'institutional networks'],
      note: 'Teal and public graphic confidence carry forward while geometric branding, laminate, and early interface structure emerge.',
    },
  },
  {
    id: 'modern-schooling-design-sample', eraId: 'modern-schooling', timelineLabel: 'Modern schooling', eyebrow: 'Design-flow sample · Campus',
    title: 'Modern Universities and School Systems', dateLabel: '1980–present / Modern schooling era', type: 'design-sample',
    moduleId: 'modern-schooling-era', moduleTitle: 'Modern schooling design sample',
    summary: 'This fixture uses a blurred and faded ivy-covered brick wall with a neutral chalkboard card.',
    sample: designSample({
      id: 'modern-framing-sample', label: 'Modern schooling era', variant: 'framing',
      pageAsset: '/virtual-museum/assets/themes/textures/modern-schooling/page-ivy-brick.webp',
      pageTreatment: 'photographic-soft', cardAsset: '/virtual-museum/assets/themes/textures/modern-schooling/card-clean-chalkboard.webp',
      cardTreatment: 'dark-texture', sourceTitle: 'Campus-system framing treatment',
      sourceText: 'Brick, ivy, and chalkboard material locate the section in institutional spaces without presenting the photograph as evidence.',
      caption: 'The photographic field is blurred, faded, and covered by a strong palette wash.',
      response: 'A private response remains legible inside the modern institutional treatment.',
    }),
  },
  {
    id: 'modern-schooling-source-sample', eraId: 'modern-schooling', timelineLabel: 'Modern source', eyebrow: 'Design-flow sample · Library',
    title: 'Modern Schooling Library and Document Study', dateLabel: '1980–present / Modern schooling era', type: 'design-sample',
    moduleId: 'modern-schooling-era', moduleTitle: 'Modern schooling design sample',
    summary: 'This fixture uses an already blurred library field and a bounded brick information card.',
    sample: designSample({
      id: 'modern-source-sample', label: 'Modern schooling era', variant: 'source',
      pageAsset: '/virtual-museum/assets/themes/textures/modern-schooling/page-library.webp',
      pageTreatment: 'photographic-soft', cardAsset: '/virtual-museum/assets/themes/textures/modern-schooling/card-wide-brick.webp',
      cardTreatment: 'photo-texture', sourceTitle: 'Institutional document or digital source',
      sourceText: 'Library shelving creates ambient educational context while the brick card remains a bounded architectural layer.',
      caption: 'Both photographs are visibly subordinate to text through blur, fade, crop, and solid insets.',
      response: 'Keep source metadata and interface simulation visibly distinct.',
    }),
  },
  {
    id: 'modern-schooling-interaction-sample', eraId: 'modern-schooling', timelineLabel: 'Modern activity', eyebrow: 'Design-flow sample · Athletics',
    title: 'Modern Schooling Athletics and Control Study', dateLabel: '1980–present / Modern schooling era', type: 'design-sample',
    moduleId: 'modern-schooling-era', moduleTitle: 'Modern schooling design sample',
    summary: 'This fixture uses a faded stadium field and a worn chalkboard card to test another institutional setting.',
    sample: designSample({
      id: 'modern-interaction-sample', label: 'Modern schooling era', variant: 'interaction',
      pageAsset: '/virtual-museum/assets/themes/textures/modern-schooling/page-stadium.webp',
      pageTreatment: 'photographic-soft', cardAsset: '/virtual-museum/assets/themes/textures/modern-schooling/card-worn-chalkboard.webp',
      cardTreatment: 'dark-texture', sourceTitle: 'Interactive-state treatment',
      sourceText: 'Athletic infrastructure broadens the institutional atmosphere while the chalkboard anchors the interaction card.',
      caption: 'The background is softened enough to read as setting rather than lesson media.',
      response: 'Test dense activity instructions, saved state, and notebook return paths here.',
    }),
  },
  {
    id: 'course-conclusion', eraId: 'conclusion', timelineLabel: 'Conclusion', eyebrow: 'Course-wide synthesis sample',
    title: 'Looking Back and Facing the Present', dateLabel: 'Course-neutral / Conclusion', type: 'design-sample',
    moduleId: 'conclusion', moduleTitle: 'Course conclusion design sample',
    summary: 'The conclusion echoes the introduction while allowing restrained traces of the historical design systems without implying finality.',
    sample: designSample({
      id: 'conclusion-sample', label: 'Conclusion', variant: 'framing',
      sourceTitle: 'Course-wide reflection',
      sourceText: 'A neutral scholarly frame can reconnect the course’s eras, learner records, and unresolved questions.',
      caption: 'Closing media, acknowledgments, and credits can appear here.',
      response: 'A final private reflection remains part of the learner’s own field notebook.',
    }),
  },
]

export const timelineSegments = [
  { id: 'introduction', label: 'Introduction', stopId: 'course-introduction' },
  { id: 'early-america', label: 'Colonial', stopId: 'early-america-introduction' },
  { id: 'common-school', label: 'Victorian', stopId: 'common-school-landing' },
  { id: 'jim-crow', label: 'Jim Crow', stopId: 'jim-crow-design-sample' },
  { id: 'world-wars', label: 'World Wars', stopId: 'world-wars-design-sample' },
  { id: 'civil-rights', label: 'Civil Rights', stopId: 'civil-rights-design-sample' },
  { id: 'modern-schooling', label: 'Modern', stopId: 'modern-schooling-design-sample' },
  { id: 'conclusion', label: 'Conclusion', stopId: 'course-conclusion' },
]

export const courseArtifacts = sampleArtifacts

export const placeholderResources = [
  { id: 'book', moduleId: 'early-america', moduleTitle: 'Early America', type: 'Book', title: 'Placeholder monograph', creator: 'Author to be selected', access: 'Library or purchase', note: 'A brief annotation from Georga will explain why this resource extends the module.' },
  { id: 'article', moduleId: 'early-america', moduleTitle: 'Early America', type: 'Article', title: 'Placeholder scholarly or public-history article', creator: 'Author to be selected', access: 'Open or library access', note: 'This slot tests citation, access notes, and external-link treatment.' },
  { id: 'video', moduleId: 'early-america', moduleTitle: 'Early America', type: 'Video', title: 'Placeholder lecture or documentary', creator: 'Creator to be selected', access: 'External video platform', note: 'The final card can show runtime, captions, and a disclosure that the link leaves the course site.' },
  { id: 'archive', moduleId: 'early-america', moduleTitle: 'Early America', type: 'Digital collection', title: 'Placeholder archive or digital project', creator: 'Institution to be selected', access: 'Open web resource', note: 'This slot can direct students toward further independent primary-source exploration.' },
]
