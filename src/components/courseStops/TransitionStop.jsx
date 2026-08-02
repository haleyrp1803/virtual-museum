/** Historical transition renderer; content comes from the stop data while the visual grammar remains CSS-owned. */
export default function TransitionStop({ transition }) {
  if (!transition) return null

  return (
    <div className="transition-experience">
      <div className="transition-domestic" aria-label={`${transition.fromLabel} characteristics`}>
        {transition.from.map((item) => <span key={item}>{item}</span>)}
      </div>
      <div className="transition-arrow" aria-hidden="true">→</div>
      <div className="transition-institutional" aria-label={`${transition.toLabel} characteristics`}>
        {transition.to.map((item) => <span key={item}>{item}</span>)}
      </div>
      <p>{transition.note}</p>
    </div>
  )
}
