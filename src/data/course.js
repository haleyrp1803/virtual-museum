/**
 * Authoritative horizontal-course sequence and course-level catalogs.
 *
 * `courseStops` defines navigable order and stable stop IDs; timeline segments
 * point into that sequence; artifact and Further Study catalogs are exposed to
 * App and the Field Notebook. Cross-file references are checked by
 * `validateCourseData.js` during development.
 */

import { sampleArtifacts } from './modules.js'

export const courseStops = [
  {
    id: 'course-introduction',
    eraId: 'introduction',
    timelineLabel: 'Introduction',
    eyebrow: 'Course orientation',
    title: 'Welcome to the History of Education',
    dateLabel: 'Begin here',
    type: 'introduction',
    summary: 'Meet your professor, learn how the course moves through time, and try each navigation method before beginning.',
  },
  {
    id: 'early-america-introduction',
    eraId: 'early-america',
    timelineLabel: 'Early America',
    eyebrow: 'Module 1 · Orientation',
    title: 'Learning Before Mass Schooling',
    dateLabel: 'Early America',
    type: 'era-intro',
    summary: 'A visual and contextual threshold into the first historical cluster. Final framing and dates will be supplied by Georga.',
  },
  {
    id: 'early-america-text',
    eraId: 'early-america',
    timelineLabel: 'Primary source',
    eyebrow: 'Module 1 · Source stop 1',
    title: 'Read a Primary Source',
    dateLabel: 'Early America',
    type: 'artifact',
    artifactId: 'family-text-01',
  },
  {
    id: 'early-america-image',
    eraId: 'early-america',
    timelineLabel: 'Close looking',
    eyebrow: 'Module 1 · Source stop 2',
    title: 'Look Closely',
    dateLabel: 'Early America',
    type: 'artifact',
    artifactId: 'family-image-01',
  },
  {
    id: 'early-america-media',
    eraId: 'early-america',
    timelineLabel: 'Professor guidance',
    eyebrow: 'Module 1 · Guided media',
    title: 'Listen, Watch, and Annotate',
    dateLabel: 'Early America',
    type: 'media-pair',
    artifactIds: ['family-audio-01', 'family-video-01'],
  },
  {
    id: 'early-america-activity',
    eraId: 'early-america',
    timelineLabel: 'Learning activity',
    eyebrow: 'Module 1 · Private response',
    title: 'Pause and Respond',
    dateLabel: 'Early America',
    type: 'activity',
    summary: 'A placeholder written activity tests saving, revising, and exporting work without requiring finalized course content.',
  },
  {
    id: 'early-america-synthesis',
    eraId: 'early-america',
    timelineLabel: 'Synthesis',
    eyebrow: 'Module 1 · Closing perspective',
    title: 'Gather the Module Together',
    dateLabel: 'Early America',
    type: 'synthesis',
    summary: 'Georga’s concluding commentary will reconnect the sources, name unresolved questions, and prepare students for optional further study.',
  },
  {
    id: 'early-america-resources',
    eraId: 'resources',
    timelineLabel: 'Further study',
    eyebrow: 'Module 1 · Continue learning',
    title: 'Homework, Further Reading, and Resources',
    dateLabel: 'Beyond the course page',
    type: 'resources',
    summary: 'A clearly bounded departure table for books, articles, videos, podcasts, archives, and other external resources selected by Georga.',
  },
  {
    id: 'common-school-transition',
    eraId: 'transition',
    timelineLabel: 'Transition',
    eyebrow: 'Historical transition',
    title: 'From Household Learning to Institutional Schooling',
    dateLabel: 'Moving into the nineteenth century',
    type: 'transition',
    summary: 'The design gradually shifts from intimate paper and domestic materials toward printed forms, regular grids, slate, and institutional order.',
  },
  {
    id: 'common-school-landing',
    eraId: 'common-school',
    timelineLabel: 'Common School',
    eyebrow: 'Module 2 · Landing',
    title: 'The Common School',
    dateLabel: 'Nineteenth century',
    type: 'next-era',
    summary: 'This landing confirms that the student has crossed into a new historical and visual cluster. The rest of Module 2 remains outside this vertical slice.',
  },
]

export const timelineSegments = [
  { id: 'introduction', label: 'Introduction', stopId: 'course-introduction' },
  { id: 'early-america', label: 'Early America', stopId: 'early-america-introduction' },
  { id: 'resources', label: 'Further Study', stopId: 'early-america-resources' },
  { id: 'transition', label: 'Transition', stopId: 'common-school-transition' },
  { id: 'common-school', label: 'Common School', stopId: 'common-school-landing' },
  { id: 'twentieth-century', label: '20th Century', disabled: true },
  { id: 'civil-rights', label: 'Civil Rights+', disabled: true },
  { id: 'conclusion', label: 'Conclusion', disabled: true },
]

export const courseArtifacts = sampleArtifacts

export const placeholderResources = [
  { id: 'book', moduleId: 'early-america', moduleTitle: 'Early America', type: 'Book', title: 'Placeholder monograph', creator: 'Author to be selected', access: 'Library or purchase', note: 'A brief annotation from Georga will explain why this resource extends the module.' },
  { id: 'article', moduleId: 'early-america', moduleTitle: 'Early America', type: 'Article', title: 'Placeholder scholarly or public-history article', creator: 'Author to be selected', access: 'Open or library access', note: 'This slot tests citation, access notes, and external-link treatment.' },
  { id: 'video', moduleId: 'early-america', moduleTitle: 'Early America', type: 'Video', title: 'Placeholder lecture or documentary', creator: 'Creator to be selected', access: 'External video platform', note: 'The final card can show runtime, captions, and a disclosure that the link leaves the course site.' },
  { id: 'archive', moduleId: 'early-america', moduleTitle: 'Early America', type: 'Digital collection', title: 'Placeholder archive or digital project', creator: 'Institution to be selected', access: 'Open web resource', note: 'This slot can direct students toward further independent primary-source exploration.' },
]
