<script setup lang="ts">
import PostList from './components/PostList.vue'
import ThemeLayout from './ThemeLayout.vue'
import CardTags from './components/CardTags.vue'
import CommonFooter from './components/CommonFooter.vue'
import { useRoute } from 'vue-router'
import { usePages } from '../hooks'
import { computed, ref, watch } from 'vue'
import type { ThemePageData } from '../../node'
const pages = usePages()
const route = useRoute()
const tag = computed(() => {
  return route.query.tag
})

const tagPages = ref<ThemePageData[]>(pages)

const getTagPages = (): void => {
  if (tag.value === 'all') {
    tagPages.value = pages
  } else {
    tagPages.value = pages.filter((item) => {
      return item.frontmatter.tags?.includes(tag.value as string)
    })
  }
}

getTagPages()

watch(tag, () => {
  getTagPages()
})
</script>
<template>
  <ThemeLayout>
    <template #aside>
      <div class="theme-aside">
        <CardTags all :pages="pages" />
      </div>
    </template>
    <template #default>
      <div class="current-tag">
        <span class="label">标签: </span>
        <span class="tag">
          {{ tag }}
        </span>
      </div>
      <PostList :pages="tagPages" />
    </template>
    <template #footer>
      <CommonFooter />
    </template>
  </ThemeLayout>
</template>
