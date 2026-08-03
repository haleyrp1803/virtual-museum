/**
 * Development-only representative stop for reviewing an era pack in the live
 * horizontal course. Candidate assets act as layered page or card materials;
 * they never stand in for historical evidence or lesson media.
 *
 * Pass A keeps all three review regions inside the fixed course viewport. The
 * later composition pass may replace this specimen structure with distinct
 * pedagogical archetypes; this component therefore avoids encoding decorative
 * layout assumptions beyond the three required review functions.
 */
export default function DesignSampleStop({ sample }) {
  if (!sample) return null

  const texturedCardStyle = sample.cardAsset
    ? { '--design-sample-card-asset': `url("${sample.cardAsset}")` }
    : undefined

  return (
    <div
      className={`design-sample-grid theme-preview-grid design-sample-${sample.variant ?? 'framing'}`}
      aria-label={`${sample.label} design sample`}
    >
      <article
        className={`design-sample-card theme-preview-card design-sample-information-card${sample.cardAsset ? ' design-sample-card-textured' : ''} card-treatment-${sample.cardTreatment ?? 'solid'}`}
        style={texturedCardStyle}
      >
        <div className="design-sample-card-inset">
          <p className="eyebrow">Information-card treatment</p>
          <h2>{sample.sourceTitle}</h2>
          <p>{sample.sourceText}</p>
          <div className="design-sample-actions">
            <button className="primary-button" type="button">Primary action</button>
            <button type="button">Secondary action</button>
          </div>
        </div>
      </article>

      <article className="design-sample-card theme-preview-card design-sample-context-card">
        <p className="eyebrow">Layering note</p>
        <h2>Material and pattern study</h2>
        <p>{sample.caption}</p>
        <p className="design-sample-asset-note">
          {sample.pageAsset && sample.cardAsset
            ? 'This stop layers a page field with one bounded card texture; readable content remains on solid insets.'
            : sample.pageAsset
              ? 'This candidate is staged as a restrained page field behind solid content layers.'
              : sample.cardAsset
                ? 'This stronger candidate is confined to one card while the page remains quiet.'
                : 'This sample relies on the accepted era pack without an additional candidate asset.'}
        </p>
      </article>

      <article className="design-sample-card theme-preview-card design-sample-response-card">
        <h2>Interactive states</h2>
        <label htmlFor={`sample-response-${sample.id}`}>Private response</label>
        <textarea id={`sample-response-${sample.id}`} defaultValue={sample.response} rows="3" />
        <a href={`#${sample.id}`}>Example text link</a>
      </article>
    </div>
  )
}
