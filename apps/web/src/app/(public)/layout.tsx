import type { ReactNode } from 'react'
import { UnicornBackground } from '@/components/unicorn-background'

export default function GuestLayout({ children }: { children: ReactNode }) {
  return (
    // min-h-dvh + rolagem vertical: com teclado aberto ou em paisagem o
    // formulário inteiro precisa continuar alcançável (WCAG 1.4.10). O
    // canvas é fixo na viewport, então o vazio não "anda" no scroll.
    <div className='relative min-h-dvh w-full overflow-x-hidden overflow-y-auto bg-auth-void'>
      <UnicornBackground />

      <main className='relative z-10 flex min-h-dvh w-full items-center justify-center px-4 py-8'>
        {children}
      </main>
    </div>
  )
}
