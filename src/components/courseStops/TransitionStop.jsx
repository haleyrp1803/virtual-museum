/** Historical transition renderer; visual grammar remains defined in CSS. */
import KeyTerm from '../KeyTerm.jsx'
import { getGlossaryTerm } from '../../data/glossary.js'

export default function TransitionStop({ onSelectGlossaryTerm }) {
  return (
    <div className="transition-experience">
      <div className="transition-domestic"><span>handwritten</span><span>household</span><span>local</span></div>
      <div className="transition-arrow" aria-hidden="true">→</div>
      <div className="transition-institutional"><span>printed</span><span><KeyTerm term={getGlossaryTerm('standardization')} onSelect={onSelectGlossaryTerm} /></span><span>public</span></div>
      <p>The visual grammar becomes more regular as the course approaches the common-school era. Final transitions may use sound, typography, archival materials, and restrained animation.</p>
    </div>
  )
}
