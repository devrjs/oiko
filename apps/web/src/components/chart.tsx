'use client'

import { useMemo } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type {
  FinancesData,
  TotalsState,
} from '@/hooks/use-total-finances'
import { convertToBRL } from '@/hooks/use-convert-to-brl'
import { Spinner } from './spinner'

const chartConfig = {
  gastos: {
    label: 'Gastos',
    color: 'var(--destructive)',
  },
  ganhos: {
    label: 'Ganhos',
    color: 'var(--foreground)',
  },
} satisfies ChartConfig

// Moeda compacta do eixo Y: "R$ 1,5 mil" em vez de "R$ 1500" cru
// (Tabular Numerals Rule vale para os ticks tambem).
const brlCompact = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  notation: 'compact',
  maximumFractionDigits: 1,
})

export function FinanceChart({
  totals,
  totalsState,
}: {
  totals?: FinancesData
  totalsState: TotalsState
}) {
  const expenses = totals?.expensesAmounts ?? []
  const earnings = totals?.earningsAmounts ?? []

  const chartData = useMemo(() => {
    const dataMap = new Map<
      string,
      { date: string; gastos: number; ganhos: number }
    >()

    for (const item of expenses) {
      dataMap.set(item.x, { date: item.x, gastos: item.y, ganhos: 0 })
    }

    for (const item of earnings) {
      const existing = dataMap.get(item.x)
      if (existing) {
        existing.ganhos = item.y
      } else {
        dataMap.set(item.x, { date: item.x, gastos: 0, ganhos: item.y })
      }
    }

    return Array.from(dataMap.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  }, [expenses, earnings])

  return (
    <div className='flex min-h-[300px] w-full flex-col gap-4 overflow-hidden rounded-none bg-card p-4 text-card-foreground ring-1 ring-foreground/10 xl:min-h-[450px]'>
      <h2
        id='relatorio-grafico-titulo'
        className='font-mono text-xl font-medium tracking-normal'
      >
        Relatório Gráfico
      </h2>

      {totalsState === 'loading' ? (
        <div className='flex min-h-[250px] w-full items-center justify-center xl:min-h-[380px]'>
          <Spinner />
        </div>
      ) : totalsState === 'error' ? (
        <div className='flex min-h-[250px] w-full items-center justify-center font-mono text-muted-foreground text-xs xl:min-h-[380px]' aria-hidden='true'>
          —
        </div>
      ) : chartData.length === 0 ? (
        <p
          role='status'
          className='flex min-h-[250px] w-full items-center justify-center font-mono text-muted-foreground text-xs xl:min-h-[380px]'
        >
          Sem registros ainda. O gráfico aparece quando há finanças lançadas.
        </p>
      ) : (
        <ChartTextAlternative chartData={chartData} />
      )}
    </div>
  )
}

function ChartTextAlternative({
  chartData,
}: {
  chartData: { date: string; gastos: number; ganhos: number }[]
}) {
  const { resumo, totalGastos, totalGanhos } = useMemo(() => {
    const totalGastos = chartData.reduce((acc, item) => acc + item.gastos, 0)
    const totalGanhos = chartData.reduce((acc, item) => acc + item.ganhos, 0)
    const formatarBRL = (valor: number) =>
      valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    const formatarData = (valor: string) =>
      new Date(valor).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    const inicio = formatarData(chartData[0].date)
    const fim = formatarData(chartData[chartData.length - 1].date)
    const resumo =
      `Relatório de ${inicio} a ${fim}: ` +
      `${chartData.length} períodos, total de gastos ${formatarBRL(totalGastos)} (linha contínua) ` +
      `e total de ganhos ${formatarBRL(totalGanhos)} (linha tracejada).`
    return { resumo, totalGastos, totalGanhos }
  }, [chartData])

  return (
    <>
      <p className='sr-only'>{resumo}</p>
      <p aria-hidden='true' className='font-mono text-muted-foreground text-xs'>
        {chartData.length} períodos · Gastos{' '}
        {totalGastos.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}{' '}
        · Ganhos{' '}
        {totalGanhos.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </p>

      <div
        role='img'
        aria-label={`Gráfico de área de gastos e ganhos — gastos em linha contínua, ganhos em linha tracejada. ${resumo} Ative "Ver dados em tabela" para ler os valores.`}
        className='h-[250px] w-full xl:h-[380px]'
      >
        <ChartContainer
          config={chartConfig}
          className='h-full w-full [&_.recharts-cartesian-axis-tick_text]:font-mono [&_.recharts-cartesian-axis-tick_text]:tabular-nums'
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 10,
              right: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id='colorGastos' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-gastos)'
                  stopOpacity={0.25}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-gastos)'
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id='colorGanhos' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-ganhos)'
                  stopOpacity={0.2}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-ganhos)'
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke='var(--border)' />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => {
                return new Date(value).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={72}
              tickFormatter={value => brlCompact.format(value)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={value => convertToBRL(Number(value))}
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  }}
                />
              }
            />
            <Area
              dataKey='gastos'
              type='monotone'
              fill='url(#colorGastos)'
              stroke='var(--color-gastos)'
              strokeWidth={2}
            />
            <Area
              dataKey='ganhos'
              type='monotone'
              fill='url(#colorGanhos)'
              stroke='var(--color-ganhos)'
              strokeWidth={2}
              strokeDasharray='6 3'
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </div>

      <details className='group w-full rounded-none ring-1 ring-foreground/10'>
        <summary className='cursor-pointer list-none px-3 py-2 font-mono text-foreground text-xs outline-none hover:bg-muted focus-visible:ring-1 focus-visible:ring-ring [&::-webkit-details-marker]:hidden'>
          Ver dados em tabela
        </summary>
        <div className='max-h-64 overflow-auto border-t border-foreground/10'>
          <table className='w-full font-mono text-xs tabular-nums'>
            <caption className='sr-only'>
              Gastos e ganhos por data. {resumo}
            </caption>
            <thead className='sticky top-0 bg-muted'>
              <tr>
                <th scope='col' className='px-3 py-2 text-left font-medium'>
                  Data
                </th>
                <th scope='col' className='px-3 py-2 text-right font-medium'>
                  Gastos
                </th>
                <th scope='col' className='px-3 py-2 text-right font-medium'>
                  Ganhos
                </th>
              </tr>
            </thead>
            <tbody>
              {chartData.map(item => (
                <tr
                  key={item.date}
                  className='border-t border-foreground/10 odd:bg-muted/30'
                >
                  <th scope='row' className='px-3 py-2 text-left font-normal'>
                    {new Date(item.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </th>
                  <td className='px-3 py-2 text-right text-destructive'>
                    {item.gastos.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td className='px-3 py-2 text-right text-foreground'>
                    {item.ganhos.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </>
  )
}
