'use client'

import {
  ArrowUpRight,
  CalendarClock,
  Menu,
  Target,
  TrendingUp,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const stats = [
  {
    label: 'Gastos do mês',
    value: '-R$ 3.247,00',
    color: 'text-red-400 font-bold',
  },
  {
    label: 'Ganhos do mês',
    value: '+R$ 6.890,00',
    color: 'text-green-400 font-bold',
  },
  { label: 'Saldo', value: 'R$ 3.643,00', color: 'text-cyan-400 font-bold' },
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
  const dotKeys = Array.from({ length: 45 }, (_, idx) => `dot-${idx}`)

  useEffect(() => {
    const embedScript = document.createElement('script')
    embedScript.type = 'text/javascript'
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `
    document.head.appendChild(embedScript)

    // Add CSS to hide branding elements and crop canvas
    const style = document.createElement('style')
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }
      
      [data-us-project] canvas {
        clip-path: inset(0 0 10% 0) !important;
      }
      
      [data-us-project] * {
        pointer-events: none !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `
    document.head.appendChild(style)

    // Function to aggressively hide branding
    const hideBranding = () => {
      const selectors = [
        '[data-us-project]',
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
      document.head.removeChild(embedScript)
      document.head.removeChild(style)
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
    <main className='relative min-h-screen bg-black text-white selection:bg-white selection:text-black'>
      {/* Fixed Background Animation for Desktop - Dimmed with overlay for legibility */}
      <div className='pointer-events-none fixed inset-0 z-0 hidden h-full w-full lg:block'>
        <div
          data-us-project='OMzqyUv6M3kSnv0JeAtC'
          style={{ width: '100%', height: '100%' }}
        />
        <div className='pointer-events-none absolute inset-0 bg-black/85'></div>
      </div>

      {/* Fixed Mobile stars background - Dimmed */}
      <div className='stars-bg pointer-events-none fixed inset-0 z-0 h-full w-full lg:hidden'>
        <div className='pointer-events-none absolute inset-0 bg-black/75'></div>
      </div>

      {/* Header / Navigation */}
      <header className='sticky top-0 right-0 left-0 z-50 border-white/15 border-b bg-black/90 backdrop-blur-md'>
        <div className='container mx-auto flex items-center justify-between px-6 py-4'>
          <div className='flex items-center gap-4'>
            <Link
              href='/'
              className='-skew-x-12 transform font-bold font-mono text-white text-xl italic tracking-widest lg:text-2xl'
            >
              OIKO
            </Link>
            <div className='h-4 w-px bg-white/40'></div>
            <span className='hidden font-mono text-xs text-zinc-200 tracking-wider sm:inline'>
              CONTROLE.FINANCEIRO v1.0
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className='hidden items-center gap-8 font-mono text-xs tracking-widest md:flex'>
            <button
              type='button'
              onClick={e => handleScroll(e, 'recursos')}
              className='text-zinc-200 transition-colors duration-200 hover:text-white'
            >
              RECURSOS
            </button>
            <button
              type='button'
              onClick={e => handleScroll(e, 'metas')}
              className='text-zinc-200 transition-colors duration-200 hover:text-white'
            >
              METAS
            </button>
            <button
              type='button'
              onClick={e => handleScroll(e, 'planos')}
              className='text-zinc-200 transition-colors duration-200 hover:text-white'
            >
              PLANOS
            </button>
            <Link
              href='/signin'
              className='relative border border-white px-4 py-1.5 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-black'
            >
              ACESSAR APP
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type='button'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='p-1 text-white hover:text-white md:hidden'
            aria-label='Toggle menu'
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <nav className='flex flex-col gap-4 border-white/15 border-t bg-black/95 px-6 py-6 font-mono text-[12px] tracking-wider backdrop-blur-lg md:hidden'>
            <button
              type='button'
              onClick={e => handleScroll(e, 'recursos')}
              className='border-white/10 border-b py-2 text-left text-white/90'
            >
              RECURSOS
            </button>
            <button
              type='button'
              onClick={e => handleScroll(e, 'metas')}
              className='border-white/10 border-b py-2 text-left text-white/90'
            >
              METAS
            </button>
            <button
              type='button'
              onClick={e => handleScroll(e, 'planos')}
              className='border-white/10 border-b py-2 text-left text-white/90'
            >
              PLANOS
            </button>
            <Link
              href='/signin'
              onClick={() => setIsMenuOpen(false)}
              className='mt-2 bg-white py-2.5 text-center font-bold text-black'
            >
              ACESSAR APP
            </Link>
          </nav>
        )}
      </header>

      {/* Frame Accents (Decorativos nos cantos da tela) */}
      <div className='pointer-events-none fixed top-16 left-0 z-40 h-8 w-8 border-white/40 border-t-2 border-l-2'></div>
      <div className='pointer-events-none fixed top-16 right-0 z-40 h-8 w-8 border-white/40 border-t-2 border-r-2'></div>
      <div className='pointer-events-none fixed bottom-0 left-0 z-40 h-8 w-8 border-white/40 border-b-2 border-l-2'></div>
      <div className='pointer-events-none fixed right-0 bottom-0 z-40 h-8 w-8 border-white/40 border-r-2 border-b-2'></div>

      {/* 1. Hero Section */}
      <section className='relative z-10 flex min-h-[90vh] items-center pt-24 lg:pt-0'>
        <div className='container mx-auto flex justify-end px-6 lg:px-12'>
          <div className='w-full max-w-xl lg:w-1/2'>
            {/* Linha decorativa técnica */}
            <div className='mb-4 flex items-center gap-2'>
              <div className='h-px w-12 bg-white/55'></div>
              <span className='font-mono font-semibold text-xs text-zinc-200 tracking-widest'>
                OIKO.CORE_SYSTEM
              </span>
              <div className='h-px flex-1 bg-white/55'></div>
            </div>

            {/* Título com sotaque dithered */}
            <div className='relative'>
              <h1 className='mb-4 -skew-y-1 transform font-bold font-mono text-3xl text-white leading-tight tracking-widest lg:text-6xl'>
                CONTROLE ABSOLUTO
              </h1>
            </div>

            {/* Padrão de pontos decorativos (Visual terminal) */}
            <div className='mb-5 hidden gap-1 opacity-40 lg:flex'>
              {dotKeys.map(key => (
                <div
                  key={key}
                  className='h-0.5 w-0.5 rounded-full bg-white'
                ></div>
              ))}
            </div>

            <p className='mb-6 font-mono text-sm text-zinc-100 leading-relaxed lg:text-base'>
              Como Sísifo, avançamos com persistência. Cada transação, cada
              centavo, cada meta cadastrada é parte da nossa busca contínua por
              clareza financeira. Pare de sofrer com planilhas confusas. Domine
              sua realidade financeira com Oiko.
            </p>

            {/* Botões com sotaques de terminal */}
            <div className='flex flex-col gap-4 sm:flex-row'>
              <Link
                href='/signup'
                className='group relative border border-white bg-transparent px-6 py-3 text-center font-bold font-mono text-white text-xs transition-all duration-200 hover:bg-white hover:text-black lg:text-sm'
              >
                <span className='absolute -top-1 -left-1 h-2 w-2 border-white border-t border-l opacity-0 transition-opacity group-hover:opacity-100'></span>
                <span className='absolute -right-1 -bottom-1 h-2 w-2 border-white border-r border-b opacity-0 transition-opacity group-hover:opacity-100'></span>
                COMEÇAR A SUBIDA
              </Link>

              <button
                type='button'
                onClick={e => handleScroll(e, 'recursos')}
                className='relative border border-white/60 bg-transparent px-6 py-3 text-center font-mono text-white text-xs transition-all duration-200 hover:border-white lg:text-sm'
              >
                EXPLORAR SISTEMA
              </button>
            </div>

            {/* Notação técnica do rodapé da seção */}
            <div className='mt-8 flex items-center gap-2 text-zinc-300'>
              <span className='font-mono font-semibold text-xs'>0x7F</span>
              <div className='h-px flex-1 bg-white/40'></div>
              <span className='font-mono font-semibold text-xs'>
                SISYPHUS.ENGINE_STATUS: ACTIVE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Recursos (Features) Section */}
      <section
        id='recursos'
        className='relative z-10 border-white/10 border-t bg-black/90 px-6 py-32 backdrop-blur-md'
      >
        <div className='container mx-auto max-w-5xl'>
          <div className='mb-3 flex items-center gap-2'>
            <span className='font-mono font-semibold text-xs text-zinc-200 tracking-[0.2em]'>
              RECURSOS / 01
            </span>
            <div className='h-px flex-1 bg-white/40'></div>
          </div>

          <h2 className='font-bold font-mono text-2xl text-white tracking-widest lg:text-4xl'>
            MÉTRICAS E CONTROLE
          </h2>
          <p className='mt-4 max-w-lg font-mono text-sm text-zinc-200 leading-relaxed'>
            Painel simplificado com métricas reais, gráficos estruturados e
            categorização limpa para todas as suas movimentações de caixa.
          </p>

          {/* Preview do Dashboard em Estilo Monocromático */}
          <div className='mt-12 rounded-lg border border-white/15 bg-zinc-950/98 p-6 font-mono md:p-8'>
            {/* Cabeçalho do terminal de preview */}
            <div className='mb-6 flex items-center justify-between border-white/15 border-b pb-4 font-semibold text-xs text-zinc-300'>
              <span>{'OIKO.SYS.DASHBOARD // SECURE_SHELL'}</span>
              <span>EST. 2026</span>
            </div>

            {/* Grade de Estatísticas */}
            <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
              {stats.map(s => (
                <div
                  key={s.label}
                  className='rounded border border-white/15 bg-white/5 p-4'
                >
                  <div className='font-semibold text-xs text-zinc-300 uppercase tracking-widest'>
                    {s.label}
                  </div>
                  <div className={`mt-2 text-lg ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Gráfico Minimalista (Equalizer) */}
            <div className='rounded border border-white/15 bg-white/5 p-4'>
              <div className='mb-4 font-semibold text-xs text-zinc-300 uppercase tracking-widest'>
                Fluxo de Caixa Operacional
              </div>
              <div className='flex h-24 items-end gap-2'>
                {bars.map(b => (
                  <div
                    key={b.id}
                    className='flex-1 transition-all duration-300'
                    style={{
                      height: `${b.h}%`,
                      backgroundColor:
                        b.id === 'day-4' || b.id === 'day-6'
                          ? 'rgba(255, 255, 255, 0.6)'
                          : 'rgba(255, 255, 255, 0.22)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                    }}
                  />
                ))}
              </div>
              <div className='mt-3 flex justify-between font-semibold text-xs text-zinc-400'>
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
                className='group border border-white/10 bg-zinc-950/98 p-6 transition-all duration-300 hover:border-white'
              >
                <div className='mb-4 inline-grid h-10 w-10 place-items-center border border-white/15 bg-white/10 text-white transition-all group-hover:bg-white/20'>
                  <f.icon size={18} />
                </div>
                <h3 className='mb-2 font-bold text-md text-white tracking-wider'>
                  0{i + 1}. {f.title}
                </h3>
                <p className='text-sm text-zinc-200 leading-relaxed'>
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
        className='relative z-10 border-white/10 border-t bg-black/90 px-6 py-32 backdrop-blur-md'
      >
        <div className='container mx-auto max-w-5xl'>
          <div className='mb-3 flex items-center gap-2'>
            <span className='font-mono font-semibold text-xs text-zinc-200 tracking-[0.2em]'>
              ACOMPANHAMENTO / 02
            </span>
            <div className='h-px flex-1 bg-white/40'></div>
          </div>

          <h2 className='font-bold font-mono text-2xl text-white tracking-widest lg:text-4xl'>
            METAS E DIREÇÃO
          </h2>
          <p className='mt-4 max-w-lg font-mono text-sm text-zinc-200 leading-relaxed'>
            Estabeleça limites, reservas de emergência e fundos específicos.
            Veja o andamento de cada meta sem complexidade.
          </p>

          <div className='mt-12 grid gap-6 font-mono md:grid-cols-3'>
            {goals.map(g => (
              <div
                key={g.label}
                className='rounded-none border border-white/10 bg-zinc-950/98 p-6'
              >
                <div className='mb-1 font-semibold text-xs text-zinc-200 uppercase tracking-wider'>
                  {g.label}
                </div>
                <div className='mb-4 font-bold text-lg text-white'>
                  R$ {g.current.toLocaleString('pt-BR')}{' '}
                  <span className='font-normal text-xs text-zinc-400'>
                    / R$ {g.target.toLocaleString('pt-BR')}
                  </span>
                </div>

                {/* Monospace progress bar */}
                <div className='space-y-1.5'>
                  <div className='flex justify-between font-semibold text-xs text-zinc-300'>
                    <span>PROGRESS_BAR</span>
                    <span>{g.percent}%</span>
                  </div>
                  <div className='h-2 overflow-hidden bg-white/15'>
                    <div
                      className='h-full bg-white transition-all duration-500'
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
        className='relative z-10 border-white/10 border-t bg-black/90 px-6 py-32 backdrop-blur-md'
      >
        <div className='container mx-auto max-w-5xl text-center'>
          <div className='mb-3 flex items-center gap-2'>
            <div className='h-px flex-1 bg-white/40'></div>
            <span className='font-mono font-semibold text-xs text-zinc-200 tracking-[0.2em]'>
              MENSALIDADE / 03
            </span>
            <div className='h-px flex-1 bg-white/40'></div>
          </div>

          <h2 className='font-bold font-mono text-2xl text-white tracking-widest lg:text-4xl'>
            SIMPLICIDADE NO ACESSO
          </h2>
          <p className='mx-auto mt-4 max-w-lg font-mono text-sm text-zinc-200 leading-relaxed'>
            Oferecemos uma camada gratuita robusta e justa. Mude de nível apenas
            quando sentir necessidade real de expansão.
          </p>

          {/* Cartão de Preço com Estilo Ticket de Terminal */}
          <div className='relative mx-auto mt-12 max-w-md overflow-hidden border border-white/15 bg-zinc-950/98 p-8 text-left font-mono'>
            {/* Detalhe de dither decorativo de ticket */}
            <div className='dither-pattern absolute top-0 right-0 h-full w-2 opacity-20'></div>

            <div className='mb-6 flex items-baseline justify-between border-white/15 border-b pb-4'>
              <span className='font-semibold text-xs text-zinc-200 uppercase tracking-widest'>
                PLANO INICIAL
              </span>
              <div className='font-bold text-3xl text-white'>
                GRÁTIS{' '}
                <span className='font-normal text-xs text-zinc-400'>
                  / para sempre
                </span>
              </div>
            </div>

            <ul className='mb-8 space-y-3 text-sm text-zinc-100'>
              {perks.map(p => (
                <li key={p} className='flex items-center gap-3'>
                  <span className='h-1.5 w-1.5 rounded-full bg-white'></span>
                  {p}
                </li>
              ))}
            </ul>

            <Link
              href='/signup'
              className='relative block w-full bg-white py-3 text-center font-bold font-mono text-black text-xs tracking-widest transition-colors hover:bg-gray-200'
            >
              CRIAR CONTA GRÁTIS
            </Link>

            <p className='mt-4 text-center font-semibold text-xs text-zinc-300 leading-normal'>
              PRODUTO PREMIUM EM BREVE — R$ 9,90/mês para transações ilimitadas
              e gerenciamento de metas expandido.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className='relative z-10 border-white/10 border-t bg-black/90 px-6 py-32 backdrop-blur-md'>
        <div className='container mx-auto max-w-5xl text-center'>
          <div className='mb-3 flex items-center gap-2'>
            <div className='h-px flex-1 bg-white/35'></div>
            <span className='font-mono font-semibold text-xs text-zinc-200 tracking-widest'>
              SYS_CALL: SIGN_UP
            </span>
            <div className='h-px flex-1 bg-white/35'></div>
          </div>

          <h2 className='font-bold font-mono text-white text-xl leading-normal tracking-widest lg:text-3xl'>
            PARE DE BRIGAR COM PLANILHAS.
            <br />
            COMECE COM O OIKO.
          </h2>
          <p className='mx-auto mt-4 max-w-md font-mono text-sm text-zinc-200 leading-relaxed'>
            Seus dados financeiros unificados em um único ambiente rápido,
            moderno e sempre acessível. Criação de conta em menos de 30
            segundos.
          </p>

          <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Link
              href='/signup'
              className='relative w-full bg-white px-8 py-3 text-center font-bold font-mono text-black text-xs tracking-widest transition-colors hover:bg-gray-200 sm:w-auto'
            >
              CRIAR CONTA GRÁTIS
            </Link>

            <a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
              className='flex w-full items-center justify-center gap-2 border border-white/60 bg-transparent px-8 py-3 font-mono font-semibold text-xs tracking-widest transition-all hover:border-white hover:bg-white/5 sm:w-auto'
            >
              <ArrowUpRight size={14} />
              VER NO GITHUB
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='relative z-10 border-white/10 border-t bg-zinc-950 py-12 font-mono text-xs text-zinc-300'>
        <div className='container mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 md:flex-row'>
          <div className='flex items-center gap-4 font-semibold'>
            <span>© 2026 Oiko. Open source sob licença MIT.</span>
          </div>

          <div className='flex items-center gap-6 font-semibold'>
            <Link href='#' className='transition-colors hover:text-white'>
              Privacidade
            </Link>
            <Link href='#' className='transition-colors hover:text-white'>
              Termos
            </Link>
            <a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
              className='transition-colors hover:text-white'
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
            repeating-linear-gradient(0deg, transparent 0px, transparent 1px, white 1px, white 2px),
            repeating-linear-gradient(90deg, transparent 0px, transparent 1px, white 1px, white 2px);
          background-size: 3px 3px;
        }
        
        .stars-bg {
          background-image: 
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 60%, white, transparent),
            radial-gradient(1px 1px at 70% 40%, white, transparent);
          background-size: 200% 200%, 180% 180%, 250% 250%, 220% 220%, 190% 190%, 240% 240%, 210% 210%, 230% 230%;
          background-position: 0% 0%, 40% 40%, 60% 60%, 20% 20%, 80% 80%, 30% 30%, 70% 70%, 50% 50%;
          opacity: 0.25;
        }
      `}</style>
    </main>
  )
}
