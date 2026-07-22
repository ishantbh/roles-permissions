import type { Project } from '@/db/types'
import { ProjectListItem } from './project-list-item'

type ProjectsListProps = {
  projects: Project[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <div className='w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {projects?.map((project) => (
          <ProjectListItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
