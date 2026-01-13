import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { QUERY_KEY } from '../queryKeys'
import { axiosInstance } from '@/api'

type registrationResponse = {
  token: string
  error?: string
  message?: string
}

type useSignUpProps = UseMutateFunction<
  registrationResponse,
  unknown,
  {
    fullName: string
    email: string
    password: string
  },
  unknown
>

async function signUp(payload: {
  fullName: string
  email: string
  password: string
}): Promise<registrationResponse> {
  const response = await axiosInstance.post('auth/register', payload)

  return response.data
}

export function useSignUp(): {
  signUpMutation: useSignUpProps
  isPending: boolean
  error: Error | null
} {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    mutate: signUpMutation,
    isPending,
    error,
  } = useMutation<
    registrationResponse,
    Error,
    {
      fullName: string
      email: string
      password: string
    },
    unknown
  >({
    mutationFn: (vars) => signUp(vars),
    onSuccess: (data, variables) => {
      localStorage.setItem('pending_verify_email', variables.email)
      queryClient.removeQueries({ queryKey: [QUERY_KEY.user] })
      router.push(`/auth/email-verification?email=${encodeURIComponent(variables.email)}`)
    },
    onError: () => {
      error
    },
  })

  return { signUpMutation, isPending, error }
}
