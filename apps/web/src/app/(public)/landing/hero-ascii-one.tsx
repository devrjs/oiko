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
import { useEffect, useRef, useState } from 'react'

interface UnicornStudioGlobal {
  init: () => void
  destroy: () => void
}

declare global {
  interface Window {
    UnicornStudio?: UnicornStudioGlobal
  }
}

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
    desc: 'Registre entradas e saídas com categorias. Veja Gastos, Ganhos e Balanço no dashboard com gráfico e últimos registros.',
  },
  {
    icon: CalendarClock,
    title: 'Contas a pagar/receber',
    desc: 'Registre pendências a pagar e a receber. Acompanhe vencimentos em Finanças Pendentes, separados das finanças realizadas.',
  },
  {
    icon: Target,
    title: 'Metas financeiras',
    desc: 'Defina valor inicial, valor alvo e data limite. Acompanhe saldo atual, porcentagem alcançada e status em Carteira e Metas.',
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
  'Dashboard com Gastos, Ganhos e Balanço',
  'Finanças realizadas e pendentes',
  'Categorias para organizar lançamentos',
  'Carteira e metas com valor e data limite',
  'Gráfico e últimos registros',
]

export default function AnimationPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const blobUrlRef = useRef<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const _dotKeys = Array.from({ length: 45 }, (_, idx) => `dot-${idx}`)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Vendor pesado (265KB) + projeto (~31KB): só baixam em desktop,
    // com movimento permitido, quando o hero está visível e o navegador
    // está ocioso. Mobile e prefers-reduced-motion usam o fallback CSS
    // (.stars-bg) sem custo — o chunk `unicorn-project` nunca é baixado.
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(min-width: 1024px)').matches
    ) {
      return
    }

    let cancelled = false
    let scriptEl: HTMLScriptElement | null = null
    let observer: IntersectionObserver | null = null
    let idleId = 0

    const load = async () => {
      if (cancelled || !containerRef.current) return
      const containerEl = containerRef.current

      // Import dinâmico: o JSON do projeto (~31KB com shaders) vira chunk
      // separado e só é baixado/parsed no desktop, dentro deste caminho.
      const { UNICORN_PROJECT } = await import('./unicorn-project')
      if (cancelled || !containerRef.current) return

      const origin = window.location.origin
      const projectData = JSON.parse(JSON.stringify(UNICORN_PROJECT))
      projectData.history.forEach(
        (layer: { texture?: { src?: string }; src?: string }) => {
          if (layer.texture?.src?.startsWith('/unicorn/')) {
            layer.texture.src = origin + layer.texture.src
          }
          if (layer.src?.startsWith('/unicorn/')) {
            layer.src = origin + layer.src
          }
        }
      )
      const blob = new Blob([JSON.stringify(projectData)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      blobUrlRef.current = url
      containerEl.setAttribute('data-us-project-src', url)

      const initUnicorn = () => {
        const unicorn = window.UnicornStudio
        if (unicorn?.init) {
          try {
            unicorn.init()
          } catch (e) {
            console.error('Unicorn init error:', e)
          }
        }
      }

      if (!window.UnicornStudio) {
        scriptEl = document.createElement('script')
        scriptEl.src = '/unicorn/unicornStudio.umd.js'
        scriptEl.defer = true
        scriptEl.onload = initUnicorn
        document.head.appendChild(scriptEl)
      } else {
        initUnicorn()
      }
    }

    const scheduleIdle = () => {
      const idle =
        (
          window as Window & {
            requestIdleCallback?: (cb: () => void) => number
          }
        ).requestIdleCallback ??
        ((cb: () => void) => window.setTimeout(cb, 800))
      idleId = idle(load)
    }

    observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          observer?.disconnect()
          observer = null
          scheduleIdle()
        }
      },
      { threshold: 0 }
    )
    observer.observe(container)

    return () => {
      cancelled = true
      observer?.disconnect()
      if (idleId) window.clearTimeout(idleId)
      if (scriptEl && document.head.contains(scriptEl)) {
        document.head.removeChild(scriptEl)
      }
      try {
        window.UnicornStudio?.destroy()
      } catch {}
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
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
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <main className='relative min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background'>
      {/* Fixed Background Animation for Desktop */}
      <div className='pointer-events-none fixed inset-0 z-0 hidden h-full w-full lg:block'>
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        <div className='pointer-events-none absolute inset-0 bg-background/85' />
      </div>

      {/* Fixed Mobile stars background */}
      <div className='stars-bg pointer-events-none fixed inset-0 z-0 h-full w-full lg:hidden'>
        <div className='pointer-events-none absolute inset-0 bg-background/75' />
      </div>

      {/* Header / Navigation */}
      <header className='sticky top-0 right-0 left-0 z-50 border-border border-b bg-background/90 lg:backdrop-blur-md'>
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
            aria-expanded={isMenuOpen}
            aria-controls='menu-movel'
            className='inline-flex min-h-[44px] min-w-[44px] items-center justify-center p-1 text-foreground hover:text-foreground pointer-coarse:h-11 pointer-coarse:w-11 md:hidden'
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <nav id='menu-movel' className='flex flex-col gap-4 border-border border-t bg-background/95 px-6 py-6 font-mono text-[12px] tracking-wider md:hidden'>
            <button
              type='button'
              onClick={e => handleScroll(e, 'recursos')}
              className='flex min-h-[44px] items-center border-border border-b py-2 text-left text-foreground/90'
            >
              RECURSOS
            </button>
            <button
              type='button'
              onClick={e => handleScroll(e, 'metas')}
              className='flex min-h-[44px] items-center border-border border-b py-2 text-left text-foreground/90'
            >
              METAS
            </button>
            <button
              type='button'
              onClick={e => handleScroll(e, 'planos')}
              className='flex min-h-[44px] items-center border-border border-b py-2 text-left text-foreground/90'
            >
              PLANOS
            </button>
            <div className='flex min-h-[44px] items-center justify-between border-border border-b py-2'>
              <span className='font-mono text-[12px] text-foreground/50 tracking-wider'>
                TEMA
              </span>
              <button
                type='button'
                onClick={() =>
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                }
                className='inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-foreground/90 transition-colors hover:text-foreground'
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
              className='mt-2 flex min-h-[44px] items-center justify-center bg-foreground py-2.5 text-center font-bold text-background'
            >
              ACESSAR APP
            </Link>
          </nav>
        )}
      </header>

      {/* Frame Accents (Decorativos nos cantos da tela) */}
      <div className='pointer-events-none fixed top-16 left-0 z-40 hidden h-8 w-8 border-foreground/40 border-t-2 border-l-2 lg:block' />
      <div className='pointer-events-none fixed top-16 right-0 z-40 hidden h-8 w-8 border-foreground/40 border-t-2 border-r-2 lg:block' />
      <div className='pointer-events-none fixed bottom-0 left-0 z-40 hidden h-8 w-8 border-foreground/40 border-b-2 border-l-2 lg:block' />
      <div className='pointer-events-none fixed right-0 bottom-0 z-40 hidden h-8 w-8 border-foreground/40 border-r-2 border-b-2 lg:block' />

      {/* 1. Hero Section */}
      <section className='relative z-10 flex min-h-[90vh] items-center pt-24 lg:pt-0'>
        <div className='container mx-auto flex justify-end px-6 lg:px-12'>
          <div className='w-full max-w-xl lg:w-1/2'>
            <div className='mb-4 flex items-center gap-2'>
              <div className='h-px w-12 bg-foreground/55' />
              <span className='font-mono font-semibold text-muted-foreground text-xs tracking-widest'>
                OIKO.CORE_SYSTEM
              </span>
              <div className='h-px flex-1 bg-foreground/55' />
            </div>

            <div className='relative'>
              <h1 className='mb-4 -skew-y-1 transform font-bold font-mono text-3xl text-foreground leading-tight tracking-widest lg:text-6xl'>
                CONTROLE ABSOLUTO
              </h1>
            </div>

            <div className='mb-5 hidden h-0.5 w-40 bg-foreground/40 lg:block' />

            <p className='mb-6 font-mono text-foreground/90 text-sm leading-relaxed lg:text-base'>
              Como Sísifo, avançamos com persistência. Cada transação, cada
              centavo, cada meta cadastrada é parte da nossa busca contínua por
              clareza financeira. Pare de sofrer com planilhas confusas. Domine
              sua realidade financeira com Oiko.
            </p>

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
        className='relative z-10 border-border border-t bg-background px-6 py-32'
        style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}
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
            Registre finanças realizadas e pendentes, organize por categorias e
            acompanhe Gastos, Ganhos e Balanço no dashboard.
          </p>

          <div className='mt-12 rounded-lg border border-border bg-card p-6 font-mono md:p-8'>
            <div className='mb-6 flex items-center justify-between border-border border-b pb-4 font-semibold text-muted-foreground text-xs'>
              <span>{'OIKO.SYS.DASHBOARD // EXEMPLO'}</span>
              <span>EST. 2026</span>
            </div>
            <p className='mb-6 font-mono text-muted-foreground text-xs leading-relaxed'>
              Visualização ilustrativa com dados de exemplo. Seus totais reais
              aparecem após registrar lançamentos.
            </p>

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
        className='relative z-10 border-border border-t bg-background px-6 py-32'
        style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}
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
            Defina valor inicial, valor alvo e data limite. Acompanhe saldo
            atual, porcentagem alcançada e status.
          </p>
          <p className='mt-3 max-w-lg font-mono text-muted-foreground text-xs leading-relaxed'>
            Exemplos ilustrativos. Suas metas reais aparecem em Carteira e Metas
            após o cadastro.
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
        className='relative z-10 border-border border-t bg-background px-6 py-32'
        style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}
      >
        <div className='container mx-auto max-w-5xl text-center'>
          <div className='mb-3 flex items-center gap-2'>
            <div className='h-px flex-1 bg-foreground/40' />
            <span className='font-mono font-semibold text-muted-foreground text-xs tracking-[0.2em]'>
              ACESSO / 03
            </span>
            <div className='h-px flex-1 bg-foreground/40' />
          </div>

          <h2 className='font-bold font-mono text-2xl text-foreground tracking-widest lg:text-4xl'>
            SIMPLICIDADE NO ACESSO
          </h2>
          <p className='mx-auto mt-4 max-w-lg font-mono text-muted-foreground text-sm leading-relaxed'>
            Acesso gratuito aos recursos atuais do app, sem plano pago
            anunciado.
          </p>

          <div className='relative mx-auto mt-12 max-w-md overflow-hidden border border-border bg-card p-8 text-left font-mono'>
            <div className='dither-pattern absolute top-0 right-0 h-full w-2 opacity-20' />

            <div className='mb-6 flex items-baseline justify-between border-border border-b pb-4'>
              <span className='font-semibold text-muted-foreground text-xs uppercase tracking-widest'>
                PLANO INICIAL
              </span>
              <div className='font-bold text-3xl text-foreground'>
                GRÁTIS{' '}
                <span className='font-normal text-muted-foreground/70 text-xs'>
                  / acesso atual
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
              Acesso gratuito aos recursos atuais: dashboard, finanças
              realizadas e pendentes, categorias e carteira e metas.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className='relative z-10 border-border border-t bg-background px-6 py-32'>
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
            Registre finanças realizadas e pendentes, organize por categorias e
            acompanhe carteira e metas em um só lugar.
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
            <span
              className='cursor-not-allowed opacity-60'
              title='Página em breve'
              aria-disabled='true'
            >
              Privacidade (em breve)
            </span>
            <span
              className='cursor-not-allowed opacity-60'
              title='Página em breve'
              aria-disabled='true'
            >
              Termos (em breve)
            </span>
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
