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
import { FormError } from './form-error'
import { InputWithLabel } from './input-with-label'
import { RadioButton } from './radio-button'
import { Spinner } from './spinner'
import { useSelectCategories } from '@/hooks/use-select-categories'

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
  const {
    selected_category,
    set_selected_category,
    to_update,
    set_to_update,
    stage_finance,
  } = useContext(FinanceContext)
  // A nova financa herda o filtro de categoria ativo. Visivel, nao
  // silencioso: avisa como o lancamento sera rotulado e oferece limpar.
  const { data: categories_data } = useSelectCategories(to_update)
  const inherited_category_name =
    !stage_finance && selected_category
      ? categories_data?.categories.find(c => c.id === selected_category)
          ?.description
      : undefined
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
      {inherited_category_name ? (
        <p className='font-mono text-muted-foreground text-xs'>
          Será categorizada como: <span className='text-foreground'>{inherited_category_name}</span>
          {' — '}
          <button
            type='button'
            onClick={() => set_selected_category('')}
            className='text-foreground underline underline-offset-4 hover:text-foreground/70'
          >
            sem categoria
          </button>
        </p>
      ) : null}
      <FormError
        message={errors.description?.message}
        className='-mb-2 text-destructive text-xs'
      />
      <InputWithLabel
        defaultValue={stage_finance?.description}
        label='Descrição'
        error={errors.description}
        {...register('description')}
      />

      <FormError
        message={errors.amount?.message}
        className='-mb-2 text-destructive text-xs'
      />
      <InputWithLabel
        defaultValue={stage_finance?.amount}
        label='Valor'
        error={errors.amount}
        inputMode='decimal'
        enterKeyHint='next'
        autoComplete='off'
        placeholder='0,00'
        {...register('amount')}
      />

      <FormError
        message={errors.date?.message}
        className='-mb-2 text-destructive text-xs'
      />
      <InputWithLabel
        defaultValue={
          stage_finance && dayjs(stage_finance?.date).format('DD/MM/YYYY')
        }
        label='Data (dd/mm/aaaa)'
        error={errors.date}
        inputMode='numeric'
        enterKeyHint='next'
        autoComplete='off'
        placeholder='dd/mm/aaaa'
        {...register('date')}
      />

      <FormError
        message={errors.type?.message}
        className='-mb-2 text-destructive text-xs'
      />
      <RadioButton
        type={type}
        radioButtonValue={radio_button_value}
        setRadioButtonValue={set_radio_button_value}
        setValue={setValue}
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
