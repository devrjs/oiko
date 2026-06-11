import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactElement } from 'react'

interface SidebarLinkProps {
  name: string
  href: string
  icon: ReactElement
}

export function SidebarLink({ name, href, icon }: SidebarLinkProps) {
  const pathName = usePathname()

  return (
    <li
      className={`${pathName === href && 'text-green-500'} hover:text-green-500`}
    >
      <Link
        href={href}
        className={`flex items-center ${
          pathName === href &&
          'after:h-12 after:w-[7px] after:rounded-l-lg after:bg-yellow-500'
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
