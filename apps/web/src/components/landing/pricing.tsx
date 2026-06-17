import Link from 'next/link'

const perks = [
  'Dashboard completo com gráficos',
  'Até 100 transações por mês',
  '3 metas financeiras ativas',
  'Categorias personalizadas',
  'Contas a pagar e receber',
]

export function LandingPricing() {
  return (
    <section id='planos' className='border-white/10 border-t px-6 py-24'>
      <div className='mx-auto max-w-5xl text-center'>
        <span className='font-mono font-semibold text-blue-500 text-xs uppercase tracking-[0.08em]'>
          Planos
        </span>
        <h2 className='mt-3 font-bold font-display text-[clamp(1.75rem,3.4vw,2.375rem)] leading-tight tracking-tight'>
          Simples desde o começo
        </h2>
        <p className='mx-auto mt-3 max-w-lg text-[17px] text-zinc-400 leading-relaxed'>
          Um plano gratuito generoso. Upgrade só quando fizer sentido.
        </p>

        <div className='mx-auto mt-10 max-w-sm rounded-2xl border border-white/10 bg-[oklch(0.18_0.006_286)] p-9 text-center'>
          <div className='font-bold font-display text-[2.75rem] tracking-tight'>
            Grátis{' '}
            <span className='font-normal text-lg text-zinc-500 tracking-normal'>
              / sempre
            </span>
          </div>

          <ul className='my-7 flex flex-col gap-3 text-left'>
            {perks.map(p => (
              <li
                key={p}
                className='flex items-center gap-2.5 text-sm text-zinc-400'
              >
                <span className='h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500' />
                {p}
              </li>
            ))}
          </ul>

          <Link
            href='/signup'
            className='inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-500 px-8 py-3.5 font-semibold text-base text-black transition-all hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.141_0.005_285.823)] active:translate-y-px'
          >
            Criar conta grátis →
          </Link>

          <p className='mt-3 text-sm text-zinc-500'>
            Premium em breve — R$ 9,90/mês com transações ilimitadas e metas sem
            limite.
          </p>
        </div>
      </div>
    </section>
  )
}
