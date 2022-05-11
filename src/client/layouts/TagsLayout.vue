<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import CardCategories from '../components/CardCategories.vue'
import PostList from '../components/PostList.vue'
import BackToTop from '../components/BackToTop.vue'
import Pagination from '../components/Pagination.vue'
import { usePages, useThemeOptions } from '../hooks'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { ThemePageData } from '../../node'
const themeOptions = useThemeOptions()
const pages = usePages()
const route = useRoute()
const PostListRef = ref(null)
const category = computed(() => {
  return route.query.category
})

const categoryPages = ref<ThemePageData[]>(pages)

const getCategoryPages = (): void => {
  if (category.value === 'all') {
    categoryPages.value = pages
  } else {
    categoryPages.value = pages.filter((item) => {
      return item.frontmatter.categories?.includes(category.value as string)
    })
  }
}

getCategoryPages()

const perPage = themeOptions.value.perPage || 10
const page = ref(1)
const total = ref(categoryPages.value.length)

watch(category, () => {
  page.value = 1
  getCategoryPages()
  total.value = categoryPages.value.length
})

const pageList = computed(() => {
  const skip = (page.value - 1) * perPage
  return categoryPages.value.slice(skip, skip + perPage)
})

const handlePageChange = (num): void => {
  page.value = num
}
</script>
<template>
  <Header />
  <main class="theme-container theme-common-container">
    <div class="theme-content">
      <aside class="theme-aside">
        <CardCategories all :pages="pages" />
      </aside>
      <!-- 文章列表 -->
      <div class="theme-wrapper">
        <PostList ref="PostListRef" :pages="pageList" />
        <Pagination
          v-show="categoryPages.length > perPage"
          :per-page="perPage"
          :page="page"
          :total="total"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </main>
  <Footer />
  <BackToTop />
</template>
