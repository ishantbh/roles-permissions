'use client'

import { Trash2Icon } from 'lucide-react'

import type { Project } from '@/db/types'
import { Button } from '@/components/ui/button'

type ProjectListItemDeleteButtonProps = {
  project: Project
}

export function ProjectListItemDeleteButton({
  project,
}: ProjectListItemDeleteButtonProps) {
  return (
    <Button
      variant='destructive'
      size='icon'
      className='bg-inherit dark:bg-inherit'
    >
      <Trash2Icon className='size-4' />
      <span className='sr-only'>Delete {project.title}</span>
    </Button>
  )
}
