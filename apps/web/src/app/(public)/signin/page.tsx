import { BarChart3, CalendarClock, ChevronRight, Target } from 'lucide-react'
import Link from 'next/link'
import { SignInForm } from '@/components/sign-in-form'

const features = [
  {
    icon: BarChart3,
    title: 'Visão completa',
    desc: 'Dashboard com Gastos, Ganhos, Balanço, gráfico e últimos registros.',
  },
  {
    icon: CalendarClock,
    title: 'Realizado e pendente',
    desc: 'Finanças realizadas e pendências separadas, organizadas por categorias.',
  },
  {
    icon: Target,
    title: 'Carteira e metas',
    desc: 'Valor inicial, valor alvo, data limite, saldo atual e progresso.',
  },
]

export default function SignIn() {
  return (
    <div className='flex min-h-[520px] w-full max-w-[880px] overflow-hidden rounded-2xl border border-border bg-card'>
      {/* Left panel — branding */}
      <div className='hidden w-[380px] flex-col justify-between border-border border-r bg-muted/30 p-8 md:flex'>
        <Link href='/' className='group flex items-center gap-3'>
          <div className='grid h-10 w-10 place-items-center rounded-lg border border-foreground/60 bg-foreground/5 font-bold font-mono text-sm tracking-widest transition-colors group-hover:bg-foreground group-hover:text-background'>
            O
          </div>
          <span className='font-bold font-mono text-foreground text-xl tracking-widest'>
            OIKO
          </span>
        </Link>

        <div className='mt-8 flex flex-col gap-5'>
          <div>
            <h2 className='font-bold font-mono text-foreground text-lg tracking-tight'>
              Controle financeiro inteligente
            </h2>
            <p className='mt-1 font-mono text-muted-foreground text-xs leading-relaxed'>
              Gerencie suas finanças com simplicidade e clareza.
            </p>
          </div>

          <div className='flex flex-col gap-3'>
            {features.map(f => (
              <div
                key={f.title}
                className='flex items-start gap-3 rounded-xl border border-border bg-background/60 p-3'
              >
                <div className='mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary'>
                  <f.icon size={16} />
                </div>
                <div>
                  <p className='font-medium text-foreground text-xs'>
                    {f.title}
                  </p>
                  <p className='mt-0.5 text-muted-foreground text-xs leading-snug'>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className='font-mono text-muted-foreground text-xs tracking-wider'>
          &copy; {new Date().getFullYear()} OIKO
        </p>
      </div>

      {/* Right panel — form */}
      <div className='flex flex-1 flex-col px-8 pt-8 pb-8 sm:px-10'>
        {/* Mobile-only branding */}
        <div className='mb-6 flex flex-col items-center gap-1 md:hidden'>
          <Link href='/' className='group flex items-center gap-3'>
            <div className='grid h-10 w-10 place-items-center rounded-lg border border-foreground/60 bg-foreground/5 font-bold font-mono text-sm tracking-widest transition-colors group-hover:bg-foreground group-hover:text-background'>
              O
            </div>
            <span className='font-bold font-mono text-foreground text-xl tracking-widest'>
              OIKO
            </span>
          </Link>
          <p className='mt-1 font-mono text-muted-foreground text-xs tracking-wider'>
            Controle financeiro inteligente
          </p>
        </div>

        {/* Header */}
        <div className='mb-6'>
          <h1 className='font-bold font-mono text-foreground text-lg tracking-tight'>
            Bem-vindo de volta
          </h1>
          <p className='mt-1 font-mono text-muted-foreground text-xs'>
            Entre com suas credenciais para continuar
          </p>
        </div>

        {/* Divider */}
        <div className='mb-4 flex items-center gap-3'>
          <div className='h-px flex-1 bg-border' />
          <span className='font-mono font-semibold text-xs text-muted-foreground tracking-widest'>
            ACESSO
          </span>
          <div className='h-px flex-1 bg-border' />
        </div>

        {/* Form */}
        <SignInForm />

        {/* Signup link */}
        <div className='mt-auto flex items-center justify-center gap-1.5 border-border border-t pt-5'>
          <span className='font-mono text-muted-foreground text-xs'>
            Não tem conta?
          </span>
          <Link
            href='/signup'
            className='group inline-flex min-h-9 items-center gap-1 py-1 font-bold font-mono text-foreground text-xs transition-colors hover:text-foreground/70 pointer-coarse:min-h-11'
          >
            Cadastre-se
            <ChevronRight
              size={12}
              className='transition-transform group-hover:translate-x-0.5'
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
