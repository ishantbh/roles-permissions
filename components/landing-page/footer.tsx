import { Button } from '../ui/button'

export function Footer() {
  return (
    <footer className='border-t'>
      <p className='text-center flex items-center justify-center p-4'>
        <small>
          &copy; 2026 Playground by{' '}
          <Button
            variant='link'
            size='xs'
            className='p-0 underline text-foreground'
          >
            <a
              href='https://github.com/ishantbh'
              target='_blank'
              rel='noreferrer'
            >
              Ishant
            </a>
          </Button>
        </small>
      </p>
    </footer>
  )
}
