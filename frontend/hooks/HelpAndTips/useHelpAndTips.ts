import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '../queryKeys'
import { axiosInstance } from '@/api'

export interface GitCommandCategory {
  id: string
  name: string
  label: string
  icon: string
  createdAt: string
  updatedAt: string
}

export interface GitCommand {
  id: string
  name: string
  syntax: string
  description: string
  whenToUse: string
  example: string
  categoryId: string
  category: GitCommandCategory
  isCommon: boolean
  createdAt: string
  updatedAt: string
}

export interface Tip {
  id: string
  type: 'warning' | 'pro' | 'do' | 'dont'
  title: string
  description: string
  createdAt: string
  updatedAt: string
}

interface UseHelpAndTipsReturn {
  categories: GitCommandCategory[] | undefined
  commands: GitCommand[] | undefined
  tips: Tip[] | undefined
  commonCommands: GitCommand[] | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
}

// Fetch categories
async function fetchCategories(): Promise<GitCommandCategory[]> {
  try {
    const response = await axiosInstance.get<GitCommandCategory[]>(
      'help-and-tips/categories'
    )
    return response.data
  } catch (error) {
    console.error('Error fetching help and tips categories:', error)
    throw error
  }
}

// Fetch commands
async function fetchCommands(): Promise<GitCommand[]> {
  try {
    const response = await axiosInstance.get<GitCommand[]>(
      'help-and-tips/commands'
    )
    return response.data
  } catch (error) {
    console.error('Error fetching help and tips commands:', error)
    throw error
  }
}

// Fetch tips
async function fetchTips(): Promise<Tip[]> {
  try {
    const response = await axiosInstance.get<Tip[]>('help-and-tips/tips')
    return response.data
  } catch (error) {
    console.error('Error fetching help and tips tips:', error)
    throw error
  }
}

// Fetch common commands
async function fetchCommonCommands(): Promise<GitCommand[]> {
  try {
    const response = await axiosInstance.get<GitCommand[]>(
      'help-and-tips/commands/common'
    )
    return response.data
  } catch (error) {
    console.error('Error fetching common commands:', error)
    throw error
  }
}

export function useHelpAndTips(): UseHelpAndTipsReturn {
  // Fetch categories
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
    error: categoriesError,
  } = useQuery<GitCommandCategory[], Error>({
    queryKey: [QUERY_KEY.helpAndTips.categories],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  })

  // Fetch commands
  const {
    data: commands,
    isLoading: isLoadingCommands,
    isError: isCommandsError,
    error: commandsError,
  } = useQuery<GitCommand[], Error>({
    queryKey: [QUERY_KEY.helpAndTips.commands],
    queryFn: fetchCommands,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  // Fetch tips
  const {
    data: tips,
    isLoading: isLoadingTips,
    isError: isTipsError,
    error: tipsError,
  } = useQuery<Tip[], Error>({
    queryKey: [QUERY_KEY.helpAndTips.tips],
    queryFn: fetchTips,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  // Fetch common commands
  const {
    data: commonCommands,
    isLoading: isLoadingCommon,
    isError: isCommonError,
    error: commonError,
  } = useQuery<GitCommand[], Error>({
    queryKey: [QUERY_KEY.helpAndTips.commonCommands],
    queryFn: fetchCommonCommands,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  return {
    categories,
    commands,
    tips,
    commonCommands,
    isLoading:
      isLoadingCategories ||
      isLoadingCommands ||
      isLoadingTips ||
      isLoadingCommon,
    isError:
      isCategoriesError || isCommandsError || isTipsError || isCommonError,
    error: categoriesError || commandsError || tipsError || commonError || null,
  }
}
