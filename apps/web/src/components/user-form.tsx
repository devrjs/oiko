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
import { FormError } from './form-error'
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
        aria-label='Seu Usuário'
        error={errors.username}
        aria-invalid={!!errors.username}
        aria-describedby={errors.username ? 'user-username-error' : undefined}
        icon={<User size={22} />}
        {...register('username')}
        autoComplete='off'
      />
      <FormError
        id='user-username-error'
        message={errors.username?.message}
        className='text-destructive text-xs'
      />

      <Input
        type='text'
        defaultValue={data?.user.name}
        placeholder='Seu Nome'
        aria-label='Seu Nome'
        error={errors.name}
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? 'user-name-error' : undefined}
        icon={<User2 size={22} />}
        {...register('name')}
        autoComplete='off'
      />
      <FormError
        id='user-name-error'
        message={errors.name?.message}
        className='text-destructive text-xs'
      />

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
          aria-label='Nova Senha'
          error={errors.password}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'user-password-error' : undefined}
          icon={<Lock size={22} />}
          {...register('password')}
            autoComplete='off'
        />
        <FormError
          id='user-password-error'
          message={errors.password?.message}
          className='text-destructive text-xs'
        />

        <Input
          type='password'
          placeholder='Confirme sua senha'
          aria-label='Confirme sua senha'
          error={errors.confirmPassword}
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={
            errors.confirmPassword ? 'user-confirm-password-error' : undefined
          }
          icon={<Lock size={22} />}
          {...register('confirmPassword')}
            autoComplete='off'
        />
        <FormError
          id='user-confirm-password-error'
          message={errors.confirmPassword?.message}
          className='text-destructive text-xs'
        />
      </div>

      <Button type='submit' disabled={isLoading} className='mt-4'>
        {is_saving ? <Spinner /> : 'Alterar dados'}
      </Button>

      {message && (
        <span
          role={message === 'Dados alterados com sucesso!' ? 'status' : 'alert'}
          aria-live='polite'
          className={`-mb-2 ${message === 'Dados alterados com sucesso!' ? 'text-foreground font-medium' : 'text-destructive'}`}
        >
          {message}
        </span>
      )}
    </form>
  )
}
