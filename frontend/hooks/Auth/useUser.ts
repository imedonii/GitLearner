import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '../queryKeys'
import { axiosInstance } from '@/api'

export interface UserLevel {
  id: string
  name: string
  slug: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  levelId: string | null
  level: UserLevel | null
  subscribed: boolean
}

interface useUserProps {
  user: User | null
  isLoading: boolean
}

// Maps backend level slugs to frontend config keys
export const levelSlugToKey = (
  slug: string | null | undefined
): 'newbie' | 'beginner' | 'mid' | 'pro' => {
  const mapping: Record<string, 'newbie' | 'beginner' | 'mid' | 'pro'> = {
    newbie: 'newbie',
    beginner: 'beginner',
    mid: 'mid',
    pro: 'pro',
  }
  return mapping[slug || ''] || 'newbie'
}

async function getUser(): Promise<User | null> {
  try {
    const response = await axiosInstance.get('auth/me', {
      withCredentials: true,
    })
    return response.data.user
  } catch {
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
