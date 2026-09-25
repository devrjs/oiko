'use client'

import { usePathname } from 'next/navigation'
import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'

const SIDEBAR_ID = 'app-sidebar'

export default function MainLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
  }, [])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(previous => !previous)
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  return (
    <div className='flex min-h-screen justify-center'>
      <a
        href='#conteudo-principal'
        className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:font-mono focus:text-primary-foreground focus:text-xs focus:outline-none focus:ring-1 focus:ring-ring'
      >
        Pular para conteúdo
      </a>
      <div className='flex w-full max-w-[1600px] gap-4 overflow-auto p-4'>
        <Sidebar open={sidebarOpen} onClose={closeSidebar} id={SIDEBAR_ID} />

        <main
          id='conteudo-principal'
          tabIndex={-1}
          className='flex w-full min-w-0 flex-col gap-4 focus:outline-none'
        >
          <Topbar
            onToggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
            sidebarControlsId={SIDEBAR_ID}
          />
          {children}
        </main>
      </div>
    </div>
  )
}
