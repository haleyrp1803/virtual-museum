import { useEffect, useMemo, useRef, useState } from 'react'

function contextLabel(note) {
  return note.artifactTitle || note.moduleTitle || 'General observation'
}

export default function Notebook({
  mode,
  onModeChange,
  context,
  notes,
  bookmarks,
  responses,
  quizAttempts,
  glossaryTerms,
  glossaryEntries,
  storageStatus,
  storageMessage,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onToggleBookmark,
  onNavigateToArtifact,
  onExport,
  onDeleteAll,
  onReconsiderStorage,
  onRetryStorage,
  onNavigateToStop,
  onSaveGlossaryEntry,
  onStartGlossaryStudy,
  requestedView,
}) {
  const [draft, setDraft] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [deleteCandidate, setDeleteCandidate] = useState(null)
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false)
  const [query, setQuery] = useState('')
  const [activeView, setActiveView] = useState('notes')
  const [expandedTermId, setExpandedTermId] = useState(null)
  const [glossaryEdit, setGlossaryEdit] = useState('')
  const fullScreenRef = useRef(null)

  useEffect(() => {
    if (mode === 'full') fullScreenRef.current?.focus()
  }, [mode])

  useEffect(() => {
    if (requestedView) setActiveView(requestedView)
  }, [requestedView])

  const currentArtifactBookmarked = Boolean(context?.artifactId && bookmarks.some((bookmark) => bookmark.artifactId === context.artifactId))
  const filteredNotes = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return [...notes].reverse()
    return [...notes].reverse().filter((note) => [note.text, note.artifactTitle, note.moduleTitle].filter(Boolean).some((value) => value.toLowerCase().includes(needle)))
  }, [notes, query])

  const groupedNotes = useMemo(() => {
    const groups = new Map()
    filteredNotes.forEach((note) => {
      const key = note.moduleTitle || 'General observations'
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key).push(note)
    })
    return [...groups.entries()]
  }, [filteredNotes])

  const groupedGlossaryTerms = useMemo(() => {
    const groups = new Map()
    ;[...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term)).forEach((term) => {
      if (!groups.has(term.moduleTitle)) groups.set(term.moduleTitle, [])
      groups.get(term.moduleTitle).push(term)
    })
    return [...groups.entries()]
  }, [glossaryTerms])

  const openGlossaryTerm = (term) => {
    const entry = glossaryEntries.find((item) => item.termId === term.id)
    if (!entry) {
      onNavigateToStop(term.locationStopId)
      onModeChange('side')
      return
    }
    const nextId = expandedTermId === term.id ? null : term.id
    setExpandedTermId(nextId)
    setGlossaryEdit(nextId ? entry.definition : '')
  }

  const saveGlossaryDefinition = (term) => {
    onSaveGlossaryEntry(term, glossaryEdit)
  }

  const saveDraft = () => {
    const saved = onAddNote({ text: draft, ...context })
    if (saved) setDraft('')
  }

  const startEditing = (note) => {
    setEditingId(note.id)
    setEditingText(note.text)
  }

  const saveEdit = () => {
    if (onUpdateNote(editingId, editingText)) {
      setEditingId(null)
      setEditingText('')
    }
  }

  const handleDeleteAll = async () => {
    const deleted = await onDeleteAll()
    if (deleted) {
      setConfirmDeleteAll(false)
      onModeChange('minimized')
    }
  }

  const navigateTo = (item) => {
    if (!item.artifactId) return
    onNavigateToArtifact(item)
    onModeChange('side')
  }

  if (mode === 'minimized') {
    return (
      <button className="notebook-launcher" type="button" onClick={() => onModeChange('side')} aria-label="Open field notebook">
        <span aria-hidden="true">▤</span><span>Notebook</span>
      </button>
    )
  }

  const renderNote = (note) => (
    <article className="notebook-entry" key={note.id}>
      <div className="notebook-entry-heading">
        <div>
          <p className="note-source">{contextLabel(note)}</p>
          {note.moduleTitle && <p className="note-module">{note.moduleTitle}</p>}
        </div>
        {note.artifactId && <button className="text-button" type="button" onClick={() => navigateTo(note)}>Return to artifact</button>}
      </div>
      {editingId === note.id ? (
        <div className="note-editor">
          <label className="sr-only" htmlFor={`edit-${note.id}`}>Edit note</label>
          <textarea id={`edit-${note.id}`} value={editingText} onChange={(event) => setEditingText(event.target.value)} rows="5" />
          <div className="inline-actions">
            <button className="primary-button" type="button" onClick={saveEdit} disabled={!editingText.trim()}>Save changes</button>
            <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <p className="note-text">{note.text}</p>
          <p className="note-date">{new Date(note.updatedAt).toLocaleString()}</p>
          <div className="inline-actions">
            <button type="button" onClick={() => startEditing(note)}>Edit</button>
            <button className="text-button danger-text" type="button" onClick={() => setDeleteCandidate(note.id)}>Delete</button>
          </div>
          {deleteCandidate === note.id && (
            <div className="entry-delete-confirmation" role="group" aria-label="Confirm note deletion">
              <span>Delete this note?</span>
              <button className="danger-button" type="button" onClick={() => { onDeleteNote(note.id); setDeleteCandidate(null) }}>Delete</button>
              <button type="button" onClick={() => setDeleteCandidate(null)}>Cancel</button>
            </div>
          )}
        </>
      )}
    </article>
  )

  const content = (
    <>
      <header className="notebook-header">
        <div><p className="eyebrow">Private workspace</p><h2>Field Notebook</h2></div>
        <div className="notebook-header-actions">
          {mode === 'side' && <button type="button" onClick={() => onModeChange('full')}>Full screen</button>}
          {mode === 'full' && <button type="button" onClick={() => onModeChange('side')}>Side panel</button>}
          <button type="button" onClick={() => onModeChange('minimized')}>Minimize</button>
        </div>
      </header>

      <div className={`notebook-storage-line storage-${storageStatus}`} aria-live="polite">
        <span aria-hidden="true">●</span>
        <span>{storageMessage}</span>
        <div className="notebook-storage-actions">
          {(storageStatus === 'error' || storageStatus === 'unavailable') && <button type="button" onClick={onRetryStorage}>Retry</button>}
          <button type="button" onClick={onReconsiderStorage}>Notebook storage choices</button>
        </div>
      </div>

      <div className="notebook-tabs notebook-tabs-four" role="tablist" aria-label="Notebook sections">
        <button type="button" role="tab" aria-selected={activeView === 'notes'} onClick={() => setActiveView('notes')}>Notes <span>{notes.length}</span></button>
        <button type="button" role="tab" aria-selected={activeView === 'glossary'} onClick={() => setActiveView('glossary')}>Glossary <span>{glossaryEntries.length}/{glossaryTerms.length}</span></button>
        <button type="button" role="tab" aria-selected={activeView === 'activities'} onClick={() => setActiveView('activities')}>Activities <span>{responses.length + quizAttempts.length}</span></button>
        <button type="button" role="tab" aria-selected={activeView === 'bookmarks'} onClick={() => setActiveView('bookmarks')}>Bookmarks <span>{bookmarks.length}</span></button>
      </div>

      {activeView === 'notes' && (
        <>
          <div className="notebook-composer">
            <label htmlFor="notebook-draft">{context?.artifactTitle ? `Note about “${context.artifactTitle}”` : 'General observation'}</label>
            <textarea id="notebook-draft" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Record what you notice, question, or want to remember." rows="5" />
            <div className="composer-actions">
              <button className="primary-button" type="button" onClick={saveDraft} disabled={!draft.trim() || storageStatus === 'loading'}>Save note</button>
              {context?.artifactId && <button type="button" onClick={() => onToggleBookmark(context)}>{currentArtifactBookmarked ? 'Remove bookmark' : 'Bookmark artifact'}</button>}
            </div>
          </div>

          <div className="notebook-tools">
            <label htmlFor="notebook-search">Search notebook</label>
            <input id="notebook-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes, modules, or artifacts" />
          </div>

          <div className="notebook-notes" aria-live="polite">
            <div className="section-heading-row"><h3>Notebook entries</h3><span>{filteredNotes.length}</span></div>
            {filteredNotes.length === 0 ? <p className="empty-state">{notes.length ? 'No entries match this search.' : 'Your observations will appear here.'}</p> : groupedNotes.map(([moduleTitle, moduleNotes]) => (
              <section className="note-group" key={moduleTitle} aria-labelledby={`group-${moduleTitle.replace(/\W+/g, '-').toLowerCase()}`}>
                <h4 id={`group-${moduleTitle.replace(/\W+/g, '-').toLowerCase()}`}>{moduleTitle}</h4>
                {moduleNotes.map(renderNote)}
              </section>
            ))}
          </div>
        </>
      )}

      {activeView === 'glossary' && (
        <div className="notebook-glossary">
          <div className="glossary-heading-row">
            <div>
              <h3>Course glossary</h3>
              <p>Terms begin faded. Select underlined terms in the lesson to add them and write definitions in your own words.</p>
            </div>
            <button type="button" onClick={onStartGlossaryStudy} disabled={glossaryEntries.length === 0}>Study as flashcards</button>
          </div>
          {groupedGlossaryTerms.map(([moduleTitle, terms]) => (
            <section className="glossary-module" key={moduleTitle}>
              <h4>{moduleTitle}</h4>
              <ul className="glossary-list">
                {terms.map((term) => {
                  const entry = glossaryEntries.find((item) => item.termId === term.id)
                  const expanded = expandedTermId === term.id
                  const unavailableMessage = `Not yet added. Find this term in ${term.locationLabel}.`
                  return (
                    <li key={term.id} className={entry ? 'glossary-term-added' : 'glossary-term-unadded'}>
                      <button
                        type="button"
                        title={entry ? `Show your definition of ${term.term}` : unavailableMessage}
                        aria-label={entry ? `${term.term}. Added to glossary. Select to show your definition.` : `${term.term}. ${unavailableMessage}`}
                        onClick={() => openGlossaryTerm(term)}
                      >
                        {term.term}
                      </button>
                      {!entry && <span className="glossary-location">{term.locationLabel}</span>}
                      {entry && expanded && (
                        <div className="glossary-definition-panel">
                          <p><strong>Your definition</strong></p>
                          <p>{entry.definition || 'No definition added yet.'}</p>
                          <label htmlFor={`glossary-edit-${term.id}`}>Edit your definition</label>
                          <textarea id={`glossary-edit-${term.id}`} rows="4" value={glossaryEdit} onChange={(event) => setGlossaryEdit(event.target.value)} />
                          <button type="button" onClick={() => saveGlossaryDefinition(term)}>Save definition</button>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      )}

      {activeView === 'activities' && (
        <div className="notebook-activities">
          <div className="section-heading-row"><h3>Learning activity responses</h3><span>{responses.length + quizAttempts.length}</span></div>
          {responses.length === 0 && quizAttempts.length === 0 ? <p className="empty-state">Written responses and knowledge checks will appear here.</p> : (
            <div>
              {[...responses].reverse().map((response) => (
                <article className="notebook-entry activity-entry" key={response.id}>
                  <p className="note-source">{response.activityTitle}</p>
                  {response.moduleTitle && <p className="note-module">{response.moduleTitle}</p>}
                  {response.prompt && <p className="activity-record-prompt">{response.prompt}</p>}
                  <p className="note-text">{response.text}</p>
                  <p className="note-date">Saved {new Date(response.updatedAt).toLocaleString()}</p>
                </article>
              ))}
              {[...quizAttempts].reverse().map((attempt) => (
                <article className="notebook-entry activity-entry" key={attempt.id}>
                  <p className="note-source">{attempt.activityTitle}</p>
                  {attempt.moduleTitle && <p className="note-module">{attempt.moduleTitle}</p>}
                  {attempt.prompt && <p className="activity-record-prompt">{attempt.prompt}</p>}
                  <p><strong>{attempt.correct ? 'Supported by the prototype evidence' : 'Revisit the room'}</strong></p>
                  <p className="note-text">{attempt.feedback}</p>
                  <p className="note-date">Attempted {new Date(attempt.attemptedAt).toLocaleString()}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {activeView === 'bookmarks' && (
        <div className="notebook-bookmarks">
          <div className="section-heading-row"><h3>Bookmarked artifacts</h3><span>{bookmarks.length}</span></div>
          {bookmarks.length === 0 ? <p className="empty-state">Bookmarked artifacts will appear here.</p> : (
            <ul>
              {[...bookmarks].reverse().map((bookmark) => (
                <li key={bookmark.id}>
                  <div><strong>{bookmark.artifactTitle || bookmark.artifactId}</strong>{bookmark.moduleTitle && <span>{bookmark.moduleTitle}</span>}</div>
                  <div className="inline-actions">
                    <button type="button" onClick={() => navigateTo(bookmark)}>Open artifact</button>
                    <button className="text-button danger-text" type="button" onClick={() => onToggleBookmark(bookmark)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <footer className="notebook-footer">
        <button type="button" onClick={onExport}>Export Markdown</button>
        {!confirmDeleteAll ? <button className="danger-button" type="button" onClick={() => setConfirmDeleteAll(true)}>Clear notebook and storage choices</button> : (
          <div className="delete-confirmation" role="group" aria-label="Confirm clearing notebook and storage choices">
            <strong>Clear every note, bookmark, and storage choice?</strong>
            <button className="danger-button" type="button" onClick={handleDeleteAll}>Yes, clear everything</button>
            <button type="button" onClick={() => setConfirmDeleteAll(false)}>Cancel</button>
          </div>
        )}
      </footer>
    </>
  )

  if (mode === 'full') return <div className="notebook-full-backdrop"><section className="notebook notebook-panel notebook-full" role="dialog" aria-modal="true" aria-label="Full-screen field notebook" tabIndex="-1" ref={fullScreenRef}>{content}</section></div>
  return <aside className="notebook notebook-panel notebook-side" aria-label="Field notebook side panel">{content}</aside>
}
