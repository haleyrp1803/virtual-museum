/**
 * First-use learner-storage choice dialog.
 *
 * Explains persistent versus session-only notebook use and reports the
 * learner's choice to the workspace hook; it does not write browser storage
 * directly.
 */

export default function ConsentDialog({ onAccept, onDecline, storageSupported = true }) {
  return (
    <div className="consent-backdrop" role="presentation">
      <section className="consent-dialog" role="dialog" aria-modal="true" aria-labelledby="consent-title" aria-describedby="consent-description">
        <p className="eyebrow">Private learning workspace</p>
        <h2 id="consent-title">Choose how your notebook should work</h2>
        <div id="consent-description">
          <p>
            You can save notes, responses, quiz results, and progress privately in this browser on this device, or use the
            complete notebook only for the current browser session.
          </p>
          <p>
            Nothing is sent to the museum or visible to its curators. Session-only work disappears when the browser session
            ends. Persistently saved work may be erased if you clear browser data or change devices. You can export your
            notebook as a Markdown file in either mode.
          </p>
          {!storageSupported && (
            <p className="status-message status-error">
              Persistent browser storage is unavailable, but the session-only notebook remains available.
            </p>
          )}
        </div>
        <div className="consent-actions">
          <button className="primary-button" type="button" onClick={onAccept} autoFocus disabled={!storageSupported}>
            Save privately on this device
          </button>
          <button className="secondary-button" type="button" onClick={onDecline}>
            Use notebook for this session only
          </button>
        </div>
      </section>
    </div>
  )
}
