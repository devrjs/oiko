'use client'

import dynamic from 'next/dynamic'
import { useContext, useMemo, useState } from 'react'
import { LastRecordInfo } from '@/components/last-record-info'
import { PageHeader } from '@/components/page-header'
import { TotalFinanceCard } from '@/components/total-finance-card'
import { Button } from '@/components/ui/button'
import { FinanceContext } from '@/contexts/finance-context'
import {
  type TotalsPeriod,
  useTotalFinances,
} from '@/hooks/use-total-finances'
import { useSelectCategories } from '@/hooks/use-select-categories'

// recharts fora do bundle inicial: só baixa quando o dashboard renderiza,
// com esqueleto quadrado (flat-by-default) no lugar para CLS ~0.
const FinanceChart = dynamic(
  () => import('@/components/chart').then(mod => mod.FinanceChart),
  {
    ssr: false,
    loading: () => (
      <div
        role='status'
        aria-busy='true'
        aria-label='Carregando gráfico'
        className='min-h-[300px] w-full animate-pulse bg-card ring-1 ring-foreground/10 xl:min-h-[450px]'
      />
    ),
  }
)

const PERIODS: Array<{ key: string; label: string; build: () => TotalsPeriod }> =
  [
    {
      key: 'month',
      label: 'Este mês',
      build: () => {
        const now = new Date()
        const from = new Date(now.getFullYear(), now.getMonth(), 1)
        const to = new Date(now.getFullYear(), now.getMonth() + 1, 1)
        return {
          from: from.toISOString(),
          to: to.toISOString(),
          label: 'Este mês',
        }
      },
    },
    { key: 'all', label: 'Tudo', build: () => ({ label: 'Tudo' }) },
  ]

export default function Dashboard() {
  const {
    selected_category,
    set_selected_category,
    to_update,
  } = useContext(FinanceContext)
  const [period_key, set_period_key] = useState('month')

  const period = useMemo(
    () => PERIODS.find(p => p.key === period_key)!.build(),
    [period_key]
  )

  // Uma única subscription: os 6 painéis recebem totais + estado tri-estado
  // por prop. Em erro, o banner único abaixo é a voz; os filhos silenciam.
  // to_update na queryKey: o modal desta página invalida os totais ao gravar.
  const { data, error, isLoading, dataUpdatedAt, refetch, isFetching } =
    useTotalFinances(selected_category, to_update, period)

  const totals = data?.totalFinances
  const totalsState = error ? 'error' : isLoading ? 'loading' : 'ready'

  // Nome da categoria filtrada para o eco visual (mesma fonte do Topbar).
  const { data: categories } = useSelectCategories(to_update)
  const filter_name = selected_category
    ? categories?.categories.find(c => c.id === selected_category)
        ?.description
    : undefined

  return (
    <section className='flex w-full flex-col gap-4'>
      <div className='flex flex-col gap-3'>
        <PageHeader title='Dashboard' add_button='Adicionar Finança' />
        <div className='flex flex-wrap items-center justify-between gap-2 px-2'>
          {/* Eco do escopo: o usuario nunca reconstrói de cabeça o recorte
              que esta vendo. */}
          <p
            role='status'
            aria-live='polite'
            className='font-mono text-muted-foreground text-xs'
          >
            {filter_name
              ? `Exibindo: ${filter_name} · ${period.label}`
              : `Exibindo: todas as categorias · ${period.label}`}
            {filter_name ? (
              <button
                type='button'
                onClick={() => set_selected_category('')}
                className='ml-2 text-foreground underline underline-offset-4 hover:text-foreground/70'
              >
                limpar filtro
              </button>
            ) : null}
          </p>
          <div role='group' aria-label='Período exibido' className='flex gap-1'>
            {PERIODS.map(p => (
              <Button
                key={p.key}
                type='button'
                size='xs'
                variant={p.key === period_key ? 'default' : 'ghost'}
                aria-pressed={p.key === period_key}
                onClick={() => set_period_key(p.key)}
              >
                {p.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {error ? (
        <div
          role='alert'
          aria-live='assertive'
          className='flex w-full items-center justify-between gap-3 bg-destructive/10 px-4 py-2 ring-1 ring-destructive/20'
        >
          <span className='font-mono text-foreground text-xs'>
            Não foi possível carregar seus totais. Verifique sua conexão.
          </span>
          <Button
            type='button'
            variant='outline'
            disabled={isFetching}
            onClick={() => void refetch()}
          >
            {isFetching ? 'Tentando novamente…' : 'Tentar novamente'}
          </Button>
        </div>
      ) : null}

      <div className='flex flex-col justify-between gap-4 md:flex-row'>
        <TotalFinanceCard
          type='Gastos'
          totals={totals}
          totalsState={totalsState}
          updatedAt={dataUpdatedAt}
        />
        <TotalFinanceCard
          type='Ganhos'
          totals={totals}
          totalsState={totalsState}
          updatedAt={dataUpdatedAt}
        />
        <TotalFinanceCard
          type='Balanço'
          totals={totals}
          totalsState={totalsState}
          updatedAt={dataUpdatedAt}
        />
      </div>

      <div className='flex flex-col gap-4 xl:flex-row'>
        <FinanceChart totals={totals} totalsState={totalsState} />

        <section
          aria-label='Últimos registros'
          className='flex w-full flex-col gap-4 sm:flex-row xl:max-w-[320px] xl:flex-col 2xl:max-w-[400px]'
        >
          <LastRecordInfo
            type='Gastos'
            totals={totals}
            totalsState={totalsState}
          />
          <LastRecordInfo
            type='Ganhos'
            totals={totals}
            totalsState={totalsState}
          />
        </section>
      </div>
    </section>
  )
}
