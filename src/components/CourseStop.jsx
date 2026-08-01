/**
 * Stable wrapper and dispatcher for one course stop.
 *
 * `App.jsx` owns navigation, learner state, notebook mode, and all mutation
 * callbacks. This component owns only the shared section markup and chooses a
 * renderer from `components/courseStops/` based on `stop.type`. Keeping the
 * wrapper here preserves the existing IDs, classes, refs, and accessibility
 * labels that horizontal navigation and CSS depend on.
 */

import IntroductionStop from './courseStops/IntroductionStop.jsx'
import EraIntroStop from './courseStops/EraIntroStop.jsx'
import ArtifactStop from './courseStops/ArtifactStop.jsx'
import MediaPairStop from './courseStops/MediaPairStop.jsx'
import ActivityStop from './courseStops/ActivityStop.jsx'
import SynthesisStop from './courseStops/SynthesisStop.jsx'
import ResourcesStop from './courseStops/ResourcesStop.jsx'
import TransitionStop from './courseStops/TransitionStop.jsx'
import NextEraStop from './courseStops/NextEraStop.jsx'
import { getEraTheme } from '../data/eraThemes.js'

export default function CourseStop({
  stop,
  index,
  sectionRef,
  artifact,
  pairedArtifacts,
  activityDraft,
  activitySaved,
  resources,
  onScrollToStop,
  onSelectGlossaryTerm,
  onMarkArtifact,
  onOpenNotebookForNotes,
  isBookmarked,
  onToggleArtifactBookmark,
  onActivityDraftChange,
  onSaveActivity,
  onReviewNotebook,
  isResourceSaved,
  onToggleResource,
}) {
  const eraTheme = getEraTheme(stop.eraId)
  let content = null

  switch (stop.type) {
    case 'introduction':
      content = <IntroductionStop onBegin={() => onScrollToStop(1)} />
      break
    case 'era-intro':
      content = <EraIntroStop onSelectGlossaryTerm={onSelectGlossaryTerm} onEnterEra={() => onScrollToStop(index + 1)} />
      break
    case 'artifact':
      content = <ArtifactStop artifact={artifact} bookmarked={artifact ? isBookmarked(artifact.id) : false} onMarkViewed={onMarkArtifact} onOpenNotes={onOpenNotebookForNotes} onToggleBookmark={onToggleArtifactBookmark} onSelectGlossaryTerm={onSelectGlossaryTerm} />
      break
    case 'media-pair':
      content = <MediaPairStop artifacts={pairedArtifacts} isBookmarked={isBookmarked} onMarkViewed={onMarkArtifact} onOpenNotes={onOpenNotebookForNotes} onToggleBookmark={onToggleArtifactBookmark} onSelectGlossaryTerm={onSelectGlossaryTerm} />
      break
    case 'activity':
      content = <ActivityStop draft={activityDraft} saved={activitySaved} onDraftChange={onActivityDraftChange} onSave={onSaveActivity} />
      break
    case 'synthesis':
      content = <SynthesisStop onSelectGlossaryTerm={onSelectGlossaryTerm} onReviewNotebook={onReviewNotebook} />
      break
    case 'resources':
      content = <ResourcesStop resources={resources} isSaved={isResourceSaved} onToggleSave={onToggleResource} />
      break
    case 'transition':
      content = <TransitionStop onSelectGlossaryTerm={onSelectGlossaryTerm} />
      break
    case 'next-era':
      content = <NextEraStop onSelectGlossaryTerm={onSelectGlossaryTerm} onReturnToBeginning={() => onScrollToStop(0)} />
      break
    default:
      content = null
  }

  return (
    <section
      id={stop.id}
      data-stop-index={index}
      ref={sectionRef}
      className={`course-stop stop-${stop.type} stop-era-${stop.eraId}`}
      data-era-theme={eraTheme?.designPackId ?? stop.eraId}
      data-heading-variant={eraTheme?.designPack?.variants.heading}
      data-surface-variant={eraTheme?.designPack?.variants.surface}
      data-frame-variant={eraTheme?.designPack?.variants.frame}
      aria-labelledby={`${stop.id}-title`}
    >
      <div className="stop-inner">
        <div className="stop-heading">
          <p className="eyebrow">{stop.eyebrow}</p>
          <p className="date-marker">{stop.dateLabel}</p>
          <h1 id={`${stop.id}-title`}>{stop.title}</h1>
          {stop.summary && <p className="stop-summary">{stop.summary}</p>}
        </div>
        {content}
      </div>
    </section>
  )
}
