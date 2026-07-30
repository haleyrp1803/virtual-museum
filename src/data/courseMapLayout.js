/**
 * Course Map layout contract.
 *
 * This file owns only the visual coordinates and SVG connector geometry for
 * the Field Notebook's curving Course Map. Every node ID and segment endpoint
 * must match an ID in `courseStops`; `validateCourseData.js` enforces that
 * connection during development. Keeping geometry separate prevents the large
 * Notebook component from becoming a second source of truth for course order.
 */

export const COURSE_MAP_NODES = [
  { id: 'course-introduction', label: 'Introduction', module: 'Course orientation', x: 22, y: 7 },
  { id: 'early-america-introduction', label: 'Early America', module: 'Module 1', x: 68, y: 22 },
  { id: 'early-america-text', label: 'Primary source', module: 'Early America', x: 33, y: 35, minor: true },
  { id: 'early-america-image', label: 'Close looking', module: 'Early America', x: 68, y: 44, minor: true },
  { id: 'early-america-media', label: 'Guided media', module: 'Early America', x: 31, y: 53, minor: true },
  { id: 'early-america-activity', label: 'Private response', module: 'Early America', x: 69, y: 62, minor: true },
  { id: 'early-america-synthesis', label: 'Synthesis', module: 'Early America', x: 35, y: 70, minor: true },
  { id: 'early-america-resources', label: 'Further Study', module: 'Early America', x: 70, y: 78 },
  { id: 'common-school-transition', label: 'Transition', module: 'Historical transition', x: 35, y: 87 },
  { id: 'common-school-landing', label: 'Common School', module: 'Module 2', x: 69, y: 95 },
]

// Each segment is rendered as one complete connector. The UI switches the
// entire path between dotted and solid states; partial-path progress rendering
// was intentionally rejected because it produced misleading fragments.
export const COURSE_MAP_SEGMENTS = [
  { from: 'course-introduction', to: 'early-america-introduction', d: 'M22 7 C82 11,82 20,68 22' },
  { from: 'early-america-introduction', to: 'early-america-text', d: 'M68 22 C58 26,18 30,33 35' },
  { from: 'early-america-text', to: 'early-america-image', d: 'M33 35 C49 37,82 39,68 44' },
  { from: 'early-america-image', to: 'early-america-media', d: 'M68 44 C54 47,15 49,31 53' },
  { from: 'early-america-media', to: 'early-america-activity', d: 'M31 53 C48 55,83 57,69 62' },
  { from: 'early-america-activity', to: 'early-america-synthesis', d: 'M69 62 C54 64,20 66,35 70' },
  { from: 'early-america-synthesis', to: 'early-america-resources', d: 'M35 70 C50 72,82 73,70 78' },
  { from: 'early-america-resources', to: 'common-school-transition', d: 'M70 78 C55 80,18 82,35 87' },
  { from: 'common-school-transition', to: 'common-school-landing', d: 'M35 87 C52 89,82 91,69 95' },
]
