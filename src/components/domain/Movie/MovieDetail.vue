<template>
  <div>
    <h1>{{ movie.title }}</h1>
    <v-row class="my-4">
      <v-col cols="12" md="4">
        <v-img :src="movie.picture" max-width="300" max-height="400" cover></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <p><strong>Genre:</strong> {{ movie.genre }}</p>
        <p>
          <strong>Auteur:</strong> {{ movie.author.firstName }} {{ movie.author.lastName }} ({{
            movie.author.age
          }}
          ans)
        </p>
        <p><strong>Date de sortie:</strong> {{ formatDate(movie.releaseDate) }}</p>
        <p><strong>Description:</strong> {{ movie.description }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { type Movie } from '@/types/api'

const { movie } = defineProps<{
  movie: Movie
}>()

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString()
}
</script>
