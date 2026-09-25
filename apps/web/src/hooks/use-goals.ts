import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

type Goals = {
  id: string | null
  starting_amount: number
  target_amount: number
  target_date: Date
  current_amount: number
  percentage_reached: string
  status_message: string
}

export type goalsResponse = {
  goals: Goals
}

async function get_goals(
  selected_category: string,
  _to_update: boolean
): Promise<goalsResponse> {
  const { data } = await api.get('/view/goals', {
    params: {
      category_id: selected_category,
    },
  })

  return { goals: data }
}

export function useGoals(selected_category: string, to_update: boolean) {
  return useQuery<goalsResponse, Error>({
    queryKey: ['goals', selected_category, to_update],
    queryFn: () => get_goals(selected_category, to_update),
    staleTime: 1000 * 5,
  })
}
