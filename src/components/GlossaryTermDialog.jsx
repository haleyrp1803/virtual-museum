import { useEffect, useRef, useState } from 'react'

export default function GlossaryTermDialog({ term, existingEntry, onSave, onClose }) {
  const [definition, setDefinition] = useState(existingEntry?.definition ?? '')
  const dialogRef = useRef(null)

  useEffect(() => {
    setDefinition(existingEntry?.definition ?? '')
    dialogRef.current?.focus()
  }, [term, existingEntry])

  if (!term) return null

  const save = (definitionText) => {
    onSave(term, definitionText)
    onClose()
  }

  return (
    <div className="glossary-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="glossary-dialog" role="dialog" aria-modal="true" aria-labelledby="glossary-dialog-title" tabIndex="-1" ref={dialogRef}>
        <p className="eyebrow">Key term</p>
        <h2 id="glossary-dialog-title">{term.term}</h2>
        <p>Add this term to your private glossary. Write a definition in your own words now, or add the term without a definition and return to it later.</p>
        <label htmlFor="glossary-definition">Your definition</label>
        <textarea
          id="glossary-definition"
          rows="6"
          value={definition}
          onChange={(event) => setDefinition(event.target.value)}
          placeholder="Explain the term in your own words."
        />
        <div className="glossary-dialog-actions">
          <button className="primary-button" type="button" onClick={() => save(definition.trim())}>Add to glossary</button>
          <button type="button" onClick={() => save('')}>Add without definition</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </section>
    </div>
  )
}
