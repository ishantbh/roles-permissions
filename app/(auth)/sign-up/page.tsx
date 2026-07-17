import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { SignUpForm } from '@/features/auth/components/sign-up-form'

type SignUpPageProps = {
  searchParams: Promise<{ redirect?: string }>
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const { redirect: redirectTo } = await searchParams

  if (session) {
    if (redirectTo?.startsWith('/') && !redirectTo?.startsWith('//')) {
      redirect(redirectTo)
    } else {
      redirect('/dashboard')
    }
  }

  return <SignUpForm />
}
