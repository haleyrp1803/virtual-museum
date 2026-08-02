/**
 * Internal visual test fixture for reusable historical design packs.
 *
 * Open the local application with `?theme-preview` or use the temporary
 * development header control. Period-based packs stay independent of current
 * placeholder lesson/module names so later course content can adopt them by
 * assigning a `designPackId`.
 */

import { useState } from 'react'
import { DESIGN_PACKS } from '../data/eraThemes.js'

const PALETTE_ROLES = [
  ['Page', '--pack-page'],
  ['Surface', '--pack-surface'],
  ['Raised surface', '--pack-surface-raised'],
  ['Deep surface', '--pack-deep-surface'],
  ['Text', '--pack-text'],
  ['Muted text', '--pack-muted'],
  ['Primary accent', '--pack-accent-primary'],
  ['Secondary accent', '--pack-accent-secondary'],
  ['Tertiary accent', '--pack-accent-tertiary'],
  ['Accent hover', '--pack-accent-hover'],
  ['Accessible accent text', '--pack-accent-text'],
  ['Accessible action background', '--pack-action-bg'],
  ['Border', '--pack-border'],
  ['Focus', '--pack-focus'],
]

export default function ThemePreview() {
  const [selectedId, setSelectedId] = useState(DESIGN_PACKS[0].id)
  const theme = DESIGN_PACKS.find((item) => item.id === selectedId) ?? DESIGN_PACKS[0]

  return (
    <main className="theme-preview-shell">
      <header className="theme-preview-toolbar">
        <div>
          <p className="eyebrow">Internal design fixture</p>
          <h1>Historical Design Pack Preview</h1>
          <p>Compare reusable period templates against identical interface content.</p>
        </div>
        <div className="theme-preview-toolbar-actions">
          <label>
            Time period
            <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
              {DESIGN_PACKS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <a className="theme-preview-return" href={window.location.pathname}>Return to course</a>
        </div>
      </header>

      <section
        className="course-stop theme-preview-stage"
        data-era-theme={theme.id}
        data-heading-variant={theme.variants.heading}
        data-surface-variant={theme.variants.surface}
        data-frame-variant={theme.variants.frame}
        aria-labelledby="theme-preview-title"
      >
        <div className="stop-inner">
          <div className="stop-heading">
            <p className="eyebrow">{theme.label}</p>
            <p className="date-marker">{theme.periodLabel}</p>
            <h2 id="theme-preview-title">A Representative Historical Stop</h2>
            <p className="stop-summary">{theme.purpose}</p>
          </div>

          <div className="theme-preview-grid">
            <article className="theme-preview-card theme-preview-type-card">
              <p className="resource-type">Primary source</p>
              <h3>Document or artifact title</h3>
              <p className="theme-preview-subhead">A secondary heading tests the supporting historical face.</p>
              <p>This paragraph tests body typography, text color, line height, and readable contrast on a standard content surface.</p>
              <p><button type="button" className="primary-button">Primary action</button> <button type="button">Secondary action</button></p>
            </article>

            <article className="theme-preview-card theme-preview-media">
              <div aria-hidden="true">Media or image frame</div>
              <p className="resource-creator">Caption, provenance, and rights information.</p>
            </article>

            <article className="theme-preview-card">
              <h3>Interactive states</h3>
              <label htmlFor="theme-preview-response">Private response</label>
              <textarea id="theme-preview-response" defaultValue="A learner-authored note remains legible inside the period treatment." />
              <p><a href="#theme-preview-title">Example text link</a></p>
            </article>
          </div>

          <section className="theme-preview-palette" aria-labelledby="theme-preview-palette-title">
            <h3 id="theme-preview-palette-title">Approved semantic palette</h3>
            <p>These tokens define the approved palette and its accessible functional roles. Decorative accents remain distinct from colors used for text and primary actions.</p>
            <div className="theme-preview-swatches">
              {PALETTE_ROLES.map(([label, variable]) => (
                <div className="theme-preview-swatch" key={variable}>
                  <div className="theme-preview-swatch-color" style={{ '--swatch-color': `var(${variable})` }} />
                  <div className="theme-preview-swatch-label">
                    <strong>{label}</strong>
                    <code>{variable}</code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {theme.designCues && (
            <section className="theme-preview-cues" aria-labelledby="theme-preview-cues-title">
              <h3 id="theme-preview-cues-title">Design cues</h3>
              <ul>
                {theme.designCues.map((cue) => <li key={cue}>{cue}</li>)}
              </ul>
            </section>
          )}

          {theme.transitionDetails && (
            <section className="theme-preview-transition-logic" aria-labelledby="theme-preview-transition-title">
              <h3 id="theme-preview-transition-title">Intentional transition logic</h3>
              <p>Each threshold is composed by deciding what remains legible, what recedes, what arrives, and how visual order changes.</p>
              <div className="theme-preview-transition-grid">
                <article>
                  <h4>Persists</h4>
                  <ul>{theme.transitionDetails.persists.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
                <article>
                  <h4>Fades</h4>
                  <ul>{theme.transitionDetails.fades.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
                <article>
                  <h4>Emerges</h4>
                  <ul>{theme.transitionDetails.emerges.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
                <article>
                  <h4>Structural change</h4>
                  <p>{theme.transitionDetails.structure}</p>
                </article>
              </div>
            </section>
          )}
        </div>
      </section>

      <aside className="theme-preview-metadata" aria-label="Selected design pack metadata">
        <strong>{theme.label}</strong>
        <span>Status: {theme.status}</span>
        <span>Transition family: {theme.transitionFamily}</span>
        <span>Heading: {theme.variants.heading}</span>
        <span>Surface: {theme.variants.surface}</span>
        <span>Frame: {theme.variants.frame}</span>
        <span>Display: {theme.typography.display}</span>
        <span>Secondary: {theme.typography.secondary}</span>
        <span>Body: {theme.typography.body}</span>
        <span>Label: {theme.typography.label}</span>
        {theme.typography.accent && <span>Accent: {theme.typography.accent}</span>}
      </aside>
    </main>
  )
}
