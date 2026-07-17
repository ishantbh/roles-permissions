'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { authClient } from '@/lib/auth/auth-client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type InvitationResponseProps = {
  organizationName: string
  invitationId: string
}

export function InvitationResponse({
  organizationName,
  invitationId,
}: InvitationResponseProps) {
  const router = useRouter()

  async function acceptInvitation() {
    try {
      const { error } = await authClient.organization.acceptInvitation({
        invitationId,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Successfully accepted invitation')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Error accepting invitation')
    }
  }

  async function rejectInvitation() {
    try {
      const { error } = await authClient.organization.rejectInvitation({
        invitationId,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Invitation rejected')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Error rejecting invitation')
    }
  }

  return (
    <div className='w-full max-w-sm mt-4'>
      <Card>
        <CardHeader>
          <CardTitle>{organizationName}</CardTitle>
          <CardDescription>Accept or reject the invitation</CardDescription>
        </CardHeader>
        <CardContent>
          <h2>
            You have been invited to join: <strong>{organizationName}</strong>
          </h2>

          <div className='flex items-center justify-center gap-4 mt-4'>
            <Button
              size='lg'
              className='bg-green-500/10 text-green-500 hover:bg-green-500/20 focus-visible:border-green-500/40 focus-visible:ring-green-500/20 dark:bg-green-500/20 dark:hover:bg-green-500/30 dark:focus-visible:ring-green-500/40'
              onClick={acceptInvitation}
            >
              Accept Invitation
            </Button>

            <Button variant='destructive' size='lg' onClick={rejectInvitation}>
              Reject Invitation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
