const DB_NAME = 'virtual-museum-workspace'
const DB_VERSION = 1
const WORKSPACE_STORE = 'workspace'
const WORKSPACE_KEY = 'primary'

export const EMPTY_WORKSPACE = Object.freeze({
  schemaVersion: 1,
  notes: [],
  bookmarks: [],
  progress: {},
  responses: [],
  quizAttempts: [],
  glossaryEntries: [],
  resources: [],
  preferences: {},
})

function cloneEmptyWorkspace() {
  return {
    schemaVersion: EMPTY_WORKSPACE.schemaVersion,
    notes: [],
    bookmarks: [],
    progress: {},
    responses: [],
    quizAttempts: [],
    glossaryEntries: [],
    resources: [],
    preferences: {},
  }
}

export function normalizeWorkspace(value) {
  const candidate = value && typeof value === 'object' ? value : {}
  return {
    ...cloneEmptyWorkspace(),
    ...candidate,
    notes: Array.isArray(candidate.notes) ? candidate.notes : [],
    bookmarks: Array.isArray(candidate.bookmarks) ? candidate.bookmarks : [],
    progress: candidate.progress && typeof candidate.progress === 'object' ? candidate.progress : {},
    responses: Array.isArray(candidate.responses) ? candidate.responses : [],
    quizAttempts: Array.isArray(candidate.quizAttempts) ? candidate.quizAttempts : [],
    glossaryEntries: Array.isArray(candidate.glossaryEntries) ? candidate.glossaryEntries : [],
    resources: Array.isArray(candidate.resources) ? candidate.resources : [],
    preferences: candidate.preferences && typeof candidate.preferences === 'object' ? candidate.preferences : {},
  }
}

export function supportsIndexedDb() {
  return typeof window !== 'undefined' && 'indexedDB' in window
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!supportsIndexedDb()) {
      reject(new Error('IndexedDB is unavailable in this browser.'))
      return
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const database = request.result
      if (!database.objectStoreNames.contains(WORKSPACE_STORE)) {
        database.createObjectStore(WORKSPACE_STORE)
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error('Could not open the local workspace database.'))
    request.onblocked = () => reject(new Error('The local workspace database is blocked by another open tab.'))
  })
}

async function withStore(mode, operation) {
  const database = await openDatabase()
  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(WORKSPACE_STORE, mode)
      const store = transaction.objectStore(WORKSPACE_STORE)
      let result

      try {
        result = operation(store)
      } catch (error) {
        reject(error)
        return
      }

      transaction.oncomplete = () => resolve(result)
      transaction.onerror = () => reject(transaction.error ?? new Error('The local workspace transaction failed.'))
      transaction.onabort = () => reject(transaction.error ?? new Error('The local workspace transaction was cancelled.'))
    })
  } finally {
    database.close()
  }
}

export async function readWorkspace() {
  const database = await openDatabase()
  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(WORKSPACE_STORE, 'readonly')
      const request = transaction.objectStore(WORKSPACE_STORE).get(WORKSPACE_KEY)
      request.onsuccess = () => resolve(normalizeWorkspace(request.result))
      request.onerror = () => reject(request.error ?? new Error('Could not read the local workspace.'))
    })
  } finally {
    database.close()
  }
}

export async function writeWorkspace(workspace) {
  const normalized = normalizeWorkspace(workspace)
  await withStore('readwrite', (store) => store.put(normalized, WORKSPACE_KEY))
  return normalized
}

export async function clearWorkspaceDatabase() {
  if (!supportsIndexedDb()) return

  await new Promise((resolve, reject) => {
    const request = window.indexedDB.deleteDatabase(DB_NAME)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error ?? new Error('Could not delete the local workspace database.'))
    request.onblocked = () => reject(new Error('Close other museum tabs before deleting local data.'))
  })
}

export function newEmptyWorkspace() {
  return cloneEmptyWorkspace()
}
