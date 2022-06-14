<script setup lang="ts">
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
import {
  useBloger,
  useDarkMode,
  usePages,
  useScrollTop,
  useThemeOptions,
} from '../hooks'
import { computed, ref } from 'vue'
import { withBase } from '@vuepress/client'
const themeOptions = useThemeOptions()
const isDarkMode = useDarkMode()
const contianerStyle = computed(() => {
  const { backgroundImage, darkBackgroundImage } = themeOptions.value
  const bgUrl =
    (isDarkMode.value ? darkBackgroundImage : backgroundImage) ||
    backgroundImage
  return {
    'background-image': `url("${withBase(bgUrl || '')}")`,
  }
})

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

const { avatarSrc, blogger, slogan } = useBloger()
</script>
<template>
  <!-- 头部 -->
  <!-- <Header :is-logo="!isActiveCls" :class="{ active: isActiveCls }" /> -->
  <!-- 背景图片 -->
  <div class="theme-background home-background" :style="contianerStyle"></div>
  <!-- canvas 背景动画 -->
  <ParticlesBg />
  <!-- 首页banner -->
  <DecorBox v-slot="{ active }" class="home-decor-box">
    <div class="banner-content">
      <Transition
        enter-active-class="animate__animated animate__fadeInDown animate__fast"
        appear
      >
        <Logo v-show="active" />
      </Transition>
    </div>
    <Transition
      enter-active-class="animate__animated animate__fadeInDown animate__fast"
      appear
    >
      <div class="blogger-content">
        <img :src="withBase(avatarSrc || '')" alt="" class="avatar card-box" />
        <h3 class="name">{{ blogger }}</h3>
      </div>
    </Transition>
  </DecorBox>
  <!-- 首页内容 -->
  <main class="theme-container theme-home-container">
    <div class="theme-content">
      <!-- 侧边栏 -->
      <aside class="theme-aside home-comment-aside">
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
          <Footer class="home-footer" />
        </Transition>
      </div>
    </template>
  </DecorBox>
  <!-- <Footer class="home-comment-footer" /> -->
  <!-- 回到顶部 -->
  <BackToTop />
</template>
