'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import logo from '@/assets/logo.svg'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Recursos', href: '#recursos' },
  { label: 'Planos', href: '#planos' },
]

export function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
      setIsOpen(false)
    }
  }

  return (
    <header className='sticky top-0 z-50 border-white/10 border-b bg-[oklch(0.141_0.005_285.823)]/85 backdrop-blur-xl'>
      <div className='mx-auto flex h-16 max-w-5xl items-center justify-between px-6'>
        <Link href='/' className='flex items-center gap-2.5'>
          <Image
            alt='Logo Oiko'
            src={logo}
            width={0}
            height={0}
            style={{ width: '1.4rem', height: 'auto' }}
            priority
          />
          <span className='font-bold font-display text-xl tracking-tight'>
            Oiko
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className='hidden items-center gap-7 md:flex'>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => handleNavClick(e, link.href)}
              className='font-medium text-sm text-zinc-400 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.141_0.005_285.823)]'
            >
              {link.label}
            </a>
          ))}
          <Link
            href='/signin'
            className='inline-flex items-center gap-1.5 rounded-md bg-blue-500 px-5 py-2 font-semibold text-black text-sm transition-all hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.141_0.005_285.823)] active:translate-y-px'
          >
            Acessar app →
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type='button'
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen(o => !o)}
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-zinc-300 transition-colors hover:border-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden'
          )}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className='animate-fade-down border-white/10 border-t bg-[oklch(0.18_0.006_286)] px-6 py-5 md:hidden'>
          <div className='flex flex-col gap-4'>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className='font-medium text-sm text-zinc-400 transition-colors hover:text-zinc-100'
              >
                {link.label}
              </a>
            ))}
            <Link
              href='/signin'
              onClick={() => setIsOpen(false)}
              className='mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-blue-500 px-5 py-2.5 font-semibold text-black text-sm transition-all hover:bg-blue-400'
            >
              Acessar app →
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
