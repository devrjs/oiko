import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export interface FinancesData {
  expenses: number
  earnings: number
  profit: number
  expensesTotalRecords: number
  earningsTotalRecords: number
  latestExpenses: Array<{
    id: string
    description: string
    amount: number
    date: string
  }>
  latestEarnings: Array<{
    id: string
    description: string
    amount: number
    date: string
  }>
  expensesAmounts: { x: string; y: number }[]
  earningsAmounts: { x: string; y: number }[]
}

export type totalFinancesResponse = {
  totalFinances: FinancesData
}

// Estado tri-estado do painel: filhos renderizam spinner, traço (—) ou dado.
export type TotalsState = 'loading' | 'error' | 'ready'

export interface TotalsPeriod {
  /** inicio do recorte, ISO; ausente = vida inteira */
  from?: string
  /** exclusive upper bound, ISO */
  to?: string
  /** rotulo do recorte para eco visual ("Este mes", "Tudo") */
  label: string
}

async function total_finances(
  selected_category: string,
  period?: TotalsPeriod
): Promise<totalFinancesResponse> {
  const { data } = await api.get('/total/finances', {
    params: {
      category_id: selected_category,
      ...(period?.from ? { from: period.from } : {}),
      ...(period?.to ? { to: period.to } : {}),
    },
  })

  return { totalFinances: data }
}

export function useTotalFinances(
  selected_category: string,
  to_update: boolean,
  period?: TotalsPeriod
) {
  return useQuery<totalFinancesResponse, Error>({
    // to_update no mesmo padrao dos 6 hooks irmaos: e como o modal do
    // dashboard invalida os totais apos gravar uma financa.
    queryKey: ['totalFinances', selected_category, to_update, period?.label ?? 'all'],
    queryFn: () => total_finances(selected_category, period),
    staleTime: 1000 * 30,
  })
}
