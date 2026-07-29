import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  clearWorkspaceDatabase,
  newEmptyWorkspace,
  readWorkspace,
  supportsIndexedDb,
  writeWorkspace,
} from '../storage/workspaceDb.js'

const CONSENT_KEY = 'virtual-museum-storage-consent-v2'
const CONSENT_NOTICE_VERSION = '2.0'

function readConsentChoice() {
  try {
    const stored = window.localStorage.getItem(CONSENT_KEY)
    if (!stored) return 'undecided'
    const parsed = JSON.parse(stored)
    if (parsed?.noticeVersion !== CONSENT_NOTICE_VERSION) return 'undecided'
    return parsed?.choice === 'accepted' ? 'accepted' : parsed?.choice === 'declined' ? 'declined' : 'undecided'
  } catch {
    return 'undecided'
  }
}

function storeConsentChoice(choice) {
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify({
    choice,
    noticeVersion: CONSENT_NOTICE_VERSION,
    decidedAt: new Date().toISOString(),
  }))
}

function createNoteId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `note-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function useLocalWorkspace() {
  const initialConsent = readConsentChoice()
  const [consentChoice, setConsentChoice] = useState(initialConsent)
  const [workspace, setWorkspace] = useState(newEmptyWorkspace)
  const [storageStatus, setStorageStatus] = useState(() => (
    initialConsent === 'accepted' ? 'loading' : initialConsent === 'declined' ? 'disabled' : 'awaiting-consent'
  ))
  const [storageMessage, setStorageMessage] = useState('')
  const hasLoadedRef = useRef(false)
  const saveSequenceRef = useRef(0)

  const loadWorkspace = useCallback(async () => {
    if (!supportsIndexedDb()) {
      setStorageStatus('unavailable')
      setStorageMessage('This browser does not provide the local database needed for the private notebook.')
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
    } catch (error) {
      hasLoadedRef.current = false
      setStorageStatus('error')
      setStorageMessage(error instanceof Error ? error.message : 'The private workspace could not be opened.')
      return false
    }
  }, [])

  useEffect(() => {
    if (consentChoice === 'accepted') {
      loadWorkspace()
    }
  }, [consentChoice, loadWorkspace])

  useEffect(() => {
    if (consentChoice !== 'accepted' || !hasLoadedRef.current || storageStatus === 'unavailable') return

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
  }, [consentChoice, storageStatus === 'unavailable', workspace])

  const acceptConsent = useCallback(async () => {
    try {
      storeConsentChoice('accepted')
    } catch {
      setStorageStatus('unavailable')
      setStorageMessage('This browser blocked local storage, so the private notebook cannot be enabled.')
      return
    }
    setConsentChoice('accepted')
  }, [])

  const declineConsent = useCallback(() => {
    try {
      storeConsentChoice('declined')
    } catch {
      // The choice still applies for the current page session.
    }
    hasLoadedRef.current = false
    setConsentChoice('declined')
    setStorageStatus('disabled')
    setStorageMessage('Private notebook features are off. Museum content remains available.')
  }, [])

  const reconsiderConsent = useCallback(() => {
    setConsentChoice('undecided')
    setStorageStatus('awaiting-consent')
    setStorageMessage('')
  }, [])

  const retryStorage = useCallback(() => {
    if (consentChoice === 'accepted') loadWorkspace()
  }, [consentChoice, loadWorkspace])

  const addNote = useCallback((note) => {
    const cleanText = note.text.trim()
    if (!cleanText || storageStatus === 'unavailable' || consentChoice !== 'accepted') return false

    setWorkspace((current) => ({
      ...current,
      notes: [
        ...current.notes,
        {
          id: createNoteId(),
          text: cleanText,
          artifactId: note.artifactId ?? null,
          artifactTitle: note.artifactTitle ?? null,
          moduleId: note.moduleId ?? null,
          moduleTitle: note.moduleTitle ?? null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    }))
    return true
  }, [consentChoice, storageStatus])

  const deleteNote = useCallback((noteId) => {
    setWorkspace((current) => ({
      ...current,
      notes: current.notes.filter((note) => note.id !== noteId),
    }))
  }, [])

  const deleteAllData = useCallback(async () => {
    try {
      await clearWorkspaceDatabase()
      window.localStorage.removeItem(CONSENT_KEY)
    } catch (error) {
      setStorageStatus('error')
      setStorageMessage(error instanceof Error ? error.message : 'The local workspace could not be deleted.')
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
    const lines = ['# My Virtual Museum Field Notebook', '', `Exported: ${new Date().toLocaleString()}`, '']
    if (workspace.notes.length === 0) {
      lines.push('_No notebook entries yet._')
    } else {
      workspace.notes.forEach((note) => {
        lines.push(`## ${note.artifactTitle || note.moduleTitle || 'General observation'}`)
        if (note.moduleTitle) lines.push('', `Module: ${note.moduleTitle}`)
        if (note.artifactId) lines.push('', `Artifact reference: ${note.artifactId}`)
        lines.push('', note.text, '')
      })
    }

    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'virtual-museum-field-notebook.md'
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }, [workspace.notes])

  const notebookEnabled = consentChoice === 'accepted' && !['unavailable', 'error'].includes(storageStatus)

  return useMemo(() => ({
    consentChoice,
    consentResolved: consentChoice !== 'undecided',
    notebookEnabled,
    workspace,
    storageStatus,
    storageMessage,
    acceptConsent,
    declineConsent,
    reconsiderConsent,
    retryStorage,
    addNote,
    deleteNote,
    deleteAllData,
    exportMarkdown,
  }), [
    acceptConsent,
    addNote,
    consentChoice,
    declineConsent,
    deleteAllData,
    deleteNote,
    exportMarkdown,
    notebookEnabled,
    reconsiderConsent,
    retryStorage,
    storageMessage,
    storageStatus,
    workspace,
  ])
}
