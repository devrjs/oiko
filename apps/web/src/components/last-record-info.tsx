'use client'

import { ChevronsDown, ChevronsUp } from 'lucide-react'
import { useContext } from 'react'
import { FinanceContext } from '@/contexts/finance-context'
import { convertToBRL } from '@/hooks/use-convert-to-brl'
import { useTotalFinances } from '@/hooks/use-total-finances'
import { Spinner } from './spinner'

interface LastRecordInfoProps {
  type: 'Gastos' | 'Ganhos'
}

export function LastRecordInfo({ type }: LastRecordInfoProps) {
  const { selected_category } = useContext(FinanceContext)
  const { data, error, isLoading, dataUpdatedAt } =
    useTotalFinances(selected_category)

  const finances =
    type === 'Gastos'
      ? data?.totalFinances.latestExpenses
      : data?.totalFinances.latestEarnings
  const total =
    type === 'Gastos'
      ? data?.totalFinances.expensesTotalRecords
      : data?.totalFinances.earningsTotalRecords

  return (
    <div
      className='flex min-h-[220px] w-full flex-col justify-center gap-2 rounded-2xl bg-gray-900 p-4'
      key={dataUpdatedAt}
    >
      <header className='flex items-center justify-between'>
        <h1 className='text-xl'>Últimos {type}</h1>
        <span
          className={`${type === 'Gastos' ? 'text-red-500' : 'text-green-500'}`}
        >
          {type === 'Gastos' ? (
            <ChevronsDown size={35} />
          ) : (
            <ChevronsUp size={35} />
          )}
        </span>
      </header>

      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <Spinner />
        </div>
      ) : error ? (
        <div className='flex h-full w-full items-center justify-center'>
          <span>Falha ao carregar!</span>
        </div>
      ) : finances && finances.length > 0 ? (
        finances.map(finance => (
          <div
            className='flex w-full justify-between whitespace-nowrap rounded bg-gray-800 px-4 py-1'
            key={finance.id}
          >
            <span
              className='overflow-hidden text-ellipsis'
              title={finance.description}
            >
              {finance.description}
            </span>
            <span
              className={`pl-3 text-end ${type === 'Gastos' ? 'text-red-500' : 'text-green-500'}`}
            >
              {convertToBRL(
                type === 'Gastos' ? finance.amount * -1 : finance.amount
              )}
            </span>
          </div>
        ))
      ) : (
        <div className='flex h-full items-center justify-center text-gray-600'>
          <span className='rounded-md p-1'>
            Nenhum registro de finança realizado!
          </span>
        </div>
      )}

      <div className='mt-auto flex w-full justify-between border-t-[1px] border-t-gray-700 px-4 py-1 text-gray-300'>
        <span>Total de registros</span>
        <span>{total}</span>
      </div>
    </div>
  )
}
