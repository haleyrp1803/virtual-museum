import { useMemo, useState } from 'react'
import ConsentDialog from './components/ConsentDialog.jsx'
import Notebook from './components/Notebook.jsx'
import StorageStatus from './components/StorageStatus.jsx'
import { supportsIndexedDb } from './storage/workspaceDb.js'
import { modules, sampleArtifacts } from './data/modules.js'
import { useLocalWorkspace } from './hooks/useLocalWorkspace.js'

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState(null)
  const [activeArtifactId, setActiveArtifactId] = useState(null)
  const [notebookMode, setNotebookMode] = useState('minimized')
  const workspace = useLocalWorkspace()

  const activeModule = modules.find((module) => module.id === activeModuleId) ?? null
  const activeArtifact = sampleArtifacts.find((artifact) => artifact.id === activeArtifactId) ?? null
  const noteContext = useMemo(() => ({
    moduleId: activeModule?.id ?? null,
    moduleTitle: activeModule?.title ?? null,
    artifactId: activeArtifact?.id ?? null,
    artifactTitle: activeArtifact?.title ?? null,
  }), [activeArtifact, activeModule])

  const returnHome = () => {
    setActiveModuleId(null)
    setActiveArtifactId(null)
  }

  return (
    <div className={`app-shell notebook-${notebookMode}`}>
      {!workspace.consentResolved && (
        <ConsentDialog
          onAccept={workspace.acceptConsent}
          onDecline={workspace.declineConsent}
          storageSupported={supportsIndexedDb()}
        />
      )}

      <header className="site-header">
        <button className="museum-wordmark" type="button" onClick={returnHome}>
          <span>Virtual Museum</span>
          <small>History of Education</small>
        </button>
        <nav aria-label="Primary navigation">
          <button type="button" onClick={returnHome}>Entrance Hall</button>
          <button
            type="button"
            onClick={() => workspace.notebookEnabled ? setNotebookMode('full') : workspace.reconsiderConsent()}
          >
            My Notebook
          </button>
        </nav>
      </header>

      <StorageStatus
        status={workspace.storageStatus}
        message={workspace.storageMessage}
        onRetry={workspace.retryStorage}
        onReconsider={workspace.reconsiderConsent}
      />

      <main id="main-content">
        {!activeModule && (
          <>
            <section className="hero">
              <p className="eyebrow">A self-paced, professor-guided field trip</p>
              <h1>Explore how education became an institution—and who it included.</h1>
              <p className="hero-copy">
                Move through four provisional rooms, inspect artifacts at your own pace, and keep a private field notebook stored only in your browser.
              </p>
            </section>

            <section className="module-section" aria-labelledby="rooms-title">
              <div className="section-intro">
                <p className="eyebrow">Museum rooms</p>
                <h2 id="rooms-title">Choose a place to begin</h2>
              </div>
              <div className="module-grid">
                {modules.map((module) => (
                  <article className="module-card" key={module.id}>
                    <p className="module-number">{module.number}</p>
                    <p className="module-period">{module.period}</p>
                    <h3>{module.title}</h3>
                    <p>{module.summary}</p>
                    <button
                      className={module.status === 'prototype' ? 'primary-button' : 'secondary-button'}
                      type="button"
                      onClick={() => module.status === 'prototype' && setActiveModuleId(module.id)}
                      disabled={module.status !== 'prototype'}
                    >
                      {module.status === 'prototype' ? 'Enter prototype room' : 'Planned room'}
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        {activeModule && (
          <section className="room-page">
            <button className="back-button" type="button" onClick={returnHome}>← Entrance Hall</button>
            <div className="room-header">
              <p className="eyebrow">Prototype room · {activeModule.period}</p>
              <h1>{activeModule.title}</h1>
              <p>{activeModule.summary}</p>
            </div>

            <div className="guide-card">
              <div className="guide-avatar" aria-hidden="true">GW</div>
              <div>
                <p className="eyebrow">Your professor-curator</p>
                <h2>Welcome to the room</h2>
                <p>This placeholder establishes where Georga’s recorded, written, or audiovisual guidance will orient visitors before they explore independently.</p>
              </div>
            </div>

            <div className="artifact-grid" aria-label="Prototype artifact stations">
              {sampleArtifacts.map((artifact) => (
                <article className={`artifact-card ${activeArtifactId === artifact.id ? 'selected' : ''}`} key={artifact.id}>
                  <div className="artifact-placeholder" aria-hidden="true">{artifact.type}</div>
                  <p className="artifact-type">{artifact.type}</p>
                  <h2>{artifact.title}</h2>
                  <p>{artifact.description}</p>
                  <div className="artifact-actions">
                    <button type="button" onClick={() => setActiveArtifactId(artifact.id)}>Inspect artifact</button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveArtifactId(artifact.id)
                        if (workspace.notebookEnabled) setNotebookMode('side')
                        else workspace.reconsiderConsent()
                      }}
                    >
                      Annotate
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {activeArtifact && (
              <section className="inspection-card" aria-labelledby="inspection-title">
                <p className="eyebrow">Artifact inspection</p>
                <h2 id="inspection-title">{activeArtifact.title}</h2>
                <p>{activeArtifact.description}</p>
                <div className="inspection-placeholder">
                  Final artifact media, metadata, transcript, rights information, and Georga’s commentary will appear here.
                </div>
                <button
                  className="primary-button"
                  type="button"
                  onClick={() => workspace.notebookEnabled ? setNotebookMode('side') : workspace.reconsiderConsent()}
                >
                  Add a notebook observation
                </button>
              </section>
            )}
          </section>
        )}
      </main>

      {workspace.notebookEnabled && (
        <Notebook
          mode={notebookMode}
          onModeChange={setNotebookMode}
          context={noteContext}
          notes={workspace.workspace.notes}
          storageStatus={workspace.storageStatus}
          storageMessage={workspace.storageMessage}
          onAddNote={workspace.addNote}
          onDeleteNote={workspace.deleteNote}
          onExport={workspace.exportMarkdown}
          onDeleteAll={workspace.deleteAllData}
        />
      )}
    </div>
  )
}
