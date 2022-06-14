<script setup lang="ts">
import { computed } from 'vue'
import { useLayout } from '../hooks'
import HomeLayout from './HomeLayout.vue'
import CategoriesLayout from './CategoriesLayout.vue'
import TagsLayout from './TagsLayout.vue'
import SearchLayout from './SearchLayout.vue'
import PostLayout from './PostLayout.vue'
import PostsLayout from './PostsLayout.vue'
import Header from '../components/Header.vue'
const layout = useLayout()

const map = {
  HomeLayout,
  CategoriesLayout,
  TagsLayout,
  SearchLayout,
  PostLayout,
  PostsLayout,
}

const currentLayout = computed(() => map[layout.value])
</script>
<template>
  <Header />
  <Component :is="currentLayout" />
</template>
