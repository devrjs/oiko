import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { GetFinancesResponse } from './use-finances'

async function get_pendencies(
  page: number,
  search_description: string,
  selected_category: string,
  _to_update: boolean
): Promise<GetFinancesResponse> {
  const { data } = await api.get('/list/pendencies', {
    params: {
      page,
      category_id: selected_category,
      search_description,
    },
  })

  return { finances: data.pendencies, total_count: data.total }
}

export function usePendencies(
  page: number,
  search_description: string,
  selected_category: string,
  to_update: boolean
) {
  return useQuery<GetFinancesResponse, Error>({
    queryKey: [
      'pendencies',
      page,
      search_description,
      selected_category,
      to_update,
    ],
    queryFn: () =>
      get_pendencies(page, search_description, selected_category, to_update),
    staleTime: 1000 * 5,
  })
}
