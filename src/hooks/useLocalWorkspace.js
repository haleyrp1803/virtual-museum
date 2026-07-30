/**
 * Single React authority for the learner's private workspace.
 *
 * Coordinates consent, persistent or session-only loading/saving, workspace
 * persistence lifecycle and exposes the stable UI-facing API. Pure workspace
 * transformations live in `storage/workspaceActions.js`; Markdown construction
 * lives in `storage/workspaceExport.js`; IndexedDB mechanics remain in
 * `storage/workspaceDb.js`.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  clearWorkspaceDatabase,
  newEmptyWorkspace,
  normalizeWorkspace,
  readWorkspace,
  supportsIndexedDb,
  writeWorkspace,
} from '../storage/workspaceDb.js'
import {
  addNoteToWorkspace,
  deleteWorkspaceNote,
  markWorkspaceArtifactViewed,
  saveWorkspaceActivityResponse,
  saveWorkspaceGlossaryEntry,
  saveWorkspaceQuizAttempt,
  toggleWorkspaceBookmark,
  toggleWorkspaceResource,
  updateWorkspaceNote,
  updateWorkspaceResourceStatus,
} from '../storage/workspaceActions.js'
import { downloadWorkspaceMarkdown } from '../storage/workspaceExport.js'

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

export function useLocalWorkspace() {
  const initialChoice = readInitialChoice()
  const [consentChoice, setConsentChoice] = useState(initialChoice)
  const [workspace, setWorkspace] = useState(() => initialChoice === 'session' ? readSessionWorkspace() : newEmptyWorkspace())
  const [storageStatus, setStorageStatus] = useState(() => initialChoice === 'accepted' ? 'loading' : initialChoice === 'session' ? 'session' : 'awaiting-consent')
  const [storageMessage, setStorageMessage] = useState(() => initialChoice === 'session' ? 'Notebook work is available only in this browser tab and will be cleared when the session ends.' : '')
  const hasLoadedRef = useRef(false)
  const saveSequenceRef = useRef(0)

  // Persistent-mode lifecycle: load once, then save normalized state after changes.
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

  // Consent transitions preserve session work when a learner enables persistence.
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

  // Public mutation callbacks validate UI input, then delegate immutable updates.
  const addNote = useCallback((note) => {
    const cleanText = note.text.trim()
    if (!cleanText || consentChoice === 'undecided') return false
    const timestamp = new Date().toISOString()
    setWorkspace((current) => addNoteToWorkspace(current, { ...note, text: cleanText }, {
      id: createId('note'),
      timestamp,
    }))
    return true
  }, [consentChoice])

  const updateNote = useCallback((noteId, text) => {
    const cleanText = text.trim()
    if (!cleanText) return false
    setWorkspace((current) => updateWorkspaceNote(current, noteId, cleanText, new Date().toISOString()))
    return true
  }, [])

  const deleteNote = useCallback((noteId) => {
    setWorkspace((current) => deleteWorkspaceNote(current, noteId))
  }, [])

  const toggleBookmark = useCallback((context) => {
    if (!context?.artifactId) return false
    setWorkspace((current) => toggleWorkspaceBookmark(current, context, {
      id: createId('bookmark'),
      timestamp: new Date().toISOString(),
    }))
    return true
  }, [])


  const markArtifactViewed = useCallback((moduleId, artifactId) => {
    if (!moduleId || !artifactId) return
    setWorkspace((current) => markWorkspaceArtifactViewed(current, moduleId, artifactId))
  }, [])

  const saveActivityResponse = useCallback((activity, response) => {
    const cleanText = response?.text?.trim()
    if (!activity?.id || !activity?.moduleId || !cleanText) return false
    setWorkspace((current) => saveWorkspaceActivityResponse(current, activity, { ...response, text: cleanText }, {
      id: createId('response'),
      timestamp: new Date().toISOString(),
    }))
    return true
  }, [])

  const submitQuizAttempt = useCallback((activity, attempt) => {
    if (!activity?.id || !activity?.moduleId || !attempt?.selectedOptionId) return false
    setWorkspace((current) => saveWorkspaceQuizAttempt(current, activity, attempt, {
      id: createId('quiz'),
      timestamp: new Date().toISOString(),
    }))
    return true
  }, [])

  const saveGlossaryEntry = useCallback((term, definition = '') => {
    if (!term?.id || consentChoice === 'undecided') return false
    setWorkspace((current) => saveWorkspaceGlossaryEntry(current, term, definition, {
      id: createId('glossary'),
      timestamp: new Date().toISOString(),
    }))
    return true
  }, [consentChoice])


  const toggleResource = useCallback((resource) => {
    if (!resource?.id) return false
    setWorkspace((current) => toggleWorkspaceResource(current, resource, {
      id: createId('resource'),
      timestamp: new Date().toISOString(),
    }))
    return true
  }, [])

  const updateResourceStatus = useCallback((resourceId, status) => {
    if (!['saved', 'started', 'finished'].includes(status)) return false
    setWorkspace((current) => updateWorkspaceResourceStatus(current, resourceId, status, new Date().toISOString()))
    return true
  }, [])

  // Destructive storage operations stay here because they cross browser stores.
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

  // Export formatting is separate; this callback preserves the existing hook API.
  const exportMarkdown = useCallback(() => {
    downloadWorkspaceMarkdown(workspace)
  }, [workspace])

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
    saveGlossaryEntry,
    toggleResource,
    updateResourceStatus,
    deleteAllData,
    exportMarkdown,
  }), [acceptConsent, addNote, consentChoice, deleteAllData, deleteNote, exportMarkdown, notebookEnabled, reconsiderConsent, retryStorage, storageMessage, storageStatus, submitQuizAttempt, saveGlossaryEntry, toggleBookmark, toggleResource, updateResourceStatus, updateNote, useSessionNotebook, workspace, markArtifactViewed, saveActivityResponse])
}
