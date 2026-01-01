import axios, { AxiosError, AxiosResponse } from 'axios'
import { ResponseError } from '../app/Errors/ResponseError'

// Normalize base URL to always include '/api' prefix
;(() => {
  const raw = (import.meta as any).env?.API_URL || 'http://localhost:3001'
  const base = raw.endsWith('/api') ? raw : `${raw.replace(/\/$/, '')}/api`
  axios.defaults.baseURL = base
})()
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use((request) => {
  if (request.headers) {
    const token = localStorage.getItem('token')
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`
    }
  }
  return request
})

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (axios.isAxiosError(error) && error.response) {
      interface ErrorResponseData {
        error?: string
        message?: string
      }

      const responseData = error.response.data as ErrorResponseData
      const customMessage =
        responseData.error || responseData.message || 'An error occurred'

      return Promise.reject(
        new ResponseError(customMessage, error.response as AxiosResponse)
      )
    }

    // For non-Axios errors
    return Promise.reject(error)
  }
)

export const axiosInstance = axios
