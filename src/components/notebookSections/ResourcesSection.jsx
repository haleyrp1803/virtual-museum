/**
 * Field Notebook Further Study resource shelf.
 *
 * Derives catalog filtering locally because that logic belongs exclusively to
 * this section. Saved-state mutations continue to flow through Notebook.jsx to
 * the workspace hook; no browser storage is accessed here.
 */
export default function ResourcesSection({
  resources,
  resourceCatalog,
  resourceModuleFilter,
  selectedResourceId,
  onModuleFilterChange,
  onSelectResource,
  onToggleResource,
  onUpdateResourceStatus,
}) {
  const modules = [...new Set(resourceCatalog.map((item) => item.moduleTitle || 'Course'))]
  const filteredCatalog = resourceModuleFilter === 'all' ? resourceCatalog : resourceCatalog.filter((item) => (item.moduleTitle || 'Course') === resourceModuleFilter)
  const selectedResource = resourceCatalog.find((item) => item.id === selectedResourceId) || filteredCatalog[0] || null
  const savedEntry = selectedResource ? resources.find((item) => item.resourceId === selectedResource.id) : null

  return (
    <div className="fieldbook-section-body journal-master-detail resources-journal">
      <section className="journal-index-panel">
        <label className="journal-group-control">Module
          <select value={resourceModuleFilter} onChange={(event) => onModuleFilterChange(event.target.value)}>
            <option value="all">All modules</option>
            {modules.map((module) => <option key={module} value={module}>{module}</option>)}
          </select>
        </label>
        <div className="journal-entry-list" role="listbox" aria-label="Further-study resources">
          {filteredCatalog.map((resource) => {
            const saved = resources.find((item) => item.resourceId === resource.id)
            return (
              <button key={resource.id} type="button" role="option" aria-selected={selectedResource?.id === resource.id} className={selectedResource?.id === resource.id ? 'journal-index-entry selected' : 'journal-index-entry'} onClick={() => onSelectResource(resource.id)}>
                <span className={`journal-state-label ${saved ? `state-${saved.status}` : 'state-unsaved'}`}>{saved ? saved.status[0].toUpperCase() + saved.status.slice(1) : 'Not saved'}</span>
                <strong>{resource.title}</strong>
                <span>{resource.type} · {resource.creator}</span>
              </button>
            )
          })}
        </div>
      </section>
      <section className="journal-detail-panel">
        {!selectedResource ? <p className="empty-state">Further-study resources will appear here.</p> : (
          <article className="journal-detail-entry resource-detail">
            <p className="eyebrow">{selectedResource.moduleTitle || 'Course resource'} · {selectedResource.type}</p>
            <h3>{selectedResource.title}</h3>
            <p><strong>{selectedResource.creator}</strong></p>
            <p>{selectedResource.note}</p>
            <p><strong>Access:</strong> {selectedResource.access}</p>
            <div className="inline-actions">
              <button className="primary-button" type="button" aria-pressed={Boolean(savedEntry)} onClick={() => onToggleResource(selectedResource)}>{savedEntry ? 'Remove from fieldbook' : 'Save to fieldbook'}</button>
              <button type="button" onClick={() => window.alert('Prototype only: the final resource will open externally after a clear disclosure.')}>Open external resource</button>
            </div>
            {savedEntry && (
              <label className="resource-status-control">Your reading status
                <select value={savedEntry.status} onChange={(event) => onUpdateResourceStatus(selectedResource.id, event.target.value)}>
                  <option value="saved">Saved</option>
                  <option value="started">Started</option>
                  <option value="finished">Finished</option>
                </select>
              </label>
            )}
          </article>
        )}
      </section>
    </div>
  )
}
