/**
 * Dependency-free architecture and data-contract validator.
 *
 * This script complements Vite's production build. It checks the source tree
 * without starting a browser: relative imports must resolve, active modules
 * must be reachable from src/main.jsx, the JavaScript dependency graph must
 * remain acyclic, the stylesheet import ledger must remain complete and in the
 * accepted order, compatibility-sensitive storage identifiers must remain
 * present, and the course data graph must pass its own ID/reference validator.
 *
 * Run with: npm.cmd run validate:architecture
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceRoot = path.join(projectRoot, 'src')
const entryFile = 'main.jsx'
const sourceExtensions = new Set(['.js', '.jsx'])

const expectedStyleLayers = [
  'foundation.css',
  'classroom-aesthetic.css',
  'horizontal-course.css',
  'horizontal-course-qa.css',
  'glossary-study.css',
  'field-notebook.css',
]

const requiredCompatibilityStrings = [
  'virtual-museum-workspace',
  'virtual-museum-storage-consent-v2',
  'virtual-museum-session-mode-v1',
  'virtual-museum-session-workspace-v1',
]

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(absolute) : [absolute]
  })
}

function toSourceRelative(absolutePath) {
  return path.relative(sourceRoot, absolutePath).split(path.sep).join('/')
}

function resolveRelativeImport(importer, specifier) {
  const base = path.resolve(path.dirname(importer), specifier)
  const candidates = [base, `${base}.js`, `${base}.jsx`, `${base}.css`, path.join(base, 'index.js'), path.join(base, 'index.jsx')]
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile()) ?? null
}

function collectImports(filePath) {
  const source = fs.readFileSync(filePath, 'utf8')
  const pattern = /(?:import\s+(?:[^'\"]+?\s+from\s+)?|export\s+[^'\"]*?\s+from\s+)["']([^"']+)["']/g
  return [...source.matchAll(pattern)].map((match) => match[1]).filter((specifier) => specifier.startsWith('.'))
}

function validateImportGraph(issues) {
  const sourceFiles = walk(sourceRoot).filter((file) => sourceExtensions.has(path.extname(file)))
  const graph = new Map()

  for (const file of sourceFiles) {
    const edges = []
    for (const specifier of collectImports(file)) {
      const resolved = resolveRelativeImport(file, specifier)
      if (!resolved) {
        issues.push(`${toSourceRelative(file)} has unresolved import "${specifier}".`)
        continue
      }
      if (sourceExtensions.has(path.extname(resolved))) edges.push(toSourceRelative(resolved))
    }
    graph.set(toSourceRelative(file), edges)
  }

  const reachable = new Set()
  const stack = [entryFile]
  while (stack.length) {
    const current = stack.pop()
    if (reachable.has(current)) continue
    reachable.add(current)
    stack.push(...(graph.get(current) ?? []))
  }

  for (const file of graph.keys()) {
    if (!reachable.has(file)) issues.push(`${file} is not reachable from src/${entryFile}.`)
  }

  const visited = new Set()
  const active = []
  const activeSet = new Set()

  function visit(file) {
    visited.add(file)
    active.push(file)
    activeSet.add(file)

    for (const dependency of graph.get(file) ?? []) {
      if (!visited.has(dependency)) visit(dependency)
      else if (activeSet.has(dependency)) {
        const start = active.indexOf(dependency)
        issues.push(`Circular JavaScript dependency: ${[...active.slice(start), dependency].join(' -> ')}.`)
      }
    }

    active.pop()
    activeSet.delete(file)
  }

  for (const file of graph.keys()) if (!visited.has(file)) visit(file)
}

function validateStyleLedger(issues) {
  const ledgerPath = path.join(sourceRoot, 'styles', 'global.css')
  const ledger = fs.readFileSync(ledgerPath, 'utf8')
  const imports = [...ledger.matchAll(/@import\s+['"]\.\/([^'"]+)['"];?/g)].map((match) => match[1])

  if (JSON.stringify(imports) !== JSON.stringify(expectedStyleLayers)) {
    issues.push(`styles/global.css import order differs from the accepted cascade: ${expectedStyleLayers.join(', ')}.`)
  }

  for (const layer of expectedStyleLayers) {
    if (!fs.existsSync(path.join(sourceRoot, 'styles', layer))) issues.push(`Missing stylesheet layer styles/${layer}.`)
  }
}

function validateCompatibilityIdentifiers(issues) {
  const persistenceSource = fs.readFileSync(path.join(sourceRoot, 'hooks', 'useWorkspacePersistence.js'), 'utf8')
  const databaseSource = fs.readFileSync(path.join(sourceRoot, 'storage', 'workspaceDb.js'), 'utf8')
  const combined = `${persistenceSource}\n${databaseSource}`

  for (const identifier of requiredCompatibilityStrings) {
    if (!combined.includes(identifier)) issues.push(`Compatibility-sensitive storage identifier "${identifier}" is missing.`)
  }
}

async function validateCourseGraph(issues) {
  const validatorUrl = pathToFileURL(path.join(sourceRoot, 'data', 'validateCourseData.js')).href
  const { validateCourseData } = await import(validatorUrl)
  issues.push(...validateCourseData())
}

const issues = []
validateImportGraph(issues)
validateStyleLedger(issues)
validateCompatibilityIdentifiers(issues)
await validateCourseGraph(issues)

if (issues.length) {
  console.error('Architecture validation failed:')
  for (const issue of issues) console.error(`- ${issue}`)
  process.exitCode = 1
} else {
  console.log('Architecture validation passed: imports resolve, active modules are reachable, no cycles were found, and data/style/storage contracts are intact.')
}
