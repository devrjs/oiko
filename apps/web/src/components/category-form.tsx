'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { type SetStateAction, useContext, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FinanceContext } from '@/contexts/finance-context'
import { api } from '@/lib/api'
import { Button } from './button'
import { FormError } from './form-error'
import { InputWithLabel } from './input-with-label'
import { Spinner } from './spinner'

type CategoryFormData = {
  description: string
}

interface CategoryFormProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

export function CategoryForm({ setIsOpen: set_is_open }: CategoryFormProps) {
  const { to_update, set_to_update, stage_category } =
    useContext(FinanceContext)
  const [error_message, set_error_message] = useState('')
  const [is_loading, set_is_loading] = useState(false)

  // ***** validation *****
  const categoryFormSchema = z.object({
    description: z.string().min(1, { message: 'Descrição obrigatória!' }),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
  })

  // ***** submit *****
  const onSubmit: SubmitHandler<CategoryFormData> = async data => {
    const { description } = data

    set_is_loading(true)

    try {
      if (stage_category?.id) {
        await api.post('/edit/category', {
          category_id: stage_category.id,
          description,
        })
      } else {
        await api.post('/add/category', {
          description,
        })
      }

      set_to_update(!to_update)
      set_is_open(false)
    } catch (_error) {
      set_error_message('Falha ao cadastrar categoria!')
    } finally {
      set_is_loading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mt-6 flex flex-col gap-3'
    >
      <FormError
        message={errors.description?.message}
        className='-mb-2 text-destructive text-xs'
      />
      <InputWithLabel
        defaultValue={stage_category?.description}
        label='Descrição'
        error={errors.description}
        {...register('description')}
      />

      <Button type='submit' className='mt-2'>
        {is_loading ? <Spinner /> : 'Confirmar'}
      </Button>
      {error_message && (
        <span
          role='alert'
          aria-live='assertive'
          className='-mb-2 text-destructive text-xs'
        >
          {error_message}
        </span>
      )}
    </form>
  )
}
