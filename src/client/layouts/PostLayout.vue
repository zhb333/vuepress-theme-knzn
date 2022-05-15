<script setup lang="ts">
import Header from '../components/Header.vue'
import PostAside from '../components/PostAside.vue'
import CardTocs from '../components/CardTocs.vue'
import BackToTop from '../components/BackToTop.vue'
import { usePageData } from '@vuepress/client'
import Giscus from '@giscus/vue'
import { useDarkMode, useThemeOptions } from '../hooks'

const isDarkMode = useDarkMode()
const pageData = usePageData()
const themeOptions = useThemeOptions()
const { comment } = themeOptions.value
console.log(comment)
</script>
<template>
  <Header />
  <main class="theme-container theme-post-container">
    <PostAside />
    <div class="theme-content post-container">
      <!-- 文章内容 -->
      <div class="markdown-body">
        <Content :page-key="pageData.key" />
        <div class="theme-divider"></div>
        <Giscus
          v-if="comment"
          id="comments"
          :repo="comment.repo"
          :repo-id="comment.repoId"
          :category="comment.category"
          :category-id="comment.categoryId"
          :lang="comment.lang"
          loading="lazy"
          mapping="pathname"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="bottom"
          :theme="isDarkMode ? 'dark' : 'light'"
          crossorigin="anonymous"
        />
      </div>

      <CardTocs v-if="pageData.headers.length" />
    </div>
  </main>
  <BackToTop />
</template>
