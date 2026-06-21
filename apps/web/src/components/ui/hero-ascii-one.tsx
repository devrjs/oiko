'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingUp, CalendarClock, Target, ArrowUpRight, Menu, X } from 'lucide-react';

const stats = [
  { label: 'Gastos do mês', value: '-R$ 3.247,00', color: 'text-red-400 font-bold' },
  { label: 'Ganhos do mês', value: '+R$ 6.890,00', color: 'text-green-400 font-bold' },
  { label: 'Saldo', value: 'R$ 3.643,00', color: 'text-cyan-400 font-bold' },
];

const bars = [
  { id: 'day-1', h: 40 },
  { id: 'day-2', h: 72 },
  { id: 'day-3', h: 52 },
  { id: 'day-4', h: 88 },
  { id: 'day-5', h: 60 },
  { id: 'day-6', h: 96 },
  { id: 'day-7', h: 44 },
];

const monthLabels = ['01/06', '05/06', '10/06', '15/06', '20/06', '25/06', '30/06'];

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
];

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
];

const perks = [
  'Dashboard completo com gráficos',
  'Até 100 transações por mês',
  '3 metas financeiras ativas',
  'Categorias personalizadas',
  'Contas a pagar e receber',
];

export default function AnimationPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const embedScript = document.createElement('script');
    embedScript.type = 'text/javascript';
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
    `;
    document.head.appendChild(embedScript);

    // Add CSS to hide branding elements and crop canvas
    const style = document.createElement('style');
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
    `;
    document.head.appendChild(style);

    // Function to aggressively hide branding
    const hideBranding = () => {
      const selectors = [
        '[data-us-project]',
        '[data-us-project="OMzqyUv6M3kSnv0JeAtC"]',
        '.unicorn-studio-container',
        'canvas[aria-label*="Unicorn"]'
      ];
      
      selectors.forEach(selector => {
        const containers = document.querySelectorAll(selector);
        containers.forEach(container => {
          const allElements = container.querySelectorAll('*');
          allElements.forEach(el => {
            if (!(el instanceof HTMLElement)) return;
            const text = (el.textContent || '').toLowerCase();
            const title = (el.getAttribute('title') || '').toLowerCase();
            const href = (el.getAttribute('href') || '').toLowerCase();
            
            if (
              text.includes('made with') || 
              text.includes('unicorn') ||
              title.includes('made with') ||
              title.includes('unicorn') ||
              href.includes('unicorn.studio')
            ) {
              el.style.display = 'none';
              el.style.visibility = 'hidden';
              el.style.opacity = '0';
              el.style.pointerEvents = 'none';
              el.style.position = 'absolute';
              el.style.left = '-9999px';
              el.style.top = '-9999px';
              try { el.remove(); } catch(e) {}
            }
          });
        });
      });
    };

    hideBranding();
    const interval = setInterval(hideBranding, 50);
    
    setTimeout(hideBranding, 500);
    setTimeout(hideBranding, 1000);
    setTimeout(hideBranding, 2000);
    setTimeout(hideBranding, 5000);
    setTimeout(hideBranding, 10000);

    return () => {
      clearInterval(interval);
      document.head.removeChild(embedScript);
      document.head.removeChild(style);
    };
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Fixed Background Animation for Desktop - Dimmed with overlay for legibility */}
      <div className="fixed inset-0 w-full h-full hidden lg:block pointer-events-none z-0">
        <div 
          data-us-project="OMzqyUv6M3kSnv0JeAtC" 
          style={{ width: '100%', height: '100%' }}
        />
        <div className="absolute inset-0 bg-black/85 pointer-events-none"></div>
      </div>

      {/* Fixed Mobile stars background - Dimmed */}
      <div className="fixed inset-0 w-full h-full lg:hidden stars-bg pointer-events-none z-0">
        <div className="absolute inset-0 bg-black/75 pointer-events-none"></div>
      </div>

      {/* Header / Navigation */}
      <header className="sticky top-0 left-0 right-0 z-50 border-b border-white/15 bg-black/90 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-mono text-white text-xl lg:text-2xl font-bold tracking-widest italic transform -skew-x-12">
              OIKO
            </Link>
            <div className="h-4 w-px bg-white/40"></div>
            <span className="text-zinc-200 text-xs font-mono tracking-wider hidden sm:inline">CONTROLE.FINANCEIRO v1.0</span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest">
            <a href="#recursos" onClick={(e) => handleScroll(e, 'recursos')} className="text-zinc-200 hover:text-white transition-colors duration-200">
              RECURSOS
            </a>
            <a href="#metas" onClick={(e) => handleScroll(e, 'metas')} className="text-zinc-200 hover:text-white transition-colors duration-200">
              METAS
            </a>
            <a href="#planos" onClick={(e) => handleScroll(e, 'planos')} className="text-zinc-200 hover:text-white transition-colors duration-200">
              PLANOS
            </a>
            <Link href="/signin" className="relative px-4 py-1.5 border border-white text-white hover:bg-white hover:text-black font-semibold transition-all duration-200">
              ACESSAR APP
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-1 text-white hover:text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-white/15 bg-black/95 backdrop-blur-lg px-6 py-6 flex flex-col gap-4 font-mono text-[12px] tracking-wider">
            <a href="#recursos" onClick={(e) => handleScroll(e, 'recursos')} className="text-white/90 py-2 border-b border-white/10">
              RECURSOS
            </a>
            <a href="#metas" onClick={(e) => handleScroll(e, 'metas')} className="text-white/90 py-2 border-b border-white/10">
              METAS
            </a>
            <a href="#planos" onClick={(e) => handleScroll(e, 'planos')} className="text-white/90 py-2 border-b border-white/10">
              PLANOS
            </a>
            <Link href="/signin" onClick={() => setIsMenuOpen(false)} className="mt-2 text-center py-2.5 bg-white text-black font-bold">
              ACESSAR APP
            </Link>
          </nav>
        )}
      </header>

      {/* Frame Accents (Decorativos nos cantos da tela) */}
      <div className="pointer-events-none fixed top-16 left-0 w-8 h-8 border-t-2 border-l-2 border-white/40 z-40"></div>
      <div className="pointer-events-none fixed top-16 right-0 w-8 h-8 border-t-2 border-r-2 border-white/40 z-40"></div>
      <div className="pointer-events-none fixed bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/40 z-40"></div>
      <div className="pointer-events-none fixed bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/40 z-40"></div>

      {/* 1. Hero Section */}
      <section className="relative z-10 flex min-h-[90vh] items-center pt-24 lg:pt-0">
        <div className="container mx-auto px-6 lg:px-12 flex justify-end">
          <div className="w-full lg:w-1/2 max-w-xl">
            {/* Linha decorativa técnica */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-px bg-white/55"></div>
              <span className="text-zinc-200 text-xs font-mono tracking-widest font-semibold">OIKO.CORE_SYSTEM</span>
              <div className="flex-1 h-px bg-white/55"></div>
            </div>

            {/* Título com sotaque dithered */}
            <div className="relative">
              <h1 className="text-3xl lg:text-6xl font-bold text-white mb-4 leading-tight font-mono tracking-widest transform -skew-y-1">
                CONTROLE ABSOLUTO
              </h1>
            </div>

            {/* Padrão de pontos decorativos (Visual terminal) */}
            <div className="hidden lg:flex gap-1 mb-5 opacity-40">
              {Array.from({ length: 45 }).map((_, i) => (
                <div key={i} className="w-0.5 h-0.5 bg-white rounded-full"></div>
              ))}
            </div>

            <p className="text-sm lg:text-base text-zinc-100 mb-6 leading-relaxed font-mono">
              Como Sísifo, avançamos com persistência. Cada transação, cada centavo, cada meta cadastrada é parte da nossa busca contínua por clareza financeira. Pare de sofrer com planilhas confusas. Domine sua realidade financeira com Oiko.
            </p>

            {/* Botões com sotaques de terminal */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup" className="relative px-6 py-3 bg-transparent text-white font-mono text-xs lg:text-sm font-bold border border-white hover:bg-white hover:text-black text-center transition-all duration-200 group">
                <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white opacity-0 group-hover:opacity-100 transition-opacity"></span>
                COMEÇAR A SUBIDA
              </Link>
              
              <a href="#recursos" onClick={(e) => handleScroll(e, 'recursos')} className="relative px-6 py-3 bg-transparent border border-white/60 text-white hover:border-white font-mono text-xs lg:text-sm text-center transition-all duration-200">
                EXPLORAR SISTEMA
              </a>
            </div>

            {/* Notação técnica do rodapé da seção */}
            <div className="flex items-center gap-2 mt-8 text-zinc-300">
              <span className="text-xs font-mono font-semibold">0x7F</span>
              <div className="flex-1 h-px bg-white/40"></div>
              <span className="text-xs font-mono font-semibold">SISYPHUS.ENGINE_STATUS: ACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Recursos (Features) Section */}
      <section id="recursos" className="relative z-10 px-6 py-32 border-t border-white/10 bg-black/90 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-200 font-semibold">RECURSOS / 01</span>
            <div className="flex-1 h-px bg-white/40"></div>
          </div>
          
          <h2 className="font-mono font-bold text-2xl lg:text-4xl tracking-widest text-white">
            MÉTRICAS E CONTROLE
          </h2>
          <p className="mt-4 max-w-lg font-mono text-sm text-zinc-200 leading-relaxed">
            Painel simplificado com métricas reais, gráficos estruturados e categorização limpa para todas as suas movimentações de caixa.
          </p>

          {/* Preview do Dashboard em Estilo Monocromático */}
          <div className="mt-12 rounded-lg border border-white/15 bg-zinc-950/98 p-6 md:p-8 font-mono">
            {/* Cabeçalho do terminal de preview */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/15 text-zinc-300 text-xs font-semibold">
              <span>OIKO.SYS.DASHBOARD // SECURE_SHELL</span>
              <span>EST. 2026</span>
            </div>

            {/* Grade de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {stats.map(s => (
                <div key={s.label} className="border border-white/15 bg-white/5 p-4 rounded">
                  <div className="text-xs text-zinc-300 uppercase tracking-widest font-semibold">{s.label}</div>
                  <div className={`mt-2 text-lg ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Gráfico Minimalista (Equalizer) */}
            <div className="border border-white/15 bg-white/5 p-4 rounded">
              <div className="text-xs text-zinc-300 uppercase tracking-widest font-semibold mb-4">Fluxo de Caixa Operacional</div>
              <div className="flex items-end gap-2 h-24">
                {bars.map(b => (
                  <div
                    key={b.id}
                    className="flex-1 transition-all duration-300"
                    style={{
                      height: `${b.h}%`,
                      backgroundColor: b.id === 'day-4' || b.id === 'day-6' 
                        ? 'rgba(255, 255, 255, 0.6)' 
                        : 'rgba(255, 255, 255, 0.22)',
                      border: '1px solid rgba(255, 255, 255, 0.4)'
                    }}
                  />
                ))}
              </div>
              <div className="mt-3 flex justify-between text-xs text-zinc-400 font-semibold">
                {monthLabels.map(l => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Cards de Recursos Detalhados */}
          <div className="mt-12 grid gap-6 md:grid-cols-3 font-mono">
            {features.map((f, i) => (
              <div key={f.title} className="border border-white/10 bg-zinc-950/98 p-6 hover:border-white transition-all duration-300 group">
                <div className="mb-4 inline-grid h-10 w-10 place-items-center bg-white/10 border border-white/15 text-white group-hover:bg-white/20 transition-all">
                  <f.icon size={18} />
                </div>
                <h3 className="font-bold text-md tracking-wider mb-2 text-white">
                  0{i+1}. {f.title}
                </h3>
                <p className="text-sm text-zinc-200 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Metas (Goals) Section */}
      <section id="metas" className="relative z-10 px-6 py-32 border-t border-white/10 bg-black/90 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-200 font-semibold">ACOMPANHAMENTO / 02</span>
            <div className="flex-1 h-px bg-white/40"></div>
          </div>

          <h2 className="font-mono font-bold text-2xl lg:text-4xl tracking-widest text-white">
            METAS E DIREÇÃO
          </h2>
          <p className="mt-4 max-w-lg font-mono text-sm text-zinc-200 leading-relaxed">
            Estabeleça limites, reservas de emergência e fundos específicos. Veja o andamento de cada meta sem complexidade.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3 font-mono">
            {goals.map(g => (
              <div key={g.label} className="border border-white/10 bg-zinc-950/98 p-6 rounded-none">
                <div className="text-xs text-zinc-200 tracking-wider uppercase font-semibold mb-1">{g.label}</div>
                <div className="text-lg font-bold mb-4 text-white">
                  R$ {g.current.toLocaleString('pt-BR')}{' '}
                  <span className="text-xs text-zinc-400 font-normal">
                    / R$ {g.target.toLocaleString('pt-BR')}
                  </span>
                </div>
                
                {/* Monospace progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-zinc-300 font-semibold">
                    <span>PROGRESS_BAR</span>
                    <span>{g.percent}%</span>
                  </div>
                  <div className="h-2 bg-white/15 overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-500" 
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
      <section id="planos" className="relative z-10 px-6 py-32 border-t border-white/10 bg-black/90 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px bg-white/40"></div>
            <span className="font-mono text-xs tracking-[0.2em] text-zinc-200 font-semibold">MENSALIDADE / 03</span>
            <div className="flex-1 h-px bg-white/40"></div>
          </div>

          <h2 className="font-mono font-bold text-2xl lg:text-4xl tracking-widest text-white">
            SIMPLICIDADE NO ACESSO
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-mono text-sm text-zinc-200 leading-relaxed">
            Oferecemos uma camada gratuita robusta e justa. Mude de nível apenas quando sentir necessidade real de expansão.
          </p>

          {/* Cartão de Preço com Estilo Ticket de Terminal */}
          <div className="mx-auto mt-12 max-w-md border border-white/15 bg-zinc-950/98 p-8 relative overflow-hidden font-mono text-left">
            {/* Detalhe de dither decorativo de ticket */}
            <div className="absolute top-0 right-0 w-2 h-full dither-pattern opacity-20"></div>
            
            <div className="flex items-baseline justify-between border-b border-white/15 pb-4 mb-6">
              <span className="text-xs text-zinc-200 tracking-widest uppercase font-semibold">PLANO INICIAL</span>
              <div className="text-3xl font-bold text-white">
                GRÁTIS <span className="text-xs text-zinc-400 font-normal">/ para sempre</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 text-sm text-zinc-100">
              {perks.map(p => (
                <li key={p} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  {p}
                </li>
              ))}
            </ul>

            <Link href="/signup" className="relative block w-full py-3 bg-white text-black text-center font-mono font-bold text-xs tracking-widest hover:bg-gray-200 transition-colors">
              CRIAR CONTA GRÁTIS
            </Link>

            <p className="mt-4 text-xs text-zinc-300 text-center leading-normal font-semibold">
              PRODUTO PREMIUM EM BREVE — R$ 9,90/mês para transações ilimitadas e gerenciamento de metas expandido.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="relative z-10 px-6 py-32 border-t border-white/10 bg-black/90 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px bg-white/35"></div>
            <span className="font-mono text-xs tracking-widest text-zinc-200 font-semibold">SYS_CALL: SIGN_UP</span>
            <div className="flex-1 h-px bg-white/35"></div>
          </div>

          <h2 className="font-mono font-bold text-xl lg:text-3xl tracking-widest leading-normal text-white">
            PARE DE BRIGAR COM PLANILHAS.<br />COMECE COM O OIKO.
          </h2>
          <p className="mx-auto mt-4 max-w-md font-mono text-sm text-zinc-200 leading-relaxed">
            Seus dados financeiros unificados em um único ambiente rápido, moderno e sempre acessível. Criação de conta em menos de 30 segundos.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto relative px-8 py-3 bg-white text-black font-mono font-bold text-xs tracking-widest text-center hover:bg-gray-200 transition-colors">
              CRIAR CONTA GRÁTIS
            </Link>
            
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 border border-white/60 bg-transparent font-mono text-xs tracking-widest font-semibold hover:border-white hover:bg-white/5 transition-all"
            >
              <ArrowUpRight size={14} />
              VER NO GITHUB
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-zinc-950 py-12 font-mono text-xs text-zinc-300">
        <div className="container mx-auto px-6 max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 font-semibold">
            <span>© 2026 Oiko. Open source sob licença MIT.</span>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-white transition-colors">Termos</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
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
  );
}

