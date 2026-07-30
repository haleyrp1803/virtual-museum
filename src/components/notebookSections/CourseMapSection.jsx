/**
 * Field Notebook Course Map page.
 *
 * Wraps the reusable CourseMap renderer with notebook-specific headings and
 * docking behavior. CourseMap.jsx remains responsible for SVG rendering;
 * courseMapLayout.js remains responsible for geometry.
 */
import CourseMap from '../CourseMap.jsx'

export default function CourseMapSection({
  courseStops,
  currentStopId,
  progress,
  onNavigateToStop,
}) {
  return (
    <div className="fieldbook-section-body course-map-section">
      <p className="eyebrow">Course orientation</p>
      <h3>Your route through the course</h3>
      <CourseMap courseStops={courseStops} currentStopId={currentStopId} progress={progress} onNavigateToStop={onNavigateToStop} />
    </div>
  )
}
