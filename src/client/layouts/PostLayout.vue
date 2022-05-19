<script setup lang="ts">
import Header from '../components/Header.vue'
import PostAside from '../components/PostAside.vue'
import CardTocs from '../components/CardTocs.vue'
import BackToTop from '../components/BackToTop.vue'
import PostInfo from '../components/PostInfo.vue'
import { usePageData } from '@vuepress/client'
import GiscusComment from '../components/GiscusComment.vue'
import type { ThemePageData } from '../../node'
import type { Ref } from 'vue'

const pageData = usePageData() as Ref<ThemePageData>
</script>
<template>
  <Header />
  <main class="theme-container theme-post-container">
    <PostAside />
    <div class="theme-content post-container">
      <!-- 文章内容 -->
      <div class="post-wrapper">
        <i class="iconfont icon-categorynormal aside-btn"></i>
        <i class="iconfont icon-book toc-btn"></i>
        <div class="markdown-body">
          <h1 class="post-title">
            <span>{{ pageData.title }}</span>
          </h1>
          <PostInfo :post="pageData" />
          <Content :page-key="pageData.key" />
        </div>

        <div class="theme-divider"></div>
        <div class="giscus-comment">
          <GiscusComment />
        </div>
      </div>

      <CardTocs v-if="pageData.headers.length" />
    </div>
  </main>
  <BackToTop />
</template>
