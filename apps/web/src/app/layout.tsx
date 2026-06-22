import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { FinanceProvider } from '@/contexts/finance-context'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oiko',
  description: 'Controle de finanças',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='pt-BR' suppressHydrationWarning>
      <FinanceProvider>
        <body className='bg-background font-body font-mono text-foreground'>
          <Providers
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </Providers>
        </body>
      </FinanceProvider>
    </html>
  )
}
