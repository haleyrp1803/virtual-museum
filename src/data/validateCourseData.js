/**
 * Development-time integrity checks for the course data graph.
 *
 * Course stops, artifacts, glossary locations, timeline buttons, and Course
 * Map geometry are maintained in separate files but connected by stable IDs.
 * This validator reports broken or duplicate references immediately during
 * local development instead of allowing silent navigation failures in the UI.
 * It does not modify data and is intentionally excluded from production runs.
 */

import { courseArtifacts, courseStops, placeholderResources, timelineSegments } from './course.js'
import { glossaryTerms } from './glossary.js'
import { sampleActivities } from './modules.js'
import { COURSE_MAP_NODES, COURSE_MAP_SEGMENTS } from './courseMapLayout.js'
import { ERA_THEMES } from './eraThemes.js'

function collectDuplicateIds(items, label, issues) {
  const seen = new Set()
  for (const item of items) {
    if (!item?.id) {
      issues.push(`${label} contains an entry without an id.`)
      continue
    }
    if (seen.has(item.id)) issues.push(`${label} contains duplicate id "${item.id}".`)
    seen.add(item.id)
  }
  return seen
}

function requireReference(ids, value, description, issues) {
  if (value && !ids.has(value)) issues.push(`${description} references missing id "${value}".`)
}

export function validateCourseData() {
  const issues = []
  const stopIds = collectDuplicateIds(courseStops, 'courseStops', issues)
  const eraThemeIds = collectDuplicateIds(ERA_THEMES, 'ERA_THEMES', issues)
  const artifactIds = collectDuplicateIds(courseArtifacts, 'courseArtifacts', issues)
  collectDuplicateIds(glossaryTerms, 'glossaryTerms', issues)
  collectDuplicateIds(placeholderResources, 'placeholderResources', issues)
  collectDuplicateIds(sampleActivities, 'sampleActivities', issues)
  const mapNodeIds = collectDuplicateIds(COURSE_MAP_NODES, 'COURSE_MAP_NODES', issues)

  for (const stop of courseStops) {
    requireReference(eraThemeIds, stop.eraId, `Course stop "${stop.id}" eraId`, issues)
    requireReference(artifactIds, stop.artifactId, `Course stop "${stop.id}"`, issues)
    for (const artifactId of stop.artifactIds ?? []) {
      requireReference(artifactIds, artifactId, `Course stop "${stop.id}"`, issues)
    }
  }

  for (const segment of timelineSegments) {
    if (!segment.disabled) requireReference(stopIds, segment.stopId, `Timeline segment "${segment.id}"`, issues)
  }

  for (const term of glossaryTerms) {
    requireReference(stopIds, term.locationStopId, `Glossary term "${term.id}"`, issues)
  }

  for (const node of COURSE_MAP_NODES) {
    requireReference(stopIds, node.id, `Course Map node "${node.id}"`, issues)
  }

  for (const segment of COURSE_MAP_SEGMENTS) {
    requireReference(mapNodeIds, segment.from, `Course Map segment ${segment.from} → ${segment.to}`, issues)
    requireReference(mapNodeIds, segment.to, `Course Map segment ${segment.from} → ${segment.to}`, issues)
  }

  if (COURSE_MAP_NODES.length !== courseStops.length) {
    issues.push(`Course Map has ${COURSE_MAP_NODES.length} nodes but courseStops has ${courseStops.length} stops.`)
  }

  return issues
}

export function assertValidCourseData() {
  const issues = validateCourseData()
  if (!issues.length) return

  const message = ['Course data validation failed:', ...issues.map((issue) => `- ${issue}`)].join('\n')
  throw new Error(message)
}
