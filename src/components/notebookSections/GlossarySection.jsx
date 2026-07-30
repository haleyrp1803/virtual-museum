/**
 * Glossary master-detail section for the Field Notebook.
 *
 * Notebook.jsx retains glossary selection, filtering, and edit state so those
 * values survive section changes. This component presents the fixed course
 * glossary alongside learner-authored entries and delegates navigation, study,
 * and persistence actions back to the notebook shell.
 */

export default function GlossarySection({
  context,
  glossaryEntries,
  glossaryModules,
  groupedGlossaryTerms,
  glossaryModuleFilter,
  selectedGlossaryTerm,
  selectedGlossaryEntry,
  glossaryEdit,
  getGlossaryState,
  onStartGlossaryStudy,
  onModuleFilterChange,
  onOpenTerm,
  onGlossaryEditChange,
  onSaveGlossaryEntry,
  onGoToLocation,
}) {
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
          <select value={glossaryModuleFilter} onChange={(event) => onModuleFilterChange(event.target.value)}>
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
                const state = getGlossaryState(term)
                const selected = selectedGlossaryTerm?.id === term.id
                return (
                  <button key={term.id} type="button" className={`glossary-index-entry glossary-state-${state.id} ${selected ? 'selected' : ''}`} aria-current={selected ? 'true' : undefined} title={state.id === 'undiscovered' ? `Not yet added. Find this term in ${term.locationLabel}.` : `${state.label}: ${term.term}`} onClick={() => onOpenTerm(term)}>
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
                <button className="primary-button" type="button" onClick={() => onGoToLocation(selectedGlossaryTerm)}>Go to lesson location</button>
              </div>
            ) : (
              <div className="glossary-added-detail">
                <p className={`journal-state-label ${selectedGlossaryEntry.definition?.trim() ? 'state-defined' : 'state-added'}`}>{selectedGlossaryEntry.definition?.trim() ? 'Defined' : 'Added without definition'}</p>
                <label htmlFor={`glossary-edit-${selectedGlossaryTerm.id}`}>Your definition</label>
                <textarea id={`glossary-edit-${selectedGlossaryTerm.id}`} rows="7" value={glossaryEdit} onChange={(event) => onGlossaryEditChange(event.target.value)} placeholder="Write the definition in your own words, or leave it blank for now." />
                <div className="inline-actions">
                  <button className="primary-button" type="button" onClick={() => onSaveGlossaryEntry(selectedGlossaryTerm, glossaryEdit)}>Save definition</button>
                  <button type="button" onClick={() => onGoToLocation(selectedGlossaryTerm)}>Return to lesson</button>
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
