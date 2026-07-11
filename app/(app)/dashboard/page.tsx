import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  return (
    <div className='grow flex items-center justify-center text-center'>
      <h1 className='text-2xl sm:text-3xl font-semibold'>
        Welcome {session.user.name}!
      </h1>
    </div>
  )
}
