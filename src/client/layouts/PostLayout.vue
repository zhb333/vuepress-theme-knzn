<script setup lang="ts">
import Header from '../components/Header.vue'
import PostAside from '../components/PostAside.vue'
import CardTocs from '../components/CardTocs.vue'
import BackToTop from '../components/BackToTop.vue'
import PostInfo from '../components/PostInfo.vue'
import Footer from '../components/Footer.vue'
import { usePageData } from '@vuepress/client'
import GiscusComment from '../components/GiscusComment.vue'
import type { ThemePageData } from '../../node'
import type { Ref } from 'vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const pageData = usePageData() as Ref<ThemePageData>

const isAsideShow = ref(false)
const isTocsShow = ref(false)

const handleAside = (): void => {
  isAsideShow.value = !isAsideShow.value
}

const handleTocs = (): void => {
  isTocsShow.value = !isTocsShow.value
}

const handleContainerClick = (): void => {
  if (isAsideShow.value) {
    isAsideShow.value = false
  }
  if (isTocsShow.value) {
    isTocsShow.value = false
  }
}

onMounted(() => {
  document
    .querySelector('.theme-container')
    ?.addEventListener('click', handleContainerClick, false)
})

onBeforeUnmount(() => {
  document
    .querySelector('.theme-container')
    ?.removeEventListener('click', handleContainerClick, false)
})
</script>
<template>
  <Header />
  <main class="theme-container theme-post-container">
    <PostAside :class="{ active: isAsideShow }" />
    <div class="theme-content post-container">
      <!-- 文章内容 -->
      <div class="post-wrapper">
        <i class="iconfont icon-book toc-btn" @click.stop="handleTocs"></i>
        <i class="iconfont icon-menu aside-btn" @click.stop="handleAside"></i>
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

      <CardTocs
        v-if="pageData.headers.length"
        :class="{ active: isTocsShow }"
      />
    </div>
  </main>
  <Footer class="theme-common-footer" />
  <BackToTop />
</template>
