/**
 * Field Notebook activity journal.
 *
 * Receives already-derived activity records from Notebook.jsx and owns only
 * the activity section's master-detail presentation. Selection and filtering
 * remain controlled by the notebook shell so section state survives tab changes.
 */
export default function ActivitiesSection({
  activityFilter,
  filteredActivities,
  selectedActivity,
  onFilterChange,
  onSelectActivity,
}) {
  return (
    <div className="fieldbook-section-body journal-master-detail activities-journal">
      <section className="journal-index-panel">
        <div className="journal-status-filters" aria-label="Filter activities">
          <button className={activityFilter === 'all' ? 'selected' : ''} type="button" onClick={() => onFilterChange('all')}>All</button>
          <button className={activityFilter === 'revisit' ? 'selected' : ''} type="button" onClick={() => onFilterChange('revisit')}>To revisit</button>
          <button className={activityFilter === 'completed' ? 'selected' : ''} type="button" onClick={() => onFilterChange('completed')}>Completed</button>
        </div>
        <div className="journal-entry-list" role="listbox" aria-label="Activity records">
          {filteredActivities.length === 0 ? <p className="empty-state">No activities in this category.</p> : filteredActivities.map((item) => (
            <button key={item.key} type="button" role="option" aria-selected={selectedActivity?.key === item.key} className={selectedActivity?.key === item.key ? 'journal-index-entry selected' : 'journal-index-entry'} onClick={() => onSelectActivity(item.key)}>
              <span className={`journal-state-label state-${item.status}`}>{item.status === 'revisit' ? 'To revisit' : 'Completed'}</span>
              <strong>{item.activityTitle || 'Learning activity'}</strong>
              <span>{item.moduleTitle || 'Course activity'}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="journal-detail-panel">
        {!selectedActivity ? <p className="empty-state">Completed activities and items to revisit will appear here.</p> : (
          <article className="journal-detail-entry">
            <p className="eyebrow">{selectedActivity.moduleTitle || 'Course activity'}</p>
            <h3>{selectedActivity.activityTitle}</h3>
            {selectedActivity.prompt && <div className="journal-prompt"><strong>Prompt</strong><p>{selectedActivity.prompt}</p></div>}
            {selectedActivity.recordType === 'response' ? (
              <><h4>Your response</h4><p className="journal-full-text">{selectedActivity.text}</p><p className="note-date">Saved {new Date(selectedActivity.updatedAt).toLocaleString()}</p></>
            ) : (
              <><p className={`journal-result state-${selectedActivity.status}`}><strong>{selectedActivity.correct ? 'Completed' : 'To revisit'}</strong></p><p className="journal-full-text">{selectedActivity.feedback}</p><p className="note-date">Attempted {new Date(selectedActivity.attemptedAt).toLocaleString()}</p></>
            )}
          </article>
        )}
      </section>
    </div>
  )
}
