'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { authClient } from '@/lib/auth-client'
import { Button } from './button'
import { Input } from './input'
import { LogoName } from './logo-name'
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
      className='flex h-screen w-full max-w-xs flex-col justify-center gap-3 pt-2 pb-8 sm:h-auto'
    >
      <div className='flex w-full items-center justify-center'>
        <LogoName />
      </div>

      <Input
        type='text'
        placeholder='Usuário'
        icon={<User size={22} />}
        error={errors.username}
        {...register('username')}
      />
      <span className='text-red-500'>{errors.username?.message}</span>

      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder='Senha'
        error={errors.password}
        icon={<Lock size={22} />}
        rightElement={
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='flex h-full items-center justify-center focus:outline-none hover:text-gray-200 transition-colors'
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        }
        {...register('password')}
      />
      <span className='text-red-500'>{errors.password?.message}</span>

      <Button type='submit' disabled={isLoading} className='mt-2'>
        {isLoading ? <Spinner /> : 'Entrar na plataforma'}
      </Button>

      {signInErrorMessage && (
        <span className='text-center text-md text-red-500'>
          {signInErrorMessage}
        </span>
      )}
    </form>
  )
}
