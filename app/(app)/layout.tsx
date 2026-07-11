import { AppHeader } from '@/components/app-header'

type AppLayoutProps = {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className='min-h-screen w-full h-full flex flex-col'>
      <AppHeader />

      <main className='w-full max-w-7xl mx-auto p-4 grow flex'>{children}</main>
    </div>
  )
}
