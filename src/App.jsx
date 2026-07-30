import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ConsentDialog from './components/ConsentDialog.jsx'
import ArtifactMedia from './components/ArtifactMedia.jsx'
import Notebook from './components/Notebook.jsx'
import KeyTerm from './components/KeyTerm.jsx'
import GlossaryTermDialog from './components/GlossaryTermDialog.jsx'
import GlossaryStudy from './components/GlossaryStudy.jsx'
import { supportsIndexedDb } from './storage/workspaceDb.js'
import { useLocalWorkspace } from './hooks/useLocalWorkspace.js'
import { courseArtifacts, courseStops, placeholderResources, timelineSegments } from './data/course.js'
import { getGlossaryTerm, glossaryTerms } from './data/glossary.js'

const MODULE_ID = 'early-america'
const MODULE_TITLE = 'Early America'

function PlaceholderVideo({ label = 'Georga’s course welcome video' }) {
  return (
    <div className="placeholder-video" role="group" aria-label={`${label} placeholder`}>
      <div className="placeholder-video-screen">
        <span className="play-symbol" aria-hidden="true">▶</span>
        <strong>{label}</strong>
        <small>Video, captions, transcript, and playback controls will appear here.</small>
      </div>
      <details>
        <summary>Read placeholder transcript</summary>
        <p>This transcript area demonstrates how Georga’s complete spoken orientation will remain available independently of video playback.</p>
      </details>
    </div>
  )
}

function NavigationTutorial() {
  return (
    <div className="navigation-tutorial" aria-labelledby="navigation-tutorial-title">
      <h3 id="navigation-tutorial-title">Move through the course in the way that works for you</h3>
      <ul>
        <li><kbd>Mouse wheel</kbd> or trackpad</li>
        <li><kbd>←</kbd> and <kbd>→</kbd> arrow keys</li>
        <li>Previous and Next buttons</li>
        <li>Clickable timeline segments</li>
      </ul>
      <p>No essential action requires dragging. Reduced-motion settings replace animated travel with direct movement.</p>
    </div>
  )
}

function ResourceCard({ resource }) {
  return (
    <article className="resource-card">
      <p className="resource-type">{resource.type}</p>
      <h3>{resource.title}</h3>
      <p className="resource-creator">{resource.creator}</p>
      <p>{resource.note}</p>
      <p className="resource-access"><strong>Access:</strong> {resource.access}</p>
      <button type="button" onClick={() => window.alert('Prototype only: final resources will open in a new tab with a clear external-site notice.')}>Test external resource</button>
    </article>
  )
}

