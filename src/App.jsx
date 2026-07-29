import { useEffect, useMemo, useRef, useState } from 'react'
import ConsentDialog from './components/ConsentDialog.jsx'
import ArtifactMedia from './components/ArtifactMedia.jsx'
import LearningActivities from './components/LearningActivities.jsx'
import Notebook from './components/Notebook.jsx'
import StorageStatus from './components/StorageStatus.jsx'
import { supportsIndexedDb } from './storage/workspaceDb.js'
import { modules, sampleActivities, sampleArtifacts } from './data/modules.js'
import { useLocalWorkspace } from './hooks/useLocalWorkspace.js'

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState(null)
  const [activeArtifactId, setActiveArtifactId] = useState(null)
  const [notebookMode, setNotebookMode] = useState('minimized')
  const mainHeadingRef = useRef(null)
  const workspace = useLocalWorkspace()

  const activeModule = modules.find((module) => module.id === activeModuleId) ?? null
  const activeArtifact = sampleArtifacts.find((artifact) => artifact.id === activeArtifactId) ?? null
  const moduleArtifacts = activeModule ? sampleArtifacts.filter((artifact) => artifact.moduleId === activeModule.id) : []
  const moduleActivities = activeModule ? sampleActivities.filter((activity) => activity.moduleId === activeModule.id).map((activity) => ({ ...activity, moduleTitle: activeModule.title })) : []
  const moduleProgress = activeModule ? workspace.workspace.progress[activeModule.id] ?? { artifactsViewed: [], activitiesAttempted: [] } : { artifactsViewed: [], activitiesAttempted: [] }
  const moduleResponses = activeModule ? workspace.workspace.responses.filter((response) => response.moduleId === activeModule.id) : []
  const moduleQuizAttempts = activeModule ? workspace.workspace.quizAttempts.filter((attempt) => attempt.moduleId === activeModule.id) : []

  const noteContext = useMemo(() => ({
    moduleId: activeModule?.id ?? null,
    moduleTitle: activeModule?.title ?? null,
    artifactId: activeArtifact?.id ?? null,
    artifactTitle: activeArtifact?.title ?? null,
  }), [activeArtifact, activeModule])

  useEffect(() => {
    if (workspace.consentResolved) mainHeadingRef.current?.focus()
  }, [activeModuleId, workspace.consentResolved])

  useEffect(() => {
    if (!activeArtifactId) return
    window.setTimeout(() => document.querySelector('.inspection-card')?.focus(), 0)
  }, [activeArtifactId])

  const returnHome = () => {
    setActiveModuleId(null)
    setActiveArtifactId(null)
  }

  const inspectArtifact = (artifact) => {
    setActiveArtifactId(artifact.id)
    workspace.markArtifactViewed(activeModule.id, artifact.id)
  }

  const openArtifact = ({ moduleId, artifactId }) => {
    const targetModule = modules.find((module) => module.id === moduleId) ?? modules[0]
    const targetArtifact = sampleArtifacts.find((artifact) => artifact.id === artifactId)
    setActiveModuleId(targetModule.id)
    setActiveArtifactId(targetArtifact?.id ?? null)
    if (targetArtifact) workspace.markArtifactViewed(targetModule.id, targetArtifact.id)
    window.setTimeout(() => document.querySelector('.inspection-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }

  const isBookmarked = (artifactId) => workspace.workspace.bookmarks.some((bookmark) => bookmark.artifactId === artifactId)

  return (
    <div className={`app-shell notebook-mode-${notebookMode}`}>
      <a className="skip-link" href="#main-content">Skip to museum content</a>
      {!workspace.consentResolved && <ConsentDialog onAccept={workspace.acceptConsent} onDecline={workspace.useSessionNotebook} storageSupported={supportsIndexedDb()} />}

      <header className="site-header">
        <button className="museum-wordmark" type="button" onClick={returnHome}><span>Virtual Museum</span><small>History of Education</small></button>
        <nav aria-label="Primary navigation">
          <button type="button" onClick={returnHome}>Entrance Hall</button>
          <button type="button" onClick={() => workspace.notebookEnabled ? setNotebookMode('full') : workspace.reconsiderConsent()}>My Notebook</button>
        </nav>
      </header>

      <StorageStatus status={workspace.storageStatus} message={workspace.storageMessage} onRetry={workspace.retryStorage} onReconsider={workspace.reconsiderConsent} />

      <main id="main-content">
        {!activeModule && <>
          <section className="hero"><p className="eyebrow">A self-paced, professor-guided field trip</p><h1 ref={mainHeadingRef} tabIndex="-1">Explore how education became an institution—and who it included.</h1><p className="hero-copy">Move through four provisional rooms, inspect artifacts at your own pace, and keep a private field notebook stored only in your browser.</p></section>
          <section className="module-section" aria-labelledby="rooms-title">
            <div className="section-intro"><p className="eyebrow">Museum rooms</p><h2 id="rooms-title">Choose a place to begin</h2></div>
            <div className="module-grid">{modules.map((module) => <article className="module-card" key={module.id}><p className="module-number">{module.number}</p><p className="module-period">{module.period}</p><h3>{module.title}</h3><p>{module.summary}</p><button className={module.status === 'prototype' ? 'primary-button' : 'secondary-button'} type="button" onClick={() => module.status === 'prototype' && setActiveModuleId(module.id)} disabled={module.status !== 'prototype'}>{module.status === 'prototype' ? 'Enter prototype room' : 'Planned room'}</button></article>)}</div>
          </section>
        </>}

        {activeModule && <section className="room-page">
          <button className="back-button" type="button" onClick={returnHome}>← Entrance Hall</button>
          <div className="room-header"><p className="eyebrow">Prototype room · {activeModule.period}</p><h1 ref={mainHeadingRef} tabIndex="-1">{activeModule.title}</h1><p>{activeModule.summary}</p></div>

          <section className="progress-card" aria-labelledby="progress-title">
            <div><p className="eyebrow">Your visit</p><h2 id="progress-title">Room progress</h2></div>
            <div className="progress-measures">
              <div><strong>{moduleProgress.artifactsViewed?.length ?? 0} of {moduleArtifacts.length}</strong><span>artifacts explored</span></div>
              <div><strong>{moduleProgress.activitiesAttempted?.length ?? 0} of {moduleActivities.length}</strong><span>activities attempted</span></div>
            </div>
            <p>Progress is descriptive, not graded. Explore in the order and depth that serve your learning.</p>
          </section>

          <div className="guide-card"><div className="guide-avatar" aria-hidden="true">GW</div><div><p className="eyebrow">Your professor-curator</p><h2>Welcome to the room</h2><p>This placeholder establishes where Georga’s recorded, written, or audiovisual guidance will orient visitors before they explore independently.</p></div></div>
          <div className="artifact-grid" aria-label="Prototype artifact stations">{moduleArtifacts.map((artifact) => {
            const artifactContext = { moduleId: activeModule.id, moduleTitle: activeModule.title, artifactId: artifact.id, artifactTitle: artifact.title }
            const viewed = moduleProgress.artifactsViewed?.includes(artifact.id)
            return <article className={`artifact-card ${activeArtifactId === artifact.id ? 'selected' : ''}`} key={artifact.id}><div className="artifact-placeholder" aria-hidden="true">{artifact.type}</div><div className="artifact-status-line"><p className="artifact-type">{artifact.type}</p>{viewed && <span>Explored</span>}</div><h2>{artifact.title}</h2><p>{artifact.description}</p><div className="artifact-actions"><button type="button" onClick={() => inspectArtifact(artifact)}>Inspect artifact</button><button type="button" onClick={() => { inspectArtifact(artifact); setNotebookMode('side') }}>Annotate</button><button type="button" aria-pressed={isBookmarked(artifact.id)} onClick={() => workspace.toggleBookmark(artifactContext)}>{isBookmarked(artifact.id) ? 'Bookmarked' : 'Bookmark'}</button></div></article>
          })}</div>

          {activeArtifact && <section className="inspection-card" aria-labelledby="inspection-title" tabIndex="-1"><p className="eyebrow">Artifact inspection</p><h2 id="inspection-title">{activeArtifact.title}</h2><p>{activeArtifact.description}</p><ArtifactMedia artifact={activeArtifact} /><aside className="artifact-metadata" aria-label="Prototype artifact information"><div><strong>Format</strong><span>{activeArtifact.type}</span></div><div><strong>Rights</strong><span>Prototype media for interface testing</span></div><div><strong>Provenance</strong><span>Created locally for Pass 5; not a historical source</span></div></aside><div className="guide-commentary"><p className="eyebrow">Professor-curator commentary</p><p>This placeholder shows where Georga can direct attention, identify source limitations, and connect the artifact to the room’s argument without obscuring the artifact itself.</p></div><div className="artifact-actions"><button className="primary-button" type="button" onClick={() => setNotebookMode('side')}>Add a notebook observation</button><button type="button" aria-pressed={isBookmarked(activeArtifact.id)} onClick={() => workspace.toggleBookmark(noteContext)}>{isBookmarked(activeArtifact.id) ? 'Remove bookmark' : 'Bookmark artifact'}</button></div></section>}

          <LearningActivities activities={moduleActivities} responses={moduleResponses} quizAttempts={moduleQuizAttempts} onSaveResponse={workspace.saveActivityResponse} onSubmitQuiz={workspace.submitQuizAttempt} />
        </section>}
      </main>

      {workspace.notebookEnabled && <Notebook mode={notebookMode} onModeChange={setNotebookMode} context={noteContext} notes={workspace.workspace.notes} bookmarks={workspace.workspace.bookmarks} responses={workspace.workspace.responses} quizAttempts={workspace.workspace.quizAttempts} storageStatus={workspace.storageStatus} storageMessage={workspace.storageMessage} onAddNote={workspace.addNote} onUpdateNote={workspace.updateNote} onDeleteNote={workspace.deleteNote} onToggleBookmark={workspace.toggleBookmark} onNavigateToArtifact={openArtifact} onExport={workspace.exportMarkdown} onDeleteAll={workspace.deleteAllData} />}
    </div>
  )
}
