/**
 * Notes master-detail section for the Field Notebook.
 *
 * This component owns only Notes rendering. Notebook.jsx intentionally retains
 * note filters, selection, editing state, and callbacks so those values survive
 * when a learner moves between notebook sections. Workspace mutations continue
 * to flow through the callbacks supplied by useLocalWorkspace.js.
 */

import { getNoteContextLabel } from '../notebookModel.js'

export default function NotesSection({
  context,
  noteTarget,
  draft,
  storageStatus,
  notes,
  noteModules,
  filteredNotes,
  selectedNote,
  query,
  noteModuleFilter,
  noteSort,
  editingId,
  editingText,
  deleteCandidate,
  onDraftChange,
  onSaveDraft,
  onClearNoteTarget,
  onQueryChange,
  onModuleFilterChange,
  onSortChange,
  onSelectNote,
  onEditingTextChange,
  onSaveEdit,
  onCancelEdit,
  onBeginEdit,
  onRequestDelete,
  onConfirmDelete,
  onCancelDelete,
  onNavigateToNote,
}) {
  const captureContext = noteTarget || context

  return (
    <div className="fieldbook-section-body journal-master-detail notes-journal">
      <section className="journal-index-panel" aria-label="Note index">
        <div className="notebook-composer fieldbook-quick-capture">
          <div className="section-heading-row">
            <h3>Quick capture</h3>
            {noteTarget && <button className="text-button" type="button" onClick={onClearNoteTarget}>Use current lesson</button>}
          </div>
          <label htmlFor="notebook-draft">{captureContext?.artifactTitle ? `Note about “${captureContext.artifactTitle}”` : 'General observation'}</label>
          <textarea id="notebook-draft" value={draft} onChange={(event) => onDraftChange(event.target.value)} placeholder="Record what you notice, question, or want to remember." rows="3" />
          <button className="primary-button" type="button" onClick={onSaveDraft} disabled={!draft.trim() || storageStatus === 'loading'}>Save note</button>
        </div>

        <div className="journal-filter-grid">
          <label>Search<input type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search notes" /></label>
          <label>Module<select value={noteModuleFilter} onChange={(event) => onModuleFilterChange(event.target.value)}><option value="all">All modules</option>{noteModules.map((module) => <option key={module}>{module}</option>)}</select></label>
          <label>Order<select value={noteSort} onChange={(event) => onSortChange(event.target.value)}><option value="recent">Most recent</option><option value="earliest">Earliest</option></select></label>
        </div>

        <div className="journal-entry-list" role="listbox" aria-label="Notebook entries">
          {filteredNotes.length === 0 ? <p className="empty-state">{notes.length ? 'No entries match these filters.' : 'Your observations will appear here.'}</p> : filteredNotes.map((note) => (
            <button key={note.id} type="button" role="option" aria-selected={selectedNote?.id === note.id} className={selectedNote?.id === note.id ? 'journal-index-entry selected' : 'journal-index-entry'} onClick={() => onSelectNote(note.id)}>
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
          <div className="note-editor">
            <h3>Edit note</h3>
            <textarea value={editingText} onChange={(event) => onEditingTextChange(event.target.value)} rows="10" />
            <div className="inline-actions">
              <button className="primary-button" type="button" onClick={onSaveEdit} disabled={!editingText.trim()}>Save changes</button>
              <button type="button" onClick={onCancelEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          <article className="journal-detail-entry">
            <p className="eyebrow">{selectedNote.moduleTitle || 'General observations'}</p>
            <h3>{getNoteContextLabel(selectedNote)}</h3>
            <p className="journal-full-text">{selectedNote.text}</p>
            <dl className="journal-metadata">
              <div><dt>Created</dt><dd>{new Date(selectedNote.createdAt).toLocaleString()}</dd></div>
              {selectedNote.updatedAt !== selectedNote.createdAt && <div><dt>Revised</dt><dd>{new Date(selectedNote.updatedAt).toLocaleString()}</dd></div>}
            </dl>
            <div className="inline-actions">
              {selectedNote.artifactId && <button type="button" onClick={() => onNavigateToNote(selectedNote)}>Return to lesson</button>}
              <button type="button" onClick={() => onBeginEdit(selectedNote)}>Edit</button>
              <button className="text-button danger-text" type="button" onClick={() => onRequestDelete(selectedNote.id)}>Delete</button>
            </div>
            {deleteCandidate === selectedNote.id && (
              <div className="entry-delete-confirmation">
                <span>Delete this note?</span>
                <button className="danger-button" type="button" onClick={() => onConfirmDelete(selectedNote.id)}>Delete</button>
                <button type="button" onClick={onCancelDelete}>Cancel</button>
              </div>
            )}
          </article>
        )}
      </section>
    </div>
  )
}
