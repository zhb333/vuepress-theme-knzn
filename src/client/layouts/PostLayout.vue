<script setup lang="ts">
import Header from '../components/Header.vue'
import PostAside from '../components/PostAside.vue'
import CardTocs from '../components/CardTocs.vue'
import BackToTop from '../components/BackToTop.vue'
import { usePageData } from '@vuepress/client'
const pageData = usePageData()
</script>
<template>
  <Header />
  <main class="theme-container theme-post-container">
    <PostAside />
    <div class="theme-content post-container">
      <!-- 文章内容 -->
      <div class="markdown-body">
        <Content :page-key="pageData.key" />
      </div>

      <CardTocs v-if="pageData.headers.length" />
    </div>
  </main>
  <BackToTop />
</template>
