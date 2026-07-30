/** Prototype written-response stop. Draft state and persistence stay in App.jsx. */
export default function ActivityStop({ draft, saved, onDraftChange, onSave }) {
  return (
    <div className="activity-prototype">
      <label htmlFor="prototype-response">What changed in your interpretation after moving among several source formats?</label>
      <textarea
        id="prototype-response"
        rows="8"
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        placeholder="Your response remains private in this browser or current session, according to the storage choice you made."
      />
      <div>
        <button className="primary-button" type="button" disabled={!draft.trim()} onClick={onSave}>Save response</button>
        {saved && <span role="status">Saved to your private notebook.</span>}
      </div>
    </div>
  )
}
