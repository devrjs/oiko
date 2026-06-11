'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Spinner } from '@/components/spinner'
import { api } from '@/lib/api'

const userFormSchema = z
  .object({
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

type UserFormData = z.infer<typeof userFormSchema>

export default function ResetPassword() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  })

  // ***** submit *****
  const onSubmit: SubmitHandler<UserFormData> = async data => {
    const { password } = data

    setIsLoading(true)

    try {
      await api.post('/edit/user', {
        password,
      })

      router.push('/dashboard')
    } catch (_error) {
      // handle error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex w-md flex-col justify-center gap-6 rounded-xl bg-gray-800 px-8 pt-6 pb-8'>
      <h1 className='font-semibold text-xl'>Recuperação de senha</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full max-w-[350px] flex-col gap-3'
      >
        <Input
          type='password'
          placeholder='Nova Senha'
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
          {isLoading ? <Spinner /> : 'Confirmar'}
        </Button>
      </form>
    </div>
  )
}
