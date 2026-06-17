import Link from 'next/link'

export function LandingFooter() {
  return (
    <footer className='border-white/10 border-t px-6 py-9'>
      <div className='mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4'>
        <span className='text-sm text-zinc-500'>
          © 2026 Oiko. Código aberto sob MIT.
        </span>
        <nav className='flex gap-6'>
          <Link
            href='#'
            className='text-sm text-zinc-500 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.141_0.005_285.823)]'
          >
            Privacidade
          </Link>
          <Link
            href='#'
            className='text-sm text-zinc-500 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.141_0.005_285.823)]'
          >
            Termos
          </Link>
          <Link
            href='https://github.com'
            target='_blank'
            rel='noopener'
            className='text-sm text-zinc-500 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.141_0.005_285.823)]'
          >
            GitHub
          </Link>
        </nav>
      </div>
    </footer>
  )
}
