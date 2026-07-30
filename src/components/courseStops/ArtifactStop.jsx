/** Single-artifact stop. Workspace mutations are supplied by App.jsx. */
import ArtifactMedia from '../ArtifactMedia.jsx'
import KeyTerm from '../KeyTerm.jsx'
import { getGlossaryTerm } from '../../data/glossary.js'

export default function ArtifactStop({ artifact, bookmarked, onMarkViewed, onOpenNotes, onToggleBookmark, onSelectGlossaryTerm }) {
  if (!artifact) return null

  return (
    <div className="source-stop-layout">
      <div className="source-stage" onMouseEnter={() => onMarkViewed(artifact)}><ArtifactMedia artifact={artifact} /></div>
      <aside className="source-guidance">
        <p className="eyebrow">Professor guidance</p>
        <h2>{artifact.title}</h2>
        <p>{artifact.description}</p>
        {artifact.id === 'family-text-01'
          ? <p>This <KeyTerm term={getGlossaryTerm('primary-source')} onSelect={onSelectGlossaryTerm} /> invites <KeyTerm term={getGlossaryTerm('close-reading')} onSelect={onSelectGlossaryTerm} /> before Georga directs attention to its historical significance.</p>
          : <p>This placeholder indicates where Georga can direct attention without replacing the student’s own encounter with the source.</p>}
        <div className="source-actions">
          <button type="button" onClick={() => { onMarkViewed(artifact); onOpenNotes(artifact) }}>Annotate in notebook</button>
          <button type="button" aria-pressed={bookmarked} onClick={() => onToggleBookmark(artifact)}>{bookmarked ? 'Bookmarked' : 'Bookmark source'}</button>
        </div>
      </aside>
    </div>
  )
}
