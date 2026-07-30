/**
 * Inline lesson key-term trigger.
 *
 * Renders a glossary term as a clearly interactive, keyboard-accessible button
 * and sends the selected term record to the parent lesson.
 */

export default function KeyTerm({ term, onSelect }) {
  return (
    <button
      type="button"
      className="lesson-key-term"
      onClick={() => onSelect(term)}
      aria-label={`Add key term ${term.term} to your glossary`}
    >
      {term.term}
    </button>
  )
}
