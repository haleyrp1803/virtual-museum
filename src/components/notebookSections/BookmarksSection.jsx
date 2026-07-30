/**
 * Field Notebook saved-evidence shelf.
 *
 * Renders grouped bookmarks and the selected bookmark's actions. Navigation,
 * bookmark mutation, and switching into note capture are delegated back to
 * Notebook.jsx so this section never owns application or persistence state.
 */
export default function BookmarksSection({
  bookmarks,
  bookmarkGroup,
  groupedBookmarks,
  selectedBookmark,
  onGroupChange,
  onSelectBookmark,
  onOpenBookmark,
  onAddNote,
  onRemoveBookmark,
}) {
  return (
    <div className="fieldbook-section-body journal-master-detail bookmarks-journal">
      <section className="journal-index-panel">
        <label className="journal-group-control">Group saved evidence
          <select value={bookmarkGroup} onChange={(event) => onGroupChange(event.target.value)}>
            <option value="module">By module</option>
            <option value="type">By media type</option>
          </select>
        </label>
        <div className="journal-entry-list grouped-bookmark-list">
          {bookmarks.length === 0 ? <p className="empty-state">Bookmarked sources will appear here.</p> : groupedBookmarks.map(([group, items]) => (
            <section key={group}>
              <h3>{group}</h3>
              {items.map((bookmark) => (
                <button key={bookmark.id} type="button" className={selectedBookmark?.id === bookmark.id ? 'journal-index-entry selected' : 'journal-index-entry'} onClick={() => onSelectBookmark(bookmark.id)}>
                  <span className="journal-media-icon" aria-hidden="true">◆</span>
                  <strong>{bookmark.artifactTitle || bookmark.artifactId}</strong>
                  <span>{bookmark.moduleTitle || 'Saved source'}</span>
                </button>
              ))}
            </section>
          ))}
        </div>
      </section>
      <section className="journal-detail-panel">
        {!selectedBookmark ? <p className="empty-state">Select a saved source to review it.</p> : (
          <article className="journal-detail-entry">
            <p className="eyebrow">Saved evidence</p>
            <h3>{selectedBookmark.artifactTitle || selectedBookmark.artifactId}</h3>
            <p>{selectedBookmark.moduleTitle || 'Course source'}</p>
            <p className="note-date">Saved {new Date(selectedBookmark.createdAt).toLocaleString()}</p>
            <div className="inline-actions">
              <button className="primary-button" type="button" onClick={() => onOpenBookmark(selectedBookmark)}>Open source</button>
              <button type="button" onClick={() => onAddNote(selectedBookmark)}>Add note</button>
              <button className="text-button danger-text" type="button" onClick={() => onRemoveBookmark(selectedBookmark)}>Remove bookmark</button>
            </div>
          </article>
        )}
      </section>
    </div>
  )
}
