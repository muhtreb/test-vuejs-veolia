<template>
  <div class="MovieDetail">
    <h1 class="MovieDetail__title">{{ movie.title }}</h1>
    <v-row class="my-4">
      <v-col cols="12" md="4">
        <v-img :src="movie.picture" max-width="300" max-height="400" cover></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <ul class="MovieDetail__info">
          <li class="MovieDetail__info-item"><b>Genre:</b> {{ movie.genre }}</li>
          <li class="MovieDetail__info-item">
            <b>Auteur:</b> {{ movie.author.firstName }} {{ movie.author.lastName }} ({{
              movie.author.age
            }})
          </li>
          <li class="MovieDetail__info-item">
            <b>Date de sortie:</b> {{ formatDate(movie.releaseDate) }}
          </li>
          <li class="MovieDetail__info-item"><b>Description:</b> {{ movie.description }}</li>
        </ul>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { type Movie } from '@/types/api'
import { useDateUtils } from '@/composables/dateUtils'
const { formatDate } = useDateUtils()

const { movie } = defineProps<{
  movie: Movie
}>()
</script>

<style scoped lang="scss">
.MovieDetail {
  &__title {
    font-size: 2rem;
    font-weight: bold;
  }

  &__info {
    list-style: none;
    padding: 0;

    &-item {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
