import Link from 'next/link'
import { Button } from '../ui/button'
import { ThemeToggle } from '../theme/theme-toggle'

export function Header() {
  return (
    <header className='border-b fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur'>
      <div className='w-full max-w-7xl mx-auto flex items-center justify-between gap-4 p-4'>
        <Link href='/' className='text-xl sm:text-2xl font-semibold'>
          Playground
        </Link>

        <div className='flex items-center justify-between gap-4'>
          <nav>
            <Button variant='link' className='text-foreground' asChild>
              <Link href='/dashboard'>Get Started</Link>
            </Button>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
