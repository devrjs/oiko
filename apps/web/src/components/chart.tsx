'use client'

import { useContext } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { FinanceContext } from '@/contexts/finance-context'
import { useTotalFinances } from '@/hooks/use-total-finances'
import { Spinner } from './spinner'

const chartConfig = {
  gastos: {
    label: 'Gastos',
    color: '#D73754',
  },
  ganhos: {
    label: 'Ganhos',
    color: '#1FCB4F',
  },
} satisfies ChartConfig

export function FinanceChart() {
  const { selected_category } = useContext(FinanceContext)
  const { data, error, isLoading } = useTotalFinances(selected_category)

  const expenses = data?.totalFinances.expensesAmounts ?? []
  const earnings = data?.totalFinances.earningsAmounts ?? []

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

  const chartData = Array.from(dataMap.values()).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  return (
    <div className='min-h-[300px] w-full overflow-hidden rounded-2xl bg-gray-900 pt-4 pb-2 xl:min-h-[450px] 2xl:pr-4'>
      <h1 className='px-4 text-2xl'>Relatório Gráfico</h1>

      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <Spinner />
        </div>
      ) : error ? (
        <div className='flex h-full w-full items-center justify-center'>
          <span>Falha ao carregar!</span>
        </div>
      ) : (
        <div className='h-[250px] w-full px-2 xl:h-[380px]'>
          <ChartContainer config={chartConfig} className='h-full w-full'>
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
                  <stop offset='5%' stopColor='#D73754' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='#D73754' stopOpacity={0} />
                </linearGradient>
                <linearGradient id='colorGanhos' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#1FCB4F' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='#1FCB4F' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke='#1d1f25' />
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
                tickFormatter={value => `R$ ${value}`}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
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
                stroke='#D73754'
                strokeWidth={2}
              />
              <Area
                dataKey='ganhos'
                type='monotone'
                fill='url(#colorGanhos)'
                stroke='#1FCB4F'
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      )}
    </div>
  )
}
