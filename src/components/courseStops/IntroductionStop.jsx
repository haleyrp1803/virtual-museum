/** Introduction orientation content. Navigation remains owned by App.jsx. */
import { NavigationTutorial, PlaceholderVideo } from './stopSupport.jsx'

export default function IntroductionStop({ onBegin }) {
  return (
    <div className="intro-layout">
      <PlaceholderVideo />
      <NavigationTutorial />
      <button className="primary-button begin-course" type="button" onClick={onBegin}>Begin course →</button>
    </div>
  )
}
