import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { Category } from './use-categories'

type GetCategoryResponse = {
  categories: Category[]
}

async function get_categories(
  _to_update: boolean
): Promise<GetCategoryResponse> {
  const { data } = await api.get('/all/categories')
  return { categories: data }
}

export function useSelectCategories(to_update: boolean) {
  return useQuery({
    queryKey: ['categories', to_update],
    queryFn: () => get_categories(to_update),
    staleTime: 1000 * 5,
  })
}
