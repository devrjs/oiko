'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { type SetStateAction, useContext, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FinanceContext } from '@/contexts/finance-context'
import { dateFormatToUTC } from '@/hooks/use-date-format-to-utc'
import { api } from '@/lib/api'
import { Button } from './button'
import { InputWithLabel } from './input-with-label'
import { RadioButton } from './radio-button'
import { Spinner } from './spinner'

dayjs.locale(ptBr)

export type FinanceFormData = {
  description: string
  amount: string
  date: string
  type: string
}

interface FinanceFormProps {
  type: 'finances' | 'pendencies'
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

export function FinanceForm({ type, setIsOpen }: FinanceFormProps) {
  const { selected_category, to_update, set_to_update, stage_finance } =
    useContext(FinanceContext)
  const [radio_button_value, set_radio_button_value] = useState<
    string | undefined
  >(stage_finance?.type)
  const [error_message, set_error_message] = useState('')
  const [is_loading, set_is_loading] = useState(false)

  // ***** validation *****
  const financeFormSchema = z.object({
    description: z.string().min(1, 'Descrição obrigatória!'),
    amount: z.string().min(1, 'Valor obrigatório!'),
    date: z.string().min(1, 'Data obrigatória!'),
    type: z
      .string()
      .refine(val => val !== 'null', 'Selecione o tipo movimentação!'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FinanceFormData>({
    resolver: zodResolver(financeFormSchema),
  })

  register('type', { value: radio_button_value })

  // ***** submit *****
  const onSubmit: SubmitHandler<FinanceFormData> = async data => {
    const { description, date } = data
    const amount = Number(data.amount)

    set_is_loading(true)

    try {
      if (stage_finance?.id) {
        await api.post('/edit/finance', {
          finance_id: stage_finance.id,
          description,
          amount,
          date: dayjs(dateFormatToUTC(date)).format('YYYY-MM-DDT[03]:mm:ss[Z]'),
          category_id: selected_category,
          type: radio_button_value,
        })
      } else {
        await api.post('/add/finance', {
          description,
          amount,
          date: dayjs(dateFormatToUTC(date)).format('YYYY-MM-DDT[03]:mm:ss[Z]'),
          category_id: selected_category,
          type: radio_button_value,
        })
      }

      set_to_update(!to_update)
      setIsOpen(false)
    } catch (_error) {
      set_error_message('Falha ao cadastrar finança!')
    } finally {
      set_is_loading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='mt-6 flex flex-col gap-3'
    >
      <span className='-mb-2 text-red-500'>{errors.description?.message}</span>
      <InputWithLabel
        defaultValue={stage_finance?.description}
        label='Descrição'
        aria-label='Descrição'
        {...register('description')}
      />

      <span className='-mb-2 text-red-500'>{errors.amount?.message}</span>
      <InputWithLabel
        defaultValue={stage_finance?.amount}
        label='Valor'
        aria-label='Valor'
        {...register('amount')}
      />

      <span className='-mb-2 text-red-500'>{errors.date?.message}</span>
      <InputWithLabel
        defaultValue={
          stage_finance && dayjs(stage_finance?.date).format('DD/MM/YYYY')
        }
        label='Data (dd/mm/aaaa)'
        aria-label='Data (dd/mm/aaaa)'
        {...register('date')}
      />

      <span className='-mb-2 text-red-500'>{errors.type?.message}</span>
      <RadioButton
        type={type}
        radioButtonValue={radio_button_value}
        setRadioButtonValue={set_radio_button_value}
        setValue={setValue}
      />

      <Button type='submit' className='mt-2'>
        {is_loading ? <Spinner /> : 'Confirmar'}
      </Button>
      <span className='-mb-2 text-red-500'>{error_message}</span>
    </form>
  )
}
