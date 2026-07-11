import { LogOutIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function LogoutButton() {
  return (
    <Button variant='destructive' size='icon' title='Logout'>
      <LogOutIcon />
      <span className='sr-only'>Logout</span>
    </Button>
  )
}
