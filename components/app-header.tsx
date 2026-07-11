import Link from 'next/link'

import { ThemeToggle } from './theme/theme-toggle'
import { LogoutButton } from '@/features/auth/components/logout-button'

export function AppHeader() {
  return (
    <header className='border-b'>
      <div className='w-full max-w-7xl mx-auto flex items-center justify-between gap-4 p-4'>
        <Link href='/dashboard' className='text-xl sm:text-2xl font-semibold'>
          Playground
        </Link>

        <div className='flex items-center justify-between gap-2'>
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
