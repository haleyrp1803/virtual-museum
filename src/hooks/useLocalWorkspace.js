/**
 * Stable React-facing authority for the learner's private workspace.
 *
 * Components import this hook and should not call browser storage or mutate
 * workspace records directly. Browser persistence is delegated to
 * `useWorkspacePersistence.js`; immutable record transformations live in
 * `storage/workspaceActions.js`; Markdown construction lives in
 * `storage/workspaceExport.js`; IndexedDB schema mechanics remain in
 * `storage/workspaceDb.js`.
 *
 * The returned API is intentionally unchanged by the persistence extraction so
 * course, notebook, glossary and activity components do not need to know how
 * the workspace is stored.
 */

import { useCallback, useMemo } from 'react'
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
import { useWorkspacePersistence } from './useWorkspacePersistence.js'

/** Generate a browser-native UUID where available, with a safe local fallback. */
function createId(prefix) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function useLocalWorkspace() {
  const {
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
  } = useWorkspacePersistence()

  // Public mutation callbacks validate UI input, add identity/timestamps, then
  // delegate immutable record updates to the pure workspace action functions.
  const addNote = useCallback((note) => {
    const cleanText = note.text.trim()
    if (!cleanText || consentChoice === 'undecided') return false

    const timestamp = new Date().toISOString()
    setWorkspace((current) => addNoteToWorkspace(current, { ...note, text: cleanText }, {
      id: createId('note'),
      timestamp,
    }))
    return true
  }, [consentChoice, setWorkspace])

  const updateNote = useCallback((noteId, text) => {
    const cleanText = text.trim()
    if (!cleanText) return false

    setWorkspace((current) => updateWorkspaceNote(current, noteId, cleanText, new Date().toISOString()))
    return true
  }, [setWorkspace])

  const deleteNote = useCallback((noteId) => {
    setWorkspace((current) => deleteWorkspaceNote(current, noteId))
  }, [setWorkspace])

  const toggleBookmark = useCallback((context) => {
    if (!context?.artifactId) return false

    setWorkspace((current) => toggleWorkspaceBookmark(current, context, {
      id: createId('bookmark'),
      timestamp: new Date().toISOString(),
    }))
    return true
  }, [setWorkspace])

  const markArtifactViewed = useCallback((moduleId, artifactId) => {
    if (!moduleId || !artifactId) return
    setWorkspace((current) => markWorkspaceArtifactViewed(current, moduleId, artifactId))
  }, [setWorkspace])

  const saveActivityResponse = useCallback((activity, response) => {
    const cleanText = response?.text?.trim()
    if (!activity?.id || !activity?.moduleId || !cleanText) return false

    setWorkspace((current) => saveWorkspaceActivityResponse(current, activity, { ...response, text: cleanText }, {
      id: createId('response'),
      timestamp: new Date().toISOString(),
    }))
    return true
  }, [setWorkspace])

  const submitQuizAttempt = useCallback((activity, attempt) => {
    if (!activity?.id || !activity?.moduleId || !attempt?.selectedOptionId) return false

    setWorkspace((current) => saveWorkspaceQuizAttempt(current, activity, attempt, {
      id: createId('quiz'),
      timestamp: new Date().toISOString(),
    }))
    return true
  }, [setWorkspace])

  const saveGlossaryEntry = useCallback((term, definition = '') => {
    if (!term?.id || consentChoice === 'undecided') return false

    setWorkspace((current) => saveWorkspaceGlossaryEntry(current, term, definition, {
      id: createId('glossary'),
      timestamp: new Date().toISOString(),
    }))
    return true
  }, [consentChoice, setWorkspace])

  const toggleResource = useCallback((resource) => {
    if (!resource?.id) return false

    setWorkspace((current) => toggleWorkspaceResource(current, resource, {
      id: createId('resource'),
      timestamp: new Date().toISOString(),
    }))
    return true
  }, [setWorkspace])

  const updateResourceStatus = useCallback((resourceId, status) => {
    if (!['saved', 'started', 'finished'].includes(status)) return false

    setWorkspace((current) => updateWorkspaceResourceStatus(
      current,
      resourceId,
      status,
      new Date().toISOString(),
    ))
    return true
  }, [setWorkspace])

  // Export remains a browser action but does not participate in persistence.
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
  }), [
    acceptConsent,
    addNote,
    consentChoice,
    deleteAllData,
    deleteNote,
    exportMarkdown,
    notebookEnabled,
    reconsiderConsent,
    retryStorage,
    saveActivityResponse,
    saveGlossaryEntry,
    storageMessage,
    storageStatus,
    submitQuizAttempt,
    toggleBookmark,
    toggleResource,
    updateNote,
    updateResourceStatus,
    useSessionNotebook,
    workspace,
    markArtifactViewed,
  ])
}
