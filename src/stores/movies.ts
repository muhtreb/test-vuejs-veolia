import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMovieComments, getMovies } from '@/service/apiClient'
import type { Movie, Comment } from '@/types/api'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref<Movie[] | null>(null)
  const movieComments = ref<Comment[]>([])
  const loaded = ref(false)

  async function loadMovies() {
    if (!loaded.value) {
      movies.value = await getMovies()
      loaded.value = true
    }
  }

  function getMovieById(id: number) {
    return movies.value?.find((movie) => movie.id === id) || null
  }

  async function loadMovieComments(id: number) {
    movieComments.value = await getMovieComments(id)
  }

  function addComment(comment: Comment) {
    movieComments.value.unshift(comment)
  }

  return { movies, movieComments, loaded, loadMovies, getMovieById, loadMovieComments, addComment }
})
