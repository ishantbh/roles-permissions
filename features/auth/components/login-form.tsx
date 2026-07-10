'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { cn } from '@/lib/utils'
import {
  loginSchema,
  type LoginFormData,
} from '../validation/login-form-schema'
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: LoginFormData) {
    // TODO: Handle login
    console.log('Submitted data:', data)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name='password'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className='flex items-center'>
                      <FieldLabel htmlFor='password'>Password</FieldLabel>
                      <Link
                        href='/forgot-password'
                        className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      {...field}
                      id='password'
                      type='password'
                      aria-invalid={fieldState.invalid}
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Field>
                <Button type='submit'>Login</Button>
                <Button variant='outline' type='button'>
                  Login with Google
                </Button>
                <FieldDescription className='text-center'>
                  Don&apos;t have an account?{' '}
                  <Link href='/sign-up'>Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
