const STATUS_LABELS = {
  'awaiting-consent': 'Notebook setup required',
  loading: 'Opening private workspace',
  ready: 'Private workspace ready',
  saving: 'Saving privately',
  disabled: 'Notebook saving is off',
  unavailable: 'Notebook storage unavailable',
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
        {canRetry && onRetry && <button type="button" onClick={onRetry}>Retry</button>}
        {status === 'disabled' && onReconsider && <button type="button" onClick={onReconsider}>Enable notebook</button>}
      </div>
    </section>
  )
}
