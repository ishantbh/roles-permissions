import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

export default async function ProjectsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
  })

  if (organizations.length === 0) {
    redirect('/onboarding')
  }

  const { activeOrganizationId } = session.session

  if (!activeOrganizationId) {
    redirect('/dashboard')
  }

  return <div>Projects</div>
}
