'use client'

import { Metadata } from 'next'
import { FrownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Something went wrong',
}

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <main className='flex-1 flex flex-col items-center justify-center gap-4'>
      <FrownIcon className='size-10 text-gray-400' />

      <h1 className='text-2xl sm:text-3xl font-semibold'>Error</h1>
      <p className='text-lg font-medium text-muted-foreground'>
        {error.message || 'Something went wrong'}
      </p>

      <Button onClick={() => unstable_retry()} size='lg'>
        Try again
      </Button>
    </main>
  )
}
