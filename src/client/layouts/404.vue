<script setup lang="ts">
import { useLayout } from '../hooks'
import PostsLayout from './PostsLayout.vue'
const layout = useLayout()
</script>
<template>
  <PostsLayout v-if="layout === 'PostsLayout'" />
  <div v-else class="not-found">404</div>
</template>
