import Link from 'next/link'
import { ExternalLinkIcon } from 'lucide-react'

import type { Project } from '@/db/types'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type ProjectListItemProps = {
  project: Project
}

export function ProjectListItem({ project }: ProjectListItemProps) {
  return (
    <Card key={project.id}>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription className='truncate line-clamp-1'>
          {project.description}
        </CardDescription>
        <CardAction>
          <Button variant='ghost' size='icon' asChild>
            <Link href={`/projects/${project.id}`}>
              <ExternalLinkIcon className='size-4' />
              <span className='sr-only'>Open {project.title}</span>
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
