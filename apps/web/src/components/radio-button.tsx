import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import type { SetStateAction } from 'react'
import type { UseFormSetValue } from 'react-hook-form'
import type { FinanceFormData } from './finance-form'

interface RadioButtonProps {
  type: 'finances' | 'pendencies'
  setValue: UseFormSetValue<FinanceFormData>
  radioButtonValue: string | undefined
  setRadioButtonValue: React.Dispatch<SetStateAction<string | undefined>>
}

export function RadioButton({
  type,
  radioButtonValue,
  setRadioButtonValue,
  setValue,
}: RadioButtonProps) {
  return (
    <div className='flex h-12 items-center justify-center gap-2'>
      <button
        type='button'
        className={`flex h-full w-full items-center justify-center gap-2 rounded-md ${
          radioButtonValue === 'Saída' || radioButtonValue === 'Contas a pagar'
            ? 'bg-red-500 text-gray-100'
            : 'bg-gray-700 text-red-500'
        }`}
        onClick={
          type === 'finances'
            ? () => {
                setRadioButtonValue('Saída')
                setValue('type', 'Saída')
              }
            : () => {
                setRadioButtonValue('Contas a pagar')
                setValue('type', 'Contas a pagar')
              }
        }
      >
        <ArrowDownCircle size={25} />
        {type === 'finances' ? 'Saída' : 'Contas a pagar'}
      </button>
      <button
        type='button'
        className={`flex h-full w-full items-center justify-center gap-2 rounded-md ${
          radioButtonValue === 'Entrada' ||
          radioButtonValue === 'Contas a receber'
            ? 'bg-green-500 text-black'
            : 'bg-gray-700 text-green-500'
        }`}
        onClick={
          type === 'finances'
            ? () => {
                setRadioButtonValue('Entrada')
                setValue('type', 'Entrada')
              }
            : () => {
                setRadioButtonValue('Contas a receber')
                setValue('type', 'Contas a receber')
              }
        }
      >
        <ArrowUpCircle size={25} />
        {type === 'finances' ? 'Entrada' : 'Contas a receber'}
      </button>
    </div>
  )
}
