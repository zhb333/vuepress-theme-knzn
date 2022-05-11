<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import BackToTop from '../components/BackToTop.vue'
import { usePageData } from '@vuepress/client'
const pageData = usePageData()
</script>
<template>
  <Header />
  <main class="theme-container theme-common-container">
    <div class="theme-content">
      <!-- 文章内容 -->
      <div class="theme-wrapper markdown-body">
        <Content :page-key="pageData.key" />
      </div>
    </div>
  </main>
  <Footer />
  <BackToTop />
</template>
