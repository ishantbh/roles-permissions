'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { authClient } from '@/lib/auth/auth-client'
import { generateOrganizationSlug } from '@/lib/helpers'
import {
  onboardingSchema,
  type OnboardingFormData,
} from '../validation/onboarding-form-schema'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

export function OnboardingForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter()

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      workspaceName: '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: OnboardingFormData) {
    try {
      const slug = generateOrganizationSlug(data.workspaceName)

      const { error } = await authClient.organization.create({
        name: data.workspaceName,
        slug,
        keepCurrentActiveOrganization: false,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Successfully created organization')

      router.push('/dashboard')
    } catch (e) {
      toast.error('Error creating organization')
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create Workspace</CardTitle>
          <CardDescription>Create your first workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name='workspaceName'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='workspace-name'>
                      Workspace Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id='workspace-name'
                      placeholder='My Awesome Workspace'
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

              <Field>
                <Button type='submit' disabled={isSubmitting}>
                  {isSubmitting && <Spinner data-icon='inline-start' />}
                  <span>Create</span>
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
