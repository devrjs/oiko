'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, User, User2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { authClient } from '@/lib/auth-client'
import { Button } from './button'
import { Input } from './input'
import { Spinner } from './spinner'

type SignUpFormData = {
  username: string
  name: string
  password: string
  confirmPassword: string
}

export function SignUpForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [signUpErrorMessage, setSignUpErrorMessage] = useState('')

  // ***** validation *****
  const signUpFormSchema = z
    .object({
      username: z
        .string()
        .min(3, { message: 'Usuário deve ter pelo menos 3 caracteres!' }),
      name: z.string().min(1, { message: 'Nome obrigatório!' }),
      password: z
        .string()
        .min(6, { message: 'A senha deve ter pelo menos 6 caracteres!' }),
      confirmPassword: z
        .string()
        .min(6, { message: 'A senha deve ter pelo menos 6 caracteres!' }),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'As senhas não correspondem',
      path: ['confirmPassword'],
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
  })

  // ***** submit *****
  const onSubmit: SubmitHandler<SignUpFormData> = async data => {
    const { username, name, password } = data

    setIsLoading(true)

    try {
      const { error } = await authClient.signUp.email({
        email: `${username}@placeholder.local`,
        username,
        name,
        password,
      })

      if (error) {
        setSignUpErrorMessage(
          error.message || 'Este usuário já está cadastrado em nosso sistema.'
        )
        return
      }

      router.push('/dashboard')
    } catch (error) {
      setSignUpErrorMessage('Erro de conexão com o servidor!')
      return console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex h-full w-full flex-col justify-center gap-2'
    >
      <Input
        type='text'
        placeholder='Seu Usuário'
        error={errors.username}
        icon={<User size={22} />}
        {...register('username')}
      />
      <span className='text-red-500'>{errors.username?.message}</span>

      <Input
        type='text'
        placeholder='Seu Nome'
        error={errors.name}
        icon={<User2 size={22} />}
        {...register('name')}
      />
      <span className='text-red-500'>{errors.name?.message}</span>

      <Input
        type='password'
        placeholder='Sua Senha'
        error={errors.password}
        icon={<Lock size={22} />}
        {...register('password')}
      />
      <span className='text-red-500'>{errors.password?.message}</span>

      <Input
        type='password'
        placeholder='Confirme sua senha'
        error={errors.confirmPassword}
        icon={<Lock size={22} />}
        {...register('confirmPassword')}
      />
      <span className='text-red-500'>{errors.confirmPassword?.message}</span>

      <Button type='submit' disabled={isLoading} className='mt-4'>
        {isLoading ? <Spinner /> : 'Cadastrar'}
      </Button>

      {signUpErrorMessage && (
        <span className='mt-2 text-center text-md text-red-500'>
          {signUpErrorMessage}
        </span>
      )}
    </form>
  )
}
