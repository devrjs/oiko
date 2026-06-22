import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { SignInForm } from '@/components/sign-in-form'

export default function SignIn() {
  return (
    <div className='flex w-104 flex-col gap-6 rounded-xl border border-border/50 bg-card/80 px-8 pt-8 pb-8 shadow-2xl shadow-foreground/5 backdrop-blur-xl'>
      {/* Branding */}
      <div className='flex flex-col items-center gap-1'>
        <Link href='/' className='group flex items-center gap-3'>
          <div className='grid h-9 w-9 place-items-center border border-foreground/60 bg-foreground/5 font-bold font-mono text-sm tracking-widest transition-colors group-hover:bg-foreground group-hover:text-background'>
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

      {/* Divider */}
      <div className='flex items-center gap-3'>
        <div className='h-px flex-1 bg-border' />
        <span className='font-mono font-semibold text-[10px] text-muted-foreground tracking-widest'>
          ACESSO
        </span>
        <div className='h-px flex-1 bg-border' />
      </div>

      {/* Form */}
      <SignInForm />

      {/* Signup link */}
      <div className='flex items-center justify-center gap-1.5'>
        <span className='font-mono text-muted-foreground text-xs'>
          Não tem conta?
        </span>
        <Link
          href='/signup'
          className='group inline-flex items-center gap-1 font-bold font-mono text-foreground text-xs transition-colors hover:text-foreground/70'
        >
          Cadastre-se
          <ChevronRight
            size={12}
            className='transition-transform group-hover:translate-x-0.5'
          />
        </Link>
      </div>
    </div>
  )
}
