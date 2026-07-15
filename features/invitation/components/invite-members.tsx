'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import {
  inviteMembersSchema,
  type InviteMembersFormData,
} from '../validation/invite-members-form-schema'
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
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'

type InviteMembersFormProps = React.ComponentProps<'div'>

export function InviteMembers({ className, ...props }: InviteMembersFormProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<InviteMembersFormData>({
    resolver: zodResolver(inviteMembersSchema),
    defaultValues: {
      email: '',
      role: 'member',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: InviteMembersFormData) {
    console.log(data)

    setOpen(false)
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
          <Button variant='outline'>Invite Members</Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-sm'>
          <DialogHeader>
            <DialogTitle>Invite Members</DialogTitle>
            <DialogDescription>
              Invite members to the current active workspace.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name='email'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor='email'>Email</FieldLabel>
                    <Input
                      {...field}
                      id='email'
                      type='email'
                      placeholder='m@example.com'
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
                name='role'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation='responsive'
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor='role'>Role</FieldLabel>
                      <FieldDescription>
                        Select a role for the new member
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id='role'
                        aria-invalid={fieldState.invalid}
                        className='min-w-30'
                      >
                        <SelectValue placeholder='Select a role' />
                      </SelectTrigger>
                      <SelectContent position='item-aligned'>
                        <SelectItem value='member'>Member</SelectItem>
                        <SelectItem value='admin'>Admin</SelectItem>
                        <SelectItem value='owner'>Owner</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              <Field orientation='horizontal' className='justify-end'>
                <DialogClose asChild>
                  <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <Button type='submit' disabled={isSubmitting}>
                  {isSubmitting && <Spinner data-icon='inline-start' />}
                  <span>Send Invitation</span>
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
