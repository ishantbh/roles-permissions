'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Trash2Icon } from 'lucide-react'

import { deleteProject } from '../server/delete-project'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

type DeleteProjectConfirmationDialogProps = {
  projectId: string
}

export function DeleteProjectConfirmationDialog({
  projectId,
}: DeleteProjectConfirmationDialogProps) {
  const router = useRouter()

  async function handleDelete() {
    try {
      const res = await deleteProject({ projectId })

      if (res?.error) {
        toast.error(res.error)
        return
      }

      toast.success('Project deleted')

      router.push('/projects')
    } catch (err) {
      toast.error('Error deleting project')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size='lg' title='Delete project'>
          <Trash2Icon className='size-4' />
          <span className='sr-only sm:not-sr-only'>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size='sm'>
        <AlertDialogHeader>
          <AlertDialogMedia className='bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this project and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant='outline'>Cancel</AlertDialogCancel>
          <AlertDialogAction variant='destructive' onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
