/**
 * Fixed course glossary catalog.
 *
 * Each term has a stable ID and a lesson-location backlink. Learner definitions
 * are stored separately in the workspace so this file remains curricular data,
 * not learner state.
 */

export const glossaryTerms = [
  {
    id: 'household-education',
    term: 'household education',
    moduleId: 'early-america',
    moduleTitle: 'Early America',
    locationStopId: 'early-america-introduction',
    locationLabel: 'Module 1 orientation: Learning Before Mass Schooling',
  },
  {
    id: 'primary-source',
    term: 'primary source',
    moduleId: 'early-america',
    moduleTitle: 'Early America',
    locationStopId: 'early-america-text',
    locationLabel: 'Source stop 1: Read a Primary Source',
  },
  {
    id: 'close-reading',
    term: 'close reading',
    moduleId: 'early-america',
    moduleTitle: 'Early America',
    locationStopId: 'early-america-text',
    locationLabel: 'Source stop 1: Read a Primary Source',
  },
  {
    id: 'oral-history',
    term: 'oral history',
    moduleId: 'early-america',
    moduleTitle: 'Early America',
    locationStopId: 'early-america-media',
    locationLabel: 'Guided media: Listen, Watch, and Annotate',
  },
  {
    id: 'historical-context',
    term: 'historical context',
    moduleId: 'early-america',
    moduleTitle: 'Early America',
    locationStopId: 'early-america-synthesis',
    locationLabel: 'Module 1 synthesis: Gather the Module Together',
  },
  {
    id: 'common-school',
    term: 'common school',
    moduleId: 'common-school',
    moduleTitle: 'Common School',
    locationStopId: 'common-school-landing',
    locationLabel: 'Module 2 landing: The Common School',
  },
  {
    id: 'standardization',
    term: 'standardization',
    moduleId: 'common-school',
    moduleTitle: 'Common School',
    locationStopId: 'common-school-transition',
    locationLabel: 'Historical transition: From Household Learning to Institutional Schooling',
  },
  {
    id: 'public-schooling',
    term: 'public schooling',
    moduleId: 'common-school',
    moduleTitle: 'Common School',
    locationStopId: 'common-school-landing',
    locationLabel: 'Module 2 landing: The Common School',
  },
]

export function getGlossaryTerm(termId) {
  return glossaryTerms.find((item) => item.id === termId) ?? null
}
