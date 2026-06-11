import type { ReactNode } from 'react'

export default function GuestLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-[url(../assets/bg-default.svg)]'>
      {children}
    </div>
  )
}
