/** Further Study catalog renderer. Saved state is supplied by the workspace. */
import { ResourceCard } from './stopSupport.jsx'

export default function ResourcesStop({ resources, isSaved, onToggleSave }) {
  return (
    <div className="resource-grid">
      {resources.map((resource) => <ResourceCard key={resource.id} resource={resource} saved={isSaved(resource.id)} onToggleSave={onToggleSave} />)}
    </div>
  )
}
