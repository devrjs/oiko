'use client'

import { ChevronsDown, ChevronsUp } from 'lucide-react'
import { useContext } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

  const typeColor = type === 'Gastos' ? 'text-destructive' : 'text-foreground'

  return (
    <Card className='flex min-h-[220px] w-full flex-col' key={dataUpdatedAt}>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <h1 className='text-xl'>Últimos {type}</h1>
          <span className={typeColor}>
            {type === 'Gastos' ? (
              <ChevronsDown size={35} />
            ) : (
              <ChevronsUp size={35} />
            )}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className='flex flex-1 flex-col gap-2'>
        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <Spinner />
          </div>
        ) : error ? (
          <div className='flex h-full w-full items-center justify-center'>
            <span className='text-destructive'>Falha ao carregar!</span>
          </div>
        ) : finances && finances.length > 0 ? (
          finances.map(finance => (
            <div
              className='flex w-full justify-between whitespace-nowrap rounded bg-muted px-4 py-1'
              key={finance.id}
            >
              <span
                className='overflow-hidden text-ellipsis'
                title={finance.description}
              >
                {finance.description}
              </span>
              <span className={`pl-3 text-end ${typeColor}`}>
                {convertToBRL(
                  type === 'Gastos' ? finance.amount * -1 : finance.amount
                )}
              </span>
            </div>
          ))
        ) : (
          <div className='flex h-full items-center justify-center text-muted-foreground'>
            <span className='rounded-md p-1'>
              Nenhum registro de finança realizado!
            </span>
          </div>
        )}

        <div className='mt-auto flex w-full justify-between border-border border-t px-4 py-1 text-muted-foreground'>
          <span>Total de registros</span>
          <span>{total}</span>
        </div>
      </CardContent>
    </Card>
  )
}
