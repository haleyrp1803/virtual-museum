import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  clearWorkspaceDatabase,
  newEmptyWorkspace,
  normalizeWorkspace,
  readWorkspace,
  supportsIndexedDb,
  writeWorkspace,
} from '../storage/workspaceDb.js'

const PERSISTENT_CONSENT_KEY = 'virtual-museum-storage-consent-v2'
const SESSION_MODE_KEY = 'virtual-museum-session-mode-v1'
const SESSION_WORKSPACE_KEY = 'virtual-museum-session-workspace-v1'
const CONSENT_NOTICE_VERSION = '2.1'

function readInitialChoice() {
  try {
    const stored = window.localStorage.getItem(PERSISTENT_CONSENT_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (parsed?.noticeVersion === CONSENT_NOTICE_VERSION && parsed?.choice === 'accepted') return 'accepted'
    }
  } catch {}

  try {
    return window.sessionStorage.getItem(SESSION_MODE_KEY) === 'session' ? 'session' : 'undecided'
  } catch {
    return 'undecided'
  }
}

function readSessionWorkspace() {
  try {
    const stored = window.sessionStorage.getItem(SESSION_WORKSPACE_KEY)
    return stored ? normalizeWorkspace(JSON.parse(stored)) : newEmptyWorkspace()
  } catch {
    return newEmptyWorkspace()
  }
}

function storePersistentConsent() {
  window.localStorage.setItem(PERSISTENT_CONSENT_KEY, JSON.stringify({
    choice: 'accepted',
    noticeVersion: CONSENT_NOTICE_VERSION,
    decidedAt: new Date().toISOString(),
  }))
}

function createId(prefix) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function cleanContext(item = {}) {
  return {
    artifactId: item.artifactId ?? null,
    artifactTitle: item.artifactTitle ?? null,
    moduleId: item.moduleId ?? null,
    moduleTitle: item.moduleTitle ?? null,
  }
}

