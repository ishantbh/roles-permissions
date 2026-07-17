import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { LoginForm } from '@/features/auth/components/login-form'

type LoginPageProps = {
  searchParams: Promise<{ redirect?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const { redirect: redirectTo } = await searchParams

  if (session) {
    redirect(redirectTo ?? '/dashboard')
  }

  return <LoginForm />
}
