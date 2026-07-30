import { useEffect, useMemo, useState } from 'react'

export default function GlossaryStudy({ terms, entries, onExit }) {
  const cards = useMemo(() => terms
    .filter((term) => entries.some((entry) => entry.termId === term.id))
    .sort((a, b) => a.term.localeCompare(b.term)), [terms, entries])
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    if (index > cards.length - 1) setIndex(Math.max(0, cards.length - 1))
  }, [cards.length, index])

  const current = cards[index]
  const entry = current ? entries.find((item) => item.termId === current.id) : null

  const move = (direction) => {
    if (!cards.length) return
    setIndex((currentIndex) => (currentIndex + direction + cards.length) % cards.length)
    setRevealed(false)
  }

  return (
    <div className="glossary-study-screen">
      <header className="study-header">
        <div>
          <p className="eyebrow">Private study mode</p>
          <h1>Glossary Flashcards</h1>
        </div>
        <button type="button" onClick={onExit}>Return to course</button>
      </header>

      {cards.length === 0 ? (
        <section className="study-empty">
          <h2>No terms have been added yet</h2>
          <p>Return to the lesson and select underlined key terms to build your glossary.</p>
          <button className="primary-button" type="button" onClick={onExit}>Return to course</button>
        </section>
      ) : (
        <main className="study-stage">
          <p className="study-progress">Card {index + 1} of {cards.length} · {current.moduleTitle}</p>
          <button className={`flashcard ${revealed ? 'revealed' : ''}`} type="button" onClick={() => setRevealed((value) => !value)} aria-pressed={revealed} aria-label={`${current.term}. ${revealed ? 'Definition shown. Select to return to the term.' : 'Term shown. Select to reveal your definition.'}`}>
            <span className="flashcard-inner">
              <span className="flashcard-face flashcard-front">
                <span className="flashcard-term">{current.term}</span>
                <span className="flashcard-hint">Select the card to reveal your definition.</span>
              </span>
              <span className="flashcard-face flashcard-back">
                <span className="flashcard-back-label">Your definition</span>
                <span className="flashcard-definition">{entry?.definition || 'No definition has been added yet.'}</span>
              </span>
            </span>
          </button>
          <div className="study-controls">
            <button type="button" onClick={() => move(-1)}>← Previous card</button>
            <button className="primary-button" type="button" onClick={() => setRevealed((value) => !value)}>{revealed ? 'Hide definition' : 'Reveal definition'}</button>
            <button type="button" onClick={() => move(1)}>Next card →</button>
          </div>
        </main>
      )}
    </div>
  )
}
