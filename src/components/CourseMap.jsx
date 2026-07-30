/**
 * Field Notebook Course Map renderer.
 *
 * This component converts the authoritative `courseStops` order plus the
 * learner's current stop into current/visited/unvisited visual states. Static
 * coordinates and connector paths live in `data/courseMapLayout.js`; learner
 * progress remains supplied by the workspace rather than stored here.
 */

import { COURSE_MAP_NODES, COURSE_MAP_SEGMENTS } from '../data/courseMapLayout.js'

export default function CourseMap({ courseStops, currentStopId, progress, onNavigateToStop }) {
  const currentIndex = Math.max(0, courseStops.findIndex((stop) => stop.id === currentStopId))
  const stopIndex = new Map(courseStops.map((stop, index) => [stop.id, index]))
  const earlyProgress = progress?.['early-america'] || { artifactsViewed: [], activitiesAttempted: [] }

  const nodeState = (node) => {
    const index = stopIndex.get(node.id)
    if (node.id === currentStopId) return 'current'
    if (index !== undefined && index < currentIndex) return 'visited'
    return 'unvisited'
  }

  const segmentState = (segment) => {
    const toIndex = stopIndex.get(segment.to)
    return toIndex !== undefined && toIndex <= currentIndex ? 'visited' : 'unvisited'
  }

  return (
    <div className="course-map-layout">
      <div className="course-map-legend" aria-label="Course map states">
        <span><i className="map-key current" /> Current</span>
        <span><i className="map-key visited" /> Visited</span>
        <span><i className="map-key unvisited" /> Not visited</span>
      </div>
      <div className="curved-course-map" aria-label="Curving chronological course map">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {COURSE_MAP_SEGMENTS.map((segment) => (
            <path
              key={`${segment.from}-${segment.to}`}
              className={`course-map-segment state-${segmentState(segment)}`}
              d={segment.d}
            />
          ))}
        </svg>
        {COURSE_MAP_NODES.map((node) => {
          const state = nodeState(node)
          return (
            <button
              key={node.id}
              type="button"
              className={`course-map-node ${node.minor ? 'minor' : 'major'} state-${state}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              aria-current={state === 'current' ? 'step' : undefined}
              onClick={() => onNavigateToStop(node.id)}
            >
              <span className="course-map-node-mark" aria-hidden="true">{state === 'visited' ? '✓' : state === 'current' ? '●' : '○'}</span>
              <span className="course-map-node-copy"><strong>{node.label}</strong><small>{node.module}</small></span>
            </button>
          )
        })}
      </div>
      <section className="course-map-summary" aria-label="Current course progress summary">
        <h4>Early America</h4>
        <p>{earlyProgress.artifactsViewed?.length || 0} sources explored · {earlyProgress.activitiesAttempted?.length || 0} activities attempted</p>
        <p>The map records where you have been without turning the course into a completion score.</p>
      </section>
    </div>
  )
}
