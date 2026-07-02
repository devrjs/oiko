'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { authClient } from '@/lib/auth-client'
import { Button } from './button'
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
          icon={<User size={16} />}
          error={errors.username}
          aria-label='Usuário'
          {...register('username')}
        />
        <span className='min-h-4 text-destructive text-xs'>
          {errors.username?.message}
        </span>
      </div>

      {/* Senha */}
      <div className='flex flex-col gap-1.5'>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder='Senha'
          error={errors.password}
          icon={<Lock size={16} />}
          aria-label='Senha'
          rightElement={
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='flex h-full items-center justify-center px-1 focus:outline-none'
              tabIndex={-1}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          {...register('password')}
        />
        <span className='min-h-4 text-destructive text-xs'>
          {errors.password?.message}
        </span>
      </div>

      {/* Recuperação de senha */}
      <div className='flex justify-end'>
        <Link
          href='/forgot'
          className='font-mono text-muted-foreground text-xs transition-colors hover:text-foreground'
        >
          Esqueceu a senha?
        </Link>
      </div>

      <Button type='submit' disabled={isLoading}>
        {isLoading ? <Spinner /> : 'Entrar na plataforma'}
      </Button>

      {signInErrorMessage && (
        <span className='rounded-md bg-destructive/10 px-3 py-2 text-center text-destructive text-xs'>
          {signInErrorMessage}
        </span>
      )}
    </form>
  )
}
