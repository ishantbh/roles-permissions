import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { WorkspaceForm } from '@/features/workspaces/components/workspace-form'

export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
  })

  if (organizations.length !== 0) {
    redirect('/dashboard')
  }

  return (
    <div className='grow flex flex-col items-center gap-4'>
      <h1 className='text-2xl sm:text-3xl font-semibold text-center mt-4'>
        Welcome {session.user.name}!
      </h1>
      <p className='sm:text-lg font-medium text-muted-foreground text-center'>
        Let&apos;s create your first workspace.
      </p>

      <div className='w-full max-w-sm mt-4'>
        <Card>
          <CardHeader>
            <CardTitle>Create Workspace</CardTitle>
            <CardDescription>Create your first workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <WorkspaceForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
