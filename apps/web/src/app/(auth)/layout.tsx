'use client'

import { type ReactNode, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'

export default function MainLayout({ children }: { children: ReactNode }) {
  const [expandedSidebar, setExpandedSidebar] = useState(false)

  return (
    <div className='flex min-h-screen justify-center'>
      <div className='flex w-full max-w-[1600px] gap-4 overflow-auto p-4'>
        <Sidebar expanded={expandedSidebar} />

        <main className='flex w-full flex-col gap-4'>
          <Topbar
            expandedSidebar={() => setExpandedSidebar(!expandedSidebar)}
          />
          {children}
        </main>
      </div>
    </div>
  )
}
