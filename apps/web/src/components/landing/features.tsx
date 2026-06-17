import { BarChart3, CalendarClock, Target, TrendingUp } from 'lucide-react'

const monthLabels = [
  '01/06',
  '05/06',
  '10/06',
  '15/06',
  '20/06',
  '25/06',
  '30/06',
]

const bars = [
  { id: 'day-1', h: 40 },
  { id: 'day-2', h: 72 },
  { id: 'day-3', h: 52 },
  { id: 'day-4', h: 88 },
  { id: 'day-5', h: 60 },
  { id: 'day-6', h: 96 },
  { id: 'day-7', h: 44 },
]

const stats = [
  { label: 'Gastos do mês', value: '-R$ 3.247,00', color: 'text-red-400' },
  { label: 'Ganhos do mês', value: '+R$ 6.890,00', color: 'text-green-400' },
  { label: 'Saldo', value: 'R$ 3.643,00', color: 'text-blue-400' },
]

const features = [
  {
    icon: TrendingUp,
    title: 'Receitas e despesas',
    desc: 'Registre entradas e saídas com categorias personalizadas. Visualize tudo no dashboard com gráficos que mostram a evolução dos seus gastos.',
  },
  {
    icon: CalendarClock,
    title: 'Contas a pagar/receber',
    desc: 'Acompanhe os compromissos futuros com clareza. Saiba exatamente o que vence, quando vence, e evite surpresas no fim do mês.',
  },
  {
    icon: Target,
    title: 'Metas financeiras',
    desc: 'Defina objetivos com valor inicial, valor alvo e data. Acompanhe o progresso em tempo real com indicadores visuais de cada meta.',
  },
]

export function LandingFeatures() {
  return (
    <section id='recursos' className='border-white/10 border-y px-6 py-24'>
      <div className='mx-auto max-w-5xl'>
        <span className='font-mono font-semibold text-blue-500 text-xs uppercase tracking-[0.08em]'>
          Recursos
        </span>
        <h2 className='mt-3 font-bold font-display text-[clamp(1.75rem,3.4vw,2.375rem)] leading-tight tracking-tight'>
          O essencial para o controle financeiro
        </h2>
        <p className='mt-3 max-w-lg text-[17px] text-zinc-400 leading-relaxed'>
          Dashboard com métricas em tempo real, categorização inteligente e
          metas que mostram seu progresso.
        </p>

        {/* Dashboard Preview */}
        <div className='mt-[52px] overflow-hidden rounded-xl border border-white/10 bg-[oklch(0.18_0.006_286)] p-6 sm:p-10'>
          {/* Stats grid */}
          <div className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3'>
            {stats.map(s => (
              <div
                key={s.label}
                className='rounded-lg border border-white/10 bg-[oklch(0.22_0.007_286)] p-5'
              >
                <div className='font-medium text-xs text-zinc-500 uppercase tracking-wide'>
                  {s.label}
                </div>
                <div
                  className={`mt-1.5 font-mono font-semibold text-xl tracking-tight ${s.color}`}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div
            className='flex items-end gap-1.5 rounded-lg border border-white/10 bg-[oklch(0.22_0.007_286)] p-3'
            role='img'
            aria-label='Gráfico de gastos vs ganhos ao longo dos dias'
          >
            {bars.map(b => (
              <div
                key={b.id}
                className='flex-1 rounded-sm'
                style={{
                  height: `${b.h}px`,
                  minHeight: '16px',
                  background:
                    b.id === 'day-4' || b.id === 'day-6'
                      ? 'oklch(0.70 0.16 240 / 0.5)'
                      : 'oklch(0.70 0.16 240 / 0.2)',
                }}
              />
            ))}
          </div>

          {/* X-axis labels */}
          <div className='mt-2 flex justify-between font-mono text-[11px] text-zinc-500 tracking-wide'>
            {monthLabels.map(l => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className='mt-[52px] grid gap-5 md:grid-cols-3'>
          {features.map(f => (
            <div
              key={f.title}
              className='group rounded-xl border border-white/10 bg-[oklch(0.18_0.006_286)] p-8 transition-all hover:-translate-y-0.5 hover:border-blue-500/20'
            >
              <div className='mb-4 grid h-10 w-10 place-items-center rounded-lg bg-blue-500/15'>
                <f.icon size={20} className='text-blue-500' />
              </div>
              <h3 className='font-display font-semibold text-lg tracking-tight'>
                {f.title}
              </h3>
              <p className='mt-2 text-sm text-zinc-400 leading-relaxed'>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
