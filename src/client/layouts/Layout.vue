<script setup lang="ts">
import { computed } from 'vue'
import { useLayout } from '../hooks'
import HomeLayout from './HomeLayout.vue'
import CategoriesLayout from './CategoriesLayout.vue'
const layout = useLayout()

const map = {
  HomeLayout,
  CategoriesLayout,
}

const currentLayout = computed(() => map[layout.value])
</script>
<template>
  <Component :is="currentLayout" />
</template>
