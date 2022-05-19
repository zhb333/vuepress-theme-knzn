<script setup lang="ts">
import Header from '../components/Header.vue'
import BackToTop from '../components/BackToTop.vue'
import Footer from '../components/Footer.vue'
import CardCategories from '../components/CardCategories.vue'
import CardTags from '../components/CardTags.vue'
import NavbarItem from '../components/NavbarItem.vue'
import PostInfo from '../components/PostInfo.vue'
import {
  useDarkMode,
  useMenuList,
  usePages,
  useScrollTop,
  useThemeOptions,
} from '../hooks'
import { computed } from 'vue'
import type { Ref } from 'vue'
import { assetScrollToTop } from '../utils'
import { usePageData } from '@vuepress/client'
import type { ThemePageData } from '../../node'

const themeOptions = useThemeOptions()
const scrollTop = useScrollTop()
const isDarkMode = useDarkMode()

// 背景图片
const contianerStyle = computed(() => {
  const { backgroundImage, darkBackgroundImage } = themeOptions.value
  const bgUrl =
    (isDarkMode.value ? darkBackgroundImage : backgroundImage) ||
    backgroundImage
  return {
    'background-image': `url("${bgUrl}")`,
  }
})

// 导航是否置顶
const isActiveCls = computed(() => assetScrollToTop(scrollTop.value))

const menuList = useMenuList()
const pages = usePages()

const pageData = usePageData() as Ref<ThemePageData>
console.log(pageData.value)
</script>
<template>
  <!-- 头部 -->
  <Header :class="{ active: isActiveCls }" />
  <!-- 背景图片 -->
  <div class="theme-background" :style="contianerStyle"></div>
  <!-- 搜索页 banner -->
  <div class="posts-banner"></div>
  <main class="theme-container theme-posts-container">
    <div class="theme-content">
      <!-- 侧边栏 -->
      <aside class="theme-aside">
        <CardCategories :pages="pages" />
        <CardTags :pages="pages" />
      </aside>
      <!-- 文章列表 -->
      <div class="theme-wrapper posts-container card-box">
        <div class="post-content markdown-body">
          <header v-if="pageData.path" class="header">
            <h1>{{ pageData.title }}</h1>
            <PostInfo :post="pageData" />
          </header>
          <Content />
        </div>
        <ul class="posts">
          <li v-for="item of menuList" :key="item.text" class="posts-item">
            <NavbarItem :item="item" />
          </li>
        </ul>
      </div>
    </div>
  </main>
  <Footer />
  <!-- 回到顶部 -->
  <BackToTop />
</template>
