import type { Metadata } from 'next'
import { Geist_Mono, Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import { Providers } from '@/providers'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Auth Roles & Permissions',
  description: 'Auth Roles & Permissions',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={cn(
        'h-full antialiased font-sans',
        geistMono.variable,
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body className='min-h-full flex flex-col'>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
