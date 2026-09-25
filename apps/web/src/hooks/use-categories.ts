import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export type Category = {
  id: string
  description: string
  created_at: string
  user_id: string
}

export type GetCategoryResponse = {
  total_count: number
  categories: Category[]
}

async function get_categories(
  page: number,
  search_description: string,
  _to_update: boolean
): Promise<GetCategoryResponse> {
  const { data } = await api.get('/list/categories', {
    params: {
      page,
      search_description,
    },
  })

  return { categories: data.categories, total_count: data.total }
}

export function useCategories(
  page: number,
  search_description: string,
  to_update: boolean
) {
  return useQuery({
    queryKey: ['categories', page, search_description, to_update],
    queryFn: () => get_categories(page, search_description, to_update),
    staleTime: 1000 * 5,
  })
}
