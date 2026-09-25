'use client'

import { Coins, HelpingHand, LayoutDashboard, LogOut, Tags, User, Wallet, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { authClient } from '@/lib/auth-client'
import { LogoName } from './logo-name'
import { SidebarLink } from './sidebar-link'

interface SidebarProps {
  open: boolean
  onClose: () => void
  id?: string
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Sidebar({ open, onClose, id = 'app-sidebar' }: SidebarProps) {
  const router = useRouter()
  const asideRef = useRef<HTMLElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  // No desktop (lg+) a sidebar e estatica: role='dialog' + aria-modal la
  // faria o leitor de tela anunciar um modal que nao existe. Em mobile o
  // drawer continua dialog modal.
  const [isDrawer, setIsDrawer] = useState(
    () =>
      typeof window !== 'undefined' &&
      !window.matchMedia('(min-width: 1024px)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setIsDrawer(!mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  async function handleSignOut() {
    await authClient.signOut()
    router.push('/')
  }

  useEffect(() => {
    // O lock de scroll + focus trap so fazem sentido no drawer (mobile).
    // No desktop a sidebar e estatica: armadilharia o Tab e congelaria a
    // pagina se o gatilho fosse clicado por toque/acidentalmente.
    if (!open || !isDrawer) {
      return
    }

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const aside = asideRef.current
    aside?.focus({ preventScroll: true })

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !aside) {
        return
      }

      const focusable = Array.from(
        aside.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter(element => element.offsetParent !== null)

      if (focusable.length === 0) {
        event.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
      previouslyFocusedRef.current?.focus({ preventScroll: true })
    }
  }, [open, onClose, isDrawer])

  return (
    <>
      <div
        aria-hidden='true'
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        ref={asideRef}
        id={id}
        tabIndex={-1}
        role={isDrawer ? 'dialog' : 'navigation'}
        aria-modal={isDrawer ? 'true' : undefined}
        aria-label='Navegação principal'
        className={`fixed inset-y-0 left-0 z-50 flex max-h-[100dvh] w-72 max-w-[85vw] flex-col overflow-y-auto rounded-r-2xl bg-card py-2 outline-none transition-transform duration-300 ease-out lg:static lg:z-auto lg:h-fit lg:max-w-none lg:translate-x-0 lg:rounded-2xl ${
          open ? 'translate-x-0 visible' : '-translate-x-full invisible lg:visible'
        }`}
      >
        <div className='flex items-center justify-between'>
          <div className='ml-4 overflow-hidden'>
            <LogoName />
          </div>
          <button
            type='button'
            onClick={onClose}
            aria-label='Fechar menu de navegação'
            className='mr-2 grid min-h-[44px] min-w-[44px] place-items-center rounded-none outline-none hover:bg-muted focus-visible:ring-1 focus-visible:ring-ring lg:hidden'
          >
            <X size={24} aria-hidden='true' />
          </button>
        </div>

        <ul className='overflow-hidden text-foreground'>
          <SidebarLink
            href='/dashboard'
            name='Dashboard'
            icon={<LayoutDashboard />}
            onNavigate={onClose}
          />
          <SidebarLink
            href='/finances'
            name='Finanças Realizadas'
            icon={<Coins />}
            onNavigate={onClose}
          />
          <SidebarLink
            href='/pendencies'
            name='Finanças Pendentes'
            icon={<HelpingHand />}
            onNavigate={onClose}
          />
          <SidebarLink
            href='/category'
            name='Categorizar Finança'
            icon={<Tags />}
            onNavigate={onClose}
          />
          <SidebarLink
            href='/goals'
            name='Carteira e Metas'
            icon={<Wallet />}
            onNavigate={onClose}
          />
          <SidebarLink
            href='/profile'
            name='Perfil do Usuário'
            icon={<User />}
            onNavigate={onClose}
          />
        </ul>

        <button
          type='button'
          onClick={handleSignOut}
          className='flex min-h-[44px] w-full items-center overflow-hidden rounded-b-2xl outline-none hover:text-destructive focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-inset'
        >
          <span className='flex h-14 min-w-[60px] items-center justify-center text-[32px]'>
            <LogOut />
          </span>
          <span className='whitespace-nowrap px-2'>Sair</span>
        </button>
      </aside>
    </>
  )
}
