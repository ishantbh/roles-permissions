'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { authClient } from '@/lib/auth/auth-client'
import { generateOrganizationSlug } from '@/lib/helpers'
import {
  workspaceSchema,
  type WorkspaceFormData,
} from '../validation/workspace-form-schema'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

type WorkspaceFormProps = React.ComponentProps<'form'> & {
  onClose?: () => void
}

export function WorkspaceForm({
  className,
  onClose,
  ...props
}: WorkspaceFormProps) {
  const router = useRouter()

  const { refetch: refetchOrganizationList } = authClient.useListOrganizations()
  const { refetch: refetchActiveOrganization } =
    authClient.useActiveOrganization()

  const form = useForm<WorkspaceFormData>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      workspaceName: '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: WorkspaceFormData) {
    try {
      const slug = generateOrganizationSlug(data.workspaceName)

      const { data: organization, error } =
        await authClient.organization.create({
          name: data.workspaceName,
          slug,
          keepCurrentActiveOrganization: false,
        })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Successfully created workspace')

      const { error: setActiveOrgError } =
        await authClient.organization.setActive({
          organizationId: organization.id,
        })

      if (setActiveOrgError) {
        toast.error(setActiveOrgError.message)
        return
      }

      await Promise.all([
        refetchOrganizationList(),
        refetchActiveOrganization(),
      ])

      onClose?.()

      router.push('/dashboard')
    } catch (e) {
      toast.error('Error creating workspace')
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={className}
      {...props}
    >
      <FieldGroup>
        <Controller
          name='workspaceName'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='workspace-name'>Workspace Name</FieldLabel>
              <Input
                {...field}
                id='workspace-name'
                placeholder='My Awesome Workspace'
                aria-invalid={fieldState.invalid}
                disabled={isSubmitting}
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting && <Spinner data-icon='inline-start' />}
            <span>Create</span>
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
