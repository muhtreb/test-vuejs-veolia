import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { Movie, Comment } from '@/types/api'

type MoviesResponse = {
  [key: number]: Movie
}

const baseURL = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiRequest = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  data?: any,
): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient({
    method,
    url,
    data,
  })

  return response.data
}

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const response = await apiRequest<MoviesResponse>('/movies', 'GET')
    return Object.values(response)
  } catch (error) {
    console.error('Error fetching movies:', error)
    throw error
  }
}

export const getMovieComments = async (id: number): Promise<Comment[]> => {
  const response = await apiRequest<Comment[]>(`/comments/${id}`, 'GET')
  return response
}

export const createMovieComment = async (id: number, comment: Comment): Promise<Comment> => {
  const response = await apiRequest<Comment>(`/comments/${id}`, 'POST', comment)
  return response
}

export default apiClient
