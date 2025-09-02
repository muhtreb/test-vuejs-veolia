<template>
  <div>
    <h1>Liste des films</h1>
    <v-data-table :headers="headers" :items="movies || []" :items-per-page="5" class="elevation-1">
      <template #item.releaseDate="{ item }">
        {{ formatDate(item.releaseDate) }}
      </template>
      <template #item.picture="{ item }">
        <v-img :src="item.picture" max-width="80" max-height="80" cover></v-img>
      </template>
      <template #item.actions="{ item }">
        <v-btn color="primary" @click="goToMovie(item.id)" icon>
          <v-icon>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMoviesStore } from '@/stores/movies'
import { useRouter } from 'vue-router'

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Titre', value: 'title' },
  { title: 'Genre', value: 'genre' },
  { title: 'Date de sortie', value: 'releaseDate' },
  { title: 'Image', value: 'picture' },
  { title: 'Description', value: 'description' },
  { title: '', value: 'actions', sortable: false },
]

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString()
}

const moviesStore = useMoviesStore()
const { movies } = storeToRefs(moviesStore)
const router = useRouter()

function goToMovie(id: number) {
  router.push({ name: 'movie', params: { id } })
}
</script>
