<script setup lang="ts">
import { onMounted } from 'vue'
import { useMoviesStore } from './stores/movies'

onMounted(async () => {
  console.log('app mounted')
  const moviesStore = useMoviesStore()
  await moviesStore.loadMovies()
})
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Test VueJS</v-toolbar-title>
    </v-app-bar>
    <v-container>
      <v-main>
        <router-view />
      </v-main>
    </v-container>
  </v-app>
</template>

<style scoped></style>
