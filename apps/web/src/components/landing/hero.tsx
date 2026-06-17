import Link from 'next/link'

export function LandingHero() {
  return (
    <section className='relative overflow-hidden px-6 pt-28 pb-20 text-center'>
      {/* Background glow */}
      <div
        className='pointer-events-none absolute top-[-30%] left-1/2 -translate-x-1/2'
        style={{
          width: '800px',
          height: '800px',
          background:
            'radial-gradient(ellipse, oklch(0.70 0.16 240 / 0.12) 0%, transparent 60%)',
        }}
        aria-hidden='true'
      />

      <div className='relative mx-auto max-w-5xl'>
        {/* Eyebrow */}
        <div className='mb-7 inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-1.5'>
          <span className='h-1.5 w-1.5 rounded-full bg-blue-500' />
          <span className='font-medium font-mono text-[11px] text-zinc-500 uppercase tracking-[0.06em]'>
            v1.0 — Lançamento 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className='mx-auto max-w-3xl font-bold font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.08] tracking-tight'>
          Suas finanças pessoais{' '}
          <span className='text-blue-500'>numa visão só</span>
        </h1>

        <p className='mx-auto mt-4 max-w-lg text-lg text-zinc-400 leading-relaxed'>
          Acompanhe receitas, despesas, contas a pagar e metas financeiras em um
          dashboard simples e direto. Sem planilhas, sem complicação.
        </p>

        {/* Actions */}
        <div className='mt-9 flex flex-wrap items-center justify-center gap-3.5'>
          <Link
            href='/signup'
            className='inline-flex items-center gap-2 rounded-md bg-blue-500 px-8 py-3.5 font-semibold text-base text-black transition-all hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.141_0.005_285.823)] active:translate-y-px'
          >
            Criar conta grátis →
          </Link>
          <Link
            href='/signin'
            className='inline-flex items-center gap-2 rounded-md border border-white/10 bg-transparent px-8 py-3.5 font-medium text-base text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.141_0.005_285.823)]'
          >
            Ver demonstração
          </Link>
        </div>
      </div>
    </section>
  )
}
