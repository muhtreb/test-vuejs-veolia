import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getMovieComments, getMovies } from '@/service/apiClient'
import type { Movie, Comment } from '@/types/api'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[] | null>(null)
  const movieComments = ref<Comment[]>([])
  const moviesLoaded = ref(false)

  const getMovieById = computed(() => (id: number) => {
    return movies.value?.find((movie) => movie.id === id) || null
  })

  async function loadMovies() {
    if (!moviesLoaded.value) {
      movies.value = await getMovies()
      moviesLoaded.value = true
    }
  }

  async function loadMovieComments(id: number) {
    movieComments.value = await getMovieComments(id)
  }

  function addComment(comment: Comment) {
    movieComments.value.unshift(comment)
  }

  return {
    movies,
    movieComments,
    moviesLoaded,
    getMovieById,
    loadMovies,
    loadMovieComments,
    addComment,
  }
})
