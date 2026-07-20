import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { WorkspaceSwitcher } from '@/features/workspaces/components/workspace-switcher'
import { MembersTable } from '../../../features/workspaces/components/members-table'
import { InviteMembers } from '@/features/invitation/components/invite-members'

export default async function DashboardPage() {
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

  const { success: canInviteMembers } = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        member: ['create'],
      },
    },
  })

  return (
    <div className='grow flex flex-col items-center gap-4 mt-4'>
      <h1 className='text-2xl sm:text-3xl font-semibold text-center'>
        Welcome {session.user.name}!
      </h1>

      <WorkspaceSwitcher />

      {canInviteMembers && <InviteMembers />}

      {activeOrganizationId && <MembersTable />}
    </div>
  )
}
