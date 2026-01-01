import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
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
    fullname: string
    email: string
    password: string
  },
  unknown
>

async function signUp(payload: {
  fullname: string
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
  const navigate = useNavigate()

  const {
    mutate: signUpMutation,
    isPending,
    error,
  } = useMutation<
    registrationResponse,
    Error,
    {
      fullname: string
      email: string
      password: string
    },
    unknown
  >({
    mutationFn: (vars) => signUp(vars),
    onSuccess: (data, variables) => {
      localStorage.setItem('pending_verify_email', variables.email)
      queryClient.removeQueries({ queryKey: [QUERY_KEY.user] })
      navigate('/auth/email-verification')
    },
    onError: () => {
      error
    },
  })

  return { signUpMutation, isPending, error }
}
