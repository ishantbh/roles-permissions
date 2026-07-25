'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { PencilIcon, PlusIcon } from 'lucide-react'

import type { Project } from '@/db/types'
import { projectSchema, type ProjectData } from '../validation/project-schema'
import { createProject } from '../server/create-project'
import { updateProject } from '../server/update-project'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'

export function ProjectDialog({
  project,
  className,
  ...props
}: React.ComponentProps<'div'> & { project?: Project }) {
  const [open, setOpen] = useState(false)

  const isEditing = !!project

  const form = useForm<ProjectData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title ?? '',
      description: project?.description ?? '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: ProjectData) {
    try {
      const res = isEditing
        ? await updateProject({
            projectId: project.id,
            orgId: project.orgId,
            data,
          })
        : await createProject(data)

      if (res?.error) {
        toast.error(res.error)
        return
      }

      toast.success(
        isEditing
          ? 'Project updated successfully'
          : 'Project created successfully',
      )

      setOpen(false)
    } catch (error) {
      toast.error(
        isEditing ? 'Error updating project' : 'Error creating project',
      )
    }
  }

  return (
    <div className={className} {...props}>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          if (open) form.reset()
          setOpen(open)
        }}
      >
        <DialogTrigger asChild>
          <Button>
            {isEditing ? (
              <PencilIcon className='size-4' />
            ) : (
              <PlusIcon className='size-4' />
            )}
            <span>{isEditing ? 'Edit Project' : 'Create Project'}</span>
          </Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-sm'>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Project' : 'Create Project'}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Edit project details'
                : 'Create a new project in the current active workspace.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name='title'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='title'>Title</FieldLabel>
                    <Input
                      {...field}
                      id='title'
                      placeholder='Project Title'
                      aria-invalid={fieldState.invalid}
                      disabled={isSubmitting}
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name='description'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='description'>Description</FieldLabel>
                    <Textarea
                      {...field}
                      id='description'
                      aria-invalid={fieldState.invalid}
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field orientation='horizontal' className='justify-end'>
                <DialogClose asChild>
                  <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <Button type='submit' disabled={isSubmitting}>
                  {isSubmitting && <Spinner data-icon='inline-start' />}
                  <span>Save</span>
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
