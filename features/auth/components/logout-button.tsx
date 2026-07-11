'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { LogOutIcon } from 'lucide-react'

import { authClient } from '@/lib/auth/auth-client'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const { error } = await authClient.signOut()

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('You have been logged out successfully.')
    router.push('/login')
  }

  return (
    <Button
      variant='destructive'
      size='icon'
      title='Logout'
      onClick={handleLogout}
    >
      <LogOutIcon />
      <span className='sr-only'>Logout</span>
    </Button>
  )
}
