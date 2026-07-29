import { useMemo, useState } from 'react'

function WrittenResponse({ activity, savedResponse, onSave }) {
  const [text, setText] = useState(savedResponse?.text ?? '')
  const [savedNotice, setSavedNotice] = useState(false)

  const save = () => {
    if (!text.trim()) return
    onSave(activity, { text: text.trim() })
    setSavedNotice(true)
    window.setTimeout(() => setSavedNotice(false), 1600)
  }

  return (
    <div className="activity-response-area">
      <label htmlFor={`activity-${activity.id}`}>Your private response</label>
      <textarea id={`activity-${activity.id}`} rows="6" value={text} onChange={(event) => setText(event.target.value)} placeholder="Write an observation or provisional interpretation." />
      <div className="activity-actions">
        <button className="primary-button" type="button" onClick={save} disabled={!text.trim()}>Save to notebook</button>
        {savedNotice && <span className="saved-confirmation" role="status">Saved privately.</span>}
      </div>
    </div>
  )
}

function MultipleChoice({ activity, latestAttempt, onSubmit }) {
  const [selection, setSelection] = useState(latestAttempt?.selectedOptionId ?? '')
  const [feedback, setFeedback] = useState(latestAttempt ? {
    correct: latestAttempt.correct,
    text: latestAttempt.feedback,
  } : null)

  const submit = () => {
    if (!selection) return
    const correct = selection === activity.correctOptionId
    const text = correct ? activity.feedback.correct : activity.feedback.incorrect
    onSubmit(activity, { selectedOptionId: selection, correct, feedback: text })
    setFeedback({ correct, text })
  }

  return (
    <div className="quiz-area">
      <fieldset>
        <legend className="sr-only">{activity.prompt}</legend>
        {activity.options.map((option) => (
          <label className="quiz-option" key={option.id}>
            <input type="radio" name={activity.id} value={option.id} checked={selection === option.id} onChange={() => setSelection(option.id)} />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>
      <button className="primary-button" type="button" onClick={submit} disabled={!selection}>Check response</button>
      {feedback && <div className={`quiz-feedback ${feedback.correct ? 'feedback-correct' : 'feedback-revisit'}`} role="status"><strong>{feedback.correct ? 'Supported by the prototype evidence' : 'Revisit the room'}</strong><p>{feedback.text}</p></div>}
    </div>
  )
}

function CompareResponse({ activity, savedResponse, onSave }) {
  const [text, setText] = useState(savedResponse?.text ?? '')
  const [showComparison, setShowComparison] = useState(Boolean(savedResponse))

  const compare = () => {
    if (!text.trim()) return
    onSave(activity, { text: text.trim() })
    setShowComparison(true)
  }

  return (
    <div className="activity-response-area">
      <label htmlFor={`activity-${activity.id}`}>Your interpretation</label>
      <textarea id={`activity-${activity.id}`} rows="6" value={text} onChange={(event) => setText(event.target.value)} placeholder="Develop your answer before opening the comparison." />
      <button className="primary-button" type="button" onClick={compare} disabled={!text.trim()}>Save and compare</button>
      {showComparison && <div className="comparison-panel"><p className="eyebrow">One historian’s comparison</p><p>{activity.comparison}</p><p className="comparison-note">This is not a single correct answer. Compare its emphasis and evidence with your own response.</p></div>}
    </div>
  )
}

export default function LearningActivities({ activities, responses, quizAttempts, onSaveResponse, onSubmitQuiz }) {
  const responseByActivity = useMemo(() => new Map(responses.map((response) => [response.activityId, response])), [responses])
  const latestAttemptByActivity = useMemo(() => {
    const attempts = new Map()
    quizAttempts.forEach((attempt) => attempts.set(attempt.activityId, attempt))
    return attempts
  }, [quizAttempts])

  return (
    <section className="learning-activities" aria-labelledby="activities-title">
      <div className="section-intro"><p className="eyebrow">Guided learning activities</p><h2 id="activities-title">Pause, practice, and reflect</h2><p>Your responses remain in your private notebook. These prototype activities test the site infrastructure rather than finalized historical content.</p></div>
      <div className="activity-list">
        {activities.map((activity, index) => (
          <article className="activity-card" key={activity.id}>
            <div className="activity-heading"><span className="activity-number">Activity {index + 1}</span><span className="activity-type">{activity.type === 'multiple-choice' ? 'Knowledge check' : activity.type === 'compare-response' ? 'Interpretive comparison' : 'Written observation'}</span></div>
            <h3>{activity.title}</h3>
            <p className="activity-prompt">{activity.prompt}</p>
            {activity.type === 'written-response' && <WrittenResponse activity={activity} savedResponse={responseByActivity.get(activity.id)} onSave={onSaveResponse} />}
            {activity.type === 'multiple-choice' && <MultipleChoice activity={activity} latestAttempt={latestAttemptByActivity.get(activity.id)} onSubmit={onSubmitQuiz} />}
            {activity.type === 'compare-response' && <CompareResponse activity={activity} savedResponse={responseByActivity.get(activity.id)} onSave={onSaveResponse} />}
          </article>
        ))}
      </div>
    </section>
  )
}
