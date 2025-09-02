<template>
  <v-breadcrumbs :items="breadcrumbs" class="mb-4" />
  <div v-if="movie">
    <MovieDetail :movie="movie" />
    <h2>Commentaires</h2>
    <v-btn color="primary" class="mb-4" @click="showCommentDialog = true">
      Ajouter un commentaire
    </v-btn>
    <AddCommentModal
      v-model="showCommentDialog"
      @update:showCommentDialog="showCommentDialog = $event"
      @submit="onCommentSubmit"
    />
    <div v-if="commentsLoading">Chargement des commentaires...</div>
    <div v-else-if="commentsError">Erreur lors du chargement des commentaires.</div>
    <div v-else>
      <CommentsList :comments="movieComments || []" />
    </div>
  </div>
  <div v-else>
    <h1>Film non trouvé</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import { useRoute } from 'vue-router'
import { createMovieComment } from '@/service/apiClient'
import type { Comment } from '@/types/api'
import CommentsList from '@/components/domain/Movie/CommentsList.vue'
import MovieDetail from '@/components/domain/Movie/MovieDetail.vue'
import { storeToRefs } from 'pinia'
import AddCommentModal from '@/components/domain/Movie/AddCommentModal.vue'

const showCommentDialog = ref(false)
const commentsLoading = ref(false)
const commentsError = ref(false)

const route = useRoute()
const movieIdParam = route.params.id
const movieId = Array.isArray(movieIdParam) ? Number(movieIdParam[0]) : Number(movieIdParam)

const moviesStore = useMoviesStore()
const movie = computed(() => moviesStore.getMovieById(movieId))
const { movieComments } = storeToRefs(moviesStore)

const breadcrumbs = computed(() => [
  { title: 'Films', to: { name: 'home' } },
  movie.value ? { title: movie.value.title, disabled: true } : { title: 'Film', disabled: true },
])

async function loadComments() {
  commentsLoading.value = true
  commentsError.value = false
  try {
    await moviesStore.loadMovieComments(movieId)
  } catch (e) {
    commentsError.value = true
  } finally {
    commentsLoading.value = false
  }
}

onMounted(() => {
  if (!moviesStore.movies) {
    moviesStore.loadMovies()
  }
  loadComments()
})

async function handleAddComment(comment: Comment) {
  try {
    await createMovieComment(movieId, comment)
    moviesStore.addComment(comment)
  } catch (e) {
    // Optionally handle error (toast, etc)

    console.error("Erreur lors de l'ajout du commentaire", e)
  }
}

async function onCommentSubmit(comment: Comment) {
  await handleAddComment(comment)
  showCommentDialog.value = false
}
</script>
