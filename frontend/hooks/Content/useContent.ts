import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '../queryKeys'
import { axiosInstance } from '@/api'

// Types
export interface FAQ {
  id: string
  question: string
  answer: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Achievement {
  id: string
  slug: string
  title: string
  description: string
  icon: 'trophy' | 'star' | 'zap' | 'award' | 'target' | 'rocket'
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface UserAchievement {
  id: string
  userId: string
  achievementId: string
  unlockedAt: string
}

export interface Benefit {
  id: string
  title: string
  description: string
  icon: string
  color: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Audience {
  id: string
  title: string
  description: string
  emoji: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface PlaygroundFeature {
  id: string
  text: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CheatSheetCommand {
  id: string
  command: string
  syntax: string
  description: string
  example: string
  notes?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  sectionId: string
  order: number
}

export interface CheatSheetSection {
  id: string
  slug: string
  title: string
  order: number
  isActive: boolean
  commands: CheatSheetCommand[]
  createdAt: string
  updatedAt: string
}

export interface LevelWithStyling {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  bgColor?: string
  borderColor?: string
  emoji?: string
  icon?: string
  order: number
  isPaid: boolean
}

// API Functions
async function fetchFAQs(): Promise<FAQ[]> {
  const response = await axiosInstance.get<FAQ[]>('content/faqs')
  return response.data
}

async function fetchAchievements(): Promise<Achievement[]> {
  const response = await axiosInstance.get<Achievement[]>('content/achievements')
  return response.data
}

async function fetchUserAchievements(userId: string): Promise<UserAchievement[]> {
  const response = await axiosInstance.get<UserAchievement[]>(
    `content/achievements/user/${userId}`
  )
  return response.data
}

async function fetchBenefits(): Promise<Benefit[]> {
  const response = await axiosInstance.get<Benefit[]>('content/benefits')
  return response.data
}

async function fetchAudiences(): Promise<Audience[]> {
  const response = await axiosInstance.get<Audience[]>('content/audiences')
  return response.data
}

async function fetchPlaygroundFeatures(): Promise<PlaygroundFeature[]> {
  const response = await axiosInstance.get<PlaygroundFeature[]>(
    'content/playground-features'
  )
  return response.data
}

async function fetchCheatSheet(): Promise<CheatSheetSection[]> {
  const response = await axiosInstance.get<CheatSheetSection[]>(
    'content/cheat-sheet'
  )
  return response.data
}

async function fetchLevelsWithStyling(): Promise<LevelWithStyling[]> {
  const response = await axiosInstance.get<LevelWithStyling[]>('content/levels')
  return response.data
}

// Hooks
export function useFAQs() {
  return useQuery<FAQ[], Error>({
    queryKey: [QUERY_KEY.content.faqs],
    queryFn: fetchFAQs,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useAchievements() {
  return useQuery<Achievement[], Error>({
    queryKey: [QUERY_KEY.content.achievements],
    queryFn: fetchAchievements,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useUserAchievements(userId?: string) {
  return useQuery<UserAchievement[], Error>({
    queryKey: [QUERY_KEY.content.userAchievements, userId],
    queryFn: () => fetchUserAchievements(userId!),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useUnlockAchievement() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      userId,
      achievementId,
    }: {
      userId: string
      achievementId: string
    }) => {
      const response = await axiosInstance.post('content/achievements/unlock', {
        userId,
        achievementId,
      })
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.content.userAchievements, variables.userId],
      })
    },
  })
}

export function useBenefits() {
  return useQuery<Benefit[], Error>({
    queryKey: [QUERY_KEY.content.benefits],
    queryFn: fetchBenefits,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useAudiences() {
  return useQuery<Audience[], Error>({
    queryKey: [QUERY_KEY.content.audiences],
    queryFn: fetchAudiences,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function usePlaygroundFeatures() {
  return useQuery<PlaygroundFeature[], Error>({
    queryKey: [QUERY_KEY.content.playgroundFeatures],
    queryFn: fetchPlaygroundFeatures,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useCheatSheet() {
  return useQuery<CheatSheetSection[], Error>({
    queryKey: [QUERY_KEY.content.cheatSheet],
    queryFn: fetchCheatSheet,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useLevelsWithStyling() {
  return useQuery<LevelWithStyling[], Error>({
    queryKey: [QUERY_KEY.content.levelsWithStyling],
    queryFn: fetchLevelsWithStyling,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
