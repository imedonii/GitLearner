import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '../queryKeys'
import { axiosInstance } from '@/api'

export interface Lesson {
  id: string
  slug: string
  title: string
  description: string
  explanation: string
  exampleCommand: string
  hint: string
  objective: string
  levelId: string
  order: number
  createdAt: string
  updatedAt: string
  completed: boolean
  locked: boolean
}

interface UseLessonsReturn {
  lessons: Lesson[] | undefined
  lesson: Lesson | undefined
  isLoading: boolean
  isError: boolean
  error: Error | null
  createLesson: (
    data: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<Lesson>
  updateLesson: (id: string, data: Partial<Lesson>) => Promise<Lesson>
  deleteLesson: (id: string) => Promise<void>
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
}

// Fetch all lessons with progress
async function fetchLessons(): Promise<Lesson[]> {
  try {
    const response = await axiosInstance.get<Lesson[]>('leasons/my-progress')
    const data = response.data
    if (!Array.isArray(data)) {
      console.error('API did not return an array:', data)
      return []
    }
    return data
  } catch (error) {
    console.error('Error fetching lessons:', error)
    return []
  }
}

// Fetch a single lesson by ID
async function fetchLessonById(id: string): Promise<Lesson> {
  try {
    const response = await axiosInstance.get<Lesson>(`leasons/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching lesson ${id}:`, error)
    throw error
  }
}

// Create a new lesson
async function createLesson(
  data: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Lesson> {
  try {
    const response = await axiosInstance.post<Lesson>('leasons', data)
    return response.data
  } catch (error) {
    console.error('Error creating lesson:', error)
    throw error
  }
}

// Update an existing lesson
async function updateLesson({
  id,
  ...data
}: { id: string } & Partial<Lesson>): Promise<Lesson> {
  try {
    const response = await axiosInstance.patch<Lesson>(`leasons/${id}`, data)
    return response.data
  } catch (error) {
    console.error(`Error updating lesson ${id}:`, error)
    throw error
  }
}

// Delete a lesson
async function deleteLessonById(id: string): Promise<void> {
  try {
    await axiosInstance.delete(`leasons/${id}`)
  } catch (error) {
    console.error(`Error deleting lesson ${id}:`, error)
    throw error
  }
}

export function useLessons(lessonId?: string): UseLessonsReturn {
  const queryClient = useQueryClient()

  // Fetch all lessons
  const {
    data: lessons,
    isLoading: isLoadingList,
    isError: isListError,
    error: listError,
  } = useQuery<Lesson[], Error>({
    queryKey: [QUERY_KEY.lessons],
    queryFn: fetchLessons,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  // Fetch single lesson if ID is provided
  const {
    data: lesson,
    isLoading: isLoadingSingle,
    isError: isSingleError,
    error: singleError,
  } = useQuery<Lesson, Error>({
    queryKey: [QUERY_KEY.lessons, lessonId],
    queryFn: () => fetchLessonById(String(lessonId)),
    enabled: !!lessonId,
    staleTime: 5 * 60 * 1000,
  })

  // Create mutation
  const { mutateAsync: create, isPending: isCreating } = useMutation<
    Lesson,
    Error,
    Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>
  >({
    mutationFn: createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lessons] })
    },
  })

  // Update mutation
  const { mutateAsync: update, isPending: isUpdating } = useMutation<
    Lesson,
    Error,
    { id: string } & Partial<Lesson>
  >({
    mutationFn: updateLesson,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lessons] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lessons, data.id] })
    },
  })

  // Delete mutation
  const { mutateAsync: deleteLesson, isPending: isDeleting } = useMutation<
    void,
    Error,
    string
  >({
    mutationFn: deleteLessonById,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lessons] })
      queryClient.removeQueries({ queryKey: [QUERY_KEY.lessons, id] })
    },
  })

  return {
    lessons,
    lesson,
    isLoading: isLoadingList || isLoadingSingle,
    isError: isListError || isSingleError,
    error: listError || singleError || null,
    createLesson: create,
    updateLesson: (id: string, data: Partial<Lesson>) =>
      update({ id, ...data }),
    deleteLesson: deleteLesson,
    isCreating,
    isUpdating,
    isDeleting,
  }
}
