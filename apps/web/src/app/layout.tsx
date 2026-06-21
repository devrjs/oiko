import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import type { ReactNode } from 'react'
import { FinanceProvider } from '@/contexts/finance-context'
import { ReactQueryProvider } from './react-query-provider'
import './globals.css'

const geist_display = Geist({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--display-family',
})

const geist_body = Geist({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--body-family',
})

const geist_mono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Oiko',
  description: 'Controle de finanças',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <html
        lang='pt-BR'
        className={`${geist_display.variable} ${geist_body.variable} ${geist_mono.variable}`}
      >
        <FinanceProvider>
          <body className='bg-background font-body text-foreground'>
            {children}
          </body>
        </FinanceProvider>
      </html>
    </ReactQueryProvider>
  )
}
