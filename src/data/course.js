/**
 * Authoritative horizontal-course sequence and course-level catalogs.
 *
 * `courseStops` defines navigable order and stable stop IDs; timeline segments
 * point into that sequence; artifact and Further Study catalogs are exposed to
 * App and the Field Notebook. Cross-file references are checked by
 * `validateCourseData.js` during development.
 */

import { sampleArtifacts } from './modules.js'

const designSample = (id, label, sourceTitle, sourceText, caption, response) => ({
  id,
  label,
  sourceTitle,
  sourceText,
  caption,
  response,
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
    id: 'common-school-landing', eraId: 'common-school', timelineLabel: 'Victorian era', eyebrow: 'Design-flow sample',
    title: 'Pre–Civil War Schooling', dateLabel: 'Pre–Civil War 19th century / Victorian era', type: 'design-sample',
    moduleId: 'victorian-era', moduleTitle: 'Victorian era design sample',
    summary: 'This generic stop tests the industrial, agricultural, textile, and institutional visual system without asserting final historical content.',
    sample: designSample('victorian-sample', 'Victorian era', 'Document or artifact title', 'Industrial metal and rust meet cotton textiles, agricultural greens, wood type, and increasing institutional order.', 'Caption, provenance, and rights information.', 'A private response remains legible inside the Victorian treatment.'),
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
    id: 'jim-crow-design-sample', eraId: 'jim-crow', timelineLabel: 'Jim Crow era', eyebrow: 'Design-flow sample',
    title: 'Post–Civil War Schooling', dateLabel: 'Post–Civil War 19th century / Jim Crow era', type: 'design-sample',
    moduleId: 'jim-crow-era', moduleTitle: 'Jim Crow era design sample',
    summary: 'This generic stop tests stark division and institutional hierarchy without reducing racial oppression to decorative spectacle.',
    sample: designSample('jim-crow-sample', 'Jim Crow era', 'Document or artifact title', 'Restricted greyscale, cold paper, hard rules, and unequal compartments make imposed division legible.', 'Caption, provenance, and rights information.', 'A private response remains legible inside the divided institutional treatment.'),
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
    id: 'world-wars-design-sample', eraId: 'world-wars', timelineLabel: 'World Wars era', eyebrow: 'Design-flow sample',
    title: 'Schooling and the Home Front', dateLabel: 'Early 20th century / World Wars era', type: 'design-sample',
    moduleId: 'world-wars-era', moduleTitle: 'World Wars era design sample',
    summary: 'This generic stop tests faded civic poster color, victory-garden materials, and public-information structure.',
    sample: designSample('world-wars-sample', 'World Wars era', 'Document or artifact title', 'Faded blue, Rosie red, cream, garden green, and stamped poster structure evoke practical mobilization.', 'Caption, provenance, and rights information.', 'A private response remains legible inside the faded civic-print treatment.'),
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
    id: 'civil-rights-design-sample', eraId: 'civil-rights', timelineLabel: 'Civil Rights era', eyebrow: 'Design-flow sample',
    title: 'Education, Reform, and Public Action', dateLabel: '1960s–1970s / Civil Rights era', type: 'design-sample',
    moduleId: 'civil-rights-era', moduleTitle: 'Civil Rights era design sample',
    summary: 'This generic stop tests bold movement color and public graphic energy without implying inevitable or uncomplicated progress.',
    sample: designSample('civil-rights-sample', 'Civil Rights era', 'Document or artifact title', 'Orange, teal, mustard, indigo, and magenta support movement print, community organizing, and public address.', 'Caption, provenance, and rights information.', 'A private response remains legible inside the vivid movement-print treatment.'),
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
    id: 'modern-schooling-design-sample', eraId: 'modern-schooling', timelineLabel: 'Modern schooling', eyebrow: 'Design-flow sample',
    title: 'Modern Universities and School Systems', dateLabel: '1980–present / Modern schooling era', type: 'design-sample',
    moduleId: 'modern-schooling-era', moduleTitle: 'Modern schooling design sample',
    summary: 'This generic stop tests campus wayfinding, educational technology, institutional branding, and restrained 1980s–1990s forms.',
    sample: designSample('modern-schooling-sample', 'Modern schooling era', 'Document or artifact title', 'Campus teal, university purple, computer beige, laminate, and geometric systems establish a late twentieth-century educational setting.', 'Caption, provenance, and rights information.', 'A private response remains legible inside the modern institutional treatment.'),
  },
  {
    id: 'course-conclusion', eraId: 'conclusion', timelineLabel: 'Conclusion', eyebrow: 'Course-wide synthesis sample',
    title: 'Looking Back and Facing the Present', dateLabel: 'Course-neutral / Conclusion', type: 'design-sample',
    moduleId: 'conclusion', moduleTitle: 'Course conclusion design sample',
    summary: 'The conclusion echoes the introduction while allowing restrained traces of the historical design systems without implying finality.',
    sample: designSample('conclusion-sample', 'Conclusion', 'Course-wide reflection', 'A neutral scholarly frame can reconnect the course’s eras, learner records, and unresolved questions.', 'Closing media, acknowledgments, and credits can appear here.', 'A final private reflection remains part of the learner’s own field notebook.'),
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
