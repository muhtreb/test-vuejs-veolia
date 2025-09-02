<script setup lang="ts">
import { onMounted } from 'vue'
import { useMoviesStore } from './stores/movies'

onMounted(async () => {
  const moviesStore = useMoviesStore()
  await moviesStore.loadMovies()
})
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark elevation="4" rounded>
      <v-row align="center" class="w-100">
        <v-col cols="auto">
          <v-img src="/favicon.ico" alt="Logo" max-width="40" class="mr-2" />
        </v-col>
        <v-col>
          <v-toolbar-title class="font-weight-bold text-h5">Test VueJS</v-toolbar-title>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-btn icon="mdi-home" :to="{ name: 'home' }" variant="text" color="white" />
          <v-btn icon="mdi-movie" :to="{ name: 'movies' }" variant="text" color="white" />
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container class="py-8">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-toolbar-title {
  font-family: 'Montserrat', 'Roboto', sans-serif;
}
</style>
