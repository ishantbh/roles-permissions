'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { PlusIcon } from 'lucide-react'

import { projectSchema, type ProjectData } from '../validation/project-schema'
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
import { createProject } from '../server/create-project'

export function ProjectDialog({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [open, setOpen] = useState(false)

  const form = useForm<ProjectData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: ProjectData) {
    try {
      const res = await createProject(data)

      if (res?.error) {
        toast.error(res.error)
        return
      }

      toast.success('Project created successfully')
      setOpen(false)
    } catch (error) {
      toast.error('Error creating project')
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
            <PlusIcon className='size-4' />
            <span>Create Project</span>
          </Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-sm'>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Create a new project in the current active workspace.
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
                  <span>Create</span>
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
