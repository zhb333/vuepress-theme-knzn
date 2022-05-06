<script setup lang="ts">
import PostList from './components/PostList.vue'
import ThemeLayout from './ThemeLayout.vue'
import CardCategories from './components/CardCategories.vue'
import CommonFooter from './components/CommonFooter.vue'
import { useRoute } from 'vue-router'
import { usePages } from '../hooks'
import { computed, ref, watch } from 'vue'
import type { ThemePageData } from '../../node'
const pages = usePages()
const route = useRoute()
const category = computed(() => {
  return route.query.category
})

const categoryPages = ref<ThemePageData[]>(pages)

const getTagPages = (): void => {
  if (category.value === 'all') {
    categoryPages.value = pages
  } else {
    categoryPages.value = pages.filter((item) => {
      return item.frontmatter.categories?.includes(category.value as string)
    })
  }
}

getTagPages()

watch(category, () => {
  getTagPages()
})
</script>
<template>
  <ThemeLayout>
    <template #aside>
      <div class="theme-aside">
        <CardCategories all :pages="pages" />
      </div>
    </template>
    <template #default>
      <div class="current-tag">
        <span class="label">分类: </span>
        <span class="tag">
          {{ category }}
        </span>
      </div>
      <PostList :pages="categoryPages" />
    </template>
    <template #footer>
      <CommonFooter />
    </template>
  </ThemeLayout>
</template>
