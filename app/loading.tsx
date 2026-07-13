import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  return (
    <main className='flex items-center justify-center flex-1'>
      <Spinner className='size-8 sm:size-12 text-muted-foreground' />
    </main>
  )
}
