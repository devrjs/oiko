import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

type User = {
  username: string
  name: string
}

export type userResponse = {
  user: User
}

async function get_user(_to_update: boolean): Promise<userResponse> {
  const { data } = await api.get('/me')
  return { user: data }
}

export function useUser(to_update: boolean) {
  return useQuery<userResponse, Error>({
    queryKey: ['user', to_update],
    queryFn: () => get_user(to_update),
    staleTime: 1000 * 5,
  })
}
