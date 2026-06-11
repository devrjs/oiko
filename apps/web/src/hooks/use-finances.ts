import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export type Finance = {
  id: string
  description: string
  amount: number
  date: string
  type: string
  createdAt: string
  categoryId: string
  userId: string
}

export type GetFinancesResponse = {
  total_count: number
  finances: Finance[]
}

async function get_finances(
  page: number,
  search_description: string,
  selected_category: string,
  _to_update: boolean
): Promise<GetFinancesResponse> {
  const { data } = await api.get('/list/finance', {
    params: {
      page,
      category_id: selected_category,
      search_description,
    },
  })

  return { finances: data.finances, total_count: data.total }
}

export function useFinances(
  page: number,
  search_description: string,
  selected_category: string,
  to_update: boolean
) {
  return useQuery<GetFinancesResponse, Error>({
    queryKey: [
      'finances',
      page,
      search_description,
      selected_category,
      to_update,
    ],
    queryFn: () =>
      get_finances(page, search_description, selected_category, to_update),
    staleTime: 1000 * 5,
  })
}
