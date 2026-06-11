import type { Metadata } from 'next'
import {
  Bai_Jamjuree as BaiJamjuree,
  JetBrains_Mono,
  Roboto_Flex as Roboto,
} from 'next/font/google'
import type { ReactNode } from 'react'
import { FinanceProvider } from '@/contexts/finance-context'
import { ReactQueryProvider } from './react-query-provider'
import './globals.css'
import { cn } from '@/lib/utils'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
})

export const metadata: Metadata = {
  title: 'Oiko',
  description: 'Controle de finanças',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <html lang='pt-BR' className={cn('font-mono', jetbrainsMono.variable)}>
        <FinanceProvider>
          <body
            className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-800 font-sans text-gray-100`}
          >
            {children}
          </body>
        </FinanceProvider>
      </html>
    </ReactQueryProvider>
  )
}
