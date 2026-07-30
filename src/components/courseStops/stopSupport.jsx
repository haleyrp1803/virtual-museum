/**
 * Shared presentational building blocks for course-stop renderers.
 *
 * These components contain no course navigation or learner-state logic. They
 * are kept here because multiple stop types use the same placeholder media or
 * resource-card presentation. `CourseStop.jsx` and its renderers supply all
 * callbacks, which remain owned by `App.jsx` and the workspace hook.
 */

export function PlaceholderVideo({ label = 'Georga’s course welcome video' }) {
  return (
    <div className="placeholder-video" role="group" aria-label={`${label} placeholder`}>
      <div className="placeholder-video-screen">
        <span className="play-symbol" aria-hidden="true">▶</span>
        <strong>{label}</strong>
        <small>Video, captions, transcript, and playback controls will appear here.</small>
      </div>
      <details>
        <summary>Read placeholder transcript</summary>
        <p>This transcript area demonstrates how Georga’s complete spoken orientation will remain available independently of video playback.</p>
      </details>
    </div>
  )
}

export function NavigationTutorial() {
  return (
    <div className="navigation-tutorial" aria-labelledby="navigation-tutorial-title">
      <h3 id="navigation-tutorial-title">Move through the course in the way that works for you</h3>
      <ul>
        <li><kbd>Mouse wheel</kbd> or trackpad</li>
        <li><kbd>←</kbd> and <kbd>→</kbd> arrow keys</li>
        <li>Previous and Next buttons</li>
        <li>Clickable timeline segments</li>
      </ul>
      <p>No essential action requires dragging. Reduced-motion settings replace animated travel with direct movement.</p>
    </div>
  )
}

export function ResourceCard({ resource, saved, onToggleSave }) {
  return (
    <article className="resource-card">
      <p className="resource-type">{resource.type}</p>
      <h3>{resource.title}</h3>
      <p className="resource-creator">{resource.creator}</p>
      <p>{resource.note}</p>
      <p className="resource-access"><strong>Access:</strong> {resource.access}</p>
      <div className="resource-card-actions">
        <button type="button" onClick={() => window.alert('Prototype only: final resources will open in a new tab with a clear external-site notice.')}>Test external resource</button>
        <button type="button" aria-pressed={saved} onClick={() => onToggleSave(resource)}>{saved ? 'Saved to fieldbook' : 'Save to fieldbook'}</button>
      </div>
    </article>
  )
}
