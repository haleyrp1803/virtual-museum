/**
 * Field Notebook shell and section coordinator.
 *
 * Owns minimized/docked/full presentation behavior, focus containment, section
 * navigation, settings, and the current master-detail section interfaces.
 * Section renderers are being extracted in bounded stages. Activities,
 * Bookmarks, Resources, and Course Map now live in dedicated files; Notes and
 * Glossary remain here until the next extraction pass. The shell still owns
 * presentation mode, focus containment, shared selection state, and dispatch.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import ActivitiesSection from './notebookSections/ActivitiesSection.jsx'
import BookmarksSection from './notebookSections/BookmarksSection.jsx'
import CourseMapSection from './notebookSections/CourseMapSection.jsx'
import ResourcesSection from './notebookSections/ResourcesSection.jsx'
import { findGlossaryEntry, getNoteContextLabel, NOTEBOOK_SECTIONS } from './notebookModel.js'


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
  resources,
  resourceCatalog,
  progress,
  courseStops,
  currentStopId,
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
  onToggleResource,
  onUpdateResourceStatus,
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
  const [selectedGlossaryTermId, setSelectedGlossaryTermId] = useState(null)
  const [glossaryEdit, setGlossaryEdit] = useState('')
  const [glossaryModuleFilter, setGlossaryModuleFilter] = useState('all')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [noteModuleFilter, setNoteModuleFilter] = useState('all')
  const [noteSort, setNoteSort] = useState('recent')
  const [selectedActivityKey, setSelectedActivityKey] = useState(null)
  const [activityFilter, setActivityFilter] = useState('all')
  const [selectedBookmarkId, setSelectedBookmarkId] = useState(null)
  const [bookmarkGroup, setBookmarkGroup] = useState('module')
  const [noteTarget, setNoteTarget] = useState(null)
  const [selectedResourceId, setSelectedResourceId] = useState(null)
  const [resourceModuleFilter, setResourceModuleFilter] = useState('all')
  const fullScreenRef = useRef(null)
  const tabRefs = useRef([])
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (mode !== 'full') return undefined

    const dialog = fullScreenRef.current
    previousFocusRef.current = document.activeElement
    dialog?.focus()

    const handleDialogKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onModeChange('side')
        return
      }
      if (event.key !== 'Tab' || !dialog) return
      const focusable = [...dialog.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
        .filter((element) => !element.hidden && element.getAttribute('aria-hidden') !== 'true')
      if (!focusable.length) {
        event.preventDefault()
        dialog.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    dialog?.addEventListener('keydown', handleDialogKeyDown)
    return () => {
      dialog?.removeEventListener('keydown', handleDialogKeyDown)
      const previous = previousFocusRef.current
      if (previous?.isConnected) previous.focus()
      else document.querySelector('.fieldbook-launcher, .header-actions button:last-child')?.focus()
    }
  }, [mode, onModeChange])

  useEffect(() => {
    if (requestedView && NOTEBOOK_SECTIONS.some((section) => section.id === requestedView)) {
      setActiveView(requestedView)
    }
  }, [requestedView])

  const currentArtifactBookmarked = Boolean(context?.artifactId && bookmarks.some((bookmark) => bookmark.artifactId === context.artifactId))
  const noteModules = useMemo(() => [...new Set(notes.map((note) => note.moduleTitle || 'General observations'))].sort(), [notes])
  const filteredNotes = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const items = notes.filter((note) => {
      const matchesQuery = !needle || [note.text, note.artifactTitle, note.moduleTitle].filter(Boolean).some((value) => value.toLowerCase().includes(needle))
      const matchesModule = noteModuleFilter === 'all' || (note.moduleTitle || 'General observations') === noteModuleFilter
      return matchesQuery && matchesModule
    })
    return [...items].sort((a, b) => noteSort === 'earliest' ? new Date(a.updatedAt) - new Date(b.updatedAt) : new Date(b.updatedAt) - new Date(a.updatedAt))
  }, [notes, query, noteModuleFilter, noteSort])

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || filteredNotes[0] || null
  const activityItems = useMemo(() => [
    ...responses.map((item) => ({ ...item, recordType: 'response', key: `response-${item.id}`, status: 'completed' })),
    ...quizAttempts.map((item) => ({ ...item, recordType: 'quiz', key: `quiz-${item.id}`, status: item.correct ? 'completed' : 'revisit' })),
  ].sort((a, b) => new Date(b.updatedAt || b.attemptedAt) - new Date(a.updatedAt || a.attemptedAt)), [responses, quizAttempts])
  const filteredActivities = activityFilter === 'all' ? activityItems : activityItems.filter((item) => item.status === activityFilter)
  const selectedActivity = activityItems.find((item) => item.key === selectedActivityKey) || filteredActivities[0] || null
  const selectedBookmark = bookmarks.find((bookmark) => bookmark.id === selectedBookmarkId) || bookmarks[0] || null
  const groupedBookmarks = useMemo(() => {
    const groups = new Map()
    bookmarks.forEach((bookmark) => {
      const key = bookmarkGroup === 'type' ? (bookmark.artifactType || 'Source') : (bookmark.moduleTitle || 'General')
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key).push(bookmark)
    })
    return [...groups.entries()]
  }, [bookmarks, bookmarkGroup])

  const glossaryModules = useMemo(() => [...new Map(glossaryTerms.map((term) => [term.moduleId, term.moduleTitle])).entries()], [glossaryTerms])
  const groupedGlossaryTerms = useMemo(() => {
    const groups = new Map()
    ;[...glossaryTerms]
      .filter((term) => glossaryModuleFilter === 'all' || term.moduleId === glossaryModuleFilter)
      .sort((a, b) => a.term.localeCompare(b.term))
      .forEach((term) => {
        if (!groups.has(term.moduleTitle)) groups.set(term.moduleTitle, [])
        groups.get(term.moduleTitle).push(term)
      })
    return [...groups.entries()]
  }, [glossaryTerms, glossaryModuleFilter])

  const glossaryEntryFor = (termId) => findGlossaryEntry(glossaryEntries, termId)
  const selectedGlossaryTerm = glossaryTerms.find((term) => term.id === selectedGlossaryTermId && (glossaryModuleFilter === 'all' || term.moduleId === glossaryModuleFilter))
    || groupedGlossaryTerms[0]?.[1]?.[0]
    || null
  const selectedGlossaryEntry = selectedGlossaryTerm ? glossaryEntryFor(selectedGlossaryTerm.id) : null

  useEffect(() => {
    setGlossaryEdit(selectedGlossaryEntry?.definition || '')
  }, [selectedGlossaryTerm?.id, selectedGlossaryEntry?.definition])

  const glossaryState = (term) => {
    const entry = glossaryEntryFor(term.id)
    if (!entry) return { id: 'undiscovered', symbol: '○', label: 'Not encountered' }
    if (!entry.definition?.trim()) return { id: 'added', symbol: '◐', label: 'Added without definition' }
    return { id: 'defined', symbol: '●', label: 'Defined' }
  }

  const sectionCounts = {
    notes: notes.length,
    glossary: `${glossaryEntries.length}/${glossaryTerms.length}`,
    activities: responses.length + quizAttempts.length,
    bookmarks: bookmarks.length,
    resources: resources.length,
  }

  const openGlossaryTerm = (term) => {
    const entry = glossaryEntryFor(term.id)
    setSelectedGlossaryTermId(term.id)
    setGlossaryEdit(entry?.definition || '')
  }

  const goToGlossaryLocation = (term) => {
    if (!term) return
    onNavigateToStop(term.locationStopId)
    onModeChange('side')
  }

  const saveDraft = () => {
    const saved = onAddNote({ text: draft, ...(noteTarget || context) })
    if (saved) { setDraft(''); setNoteTarget(null) }
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
      <button className="notebook-launcher fieldbook-launcher" type="button" onClick={() => onModeChange('side')} aria-label="Open field notebook">
        <span className="fieldbook-cover-icon" aria-hidden="true">▥</span>
        <span>Fieldbook</span>
      </button>
    )
  }

  const renderNote = (note) => (
    <article className="notebook-entry" key={note.id}>
      <div className="notebook-entry-heading">
        <div>
          <p className="note-source">{getNoteContextLabel(note)}</p>
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
            <button type="button" onClick={() => { setEditingId(note.id); setEditingText(note.text) }}>Edit</button>
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

  const renderSection = () => {
    if (activeView === 'notes') {
      const captureContext = noteTarget || context
      return (
        <div className="fieldbook-section-body journal-master-detail notes-journal">
          <section className="journal-index-panel" aria-label="Note index">
            <div className="notebook-composer fieldbook-quick-capture">
              <div className="section-heading-row"><h3>Quick capture</h3>{noteTarget && <button className="text-button" type="button" onClick={() => setNoteTarget(null)}>Use current lesson</button>}</div>
              <label htmlFor="notebook-draft">{captureContext?.artifactTitle ? `Note about “${captureContext.artifactTitle}”` : 'General observation'}</label>
              <textarea id="notebook-draft" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Record what you notice, question, or want to remember." rows="3" />
              <button className="primary-button" type="button" onClick={saveDraft} disabled={!draft.trim() || storageStatus === 'loading'}>Save note</button>
            </div>
            <div className="journal-filter-grid">
              <label>Search<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes" /></label>
              <label>Module<select value={noteModuleFilter} onChange={(event) => setNoteModuleFilter(event.target.value)}><option value="all">All modules</option>{noteModules.map((module) => <option key={module}>{module}</option>)}</select></label>
              <label>Order<select value={noteSort} onChange={(event) => setNoteSort(event.target.value)}><option value="recent">Most recent</option><option value="earliest">Earliest</option></select></label>
            </div>
            <div className="journal-entry-list" role="listbox" aria-label="Notebook entries">
              {filteredNotes.length === 0 ? <p className="empty-state">{notes.length ? 'No entries match these filters.' : 'Your observations will appear here.'}</p> : filteredNotes.map((note) => (
                <button key={note.id} type="button" role="option" aria-selected={selectedNote?.id === note.id} className={selectedNote?.id === note.id ? 'journal-index-entry selected' : 'journal-index-entry'} onClick={() => setSelectedNoteId(note.id)}>
                  <span className="journal-entry-kicker">{note.moduleTitle || 'General observations'}</span>
                  <strong>{getNoteContextLabel(note)}</strong>
                  <span>{note.text}</span>
                  {note.updatedAt !== note.createdAt && <small>Revised</small>}
                </button>
              ))}
            </div>
          </section>
          <section className="journal-detail-panel" aria-label="Selected note">
            {!selectedNote ? <p className="empty-state">Select a note to review it.</p> : editingId === selectedNote.id ? (
              <div className="note-editor"><h3>Edit note</h3><textarea value={editingText} onChange={(event) => setEditingText(event.target.value)} rows="10" /><div className="inline-actions"><button className="primary-button" type="button" onClick={saveEdit} disabled={!editingText.trim()}>Save changes</button><button type="button" onClick={() => setEditingId(null)}>Cancel</button></div></div>
            ) : (
              <article className="journal-detail-entry">
                <p className="eyebrow">{selectedNote.moduleTitle || 'General observations'}</p><h3>{getNoteContextLabel(selectedNote)}</h3>
                <p className="journal-full-text">{selectedNote.text}</p>
                <dl className="journal-metadata"><div><dt>Created</dt><dd>{new Date(selectedNote.createdAt).toLocaleString()}</dd></div>{selectedNote.updatedAt !== selectedNote.createdAt && <div><dt>Revised</dt><dd>{new Date(selectedNote.updatedAt).toLocaleString()}</dd></div>}</dl>
                <div className="inline-actions">{selectedNote.artifactId && <button type="button" onClick={() => navigateTo(selectedNote)}>Return to lesson</button>}<button type="button" onClick={() => { setEditingId(selectedNote.id); setEditingText(selectedNote.text) }}>Edit</button><button className="text-button danger-text" type="button" onClick={() => setDeleteCandidate(selectedNote.id)}>Delete</button></div>
                {deleteCandidate === selectedNote.id && <div className="entry-delete-confirmation"><span>Delete this note?</span><button className="danger-button" type="button" onClick={() => { onDeleteNote(selectedNote.id); setDeleteCandidate(null); setSelectedNoteId(null) }}>Delete</button><button type="button" onClick={() => setDeleteCandidate(null)}>Cancel</button></div>}
              </article>
            )}
          </section>
        </div>
      )
    }

    if (activeView === 'glossary') {
      return (
        <div className="fieldbook-section-body journal-master-detail glossary-journal">
          <section className="journal-index-panel glossary-index-panel" aria-label="Glossary term index">
            <div className="glossary-index-header">
              <div>
                <h3>Course glossary</h3>
                <p>Build your own definitions as you encounter key terms.</p>
              </div>
              <button type="button" onClick={() => onStartGlossaryStudy({ moduleId: context?.moduleId })} disabled={glossaryEntries.length === 0}>Study terms</button>
            </div>
            <label className="journal-group-control">Show module
              <select value={glossaryModuleFilter} onChange={(event) => { setGlossaryModuleFilter(event.target.value); setSelectedGlossaryTermId(null) }}>
                <option value="all">All modules</option>
                {glossaryModules.map(([moduleId, moduleTitle]) => <option key={moduleId} value={moduleId}>{moduleTitle}</option>)}
              </select>
            </label>
            <div className="glossary-state-key" aria-label="Glossary state key">
              <span><b aria-hidden="true">○</b> Not encountered</span>
              <span><b aria-hidden="true">◐</b> Added</span>
              <span><b aria-hidden="true">●</b> Defined</span>
            </div>
            <div className="glossary-index-list">
              {groupedGlossaryTerms.map(([moduleTitle, terms]) => (
                <section className="glossary-index-module" key={moduleTitle}>
                  <h4>{moduleTitle}</h4>
                  {terms.map((term) => {
                    const state = glossaryState(term)
                    const selected = selectedGlossaryTerm?.id === term.id
                    return (
                      <button key={term.id} type="button" className={`glossary-index-entry glossary-state-${state.id} ${selected ? 'selected' : ''}`} aria-current={selected ? 'true' : undefined} title={state.id === 'undiscovered' ? `Not yet added. Find this term in ${term.locationLabel}.` : `${state.label}: ${term.term}`} onClick={() => openGlossaryTerm(term)}>
                        <span className="glossary-state-symbol" aria-hidden="true">{state.symbol}</span>
                        <span><strong>{term.term}</strong><small>{state.label}</small></span>
                      </button>
                    )
                  })}
                </section>
              ))}
            </div>
          </section>

          <section className="journal-detail-panel glossary-detail-panel" aria-live="polite">
            {!selectedGlossaryTerm ? <p className="empty-state">Select a glossary term to review it.</p> : (
              <article className="journal-detail-entry">
                <p className="eyebrow">{selectedGlossaryTerm.moduleTitle}</p>
                <h3>{selectedGlossaryTerm.term}</h3>
                {!selectedGlossaryEntry ? (
                  <div className="glossary-undiscovered-detail">
                    <p className="journal-state-label state-undiscovered">Not yet added</p>
                    <p>You will encounter this term in:</p>
                    <p className="glossary-lesson-location"><strong>{selectedGlossaryTerm.locationLabel}</strong></p>
                    <button className="primary-button" type="button" onClick={() => goToGlossaryLocation(selectedGlossaryTerm)}>Go to lesson location</button>
                  </div>
                ) : (
                  <div className="glossary-added-detail">
                    <p className={`journal-state-label ${selectedGlossaryEntry.definition?.trim() ? 'state-defined' : 'state-added'}`}>{selectedGlossaryEntry.definition?.trim() ? 'Defined' : 'Added without definition'}</p>
                    <label htmlFor={`glossary-edit-${selectedGlossaryTerm.id}`}>Your definition</label>
                    <textarea id={`glossary-edit-${selectedGlossaryTerm.id}`} rows="7" value={glossaryEdit} onChange={(event) => setGlossaryEdit(event.target.value)} placeholder="Write the definition in your own words, or leave it blank for now." />
                    <div className="inline-actions">
                      <button className="primary-button" type="button" onClick={() => onSaveGlossaryEntry(selectedGlossaryTerm, glossaryEdit)}>Save definition</button>
                      <button type="button" onClick={() => goToGlossaryLocation(selectedGlossaryTerm)}>Return to lesson</button>
                    </div>
                    {!selectedGlossaryEntry.definition?.trim() && <p className="fieldbook-pass-note">This term is in your glossary, but you have not written a definition yet.</p>}
                  </div>
                )}
              </article>
            )}
          </section>
        </div>
      )
    }

    if (activeView === 'activities') {
      return (
        <ActivitiesSection
          activityFilter={activityFilter}
          filteredActivities={filteredActivities}
          selectedActivity={selectedActivity}
          onFilterChange={setActivityFilter}
          onSelectActivity={setSelectedActivityKey}
        />
      )
    }

    if (activeView === 'bookmarks') {
      return (
        <BookmarksSection
          bookmarks={bookmarks}
          bookmarkGroup={bookmarkGroup}
          groupedBookmarks={groupedBookmarks}
          selectedBookmark={selectedBookmark}
          onGroupChange={setBookmarkGroup}
          onSelectBookmark={setSelectedBookmarkId}
          onOpenBookmark={navigateTo}
          onAddNote={(bookmark) => { setNoteTarget(bookmark); setActiveView('notes') }}
          onRemoveBookmark={(bookmark) => { onToggleBookmark(bookmark); setSelectedBookmarkId(null) }}
        />
      )
    }

    if (activeView === 'resources') {
      return (
        <ResourcesSection
          resources={resources}
          resourceCatalog={resourceCatalog}
          resourceModuleFilter={resourceModuleFilter}
          selectedResourceId={selectedResourceId}
          onModuleFilterChange={setResourceModuleFilter}
          onSelectResource={setSelectedResourceId}
          onToggleResource={onToggleResource}
          onUpdateResourceStatus={onUpdateResourceStatus}
        />
      )
    }

    return (
      <CourseMapSection
        courseStops={courseStops}
        currentStopId={currentStopId}
        progress={progress}
        onNavigateToStop={(stopId) => { onNavigateToStop(stopId); onModeChange('side') }}
      />
    )
  }

  const handleTabRailKeyDown = (event, index) => {
    let nextIndex = null
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % NOTEBOOK_SECTIONS.length
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + NOTEBOOK_SECTIONS.length) % NOTEBOOK_SECTIONS.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = NOTEBOOK_SECTIONS.length - 1
    if (nextIndex === null) return
    event.preventDefault()
    setActiveView(NOTEBOOK_SECTIONS[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  const contextTitle = context?.artifactTitle || context?.stopTitle || context?.moduleTitle || 'Course overview'
  const contextModule = context?.moduleTitle || 'Current lesson'

  const content = (
    <div className="fieldbook-shell">
      <header className="notebook-header fieldbook-header">
        <div className="fieldbook-title-lockup">
          <span className="fieldbook-cover-icon" aria-hidden="true">▥</span>
          <div><p className="eyebrow">Private course workspace</p><h2 id="fieldbook-dialog-title">Field Notebook</h2></div>
        </div>
        <div className="notebook-header-actions">
          {mode === 'side' && <button type="button" onClick={() => onModeChange('full')}>Expand</button>}
          {mode === 'full' && <button type="button" onClick={() => onModeChange('side')}>Dock right</button>}
          <button type="button" onClick={() => onModeChange('minimized')}>Close</button>
        </div>
      </header>

      <div className="fieldbook-workspace">
        <nav className="fieldbook-tab-rail" aria-label="Field notebook sections">
          {NOTEBOOK_SECTIONS.map((section) => (
            <button key={section.id} id={`fieldbook-tab-${section.id}`} ref={(node) => { tabRefs.current[NOTEBOOK_SECTIONS.findIndex((item) => item.id === section.id)] = node }} type="button" className={activeView === section.id ? 'fieldbook-tab-active' : ''} aria-current={activeView === section.id ? 'page' : undefined} aria-controls="fieldbook-section-panel" onKeyDown={(event) => handleTabRailKeyDown(event, NOTEBOOK_SECTIONS.findIndex((item) => item.id === section.id))} onClick={() => setActiveView(section.id)}>
              <span className="fieldbook-tab-icon" aria-hidden="true">{section.icon}</span>
              <span className="fieldbook-tab-label">{section.label}</span>
              {sectionCounts[section.id] !== undefined && <span className="fieldbook-tab-count">{sectionCounts[section.id]}</span>}
            </button>
          ))}
        </nav>
        <span className="sr-only" aria-live="polite">{NOTEBOOK_SECTIONS.find((section) => section.id === activeView)?.label} section selected.</span>

        <div className="fieldbook-page">
          <section className="fieldbook-context-card" aria-label="Current course location">
            <div><p className="eyebrow">Current location</p><strong>{contextModule}</strong><span>{contextTitle}</span></div>
            {context?.artifactId && <button type="button" onClick={() => onToggleBookmark(context)}>{currentArtifactBookmarked ? 'Bookmarked' : 'Bookmark source'}</button>}
          </section>

          <div className="fieldbook-page-heading">
            <div><p className="eyebrow">Fieldbook section</p><h3 id="fieldbook-section-heading">{NOTEBOOK_SECTIONS.find((section) => section.id === activeView)?.label}</h3></div>
            <button className="fieldbook-settings-button" type="button" aria-expanded={settingsOpen} onClick={() => setSettingsOpen((value) => !value)}>Settings</button>
          </div>

          {settingsOpen && (
            <section className={`fieldbook-settings storage-${storageStatus}`} aria-label="Notebook storage and export settings">
              <div aria-live="polite"><strong>Storage</strong><p>{storageMessage}</p></div>
              <div className="inline-actions">
                {(storageStatus === 'error' || storageStatus === 'unavailable') && <button type="button" onClick={onRetryStorage}>Retry storage</button>}
                <button type="button" onClick={onReconsiderStorage}>Change storage choice</button>
                <button type="button" onClick={onExport}>Export Markdown</button>
              </div>
              {!confirmDeleteAll ? <button className="danger-button" type="button" onClick={() => setConfirmDeleteAll(true)}>Clear local notebook data</button> : (
                <div className="delete-confirmation" role="group" aria-label="Confirm clearing notebook and storage choices">
                  <strong>Clear every note, bookmark, glossary entry, and storage choice?</strong>
                  <button className="danger-button" type="button" onClick={handleDeleteAll}>Yes, clear everything</button>
                  <button type="button" onClick={() => setConfirmDeleteAll(false)}>Cancel</button>
                </div>
              )}
            </section>
          )}

          <main id="fieldbook-section-panel" className="fieldbook-page-content" role="region" aria-labelledby="fieldbook-section-heading">{renderSection()}</main>
        </div>
      </div>
    </div>
  )

  if (mode === 'full') return <div className="notebook-full-backdrop"><section className="notebook notebook-panel notebook-full fieldbook-full" role="dialog" aria-modal="true" aria-labelledby="fieldbook-dialog-title" aria-describedby="fieldbook-keyboard-hint" tabIndex="-1" ref={fullScreenRef}><p id="fieldbook-keyboard-hint" className="sr-only">Use the labeled section tabs to move through the field notebook. Press Escape to return to the docked notebook.</p>{content}</section></div>
  return <aside className="notebook notebook-panel notebook-side fieldbook-side" aria-label="Field notebook side panel">{content}</aside>
}
