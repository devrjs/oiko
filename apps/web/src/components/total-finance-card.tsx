'use client'

import { ArrowDownCircle, ArrowUpCircle, CircleDollarSign } from 'lucide-react'
import { useContext } from 'react'
import { FinanceContext } from '@/contexts/finance-context'
import { convertToBRL } from '@/hooks/use-convert-to-brl'
import { useTotalFinances } from '@/hooks/use-total-finances'
import { Spinner } from './spinner'

interface TotalValueInfoProps {
  type: 'Gastos' | 'Ganhos' | 'Balanço'
}

export function TotalFinanceCard({ type }: TotalValueInfoProps) {
  const { selected_category } = useContext(FinanceContext)
  const { data, error, isLoading, dataUpdatedAt } =
    useTotalFinances(selected_category)

  const value = (
    type === 'Gastos'
      ? data && data.totalFinances.expenses * -1
      : type === 'Ganhos'
        ? data?.totalFinances.earnings
        : data?.totalFinances.profit
  ) as number

  return (
    <div className='flex h-24 w-full items-center justify-between gap-2 rounded-2xl bg-gray-900 px-4 xl:h-28'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-xl'>{type}</h1>
        <span
          className={`whitespace-nowrap text-xl md:text-xl xl:text-2xl 2xl:text-3xl ${
            type === 'Gastos' || value < 0
              ? 'text-red-500'
              : type === 'Ganhos'
                ? 'text-green-500'
                : 'text-yellow-500'
          }`}
          key={dataUpdatedAt}
        >
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <span>Falha ao carregar!</span>
          ) : (
            convertToBRL(value)
          )}
        </span>
      </div>

      <span
        className={`${
          type === 'Gastos' || value < 0
            ? 'text-red-500'
            : type === 'Ganhos'
              ? 'text-green-500'
              : 'text-yellow-500'
        }`}
      >
        {type === 'Gastos' ? (
          <ArrowDownCircle size={55} />
        ) : type === 'Ganhos' ? (
          <ArrowUpCircle size={55} />
        ) : (
          <CircleDollarSign size={55} />
        )}
      </span>
    </div>
  )
}
