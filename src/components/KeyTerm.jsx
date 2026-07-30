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
