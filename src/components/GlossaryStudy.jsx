import { useEffect, useMemo, useState } from 'react'

export default function GlossaryStudy({ terms, entries, initialModuleId = 'all', onExit }) {
  const modules = useMemo(() => [...new Map(terms.map((term) => [term.moduleId, term.moduleTitle])).entries()], [terms])
  const [moduleFilter, setModuleFilter] = useState(initialModuleId && modules.some(([id]) => id === initialModuleId) ? initialModuleId : 'all')
  const [definitionFilter, setDefinitionFilter] = useState('all-added')
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const cards = useMemo(() => terms
    .filter((term) => entries.some((entry) => entry.termId === term.id))
    .filter((term) => moduleFilter === 'all' || term.moduleId === moduleFilter)
    .filter((term) => {
      const entry = entries.find((item) => item.termId === term.id)
      return definitionFilter === 'defined' ? Boolean(entry?.definition?.trim()) : true
    })
    .sort((a, b) => a.term.localeCompare(b.term)), [terms, entries, moduleFilter, definitionFilter])

  useEffect(() => {
    setIndex(0)
    setRevealed(false)
  }, [moduleFilter, definitionFilter])

  useEffect(() => {
    if (index > cards.length - 1) setIndex(Math.max(0, cards.length - 1))
  }, [cards.length, index])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.target instanceof HTMLSelectElement) return
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
      if (!(event.target instanceof HTMLButtonElement) && (event.key === ' ' || event.key === 'Enter')) {
        event.preventDefault()
        setRevealed((value) => !value)
      }
      if (event.key === 'Escape') onExit()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  const current = cards[index]
  const entry = current ? entries.find((item) => item.termId === current.id) : null

  function move(direction) {
    if (!cards.length) return
    setIndex((currentIndex) => (currentIndex + direction + cards.length) % cards.length)
    setRevealed(false)
  }

  return (
    <div className="glossary-study-screen fieldbook-study-screen">
      <header className="study-header fieldbook-study-header">
        <div className="fieldbook-title-lockup">
          <span className="fieldbook-cover-icon" aria-hidden="true">▥</span>
          <div>
            <p className="eyebrow">Field Notebook · Study mode</p>
            <h1>Glossary Flashcards</h1>
          </div>
        </div>
        <button type="button" onClick={onExit}>Return to glossary</button>
      </header>

      <section className="study-filter-bar" aria-label="Flashcard study filters">
        <label>Module
          <select value={moduleFilter} onChange={(event) => setModuleFilter(event.target.value)}>
            <option value="all">All modules</option>
            {modules.map(([moduleId, moduleTitle]) => <option key={moduleId} value={moduleId}>{moduleTitle}</option>)}
          </select>
        </label>
        <label>Terms
          <select value={definitionFilter} onChange={(event) => setDefinitionFilter(event.target.value)}>
            <option value="all-added">All added terms</option>
            <option value="defined">Only terms with definitions</option>
          </select>
        </label>
        <p>{cards.length} {cards.length === 1 ? 'card' : 'cards'} in this study set</p>
      </section>

      {cards.length === 0 ? (
        <section className="study-empty fieldbook-study-empty">
          <h2>No cards match these filters</h2>
          <p>Add terms from the lesson or choose a broader study set.</p>
          <button className="primary-button" type="button" onClick={onExit}>Return to glossary</button>
        </section>
      ) : (
        <main className="study-stage fieldbook-study-stage">
          <p className="study-progress">Card {index + 1} of {cards.length} · {current.moduleTitle}</p>
          <button className={`flashcard fieldbook-flashcard ${revealed ? 'revealed' : ''}`} type="button" onClick={() => setRevealed((value) => !value)} aria-pressed={revealed} aria-label={`${current.term}. ${revealed ? 'Definition shown. Select to return to the term.' : 'Term shown. Select to reveal your definition.'}`}>
            <span className="flashcard-inner">
              <span className="flashcard-face flashcard-front">
                <span className="flashcard-page-label">Key term</span>
                <span className="flashcard-term">{current.term}</span>
                <span className="flashcard-hint">Select the card to turn it over.</span>
              </span>
              <span className="flashcard-face flashcard-back">
                <span className="flashcard-back-label">Your definition</span>
                <span className="flashcard-definition">{entry?.definition || 'No definition has been added yet.'}</span>
                <span className="flashcard-hint">Select the card to return to the term.</span>
              </span>
            </span>
          </button>
          <div className="study-controls">
            <button type="button" onClick={() => move(-1)}>← Previous card</button>
            <button className="primary-button" type="button" onClick={() => setRevealed((value) => !value)}>{revealed ? 'Show term' : 'Show definition'}</button>
            <button type="button" onClick={() => move(1)}>Next card →</button>
          </div>
          <p className="study-keyboard-help">Keyboard: Left/Right to move, Space or Enter to flip, Escape to return.</p>
        </main>
      )}
    </div>
  )
}
