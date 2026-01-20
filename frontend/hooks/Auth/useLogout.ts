import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { QUERY_KEY } from '../queryKeys'
import { axiosInstance } from '@/api'

async function logout(): Promise<void> {
  await axiosInstance.post('auth/logout')
}

export function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEY.user] })
      queryClient.clear()
      router.push('/auth/signin')
    },
    onError: (error) => {
      console.error('Logout failed:', error)
      queryClient.removeQueries({ queryKey: [QUERY_KEY.user] })
      queryClient.clear()
      router.push('/auth/signin')
    },
  })

  return { logout: logoutMutation, isPending }
}
