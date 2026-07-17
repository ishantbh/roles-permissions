import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { InvitationResponse } from '@/features/invitation/components/invitation-response'

type AcceptInvitationPageProps = {
  params: Promise<{ token: string }>
}

export default async function AcceptInvitationPage({
  params,
}: AcceptInvitationPageProps) {
  const { token } = await params

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect(
      `/login?redirect=${encodeURIComponent(`/accept-invitation/${token}`)}`,
    )
  }

  const invitation = await auth.api.getInvitation({
    query: {
      id: token,
    },
    headers: await headers(),
  })

  return (
    <div className='grow flex flex-col items-center gap-4 mt-4'>
      <h1 className='text-2xl sm:text-3xl font-semibold text-center'>
        Welcome {session.user.name}!
      </h1>

      <InvitationResponse
        organizationName={invitation.organizationName}
        invitationId={invitation.id}
      />
    </div>
  )
}
