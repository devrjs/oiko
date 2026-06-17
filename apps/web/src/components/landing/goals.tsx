const goals = [
  {
    label: 'Fundo de emergência',
    current: 8500,
    target: 15000,
    percent: 57,
  },
  {
    label: 'Viagem de fim de ano',
    current: 3200,
    target: 8000,
    percent: 40,
  },
  {
    label: 'Curso / especialização',
    current: 2100,
    target: 3500,
    percent: 60,
  },
]

export function LandingGoals() {
  return (
    <section className='px-6 py-24'>
      <div className='mx-auto max-w-5xl'>
        <span className='font-mono font-semibold text-blue-500 text-xs uppercase tracking-[0.08em]'>
          Acompanhamento
        </span>
        <h2 className='mt-3 font-bold font-display text-[clamp(1.75rem,3.4vw,2.375rem)] leading-tight tracking-tight'>
          Metas que mostram seu progresso
        </h2>
        <p className='mt-3 max-w-lg text-[17px] text-zinc-400 leading-relaxed'>
          Defina onde quer chegar e veja o percentual de cada objetivo
          atualizado automaticamente.
        </p>

        <div className='mt-10 grid gap-4 md:grid-cols-3'>
          {goals.map(g => (
            <div
              key={g.label}
              className='rounded-lg border border-white/10 bg-[oklch(0.18_0.006_286)] p-5'
            >
              <div className='font-medium text-sm text-zinc-500'>{g.label}</div>
              <div className='mt-1 font-mono font-semibold text-base'>
                R$ {g.current.toLocaleString('pt-BR')}{' '}
                <span className='font-normal text-sm text-zinc-500'>
                  / R$ {g.target.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className='mt-2.5 flex items-center gap-2.5'>
                <div className='h-1.5 flex-1 overflow-hidden rounded-full bg-white/10'>
                  <div
                    className='h-full rounded-full bg-[#ffc01e]'
                    style={{ width: `${g.percent}%` }}
                  />
                </div>
                <span className='font-mono text-xs text-zinc-500'>
                  {g.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
