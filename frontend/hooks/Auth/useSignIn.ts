import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { QUERY_KEY } from '../queryKeys'
import { User } from './useUser'
import { axiosInstance } from '../../api/index'
import { useRouter } from 'next/navigation'
import type { AxiosError } from 'axios'

type useSignInType = UseMutateFunction<
  User,
  unknown,
  {
    email: string
    password: string
  },
  unknown
>

async function signIn(email: string, password: string): Promise<User> {
  const response = await axiosInstance.post('auth/signin', {
    email,
    password,
  })
  return response.data
}

export function useSignIn(): {
  signInMutation: useSignInType
  isPending: boolean
  error: Error | null
} {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    mutate: signInMutation,
    isPending,
    error,
  } = useMutation<User, Error, { email: string; password: string }, unknown>({
    mutationFn: ({ email, password }) => signIn(email, password),
    onSuccess: (data) => {
      console.log('✅ LOGIN SUCCESS', data)
      queryClient.setQueryData([QUERY_KEY.user], data)
      router.push('/learning-path')
    },
    onError: (error) => {
      console.error('Sign in failed:', error)
    },
  })

  return { signInMutation, isPending, error }
}
