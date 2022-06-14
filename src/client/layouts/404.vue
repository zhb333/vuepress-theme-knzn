<script setup lang="ts">
import { useLayout } from '../hooks'
import PostsLayout from './PostsLayout.vue'
import Header from '../components/Header.vue'
const layout = useLayout()
console.log(layout.value)
</script>
<template>
  <Header />
  <PostsLayout v-if="layout === 'PostsLayout'" />
  <div v-else class="not-found">404</div>
</template>
