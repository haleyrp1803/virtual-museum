/**
 * Top-level course application coordinator.
 *
 * Coordinates the active lesson context, Field Notebook presentation mode,
 * glossary dialogs, full-screen study view, learner actions, and top-level
 * rendering. Course navigation is delegated to `useCourseNavigation`; course
 * content comes from `data/`; learner data comes through `useLocalWorkspace`.
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import ConsentDialog from './components/ConsentDialog.jsx'
import Notebook from './components/Notebook.jsx'
import GlossaryTermDialog from './components/GlossaryTermDialog.jsx'
import GlossaryStudy from './components/GlossaryStudy.jsx'
import CourseStop from './components/CourseStop.jsx'
import { supportsIndexedDb } from './storage/workspaceDb.js'
import { useLocalWorkspace } from './hooks/useLocalWorkspace.js'
import { useCourseNavigation } from './hooks/useCourseNavigation.js'
import { courseArtifacts, courseStops, placeholderResources, timelineSegments } from './data/course.js'
import { glossaryTerms } from './data/glossary.js'

const MODULE_ID = 'early-america'
const MODULE_TITLE = 'Early America'

export default function App() {
  const [notebookMode, setNotebookMode] = useState('minimized')
  const [activityDraft, setActivityDraft] = useState('')
  const [activitySaved, setActivitySaved] = useState(false)
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState(null)
  const [notebookRequestedView, setNotebookRequestedView] = useState(null)
  const [notebookNoteContext, setNotebookNoteContext] = useState(null)
  const [screenMode, setScreenMode] = useState('course')
  const [studyInitialModuleId, setStudyInitialModuleId] = useState('all')
  const workspace = useLocalWorkspace()
  const {
    activeStopIndex,
    courseRef,
    registerStopRef,
    scrollToStop,
    navigateToStopId,
    handleWheel,
  } = useCourseNavigation(courseStops)

  const activeStop = courseStops[activeStopIndex]
  const activeArtifact = activeStop?.artifactId ? courseArtifacts.find((artifact) => artifact.id === activeStop.artifactId) : null
  const activeEra = activeStop?.eraId ?? 'introduction'

  const lessonNoteContext = useMemo(() => {
    const isCommonSchool = activeStop?.eraId === 'common-school' || activeStop?.eraId === 'transition'
    const moduleId = isCommonSchool ? 'common-school' : MODULE_ID
    const moduleTitle = isCommonSchool ? 'Common School' : MODULE_TITLE
    return {
      moduleId,
      moduleTitle,
      artifactId: activeArtifact?.id ?? activeStop?.id ?? null,
      artifactTitle: activeArtifact?.title ?? activeStop?.title ?? null,
    }
  }, [activeArtifact, activeStop])

  // Artifact note buttons may need a more specific context than the active stop
  // provides (for example, one item inside a paired-media stop). The override is
  // cleared whenever course position changes so ordinary notebook use follows
  // the current lesson again.
  const noteContext = notebookNoteContext || lessonNoteContext

  useEffect(() => {
    setNotebookNoteContext(null)
  }, [activeStop?.id])

  const openNotebookForNotes = useCallback((artifact = null) => {
    if (artifact) {
      setNotebookNoteContext({
        moduleId: artifact.moduleId || MODULE_ID,
        moduleTitle: MODULE_TITLE,
        artifactId: artifact.id,
        artifactTitle: artifact.title,
      })
    }

    // Force a fresh requested-view transition even when Notes was requested
    // previously; Notebook responds to changes in this prop.
    setNotebookRequestedView(null)
    window.queueMicrotask(() => setNotebookRequestedView('notes'))
    setNotebookMode('side')
  }, [])

  const savePrototypeActivity = () => {
    const text = activityDraft.trim()
    if (!text) return

    // The workspace API keeps activity metadata separate from the learner's
    // response payload. The active ActivityStop renderer supplies the
    // activity record, while the workspace layer stores one stable response
    // per activity ID.
    const saved = workspace.saveActivityResponse({
      id: 'early-america-prototype-response',
      moduleId: MODULE_ID,
      moduleTitle: MODULE_TITLE,
      title: 'Pause and Respond',
      prompt: 'What changed in your interpretation after moving among several source formats?',
      type: 'written-response',
    }, { text })

    setActivitySaved(saved)
  }

  const openArtifactFromNotebook = ({ artifactId }) => {
    const index = courseStops.findIndex((stop) => stop.artifactId === artifactId || stop.artifactIds?.includes(artifactId) || stop.id === artifactId)
    if (index >= 0) scrollToStop(index)
    setNotebookMode('side')
  }

  const markArtifact = (artifact) => workspace.markArtifactViewed(MODULE_ID, artifact.id)
  const isBookmarked = (artifactId) => workspace.workspace.bookmarks.some((bookmark) => bookmark.artifactId === artifactId)

  const selectGlossaryTerm = (term) => {
    setSelectedGlossaryTerm(term)
  }

  const saveGlossaryTerm = (term, definition) => {
    workspace.saveGlossaryEntry(term, definition)
    setNotebookRequestedView(null)
    window.queueMicrotask(() => setNotebookRequestedView('glossary'))
    setNotebookMode('side')
  }

  const navigateToGlossaryLocation = (stopId) => {
    setScreenMode('course')
    navigateToStopId(stopId)
  }

  if (screenMode === 'study') {
    return <GlossaryStudy terms={glossaryTerms} entries={workspace.workspace.glossaryEntries} initialModuleId={studyInitialModuleId} onExit={() => { setScreenMode('course'); setNotebookRequestedView(null); window.queueMicrotask(() => setNotebookRequestedView('glossary')); setNotebookMode('full') }} />
  }

  return (
    <div className={`course-app notebook-mode-${notebookMode} era-${activeEra}`}>
      <a className="skip-link" href="#course-canvas">Skip to course content</a>
      {!workspace.consentResolved && <ConsentDialog onAccept={workspace.acceptConsent} onDecline={workspace.useSessionNotebook} storageSupported={supportsIndexedDb()} />}

      <header className="course-header">
        <div className="course-brand"><span>History of Education</span><small>A horizontally progressing course prototype</small></div>
        <div className="header-actions">
          <button type="button" onClick={() => scrollToStop(0)}>Course beginning</button>
          <button type="button" onClick={() => workspace.notebookEnabled ? setNotebookMode('full') : workspace.reconsiderConsent()}>My Notebook</button>
        </div>
      </header>




      <main id="course-canvas" ref={courseRef} className="horizontal-course" onWheel={handleWheel} tabIndex="-1" aria-label="Horizontal course sequence">
        {courseStops.map((stop, index) => {
          // CourseStop preserves the shared section wrapper and delegates only
          // the stop-specific body. All navigation and learner-state callbacks
          // remain defined in this top-level coordinator.
          const artifact = stop.artifactId ? courseArtifacts.find((item) => item.id === stop.artifactId) : null
          const pairedArtifacts = stop.artifactIds ? stop.artifactIds.map((id) => courseArtifacts.find((item) => item.id === id)).filter(Boolean) : []

          return (
            <CourseStop
              key={stop.id}
              stop={stop}
              index={index}
              sectionRef={(node) => registerStopRef(index, node)}
              artifact={artifact}
              pairedArtifacts={pairedArtifacts}
              activityDraft={activityDraft}
              activitySaved={activitySaved}
              resources={placeholderResources}
              onScrollToStop={scrollToStop}
              onSelectGlossaryTerm={selectGlossaryTerm}
              onMarkArtifact={markArtifact}
              onOpenNotebookForNotes={openNotebookForNotes}
              isBookmarked={isBookmarked}
              onToggleArtifactBookmark={(item) => workspace.toggleBookmark({
                moduleId: MODULE_ID,
                moduleTitle: MODULE_TITLE,
                artifactId: item.id,
                artifactTitle: item.title,
              })}
              onActivityDraftChange={(value) => { setActivityDraft(value); setActivitySaved(false) }}
              onSaveActivity={savePrototypeActivity}
              onReviewNotebook={() => setNotebookMode('full')}
              isResourceSaved={(resourceId) => workspace.workspace.resources.some((item) => item.resourceId === resourceId)}
              onToggleResource={workspace.toggleResource}
            />
          )
        })}
      </main>

      <nav className="course-navigation" aria-label="Course timeline and movement controls">
        <button type="button" onClick={() => scrollToStop(activeStopIndex - 1)} disabled={activeStopIndex === 0}>← Previous</button>
        <div className="bottom-timeline">
          <div className="timeline-track" aria-hidden="true"><span style={{ width: `${(activeStopIndex / (courseStops.length - 1)) * 100}%` }} /></div>
          {timelineSegments.map((segment) => {
            const targetIndex = segment.stopId ? courseStops.findIndex((stop) => stop.id === segment.stopId) : -1
            const current = !segment.disabled && courseStops[activeStopIndex]?.eraId === segment.id
            const visited = targetIndex >= 0 && targetIndex <= activeStopIndex
            return (
              <button
                key={segment.id}
                type="button"
                disabled={segment.disabled}
                className={`${current ? 'current' : ''} ${visited ? 'visited' : ''}`}
                onClick={() => segment.stopId && navigateToStopId(segment.stopId)}
              >
                <span className="timeline-dot" aria-hidden="true" />
                <span>{segment.label}</span>
              </button>
            )
          })}
        </div>
        <button className="primary-button" type="button" onClick={() => scrollToStop(activeStopIndex + 1)} disabled={activeStopIndex === courseStops.length - 1}>Next →</button>
      </nav>

      {workspace.notebookEnabled && <Notebook mode={notebookMode} onModeChange={setNotebookMode} requestedView={notebookRequestedView} context={noteContext} notes={workspace.workspace.notes} bookmarks={workspace.workspace.bookmarks} responses={workspace.workspace.responses} quizAttempts={workspace.workspace.quizAttempts} glossaryTerms={glossaryTerms} glossaryEntries={workspace.workspace.glossaryEntries} resources={workspace.workspace.resources} resourceCatalog={placeholderResources} progress={workspace.workspace.progress} courseStops={courseStops} currentStopId={courseStops[activeStopIndex]?.id} storageStatus={workspace.storageStatus} storageMessage={workspace.storageMessage} onAddNote={workspace.addNote} onUpdateNote={workspace.updateNote} onDeleteNote={workspace.deleteNote} onToggleBookmark={workspace.toggleBookmark} onNavigateToArtifact={openArtifactFromNotebook} onNavigateToStop={navigateToGlossaryLocation} onSaveGlossaryEntry={workspace.saveGlossaryEntry} onToggleResource={workspace.toggleResource} onUpdateResourceStatus={workspace.updateResourceStatus} onStartGlossaryStudy={({ moduleId } = {}) => { setStudyInitialModuleId(moduleId || 'all'); setScreenMode('study') }} onExport={workspace.exportMarkdown} onDeleteAll={workspace.deleteAllData} onReconsiderStorage={workspace.reconsiderConsent} onRetryStorage={workspace.retryStorage} />}
      {selectedGlossaryTerm && <GlossaryTermDialog term={selectedGlossaryTerm} existingEntry={workspace.workspace.glossaryEntries.find((entry) => entry.termId === selectedGlossaryTerm.id)} onSave={saveGlossaryTerm} onClose={() => setSelectedGlossaryTerm(null)} />}
    </div>
  )
}
