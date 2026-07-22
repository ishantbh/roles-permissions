import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

import { auth } from '@/lib/auth'
import { getProjectsByActiveOrg } from '@/features/projects/data/get-projects-by-active-org'
import { ProjectDialog } from '@/features/projects/components/project-dialog'
import { ProjectsList } from '@/features/projects/components/projects-list'

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

  const activeOrg = organizations.find((org) => org.id === activeOrganizationId)

  if (!activeOrg) {
    redirect('/dashboard')
  }

  const projects = await getProjectsByActiveOrg({
    userId: session.user.id,
    activeOrgId: activeOrganizationId,
  })

  if (!projects) {
    toast.error('You are not a member of this workspace')
    redirect('/dashboard')
  }

  return (
    <div className='grow flex flex-col items-center gap-4 mt-4'>
      <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4'>
        <h1 className='text-2xl sm:text-3xl font-semibold text-center'>
          {activeOrg.name}
        </h1>

        <ProjectDialog />
      </div>

      <ProjectsList projects={projects} />
    </div>
  )
}
