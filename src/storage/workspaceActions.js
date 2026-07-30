/**
 * Pure learner-workspace transformations.
 *
 * Each function receives the current normalized workspace and returns a new
 * workspace without touching React, IndexedDB, localStorage, or sessionStorage.
 * `useLocalWorkspace.js` remains the public orchestration API and is responsible
 * for consent checks, timestamps, generated IDs, and committing returned state.
 */

function cleanContext(item = {}) {
  return {
    artifactId: item.artifactId ?? null,
    artifactTitle: item.artifactTitle ?? null,
    moduleId: item.moduleId ?? null,
    moduleTitle: item.moduleTitle ?? null,
  }
}

function markActivityAttempted(progress, moduleId, activityId) {
  const moduleProgress = progress[moduleId] ?? { artifactsViewed: [], activitiesAttempted: [] }
  if (moduleProgress.activitiesAttempted?.includes(activityId)) return progress
  return {
    ...progress,
    [moduleId]: {
      ...moduleProgress,
      artifactsViewed: moduleProgress.artifactsViewed ?? [],
      activitiesAttempted: [...(moduleProgress.activitiesAttempted ?? []), activityId],
    },
  }
}

export function addNoteToWorkspace(workspace, note, { id, timestamp }) {
  return {
    ...workspace,
    notes: [...workspace.notes, {
      id,
      text: note.text.trim(),
      ...cleanContext(note),
      createdAt: timestamp,
      updatedAt: timestamp,
    }],
  }
}

export function updateWorkspaceNote(workspace, noteId, text, timestamp) {
  return {
    ...workspace,
    notes: workspace.notes.map((note) => note.id === noteId
      ? { ...note, text: text.trim(), updatedAt: timestamp }
      : note),
  }
}

export function deleteWorkspaceNote(workspace, noteId) {
  return { ...workspace, notes: workspace.notes.filter((note) => note.id !== noteId) }
}

export function toggleWorkspaceBookmark(workspace, context, { id, timestamp }) {
  const exists = workspace.bookmarks.some((bookmark) => bookmark.artifactId === context.artifactId)
  return {
    ...workspace,
    bookmarks: exists
      ? workspace.bookmarks.filter((bookmark) => bookmark.artifactId !== context.artifactId)
      : [...workspace.bookmarks, { id, ...cleanContext(context), createdAt: timestamp }],
  }
}

export function markWorkspaceArtifactViewed(workspace, moduleId, artifactId) {
  const moduleProgress = workspace.progress[moduleId] ?? { artifactsViewed: [], activitiesAttempted: [] }
  if (moduleProgress.artifactsViewed?.includes(artifactId)) return workspace
  return {
    ...workspace,
    progress: {
      ...workspace.progress,
      [moduleId]: {
        ...moduleProgress,
        artifactsViewed: [...(moduleProgress.artifactsViewed ?? []), artifactId],
        activitiesAttempted: moduleProgress.activitiesAttempted ?? [],
      },
    },
  }
}

export function saveWorkspaceActivityResponse(workspace, activity, response, { id, timestamp }) {
  const existing = workspace.responses.find((item) => item.activityId === activity.id)
  const nextResponse = {
    id: existing?.id ?? id,
    activityId: activity.id,
    activityTitle: activity.title,
    activityType: activity.type,
    moduleId: activity.moduleId,
    moduleTitle: activity.moduleTitle ?? null,
    prompt: activity.prompt,
    text: response.text.trim(),
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
  }
  return {
    ...workspace,
    responses: existing
      ? workspace.responses.map((item) => item.activityId === activity.id ? nextResponse : item)
      : [...workspace.responses, nextResponse],
    progress: markActivityAttempted(workspace.progress, activity.moduleId, activity.id),
  }
}

export function saveWorkspaceQuizAttempt(workspace, activity, attempt, { id, timestamp }) {
  return {
    ...workspace,
    quizAttempts: [
      ...workspace.quizAttempts.filter((item) => item.activityId !== activity.id),
      {
        id,
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
    progress: markActivityAttempted(workspace.progress, activity.moduleId, activity.id),
  }
}

export function saveWorkspaceGlossaryEntry(workspace, term, definition, { id, timestamp }) {
  const existing = workspace.glossaryEntries.find((entry) => entry.termId === term.id)
  const nextEntry = {
    id: existing?.id ?? id,
    termId: term.id,
    term: term.term,
    moduleId: term.moduleId,
    moduleTitle: term.moduleTitle,
    locationStopId: term.locationStopId,
    locationLabel: term.locationLabel,
    definition: definition.trim(),
    createdAt: existing?.createdAt ?? timestamp,
    updatedAt: timestamp,
  }
  return {
    ...workspace,
    glossaryEntries: existing
      ? workspace.glossaryEntries.map((entry) => entry.termId === term.id ? nextEntry : entry)
      : [...workspace.glossaryEntries, nextEntry],
  }
}

export function toggleWorkspaceResource(workspace, resource, { id, timestamp }) {
  const existing = workspace.resources.find((item) => item.resourceId === resource.id)
  return {
    ...workspace,
    resources: existing
      ? workspace.resources.filter((item) => item.resourceId !== resource.id)
      : [...workspace.resources, {
          id,
          resourceId: resource.id,
          title: resource.title,
          creator: resource.creator,
          type: resource.type,
          access: resource.access,
          note: resource.note,
          moduleId: resource.moduleId || 'early-america',
          moduleTitle: resource.moduleTitle || 'Early America',
          url: resource.url || null,
          status: 'saved',
          createdAt: timestamp,
          updatedAt: timestamp,
        }],
  }
}

export function updateWorkspaceResourceStatus(workspace, resourceId, status, timestamp) {
  return {
    ...workspace,
    resources: workspace.resources.map((item) => item.resourceId === resourceId
      ? { ...item, status, updatedAt: timestamp }
      : item),
  }
}