export function useLocalWorkspace() {
  const initialChoice = readInitialChoice()
  const [consentChoice, setConsentChoice] = useState(initialChoice)
  const [workspace, setWorkspace] = useState(() => initialChoice === 'session' ? readSessionWorkspace() : newEmptyWorkspace())
  const [storageStatus, setStorageStatus] = useState(() => initialChoice === 'accepted' ? 'loading' : initialChoice === 'session' ? 'session' : 'awaiting-consent')
  const [storageMessage, setStorageMessage] = useState(() => initialChoice === 'session' ? 'Notebook work is available only in this browser tab and will be cleared when the session ends.' : '')
  const hasLoadedRef = useRef(false)
  const saveSequenceRef = useRef(0)

  const loadWorkspace = useCallback(async () => {
    if (!supportsIndexedDb()) {
      setConsentChoice('session')
      setWorkspace(readSessionWorkspace())
      setStorageStatus('session')
      setStorageMessage('Persistent storage is unavailable. Notebook work will remain only for this browser session.')
      return false
    }
    setStorageStatus('loading')
    setStorageMessage('Opening your private workspace…')
    try {
      const storedWorkspace = await readWorkspace()
      hasLoadedRef.current = true
      setWorkspace(storedWorkspace)
      setStorageStatus('ready')
      setStorageMessage('Your private workspace is stored only in this browser on this device.')
      return true
    } catch {
      hasLoadedRef.current = false
      setConsentChoice('session')
      setWorkspace(readSessionWorkspace())
      setStorageStatus('session')
      setStorageMessage('Persistent storage could not be opened. Notebook work will remain only for this browser session.')
      return false
    }
  }, [])

  useEffect(() => {
    if (consentChoice === 'accepted' && !hasLoadedRef.current) loadWorkspace()
  }, [consentChoice, loadWorkspace])

  useEffect(() => {
    if (consentChoice !== 'accepted' || !hasLoadedRef.current) return
    const sequence = ++saveSequenceRef.current
    setStorageStatus('saving')
    setStorageMessage('Saving privately to this browser…')
    const timeoutId = window.setTimeout(async () => {
      try {
        await writeWorkspace(workspace)
        if (sequence === saveSequenceRef.current) {
          setStorageStatus('ready')
          setStorageMessage('Saved privately in this browser.')
        }
      } catch (error) {
        if (sequence === saveSequenceRef.current) {
          setStorageStatus('error')
          setStorageMessage(error instanceof Error ? error.message : 'Your latest changes could not be saved.')
        }
      }
    }, 250)
    return () => window.clearTimeout(timeoutId)
  }, [consentChoice, workspace])

  useEffect(() => {
    if (consentChoice !== 'session') return
    try {
      window.sessionStorage.setItem(SESSION_MODE_KEY, 'session')
      window.sessionStorage.setItem(SESSION_WORKSPACE_KEY, JSON.stringify(workspace))
    } catch {
      setStorageMessage('Notebook work is available in memory for this page only and may be lost on refresh.')
    }
  }, [consentChoice, workspace])

  const acceptConsent = useCallback(async () => {
    if (!supportsIndexedDb()) {
      setConsentChoice('session')
      setStorageStatus('session')
      setStorageMessage('Persistent storage is unavailable. Notebook work will remain only for this browser session.')
      return
    }
    try {
      storePersistentConsent()
      window.sessionStorage.removeItem(SESSION_MODE_KEY)
      window.sessionStorage.removeItem(SESSION_WORKSPACE_KEY)
    } catch {
      setConsentChoice('session')
      setStorageStatus('session')
      setStorageMessage('Persistent consent could not be recorded. Notebook work will remain only for this browser session.')
      return
    }
    if (consentChoice === 'session') {
      try {
        await writeWorkspace(workspace)
        hasLoadedRef.current = true
        setConsentChoice('accepted')
        setStorageStatus('ready')
        setStorageMessage('This notebook is now saved privately in this browser on this device.')
      } catch (error) {
        setStorageStatus('session')
        setStorageMessage(error instanceof Error ? error.message : 'Persistent storage could not be enabled. Session-only mode remains active.')
      }
      return
    }
    setConsentChoice('accepted')
  }, [consentChoice, workspace])

  const useSessionNotebook = useCallback(() => {
    try { window.sessionStorage.setItem(SESSION_MODE_KEY, 'session') } catch {}
    hasLoadedRef.current = false
    setConsentChoice('session')
    setStorageStatus('session')
    setStorageMessage('Notebook work is available only in this browser tab and will be cleared when the session ends.')
  }, [])

  const reconsiderConsent = useCallback(() => {
    setConsentChoice('undecided')
    setStorageStatus('awaiting-consent')
    setStorageMessage('')
  }, [])

  const retryStorage = useCallback(() => consentChoice === 'accepted' ? loadWorkspace() : acceptConsent(), [acceptConsent, consentChoice, loadWorkspace])

  const addNote = useCallback((note) => {
    const cleanText = note.text.trim()
    if (!cleanText || consentChoice === 'undecided') return false
    const timestamp = new Date().toISOString()
    setWorkspace((current) => ({
      ...current,
      notes: [...current.notes, { id: createId('note'), text: cleanText, ...cleanContext(note), createdAt: timestamp, updatedAt: timestamp }],
    }))
    return true
  }, [consentChoice])

  const updateNote = useCallback((noteId, text) => {
    const cleanText = text.trim()
    if (!cleanText) return false
    setWorkspace((current) => ({
      ...current,
      notes: current.notes.map((note) => note.id === noteId ? { ...note, text: cleanText, updatedAt: new Date().toISOString() } : note),
    }))
    return true
  }, [])

  const deleteNote = useCallback((noteId) => {
    setWorkspace((current) => ({ ...current, notes: current.notes.filter((note) => note.id !== noteId) }))
  }, [])

  const toggleBookmark = useCallback((context) => {
    if (!context?.artifactId) return false
    setWorkspace((current) => {
      const exists = current.bookmarks.some((bookmark) => bookmark.artifactId === context.artifactId)
      return {
        ...current,
        bookmarks: exists
          ? current.bookmarks.filter((bookmark) => bookmark.artifactId !== context.artifactId)
          : [...current.bookmarks, { id: createId('bookmark'), ...cleanContext(context), createdAt: new Date().toISOString() }],
      }
    })
    return true
  }, [])


  const markArtifactViewed = useCallback((moduleId, artifactId) => {
    if (!moduleId || !artifactId) return
    setWorkspace((current) => {
      const moduleProgress = current.progress[moduleId] ?? { artifactsViewed: [], activitiesAttempted: [] }
      if (moduleProgress.artifactsViewed?.includes(artifactId)) return current
      return {
        ...current,
        progress: {
          ...current.progress,
          [moduleId]: {
            ...moduleProgress,
            artifactsViewed: [...(moduleProgress.artifactsViewed ?? []), artifactId],
            activitiesAttempted: moduleProgress.activitiesAttempted ?? [],
          },
        },
      }
    })
  }, [])

  const markActivityAttempted = useCallback((current, moduleId, activityId) => {
    const moduleProgress = current.progress[moduleId] ?? { artifactsViewed: [], activitiesAttempted: [] }
    if (moduleProgress.activitiesAttempted?.includes(activityId)) return current.progress
    return {
      ...current.progress,
      [moduleId]: {
        ...moduleProgress,
        artifactsViewed: moduleProgress.artifactsViewed ?? [],
        activitiesAttempted: [...(moduleProgress.activitiesAttempted ?? []), activityId],
      },
    }
  }, [])

  const saveActivityResponse = useCallback((activity, response) => {
    const cleanText = response?.text?.trim()
    if (!activity?.id || !activity?.moduleId || !cleanText) return false
    const timestamp = new Date().toISOString()
    setWorkspace((current) => {
      const existing = current.responses.find((item) => item.activityId === activity.id)
      const nextResponse = {
        id: existing?.id ?? createId('response'),
        activityId: activity.id,
        activityTitle: activity.title,
        activityType: activity.type,
        moduleId: activity.moduleId,
        moduleTitle: activity.moduleTitle ?? null,
        prompt: activity.prompt,
        text: cleanText,
        createdAt: existing?.createdAt ?? timestamp,
        updatedAt: timestamp,
      }
      return {
        ...current,
        responses: existing
          ? current.responses.map((item) => item.activityId === activity.id ? nextResponse : item)
          : [...current.responses, nextResponse],
        progress: markActivityAttempted(current, activity.moduleId, activity.id),
      }
    })
    return true
  }, [markActivityAttempted])

  const submitQuizAttempt = useCallback((activity, attempt) => {
    if (!activity?.id || !activity?.moduleId || !attempt?.selectedOptionId) return false
    const timestamp = new Date().toISOString()
    setWorkspace((current) => ({
      ...current,
      quizAttempts: [
        ...current.quizAttempts.filter((item) => item.activityId !== activity.id),
        {
          id: createId('quiz'),
          activityId: activity.id,
          activityTitle: activity.title,
          moduleId: activity.moduleId,
          moduleTitle: activity.moduleTitle ?? null,
          prompt: activity.prompt,
          selectedOptionId: attempt.selectedOptionId,
          correct: Boolean(attempt.correct),
          feedback: attempt.feedback ?? '',
          attemptedAt: timestamp,
        },
      ],
      progress: markActivityAttempted(current, activity.moduleId, activity.id),
    }))
    return true
  }, [markActivityAttempted])

  const deleteAllData = useCallback(async () => {
    try {
      await clearWorkspaceDatabase()
      window.localStorage.removeItem(PERSISTENT_CONSENT_KEY)
      window.sessionStorage.removeItem(SESSION_MODE_KEY)
      window.sessionStorage.removeItem(SESSION_WORKSPACE_KEY)
    } catch (error) {
      setStorageStatus('error')
      setStorageMessage(error instanceof Error ? error.message : 'The private workspace could not be cleared.')
      return false
    }
    hasLoadedRef.current = false
    setWorkspace(newEmptyWorkspace())
    setConsentChoice('undecided')
    setStorageStatus('awaiting-consent')
    setStorageMessage('')
    return true
  }, [])

  const exportMarkdown = useCallback(() => {
    const lines = [
      '# My Virtual Museum Field Notebook', '',
      `Exported: ${new Date().toLocaleString()}`, '',
      '> This file contains private notes exported from the Virtual Museum. The museum did not receive or store this work.', '',
    ]

    if (workspace.bookmarks.length) {
      lines.push('## Bookmarked artifacts', '')
      workspace.bookmarks.forEach((bookmark) => {
        lines.push(`- **${bookmark.artifactTitle || bookmark.artifactId}**${bookmark.moduleTitle ? ` — ${bookmark.moduleTitle}` : ''}`)
      })
      lines.push('')
    }

    if (!workspace.notes.length) {
      lines.push('## Notes', '', '_No notebook entries yet._', '')
    } else {
      const moduleGroups = new Map()
      workspace.notes.forEach((note) => {
        const key = note.moduleTitle || 'General observations'
        if (!moduleGroups.has(key)) moduleGroups.set(key, [])
        moduleGroups.get(key).push(note)
      })
      for (const [moduleTitle, notes] of moduleGroups) {
        lines.push(`## ${moduleTitle}`, '')
        notes.forEach((note) => {
          lines.push(`### ${note.artifactTitle || 'General observation'}`, '')
          if (note.artifactId) lines.push(`Artifact reference: \`${note.artifactId}\``, '')
          lines.push(note.text, '')
          const created = new Date(note.createdAt).toLocaleString()
          const updated = new Date(note.updatedAt).toLocaleString()
          lines.push(`_Created ${created}${note.updatedAt !== note.createdAt ? ` · Updated ${updated}` : ''}_`, '')
        })
      }
    }

    if (workspace.responses.length || workspace.quizAttempts.length) {
      lines.push('## Learning activities', '')
      workspace.responses.forEach((response) => {
        lines.push(`### ${response.activityTitle || 'Written response'}`, '')
        if (response.prompt) lines.push(`**Prompt:** ${response.prompt}`, '')
        lines.push(response.text, '')
        lines.push(`_Saved ${new Date(response.updatedAt).toLocaleString()}_`, '')
      })
      workspace.quizAttempts.forEach((attempt) => {
        lines.push(`### ${attempt.activityTitle || 'Knowledge check'}`, '')
        if (attempt.prompt) lines.push(`**Prompt:** ${attempt.prompt}`, '')
        lines.push(`Selected option: \`${attempt.selectedOptionId}\``, '')
        lines.push(`Result: ${attempt.correct ? 'Supported by the prototype evidence' : 'Revisit the room'}`, '')
        if (attempt.feedback) lines.push(attempt.feedback, '')
        lines.push(`_Attempted ${new Date(attempt.attemptedAt).toLocaleString()}_`, '')
      })
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `virtual-museum-field-notebook-${new Date().toISOString().slice(0, 10)}.md`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }, [workspace.bookmarks, workspace.notes, workspace.quizAttempts, workspace.responses])

  const notebookEnabled = consentChoice === 'accepted' || consentChoice === 'session'

  return useMemo(() => ({
    consentChoice,
    consentResolved: consentChoice !== 'undecided',
    notebookEnabled,
    workspace,
    storageStatus,
    storageMessage,
    acceptConsent,
    useSessionNotebook,
    reconsiderConsent,
    retryStorage,
    addNote,
    updateNote,
    deleteNote,
    toggleBookmark,
    markArtifactViewed,
    saveActivityResponse,
    submitQuizAttempt,
    deleteAllData,
    exportMarkdown,
  }), [acceptConsent, addNote, consentChoice, deleteAllData, deleteNote, exportMarkdown, notebookEnabled, reconsiderConsent, retryStorage, storageMessage, storageStatus, submitQuizAttempt, toggleBookmark, updateNote, useSessionNotebook, workspace, markArtifactViewed, saveActivityResponse])
}
