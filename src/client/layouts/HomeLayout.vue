<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import DecorBox from '../components/DecorBox.vue'
import CardAvatar from '../components/CardAvatar.vue'
import CardCategories from '../components/CardCategories.vue'
import CardTags from '../components/CardTags.vue'
import PostList from '../components/PostList.vue'
import BackToTop from '../components/BackToTop.vue'
import Logo from '../components/Logo.vue'
import Medias from '../components/Medias.vue'
import ParticlesBg from '../components/ParticlesBg.vue'
import Pagination from '../components/Pagination.vue'
import { useDarkMode, usePages, useScrollTop, useThemeOptions } from '../hooks'
import { computed, ref } from 'vue'
import { assetScrollToTop } from '../utils'
const themeOptions = useThemeOptions()
const scrollTop = useScrollTop()
const isDarkMode = useDarkMode()
const contianerStyle = computed(() => {
  const { backgroundImage, darkBackgroundImage } = themeOptions.value
  const bgUrl =
    (isDarkMode.value ? darkBackgroundImage : backgroundImage) ||
    backgroundImage
  return {
    'background-image': `url("${bgUrl}")`,
  }
})
const isActiveCls = computed(() => assetScrollToTop(scrollTop.value))

const pages = usePages()

const perPage = themeOptions.value.perPage || 10
const page = ref(1)
const total = ref(pages.length)
const pageList = computed(() => {
  const skip = (page.value - 1) * perPage
  return pages.slice(skip, skip + perPage)
})

const handlePageChange = (num): void => {
  page.value = num
}
</script>
<template>
  <!-- 头部 -->
  <Header :is-logo="!isActiveCls" :class="{ active: isActiveCls }" />
  <!-- 背景图片 -->
  <div class="theme-background" :style="contianerStyle"></div>
  <!-- canvas 背景动画 -->
  <ParticlesBg />
  <!-- 首页banner -->
  <DecorBox v-slot="{ active }">
    <div class="banner-content">
      <Transition
        enter-active-class="animate__animated animate__fadeInDown animate__fast"
        appear
      >
        <Logo v-show="active" />
      </Transition>
    </div>
  </DecorBox>
  <!-- 首页内容 -->
  <main class="theme-container">
    <div class="theme-content">
      <!-- 侧边栏 -->
      <aside class="theme-aside">
        <CardAvatar />
        <CardCategories :pages="pages" />
        <CardTags :pages="pages" />
      </aside>
      <!-- 文章列表 -->
      <div class="theme-wrapper">
        <PostList :pages="pageList" />
        <Pagination
          v-show="total > perPage"
          :per-page="perPage"
          :page="page"
          :total="total"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </main>
  <!-- 页脚banner -->
  <DecorBox position="top">
    <template #default="{ active }">
      <div class="footer-content">
        <Transition enter-active-class="animate__animated animate__fadeInDown">
          <Medias v-show="active" />
        </Transition>
        <Transition
          enter-active-class="animate__animated animate__fadeInUp animate__delay-1s"
        >
          <Footer v-show="active" class="home-footer" />
        </Transition>
      </div>
    </template>
  </DecorBox>
  <!-- 回到顶部 -->
  <BackToTop />
</template>
