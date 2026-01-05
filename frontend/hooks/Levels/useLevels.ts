import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '../queryKeys'
import { axiosInstance } from '@/api'

export interface Level {
  id: number
  name: string
  slug: string
}

interface UseLevelsReturn {
  levels: Level[] | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
}

async function fetchLevels(): Promise<Level[]> {
  try {
    const response = await axiosInstance.get<Level[]>('levels')
    return response.data
  } catch (error) {
    console.error('Error fetching levels:', error)
    throw error
  }
}

export function useLevels(): UseLevelsReturn {
  const {
    data: levels,
    isLoading,
    isError,
    error,
  } = useQuery<Level[], Error>({
    queryKey: [QUERY_KEY.levels],
    queryFn: fetchLevels,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  return {
    levels,
    isLoading,
    isError,
    error: error || null,
  }
}
