/**
 * Accessible artifact media renderer.
 *
 * Selects the correct text, image, audio, or video presentation from an
 * artifact record and keeps transcripts, captions, descriptions, and source
 * notices available independently of media playback.
 */

import { useId, useState } from 'react'

function Transcript({ transcript, label = 'Transcript' }) {
  const [open, setOpen] = useState(false)
  const regionId = useId()
  if (!transcript) return null

  return (
    <div className="transcript-block">
      <button
        className="secondary-button transcript-toggle"
        type="button"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? `Hide ${label.toLowerCase()}` : `Read ${label.toLowerCase()}`}
      </button>
      {open && (
        <div id={regionId} className="transcript-panel" tabIndex="-1">
          <h3>{label}</h3>
          {transcript.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      )}
    </div>
  )
}

function SourceDisclosure({ media }) {
  if (media.sourceType !== 'external') return null
  return (
    <aside className="external-media-disclosure">
      <strong>External media</strong>
      <p>This artifact is supplied by {media.provider || 'another website'}. Opening or playing it may share technical information with that provider under its own privacy policy.</p>
    </aside>
  )
}

export default function ArtifactMedia({ artifact }) {
  const media = artifact.media ?? {}

  if (artifact.type === 'Text') {
    return (
      <div className="artifact-media artifact-text-media">
        <p className="media-label">Prototype transcription</p>
        <blockquote>
          {media.excerpt}
        </blockquote>
        <p className="media-description">{media.context}</p>
        <Transcript transcript={media.transcript} label="Full transcription" />
      </div>
    )
  }

  if (artifact.type === 'Image') {
    return (
      <div className="artifact-media artifact-image-media">
        <figure>
          <img src={media.src} alt={media.alt} />
          <figcaption>{media.caption}</figcaption>
        </figure>
        {media.longDescription && (
          <details className="long-description">
            <summary>Read extended image description</summary>
            <p>{media.longDescription}</p>
          </details>
        )}
        <SourceDisclosure media={media} />
      </div>
    )
  }

  if (artifact.type === 'Audio') {
    return (
      <div className="artifact-media artifact-av-media">
        <p className="media-label">Prototype audio</p>
        <audio controls preload="metadata">
          <source src={media.src} type={media.mimeType || 'audio/wav'} />
          Your browser does not support embedded audio. Use the transcript below instead.
        </audio>
        <p className="media-description">{media.description}</p>
        <Transcript transcript={media.transcript} />
        <SourceDisclosure media={media} />
      </div>
    )
  }

  if (artifact.type === 'Video') {
    return (
      <div className="artifact-media artifact-av-media">
        <p className="media-label">Prototype video</p>
        <video controls preload="metadata" playsInline>
          <source src={media.src} type={media.mimeType || 'video/mp4'} />
          {media.captions && <track kind="captions" src={media.captions} srcLang="en" label="English" default />}
          Your browser does not support embedded video. Use the transcript below instead.
        </video>
        <p className="media-description">{media.description}</p>
        <Transcript transcript={media.transcript} />
        <SourceDisclosure media={media} />
      </div>
    )
  }

  return <div className="inspection-placeholder">This artifact type is not yet configured.</div>
}
