<template>
  <v-dialog v-model="showCommentDialog" max-width="500">
    <template #default>
      <v-card>
        <v-card-title>Ajouter un commentaire</v-card-title>
        <v-card-text>
          <CommentForm @submit="emits('submit', $event)" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="emits('update:showCommentDialog', false)">Annuler</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import CommentForm from '@/components/domain/Movie/CommentForm.vue'
import type { Comment } from '@/types/api'
const showCommentDialog = defineModel<boolean>()
const emits = defineEmits<{
  (e: 'update:showCommentDialog', value: boolean): void
  (e: 'submit', value: Comment): void
}>()
</script>
