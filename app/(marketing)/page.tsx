import { Footer } from '@/components/landing-page/footer'
import { Header } from '@/components/landing-page/header'

export default function HomePage() {
  return (
    <div className='min-h-screen w-full flex flex-col'>
      <Header />

      <main className='w-full max-w-3xl mx-auto p-4 grow flex'>
        <div className='flex flex-col items-center justify-center gap-4 w-full text-center'>
          <h1 className='text-5xl font-semibold'>Roles & Permissions</h1>
          <p className='text-xl text-muted-foreground'>
            Better Auth organizations with roles and permissions in Next.js with
            user invitations, role based access control, and more.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
