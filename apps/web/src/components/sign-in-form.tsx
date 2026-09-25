'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { authClient } from '@/lib/auth-client'
import { Button } from './button'
import { FormError } from './form-error'
import { Input } from './input'
import { Spinner } from './spinner'

type SignInFormData = {
  username: string
  password: string
}

export function SignInForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [signInErrorMessage, setSignInErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // ***** validation *****
  const signInFormSchema = z.object({
    username: z
      .string()
      .min(3, { message: 'O usuário deve ter pelo menos 3 caracteres!' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter pelo menos 6 caracteres!' }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  })

  // ***** submit *****
  const onSubmit: SubmitHandler<SignInFormData> = async data => {
    const { username, password } = data

    setIsLoading(true)

    try {
      const { error } = await authClient.signIn.username({
        username,
        password,
      })

      if (error) {
        setSignInErrorMessage(error.message || 'Usuário ou senha incorretos!')
        return
      }

      router.push('/dashboard')
    } catch (error) {
      setSignInErrorMessage('Erro de conexão com o servidor!')
      return console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full flex-col gap-4'
    >
      {/* Usuário */}
      <div className='flex flex-col gap-1.5'>
        <Input
          type='text'
          placeholder='Usuário'
          autoComplete='username'
          icon={<User size={16} />}
          error={errors.username}
          aria-label='Usuário'
          aria-invalid={!!errors.username}
          aria-describedby={
            errors.username ? 'signin-username-error' : undefined
          }
          {...register('username')}
        />
        <FormError
          id='signin-username-error'
          message={errors.username?.message}
        />
      </div>

      {/* Senha */}
      <div className='flex flex-col gap-1.5'>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder='Senha'
          autoComplete='current-password'
          error={errors.password}
          icon={<Lock size={16} />}
          aria-label='Senha'
          aria-invalid={!!errors.password}
          aria-describedby={
            errors.password ? 'signin-password-error' : undefined
          }
          rightElement={
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              // alvo de toque >=44px apenas em ponteiro grosseiro (mobile);
              // no mouse a densidade de ledger permanece
              className='flex h-full min-w-11 items-center justify-center px-1 focus-visible:outline-none pointer-coarse:min-h-11'
              tabIndex={-1}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          {...register('password')}
        />
        <FormError
          id='signin-password-error'
          message={errors.password?.message}
        />
      </div>

      {/* Recuperação de senha: removida de propósito. A rota /forgot não
          existe e a API ainda não tem mailer configurado (better-auth
          forgetPassword exige envio de e-mail). Reintroduzir junto com o
          fluxo real em /impeccable harden, nunca antes. */}

      <Button type='submit' disabled={isLoading}>
        {isLoading ? <Spinner /> : 'Entrar na plataforma'}
      </Button>

      {signInErrorMessage && (
        <span
          role='alert'
          aria-live='assertive'
          className='rounded-md bg-destructive/10 px-3 py-2 text-center text-destructive text-xs'
        >
          {signInErrorMessage}
        </span>
      )}
    </form>
  )
}
