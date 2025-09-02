<template>
  <v-data-table :headers="headers" :items="comments || []" :items-per-page="5" class="elevation-1">
    <template #item.rating="{ item }">
      <v-rating v-model="item.rating" color="amber" dense readonly size="small" />
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { type Comment } from '@/types/api'

const headers = [
  { title: 'Utilisateur', value: 'username' },
  { title: 'Note', value: 'rating' },
  { title: 'Commentaire', value: 'text' },
]
const { comments } = defineProps<{
  comments: Comment[]
}>()
</script>
