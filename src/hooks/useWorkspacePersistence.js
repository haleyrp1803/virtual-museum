/**
 * Browser-persistence lifecycle for the learner's private workspace.
 *
 * This hook owns everything that crosses the browser-storage boundary:
 * consent restoration, IndexedDB/session loading, delayed saves, storage
 * status messages, retry behavior, mode changes and complete data deletion.
 *
 * `useLocalWorkspace.js` remains the only UI-facing workspace API. It receives
 * the workspace state and persistence controls from this hook, then adds the
 * note, bookmark, activity, glossary and resource operations used by React
 * components. Keeping that boundary prevents domain operations from becoming
 * coupled to IndexedDB or Web Storage details.
 *
 * Compatibility contract:
 * - Do not rename the storage keys, IndexedDB database/store/key or consent
 *   notice version without an explicit migration pass.
 * - Session-only mode must remain fully functional.
 * - Existing normalized workspace records must load without conversion here;
 *   schema compatibility belongs to `storage/workspaceDb.js`.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  clearWorkspaceDatabase,
  newEmptyWorkspace,
  normalizeWorkspace,
  readWorkspace,
  supportsIndexedDb,
  writeWorkspace,
} from '../storage/workspaceDb.js'

// These identifiers are durable compatibility keys, not user-facing branding.
const PERSISTENT_CONSENT_KEY = 'virtual-museum-storage-consent-v2'
const SESSION_MODE_KEY = 'virtual-museum-session-mode-v1'
const SESSION_WORKSPACE_KEY = 'virtual-museum-session-workspace-v1'
const CONSENT_NOTICE_VERSION = '2.1'

/**
 * Restore only a still-valid persistent consent record or an active tab's
 * session-only choice. Invalid, missing or unreadable records safely return to
 * the consent dialog rather than guessing at learner intent.
 */
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

/**
 * Session records are normalized through the same schema boundary as
 * IndexedDB records so missing arrays or fields remain backward-compatible.
 */
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

export function useWorkspacePersistence() {
  // Capture the restored mode once. Re-reading storage on every render could
  // make initialization depend on changes made after this hook mounted.
  const [initialChoice] = useState(readInitialChoice)
  const [consentChoice, setConsentChoice] = useState(initialChoice)
  const [workspace, setWorkspace] = useState(() => (
    initialChoice === 'session' ? readSessionWorkspace() : newEmptyWorkspace()
  ))
  const [storageStatus, setStorageStatus] = useState(() => (
    initialChoice === 'accepted'
      ? 'loading'
      : initialChoice === 'session'
        ? 'session'
        : 'awaiting-consent'
  ))
  const [storageMessage, setStorageMessage] = useState(() => (
    initialChoice === 'session'
      ? 'Notebook work is available only in this browser tab and will be cleared when the session ends.'
      : ''
  ))

  // `hasLoadedRef` prevents a blank initial workspace from overwriting an
  // existing IndexedDB record before that record has finished loading.
  const hasLoadedRef = useRef(false)
  // Only the newest delayed save may update the visible status message.
  const saveSequenceRef = useRef(0)

  /** Load the normalized persistent workspace, falling back safely to session mode. */
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

  // Persistent work loads once after accepted consent is restored or selected.
  useEffect(() => {
    if (consentChoice === 'accepted' && !hasLoadedRef.current) loadWorkspace()
  }, [consentChoice, loadWorkspace])

  // Persist normalized workspace changes after a short delay. The sequence
  // guard prevents an earlier request from overwriting a later status message.
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

  // Session-only mode mirrors the complete workspace into this browser tab.
  // If Web Storage fails, the in-memory React state still remains usable.
  useEffect(() => {
    if (consentChoice !== 'session') return

    try {
      window.sessionStorage.setItem(SESSION_MODE_KEY, 'session')
      window.sessionStorage.setItem(SESSION_WORKSPACE_KEY, JSON.stringify(workspace))
    } catch {
      setStorageMessage('Notebook work is available in memory for this page only and may be lost on refresh.')
    }
  }, [consentChoice, workspace])

  /**
   * Enable persistent storage. Existing session work is written before the
   * mode changes so a learner does not lose work when upgrading storage.
   */
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
    try {
      window.sessionStorage.setItem(SESSION_MODE_KEY, 'session')
    } catch {}

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

  const retryStorage = useCallback(
    () => (consentChoice === 'accepted' ? loadWorkspace() : acceptConsent()),
    [acceptConsent, consentChoice, loadWorkspace],
  )

  /**
   * Clear every storage location and reset the in-memory workspace. This stays
   * in the persistence layer because it coordinates IndexedDB and both Web
   * Storage scopes as one destructive operation.
   */
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

  return {
    consentChoice,
    workspace,
    setWorkspace,
    storageStatus,
    storageMessage,
    acceptConsent,
    useSessionNotebook,
    reconsiderConsent,
    retryStorage,
    deleteAllData,
  }
}
