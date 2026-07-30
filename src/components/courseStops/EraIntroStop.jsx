/** Era threshold renderer. Glossary selection and movement are callback-driven. */
import KeyTerm from '../KeyTerm.jsx'
import { getGlossaryTerm } from '../../data/glossary.js'

export default function EraIntroStop({ onSelectGlossaryTerm, onEnterEra }) {
  return (
    <div className="era-threshold">
      <div className="era-number">01</div>
      <div>
        <h2>Historical cluster</h2>
        <p>Within this era, sources and activities explore <KeyTerm term={getGlossaryTerm('household-education')} onSelect={onSelectGlossaryTerm} /> while Georga’s guidance keeps the historical cluster spatially and thematically connected.</p>
        <button className="primary-button" type="button" onClick={onEnterEra}>Enter Early America →</button>
      </div>
    </div>
  )
}
