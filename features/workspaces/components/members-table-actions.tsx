'use client'

import { useEffect, useState } from 'react'
import { PencilIcon, Trash2Icon } from 'lucide-react'

import { authClient } from '@/lib/auth/auth-client'
import { Button } from '@/components/ui/button'

export function MembersTableActions() {
  const [canUpdateMember, setCanUpdateMember] = useState(false)
  const [canRemoveMember, setCanRemoveMember] = useState(false)

  useEffect(() => {
    async function checkPermissions() {
      const canUpdateMember = await authClient.organization.hasPermission({
        permissions: {
          member: ['update'],
        },
      })

      setCanUpdateMember(canUpdateMember.data?.success ?? false)

      const canRemoveMember = await authClient.organization.hasPermission({
        permissions: {
          member: ['delete'],
        },
      })

      setCanRemoveMember(canRemoveMember.data?.success ?? false)
    }
    checkPermissions()
  }, [authClient])

  return (
    <div className='flex items-center gap-3 justify-end'>
      <Button
        variant='outline'
        size='icon'
        title='Edit'
        disabled={!canUpdateMember}
      >
        <PencilIcon className='size-4' />
        <span className='sr-only'>Edit</span>
      </Button>
      <Button
        variant='destructive'
        size='icon'
        title='Delete'
        disabled={!canRemoveMember}
      >
        <Trash2Icon className='size-4' />
        <span className='sr-only'>Delete</span>
      </Button>
    </div>
  )
}
