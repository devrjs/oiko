import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactElement } from 'react'

interface SidebarLinkProps {
  name: string
  href: string
  icon: ReactElement
  onNavigate?: () => void
}

export function SidebarLink({ name, href, icon, onNavigate }: SidebarLinkProps) {
  const pathName = usePathname()

  return (
    <li className={`${pathName === href && 'text-primary'} hover:text-primary`}>
      <Link
        href={href}
        onClick={onNavigate}
        aria-current={pathName === href ? 'page' : undefined}
        className={`flex items-center ${
          pathName === href &&
          'after:h-12 after:w-[7px] after:rounded-l-lg after:bg-primary'
        }`}
      >
        <span className='flex h-14 min-w-[60px] items-center justify-center text-[32px]'>
          {icon}
        </span>
        <span className='w-full whitespace-nowrap px-2'>{name}</span>
      </Link>
    </li>
  )
}
