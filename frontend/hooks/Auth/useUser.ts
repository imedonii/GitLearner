import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '../queryKeys'
import { axiosInstance } from '@/api'

export interface User {
  id: number
  fullName: string
  email: string
  level: number
  token: string
}

interface useUserProps {
  user: User | null
  isLoading: boolean
}

async function getUser(): Promise<User | null> {
  const token = localStorage.getItem('token')

  try {
    const response = await axiosInstance.get('me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    localStorage.removeItem('token')
    throw error
  }
}

export function useUser(): useUserProps {
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: [QUERY_KEY.user],
    queryFn: getUser,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    enabled: !!localStorage.getItem('token'),
  })

  return {
    user: user ?? null,
    isLoading,
  }
}
