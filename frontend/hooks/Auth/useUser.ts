import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '../queryKeys'
import { axiosInstance } from '@/api'
import Cookies from 'js-cookie'

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
  try {
    const response = await axiosInstance.get('auth/me', {
      withCredentials: true,
    })
    return response.data.user
  } catch (error) {
    return null
  }
}

export function useUser(): useUserProps {
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: [QUERY_KEY.user],
    queryFn: getUser,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    // enabled: !!Cookies.get('token'),
    enabled: true,
  })

  return {
    user: user ?? null,
    isLoading,
  }
}
