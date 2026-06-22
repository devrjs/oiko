import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { FinanceProvider } from '@/contexts/finance-context'
import { ReactQueryProvider } from './react-query-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oiko',
  description: 'Controle de finanças',
}

const monospaceFonts =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <html
        lang='pt-BR'
        style={
          {
            '--display-family': monospaceFonts,
            '--body-family': monospaceFonts,
            '--font-mono': monospaceFonts,
          } as React.CSSProperties
        }
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
