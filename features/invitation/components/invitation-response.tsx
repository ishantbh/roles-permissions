'use client'

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
}

export function InvitationResponse({
  organizationName,
}: InvitationResponseProps) {
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
            >
              Accept Invitation
            </Button>

            <Button variant='destructive' size='lg'>
              Reject Invitation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
