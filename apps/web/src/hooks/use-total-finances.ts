import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

type FinancesData = {
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

async function total_finances(
  selected_category: string
): Promise<totalFinancesResponse> {
  const { data } = await api.get('/total/finances', {
    params: {
      category_id: selected_category,
    },
  })

  return { totalFinances: data }
}

export function useTotalFinances(selected_category: string) {
  return useQuery<totalFinancesResponse, Error>({
    queryKey: ['totalFinances', selected_category],
    queryFn: () => total_finances(selected_category),
    staleTime: 1000 * 5,
  })
}
