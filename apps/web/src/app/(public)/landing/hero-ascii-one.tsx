'use client'

import {
  ArrowUpRight,
  CalendarClock,
  Menu,
  Moon,
  Sun,
  Target,
  TrendingUp,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const stats = [
  {
    label: 'Gastos do mês',
    value: '-R$ 3.247,00',
    color: 'text-muted-foreground font-bold',
  },
  {
    label: 'Ganhos do mês',
    value: '+R$ 6.890,00',
    color: 'text-foreground font-bold',
  },
  { label: 'Saldo', value: 'R$ 3.643,00', color: 'text-foreground font-bold' },
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

const monthLabels = [
  '01/06',
  '05/06',
  '10/06',
  '15/06',
  '20/06',
  '25/06',
  '30/06',
]

const features = [
  {
    icon: TrendingUp,
    title: 'Receitas e despesas',
    desc: 'Registre entradas e saídas com categorias personalizadas. Visualize tudo no seu dashboard com relatórios analíticos de fácil compreensão.',
  },
  {
    icon: CalendarClock,
    title: 'Contas a pagar/receber',
    desc: 'Acompanhe os compromissos futuros com clareza matemática. Saiba exatamente o que vence, quando vence, e evite qualquer surpresa.',
  },
  {
    icon: Target,
    title: 'Metas financeiras',
    desc: 'Defina objetivos com valor inicial, valor alvo e data limite. Monitore o progresso em tempo real com barras de progresso dedicadas.',
  },
]

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

const perks = [
  'Dashboard completo com gráficos',
  'Até 100 transações por mês',
  '3 metas financeiras ativas',
  'Categorias personalizadas',
  'Contas a pagar e receber',
]

export default function AnimationPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])
  const dotKeys = Array.from({ length: 45 }, (_, idx) => `dot-${idx}`)

  useEffect(() => {
    const initUnicorn = () => {
      const unicorn = (window as any).UnicornStudio
      if (unicorn && typeof unicorn.init === 'function') {
        try {
          unicorn.init()
        } catch (e) {
          console.error('Error initializing UnicornStudio:', e)
        }
      }
    }

    let scriptElement: HTMLScriptElement | null = null
    if (!(window as any).UnicornStudio) {
      scriptElement = document.createElement('script')
      scriptElement.src = '/unicorn/unicornStudio.umd.js'
      scriptElement.async = true
      scriptElement.onload = () => {
        initUnicorn()
      }
      document.head.appendChild(scriptElement)
    } else {
      initUnicorn()
    }

    const style = document.createElement('style')
    style.textContent = `
      [data-us-project], [data-us-project-src] {
        position: relative !important;
        overflow: hidden !important;
      }
      
      [data-us-project] canvas, [data-us-project-src] canvas {
        clip-path: inset(0 0 10% 0) !important;
      }
      
      [data-us-project] *, [data-us-project-src] * {
        pointer-events: none !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"],
      [data-us-project-src] a[href*="unicorn"],
      [data-us-project-src] button[title*="unicorn"],
      [data-us-project-src] div[title*="Made with"],
      [data-us-project-src] .unicorn-brand,
      [data-us-project-src] [class*="brand"],
      [data-us-project-src] [class*="credit"],
      [data-us-project-src] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `
    document.head.appendChild(style)

    const hideBranding = () => {
      const selectors = [
        '[data-us-project]',
        '[data-us-project-src]',
        '[data-us-project="OMzqyUv6M3kSnv0JeAtC"]',
        '.unicorn-studio-container',
        'canvas[aria-label*="Unicorn"]',
      ]

      selectors.forEach(selector => {
        const containers = document.querySelectorAll(selector)
        containers.forEach(container => {
          const allElements = container.querySelectorAll('*')
          allElements.forEach(el => {
            if (!(el instanceof HTMLElement)) return
            const text = (el.textContent || '').toLowerCase()
            const title = (el.getAttribute('title') || '').toLowerCase()
            const href = (el.getAttribute('href') || '').toLowerCase()

            if (
              text.includes('made with') ||
              text.includes('unicorn') ||
              title.includes('made with') ||
              title.includes('unicorn') ||
              href.includes('unicorn.studio')
            ) {
              el.style.display = 'none'
              el.style.visibility = 'hidden'
              el.style.opacity = '0'
              el.style.pointerEvents = 'none'
              el.style.position = 'absolute'
              el.style.left = '-9999px'
              el.style.top = '-9999px'
              try {
                el.remove()
              } catch {}
            }
          })
        })
      })
    }

    hideBranding()
    const interval = setInterval(hideBranding, 50)

    setTimeout(hideBranding, 500)
    setTimeout(hideBranding, 1000)
    setTimeout(hideBranding, 2000)
    setTimeout(hideBranding, 5000)
    setTimeout(hideBranding, 10000)

    return () => {
      clearInterval(interval)
      if (scriptElement && document.head.contains(scriptElement)) {
        document.head.removeChild(scriptElement)
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
      const unicorn = (window as any).UnicornStudio
      if (unicorn && typeof unicorn.destroy === 'function') {
        try {
          unicorn.destroy()
        } catch (e) {
          console.error('Error destroying UnicornStudio:', e)
        }
      }
    }
  }, [])

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string
  ) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <main className='relative min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background'>
      {/* Fixed Background Animation for Desktop */}
      <div className='pointer-events-none fixed inset-0 z-0 hidden h-full w-full lg:block'>
        <div
          data-us-project-src='/unicorn/project.json'
          style={{ width: '100%', height: '100%' }}
        />
        <div className='pointer-events-none absolute inset-0 bg-background/85' />
      </div>

      {/* Fixed Mobile stars background */}
      <div className='stars-bg pointer-events-none fixed inset-0 z-0 h-full w-full lg:hidden'>
        <div className='pointer-events-none absolute inset-0 bg-background/75' />
      </div>

      {/* Header / Navigation */}
      <header className='sticky top-0 right-0 left-0 z-50 border-border border-b bg-background/90 backdrop-blur-md'>
        <div className='container mx-auto flex items-center justify-between px-6 py-4'>
          <div className='flex items-center gap-4'>
            <Link
              href='/'
              className='-skew-x-12 transform font-bold font-mono text-foreground text-xl italic tracking-widest lg:text-2xl'
            >
              OIKO
            </Link>
            <div className='h-4 w-px bg-foreground/40' />
            <span className='hidden font-mono text-muted-foreground text-xs tracking-wider sm:inline'>
              CONTROLE.FINANCEIRO v1.0
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className='hidden items-center gap-8 font-mono text-xs tracking-widest md:flex'>
            <button
              type='button'
              onClick={e => handleScroll(e, 'recursos')}
              className='text-muted-foreground transition-colors duration-200 hover:text-foreground'
            >
              RECURSOS
            </button>
            <button
              type='button'
              onClick={e => handleScroll(e, 'metas')}
              className='text-muted-foreground transition-colors duration-200 hover:text-foreground'
            >
              METAS
            </button>
            <button
              type='button'
              onClick={e => handleScroll(e, 'planos')}
              className='text-muted-foreground transition-colors duration-200 hover:text-foreground'
            >
              PLANOS
            </button>
            <button
              type='button'
              onClick={() =>
                setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
              }
              className='border border-foreground/60 px-2.5 py-1.5 text-foreground transition-all duration-200 hover:border-foreground'
              aria-label='Alternar tema'
            >
              {mounted && resolvedTheme === 'dark' ? (
                <Sun size={15} />
              ) : (
                <Moon size={15} />
              )}
            </button>
            <Link
              href='/signin'
              className='relative border border-foreground px-4 py-1.5 font-semibold text-foreground transition-all duration-200 hover:bg-foreground hover:text-background'
            >
              ACESSAR APP
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type='button'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='p-1 text-foreground hover:text-foreground md:hidden'
            aria-label='Toggle menu'
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <nav className='flex flex-col gap-4 border-border border-t bg-background/95 px-6 py-6 font-mono text-[12px] tracking-wider backdrop-blur-lg md:hidden'>
            <button
              type='button'
              onClick={e => handleScroll(e, 'recursos')}
              className='border-border border-b py-2 text-left text-foreground/90'
            >
              RECURSOS
            </button>
            <button
              type='button'
              onClick={e => handleScroll(e, 'metas')}
              className='border-border border-b py-2 text-left text-foreground/90'
            >
              METAS
            </button>
            <button
              type='button'
              onClick={e => handleScroll(e, 'planos')}
              className='border-border border-b py-2 text-left text-foreground/90'
            >
              PLANOS
            </button>
            <div className='flex items-center justify-between border-border border-b py-2'>
              <span className='font-mono text-[12px] text-foreground/50 tracking-wider'>
                TEMA
              </span>
              <button
                type='button'
                onClick={() =>
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                }
                className='text-foreground/90 transition-colors hover:text-foreground'
                aria-label='Alternar tema'
              >
                {mounted && resolvedTheme === 'dark' ? (
                  <Sun size={16} />
                ) : (
                  <Moon size={16} />
                )}
              </button>
            </div>
            <Link
              href='/signin'
              onClick={() => setIsMenuOpen(false)}
              className='mt-2 bg-foreground py-2.5 text-center font-bold text-background'
            >
              ACESSAR APP
            </Link>
          </nav>
        )}
      </header>

      {/* Frame Accents (Decorativos nos cantos da tela) */}
      <div className='pointer-events-none fixed top-16 left-0 z-40 h-8 w-8 border-foreground/40 border-t-2 border-l-2' />
      <div className='pointer-events-none fixed top-16 right-0 z-40 h-8 w-8 border-foreground/40 border-t-2 border-r-2' />
      <div className='pointer-events-none fixed bottom-0 left-0 z-40 h-8 w-8 border-foreground/40 border-b-2 border-l-2' />
      <div className='pointer-events-none fixed right-0 bottom-0 z-40 h-8 w-8 border-foreground/40 border-r-2 border-b-2' />

      {/* 1. Hero Section */}
      <section className='relative z-10 flex min-h-[90vh] items-center pt-24 lg:pt-0'>
        <div className='container mx-auto flex justify-end px-6 lg:px-12'>
          <div className='w-full max-w-xl lg:w-1/2'>
            {/* Linha decorativa técnica */}
            <div className='mb-4 flex items-center gap-2'>
              <div className='h-px w-12 bg-foreground/55' />
              <span className='font-mono font-semibold text-muted-foreground text-xs tracking-widest'>
                OIKO.CORE_SYSTEM
              </span>
              <div className='h-px flex-1 bg-foreground/55' />
            </div>

            {/* Título */}
            <div className='relative'>
              <h1 className='mb-4 -skew-y-1 transform font-bold font-mono text-3xl text-foreground leading-tight tracking-widest lg:text-6xl'>
                CONTROLE ABSOLUTO
              </h1>
            </div>

            {/* Padrão de pontos decorativos (Visual terminal) */}
            <div className='mb-5 hidden gap-1 opacity-40 lg:flex'>
              {dotKeys.map(key => (
                <div
                  key={key}
                  className='h-0.5 w-0.5 rounded-full bg-foreground'
                />
              ))}
            </div>

            <p className='mb-6 font-mono text-foreground/90 text-sm leading-relaxed lg:text-base'>
              Como Sísifo, avançamos com persistência. Cada transação, cada
              centavo, cada meta cadastrada é parte da nossa busca contínua por
              clareza financeira. Pare de sofrer com planilhas confusas. Domine
              sua realidade financeira com Oiko.
            </p>

            {/* Botões */}
            <div className='flex flex-col gap-4 sm:flex-row'>
              <Link
                href='/signup'
                className='group relative border border-foreground bg-transparent px-6 py-3 text-center font-bold font-mono text-foreground text-xs transition-all duration-200 hover:bg-foreground hover:text-background lg:text-sm'
              >
                <span className='absolute -top-1 -left-1 h-2 w-2 border-foreground border-t border-l opacity-0 transition-opacity group-hover:opacity-100' />
                <span className='absolute -right-1 -bottom-1 h-2 w-2 border-foreground border-r border-b opacity-0 transition-opacity group-hover:opacity-100' />
                COMEÇAR A SUBIDA
              </Link>

              <button
                type='button'
                onClick={e => handleScroll(e, 'recursos')}
                className='relative border border-foreground/60 bg-transparent px-6 py-3 text-center font-mono text-foreground text-xs transition-all duration-200 hover:border-foreground lg:text-sm'
              >
                EXPLORAR SISTEMA
              </button>
            </div>

            {/* Notação técnica do rodapé da seção */}
            <div className='mt-8 flex items-center gap-2'>
              <span className='font-mono font-semibold text-muted-foreground text-xs'>
                0x7F
              </span>
              <div className='h-px flex-1 bg-foreground/40' />
              <span className='font-mono font-semibold text-muted-foreground text-xs'>
                SISYPHUS.ENGINE_STATUS: ACTIVE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Recursos (Features) Section */}
      <section
        id='recursos'
        className='relative z-10 border-border border-t bg-background/90 px-6 py-32 backdrop-blur-md'
      >
        <div className='container mx-auto max-w-5xl'>
          <div className='mb-3 flex items-center gap-2'>
            <span className='font-mono font-semibold text-muted-foreground text-xs tracking-[0.2em]'>
              RECURSOS / 01
            </span>
            <div className='h-px flex-1 bg-foreground/40' />
          </div>

          <h2 className='font-bold font-mono text-2xl text-foreground tracking-widest lg:text-4xl'>
            MÉTRICAS E CONTROLE
          </h2>
          <p className='mt-4 max-w-lg font-mono text-muted-foreground text-sm leading-relaxed'>
            Painel simplificado com métricas reais, gráficos estruturados e
            categorização limpa para todas as suas movimentações de caixa.
          </p>

          {/* Preview do Dashboard */}
          <div className='mt-12 rounded-lg border border-border bg-card p-6 font-mono md:p-8'>
            {/* Cabeçalho do terminal de preview */}
            <div className='mb-6 flex items-center justify-between border-border border-b pb-4 font-semibold text-muted-foreground text-xs'>
              <span>{'OIKO.SYS.DASHBOARD // SECURE_SHELL'}</span>
              <span>EST. 2026</span>
            </div>

            {/* Grade de Estatísticas */}
            <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
              {stats.map(s => (
                <div
                  key={s.label}
                  className='rounded border border-border bg-muted/10 p-4'
                >
                  <div className='font-semibold text-muted-foreground text-xs uppercase tracking-widest'>
                    {s.label}
                  </div>
                  <div className={`mt-2 text-lg ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Gráfico Minimalista (Equalizer) */}
            <div className='rounded border border-border bg-muted/10 p-4'>
              <div className='mb-4 font-semibold text-muted-foreground text-xs uppercase tracking-widest'>
                Fluxo de Caixa Operacional
              </div>
              <div className='flex h-24 items-end gap-2'>
                {bars.map(b => (
                  <div
                    key={b.id}
                    className={`flex-1 border border-foreground/40 transition-all duration-300 ${
                      b.id === 'day-4' || b.id === 'day-6'
                        ? 'bg-foreground/60'
                        : 'bg-foreground/20'
                    }`}
                    style={{ height: `${b.h}%` }}
                  />
                ))}
              </div>
              <div className='mt-3 flex justify-between font-semibold text-muted-foreground text-xs'>
                {monthLabels.map(l => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Cards de Recursos Detalhados */}
          <div className='mt-12 grid gap-6 font-mono md:grid-cols-3'>
            {features.map((f, i) => (
              <div
                key={f.title}
                className='group border border-border bg-card p-6 transition-all duration-300 hover:border-foreground'
              >
                <div className='mb-4 inline-grid h-10 w-10 place-items-center border border-border bg-muted/20 text-foreground transition-all group-hover:bg-muted/30'>
                  <f.icon size={18} />
                </div>
                <h3 className='mb-2 font-bold text-foreground text-md tracking-wider'>
                  0{i + 1}. {f.title}
                </h3>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Metas (Goals) Section */}
      <section
        id='metas'
        className='relative z-10 border-border border-t bg-background/90 px-6 py-32 backdrop-blur-md'
      >
        <div className='container mx-auto max-w-5xl'>
          <div className='mb-3 flex items-center gap-2'>
            <span className='font-mono font-semibold text-muted-foreground text-xs tracking-[0.2em]'>
              ACOMPANHAMENTO / 02
            </span>
            <div className='h-px flex-1 bg-foreground/40' />
          </div>

          <h2 className='font-bold font-mono text-2xl text-foreground tracking-widest lg:text-4xl'>
            METAS E DIREÇÃO
          </h2>
          <p className='mt-4 max-w-lg font-mono text-muted-foreground text-sm leading-relaxed'>
            Estabeleça limites, reservas de emergência e fundos específicos.
            Veja o andamento de cada meta sem complexidade.
          </p>

          <div className='mt-12 grid gap-6 font-mono md:grid-cols-3'>
            {goals.map(g => (
              <div
                key={g.label}
                className='rounded-none border border-border bg-card p-6'
              >
                <div className='mb-1 font-semibold text-muted-foreground text-xs uppercase tracking-wider'>
                  {g.label}
                </div>
                <div className='mb-4 font-bold text-foreground text-lg'>
                  R$ {g.current.toLocaleString('pt-BR')}{' '}
                  <span className='font-normal text-muted-foreground/70 text-xs'>
                    / R$ {g.target.toLocaleString('pt-BR')}
                  </span>
                </div>

                {/* Monospace progress bar */}
                <div className='space-y-1.5'>
                  <div className='flex justify-between font-semibold text-muted-foreground text-xs'>
                    <span>PROGRESS_BAR</span>
                    <span>{g.percent}%</span>
                  </div>
                  <div className='h-2 overflow-hidden bg-muted/30'>
                    <div
                      className='h-full bg-foreground transition-all duration-500'
                      style={{ width: `${g.percent}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Planos (Pricing) Section */}
      <section
        id='planos'
        className='relative z-10 border-border border-t bg-background/90 px-6 py-32 backdrop-blur-md'
      >
        <div className='container mx-auto max-w-5xl text-center'>
          <div className='mb-3 flex items-center gap-2'>
            <div className='h-px flex-1 bg-foreground/40' />
            <span className='font-mono font-semibold text-muted-foreground text-xs tracking-[0.2em]'>
              MENSALIDADE / 03
            </span>
            <div className='h-px flex-1 bg-foreground/40' />
          </div>

          <h2 className='font-bold font-mono text-2xl text-foreground tracking-widest lg:text-4xl'>
            SIMPLICIDADE NO ACESSO
          </h2>
          <p className='mx-auto mt-4 max-w-lg font-mono text-muted-foreground text-sm leading-relaxed'>
            Oferecemos uma camada gratuita robusta e justa. Mude de nível apenas
            quando sentir necessidade real de expansão.
          </p>

          {/* Cartão de Preço */}
          <div className='relative mx-auto mt-12 max-w-md overflow-hidden border border-border bg-card p-8 text-left font-mono'>
            {/* Detalhe de dither decorativo de ticket */}
            <div className='dither-pattern absolute top-0 right-0 h-full w-2 opacity-20' />

            <div className='mb-6 flex items-baseline justify-between border-border border-b pb-4'>
              <span className='font-semibold text-muted-foreground text-xs uppercase tracking-widest'>
                PLANO INICIAL
              </span>
              <div className='font-bold text-3xl text-foreground'>
                GRÁTIS{' '}
                <span className='font-normal text-muted-foreground/70 text-xs'>
                  / para sempre
                </span>
              </div>
            </div>

            <ul className='mb-8 space-y-3 text-foreground text-sm'>
              {perks.map(p => (
                <li key={p} className='flex items-center gap-3'>
                  <span className='h-1.5 w-1.5 rounded-full bg-foreground' />
                  {p}
                </li>
              ))}
            </ul>

            <Link
              href='/signup'
              className='relative block w-full bg-foreground py-3 text-center font-bold font-mono text-background text-xs tracking-widest transition-colors hover:bg-foreground/80'
            >
              CRIAR CONTA GRÁTIS
            </Link>

            <p className='mt-4 text-center font-semibold text-muted-foreground text-xs leading-normal'>
              PRODUTO PREMIUM EM BREVE — R$ 9,90/mês para transações ilimitadas
              e gerenciamento de metas expandido.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className='relative z-10 border-border border-t bg-background/90 px-6 py-32 backdrop-blur-md'>
        <div className='container mx-auto max-w-5xl text-center'>
          <div className='mb-3 flex items-center gap-2'>
            <div className='h-px flex-1 bg-foreground/35' />
            <span className='font-mono font-semibold text-muted-foreground text-xs tracking-widest'>
              SYS_CALL: SIGN_UP
            </span>
            <div className='h-px flex-1 bg-foreground/35' />
          </div>

          <h2 className='font-bold font-mono text-foreground text-xl leading-normal tracking-widest lg:text-3xl'>
            PARE DE BRIGAR COM PLANILHAS.
            <br />
            COMECE COM O OIKO.
          </h2>
          <p className='mx-auto mt-4 max-w-md font-mono text-muted-foreground text-sm leading-relaxed'>
            Seus dados financeiros unificados em um único ambiente rápido,
            moderno e sempre acessível. Criação de conta em menos de 30
            segundos.
          </p>

          <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Link
              href='/signup'
              className='relative w-full bg-foreground px-8 py-3 text-center font-bold font-mono text-background text-xs tracking-widest transition-colors hover:bg-foreground/80 sm:w-auto'
            >
              CRIAR CONTA GRÁTIS
            </Link>

            <a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
              className='flex w-full items-center justify-center gap-2 border border-foreground/60 bg-transparent px-8 py-3 font-mono font-semibold text-xs tracking-widest transition-all hover:border-foreground hover:bg-accent sm:w-auto'
            >
              <ArrowUpRight size={14} />
              VER NO GITHUB
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='relative z-10 border-border border-t bg-card py-12 font-mono text-muted-foreground text-xs'>
        <div className='container mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 md:flex-row'>
          <div className='flex items-center gap-4 font-semibold'>
            <span>© 2026 Oiko. Open source sob licença MIT.</span>
          </div>

          <div className='flex items-center gap-6 font-semibold'>
            <Link href='#' className='transition-colors hover:text-foreground'>
              Privacidade
            </Link>
            <Link href='#' className='transition-colors hover:text-foreground'>
              Termos
            </Link>
            <a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
              className='transition-colors hover:text-foreground'
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .dither-pattern {
          background-image: 
            repeating-linear-gradient(0deg, transparent 0px, transparent 1px, var(--foreground) 1px, var(--foreground) 2px),
            repeating-linear-gradient(90deg, transparent 0px, transparent 1px, var(--foreground) 1px, var(--foreground) 2px);
          background-size: 3px 3px;
        }
        
        .stars-bg {
          background-image: 
            radial-gradient(1px 1px at 20% 30%, var(--foreground), transparent),
            radial-gradient(1px 1px at 60% 70%, var(--foreground), transparent),
            radial-gradient(1px 1px at 50% 50%, var(--foreground), transparent),
            radial-gradient(1px 1px at 80% 10%, var(--foreground), transparent),
            radial-gradient(1px 1px at 90% 60%, var(--foreground), transparent),
            radial-gradient(1px 1px at 33% 80%, var(--foreground), transparent),
            radial-gradient(1px 1px at 15% 60%, var(--foreground), transparent),
            radial-gradient(1px 1px at 70% 40%, var(--foreground), transparent);
          background-size: 200% 200%, 180% 180%, 250% 250%, 220% 220%, 190% 190%, 240% 240%, 210% 210%, 230% 230%;
          background-position: 0% 0%, 40% 40%, 60% 60%, 20% 20%, 80% 80%, 30% 30%, 70% 70%, 50% 50%;
          opacity: 0.25;
        }
      `}</style>
    </main>
  )
}
