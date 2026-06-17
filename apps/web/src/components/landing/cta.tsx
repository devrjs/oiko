import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export function LandingCta() {
  return (
    <section id='cta' className='px-6 pt-0 pb-24 text-center'>
      <div className='mx-auto max-w-5xl'>
        <span className='font-mono font-semibold text-blue-500 text-xs uppercase tracking-[0.08em]'>
          Vamos começar
        </span>
        <h2 className='mt-3 font-bold font-display text-[clamp(1.75rem,3.4vw,2.375rem)] leading-tight tracking-tight'>
          Pare de planilhas. Comece com Oiko.
        </h2>
        <p className='mx-auto mt-3 max-w-lg text-[17px] text-zinc-400 leading-relaxed'>
          Seus dados financeiros num lugar só, seguros e sempre atualizados.
          Crie sua conta em 30 segundos.
        </p>

        <div className='mt-8 flex flex-wrap items-center justify-center gap-3.5'>
          <Link
            href='/signup'
            className='inline-flex items-center gap-2 rounded-md bg-blue-500 px-8 py-3.5 font-semibold text-base text-black transition-all hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.141_0.005_285.823)] active:translate-y-px'
          >
            Criar conta grátis →
          </Link>
          <Link
            href='https://github.com'
            target='_blank'
            rel='noopener'
            className='inline-flex items-center gap-2 rounded-md border border-white/10 bg-transparent px-8 py-3.5 font-medium text-base text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.141_0.005_285.823)]'
          >
            <ArrowUpRight size={16} />
            Ver no GitHub
          </Link>
        </div>
      </div>
    </section>
  )
}
