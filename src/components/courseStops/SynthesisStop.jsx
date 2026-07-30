/** Module synthesis renderer. Notebook presentation mode remains App-owned. */
import KeyTerm from '../KeyTerm.jsx'
import { getGlossaryTerm } from '../../data/glossary.js'
import { PlaceholderVideo } from './stopSupport.jsx'

export default function SynthesisStop({ onSelectGlossaryTerm, onReviewNotebook }) {
  return (
    <div className="synthesis-layout">
      <PlaceholderVideo label="Georga’s Module 1 synthesis" />
      <div className="synthesis-card">
        <h2>Review before leaving the module</h2>
        <p>Students can use <KeyTerm term={getGlossaryTerm('historical-context')} onSelect={onSelectGlossaryTerm} /> to reconnect earlier sources, open their notebook, or continue into optional further study.</p>
        <button type="button" onClick={onReviewNotebook}>Review notebook</button>
      </div>
    </div>
  )
}