export default function App() {
  const [activeStopIndex, setActiveStopIndex] = useState(0)
  const [notebookMode, setNotebookMode] = useState('minimized')
  const [activityDraft, setActivityDraft] = useState('')
  const [activitySaved, setActivitySaved] = useState(false)
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState(null)
  const [notebookRequestedView, setNotebookRequestedView] = useState(null)
  const [screenMode, setScreenMode] = useState('course')
  const courseRef = useRef(null)
  const stopRefs = useRef([])
  const wheelLockRef = useRef(false)
  const workspace = useLocalWorkspace()

  const activeStop = courseStops[activeStopIndex]
  const activeArtifact = activeStop?.artifactId ? courseArtifacts.find((artifact) => artifact.id === activeStop.artifactId) : null
  const activeEra = activeStop?.eraId ?? 'introduction'
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const noteContext = useMemo(() => ({
    moduleId: MODULE_ID,
    moduleTitle: MODULE_TITLE,
    artifactId: activeArtifact?.id ?? activeStop?.id ?? null,
    artifactTitle: activeArtifact?.title ?? activeStop?.title ?? null,
  }), [activeArtifact, activeStop])

  const scrollToStop = useCallback((index, behavior = reducedMotion ? 'auto' : 'smooth') => {
    const bounded = Math.max(0, Math.min(courseStops.length - 1, index))
    stopRefs.current[bounded]?.scrollIntoView({ behavior, inline: 'start', block: 'nearest' })
    setActiveStopIndex(bounded)
  }, [reducedMotion])

  const navigateToStopId = useCallback((stopId) => {
    const index = courseStops.findIndex((stop) => stop.id === stopId)
    if (index >= 0) scrollToStop(index)
  }, [scrollToStop])

  useEffect(() => {
    const root = courseRef.current
    if (!root) return undefined
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return
      const index = Number(visible.target.dataset.stopIndex)
      if (Number.isFinite(index)) setActiveStopIndex(index)
    }, { root, threshold: [0.45, 0.65, 0.85] })
    stopRefs.current.forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) return
      if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); scrollToStop(activeStopIndex + 1) }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); scrollToStop(activeStopIndex - 1) }
      if (event.key === 'Home') { event.preventDefault(); scrollToStop(0) }
      if (event.key === 'End') { event.preventDefault(); scrollToStop(courseStops.length - 1) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeStopIndex, scrollToStop])

  const handleWheel = (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
    event.preventDefault()
    if (wheelLockRef.current || Math.abs(event.deltaY) < 18) return
    wheelLockRef.current = true
    scrollToStop(activeStopIndex + (event.deltaY > 0 ? 1 : -1))
    window.setTimeout(() => { wheelLockRef.current = false }, reducedMotion ? 180 : 650)
  }

  const savePrototypeActivity = () => {
    const text = activityDraft.trim()
    if (!text) return
    workspace.saveActivityResponse({
      id: 'early-america-prototype-response',
      moduleId: MODULE_ID,
      moduleTitle: MODULE_TITLE,
      activityTitle: 'Pause and Respond',
      prompt: 'What changed in your interpretation after moving among several source formats?',
      text,
      type: 'written-response',
    })
    setActivitySaved(true)
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
    return <GlossaryStudy terms={glossaryTerms} entries={workspace.workspace.glossaryEntries} onExit={() => setScreenMode('course')} />
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
          const artifact = stop.artifactId ? courseArtifacts.find((item) => item.id === stop.artifactId) : null
          const pairedArtifacts = stop.artifactIds ? stop.artifactIds.map((id) => courseArtifacts.find((item) => item.id === id)).filter(Boolean) : []
          return (
            <section key={stop.id} id={stop.id} data-stop-index={index} ref={(node) => { stopRefs.current[index] = node }} className={`course-stop stop-${stop.type} stop-era-${stop.eraId}`} aria-labelledby={`${stop.id}-title`}>
              <div className="stop-inner">
                <div className="stop-heading">
                  <p className="eyebrow">{stop.eyebrow}</p>
                  <p className="date-marker">{stop.dateLabel}</p>
                  <h1 id={`${stop.id}-title`}>{stop.title}</h1>
                  {stop.summary && <p className="stop-summary">{stop.summary}</p>}
                </div>

                {stop.type === 'introduction' && <div className="intro-layout"><PlaceholderVideo /><NavigationTutorial /><button className="primary-button begin-course" type="button" onClick={() => scrollToStop(1)}>Begin course →</button></div>}

                {stop.type === 'era-intro' && <div className="era-threshold"><div className="era-number">01</div><div><h2>Historical cluster</h2><p>Within this era, sources and activities explore <KeyTerm term={getGlossaryTerm('household-education')} onSelect={selectGlossaryTerm} /> while Georga’s guidance keeps the historical cluster spatially and thematically connected.</p><button className="primary-button" type="button" onClick={() => scrollToStop(index + 1)}>Enter Early America →</button></div></div>}

                {stop.type === 'artifact' && artifact && <div className="source-stop-layout">
                  <div className="source-stage" onMouseEnter={() => markArtifact(artifact)}><ArtifactMedia artifact={artifact} /></div>
                  <aside className="source-guidance"><p className="eyebrow">Professor guidance</p><h2>{artifact.title}</h2><p>{artifact.description}</p>{artifact.id === 'family-text-01' ? <p>This <KeyTerm term={getGlossaryTerm('primary-source')} onSelect={selectGlossaryTerm} /> invites <KeyTerm term={getGlossaryTerm('close-reading')} onSelect={selectGlossaryTerm} /> before Georga directs attention to its historical significance.</p> : <p>This placeholder indicates where Georga can direct attention without replacing the student’s own encounter with the source.</p>}<div className="source-actions"><button type="button" onClick={() => { markArtifact(artifact); setNotebookMode('side') }}>Annotate in notebook</button><button type="button" aria-pressed={isBookmarked(artifact.id)} onClick={() => workspace.toggleBookmark({ moduleId: MODULE_ID, moduleTitle: MODULE_TITLE, artifactId: artifact.id, artifactTitle: artifact.title })}>{isBookmarked(artifact.id) ? 'Bookmarked' : 'Bookmark source'}</button></div></aside>
                </div>}

                {stop.type === 'media-pair' && <div className="media-pair">{pairedArtifacts.map((item) => <article key={item.id} className="media-pair-card" onMouseEnter={() => markArtifact(item)}><ArtifactMedia artifact={item} /><h2>{item.title}</h2><p>{item.description}</p>{item.id === 'family-audio-01' && <p>The final lesson can identify this source as an <KeyTerm term={getGlossaryTerm('oral-history')} onSelect={selectGlossaryTerm} /> and ask students to define the form in their own words.</p>}<div className="source-actions"><button type="button" onClick={() => { markArtifact(item); setNotebookMode('side') }}>Take notes</button><button type="button" aria-pressed={isBookmarked(item.id)} onClick={() => workspace.toggleBookmark({ moduleId: MODULE_ID, moduleTitle: MODULE_TITLE, artifactId: item.id, artifactTitle: item.title })}>{isBookmarked(item.id) ? 'Bookmarked' : 'Bookmark'}</button></div></article>)}</div>}

                {stop.type === 'activity' && <div className="activity-prototype"><label htmlFor="prototype-response">What changed in your interpretation after moving among several source formats?</label><textarea id="prototype-response" rows="8" value={activityDraft} onChange={(event) => { setActivityDraft(event.target.value); setActivitySaved(false) }} placeholder="Your response remains private in this browser or current session, according to the storage choice you made." /><div><button className="primary-button" type="button" disabled={!activityDraft.trim()} onClick={savePrototypeActivity}>Save response</button>{activitySaved && <span role="status">Saved to your private notebook.</span>}</div></div>}

                {stop.type === 'synthesis' && <div className="synthesis-layout"><PlaceholderVideo label="Georga’s Module 1 synthesis" /><div className="synthesis-card"><h2>Review before leaving the module</h2><p>Students can use <KeyTerm term={getGlossaryTerm('historical-context')} onSelect={selectGlossaryTerm} /> to reconnect earlier sources, open their notebook, or continue into optional further study.</p><button type="button" onClick={() => setNotebookMode('full')}>Review notebook</button></div></div>}

                {stop.type === 'resources' && <div className="resource-grid">{placeholderResources.map((resource) => <ResourceCard key={resource.id} resource={resource} />)}</div>}

                {stop.type === 'transition' && <div className="transition-experience"><div className="transition-domestic"><span>handwritten</span><span>household</span><span>local</span></div><div className="transition-arrow" aria-hidden="true">→</div><div className="transition-institutional"><span>printed</span><span><KeyTerm term={getGlossaryTerm('standardization')} onSelect={selectGlossaryTerm} /></span><span>public</span></div><p>The visual grammar becomes more regular as the course approaches the common-school era. Final transitions may use sound, typography, archival materials, and restrained animation.</p></div>}

                {stop.type === 'next-era' && <div className="next-era-landing"><div className="slate-placeholder"><span>Module 2</span><strong>Common School</strong></div><div><h2>A new visual system</h2><p>The <KeyTerm term={getGlossaryTerm('common-school')} onSelect={selectGlossaryTerm} /> movement and expanding <KeyTerm term={getGlossaryTerm('public-schooling')} onSelect={selectGlossaryTerm} /> introduce a more regular, institutional visual system.</p><button type="button" onClick={() => scrollToStop(0)}>Return to course introduction</button></div></div>}
              </div>
            </section>
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

      {workspace.notebookEnabled && <Notebook mode={notebookMode} onModeChange={setNotebookMode} requestedView={notebookRequestedView} context={noteContext} notes={workspace.workspace.notes} bookmarks={workspace.workspace.bookmarks} responses={workspace.workspace.responses} quizAttempts={workspace.workspace.quizAttempts} glossaryTerms={glossaryTerms} glossaryEntries={workspace.workspace.glossaryEntries} storageStatus={workspace.storageStatus} storageMessage={workspace.storageMessage} onAddNote={workspace.addNote} onUpdateNote={workspace.updateNote} onDeleteNote={workspace.deleteNote} onToggleBookmark={workspace.toggleBookmark} onNavigateToArtifact={openArtifactFromNotebook} onNavigateToStop={navigateToGlossaryLocation} onSaveGlossaryEntry={workspace.saveGlossaryEntry} onStartGlossaryStudy={() => setScreenMode('study')} onExport={workspace.exportMarkdown} onDeleteAll={workspace.deleteAllData} onReconsiderStorage={workspace.reconsiderConsent} onRetryStorage={workspace.retryStorage} />}
      {selectedGlossaryTerm && <GlossaryTermDialog term={selectedGlossaryTerm} existingEntry={workspace.workspace.glossaryEntries.find((entry) => entry.termId === selectedGlossaryTerm.id)} onSave={saveGlossaryTerm} onClose={() => setSelectedGlossaryTerm(null)} />}
    </div>
  )
}
