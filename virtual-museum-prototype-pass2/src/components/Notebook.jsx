import { useEffect, useRef, useState } from 'react'

export default function Notebook({
  mode,
  onModeChange,
  context,
  notes,
  storageStatus,
  storageMessage,
  onAddNote,
  onDeleteNote,
  onExport,
  onDeleteAll,
}) {
  const [draft, setDraft] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const fullScreenRef = useRef(null)

  useEffect(() => {
    if (mode === 'full') fullScreenRef.current?.focus()
  }, [mode])

  const saveDraft = () => {
    const saved = onAddNote({
      text: draft,
      artifactId: context?.artifactId,
      artifactTitle: context?.artifactTitle,
      moduleId: context?.moduleId,
      moduleTitle: context?.moduleTitle,
    })
    if (saved) setDraft('')
  }

  const handleDeleteAll = async () => {
    const deleted = await onDeleteAll()
    if (deleted) {
      setConfirmDelete(false)
      onModeChange('minimized')
    }
  }

  if (mode === 'minimized') {
    return (
      <button className="notebook-launcher" type="button" onClick={() => onModeChange('side')} aria-label={`Open field notebook. ${notes.length} notes saved.`}>
        <span aria-hidden="true">▤</span>
        <span>Notebook</span>
        {notes.length > 0 && <span className="note-count">{notes.length}</span>}
      </button>
    )
  }

  const content = (
    <>
      <header className="notebook-header">
        <div>
          <p className="eyebrow">Private workspace</p>
          <h2>Field Notebook</h2>
        </div>
        <div className="notebook-header-actions">
          {mode === 'side' && <button type="button" onClick={() => onModeChange('full')}>Full screen</button>}
          {mode === 'full' && <button type="button" onClick={() => onModeChange('side')}>Side panel</button>}
          <button type="button" onClick={() => onModeChange('minimized')}>Minimize</button>
        </div>
      </header>

      <div className={`notebook-storage-line storage-${storageStatus}`} aria-live="polite">
        <span aria-hidden="true">●</span>
        <span>{storageMessage}</span>
      </div>

      <div className="notebook-composer">
        <label htmlFor="notebook-draft">
          {context?.artifactTitle ? `Note about “${context.artifactTitle}”` : 'General observation'}
        </label>
        <textarea
          id="notebook-draft"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Record what you notice, question, or want to remember."
          rows="5"
        />
        <button className="primary-button" type="button" onClick={saveDraft} disabled={!draft.trim() || storageStatus === 'loading'}>
          Save note
        </button>
      </div>

      <div className="notebook-notes" aria-live="polite">
        <div className="section-heading-row">
          <h3>Saved notes</h3>
          <span>{notes.length}</span>
        </div>
        {notes.length === 0 ? (
          <p className="empty-state">Your saved observations will appear here.</p>
        ) : (
          <ol>
            {[...notes].reverse().map((note) => (
              <li key={note.id}>
                <p className="note-source">{note.artifactTitle || note.moduleTitle || 'General observation'}</p>
                <p>{note.text}</p>
                <button className="text-button" type="button" onClick={() => onDeleteNote(note.id)}>Delete</button>
              </li>
            ))}
          </ol>
        )}
      </div>

      <footer className="notebook-footer">
        <button type="button" onClick={onExport}>Export Markdown</button>
        {!confirmDelete ? (
          <button className="danger-button" type="button" onClick={() => setConfirmDelete(true)}>Delete all local data</button>
        ) : (
          <div className="delete-confirmation" role="group" aria-label="Confirm deletion of all local data">
            <strong>Delete every saved note and reset consent?</strong>
            <button className="danger-button" type="button" onClick={handleDeleteAll}>Yes, delete everything</button>
            <button type="button" onClick={() => setConfirmDelete(false)}>Cancel</button>
          </div>
        )}
      </footer>
    </>
  )

  if (mode === 'full') {
    return (
      <div className="notebook-full-backdrop">
        <section className="notebook notebook-full" role="dialog" aria-modal="true" aria-label="Full-screen field notebook" tabIndex="-1" ref={fullScreenRef}>
          {content}
        </section>
      </div>
    )
  }

  return <aside className="notebook notebook-side" aria-label="Field notebook side panel">{content}</aside>
}
