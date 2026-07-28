'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from 'lucide-react'

import { Button } from './ui/button'

export function GoBackButton({ fallbackUrl = '/' }: { fallbackUrl?: string }) {
  const router = useRouter()

  function handleBack() {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push(fallbackUrl)
    }
  }

  return (
    <Button size='icon-lg' variant='outline' onClick={handleBack}>
      <ArrowLeftIcon className='size-5' />
      <span className='sr-only'>Go back to projects</span>
    </Button>
  )
}
