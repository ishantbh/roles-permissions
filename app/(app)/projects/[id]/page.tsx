import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeftIcon } from 'lucide-react'

import { auth } from '@/lib/auth'
import { getProjectById } from '@/features/projects/data/get-project-by-id'
import { Button } from '@/components/ui/button'
import { DeleteProjectConfirmationDialog } from '@/features/projects/components/delete-project-confirmation-dialog'
import { ProjectDialog } from '@/features/projects/components/project-dialog'

type ProjectDetailsPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  const { id } = await params

  const project = await getProjectById({
    projectId: id,
    userId: session.user.id,
  })

  if (!project) {
    return (
      <div className='grow flex flex-col items-center gap-4 mt-4'>
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-4'>
          <h1 className='text-2xl sm:text-3xl font-semibold text-center'>
            Project Not Found
          </h1>

          <Button size='lg' asChild>
            <Link href='/projects'>
              <ArrowLeftIcon className='size-4' />
              <span>Go back to projects</span>
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const { success: canDeleteProject } = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        project: ['delete'],
      },
    },
  })

  return (
    <div className='grow flex flex-col items-center gap-4 mt-4'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start justify-between gap-4'>
        <div className='space-y-4'>
          <h1 className='text-2xl sm:text-3xl font-semibold'>
            {project.title}
          </h1>

          <p className='text-muted-foreground'>
            {project.description || 'No description'}
          </p>
        </div>

        <div className='flex items-center gap-4'>
          <ProjectDialog project={project} />

          {canDeleteProject && (
            <DeleteProjectConfirmationDialog projectId={project.id} />
          )}
        </div>
      </div>
    </div>
  )
}
