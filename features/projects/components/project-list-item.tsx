import { headers } from 'next/headers'
import Link from 'next/link'
import { ExternalLinkIcon } from 'lucide-react'

import type { Project } from '@/db/types'
import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ProjectListItemDeleteButton } from './project-list-item-delete-button'

type ProjectListItemProps = {
  project: Project
}

export async function ProjectListItem({ project }: ProjectListItemProps) {
  const { success: canDeleteProject } = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        project: ['delete'],
      },
    },
  })

  return (
    <Card key={project.id}>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription className='truncate line-clamp-1'>
          {project.description}
        </CardDescription>
        <CardAction>
          <div className='flex items-center'>
            <Button variant='ghost' size='icon' asChild>
              <Link href={`/projects/${project.id}`}>
                <ExternalLinkIcon className='size-4' />
                <span className='sr-only'>Open {project.title}</span>
              </Link>
            </Button>

            {canDeleteProject && (
              <ProjectListItemDeleteButton project={project} />
            )}
          </div>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
