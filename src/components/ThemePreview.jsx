/**
 * Internal visual test fixture for the era-theme system.
 *
 * Open the local application with `?theme-preview` to compare every registered
 * era against identical representative content. This surface is deliberately
 * outside the learner course and persistence lifecycle; it exists to make
 * token and variant changes reviewable before they enter historical stops.
 */

import { useState } from 'react'
import { ERA_THEMES } from '../data/eraThemes.js'

export default function ThemePreview() {
  const [selectedId, setSelectedId] = useState(ERA_THEMES[0].id)
  const theme = ERA_THEMES.find((item) => item.id === selectedId) ?? ERA_THEMES[0]

  return (
    <main className="theme-preview-shell">
      <header className="theme-preview-toolbar">
        <div>
          <p className="eyebrow">Internal design fixture</p>
          <h1>Era Theme Preview</h1>
          <p>Compare identical interface elements while changing only the registered era theme.</p>
        </div>
        <label>
          Preview theme
          <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)}>
            {ERA_THEMES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
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
            <p className="date-marker">Theme fixture</p>
            <h2 id="theme-preview-title">A Representative Historical Stop</h2>
            <p className="stop-summary">{theme.purpose}</p>
          </div>

          <div className="theme-preview-grid">
            <article className="theme-preview-card">
              <p className="resource-type">Primary source</p>
              <h3>Document or artifact title</h3>
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
              <textarea id="theme-preview-response" defaultValue="A learner-authored note remains legible inside the era treatment." />
              <p><a href="#theme-preview-title">Example text link</a></p>
            </article>
          </div>
        </div>
      </section>

      <aside className="theme-preview-metadata" aria-label="Selected theme metadata">
        <strong>{theme.label}</strong>
        <span>Transition family: {theme.transitionFamily}</span>
        <span>Heading: {theme.variants.heading}</span>
        <span>Surface: {theme.variants.surface}</span>
        <span>Frame: {theme.variants.frame}</span>
      </aside>
    </main>
  )
}
