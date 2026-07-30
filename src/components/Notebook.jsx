/**
 * Field Notebook shell and section coordinator.
 *
 * Owns minimized/docked/full presentation behavior, focus containment, section
 * navigation, settings, and the current master-detail section interfaces.
 * All six section renderers now live in dedicated files. This shell retains
 * presentation mode, focus containment, section navigation, shared selection
 * and filter state, settings, and dispatch so section changes do not reset the
 * learner's place or an in-progress edit.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import ActivitiesSection from './notebookSections/ActivitiesSection.jsx'
import BookmarksSection from './notebookSections/BookmarksSection.jsx'
import CourseMapSection from './notebookSections/CourseMapSection.jsx'
import GlossarySection from './notebookSections/GlossarySection.jsx'
import NotesSection from './notebookSections/NotesSection.jsx'
import ResourcesSection from './notebookSections/ResourcesSection.jsx'
import { findGlossaryEntry, NOTEBOOK_SECTIONS } from './notebookModel.js'


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

  const renderSection = () => {
    if (activeView === 'notes') {
      return (
        <NotesSection
          context={context}
          noteTarget={noteTarget}
          draft={draft}
          storageStatus={storageStatus}
          notes={notes}
          noteModules={noteModules}
          filteredNotes={filteredNotes}
          selectedNote={selectedNote}
          query={query}
          noteModuleFilter={noteModuleFilter}
          noteSort={noteSort}
          editingId={editingId}
          editingText={editingText}
          deleteCandidate={deleteCandidate}
          onDraftChange={setDraft}
          onSaveDraft={saveDraft}
          onClearNoteTarget={() => setNoteTarget(null)}
          onQueryChange={setQuery}
          onModuleFilterChange={setNoteModuleFilter}
          onSortChange={setNoteSort}
          onSelectNote={setSelectedNoteId}
          onEditingTextChange={setEditingText}
          onSaveEdit={saveEdit}
          onCancelEdit={() => setEditingId(null)}
          onBeginEdit={(note) => { setEditingId(note.id); setEditingText(note.text) }}
          onRequestDelete={setDeleteCandidate}
          onConfirmDelete={(noteId) => { onDeleteNote(noteId); setDeleteCandidate(null); setSelectedNoteId(null) }}
          onCancelDelete={() => setDeleteCandidate(null)}
          onNavigateToNote={navigateTo}
        />
      )
    }

    if (activeView === 'glossary') {
      return (
        <GlossarySection
          context={context}
          glossaryEntries={glossaryEntries}
          glossaryModules={glossaryModules}
          groupedGlossaryTerms={groupedGlossaryTerms}
          glossaryModuleFilter={glossaryModuleFilter}
          selectedGlossaryTerm={selectedGlossaryTerm}
          selectedGlossaryEntry={selectedGlossaryEntry}
          glossaryEdit={glossaryEdit}
          getGlossaryState={glossaryState}
          onStartGlossaryStudy={onStartGlossaryStudy}
          onModuleFilterChange={(moduleId) => { setGlossaryModuleFilter(moduleId); setSelectedGlossaryTermId(null) }}
          onOpenTerm={openGlossaryTerm}
          onGlossaryEditChange={setGlossaryEdit}
          onSaveGlossaryEntry={onSaveGlossaryEntry}
          onGoToLocation={goToGlossaryLocation}
        />
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
