'use client'

import { ChevronsDown, ChevronsUp } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { convertToBRL } from '@/hooks/use-convert-to-brl'
import type {
  FinancesData,
  TotalsState,
} from '@/hooks/use-total-finances'
import { Button } from './ui/button'
import { Modal } from './modal'
import { Spinner } from './spinner'

interface LastRecordInfoProps {
  type: 'Gastos' | 'Ganhos'
  totals?: FinancesData
  totalsState: TotalsState
}

export function LastRecordInfo({ type, totals, totalsState }: LastRecordInfoProps) {
  const finances =
    type === 'Gastos' ? totals?.latestExpenses : totals?.latestEarnings
  const total =
    type === 'Gastos'
      ? totals?.expensesTotalRecords
      : totals?.earningsTotalRecords

  const typeColor = type === 'Gastos' ? 'text-destructive' : 'text-foreground'

  return (
    <Card className='flex min-h-[220px] w-full flex-col rounded-none'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between'>
          <h2 className='text-xl'>Últimos {type}</h2>
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
        {totalsState === 'loading' ? (
          <div className='flex h-full w-full items-center justify-center'>
            <Spinner />
          </div>
        ) : totalsState === 'error' ? (
          <div className='flex h-full w-full items-center justify-center text-muted-foreground' aria-hidden='true'>
            —
          </div>
        ) : finances && finances.length > 0 ? (
          finances.map(finance => (
            <div
              className='flex w-full items-center justify-between gap-3 rounded-none bg-muted/30 px-4 py-1'
              key={finance.id}
            >
              <span
                className='min-w-0 flex-1 truncate'
                title={finance.description}
              >
                {finance.description}
              </span>
              <time
                dateTime={finance.date}
                className='shrink-0 tabular-nums text-muted-foreground'
              >
                {new Intl.DateTimeFormat('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }).format(new Date(finance.date))}
              </time>
              <span
                className={`shrink-0 whitespace-nowrap text-end tabular-nums ${typeColor}`}>
                {convertToBRL(
                  type === 'Gastos' ? finance.amount * -1 : finance.amount
                )}
              </span>
            </div>
          ))
        ) : (
          <div className='flex h-full flex-col items-center justify-center gap-2 text-muted-foreground'>
            <span className='rounded-none p-1'>
              Nenhum registro de {type.toLowerCase()} ainda.
            </span>
            <Modal type='finances' reset_stage>
              <Button type='button' variant='link'>
                Adicionar primeira finança
              </Button>
            </Modal>
          </div>
        )}

        <Link
          href='/finances'
          className='mt-auto flex w-full justify-between border-border border-t px-4 py-1 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring'
        >
          <span>Todos os registros de {type.toLowerCase()} →</span>
          <span className='tabular-nums'>{total ?? 0}</span>
        </Link>
      </CardContent>
    </Card>
  )
}
