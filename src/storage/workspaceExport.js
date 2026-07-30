/**
 * Human-readable Markdown export for the private learner workspace.
 *
 * `buildWorkspaceMarkdown` is pure and can be inspected or tested independently.
 * `downloadWorkspaceMarkdown` contains the small browser-specific download step.
 * The export remains a personal-use reading copy, not a restorable backup format.
 */

export function buildWorkspaceMarkdown(workspace, exportedAt = new Date()) {
  const lines = [
    '# My History of Education Field Notebook', '',
    `Exported: ${exportedAt.toLocaleString()}`, '',
    '> This file contains private notes exported from the History of Education course. The course project did not receive or store this work.', '',
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

  if (workspace.glossaryEntries.length) {
    lines.push('## Glossary', '')
    const glossaryGroups = new Map()
    workspace.glossaryEntries.forEach((entry) => {
      const key = entry.moduleTitle || 'Course glossary'
      if (!glossaryGroups.has(key)) glossaryGroups.set(key, [])
      glossaryGroups.get(key).push(entry)
    })
    for (const [moduleTitle, entries] of glossaryGroups) {
      lines.push(`### ${moduleTitle}`, '')
      entries.sort((a, b) => a.term.localeCompare(b.term)).forEach((entry) => {
        lines.push(`- **${entry.term}**: ${entry.definition || '_Definition not yet added._'}`)
      })
      lines.push('')
    }
  }

  if (workspace.resources.length) {
    lines.push('## Saved resources', '')
    workspace.resources.forEach((resource) => {
      lines.push(`- **${resource.title}** — ${resource.creator || 'Creator not supplied'} (${resource.type || 'Resource'})`)
      lines.push(`  - Module: ${resource.moduleTitle || 'Course'}`)
      lines.push(`  - Status: ${resource.status || 'saved'}`)
      if (resource.note) lines.push(`  - ${resource.note}`)
    })
    lines.push('')
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
      lines.push(`Result: ${attempt.correct ? 'Supported by the prototype evidence' : 'Revisit the lesson'}`, '')
      if (attempt.feedback) lines.push(attempt.feedback, '')
      lines.push(`_Attempted ${new Date(attempt.attemptedAt).toLocaleString()}_`, '')
    })
  }

  return lines.join('\n')
}

export function downloadWorkspaceMarkdown(workspace) {
  const exportedAt = new Date()
  const markdown = buildWorkspaceMarkdown(workspace, exportedAt)
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `history-of-education-field-notebook-${exportedAt.toISOString().slice(0, 10)}.md`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
