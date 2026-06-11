'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, User, User2 } from 'lucide-react'
import { useContext, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FinanceContext } from '@/contexts/finance-context'
import { useUser } from '@/hooks/use-user'
import { api } from '@/lib/api'
import { Button } from './button'
import { Input } from './input'
import { Spinner } from './spinner'

type UserFormData = {
  username: string
  name: string
  password?: string
  confirmPassword?: string
}

export function UserForm() {
  const [message, setMessage] = useState('')
  const { to_update, set_to_update } = useContext(FinanceContext)
  const [no_password, set_no_password] = useState(true)
  const [is_saving, set_saving] = useState(false)

  const { data, isLoading } = useUser(to_update)

  // ***** validation *****
  const userFormSchema = no_password
    ? z.object({
        username: z
          .string()
          .min(3, { message: 'Usuário deve ter pelo menos 3 caracteres!' }),
        name: z.string().min(1, { message: 'Nome obrigatório!' }),
      })
    : z
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
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  })

  // ***** submit *****
  const onSubmit: SubmitHandler<UserFormData> = async data => {
    const { name, username, password } = data

    set_saving(true)

    try {
      await api.post('/edit/user', {
        name,
        username,
        password,
      })

      setMessage('Dados alterados com sucesso!')
      set_to_update(!to_update)
    } catch (_error) {
      setMessage('Falha ao atualizar dados!')
    } finally {
      set_saving(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mt-6 flex w-full max-w-[350px] flex-col gap-3'
    >
      <Input
        type='text'
        defaultValue={data?.user.username}
        placeholder='Seu Usuário'
        error={errors.username}
        icon={<User size={22} />}
        {...register('username')}
        bg_color='bg-gray-700'
        autoComplete='off'
      />
      <span className='text-red-500'>{errors.username?.message}</span>

      <Input
        type='text'
        defaultValue={data?.user.name}
        placeholder='Seu Nome'
        error={errors.name}
        icon={<User2 size={22} />}
        {...register('name')}
        bg_color='bg-gray-700'
        autoComplete='off'
      />
      <span className='text-red-500'>{errors.name?.message}</span>

      <Button
        type='button'
        onClick={() => set_no_password(!no_password)}
        className='bg-cyan-500 hover:bg-cyan-400'
      >
        Alterar a senha
      </Button>
      <div className={`${no_password && 'hidden'} flex flex-col gap-3`}>
        <Input
          type='password'
          placeholder='Nova Senha'
          error={errors.password}
          icon={<Lock size={22} />}
          {...register('password')}
          bg_color='bg-gray-700'
          autoComplete='off'
        />
        <span className='text-red-500'>{errors.password?.message}</span>

        <Input
          type='password'
          placeholder='Confirme sua senha'
          error={errors.confirmPassword}
          icon={<Lock size={22} />}
          {...register('confirmPassword')}
          bg_color='bg-gray-700'
          autoComplete='off'
        />
        <span className='text-red-500'>{errors.confirmPassword?.message}</span>
      </div>

      <Button type='submit' disabled={isLoading} className='mt-4'>
        {is_saving ? <Spinner /> : 'Alterar dados'}
      </Button>

      <span
        className={`-mb-2 ${message === 'Dados alterados com sucesso!' ? 'text-green-500' : 'text-red-500'}`}
      >
        {message}
      </span>
    </form>
  )
}
