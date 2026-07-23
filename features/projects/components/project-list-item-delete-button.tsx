'use client'

import { toast } from 'sonner'
import { Trash2Icon } from 'lucide-react'

import type { Project } from '@/db/types'
import { deleteProject } from '../server/delete-project'
import { Button } from '@/components/ui/button'

type ProjectListItemDeleteButtonProps = {
  project: Project
}

export function ProjectListItemDeleteButton({
  project,
}: ProjectListItemDeleteButtonProps) {
  async function handleDelete() {
    try {
      const res = await deleteProject({ projectId: project.id })

      if (res?.error) {
        toast.error(res.error)
        return
      }

      toast.success('Project deleted')
    } catch (err) {
      toast.error('Error deleting project')
    }
  }

  return (
    <Button
      variant='destructive'
      size='icon'
      className='bg-inherit dark:bg-inherit'
      onClick={handleDelete}
      title='Delete'
    >
      <Trash2Icon className='size-4' />
      <span className='sr-only'>Delete {project.title}</span>
    </Button>
  )
}
