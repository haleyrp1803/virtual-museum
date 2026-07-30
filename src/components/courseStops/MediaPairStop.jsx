/** Paired-media stop. Each artifact keeps its own note and bookmark context. */
import ArtifactMedia from '../ArtifactMedia.jsx'
import KeyTerm from '../KeyTerm.jsx'
import { getGlossaryTerm } from '../../data/glossary.js'

export default function MediaPairStop({ artifacts, isBookmarked, onMarkViewed, onOpenNotes, onToggleBookmark, onSelectGlossaryTerm }) {
  return (
    <div className="media-pair">
      {artifacts.map((artifact) => (
        <article key={artifact.id} className="media-pair-card" onMouseEnter={() => onMarkViewed(artifact)}>
          <ArtifactMedia artifact={artifact} />
          <h2>{artifact.title}</h2>
          <p>{artifact.description}</p>
          {artifact.id === 'family-audio-01' && <p>The final lesson can identify this source as an <KeyTerm term={getGlossaryTerm('oral-history')} onSelect={onSelectGlossaryTerm} /> and ask students to define the form in their own words.</p>}
          <div className="source-actions">
            <button type="button" onClick={() => { onMarkViewed(artifact); onOpenNotes(artifact) }}>Take notes</button>
            <button type="button" aria-pressed={isBookmarked(artifact.id)} onClick={() => onToggleBookmark(artifact)}>{isBookmarked(artifact.id) ? 'Bookmarked' : 'Bookmark'}</button>
          </div>
        </article>
      ))}
    </div>
  )
}
