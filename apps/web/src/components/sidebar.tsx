'use client'

import {
  Coins,
  HelpingHand,
  LayoutDashboard,
  LogOut,
  Tags,
  User,
  Wallet,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { LogoName } from './logo-name'
import { SidebarLink } from './sidebar-link'

interface SidebarProps {
  expanded: boolean
}

export function Sidebar({ expanded }: SidebarProps) {
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut()
    router.push('/')
  }

  return (
    <aside
      className={`${
        expanded ? 'block w-72 lg:w-16' : 'hidden w-16 lg:block lg:w-72'
      } h-fit rounded-2xl bg-card py-2 duration-500`}
    >
      <div className='ml-4 overflow-hidden'>
        <LogoName />
      </div>

      <ul className='overflow-hidden text-foreground'>
        <SidebarLink
          href='/dashboard'
          name='Dashboard'
          icon={<LayoutDashboard />}
        />
        <SidebarLink
          href='/finances'
          name='Finanças Realizadas'
          icon={<Coins />}
        />
        <SidebarLink
          href='/pendencies'
          name='Finanças Pendentes'
          icon={<HelpingHand />}
        />
        <SidebarLink
          href='/category'
          name='Categorizar Finança'
          icon={<Tags />}
        />
        <SidebarLink href='/goals' name='Carteira e Metas' icon={<Wallet />} />
        <SidebarLink href='/profile' name='Perfil do Usuário' icon={<User />} />
      </ul>

      <button
        type='button'
        onClick={handleSignOut}
        className='flex w-full items-center overflow-hidden rounded-b-2xl hover:text-destructive'
      >
        <span className='flex h-14 min-w-[60px] items-center justify-center text-[32px]'>
          <LogOut />
        </span>
        <span className='whitespace-nowrap px-2'>Sair</span>
      </button>
    </aside>
  )
}
