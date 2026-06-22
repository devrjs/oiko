'use client'

import { ArrowDownCircle, ArrowUpCircle, CircleDollarSign } from 'lucide-react'
import { useContext } from 'react'
import { Card, CardContent } from '@/components/ui/card'
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

  const textColor =
    type === 'Gastos' || value < 0
      ? 'text-destructive'
      : type === 'Ganhos'
        ? 'text-foreground'
        : 'text-muted-foreground'

  const icon =
    type === 'Gastos' ? (
      <ArrowDownCircle size={55} />
    ) : type === 'Ganhos' ? (
      <ArrowUpCircle size={55} />
    ) : (
      <CircleDollarSign size={55} />
    )

  return (
    <Card className='flex h-24 w-full items-center justify-between xl:h-28'>
      <CardContent className='flex w-full items-center justify-between px-4'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-xl'>{type}</h1>
          <span
            className={`whitespace-nowrap text-xl md:text-xl xl:text-2xl 2xl:text-3xl ${textColor}`}
            key={dataUpdatedAt}
          >
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <span className='text-destructive'>Falha ao carregar!</span>
            ) : (
              convertToBRL(value)
            )}
          </span>
        </div>

        <span className={textColor}>{icon}</span>
      </CardContent>
    </Card>
  )
}
