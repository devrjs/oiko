'use client'

import { ArrowDownCircle, ArrowUpCircle, CircleDollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { convertToBRL } from '@/hooks/use-convert-to-brl'
import { type TotalsState, type totalFinancesResponse } from '@/hooks/use-total-finances'
import { Spinner } from './spinner'

interface TotalValueInfoProps {
  type: 'Gastos' | 'Ganhos' | 'Balanço'
  totals?: totalFinancesResponse['totalFinances']
  totalsState: TotalsState
  updatedAt?: number
}

export function TotalFinanceCard({
  type,
  totals,
  totalsState,
  updatedAt,
}: TotalValueInfoProps) {
  const raw =
    type === 'Gastos'
      ? totals?.expenses
      : type === 'Ganhos'
        ? totals?.earnings
        : totals?.profit

  // Normaliza -0: com zero gastos o valor e 0, nao "-0" (que renderizaria
  // "-R$ 0,00" em vermelho — um saldo vazio parecendo divida).
  const value = raw === undefined ? undefined : raw === 0 ? 0 : type === 'Gastos' ? raw * -1 : raw

  const isNegative = value !== undefined && value < 0
  const textColor =
    type === 'Gastos' && value !== 0
      ? 'text-destructive'
      : type === 'Ganhos'
        ? 'text-foreground'
        : isNegative
          ? 'text-destructive'
          : 'text-muted-foreground'

  const icon =
    type === 'Gastos' ? (
      <ArrowDownCircle size={55} />
    ) : type === 'Ganhos' ? (
      <ArrowUpCircle size={55} />
    ) : (
      <CircleDollarSign size={55} />
    )

  const updatedAtLabel =
    totalsState === 'ready' && updatedAt
      ? new Intl.DateTimeFormat('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(updatedAt)
      : undefined

  return (
    <Card className='flex h-24 w-full flex-col rounded-none xl:h-28'>
      <CardContent className='flex w-full items-center justify-between gap-3 px-4'>
        <div className='flex min-w-0 flex-1 flex-col gap-2'>
          <h2 className='font-mono text-sm font-medium tracking-wide text-muted-foreground uppercase'>
            {type}
          </h2>
          <span
            className='block min-w-0 truncate tabular-nums text-xl md:text-xl xl:text-2xl 2xl:text-3xl'
            title={
              totalsState === 'ready' && updatedAtLabel
                ? `Atualizado às ${updatedAtLabel}`
                : undefined
            }
          >
            {totalsState === 'loading' ? (
              <Spinner />
            ) : totalsState === 'error' ? (
              <span className='text-muted-foreground' aria-hidden='true'>
                —
              </span>
            ) : (
              <>
                <span className={textColor}>{convertToBRL(value ?? 0)}</span>
                {type === 'Balanço' && updatedAtLabel ? (
                  <span className='sr-only'>
                    {' '}
                    Atualizado em{' '}
                    {new Intl.DateTimeFormat('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(updatedAt!)}
                    .
                  </span>
                ) : null}
              </>
            )}
          </span>
        </div>

        <span className={`shrink-0 ${textColor}`} aria-hidden='true'>
          {icon}
        </span>
      </CardContent>
    </Card>
  )
}
