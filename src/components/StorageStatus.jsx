/**
 * Legacy standalone storage-status presentation.
 *
 * The active horizontal-course interface now places storage controls inside
 * the Field Notebook. Confirm imports before modifying or removing this
 * compatibility component.
 */

const STATUS_LABELS = {
  'awaiting-consent': 'Notebook setup required',
  loading: 'Opening private workspace',
  ready: 'Persistent private notebook',
  saving: 'Saving privately',
  session: 'Session-only notebook',
  unavailable: 'Persistent storage unavailable',
  error: 'Notebook storage needs attention',
}

export default function StorageStatus({ status, message, onRetry, onReconsider }) {
  if (!message) return null

  const canRetry = status === 'error' || status === 'unavailable'
  return (
    <section className={`storage-status storage-${status}`} aria-live="polite" aria-atomic="true">
      <div>
        <strong>{STATUS_LABELS[status] ?? 'Private workspace'}</strong>
        <span>{message}</span>
      </div>
      <div className="storage-status-actions">
        {canRetry && onRetry && <button type="button" onClick={onRetry}>Try persistent saving</button>}
        {status === 'session' && onRetry && <button type="button" onClick={onRetry}>Save this notebook on this device</button>}
        {onReconsider && <button type="button" onClick={onReconsider}>Review notebook choices</button>}
      </div>
    </section>
  )
}
