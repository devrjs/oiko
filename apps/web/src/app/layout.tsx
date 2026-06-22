import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { FinanceProvider } from '@/contexts/finance-context'
import { ReactQueryProvider } from './react-query-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oiko',
  description: 'Controle de finanças',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <html lang='pt-BR'>
        <FinanceProvider>
          <body className='bg-background font-body font-mono text-foreground'>
            {children}
          </body>
        </FinanceProvider>
      </html>
    </ReactQueryProvider>
  )
}
