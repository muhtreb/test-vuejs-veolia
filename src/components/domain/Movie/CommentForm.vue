<template>
  <v-form
    validate-on="submit lazy"
    @submit.prevent="submitComment"
    ref="formRef"
    v-model="formValid"
  >
    <v-text-field
      v-model="username"
      label="Votre nom"
      outlined
      :rules="usernameRules"
      required
      class="mb-2"
    />
    <v-rating
      v-model="rating"
      color="amber"
      background-color="grey lighten-1"
      dense
      :rules="ratingRules"
      required
      class="mb-2"
    />
    <v-textarea
      v-model="commentText"
      label="Votre commentaire"
      outlined
      :rules="commentRules"
      required
      class="mb-2"
    />
    <v-btn type="submit" color="primary">Envoyer</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Comment } from '@/types/api'

const username = ref('')
const rating = ref(0)
const commentText = ref('')
const formRef = ref()
const formValid = ref(true)

const commentRules = [(v: string) => !!v || 'Le commentaire est requis']
const ratingRules = [(v: number) => !!v || 'La note est requise']
const usernameRules = [(v: string) => !!v || 'Le nom est requis']
const emit = defineEmits<{
  (e: 'submit', payload: Comment): void
}>()
const submitComment = async () => {
  const { valid } = await formRef.value?.validate?.()
  if (!valid) return
  emit('submit', {
    username: username.value,
    text: commentText.value,
    rating: rating.value,
  })
  // Reset form
  username.value = ''
  commentText.value = ''
  rating.value = 0
  formRef.value?.resetValidation?.()
}
</script>
