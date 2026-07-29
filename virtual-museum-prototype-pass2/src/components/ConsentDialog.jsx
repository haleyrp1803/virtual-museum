export default function ConsentDialog({ onAccept, onDecline, storageSupported = true }) {
  return (
    <div className="consent-backdrop" role="presentation">
      <section className="consent-dialog" role="dialog" aria-modal="true" aria-labelledby="consent-title" aria-describedby="consent-description">
        <p className="eyebrow">Private learning workspace</p>
        <h2 id="consent-title">Choose whether to save work on this device</h2>
        <div id="consent-description">
          <p>
            With your consent, notes, responses, quiz results, and progress are stored only in this browser on this device.
            They are not sent to the museum or visible to its curators.
          </p>
          <p>
            Clearing browser data, using private browsing, or changing devices may erase your work. Export your notebook as
            a Markdown file whenever you need a permanent copy.
          </p>
          {!storageSupported && (
            <p className="status-message status-error">
              This browser does not provide the local database required for notebook saving. You may still explore the museum.
            </p>
          )}
        </div>
        <div className="consent-actions">
          <button className="primary-button" type="button" onClick={onAccept} autoFocus disabled={!storageSupported}>
            Consent and enable notebook
          </button>
          <button className="secondary-button" type="button" onClick={onDecline}>
            Explore without saving
          </button>
        </div>
      </section>
    </div>
  )
}
