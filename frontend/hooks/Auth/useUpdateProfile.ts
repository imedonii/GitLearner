import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '../queryKeys'
import { axiosInstance } from '@/api'

export interface UpdateProfileData {
  firstName?: string
  lastName?: string
  email?: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

export interface UserProgress {
  completedLessons: number
  totalLessons: number
  percentage: number
  recentCompletions: {
    lessonId: string
    lessonTitle: string
    completedAt: string
  }[]
}

export interface ProgressResponse {
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    level: {
      id: string
      name: string
      slug: string
    } | null
  }
  progress: UserProgress
}

async function updateProfile(data: UpdateProfileData) {
  const response = await axiosInstance.patch('auth/profile', data)
  return response.data
}

async function changePassword(data: ChangePasswordData) {
  const response = await axiosInstance.post('auth/change-password', data)
  return response.data
}

async function getUserProgress(): Promise<ProgressResponse> {
  const response = await axiosInstance.get('auth/progress')
  return response.data
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  const { mutateAsync: updateProfileMutation, isPending: isUpdatingProfile } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user] })
    },
  })

  const { mutateAsync: changePasswordMutation, isPending: isChangingPassword } = useMutation({
    mutationFn: changePassword,
  })

  return {
    updateProfile: updateProfileMutation,
    changePassword: changePasswordMutation,
    isUpdatingProfile,
    isChangingPassword,
  }
}

export function useUserProgress() {
  const { data, isLoading, error, refetch } = useQuery<ProgressResponse>({
    queryKey: [QUERY_KEY.user, 'progress'],
    queryFn: getUserProgress,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  })

  return {
    progress: data?.progress ?? null,
    user: data?.user ?? null,
    isLoading,
    error,
    refetch,
  }
}
