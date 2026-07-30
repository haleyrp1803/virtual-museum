/** Landing for the next historical cluster. Navigation remains App-owned. */
import KeyTerm from '../KeyTerm.jsx'
import { getGlossaryTerm } from '../../data/glossary.js'

export default function NextEraStop({ onSelectGlossaryTerm, onReturnToBeginning }) {
  return (
    <div className="next-era-landing">
      <div className="slate-placeholder"><span>Module 2</span><strong>Common School</strong></div>
      <div>
        <h2>A new visual system</h2>
        <p>The <KeyTerm term={getGlossaryTerm('common-school')} onSelect={onSelectGlossaryTerm} /> movement and expanding <KeyTerm term={getGlossaryTerm('public-schooling')} onSelect={onSelectGlossaryTerm} /> introduce a more regular, institutional visual system.</p>
        <button type="button" onClick={onReturnToBeginning}>Return to course introduction</button>
      </div>
    </div>
  )
}
