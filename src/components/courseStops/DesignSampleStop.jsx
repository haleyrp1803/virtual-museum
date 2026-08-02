/**
 * Development-only representative stop for reviewing an era pack in the live
 * horizontal course. Content remains intentionally generic so visual decisions
 * can be assessed without implying that Georga's historical lesson is written.
 */
export default function DesignSampleStop({ sample }) {
  if (!sample) return null

  return (
    <div className="design-sample-grid theme-preview-grid" aria-label={`${sample.label} design sample`}>
      <article className="design-sample-card theme-preview-card">
        <p className="eyebrow">Primary source treatment</p>
        <h2>{sample.sourceTitle}</h2>
        <p>{sample.sourceText}</p>
        <button className="primary-button" type="button">Primary action</button>
        <button type="button">Secondary action</button>
      </article>

      <article className="design-sample-card theme-preview-card design-sample-media theme-preview-media">
        <div role="img" aria-label="Placeholder media frame for visual design review">
          <span>Media or image frame</span>
        </div>
        <p>{sample.caption}</p>
      </article>

      <article className="design-sample-card theme-preview-card">
        <h2>Interactive states</h2>
        <label htmlFor={`sample-response-${sample.id}`}>Private response</label>
        <textarea id={`sample-response-${sample.id}`} defaultValue={sample.response} rows="4" />
        <a href={`#${sample.id}`}>Example text link</a>
      </article>
    </div>
  )
}
