import { Metadata } from 'next'
import Link from 'next/link'
import { FrownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Not Found',
}

export default function NotFound() {
  return (
    <main className='flex-1 flex flex-col items-center justify-center gap-4'>
      <FrownIcon className='size-10 text-gray-400' />

      <h1 className='text-xl sm:text-2xl font-semibold'>404 Not Found</h1>
      <p className='text-lg font-medium text-muted-foreground'>
        Could not find the requested resource
      </p>

      <Button asChild>
        <Link href='/'>Go Back Home</Link>
      </Button>
    </main>
  )
}
