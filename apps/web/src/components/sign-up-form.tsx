'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, User, User2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { authClient } from '@/lib/auth-client'
import { Button } from './button'
import { FormError } from './form-error'
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
        autoComplete='username'
        aria-label='Seu Usuário'
        error={errors.username}
        aria-invalid={!!errors.username}
        aria-describedby={errors.username ? 'signup-username-error' : undefined}
        icon={<User size={22} />}
        {...register('username')}
      />
      <FormError
        id='signup-username-error'
        message={errors.username?.message}
      />

      <Input
        type='text'
        placeholder='Seu Nome'
        autoComplete='name'
        aria-label='Seu Nome'
        error={errors.name}
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? 'signup-name-error' : undefined}
        icon={<User2 size={22} />}
        {...register('name')}
      />
      <FormError id='signup-name-error' message={errors.name?.message} />

      <Input
        type='password'
        placeholder='Sua Senha'
        autoComplete='new-password'
        aria-label='Sua Senha'
        error={errors.password}
        aria-invalid={!!errors.password}
        aria-describedby={errors.password ? 'signup-password-error' : undefined}
        icon={<Lock size={22} />}
        {...register('password')}
      />
      <FormError
        id='signup-password-error'
        message={errors.password?.message}
      />

      <Input
        type='password'
        placeholder='Confirme sua senha'
        autoComplete='new-password'
        aria-label='Confirme sua senha'
        error={errors.confirmPassword}
        aria-invalid={!!errors.confirmPassword}
        aria-describedby={
          errors.confirmPassword ? 'signup-confirm-password-error' : undefined
        }
        icon={<Lock size={22} />}
        {...register('confirmPassword')}
      />
      <FormError
        id='signup-confirm-password-error'
        message={errors.confirmPassword?.message}
      />

      <Button type='submit' disabled={isLoading} className='mt-4'>
        {isLoading ? <Spinner /> : 'Cadastrar'}
      </Button>

      {signUpErrorMessage && (
        <span
          role='alert'
          aria-live='assertive'
          className='mt-2 text-center text-destructive text-md'
        >
          {signUpErrorMessage}
        </span>
      )}
    </form>
  )
}
